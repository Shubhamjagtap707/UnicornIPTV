# 🐞 Problems & Solutions — UnicornIPTV Development Log

A detailed record of every significant bug, regression, and design challenge encountered during the development and optimization of UnicornIPTV, along with the exact root causes and solutions implemented.

---

## 1. CORS Errors on Stream URLs

### Problem
All IPTV stream URLs (`.m3u8`, `.mpd`, `.ts`) returned CORS errors in the browser because CDN servers do not include `Access-Control-Allow-Origin` headers for cross-origin requests from a web app.

### Root Cause
Browsers enforce the Same-Origin Policy. Direct `fetch()` or `<video src>` calls to third-party stream servers are blocked unless those servers explicitly allow cross-origin access — which most IPTV CDNs do not.

### Solution
Built a transparent Node.js proxy at `GET /proxy?url=<encodedUrl>` inside `server.js`. Every stream request from the frontend goes through this proxy, which:
- Forwards the request with browser-like headers (`User-Agent`, `Referer`)
- Returns the response with `Access-Control-Allow-Origin: *`
- Passes all relevant response headers back (`Content-Type`, `Content-Range`, `Accept-Ranges`)

For Cloudflare Pages deployment, a mirror of this proxy was implemented as a Cloudflare Pages Function in `functions/proxy.js`.

---

## 2. HLS Relative URLs Breaking After Proxy

### Problem
After routing HLS manifests through the proxy, segment URLs inside the `.m3u8` file were still relative paths (e.g., `segment0001.ts`). HLS.js tried to resolve these relative to the proxy URL instead of the actual CDN origin, resulting in 404 errors on every segment.

### Root Cause
When the proxy fetches an HLS master playlist and returns it verbatim, HLS.js resolves all relative URLs against the proxy base URL — not the original CDN base URL. This means relative paths like `../../segments/seg.ts` resolve to completely wrong addresses.

### Solution
Implemented **HLS manifest rewriting** inside the proxy:
1. Detect if the response is an HLS manifest (by `Content-Type` or URL extension)
2. Parse each line of the `.m3u8`
3. Resolve every relative URL to absolute using the **final redirect URL** (`finalResponseUrl`) as the base
4. Re-wrap every segment/key URL through the proxy (`/proxy?url=<encodedAbsoluteUrl>`)
5. Also rewrite `URI=` values inside `#EXT-X-KEY` and `#EXT-X-MAP` directives

The same approach was applied to DASH `.mpd` manifests, rewriting `href`, `media`, `initialization`, `uri`, `Location`, and `BaseURL` XML attributes.

---

## 3. AES-128 Decryption Key Blocked by CORS

### Problem
Encrypted HLS streams use `#EXT-X-KEY URI="https://..."` to specify where HLS.js must fetch the AES-128 decryption key. These key servers also block cross-origin requests, causing HLS.js to fail silently with a media decode error.

### Root Cause
The AES key URL is fetched directly by HLS.js from the browser. The key server does not return `Access-Control-Allow-Origin`, so the browser blocks the key fetch and HLS.js cannot decrypt segments.

### Solution
During HLS manifest rewriting in the proxy, all `URI="..."` values inside `#EXT-X-KEY` tags are also proxied. HLS.js then fetches the key through the proxy which adds the required CORS header, and decryption works transparently.

---

## 4. Signed URL / Token Expiry Causing Stream to Stop Mid-Playback

### Problem
Many IPTV stream URLs contain time-limited tokens (`?expires=1234567890`). After the token expires, all segment fetches return `401` or `403`, causing the stream to stall and crash approximately 30–90 minutes into playback.

### Root Cause
Signed CDN URLs embed an expiry timestamp directly in the query string. Once the server clock passes that timestamp, the CDN rejects all requests. HLS.js has no mechanism to refresh the playlist URL mid-session.

### Solution
Built the `PlaylistRefreshManager` class (`public/playlistRefreshManager.js`):

1. **Expiry Detection** — On session start, scans the master URL query params for known expiry keys (`expires`, `exp`, `end`, `e`, `to`, `until`). Parses the value as a Unix timestamp.
2. **Proactive Scheduling** — Schedules a refresh 90 seconds before the token expires.
3. **Background Re-fetch** — Re-fetches the original (non-signed) source URL through the proxy to get a fresh signed URL.
4. **Hot URL Swap** — Implements a custom HLS.js `ManagerPlaylistLoader` that intercepts level/manifest load calls and swaps in the new signed URLs **without destroying the HLS instance or interrupting playback**.
5. **Fallback Polling** — If no expiry timestamp is found, falls back to a 15-second background polling interval.

---

## 5. Multiple HLS Instances Created During Rapid Channel Switching

### Problem
When users switched channels rapidly, multiple HLS.js instances were created and left running in the background. Each instance independently requested segments, competed for network bandwidth, and caused excessive CPU usage and memory growth. Old channels continued playing audio underneath the new one.

### Root Cause
`destroyPlayers()` was not always called before creating a new HLS instance. When `initiatePlayback()` was called in rapid succession, the previous `hlsInstance` was still alive and loading segments.

### Solution
Implemented an **HLS Instance Guard**:
- `destroyPlayers()` explicitly calls `hlsInstance.destroy()`, `dashInstance.destroy()`, and `mpegtsInstance.destroy()`
- References are set to `null` immediately after destruction
- A new instance is only created after the previous is fully torn down

Also implemented a **decoder resource release sequence** to avoid browser media pipeline conflicts:
```javascript
videoPlayer.pause();
videoPlayer.removeAttribute('src');
videoPlayer.srcObject = null;
// Only then: new HLS instance created
```

---

## 6. `AbortError: The play() request was interrupted by pause()`

### Problem
Console errors flooded with `AbortError: The play() request was interrupted by pause()` during channel switching. This also triggered the video element's `onerror` handler, causing premature player reconstruction.

### Root Cause
`videoPlayer.play()` returns a Promise. If `videoPlayer.pause()` is called before that Promise resolves (which happens during rapid channel switching when `destroyPlayers()` is called immediately after starting a new channel), the browser throws an `AbortError`.

### Solution
Two-part fix:
1. **Deferred the `onerror` handler** — When an engine (HLS.js/Dash.js/Mpegts.js) is running, raw `<video>` element errors are ignored. Only the engine's own error callbacks trigger recovery. This prevents `AbortError` from causing a full player rebuild.
2. **Added `AbortError` check in error handlers** — `handlePlayError()` checks if the error message contains `"The play() request was interrupted"` and skips retry logic entirely for this case.

---

## 7. Media Segment Fetch Aborts After 3–5 Minutes (`net::ERR_ABORTED`)

### Problem
After 3–5 minutes of stable playback, `net::ERR_ABORTED`, `FRAGMENT_LOADING_ABORTED`, and console messages saying "Multiple requests for the same segment detected" appeared. Playback would stall.

### Root Cause
An earlier implementation of request deduplication used a global `window.fetch` override that tracked in-flight requests and cancelled duplicate ones. HLS.js internally makes multiple concurrent fetches for the same segment in some ABR (adaptive bitrate) level-switch scenarios. The deduplication code incorrectly treated these as duplicates and aborted one — but HLS.js does not recover from an externally aborted segment fetch.

### Solution
Removed the global `window.fetch` override entirely. Instead:
1. Created a dedicated `window.streamingFetch` utility for deduplication — used **only** for playlist manifests, metadata, and token refresh requests
2. Added a strict **media segment exclusion** filter: any URL containing `.ts`, `.m4s`, `.mp4`, `.aac`, `.m4v`, `.m4a`, or path segments `/fragments/` or `/segments/` bypasses deduplication entirely and is fetched normally
3. HLS.js, Dash.js, and Mpegts.js never call `streamingFetch` — they use their own internal XHR/fetch pipeline

---

## 8. RetryTimeout Firing and Interrupting Already-Recovered Streams

### Problem
After HLS.js recovered from a transient error (e.g., a single bad segment), the retry timer that was scheduled before recovery still fired 2–4 seconds later and called `initiatePlayback()` — destroying the perfectly healthy stream and restarting it from scratch.

### Root Cause
The retry `setTimeout` was scheduled with a fixed delay. If HLS.js recovered natively within that delay window (which it often does in < 1 second), the timer had no awareness of the recovery and fired anyway.

### Solution
Added **pre-execution guards** inside every retry timeout callback:
```javascript
// 1. Session ID check — was a new channel selected?
if (state.currentSessionId !== sessionId) return;

// 2. Player destroyed check — was the player torn down?
if (!state.hlsInstance && !videoPlayer.src) return;

// 3. Health check — is the stream actually playing?
const isPlaying = !videoPlayer.paused &&
                  videoPlayer.currentTime > 0 &&
                  !videoPlayer.ended &&
                  videoPlayer.readyState >= 2;
if (isPlaying) {
    console.log('Retry Skipped (Playback Healthy)');
    return;
}
```

Additionally, retry timers are now cleared whenever:
- `videoPlayer.onplaying` fires
- HLS.js emits `FRAG_BUFFERED` or `BUFFER_APPENDED`
- The user switches channel (via `destroyPlayers()`)

---

## 9. Channel List Lagging and Snapping During Key-Hold Navigation

### Problem
When holding the `ArrowDown` or `ArrowUp` key on desktop or a TV remote, the focused channel card counter advanced rapidly but the sidebar list stayed visually in place. Upon releasing the key, the list snapped abruptly to the correct position.

### Root Cause
`updateSpatialFocusIndicator()` was called on every `keydown` event. It called `activeEl.scrollIntoView({ behavior: 'smooth' })`. The browser queues smooth scroll animations and throttles them. With dozens of `keydown` events per second, hundreds of smooth scroll animations queued up faster than they could play — causing the visible freeze — and then all completed at once when the key was released, causing the snap.

### Solution
Changed `behavior: 'smooth'` to `behavior: 'auto'` (instant scroll) in `updateSpatialFocusIndicator()`:
```javascript
activeEl.scrollIntoView({ block: 'nearest', behavior: 'auto' });
```
The sidebar now tracks the focused card in real time with zero lag.

---

## 10. Clicking/Tapping the Video Screen Accidentally Pausing the Stream

### Problem
Tapping anywhere on the video on mobile accidentally toggled play/pause mid-stream. This was especially problematic when trying to show the controls overlay — the intended action was to reveal controls, but it also paused the stream.

### Root Cause
`videoPlayer.addEventListener('click', togglePlay)` was registered, meaning any click on the raw video element triggered play/pause. On touch devices, tapping the screen to see what's playing caused the stream to pause.

### Solution
Removed the click listener from `videoPlayer` entirely:
```javascript
// Removed:
videoPlayer.addEventListener('click', togglePlay);

// Kept only:
ctrlPlayPause.addEventListener('click', togglePlay);
```
Play/pause now only responds to the dedicated `⏯` button in the controls bar and the `Space` keyboard shortcut. Clicking the video surface only shows/hides the controls overlay.

---

## 11. No Way to Open Sidebar on Mobile Devices

### Problem
The sidebar channel list was accessible on desktop via mouse click and on TV via D-pad navigation, but on mobile there was no visible button to open it. Users were stuck on the currently playing channel with no way to browse or switch channels without knowing about the hidden sidebar.

### Root Cause
The UI assumed either mouse interaction (desktop) or D-pad remote (TV) for sidebar access. No touch-friendly entry point existed.

### Solution
Added a **mobile-only ☰ Menu button** to the player controls bar:

1. **HTML** (`index.html`) — Added `<button id="ctrl-menu">` with a `bx-menu` hamburger icon, placed to the left of the play/pause button
2. **CSS** (`style.css`) — `#ctrl-menu { display: none }` globally; `display: flex` inside `@media (max-width: 768px)` only
3. **JS** (`app.js`) — Click handler calls `switchSidebarView('channels')`, sets `focusedZone = 'sidebar'`, and scrolls to the currently playing channel card

---

## 12. Controls Overlay Not Dismissable on Mobile

### Problem
On mobile, tapping the video area showed the controls overlay, but there was no way to dismiss it. It stayed permanently visible, covering the video content. The auto-hide timeout was set to 3 seconds but it only worked when focus moved away from the sidebar — which never happens on a touch device.

### Root Cause
The `videoWrapper` click handler only contained a one-way show path:
```javascript
if (!videoWrapper.classList.contains('show-controls')) {
    // show controls
}
// No else branch — controls could never be hidden by tap
```

### Solution
Converted the handler into a **toggle**:
```javascript
if (videoWrapper.classList.contains('show-controls')) {
    // Controls visible → hide them
    videoWrapper.classList.remove('show-controls');
    videoWrapper.classList.add('hide-cursor');
    clearTimeout(state.controlsTimeout);
} else {
    // Controls hidden → show them
    videoWrapper.classList.add('show-controls');
    showControls(); // starts auto-hide timer
}
```
First tap shows controls, second tap hides them. The auto-hide timeout still functions normally on desktop/TV.

---

## 13. Malformed JSON Playlist Files Crashing the Server

### Problem
The `KSR Playlist.json` file used a non-standard format — the outer wrapper used `{` / `}` braces (object notation) instead of `[` / `]` (array notation) and also contained trailing commas after the last item in arrays, which are illegal in standard JSON.

### Root Cause
The playlist was generated by a third-party tool that did not produce spec-compliant JSON. `JSON.parse()` threw a `SyntaxError` on load.

### Solution
Implemented a **two-pass JSON repair** in `server.js`:
1. First attempt: `JSON.parse(rawText)` directly
2. If that fails: detect if the file starts with `{` and ends with `}`, convert to `[...]`, then strip all trailing commas using:
   ```javascript
   cleanedText = cleanedText.replace(/,\s*([\]}])/g, '$1');
   ```
3. Parse the cleaned text and normalize into a channel array

---

## 14. MPEG-TS Streams Blocked by Xtream Codes / Restreamer Servers

### Problem
`.ts` streams from Xtream Codes–based IPTV providers returned `403 Forbidden` when the proxy used a standard browser `User-Agent`. Playback failed immediately.

### Root Cause
Many Xtream Codes panels and IPTV restreamers check the `User-Agent` header and block requests that don't look like a native media player (e.g., VLC, Kodi, or a set-top box). Browser user-agents are blocklisted on some panels.

### Solution
Added conditional `User-Agent` spoofing in the proxy:
```javascript
if (actualTargetUrl.toLowerCase().includes('.ts') && !customHeaders['User-Agent']) {
    headers['User-Agent'] = 'VLC/3.0.18 LibVLC/3.0.18';
}
```
MPEG-TS streams now spoof VLC, while `.m3u8` and `.mpd` streams use the standard browser Chrome User-Agent.

---

## 15. Redirect Chains Breaking Relative URL Resolution

### Problem
Some stream URLs redirect multiple times (e.g., short URL → CDN edge → actual origin). After following redirects, relative segment URLs in the final playlist were resolved against the first URL, not the final URL after all redirects — producing broken segment addresses.

### Root Cause
Node.js `fetch()` with `redirect: 'follow'` follows redirects automatically but loses the final URL. Relative URL resolution must use the **final** URL after all hops, not the original.

### Solution
Replaced `redirect: 'follow'` with `redirect: 'manual'` and implemented a **manual redirect-following loop**:
```javascript
while (hops <= maxRedirects) {
    response = await fetch(currentUrl, { redirect: 'manual' });
    if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        currentUrl = new URL(location, currentUrl).href; // resolve relative redirects
        hops++;
    } else break;
}
finalResponseUrl = currentUrl; // used as base for relative URL resolution
```
The `X-Final-Url` response header exposes this final URL to HLS.js for its own internal resolution.
