import ksrPlaylist from '../../Channels/KSR Playlist.json';
import phpopPlaylist from '../../Channels/playlist.phpop.json';

let cachedData = null;

function processPlaylist(fileChannels, filename) {
  const fileBaseGroup = filename.replace(/\.json$/i, '').replace(/[._-]/g, ' ');
  const defaultGroup = fileBaseGroup.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const result = [];
  fileChannels.forEach((item, idx) => {
    // Resolve name, URL, and logo fields supporting different JSON schemas
    const name = item.name || item.title || 'Unknown Channel';
    const url = (item.url || item.video_token || '').trim();
    const logo = item.logo || item.image_url || '';

    if (!url) return; // Skip item if there is no streaming URL

    // Generate unique ID using filename prefix to prevent collisions
    const rawId = item.id || `item-${idx}`;
    const id = `${filename.replace(/\.json$/i, '')}-${rawId}`;

    // Assign group: use existing group or auto-detect based on URL / filename
    let group = item.group;
    if (!group) {
      if (url.includes('/zee5/')) {
        group = 'ZEE5';
      } else {
        group = defaultGroup;
      }
    }

    result.push({
      id: id,
      name: name,
      url: url,
      logo: logo,
      group: group,
      tvgId: item.tvgId || '',
      tvgName: item.tvgName || ''
    });
  });
  return result;
}

export function getPlaylistData() {
  if (cachedData) return cachedData;

  // Normalize KSR Playlist
  let ksrChannels = [];
  if (ksrPlaylist && Array.isArray(ksrPlaylist)) {
    ksrChannels = ksrPlaylist;
  } else if (ksrPlaylist && ksrPlaylist.items && Array.isArray(ksrPlaylist.items)) {
    ksrChannels = ksrPlaylist.items;
  } else if (ksrPlaylist && typeof ksrPlaylist === 'object') {
    const arrayKey = Object.keys(ksrPlaylist).find(k => Array.isArray(ksrPlaylist[k]));
    ksrChannels = arrayKey ? ksrPlaylist[arrayKey] : [ksrPlaylist];
  }

  // Normalize phpop Playlist
  let phpopChannels = [];
  if (phpopPlaylist && Array.isArray(phpopPlaylist)) {
    phpopChannels = phpopPlaylist;
  } else if (phpopPlaylist && phpopPlaylist.items && Array.isArray(phpopPlaylist.items)) {
    phpopChannels = phpopPlaylist.items;
  } else if (phpopPlaylist && typeof phpopPlaylist === 'object') {
    const arrayKey = Object.keys(phpopPlaylist).find(k => Array.isArray(phpopPlaylist[k]));
    phpopChannels = arrayKey ? phpopPlaylist[arrayKey] : [phpopPlaylist];
  }

  const channels = [
    ...processPlaylist(ksrChannels, 'KSR Playlist.json'),
    ...processPlaylist(phpopChannels, 'playlist.phpop.json')
  ];

  // Extract unique groups and count channels per group
  const groupCounts = {};
  channels.forEach(channel => {
    const groupName = channel.group || 'Other';
    groupCounts[groupName] = (groupCounts[groupName] || 0) + 1;
  });

  // Create a sorted list of group objects
  const groups = Object.keys(groupCounts)
    .map(name => ({ name, count: groupCounts[name] }))
    .sort((a, b) => a.name.localeCompare(b.name));

  cachedData = { channels, groups };
  return cachedData;
}
