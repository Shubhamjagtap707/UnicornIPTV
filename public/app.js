// IPTV Player Frontend Logic

// State management
let state = {
    groups: [],
    channels: [],
    currentPage: 1,
    limit: 48,
    totalPages: 1,
    activeCategory: null, // null means "All Channels", "favorites" means Favorites
    searchQuery: '',
    favorites: new Set(),
    currentChannel: null,

    // Custom Player Settings
    dataSaverMode: false,
    selectedQualityLevel: -1, // -1 means Auto
    controlsTimeout: null,

    // Player instances
    hlsInstance: null,
    dashInstance: null,
    mpegtsInstance: null,
    isLoadingChannels: false
};

// DOM Elements
const videoPlayer = document.getElementById('video-player');
const playerOverlay = document.getElementById('player-overlay');
const playerLoader = document.getElementById('player-loader');
const playerError = document.getElementById('player-error');
const playerErrorMsg = document.getElementById('player-error-msg');
const playerWelcome = document.getElementById('player-welcome');
const playerRetryBtn = document.getElementById('player-retry');

const nowPlayingTitle = document.getElementById('now-playing-title');
const nowPlayingGroup = document.getElementById('now-playing-group');
const nowPlayingEngine = document.getElementById('now-playing-engine');
const nowPlayingUrl = document.getElementById('now-playing-url');
const nowPlayingFavBtn = document.getElementById('now-playing-fav-btn');

const categoriesContainer = document.getElementById('categories-container');
const groupSearchInput = document.getElementById('group-search');
const channelSearchInput = document.getElementById('channel-search');
const searchClearBtn = document.getElementById('search-clear');
const totalChannelCountEl = document.getElementById('total-channel-count');
const activeCategoryTitle = document.getElementById('active-category-title');
const resultsCountEl = document.getElementById('results-count');
const channelGridContainer = document.getElementById('channel-grid-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreArea = document.getElementById('load-more-area');

const btnAllChannels = document.getElementById('btn-all-channels');
const btnAllCategories = document.getElementById('btn-all-categories');
const btnFavorites = document.getElementById('btn-favorites');
const favCountEl = document.getElementById('fav-count');

// Custom Player DOM Elements
const videoWrapper = document.getElementById('video-wrapper');
const ctrlPlayPause = document.getElementById('ctrl-play-pause');
const ctrlVolume = document.getElementById('ctrl-volume');
const ctrlVolumeSlider = document.getElementById('ctrl-volume-slider');
const ctrlDataSaver = document.getElementById('ctrl-data-saver');
const ctrlSettings = document.getElementById('ctrl-settings');
const ctrlFullscreen = document.getElementById('ctrl-fullscreen');
const playerSettingsPopup = document.getElementById('player-settings-popup');
const qualityOptionsList = document.getElementById('quality-options-list');
const centerPlayBtn = document.getElementById('center-play-btn');

// EPG DOM Elements
const epgTimelineContainer = document.getElementById('epg-timeline-container');
const epgNowTitle = document.getElementById('epg-now-title');
const epgNowTime = document.getElementById('epg-now-time');
const epgNowProgress = document.getElementById('epg-now-progress');
const epgNextTitle = document.getElementById('epg-next-title');
const epgNextTime = document.getElementById('epg-next-time');

const API_BASE = ''; // Same host

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    fetchCategories();
    switchSidebarView('channels');
    syncSidebarVisibility();
    loadChannels(1, false);
    setupEventListeners();
});

// Load favorites from local storage
function loadFavorites() {
    const saved = localStorage.getItem('iptv_favorites');
    if (saved) {
        try {
            const arr = JSON.parse(saved);
            state.favorites = new Set(arr);
            updateFavoritesBadge();
        } catch (e) {
            console.error('Failed to parse favorites:', e);
        }
    }
}

// Save favorites to local storage
function saveFavorites() {
    localStorage.setItem('iptv_favorites', JSON.stringify(Array.from(state.favorites)));
    updateFavoritesBadge();
}

function updateFavoritesBadge() {
    favCountEl.textContent = state.favorites.size;
}

// Fetch categories from backend
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE}/api/groups`);
        const data = await response.json();
        if (data.success) {
            state.groups = data.groups;
            renderCategories();
            
            // Sum all channel counts
            const totalCount = data.groups.reduce((acc, g) => acc + g.count, 0);
            totalChannelCountEl.textContent = totalCount.toLocaleString();
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        categoriesContainer.innerHTML = `<div class="error-text">Failed to load categories</div>`;
    }
}

// Helper: Map keywords inside category names to suitable Boxicons
function getCategoryIcon(catName) {
    const name = catName.toLowerCase();
    if (name.includes('all')) return 'bx-category';
    if (name.includes('news')) return 'bx-news';
    if (name.includes('sport') || name.includes('football') || name.includes('cricket') || name.includes('golf')) return 'bx-run';
    if (name.includes('movie') || name.includes('cinema') || name.includes('film')) return 'bx-movie-play';
    if (name.includes('music') || name.includes('song')) return 'bx-music';
    if (name.includes('kid') || name.includes('cartoon') || name.includes('animation')) return 'bx-smile';
    if (name.includes('document') || name.includes('history') || name.includes('science')) return 'bx-book-open';
    if (name.includes('entertainment') || name.includes('show') || name.includes('variety')) return 'bx-party';
    if (name.includes('religion') || name.includes('god') || name.includes('faith') || name.includes('church')) return 'bx-compass';
    if (name.includes('education') || name.includes('learn')) return 'bx-graduation';
    if (name.includes('weather')) return 'bx-cloud';
    if (name.includes('game') || name.includes('esport')) return 'bx-game';
    if (name.includes('life') || name.includes('style') || name.includes('fashion')) return 'bx-heart';
    if (name.includes('fav')) return 'bxs-heart';
    
    return 'bx-folder'; // default icon
}

// Render Categories Sidebar
function renderCategories() {
    const filterText = groupSearchInput.value.toLowerCase();
    const filteredGroups = state.groups.filter(g => g.name.toLowerCase().includes(filterText));
    
    // Add "All Categories" button to reset the group filter
    const totalCount = state.groups.reduce((acc, g) => acc + g.count, 0);
    const isAllActive = state.activeCategory === null;
    let html = `
        <button class="category-btn ${isAllActive ? 'active' : ''}" data-group="all-categories">
            <span class="cat-btn-left">
                <i class='bx bx-category cat-icon'></i>
                <span>All Categories</span>
            </span>
            <span class="cat-count">${totalCount}</span>
        </button>
    `;

    if (filteredGroups.length > 0) {
        html += filteredGroups.map(group => {
            const isActive = state.activeCategory === group.name;
            return `
                <button class="category-btn ${isActive ? 'active' : ''}" data-group="${group.name}">
                    <span class="cat-btn-left">
                        <i class='bx ${getCategoryIcon(group.name)} cat-icon'></i>
                        <span>${escapeHtml(group.name)}</span>
                    </span>
                    <span class="cat-count">${group.count}</span>
                </button>
            `;
        }).join('');
    } else if (html === '') {
        categoriesContainer.innerHTML = '<div class="category-btn" style="pointer-events: none; opacity: 0.5;">No groups found</div>';
        return;
    }

    categoriesContainer.innerHTML = html;

    // Attach click listeners to category buttons
    categoriesContainer.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const groupName = btn.dataset.group;
            if (groupName === 'all-categories') {
                setActiveCategory(null);
            } else {
                setActiveCategory(groupName);
            }
        });
    });
}

// Switch Sidebar View between channels list and categories list
function switchSidebarView(view) {
    const sidebar = document.getElementById('sidebar-panel');
    if (!sidebar) return;
    
    if (view === 'channels') {
        sidebar.classList.remove('view-categories');
        sidebar.classList.add('view-channels');
    } else if (view === 'categories') {
        sidebar.classList.remove('view-channels');
        sidebar.classList.add('view-categories');
        renderCategories(); // ensure list is populated/rendered
    }
}

// Sync sidebar open/close class based on active focus zone
function syncSidebarVisibility() {
    const sidebar = document.getElementById('sidebar-panel');
    if (!sidebar) return;
    
    if (focusedZone === 'sidebar') {
        sidebar.classList.add('open');
    } else {
        sidebar.classList.remove('open');
    }
}

// Set active category and fetch its channels
function setActiveCategory(category) {
    // Remove active states
    document.querySelectorAll('.sidebar-menu .menu-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.category-list .category-btn').forEach(el => el.classList.remove('active'));

    state.activeCategory = category;
    state.currentPage = 1;
    state.searchQuery = '';
    channelSearchInput.value = '';
    if (searchClearBtn) searchClearBtn.style.display = 'none';

    if (category === 'favorites') {
        if (btnFavorites) btnFavorites.classList.add('active');
        activeCategoryTitle.textContent = 'My Favorites';
    } else if (category === null) {
        if (btnAllChannels) btnAllChannels.classList.add('active');
        activeCategoryTitle.textContent = 'All Channels';
    } else {
        // Highlight category button
        const catBtn = categoriesContainer.querySelector(`[data-group="${category}"]`);
        if (catBtn) catBtn.classList.add('active');
        activeCategoryTitle.textContent = category;
    }

    // Switch view back to channels list!
    switchSidebarView('channels');

    // Fetch channels and set focus to the first channel card
    loadChannels(1, false).then(() => {
        // Focus first channel card and ensure sidebar remains open
        focusedZone = 'sidebar';
        const items = getFocusables('sidebar');
        const firstChanIdx = items.findIndex(el => el.classList.contains('channel-card'));
        focusedIndex = firstChanIdx !== -1 ? firstChanIdx : 0;
        
        // Force sidebar state to stay open during transition
        const sidebar = document.getElementById('sidebar-panel');
        if (sidebar) sidebar.classList.add('open');
        
        updateSpatialFocusIndicator();
    });
}

// Fetch and load channels
async function loadChannels(page = 1, append = false) {
    if (state.isLoadingChannels) return;
    state.isLoadingChannels = true;
    
    showSkeletons(append);
    state.currentPage = page;

    try {
        let url = `${API_BASE}/api/channels?page=${page}&limit=${state.limit}`;
        
        if (state.activeCategory === 'favorites') {
            if (state.favorites.size === 0) {
                renderChannels([], false);
                resultsCountEl.textContent = '0 channels';
                state.isLoadingChannels = false;
                return;
            }
            const idsList = Array.from(state.favorites).join(',');
            url += `&ids=${encodeURIComponent(idsList)}`;
        } else if (state.activeCategory) {
            url += `&group=${encodeURIComponent(state.activeCategory)}`;
        }

        if (state.searchQuery) {
            url += `&search=${encodeURIComponent(state.searchQuery)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
            state.totalPages = data.totalPages;
            
            if (append) {
                state.channels = [...state.channels, ...data.channels];
                renderChannels(data.channels, true);
            } else {
                state.channels = data.channels;
                renderChannels(data.channels, false);
            }

            resultsCountEl.textContent = `Showing ${state.channels.length} of ${data.total} channels`;
        }
    } catch (error) {
        console.error('Error loading channels:', error);
        channelGridContainer.innerHTML = `<div class="error-text">Failed to load channels. Please refresh or retry.</div>`;
    } finally {
        state.isLoadingChannels = false;
        // Clean up skeletons if any are left
        const skeletons = channelGridContainer.querySelectorAll('.skeleton-card');
        skeletons.forEach(el => el.remove());
    }
}

// Render channel cards in grid
function renderChannels(channelsList, append = false) {
    if (!append) {
        channelGridContainer.innerHTML = '';
    }

    // Remove skeleton loaders
    const skeletons = channelGridContainer.querySelectorAll('.skeleton-card');
    skeletons.forEach(el => el.remove());

    if (channelsList.length === 0 && !append) {
        channelGridContainer.innerHTML = `
            <div class="no-results">
                <i class='bx bx-search-alt' style="font-size: 48px; margin-bottom: 12px; color: var(--text-dark);"></i>
                <p>No channels found.</p>
            </div>
        `;
        return;
    }

    const html = channelsList.map(ch => {
        const isFav = state.favorites.has(ch.id);
        const isPlaying = state.currentChannel && state.currentChannel.id === ch.id;
        const logoUrl = ch.logo && ch.logo.startsWith('http') ? ch.logo : null;
        
        return `
            <div class="channel-card ${isPlaying ? 'playing' : ''}" data-id="${ch.id}">
                <div class="channel-logo-container">
                    ${logoUrl ? 
                        `<img src="${logoUrl}" class="channel-logo" alt="${escapeHtml(ch.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                        ''
                    }
                    <div class="channel-logo-fallback" style="${logoUrl ? 'display:none;' : 'display:flex;'}">
                        <i class='bx bx-tv'></i>
                    </div>
                </div>
                <div class="channel-info">
                    <span class="channel-name" title="${escapeHtml(ch.name)}">${escapeHtml(ch.name)}</span>
                    <span class="channel-group">${escapeHtml(ch.group || 'General')}</span>
                </div>
                <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${ch.id}">
                    <i class='bx ${isFav ? 'bxs-heart' : 'bx-heart'}'></i>
                </button>
            </div>
        `;
    }).join('');

    channelGridContainer.insertAdjacentHTML('beforeend', html);

    // Attach click events
    channelGridContainer.querySelectorAll('.channel-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Avoid selecting card if they click the heart button
            if (e.target.closest('.card-fav-btn')) return;
            
            const id = card.dataset.id;
            const channel = state.channels.find(ch => ch.id === id);
            if (channel) {
                playChannel(channel);
            }
        });
    });

    channelGridContainer.querySelectorAll('.card-fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            toggleFavorite(id);
            
            // Toggle active status UI
            const icon = btn.querySelector('i');
            if (state.favorites.has(id)) {
                btn.classList.add('active');
                icon.className = 'bx bxs-heart';
            } else {
                btn.classList.remove('active');
                icon.className = 'bx bx-heart';
                // If we are currently in favorites tab, remove the card
                if (state.activeCategory === 'favorites') {
                    const card = channelGridContainer.querySelector(`.channel-card[data-id="${id}"]`);
                    if (card) card.remove();
                    updateFavoritesBadge();
                }
            }
        });
    });
}

// Show skeleton loading animations
function showSkeletons(append = false) {
    const skeletonHtml = Array(12).fill('<div class="skeleton-card"></div>').join('');
    if (append) {
        channelGridContainer.insertAdjacentHTML('beforeend', skeletonHtml);
    } else {
        channelGridContainer.innerHTML = skeletonHtml;
    }
}

// Toggle channel favorite
function toggleFavorite(id) {
    if (state.favorites.has(id)) {
        state.favorites.delete(id);
    } else {
        state.favorites.add(id);
    }
    saveFavorites();
    
    // Update active stream favorites icon if applicable
    if (state.currentChannel && state.currentChannel.id === id) {
        updateNowPlayingFavIcon();
    }
}

function updateNowPlayingFavIcon() {
    if (state.currentChannel && state.favorites.has(state.currentChannel.id)) {
        nowPlayingFavBtn.classList.add('active');
        nowPlayingFavBtn.querySelector('i').className = 'bx bxs-heart';
    } else {
        nowPlayingFavBtn.classList.remove('active');
        nowPlayingFavBtn.querySelector('i').className = 'bx bx-heart';
    }
}

// Cleanup existing video players
function destroyPlayers() {
    // Reset Playlist Refresh Manager timers/session
    if (window.playlistRefreshManager) {
        window.playlistRefreshManager.reset();
    }

    // 1. Destroy HLS
    if (state.hlsInstance) {
        state.hlsInstance.destroy();
        state.hlsInstance = null;
    }
    // 2. Destroy Dash
    if (state.dashInstance) {
        state.dashInstance.destroy();
        state.dashInstance = null;
    }
    // 3. Destroy MPEG-TS
    if (state.mpegtsInstance) {
        state.mpegtsInstance.destroy();
        state.mpegtsInstance = null;
    }
    
    videoPlayer.src = '';
    videoPlayer.removeAttribute('src');
    videoPlayer.load();
}

// Auto-detect engine by url
function getStreamEngine(url) {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('.mpd') || lowerUrl.includes('mpd.php')) {
        return 'DASH';
    }
    if (lowerUrl.includes('.ts')) {
        return 'MPEG-TS';
    }
    // HLS is standard for IPTV .m3u8, .php, and stream redirections
    if (lowerUrl.includes('.m3u8') || lowerUrl.includes('.php') || lowerUrl.includes('stream=')) {
        return 'HLS';
    }
    return 'HLS'; // Default fallback engine
}

// Play Selected Channel
function playChannel(channel) {
    // Clear recovery flags if this is a manual change to a different channel
    if (!state.isRecovering || (state.currentChannel && state.currentChannel.id !== channel.id)) {
        state.isRecovering = false;
        state.recoveryAudioTrackName = null;
        state.recoveryAudioTrackLang = null;
    }
    state.currentChannel = channel;
    
    // Highlight active card
    document.querySelectorAll('.channel-card').forEach(card => {
        if (card.dataset.id === channel.id) {
            card.classList.add('playing');
        } else {
            card.classList.remove('playing');
        }
    });

    // Update Stream Panel Info
    nowPlayingTitle.textContent = channel.name;
    nowPlayingGroup.textContent = channel.group || 'General';
    nowPlayingUrl.textContent = channel.url;
    updateNowPlayingFavIcon();
    updateEpgGuide(channel);

    // Reset video player container state
    playerWelcome.style.display = 'none';
    playerError.style.display = 'none';
    playerLoader.style.display = 'flex';
    playerOverlay.style.opacity = '1';
    playerOverlay.style.pointerEvents = 'auto';

    destroyPlayers();

    const engine = getStreamEngine(channel.url);
    nowPlayingEngine.textContent = engine;
    console.log(`Playing channel "${channel.name}" using engine: ${engine}`);

    // Set up standard HTML5 media event hooks
    const clearOverlay = () => {
        playerOverlay.style.opacity = '0';
        playerOverlay.style.pointerEvents = 'none';
        playerLoader.style.display = 'none';
    };

    // Track retry attempts
    if (!state.retryCount) state.retryCount = 0;
    if (state.lastPlayedChannelId !== channel.id) {
        state.retryCount = 0;
        state.lastPlayedChannelId = channel.id;
    }

    const handlePlayError = (err) => {
        console.error('Playback Error:', err);
        
        const maxRetries = 3;
        if (state.retryCount < maxRetries) {
            state.retryCount++;
            console.log(`Auto-retry attempt ${state.retryCount}/${maxRetries} for channel "${channel.name}" in 2 seconds...`);
            playerLoader.style.display = 'flex';
            playerError.style.display = 'none';
            
            // Show retry status message to user on overlay
            nowPlayingTitle.textContent = `${channel.name} (Retrying ${state.retryCount}/${maxRetries}...)`;
            
            setTimeout(() => {
                if (state.currentChannel && state.currentChannel.id === channel.id) {
                    playChannel(channel);
                }
            }, 2000);
        } else {
            // All retries failed, show permanent error layout
            state.retryCount = 0; // reset for future manual/automatic clicks
            state.isRecovering = false; // reset recovery guard
            nowPlayingTitle.textContent = channel.name; // Restore clean name
            playerLoader.style.display = 'none';
            playerError.style.display = 'flex';
            playerErrorMsg.textContent = `The ${engine} stream is unavailable, offline, or blocked.`;
            playerOverlay.style.opacity = '1';
            playerOverlay.style.pointerEvents = 'auto';
        }
    };

    // Reset quality levels list UI
    qualityOptionsList.innerHTML = '<button class="option-item active" data-level="-1">Auto</button>';

    videoPlayer.onplaying = () => {
        clearOverlay();
        ctrlPlayPause.innerHTML = "<i class='bx bx-pause'></i>";
        state.isRecovering = false; // reset recovery guard
        
        // Hide sidebar and clear controls overlay for clean fullscreen playback ONLY if user is not actively navigating the sidebar
        if (focusedZone !== 'sidebar') {
            focusedZone = 'controls'; // loses sidebar focus -> sidebar slides out
            videoWrapper.classList.remove('show-controls');
            videoWrapper.classList.add('hide-cursor');
            updateSpatialFocusIndicator();
        }
    };
    
    videoPlayer.onerror = (e) => handlePlayError(e);

    try {
        // Route HLS, MPEG-TS, and DASH streams through our proxy to avoid browser CORS blocks
        const playUrl = (engine === 'HLS' || engine === 'MPEG-TS' || engine === 'DASH')
            ? `${window.location.origin}/proxy?url=${encodeURIComponent(channel.url)}`
            : channel.url;

        if (engine === 'DASH') {
            state.dashInstance = dashjs.MediaPlayer().create();
            state.dashInstance.initialize(videoPlayer, playUrl, true);
            state.dashInstance.on('error', (e) => handlePlayError(e));
        } 
        else if (engine === 'MPEG-TS') {
            if (mpegts.getFeatureList().mseLivePlayback) {
                state.mpegtsInstance = mpegts.createPlayer({
                    type: 'mpegts',
                    url: playUrl,
                    isLive: true
                });
                state.mpegtsInstance.attachMediaElement(videoPlayer);
                state.mpegtsInstance.load();
                state.mpegtsInstance.play().catch(e => handlePlayError(e));
                state.mpegtsInstance.on(mpegts.ErrorTypes.NETWORK_ERROR, (e) => handlePlayError(e));
                state.mpegtsInstance.on(mpegts.ErrorTypes.MEDIA_ERROR, (e) => handlePlayError(e));
            } else {
                handlePlayError('MPEG-TS browser playback is not supported.');
            }
        } 
        else { // HLS Default
            if (Hls.isSupported()) {
                // Initialize the Playlist Refresh Manager for this channel session
                if (window.playlistRefreshManager) {
                    window.playlistRefreshManager.start(channel.url, playUrl);
                }

                // Custom loader that intercepts level/manifest fetches and replaces them on hot-swap
                class ManagerPlaylistLoader extends Hls.DefaultConfig.loader {
                    load(context, config, callbacks) {
                        if (window.playlistRefreshManager) {
                            if (context.type === 'manifest') {
                                context.url = window.playlistRefreshManager.getSwappedMasterUrl(context.url);
                            } else if (context.type === 'level' || context.type === 'playlist') {
                                context.url = window.playlistRefreshManager.getSwappedLevelUrl(context.level, context.url);
                            } else if (context.type === 'audioTrack') {
                                context.url = window.playlistRefreshManager.getSwappedAudioUrl(context.id, context.url);
                            }
                        }
                        super.load(context, config, callbacks);
                    }
                }

                state.hlsInstance = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                    maxBufferLength: 8,
                    maxMaxBufferLength: 15,
                    pLoader: ManagerPlaylistLoader
                });
                state.hlsInstance.loadSource(playUrl);
                state.hlsInstance.attachMedia(videoPlayer);
                 state.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
                    populateQualityLevels();
                    if (state.dataSaverMode) {
                        applyDataSaverQuality();
                    } else if (state.selectedQualityLevel !== -1) {
                        setHlsQuality(state.selectedQualityLevel);
                    }

                    // Restore saved audio track if any from recovery state
                    if (state.recoveryAudioTrackName || state.recoveryAudioTrackLang) {
                        const tracks = state.hlsInstance.audioTracks;
                        let matchedIdx = -1;
                        if (state.recoveryAudioTrackName) {
                            matchedIdx = tracks.findIndex(t => t.name === state.recoveryAudioTrackName);
                        }
                        if (matchedIdx === -1 && state.recoveryAudioTrackLang) {
                            matchedIdx = tracks.findIndex(t => t.lang === state.recoveryAudioTrackLang);
                        }
                        if (matchedIdx !== -1) {
                            console.log(`[RECOVERY] Restoring audio track to index ${matchedIdx} (Name: ${tracks[matchedIdx].name})`);
                            state.hlsInstance.audioTrack = matchedIdx;
                        }
                        // Clear fields so we don't apply it again on quality switch
                        state.recoveryAudioTrackName = null;
                        state.recoveryAudioTrackLang = null;
                    }

                    if (state.isRecovering) {
                        const newPlayUrl = state.hlsInstance.url || playUrl;
                        console.log(`[RECOVERY] New signed URL obtained: ${newPlayUrl}`);
                        console.log(`[RECOVERY] Playback recovery success for channel: "${channel.name}"`);
                    }

                    videoPlayer.play().catch(e => {
                        if (state.isRecovering) {
                            console.error('[RECOVERY] Playback recovery failure:', e);
                        }
                        handlePlayError(e);
                    });
                });
                state.hlsInstance.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
                    if (state.selectedQualityLevel === -1) {
                        const autoBtn = qualityOptionsList.querySelector('.option-item[data-level="-1"]');
                        if (autoBtn) {
                            const currentIdx = data.level;
                            if (state.hlsInstance.levels[currentIdx]) {
                                const lvl = state.hlsInstance.levels[currentIdx];
                                const res = lvl.height ? `${lvl.height}p` : `Level ${currentIdx}`;
                                autoBtn.innerHTML = `<span>Auto (${res})</span>`;
                            }
                        }
                    }
                });
                state.hlsInstance.on(Hls.Events.ERROR, (event, data) => {
                    // Check if request failed because of token expiration (401 or 403 response)
                    const statusCode = data.response ? data.response.code : 0;
                    const isTokenExpired = statusCode === 401 || statusCode === 403;

                    if (isTokenExpired) {
                        console.warn(`[TOKEN EXPIRATION] HLS Token Expiration Detected (${statusCode}) on ${data.details}. Initiating automatic stream recovery...`);
                        if (window.playlistRefreshManager) {
                            window.playlistRefreshManager.reportPlaybackFailure();
                        }
                        triggerHLSRecovery();
                        return;
                    }

                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.warn('HLS Fatal Network Error, attempting HLS recovery...');
                                state.hlsInstance.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.warn('HLS Fatal Media Error, attempting HLS recovery...');
                                state.hlsInstance.recoverMediaError();
                                break;
                            default:
                                console.error('HLS Unrecoverable Error:', data.details);
                                handlePlayError(data.details);
                                break;
                        }
                    } else {
                        // Log non-fatal errors but do NOT trigger a channel reload
                        console.warn('HLS Non-fatal Error:', data.details || data.type);
                    }
                });
            } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
                // Native Safari support
                videoPlayer.src = playUrl;
                videoPlayer.play().catch(e => handlePlayError(e));
            } else {
                handlePlayError('HLS playback is not supported on this browser.');
            }
        }
    } catch (e) {
        handlePlayError(e.message || e);
    }
}

// Automatic stream recovery for HLS token expiration
function triggerHLSRecovery() {
    if (!state.currentChannel) return;
    if (state.isRecovering) {
        console.log('[RECOVERY] Recovery already in progress, ignoring duplicate trigger.');
        return;
    }
    state.isRecovering = true;
    console.log(`[RECOVERY] Token expiration detected! Automatic playlist refresh initiated for channel: "${state.currentChannel.name}"`);

    // Save current user/player states to restore
    const savedVolume = videoPlayer.volume;
    const savedMuted = videoPlayer.muted;
    const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    
    let savedAudioTrackName = null;
    let savedAudioTrackLang = null;
    if (state.hlsInstance) {
        const currentTrackIdx = state.hlsInstance.audioTrack;
        const currentTrack = state.hlsInstance.audioTracks[currentTrackIdx];
        if (currentTrack) {
            savedAudioTrackName = currentTrack.name;
            savedAudioTrackLang = currentTrack.lang;
            console.log(`[RECOVERY] Saved audio track: name="${savedAudioTrackName}", lang="${savedAudioTrackLang}"`);
        }
    }

    const channelToReload = state.currentChannel;
    const oldPlayUrl = (state.hlsInstance && state.hlsInstance.url) || nowPlayingUrl.textContent;
    console.log(`[RECOVERY] Old signed URL: ${oldPlayUrl}`);
    console.log(`[RECOVERY] Re-fetching original playlist URL: ${channelToReload.url}`);

    // Clean up current players
    destroyPlayers();

    // Set recovery target fields in state so they are restored on load
    state.recoveryAudioTrackName = savedAudioTrackName;
    state.recoveryAudioTrackLang = savedAudioTrackLang;

    // Reload channel immediately (will request a fresh signed URL through /proxy)
    playChannel(channelToReload);

    // Re-apply saved states
    videoPlayer.volume = savedVolume;
    videoPlayer.muted = savedMuted;

    if (isFullscreen && !document.fullscreenElement) {
        const videoWrapper = document.getElementById('videoWrapper') || videoPlayer.parentElement;
        if (videoWrapper) {
            if (videoWrapper.requestFullscreen) {
                videoWrapper.requestFullscreen().catch(e => console.error('[RECOVERY] Failed to restore fullscreen:', e));
            } else if (videoWrapper.webkitRequestFullscreen) {
                videoWrapper.webkitRequestFullscreen();
            }
        }
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Menu items
    btnAllChannels.addEventListener('click', () => setActiveCategory(null));
    if (btnAllCategories) {
        btnAllCategories.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-menu .menu-item').forEach(el => el.classList.remove('active'));
            btnAllCategories.classList.add('active');
            switchSidebarView('categories');
            
            // Focus first category button
            focusedZone = 'sidebar';
            const items = getFocusables('sidebar');
            const catIdx = items.findIndex(el => el.classList.contains('category-btn'));
            focusedIndex = catIdx !== -1 ? catIdx : 0;
            updateSpatialFocusIndicator();
        });
    }
    btnFavorites.addEventListener('click', () => setActiveCategory('favorites'));

    // Category search
    let groupSearchTimeout;
    groupSearchInput.addEventListener('input', () => {
        clearTimeout(groupSearchTimeout);
        groupSearchTimeout = setTimeout(() => {
            renderCategories();
        }, 150);
    });

    // Global channel search
    let channelSearchTimeout;
    channelSearchInput.addEventListener('input', () => {
        state.searchQuery = channelSearchInput.value.trim();
        if (state.searchQuery) {
            searchClearBtn.style.display = 'flex';
        } else {
            searchClearBtn.style.display = 'none';
        }

        clearTimeout(channelSearchTimeout);
        channelSearchTimeout = setTimeout(() => {
            state.currentPage = 1;
            loadChannels(1, false);
        }, 300);
    });

    searchClearBtn.addEventListener('click', () => {
        channelSearchInput.value = '';
        state.searchQuery = '';
        searchClearBtn.style.display = 'none';
        state.currentPage = 1;
        loadChannels(1, false);
    });

    // Infinite scrolling on scroll container reach-bottom
    if (channelGridContainer) {
        channelGridContainer.addEventListener('scroll', () => {
            const threshold = 150; // pixels from the bottom
            const isNearBottom = (channelGridContainer.scrollHeight - channelGridContainer.scrollTop - channelGridContainer.clientHeight) < threshold;
            if (isNearBottom && !state.isLoadingChannels && state.currentPage < state.totalPages) {
                loadChannels(state.currentPage + 1, true);
            }
        });
    }

    // Favorite button on playing deck
    nowPlayingFavBtn.addEventListener('click', () => {
        if (state.currentChannel) {
            toggleFavorite(state.currentChannel.id);
            // Reload channels list if we are on favorites tab
            if (state.activeCategory === 'favorites') {
                loadChannels(1, false);
            }
        }
    });

    // Retry Button
    playerRetryBtn.addEventListener('click', () => {
        if (state.currentChannel) {
            playChannel(state.currentChannel);
        }
    });

}

// Helper: Escape HTML strings to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/* =========================================================================
   YOUTUBE TV CUSTOM PLAYER LOGIC
   ========================================================================= */

function initCustomPlayer() {
    // 1. Play / Pause Control
    const togglePlay = () => {
        if (!state.currentChannel) return;
        if (videoPlayer.paused) {
            videoPlayer.play().catch(e => console.warn(e));
            ctrlPlayPause.innerHTML = "<i class='bx bx-pause'></i>";
            flashCenterBtn('play');
        } else {
            videoPlayer.pause();
            ctrlPlayPause.innerHTML = "<i class='bx bx-play'></i>";
            flashCenterBtn('pause');
        }
    };

    ctrlPlayPause.addEventListener('click', togglePlay);

    // Flash Play/Pause Center Indicator
    const flashCenterBtn = (type) => {
        centerPlayBtn.innerHTML = type === 'play' ? "<i class='bx bx-play'></i>" : "<i class='bx bx-pause'></i>";
        centerPlayBtn.classList.remove('animate');
        void centerPlayBtn.offsetWidth; // Force Reflow
        centerPlayBtn.classList.add('animate');
    };

    // 2. Volume Controls
    const updateVolume = (val) => {
        videoPlayer.volume = val;
        videoPlayer.muted = (val === 0);
        ctrlVolumeSlider.value = val;
        
        if (val === 0 || videoPlayer.muted) {
            ctrlVolume.innerHTML = "<i class='bx bx-volume-mute'></i>";
        } else if (val < 0.5) {
            ctrlVolume.innerHTML = "<i class='bx bx-volume-low'></i>";
        } else {
            ctrlVolume.innerHTML = "<i class='bx bx-volume-full'></i>";
        }
    };

    ctrlVolumeSlider.addEventListener('input', (e) => {
        updateVolume(parseFloat(e.target.value));
    });

    ctrlVolume.addEventListener('click', () => {
        if (videoPlayer.muted) {
            videoPlayer.muted = false;
            updateVolume(videoPlayer.volume || 1);
        } else {
            videoPlayer.muted = true;
            ctrlVolume.innerHTML = "<i class='bx bx-volume-mute'></i>";
        }
    });

    // 3. Settings Gear Modal toggling
    ctrlSettings.addEventListener('click', (e) => {
        e.stopPropagation();
        playerSettingsPopup.classList.toggle('active');
    });

    // Close settings gear when clicking anywhere else
    document.addEventListener('click', () => {
        playerSettingsPopup.classList.remove('active');
    });

    playerSettingsPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 4. Data Saver Toggle
    ctrlDataSaver.addEventListener('click', () => {
        state.dataSaverMode = !state.dataSaverMode;
        if (state.dataSaverMode) {
            ctrlDataSaver.classList.add('active');
            ctrlDataSaver.querySelector('.btn-label').textContent = "Data Saver On";
            applyDataSaverQuality();
        } else {
            ctrlDataSaver.classList.remove('active');
            ctrlDataSaver.querySelector('.btn-label').textContent = "Data Saver Off";
            setHlsQuality(-1); // Revert to Auto
        }
    });

    // 5. Fullscreen Toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            const req = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen;
            if (req) {
                req.call(document.documentElement).catch(err => {
                    console.error(`Fullscreen request failed: ${err.message}`);
                });
            }
        } else {
            const exit = document.exitFullscreen || document.webkitExitFullscreen;
            if (exit) exit.call(document);
        }
    };

    ctrlFullscreen.addEventListener('click', toggleFullscreen);
    videoPlayer.addEventListener('dblclick', toggleFullscreen);

    // Sync fullscreen status on native escape/exit
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            ctrlFullscreen.innerHTML = "<i class='bx bx-exit-fullscreen'></i>";
        } else {
            ctrlFullscreen.innerHTML = "<i class='bx bx-fullscreen'></i>";
        }
    });
    document.addEventListener('webkitfullscreenchange', () => {
        if (document.webkitFullscreenElement) {
            ctrlFullscreen.innerHTML = "<i class='bx bx-exit-fullscreen'></i>";
        } else {
            ctrlFullscreen.innerHTML = "<i class='bx bx-fullscreen'></i>";
        }
    });

    // 6. YouTube TV Auto-hide Controls UI on Inactivity
    const showControls = () => {
        videoWrapper.classList.add('show-controls');
        videoWrapper.classList.remove('hide-cursor');
        
        if (state.controlsTimeout) clearTimeout(state.controlsTimeout);
        
        // Hide only if playing
        if (!videoPlayer.paused) {
            state.controlsTimeout = setTimeout(() => {
                // If settings modal is open, or sidebar is open, do NOT auto-hide controls
                if (playerSettingsPopup.classList.contains('active') || focusedZone === 'sidebar') return;
                
                videoWrapper.classList.remove('show-controls');
                videoWrapper.classList.add('hide-cursor');
            }, 3000);
        }
    };

    window.showControls = showControls;

    // Show controls strictly on OK/Enter (remote) or touch/click on video screen
    videoWrapper.addEventListener('click', (e) => {
        // Ignore clicks on active controls panels
        if (e.target.closest('.video-controls-container') || e.target.closest('.now-playing-bar') || e.target.closest('#player-settings-popup')) {
            return;
        }

        if (!videoWrapper.classList.contains('show-controls')) {
            e.stopPropagation();
            videoWrapper.classList.add('show-controls');
            videoWrapper.classList.remove('hide-cursor');
            focusedZone = 'controls';
            focusedIndex = 0;
            updateSpatialFocusIndicator();
            showControls();
        }
    });

    videoPlayer.addEventListener('pause', () => {
        videoWrapper.classList.add('show-controls');
        videoWrapper.classList.remove('hide-cursor');
        if (state.controlsTimeout) clearTimeout(state.controlsTimeout);
    });

    // 7. Keyboard Hotkeys (Space, M, F)
    document.addEventListener('keydown', (e) => {
        // Ignore hotkeys when inputting text in search boxes
        if (document.activeElement.tagName === 'INPUT') return;

        const key = e.key.toLowerCase();
        if (key === ' ' || key === 'spacebar') {
            e.preventDefault();
            togglePlay();
        } else if (key === 'm') {
            e.preventDefault();
            ctrlVolume.click();
        } else if (key === 'f') {
            e.preventDefault();
            toggleFullscreen();
        }
    });
}

// Populate Quality Selection Dropdown dynamically
function populateQualityLevels() {
    qualityOptionsList.innerHTML = '';
    
    // Auto Option
    let autoLabel = 'Auto';
    if (state.selectedQualityLevel === -1 && state.hlsInstance && state.hlsInstance.currentLevel !== -1) {
        const currentIdx = state.hlsInstance.currentLevel;
        if (state.hlsInstance.levels[currentIdx]) {
            const lvl = state.hlsInstance.levels[currentIdx];
            const res = lvl.height ? `${lvl.height}p` : `Level ${currentIdx}`;
            autoLabel = `Auto (${res})`;
        }
    }

    const autoBtn = document.createElement('button');
    autoBtn.className = `option-item ${state.selectedQualityLevel === -1 ? 'active' : ''}`;
    autoBtn.setAttribute('data-level', '-1');
    autoBtn.innerHTML = `<span>${autoLabel}</span>`;
    autoBtn.addEventListener('click', () => setHlsQuality(-1));
    qualityOptionsList.appendChild(autoBtn);

    if (state.hlsInstance && state.hlsInstance.levels.length > 0) {
        state.hlsInstance.levels.forEach((level, idx) => {
            let label = level.height ? `${level.height}p` : `Level ${idx}`;
            if (level.height) {
                if (level.height >= 2160) label = `${level.height}p (4K UHD)`;
                else if (level.height >= 1440) label = `${level.height}p (2K)`;
                else if (level.height >= 1080) label = `${level.height}p (FHD)`;
                else if (level.height >= 720) label = `${level.height}p (HD)`;
                else label = `${level.height}p (SD)`;
            }
            const btn = document.createElement('button');
            btn.className = `option-item ${state.selectedQualityLevel === idx ? 'active' : ''}`;
            btn.setAttribute('data-level', idx);
            btn.innerHTML = `<span>${label}</span>`;
            btn.addEventListener('click', () => setHlsQuality(idx));
            qualityOptionsList.appendChild(btn);
        });
    }
}

// Switch Hls.js Quality Levels
function setHlsQuality(levelIndex) {
    state.selectedQualityLevel = levelIndex;
    
    if (state.hlsInstance) {
        state.hlsInstance.currentLevel = levelIndex;
    }
    
    // Update active dropdown item checkboxes
    const items = qualityOptionsList.querySelectorAll('.option-item');
    items.forEach((item) => {
        const val = parseInt(item.getAttribute('data-level'), 10);
        if (val === levelIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    playerSettingsPopup.classList.remove('active');
    
    // Maintain controls visibility
    videoWrapper.classList.add('show-controls');
    if (window.showControls) window.showControls();
}

// Force the lowest quality level for Data Saver Mode
function applyDataSaverQuality() {
    if (state.hlsInstance && state.hlsInstance.levels.length > 0) {
        let lowestIndex = 0;
        let minHeight = 9999;
        state.hlsInstance.levels.forEach((lvl, idx) => {
            if (lvl.height && lvl.height < minHeight) {
                minHeight = lvl.height;
                lowestIndex = idx;
            }
        });
        setHlsQuality(lowestIndex);
    }
}

// Call custom player setup inside document ready
document.addEventListener('DOMContentLoaded', () => {
    initCustomPlayer();
});

/* =========================================================================
   UNIFIED SPATIAL NAVIGATION & TV REMOTE CONTROL LOGIC
   ========================================================================= */

let focusedZone = 'sidebar'; // 'sidebar', 'controls'
let focusedIndex = 0;
window.usingKeyboardNav = false;

// Channel Zapping (Switches channel on ArrowUp/ArrowDown in Fullscreen Mode)
function zapChannel(direction) {
    if (state.channels.length === 0) return;
    
    let currentIndex = -1;
    if (state.currentChannel) {
        currentIndex = state.channels.findIndex(c => c.id === state.currentChannel.id);
    }
    
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = state.channels.length - 1;
    if (nextIndex >= state.channels.length) nextIndex = 0;
    
    const nextChan = state.channels[nextIndex];
    if (nextChan) {
        playChannel(nextChan);
        showActionNotification(`${nextChan.name}`);
    }
}

// TV HUD Action OSD Notification Overlay
function showActionNotification(text) {
    let notification = document.getElementById('tv-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'tv-notification';
        notification.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 2147483647;
            background: rgba(14, 165, 233, 0.95);
            color: white;
            padding: 12px 24px;
            border-radius: 30px;
            font-family: var(--font-heading);
            font-weight: 700;
            font-size: 15px;
            box-shadow: 0 10px 30px rgba(14,165,233,0.4);
            pointer-events: none;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = text;
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    
    if (window.tvNotificationTimeout) clearTimeout(window.tvNotificationTimeout);
    window.tvNotificationTimeout = setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-10px)';
    }, 2500);
}

// Find all focusable items in a given zone
function getFocusables(zone) {
    switch (zone) {
        case 'sidebar':
            const sidebarPanel = document.getElementById('sidebar-panel');
            if (sidebarPanel && sidebarPanel.classList.contains('view-categories')) {
                // In categories view, focus group-search filter and category buttons
                const catSearch = document.getElementById('group-search');
                const catItems = Array.from(document.querySelectorAll('.category-list .category-btn'));
                return catSearch ? [catSearch, ...catItems] : catItems;
            } else {
                // In channels view, focus channel-search, menu items, and channel cards
                const chanSearch = document.getElementById('channel-search');
                const menuItems = Array.from(document.querySelectorAll('.sidebar-menu .menu-item'));
                const channelItems = Array.from(document.querySelectorAll('#channel-grid-container .channel-card'));
                return chanSearch ? [chanSearch, ...menuItems, ...channelItems] : [...menuItems, ...channelItems];
            }
        case 'controls':
            // If quality settings popup is open, only return the settings options!
            if (playerSettingsPopup && playerSettingsPopup.classList.contains('active')) {
                return Array.from(playerSettingsPopup.querySelectorAll('.option-item'));
            }
            return [
                ctrlPlayPause,
                nowPlayingFavBtn,
                ctrlVolume,
                ctrlVolumeSlider,
                ctrlDataSaver,
                ctrlSettings,
                ctrlFullscreen
            ].filter(el => el && el.offsetParent !== null);
        default:
            return [];
    }
}

// Spatial Keyboard/Remote Navigation Engine
let lastLeftKeyPressTime = 0;

function handleSpatialNavigation(key) {
    const isPlayerClean = !videoWrapper.classList.contains('show-controls');

    // A. Clean Playback Mode Key Intercepts (nothing over the video player)
    if (isPlayerClean && focusedZone !== 'sidebar') {
        if (key === 'ArrowLeft') {
            const now = Date.now();
            const timeDiff = now - lastLeftKeyPressTime;
            lastLeftKeyPressTime = now;
            
            if (timeDiff < 500) {
                // Double Left press -> activate categories list view
                switchSidebarView('categories');
                focusedZone = 'sidebar';
                const items = getFocusables('sidebar');
                const catIdx = items.findIndex(el => el.classList.contains('category-btn'));
                focusedIndex = catIdx !== -1 ? catIdx : 0;
            } else {
                // Single Left press -> activate channels list view
                switchSidebarView('channels');
                focusedZone = 'sidebar';
                const items = getFocusables('sidebar');
                const playingIdx = items.findIndex(el => el.classList.contains('channel-card') && el.classList.contains('playing'));
                const firstChanIdx = items.findIndex(el => el.classList.contains('channel-card'));
                focusedIndex = playingIdx !== -1 ? playingIdx : (firstChanIdx !== -1 ? firstChanIdx : 0);
            }
            updateSpatialFocusIndicator();
            return;
        }
        
        if (key === 'Enter') {
            // OK/Enter when clean -> show controls and navigate them
            videoWrapper.classList.add('show-controls');
            focusedZone = 'controls';
            focusedIndex = 0;
            updateSpatialFocusIndicator();
            if (window.showControls) window.showControls();
            return;
        }
        
        // In fullscreen zapping, allow ArrowUp/Down to zap channels (not Left/Right)
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            if (key === 'ArrowUp') {
                zapChannel(1);
            } else if (key === 'ArrowDown') {
                zapChannel(-1);
            }
            return;
        }
    }

    // B. Quality settings popup active checks
    if (playerSettingsPopup && playerSettingsPopup.classList.contains('active')) {
        let items = getFocusables('controls');
        let index = focusedIndex;
        
        if (key === 'ArrowUp') {
            if (index > 0) focusedIndex = index - 1;
        } else if (key === 'ArrowDown') {
            if (index < items.length - 1) focusedIndex = index + 1;
        } else if (key === 'Enter') {
            if (items[index]) items[index].click();
        } else if (key === 'Escape' || key === 'Backspace' || key === 'ArrowLeft' || key === 'ArrowRight') {
            playerSettingsPopup.classList.remove('active');
            // Re-focus settings gear button
            const mainControls = [
                ctrlPlayPause,
                nowPlayingFavBtn,
                ctrlVolume,
                ctrlVolumeSlider,
                ctrlDataSaver,
                ctrlSettings,
                ctrlFullscreen
            ].filter(el => el && el.offsetParent !== null);
            focusedIndex = mainControls.indexOf(ctrlSettings);
            if (focusedIndex === -1) focusedIndex = 0;
        }
        updateSpatialFocusIndicator();
        return;
    }

    // C. Standard D-Pad Navigation (when sidebar is active or controls are shown)
    let items = getFocusables(focusedZone);
    let index = focusedIndex;

    if (key === 'ArrowUp') {
        if (index > 0) {
            focusedIndex = index - 1;
        }
    } 
    else if (key === 'ArrowDown') {
        if (document.activeElement && document.activeElement.tagName === 'INPUT') {
            document.activeElement.blur();
        }
        if (index < items.length - 1) {
            focusedIndex = index + 1;
        }
    } 
    else if (key === 'ArrowRight') {
        if (focusedZone === 'sidebar') {
            // Show controls and navigate them
            videoWrapper.classList.add('show-controls');
            focusedZone = 'controls';
            focusedIndex = 0;
            if (window.showControls) window.showControls();
        } else if (focusedZone === 'controls') {
            // Navigate strictly inside player controls (wrapping)
            if (index < items.length - 1) {
                focusedIndex = index + 1;
            } else {
                focusedIndex = 0;
            }
        }
    } 
    else if (key === 'ArrowLeft') {
        if (focusedZone === 'sidebar') {
            const activeEl = items[focusedIndex];
            // If focused on channel card in channels view, Left opens categories list
            if (activeEl && activeEl.classList.contains('channel-card')) {
                switchSidebarView('categories');
                const newItems = getFocusables('sidebar');
                const firstCatIdx = newItems.findIndex(el => el.classList.contains('category-btn'));
                focusedIndex = firstCatIdx !== -1 ? firstCatIdx : 0;
            }
        } else if (focusedZone === 'controls') {
            // Navigate strictly inside player controls (wrapping)
            if (index > 0) {
                focusedIndex = index - 1;
            } else {
                focusedIndex = items.length - 1;
            }
        }
    } 
    else if (key === 'Enter') {
        if (items[index]) {
            items[index].click();
        }
    }
    else if (key === 'Escape' || key === 'Backspace') {
        // 1. Close settings popup if open
        if (playerSettingsPopup && playerSettingsPopup.classList.contains('active')) {
            playerSettingsPopup.classList.remove('active');
            return;
        }
        // 2. Close sidebar if open (switch focus to controls/clean player)
        if (focusedZone === 'sidebar') {
            focusedZone = 'controls';
            focusedIndex = 0;
            videoWrapper.classList.remove('show-controls');
            updateSpatialFocusIndicator();
            return;
        }
        // 3. Hide player controls overlay if shown
        if (videoWrapper.classList.contains('show-controls')) {
            videoWrapper.classList.remove('show-controls');
            return;
        }
        // 4. Exit fullscreen if in fullscreen
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            const exit = document.exitFullscreen || document.webkitExitFullscreen;
            if (exit) exit.call(document);
        }
    }

    updateSpatialFocusIndicator();
}

// Apply Neon focus layout indicators
function updateSpatialFocusIndicator() {
    syncSidebarVisibility();
    document.querySelectorAll('.tv-focus').forEach(el => el.classList.remove('tv-focus'));
    
    let items = getFocusables(focusedZone);
    if (items.length === 0) return;

    if (focusedIndex < 0) focusedIndex = 0;
    if (focusedIndex >= items.length) focusedIndex = items.length - 1;
    
    const activeEl = items[focusedIndex];
    if (activeEl) {
        activeEl.classList.add('tv-focus');
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'auto' });

        // Auto-focus inputs for typing support
        if (activeEl.tagName === 'INPUT') {
            activeEl.focus();
        } else {
            // Blur currently active input to exit input mode cleanly
            if (document.activeElement && document.activeElement.tagName === 'INPUT') {
                document.activeElement.blur();
            }
        }

        // Automated Infinite load on remote/D-pad navigation:
        if (focusedZone === 'sidebar' && activeEl.classList.contains('channel-card')) {
            const allChannelCards = Array.from(document.querySelectorAll('#channel-grid-container .channel-card'));
            const cardIdx = allChannelCards.indexOf(activeEl);
            if (cardIdx !== -1 && cardIdx >= allChannelCards.length - 3) {
                if (state.currentPage < state.totalPages && !state.isLoadingChannels) {
                    loadChannels(state.currentPage + 1, true);
                }
            }
        }
    }
}

// Real Electronic Program Guide data checker (only shows EPG if data exists)
function updateEpgGuide(channel) {
    if (!channel || !epgTimelineContainer) return;
    
    if (channel.epg && channel.epg.now) {
        const nowProg = channel.epg.now;
        const nextProg = channel.epg.next || {};
        
        if (epgNowTitle) epgNowTitle.textContent = nowProg.title || 'Live Show';
        if (epgNowTime) epgNowTime.textContent = `${nowProg.start || ''} - ${nowProg.end || ''}`;
        if (epgNowProgress) epgNowProgress.style.width = `${nowProg.progress || 0}%`;

        if (epgNextTitle) epgNextTitle.textContent = nextProg.title || 'Next Show';
        if (epgNextTime) epgNextTime.textContent = `${nextProg.start || ''} - ${nextProg.end || ''}`;
        
        epgTimelineContainer.style.display = 'flex';
    } else {
        epgTimelineContainer.style.display = 'none';
    }
}

// Keyboard D-Pad and Enter key bindings
window.enterKeyDownTime = null;
window.isLongPressTriggered = false;

document.addEventListener('keydown', (e) => {
    const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape', 'Backspace'];
    
    if (navKeys.includes(e.key)) {
        // Allow ArrowDown, Escape, and Enter to navigate/blur when focused on input
        if (document.activeElement && document.activeElement.tagName === 'INPUT') {
            if (e.key !== 'ArrowDown' && e.key !== 'Escape' && e.key !== 'Enter') return;
        }
        
        e.preventDefault();
        window.usingKeyboardNav = true;
        
        if (e.key === 'Enter') {
            // Start long press detection for Enter
            if (!window.enterKeyDownTime) {
                window.enterKeyDownTime = Date.now();
                window.isLongPressTriggered = false;
                
                window.enterLongPressTimeout = setTimeout(() => {
                    if (focusedZone === 'sidebar') {
                        const items = getFocusables('sidebar');
                        const activeEl = items[focusedIndex];
                        if (activeEl && activeEl.classList.contains('channel-card')) {
                            window.isLongPressTriggered = true;
                            const id = activeEl.dataset.id;
                            toggleFavorite(id);
                            
                            const btn = activeEl.querySelector('.card-fav-btn');
                            const icon = activeEl.querySelector('.card-fav-btn i');
                            if (state.favorites.has(id)) {
                                if (btn) btn.classList.add('active');
                                if (icon) icon.className = 'bx bxs-heart';
                                showActionNotification('Added to Favorites');
                            } else {
                                if (btn) btn.classList.remove('active');
                                if (icon) icon.className = 'bx bx-heart';
                                showActionNotification('Removed from Favorites');
                            }
                        }
                    }
                }, 600); // 600ms long press threshold
            }
        } else {
            handleSpatialNavigation(e.key);
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (window.enterLongPressTimeout) clearTimeout(window.enterLongPressTimeout);
        
        let wasLongPress = false;
        if (window.enterKeyDownTime) {
            const pressDuration = Date.now() - window.enterKeyDownTime;
            window.enterKeyDownTime = null;
            if (window.isLongPressTriggered) {
                wasLongPress = true;
                window.isLongPressTriggered = false;
            }
        }
        
        if (wasLongPress) return;
        
        // Short press Enter -> standard activation action
        if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
        
        e.preventDefault();
        handleSpatialNavigation('Enter');
    }
});

// Clear spatial navigation focus when mouse is used
document.addEventListener('mousemove', () => {
    if (window.usingKeyboardNav) return;
    document.querySelectorAll('.tv-focus').forEach(el => el.classList.remove('tv-focus'));
});

document.addEventListener('mousedown', () => {
    window.usingKeyboardNav = false;
    document.querySelectorAll('.tv-focus').forEach(el => el.classList.remove('tv-focus'));
});

