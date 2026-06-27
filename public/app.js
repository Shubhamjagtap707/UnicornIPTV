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
    
    // TV Mode and Spatial Navigation State
    tvModeActive: false,
    tvSidebarOpen: false,
    tvChannelsOpen: false,
    tvFocusedZone: 'channels', // 'menu', 'categories', 'channels', 'controls'
    tvFocusedIndex: 0,

    // Player instances
    hlsInstance: null,
    dashInstance: null,
    mpegtsInstance: null
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

// TV Mode & EPG DOM Elements
const btnTvMode = document.getElementById('btn-tv-mode');
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

// Render Categories Sidebar
function renderCategories() {
    const filterText = groupSearchInput.value.toLowerCase();
    const filteredGroups = state.groups.filter(g => g.name.toLowerCase().includes(filterText));
    
    if (filteredGroups.length === 0) {
        categoriesContainer.innerHTML = '<div class="category-btn" style="pointer-events: none; opacity: 0.5;">No groups found</div>';
        return;
    }

    categoriesContainer.innerHTML = filteredGroups.map(group => {
        const isActive = state.activeCategory === group.name;
        return `
            <button class="category-btn ${isActive ? 'active' : ''}" data-group="${group.name}">
                <span>${escapeHtml(group.name)}</span>
                <span class="cat-count">${group.count}</span>
            </button>
        `;
    }).join('');

    // Attach click listeners to new category buttons
    categoriesContainer.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const groupName = btn.dataset.group;
            setActiveCategory(groupName);
        });
    });
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
    searchClearBtn.style.display = 'none';

    if (category === 'favorites') {
        btnFavorites.classList.add('active');
        activeCategoryTitle.textContent = 'My Favorites';
    } else if (category === null) {
        btnAllChannels.classList.add('active');
        activeCategoryTitle.textContent = 'All Channels';
    } else {
        // Highlight category button
        const catBtn = categoriesContainer.querySelector(`[data-group="${category}"]`);
        if (catBtn) catBtn.classList.add('active');
        activeCategoryTitle.textContent = category;
    }

    loadChannels(1, false);
}

// Fetch and load channels
async function loadChannels(page = 1, append = false) {
    showSkeletons(append);
    state.currentPage = page;

    try {
        let url = `${API_BASE}/api/channels?page=${page}&limit=${state.limit}`;
        
        if (state.activeCategory === 'favorites') {
            if (state.favorites.size === 0) {
                renderChannels([], false);
                resultsCountEl.textContent = '0 channels';
                loadMoreArea.style.display = 'none';
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
            
            // Show/hide load more button
            if (state.currentPage < state.totalPages) {
                loadMoreArea.style.display = 'flex';
            } else {
                loadMoreArea.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error loading channels:', error);
        channelGridContainer.innerHTML = `<div class="error-text">Failed to load channels. Please refresh or retry.</div>`;
        loadMoreArea.style.display = 'none';
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
    updateEpgGuide(channel.name);

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

    const handlePlayError = (err) => {
        console.error('Playback Error:', err);
        playerLoader.style.display = 'none';
        playerError.style.display = 'flex';
        playerErrorMsg.textContent = `The ${engine} stream is unavailable, offline, or blocked.`;
        playerOverlay.style.opacity = '1';
        playerOverlay.style.pointerEvents = 'auto';
    };

    // Reset quality levels list UI
    qualityOptionsList.innerHTML = '<button class="option-item active" data-level="-1">Auto</button>';

    videoPlayer.onplaying = () => {
        clearOverlay();
        ctrlPlayPause.innerHTML = "<i class='bx bx-pause'></i>";
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
                state.hlsInstance = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                    maxBufferLength: 8,
                    maxMaxBufferLength: 15
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
                    videoPlayer.play().catch(e => handlePlayError(e));
                });
                state.hlsInstance.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.warn('HLS Network Error, attempting recovery...');
                                state.hlsInstance.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.warn('HLS Media Error, attempting recovery...');
                                state.hlsInstance.recoverMediaError();
                                break;
                            default:
                                handlePlayError(data.details);
                                break;
                        }
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

// Setup Event Listeners
function setupEventListeners() {
    // Menu items
    btnAllChannels.addEventListener('click', () => setActiveCategory(null));
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

    // Load More button
    loadMoreBtn.addEventListener('click', () => {
        if (state.currentPage < state.totalPages) {
            loadChannels(state.currentPage + 1, true);
        }
    });

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

    // TV Mode Button
    btnTvMode.addEventListener('click', () => {
        state.tvModeActive = !state.tvModeActive;
        document.body.classList.toggle('tv-mode', state.tvModeActive);
        
        if (state.tvModeActive) {
            btnTvMode.classList.add('active');
            btnTvMode.querySelector('span').textContent = 'Web Mode';
            toggleTvMenu(true);
            showActionNotification('TV Mode Activated');
        } else {
            btnTvMode.classList.remove('active');
            btnTvMode.querySelector('span').textContent = 'TV Mode';
            toggleTvMenu(false);
            document.getElementById('stream-info').classList.remove('visible');
            clearAllSpatialFocus();
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
    videoPlayer.addEventListener('click', togglePlay);

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
        if (!document.fullscreenElement) {
            videoWrapper.requestFullscreen().catch(err => {
                console.error(`Fullscreen request failed: ${err.message}`);
            });
            ctrlFullscreen.innerHTML = "<i class='bx bx-exit-fullscreen'></i>";
        } else {
            document.exitFullscreen();
            ctrlFullscreen.innerHTML = "<i class='bx bx-fullscreen'></i>";
        }
    };

    ctrlFullscreen.addEventListener('click', toggleFullscreen);
    videoPlayer.addEventListener('dblclick', toggleFullscreen);

    // 6. YouTube TV Auto-hide Controls UI on Inactivity
    const showControls = () => {
        videoWrapper.classList.add('show-controls');
        videoWrapper.classList.remove('hide-cursor');
        
        if (state.controlsTimeout) clearTimeout(state.controlsTimeout);
        
        // Hide only if playing
        if (!videoPlayer.paused) {
            state.controlsTimeout = setTimeout(() => {
                // If settings modal is open, don't auto-hide
                if (playerSettingsPopup.classList.contains('active')) return;
                
                videoWrapper.classList.remove('show-controls');
                videoWrapper.classList.add('hide-cursor');
            }, 3000);
        }
    };

    videoWrapper.addEventListener('mousemove', showControls);
    videoPlayer.addEventListener('play', showControls);
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
    const autoBtn = document.createElement('button');
    autoBtn.className = `option-item ${state.selectedQualityLevel === -1 ? 'active' : ''}`;
    autoBtn.textContent = 'Auto';
    autoBtn.addEventListener('click', () => setHlsQuality(-1));
    qualityOptionsList.appendChild(autoBtn);

    if (state.hlsInstance && state.hlsInstance.levels.length > 0) {
        state.hlsInstance.levels.forEach((level, idx) => {
            const res = level.height ? `${level.height}p` : `Level ${idx}`;
            const btn = document.createElement('button');
            btn.className = `option-item ${state.selectedQualityLevel === idx ? 'active' : ''}`;
            btn.textContent = res;
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
    items.forEach((item, idx) => {
        const targetIdx = idx - 1; // Subtract 1 for Auto
        if (targetIdx === levelIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    playerSettingsPopup.classList.remove('active');
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
   IPTV TV MODE & ANDROID TV REMOTE SPATIAL NAVIGATION LOGIC
   ========================================================================= */

// TV Mode Menu Visibility Toggle
function toggleTvMenu(visible) {
    state.tvSidebarOpen = visible;
    state.tvChannelsOpen = visible;
    
    const sidebar = document.querySelector('.sidebar');
    const channelsSec = document.querySelector('.channels-section');
    const infoPanel = document.getElementById('stream-info');
    
    if (visible) {
        if (sidebar) sidebar.classList.add('tv-menu-visible');
        if (channelsSec) channelsSec.classList.add('tv-grid-visible');
        if (infoPanel) infoPanel.classList.add('visible');
        videoWrapper.classList.add('show-controls');
        
        // Default TV navigation focus zone is the channels list
        state.tvFocusedZone = 'channels';
        state.tvFocusedIndex = 0;
        updateSpatialFocus();
    } else {
        if (sidebar) sidebar.classList.remove('tv-menu-visible');
        if (channelsSec) channelsSec.classList.remove('tv-grid-visible');
        if (infoPanel) infoPanel.classList.remove('visible');
        videoWrapper.classList.remove('show-controls');
        clearAllSpatialFocus();
    }
}

// Android TV Remote & Keyboard Spatial Navigation Engine
function handleTvNavigation(key) {
    if (!state.tvModeActive) return;

    // Helper: Find focusable HTML elements inside a zone
    const getFocusables = (zone) => {
        switch (zone) {
            case 'menu':
                return Array.from(document.querySelectorAll('.sidebar-menu .menu-item'));
            case 'categories':
                return Array.from(document.querySelectorAll('.category-list-container .category-btn'));
            case 'channels':
                return Array.from(document.querySelectorAll('.channel-grid .channel-card'));
            case 'controls':
                return [
                    ctrlPlayPause,
                    ctrlVolume,
                    ctrlVolumeSlider,
                    ctrlDataSaver,
                    ctrlSettings,
                    ctrlFullscreen
                ].filter(el => el && el.style.display !== 'none');
            default:
                return [];
        }
    };

    let items = getFocusables(state.tvFocusedZone);
    let index = state.tvFocusedIndex;

    // 1. Handle Navigation when all UI Menus/Overlays are closed (True Full Screen Playback)
    if (!state.tvSidebarOpen && !state.tvChannelsOpen) {
        if (key === 'ArrowUp') {
            zapChannel(-1); // Channel Up
        } else if (key === 'ArrowDown') {
            zapChannel(1); // Channel Down
        } else if (key === 'ArrowLeft' || key === 'Enter') {
            toggleTvMenu(true); // Open EPG / Channel Menu
        } else if (key === 'ArrowRight') {
            showEpgPanelTemp(); // Show program details temporarily
        }
        return;
    }

    // 2. Handle Navigation when EPG / Overlays are open
    if (key === 'ArrowUp') {
        if (state.tvFocusedZone === 'controls') {
            state.tvFocusedZone = 'channels';
            state.tvFocusedIndex = 0;
        } else if (index > 0) {
            state.tvFocusedIndex = index - 1;
        }
    } 
    else if (key === 'ArrowDown') {
        if (index < items.length - 1) {
            state.tvFocusedIndex = index + 1;
        } else if (state.tvFocusedZone === 'channels') {
            state.tvFocusedZone = 'controls';
            state.tvFocusedIndex = 0;
        }
    } 
    else if (key === 'ArrowLeft') {
        // Move focus panels from right to left: channels -> categories -> menu
        if (state.tvFocusedZone === 'channels') {
            state.tvFocusedZone = 'categories';
            state.tvFocusedIndex = 0;
        } else if (state.tvFocusedZone === 'categories') {
            state.tvFocusedZone = 'menu';
            state.tvFocusedIndex = 0;
        } else if (state.tvFocusedZone === 'controls') {
            if (index > 0) {
                state.tvFocusedIndex = index - 1;
            } else {
                state.tvFocusedZone = 'categories';
                state.tvFocusedIndex = 0;
            }
        }
    } 
    else if (key === 'ArrowRight') {
        // Move focus panels from left to right: menu -> categories -> channels
        if (state.tvFocusedZone === 'menu') {
            state.tvFocusedZone = 'categories';
            state.tvFocusedIndex = 0;
        } else if (state.tvFocusedZone === 'categories') {
            state.tvFocusedZone = 'channels';
            state.tvFocusedIndex = 0;
        } else if (state.tvFocusedZone === 'controls') {
            if (index < items.length - 1) {
                state.tvFocusedIndex = index + 1;
            }
        }
    } 
    else if (key === 'Enter') {
        if (items[index]) {
            items[index].click();
            // Close overlay if channel started playing
            if (state.tvFocusedZone === 'channels') {
                setTimeout(() => toggleTvMenu(false), 250);
            }
        }
    } 
    else if (key === 'Backspace' || key === 'Escape') {
        toggleTvMenu(false); // Close menus and return to video background
    }

    updateSpatialFocus();
}

// Update Neon Focus Outline class in DOM
function updateSpatialFocus() {
    clearAllSpatialFocus();
    
    const getFocusables = (zone) => {
        switch (zone) {
            case 'menu':
                return Array.from(document.querySelectorAll('.sidebar-menu .menu-item'));
            case 'categories':
                return Array.from(document.querySelectorAll('.category-list-container .category-btn'));
            case 'channels':
                return Array.from(document.querySelectorAll('.channel-grid .channel-card'));
            case 'controls':
                return [
                    ctrlPlayPause,
                    ctrlVolume,
                    ctrlVolumeSlider,
                    ctrlDataSaver,
                    ctrlSettings,
                    ctrlFullscreen
                ].filter(el => el && el.style.display !== 'none');
            default:
                return [];
        }
    };

    let items = getFocusables(state.tvFocusedZone);
    if (items.length === 0) return;

    if (state.tvFocusedIndex < 0) state.tvFocusedIndex = 0;
    if (state.tvFocusedIndex >= items.length) state.tvFocusedIndex = items.length - 1;
    
    const activeEl = items[state.tvFocusedIndex];
    if (activeEl) {
        activeEl.classList.add('tv-focus');
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

// Remove all neon focus items
function clearAllSpatialFocus() {
    document.querySelectorAll('.tv-focus').forEach(el => el.classList.remove('tv-focus'));
}

// TV Channel Zapping (Direct ArrowUp/ArrowDown on Fullscreen Playback)
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
        showActionNotification(`Channel Zapped: ${nextChan.name}`);
    }
}

// Temporary show EPG banner on ArrowRight keypress
function showEpgPanelTemp() {
    const info = document.getElementById('stream-info');
    if (info) info.classList.add('visible');
    
    if (window.epgPanelTimeout) clearTimeout(window.epgPanelTimeout);
    window.epgPanelTimeout = setTimeout(() => {
        if (!state.tvSidebarOpen && !state.tvChannelsOpen) {
            if (info) info.classList.remove('visible');
        }
    }, 4000);
}

// TV Mode OSD Notification banner (Channel Zapping / Activated message)
function showActionNotification(text) {
    let notification = document.getElementById('tv-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'tv-notification';
        notification.style.cssText = `
            position: absolute;
            top: 24px;
            right: 24px;
            z-index: 1000;
            background: rgba(14, 165, 233, 0.95);
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-family: var(--font-heading);
            font-weight: 700;
            font-size: 14px;
            box-shadow: 0 10px 25px rgba(14,165,233,0.3);
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
    }, 2000);
}

// Dynamic EPG Guide Mock Generator
function updateEpgGuide(channelName) {
    if (!channelName || !epgTimelineContainer) return;
    
    const seedString = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    };

    const hashVal = seedString(channelName);
    const now = new Date();
    const currentHour = now.getHours();
    
    const genres = [
        ["Morning Breakfast News", "Live Talk Show", "Global News Today", "Financial Report"],
        ["World News Report", "Science & Technology", "Press Conference Live", "Political Debate"],
        ["Prime Time Special", "Evening Crime Report", "Investigative Journalism", "Late Night Headlines"],
        ["Music Mix Live", "Sports Review Daily", "Tech Gadgets Weekly", "Documentary Special"]
    ];

    const currentGenreList = genres[hashVal % genres.length];
    const programIndex = hashVal % currentGenreList.length;
    const nowProgramName = currentGenreList[programIndex];
    const nextProgramName = currentGenreList[(programIndex + 1) % currentGenreList.length];

    const programStart = new Date(now);
    programStart.setMinutes(0);
    programStart.setSeconds(0);
    
    const programEnd = new Date(programStart);
    programEnd.setHours(programStart.getHours() + 1);

    const nextProgramStart = new Date(programEnd);
    const nextProgramEnd = new Date(nextProgramStart);
    nextProgramEnd.setHours(nextProgramStart.getHours() + 1);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const totalMinutes = 60;
    const elapsedMinutes = now.getMinutes();
    const progressPercent = Math.min(100, Math.max(0, (elapsedMinutes / totalMinutes) * 100));

    if (epgNowTitle) epgNowTitle.textContent = nowProgramName;
    if (epgNowTime) epgNowTime.textContent = `${formatTime(programStart)} - ${formatTime(programEnd)}`;
    if (epgNowProgress) epgNowProgress.style.width = `${progressPercent}%`;

    if (epgNextTitle) epgNextTitle.textContent = nextProgramName;
    if (epgNextTime) epgNextTime.textContent = `${formatTime(nextProgramStart)} - ${formatTime(nextProgramEnd)}`;

    epgTimelineContainer.style.display = 'flex';
}

// Hook TV Mode arrow and enter remote keyboard event listener
document.addEventListener('keydown', (e) => {
    if (state.tvModeActive) {
        const keyMap = {
            'ArrowUp': 'ArrowUp',
            'ArrowDown': 'ArrowDown',
            'ArrowLeft': 'ArrowLeft',
            'ArrowRight': 'ArrowRight',
            'Enter': 'Enter',
            'Escape': 'Escape',
            'Backspace': 'Backspace'
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            handleTvNavigation(keyMap[e.key]);
        }
    }
});


