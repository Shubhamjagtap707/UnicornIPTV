/**
 * UnicornIPTV - Playlist Refresh Manager
 * Decoupled, generic background HLS token refresh controller.
 */

class PlaylistRefreshManager {
    constructor() {
        // Configuration
        this.config = {
            enableProactiveRefresh: true,
            safetyMarginSeconds: 90,
            fallbackRetryIntervalMs: 15000,
            maxRefreshRetries: 5,
            expiryDetectionEnabled: true,
            debugLogging: true
        };

        // State Model
        this.state = {
            originalSourceUrl: null,
            currentMasterUrl: null,
            nextMasterUrl: null,
            levelUrls: [],       // array of variant playlist URLs (level index -> URL)
            nextLevelUrls: [],   // temp container for parsed next level URLs
            audioUrls: [],       // array of audio track URLs (track index -> URL)
            nextAudioUrls: [],   // temp container for parsed next audio URLs
            
            expiryTimestamp: null,
            observedLifetime: null,
            firstPlayTime: null,
            lastRefresh: null,
            refreshInProgress: false,
            refreshFailures: 0,
            lastSuccessfulRefresh: null,
            playlistGeneration: 0
        };

        this.refreshTimer = null;
        this.log('PlaylistRefreshManager initialized.');
    }

    log(...args) {
        if (this.config.debugLogging) {
            console.log('[MANAGER]', ...args);
        }
    }

    warn(...args) {
        console.warn('[MANAGER_WARN]', ...args);
    }

    error(...args) {
        console.error('[MANAGER_ERROR]', ...args);
    }

    /**
     * Start tracking a new HLS session
     */
    start(originalUrl, currentMasterUrl) {
        this.log(`Starting session. Original: "${originalUrl}"`);
        this.reset();
        
        this.state.originalSourceUrl = originalUrl;
        this.state.currentMasterUrl = currentMasterUrl;
        this.state.firstPlayTime = Date.now();

        // Initial scan of the master URL to check for expiry parameters
        this.detectAndSchedule(currentMasterUrl);
    }

    /**
     * Reset session state and clear timers
     */
    reset() {
        this.log('Resetting session state and timers.');
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
            this.refreshTimer = null;
        }

        this.state.originalSourceUrl = null;
        this.state.currentMasterUrl = null;
        this.state.nextMasterUrl = null;
        this.state.levelUrls = [];
        this.state.nextLevelUrls = [];
        this.state.audioUrls = [];
        this.state.nextAudioUrls = [];
        this.state.expiryTimestamp = null;
        this.state.lastRefresh = null;
        this.state.refreshInProgress = false;
        this.state.refreshFailures = 0;
        this.state.playlistGeneration = 0;
    }

    /**
     * Calculate expiry from URL and schedule next refresh
     */
    detectAndSchedule(url) {
        if (!this.config.enableProactiveRefresh) return;

        const expiry = this.extractExpiry(url);
        let delayMs = 12.5 * 60 * 1000; // Default 12.5 minutes if unknown
        
        if (expiry) {
            this.state.expiryTimestamp = expiry;
            const now = Date.now();
            const timeUntilExpiry = expiry - now;
            const targetDelay = timeUntilExpiry - (this.config.safetyMarginSeconds * 1000);
            
            this.log(`Expiry timestamp detected: ${new Date(expiry).toISOString()} (expiring in ${Math.round(timeUntilExpiry / 1000)}s)`);
            
            if (targetDelay <= 0) {
                this.warn('URL expires too soon or is already expired. Refreshing in 5s.');
                delayMs = 5000;
            } else {
                delayMs = targetDelay;
            }
        } else if (this.state.observedLifetime) {
            // Adaptive schedule: 75% of observed lifetime
            const adaptiveDelay = this.state.observedLifetime * 0.75;
            this.log(`No expiry param found. Using adaptive lifetime delay: ${Math.round(adaptiveDelay / 1000 / 60)} minutes.`);
            delayMs = adaptiveDelay;
        } else {
            this.log(`No expiry param or observed lifetime found. Using default interval of ${Math.round(delayMs / 1000 / 60)} minutes.`);
        }

        this.log(`Next proactive refresh scheduled in ${Math.round(delayMs / 1000)} seconds.`);
        
        if (this.refreshTimer) clearTimeout(this.refreshTimer);
        this.refreshTimer = setTimeout(() => {
            this.executeRefresh();
        }, delayMs);
    }

    /**
     * Extract expiration epoch from URL parameters
     */
    extractExpiry(urlStr) {
        if (!this.config.expiryDetectionEnabled) return null;
        try {
            let targetUrl = urlStr;
            if (urlStr.includes('/proxy?url=')) {
                const urlIndex = urlStr.indexOf('/proxy?url=');
                targetUrl = decodeURIComponent(urlStr.slice(urlIndex + '/proxy?url='.length));
                const pipeIndex = targetUrl.indexOf('|');
                if (pipeIndex !== -1) {
                    targetUrl = targetUrl.slice(0, pipeIndex);
                }
            }
            
            const urlObj = new URL(targetUrl);
            const expiryParams = ['exp', 'expires', 'expiry', 'token_exp', 'validuntil', 'endtime', 'et', 'hdntl', 'hdnts'];
            for (const param of expiryParams) {
                let val = urlObj.searchParams.get(param);
                if (val) {
                    // Akamai token nested exp format
                    if (val.includes('exp=')) {
                        const match = val.match(/exp=(\d+)/);
                        if (match) val = match[1];
                    }
                    const num = parseInt(val, 10);
                    if (!isNaN(num) && num > 0) {
                        // Normalize 10-digit epoch seconds to milliseconds
                        if (num < 10000000000) return num * 1000;
                        return num;
                    }
                }
            }
        } catch (e) {
            this.warn('Error extracting expiry from URL:', e.message);
        }
        return null;
    }

    /**
     * Execute background manifest refresh
     */
    async executeRefresh() {
        if (this.state.refreshInProgress) return;
        if (!this.state.originalSourceUrl) return;

        this.log(`Background refresh started. Original URL: "${this.state.originalSourceUrl}"`);
        this.state.refreshInProgress = true;
        const startTime = performance.now();

        try {
            const proxyUrl = `${window.location.origin}/proxy?url=${encodeURIComponent(this.state.originalSourceUrl)}`;
            const response = await fetch(proxyUrl, { method: 'GET' });
            
            if (!response.ok) {
                throw new Error(`Upstream returned HTTP ${response.status}`);
            }

            const manifestText = await response.text();
            
            // Expose the final redirected URL returned in headers (matched on backend)
            const finalMasterUrl = response.headers.get('X-Final-Url');
            if (!finalMasterUrl) {
                throw new Error('Proxy response is missing X-Final-Url header.');
            }

            // Validation Rules
            if (!manifestText.startsWith('#EXTM3U')) {
                throw new Error('Validation failed: response is not a valid HLS manifest (missing #EXTM3U).');
            }

            const { levels, audios } = this.parseManifestUrls(manifestText, finalMasterUrl);
            
            this.log(`Validation successful. Extracted levels: ${levels.length}, audios: ${audios.length}`);

            // Update Next state targets (keep ready, do not swap yet)
            this.state.nextMasterUrl = finalMasterUrl;
            this.state.nextLevelUrls = levels;
            this.state.nextAudioUrls = audios;
            
            this.state.refreshFailures = 0;
            this.state.lastSuccessfulRefresh = Date.now();
            this.state.playlistGeneration++;
            this.state.lastRefresh = Date.now();

            const duration = ((performance.now() - startTime) / 1000).toFixed(2);
            this.log(`Refresh completed in ${duration}s. (Generation: ${this.state.playlistGeneration})`);
            this.log(`Next Master URL: ${this.state.nextMasterUrl}`);

            // Schedule the next background refresh
            this.state.refreshInProgress = false;
            this.detectAndSchedule(finalMasterUrl);

        } catch (err) {
            this.state.refreshFailures++;
            this.error(`Validation/Fetch Failure (${this.state.refreshFailures}/${this.config.maxRefreshRetries}):`, err.message);
            this.state.refreshInProgress = false;

            if (this.state.refreshFailures < this.config.maxRefreshRetries) {
                // Exponential backoff retry
                const backoffDelay = this.config.fallbackRetryIntervalMs * Math.pow(2, this.state.refreshFailures - 1);
                this.log(`Retrying proactive refresh in ${Math.round(backoffDelay / 1000)} seconds.`);
                if (this.refreshTimer) clearTimeout(this.refreshTimer);
                this.refreshTimer = setTimeout(() => {
                    this.executeRefresh();
                }, backoffDelay);
            } else {
                this.warn('Max proactive refresh retries reached. Falling back to reactive error recovery.');
            }
        }
    }

    /**
     * Intercept and retrieve swapped Level URL
     */
    getSwappedLevelUrl(levelIndex, currentUrl) {
        // If this level URL is not recorded yet, save it
        if (!this.state.levelUrls[levelIndex]) {
            this.state.levelUrls[levelIndex] = currentUrl;
        }

        // Check if a next level URL is ready to swap
        if (this.state.nextLevelUrls && this.state.nextLevelUrls[levelIndex]) {
            const nextUrl = this.state.nextLevelUrls[levelIndex];
            if (nextUrl !== this.state.levelUrls[levelIndex]) {
                this.log(`Playlist Swapped [Level ${levelIndex}]. New: ${nextUrl.slice(0, 120)}...`);
                
                // Commit swap
                this.state.levelUrls[levelIndex] = nextUrl;
                return nextUrl;
            }
        }
        return currentUrl;
    }

    /**
     * Intercept and retrieve swapped Audio URL
     */
    getSwappedAudioUrl(audioIndex, currentUrl) {
        if (!this.state.audioUrls[audioIndex]) {
            this.state.audioUrls[audioIndex] = currentUrl;
        }

        if (this.state.nextAudioUrls && this.state.nextAudioUrls[audioIndex]) {
            const nextUrl = this.state.nextAudioUrls[audioIndex];
            if (nextUrl !== this.state.audioUrls[audioIndex]) {
                this.log(`Playlist Swapped [Audio ${audioIndex}]. New: ${nextUrl.slice(0, 120)}...`);
                this.state.audioUrls[audioIndex] = nextUrl;
                return nextUrl;
            }
        }
        return currentUrl;
    }

    /**
     * Intercept and retrieve swapped Master Manifest URL
     */
    getSwappedMasterUrl(currentUrl) {
        if (this.state.nextMasterUrl && this.state.nextMasterUrl !== this.state.currentMasterUrl) {
            const nextUrl = this.state.nextMasterUrl;
            this.log(`Playlist Swapped [Master Manifest]. New: ${nextUrl}`);
            this.state.currentMasterUrl = nextUrl;
            return nextUrl;
        }
        return currentUrl;
    }

    /**
     * Trigger reactive fallback to measure token lifetime on 403 failure
     */
    reportPlaybackFailure() {
        if (this.state.firstPlayTime) {
            const duration = Date.now() - this.state.firstPlayTime;
            // Record lifetime if reasonable (1 minute to 3 hours)
            if (duration > 60000 && duration < 3 * 3600 * 1000) {
                this.state.observedLifetime = duration;
                this.log(`Recorded observed token lifetime: ${Math.round(duration / 1000)} seconds.`);
            }
        }
        this.reset();
    }

    /**
     * Simple parser to extract variant/audio playlist URLs from master manifest
     */
    parseManifestUrls(manifestText, baseUrl) {
        const lines = manifestText.split('\n');
        const levels = [];
        const audios = [];
        const proxyUrlPrefix = `${window.location.origin}/proxy?url=`;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Variant level playlists
            if (line.startsWith('#EXT-X-STREAM-INF')) {
                let nextLine = '';
                for (let j = i + 1; j < lines.length; j++) {
                    const candidate = lines[j].trim();
                    if (candidate && !candidate.startsWith('#')) {
                        nextLine = candidate;
                        break;
                    }
                }
                if (nextLine) {
                    try {
                        let absoluteTarget = new URL(nextLine, baseUrl).href;
                        // Build full proxy URL to match standard app.js behavior
                        levels.push(proxyUrlPrefix + encodeURIComponent(absoluteTarget));
                    } catch (e) {
                        levels.push(nextLine);
                    }
                }
            }

            // Audio track playlists
            if (line.startsWith('#EXT-X-MEDIA') && line.includes('TYPE=AUDIO')) {
                const uriMatch = line.match(/URI=["']([^"']+)["']/i);
                if (uriMatch) {
                    const rawUri = uriMatch[1];
                    try {
                        let absoluteTarget = new URL(rawUri, baseUrl).href;
                        audios.push(proxyUrlPrefix + encodeURIComponent(absoluteTarget));
                    } catch (e) {
                        audios.push(rawUri);
                    }
                }
            }
        }

        return { levels, audios };
    }
}

// Global instance exposed on window
window.playlistRefreshManager = new PlaylistRefreshManager();
