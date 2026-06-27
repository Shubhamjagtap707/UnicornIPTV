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

    videoPlayer.onplaying = clearOverlay;
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
                    type: 'mpegts', // Corrected type: 'mpegts' is the required type in mpegts.js
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
                    // Try to avoid stalls
                    maxBufferLength: 8,
                    maxMaxBufferLength: 15
                });
                state.hlsInstance.loadSource(playUrl);
                state.hlsInstance.attachMedia(videoPlayer);
                state.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
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
