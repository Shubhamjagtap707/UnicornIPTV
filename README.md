# 🦄 UnicornIPTV

> Production-Grade IPTV Streaming Architecture with Integrated TV Remote Navigation & Auto-Scaling Edge Proxies.

UnicornIPTV is a high-compatibility streaming application designed to deliver IPTV channels, HLS playlists, DASH manifests, and MPEG-TS streams directly to browsers and Android TV containers. It features a custom TV-optimized interface, full D-pad remote controller support, and a self-healing dual-proxy gateway that resolves CORS constraints and handles raw IP redirect restrictions.

---

## 🚀 Key Features

* 📺 **TV-Optimized UX:** A sleek, premium dashboard designed specifically for televisions, supporting sidebars, categories, and overlay controls.
* 🎮 **Full Keyboard & D-pad Navigation:** Seamless TV remote integration. Navigate channels, toggle sidebars, adjust quality settings, and control playback using standard D-pad controllers or keyboard arrow keys.
* ⚡ **Dual-Proxy Engine:**
  * **Edge Proxy (Cloudflare Pages Functions):** Ultra-low latency manifest rewriting, segment routing, and token resolution close to the user.
  * **Express Backup (Render/Localhost):** Standalone Node.js proxy serving as a high-compatibility backend with no execution sandboxing.
* 🛡️ **Edge Bypass for Direct IP redirects:** Auto-translates raw IPv4 redirects from stream providers to `.sslip.io` wildcard DNS domains to bypass Cloudflare's direct IP fetch restriction (Error 1003).
* 🔧 **Unified Engine compatibility:** Seamless support for HLS (`.m3u8`), MPEG-DASH (`.mpd`), and MPEG-TS (`.ts`) streams using integrated HLS.js, MPEGTS.js, and Dash.js engines.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, HSL-curated CSS3 CSS Variables (Dark-mode styled), Vanilla JavaScript.
* **Streaming Libraries:** HLS.js, MPEGTS.js, Dash.js.
* **Icons:** Boxicons.
* **Serverless Edge:** Cloudflare Pages Functions.
* **Backend:** Node.js, Express.js.

---

## 📂 Project Structure

```
├── Channels/               # JSON Playlists (ZEE5, SonyLiv, KSR Playlist, etc.)
├── functions/              # Cloudflare Pages serverless routing functions
│   ├── api/                # Playlist and channel API endpoints
│   └── proxy.js            # Serverless Edge proxy (rewriting, sslip.io mapping)
├── public/                 # Static web application resources
│   ├── app.js              # Application core & Player state controller
│   ├── index.html          # HTML5 layout viewport
│   └── index.css           # Curated CSS styling system & animations
├── server.js               # Standalone Node.js Express server (Local/Render backend)
├── package.json            # Node dependencies and build scripts
└── README.md               # Project documentation
```

---

## ⚙️ How it Works: The IP Redirect Fix

Stream providers often redirect playback tokens to raw IP addresses of media servers (e.g., `http://184.107.146.4/index.m3u8`). While local Node.js proxies resolve this naturally, Cloudflare Workers block direct IP fetches (Error 1003).

UnicornIPTV resolves this on the edge by parsing URL hostnames:
1. When a redirect to a raw IP is detected, it rewrites the hostname to `[ip].sslip.io` (e.g., `184.107.146.4.sslip.io`).
2. Cloudflare processes the hostname, queries DNS (which resolves correctly to the original IP), and executes the fetch successfully.
3. Rewritten relative segment URLs inside the manifest inherit the sslip.io mapping, keeping playback active.

---

## 🚀 Deployed Environments

* **Production Site:** [https://unicorniptv.pages.dev/](https://unicorniptv.pages.dev/)
* **Local Wrangler Dev Server (Port 8788):** Test Cloudflare Pages locally.
* **Local Node Server (Port 3000):** Test Express server locally.

---

## 📦 Local Development Setup

### 1. Prerequisite Installation
Ensure you have Node.js (v18+) installed. Clone the repository and run:
```bash
npm install
```

### 2. Run Local Express Server
```bash
npm start
```
Starts the Express gateway at `http://localhost:3000`.

### 3. Run Wrangler Pages Dev (Cloudflare Simulation)
```bash
npx wrangler pages dev public --port 8788
```
Starts the simulated serverless edge environment at `http://localhost:8788`.

---

## 📱 Packaging for Android TV (APK)

Since the TV remote navigation is fully implemented in the web app, you can easily wrap this website into a native APK using **Capacitor**:

1. Install Capacitor CLI:
   ```bash
   npm i @capacitor/core @capacitor/cli
   npx cap init
   ```
2. Set the `server.url` option in `capacitor.config.json` to:
   ```json
   "server": {
     "url": "https://unicorniptv.pages.dev/",
     "cleartext": true
   }
   ```
3. Add the Android platform:
   ```bash
   npm i @capacitor/android
   npx cap add android
   ```
4. Build in Android Studio with `android:usesCleartextTraffic="true"` and `LEANBACK_LAUNCHER` intent enabled.

---

## 📄 License
This project is for educational and authorized diagnostic streaming purposes only. All stream playlists are provided by user configuration.
