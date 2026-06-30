# 🦄 UnicornIPTV — Premium Live IPTV Web Player

A production-ready, self-hosted IPTV web player built for live streaming. Supports HLS (`.m3u8`), MPEG-DASH (`.mpd`), and MPEG-TS (`.ts`) streams with automatic engine selection, a transparent CORS proxy, background token refresh, and a YouTube TV–style custom player UI.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Multi-engine Playback** | Auto-selects HLS.js, Dash.js, or Mpegts.js based on the stream URL |
| **CORS Proxy** | Transparent Node.js proxy bypasses CORS, spoofs browser headers, and follows redirects |
| **HLS Manifest Rewriting** | All relative and absolute segment/key URLs in `.m3u8` playlists are rewritten through the proxy |
| **DASH Manifest Rewriting** | `.mpd` manifests are fully rewritten including `BaseURL`, `Location`, and attribute references |
| **Background Token Refresh** | `PlaylistRefreshManager` detects URL expiry timestamps and proactively refreshes signed HLS tokens before they expire |
| **Channel Sidebar** | Infinite-scroll sidebar with category filtering, search, and paginated channel cards |
| **Favorites** | Persist favorite channels to `localStorage` with instant access via the Favorites tab |
| **Custom Player Controls** | YouTube TV–style controls bar: play/pause, volume, data saver, quality selector, fullscreen |
| **Quality Selection** | Manual per-level quality picker populated from HLS.js `LEVEL_SWITCHED` events |
| **Data Saver Mode** | Forces the lowest HLS quality level to minimize bandwidth |
| **EPG Info Bar** | Displays current and next programme information when EPG data exists in the playlist |
| **TV Remote / D-pad Navigation** | Full spatial navigation: Arrow keys, Enter, Escape, Backspace work as a TV remote |
| **Mobile Support** | Tap to show/hide controls; dedicated ☰ Menu button in controls bar opens sidebar on phones |
| **Zap Channel (Fullscreen)** | ArrowUp/Down in fullscreen zaps to the previous/next channel |
| **Cloudflare Pages Compatible** | `functions/proxy.js` is a Cloudflare Pages Function that mirrors the proxy for edge deployment |

---

## 🗂 Project Structure

```
UnicornIPTV/
├── server.js                    # Express backend: API, proxy, static files
├── package.json                 # Node.js dependencies (express)
├── run.bat                      # Windows one-click startup script
│
├── Channels/                    # Playlist files (JSON format)
│   ├── KSR Playlist.json        # Large multi-channel playlist
│   ├── SonyLiv.json             # SonyLiv channels
│   └── ZEE5.json                # ZEE5 channels
│
├── public/                      # Frontend SPA (served statically)
│   ├── index.html               # App shell / layout
│   ├── style.css                # All styles (dark theme, responsive, TV focus)
│   ├── app.js                   # Full frontend logic (~1600 lines)
│   └── playlistRefreshManager.js # Background HLS token refresh controller
│
└── functions/                   # Cloudflare Pages Functions
    ├── proxy.js                 # Edge proxy (mirrors server.js /proxy route)
    └── api/                     # Edge API functions
```

---

## 🚀 Getting Started (Local)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later

### 1. Install dependencies
```bash
npm install
```

### 2. Add your playlists
Drop any `.json` playlist file into the `Channels/` directory. The server auto-loads all JSON files on startup.

**Supported JSON schemas:**
```json
[
  { "name": "Channel Name", "url": "https://...", "logo": "https://...", "group": "Sports" }
]
```
Fields like `title`, `video_token`, `image_url` are also auto-mapped.

### 3. Start the server
```bash
npm start
# or double-click run.bat on Windows
```

### 4. Open the app
Navigate to: **http://localhost:3000**

---

## 🏗 Architecture

### Backend (`server.js`)

| Route | Description |
|---|---|
| `GET /api/groups` | Returns all unique category groups with channel counts |
| `GET /api/channels` | Paginated channel list; supports `?group=`, `?search=`, `?page=`, `?limit=`, `?ids=` |
| `GET /proxy?url=<URL>` | Full-featured transparent proxy |

#### Proxy Deep-Dive
The `/proxy` endpoint:
1. **Parses pipe-notation headers** — URLs can carry custom headers as `URL|User-Agent=VLC&Referer=...`
2. **Spoofs browser headers** — Uses a real Chrome User-Agent; switches to `VLC/3.0.18` for `.ts` MPEG-TS streams to bypass Xtream Codes blocks
3. **Follows redirects manually** (up to 10 hops) — Captures the final URL (`X-Final-Url` response header) for correct relative URL resolution
4. **Rewrites HLS manifests** — Every segment URL, key URI, and sub-playlist reference is resolved and proxied
5. **Rewrites DASH manifests** — Handles `href`, `media`, `initialization`, `uri`, `Location`, and `BaseURL` XML elements
6. **Streams binary segments** — `.ts` / `.m4s` segments are piped directly to the client without buffering

### Frontend (`public/app.js`)

The SPA is a single JavaScript file (~1600 lines) that initializes on `DOMContentLoaded`.

#### Key Modules (logical sections within app.js)

| Module | Responsibility |
|---|---|
| **State Manager** | Global `state` object holds player instances, session ID, channel data, retry state |
| **Channel Loader** | `loadChannels()` calls `/api/channels` with pagination and infinite scroll |
| **Engine Selector** | `getStreamEngine(url)` auto-detects HLS / DASH / MPEG-TS from URL pattern |
| **`playChannel()`** | Instantly updates UI (title, card highlight, EPG); debounce-optionally initiates playback |
| **`destroyPlayers()`** | Tears down HLS/DASH/MPEGTS instances; clears src; aborts pending fetches |
| **Custom Player** | `initCustomPlayer()` wires all control buttons, hotkeys, and event listeners |
| **Spatial Navigation** | `handleSpatialNavigation(key)` drives full keyboard/remote D-pad control |
| **Retry Logic** | `handlePlayError()` retries up to 3 times; HLS.js fatal errors try native recovery first |
| **Token Recovery** | `triggerHLSRecovery()` re-fetches the original source URL, refreshes the `PlaylistRefreshManager`, and recreates the HLS instance with the new signed URL |

### PlaylistRefreshManager (`public/playlistRefreshManager.js`)

A standalone class that runs in the background and proactively refreshes expiring HLS tokens.

**How it works:**
1. On `start(originalUrl, masterUrl)` — parses URL query params to detect expiry timestamps (`expires`, `end`, `exp`, `to`, `until`, `e`)
2. Schedules a refresh 90 seconds before the token expires
3. On refresh — re-fetches the original source URL through the proxy, extracts the new master playlist URL and all variant-level URLs
4. Swaps URLs into the live HLS.js instance via a custom `ManagerPlaylistLoader` without destroying the player
5. Falls back to a 15-second retry interval if no expiry timestamp is found

---

## 📱 UI Behaviour

### Desktop
- Sidebar is always visible on the left
- Video player fills the right panel
- Mouse movement reveals controls; controls auto-hide after 3 seconds of inactivity
- Keyboard shortcuts: `Space` = play/pause, `M` = mute, `F` = fullscreen

### Mobile (≤ 768px)
- Sidebar slides in from the left (triggered by the ☰ button in the controls bar)
- Tap the video area once to show controls; tap again to hide them
- ☰ Menu button (left of play/pause) opens the channel sidebar

### Android TV / Smart TV
- Full D-pad navigation with highlighted focus ring (`tv-focus` CSS class)
- `ArrowLeft` opens the channel list; double `ArrowLeft` opens categories
- `ArrowUp` / `ArrowDown` in fullscreen zaps through channels
- `Enter` = OK/Select; `Escape` / `Backspace` = Back

---

## ☁️ Cloudflare Pages Deployment

1. Connect the repository to Cloudflare Pages
2. Set build output directory to `public`
3. The `functions/proxy.js` Cloudflare Pages Function will automatically handle proxy requests at `/proxy`

> **Note:** The Express `server.js` is only needed for local development. On Cloudflare Pages, the Functions directory replaces it.

---

## 🎛 Configuration

### Buffer Tuning (in `app.js` HLS.js config block)
```javascript
maxBufferLength: 10,        // Target buffer ahead (seconds)
maxMaxBufferLength: 20,     // Hard cap
backBufferLength: 10,       // Back-buffer before current position
maxBufferSize: 60 * 1024 * 1024,  // 60MB cap
liveSyncDuration: 4,        // Seconds behind live edge
liveMaxLatencyDuration: 8   // Max latency before catch-up
```

### PlaylistRefreshManager config (in `playlistRefreshManager.js`)
```javascript
enableProactiveRefresh: true,
safetyMarginSeconds: 90,      // Refresh this many seconds before expiry
fallbackRetryIntervalMs: 15000, // Retry every 15s if no expiry found
maxRefreshRetries: 5
```

---

## 🧩 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `express` | ^4.21.2 | HTTP server, static serving, API routes |
| `hls.js` | 1.5.8 (CDN) | HLS `.m3u8` / `.php` stream playback |
| `dash.js` | 4.7.4 (CDN) | DASH `.mpd` stream playback |
| `mpegts.js` | 1.7.3 (CDN) | MPEG-TS `.ts` stream playback |
| `Boxicons` | 2.1.4 (CDN) | UI icon set |
| `Outfit` / `Plus Jakarta Sans` | Google Fonts | Typography |

---

## 📄 License

ISC
