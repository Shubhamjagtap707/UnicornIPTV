import ksrPlaylist from '../../Channels/KSR Playlist.json';
import zee5Playlist from '../../Channels/ZEE5.json';
import sonylivPlaylist from '../../Channels/SonyLiv.json';

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

  // Normalize ZEE5 Playlist
  let zee5Channels = [];
  if (zee5Playlist && Array.isArray(zee5Playlist)) {
    zee5Channels = zee5Playlist;
  } else if (zee5Playlist && zee5Playlist.items && Array.isArray(zee5Playlist.items)) {
    zee5Channels = zee5Playlist.items;
  } else if (zee5Playlist && typeof zee5Playlist === 'object') {
    const arrayKey = Object.keys(zee5Playlist).find(k => Array.isArray(zee5Playlist[k]));
    zee5Channels = arrayKey ? zee5Playlist[arrayKey] : [zee5Playlist];
  }

  // Normalize SonyLiv Playlist
  let sonylivChannels = [];
  if (sonylivPlaylist && Array.isArray(sonylivPlaylist)) {
    sonylivChannels = sonylivPlaylist;
  } else if (sonylivPlaylist && sonylivPlaylist.items && Array.isArray(sonylivPlaylist.items)) {
    sonylivChannels = sonylivPlaylist.items;
  } else if (sonylivPlaylist && typeof sonylivPlaylist === 'object') {
    const arrayKey = Object.keys(sonylivPlaylist).find(k => Array.isArray(sonylivPlaylist[k]));
    sonylivChannels = arrayKey ? sonylivPlaylist[arrayKey] : [sonylivPlaylist];
  }

  const channels = [
    ...processPlaylist(ksrChannels, 'KSR Playlist.json'),
    ...processPlaylist(zee5Channels, 'ZEE5.json'),
    ...processPlaylist(sonylivChannels, 'SonyLiv.json')
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
