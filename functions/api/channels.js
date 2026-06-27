import { getPlaylistData } from './_playlists.js';

export async function onRequest(context) {
  // Handle preflight requests
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  const { request } = context;
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  let group = searchParams.get('group');
  let search = searchParams.get('search');
  let page = parseInt(searchParams.get('page')) || 1;
  let limit = parseInt(searchParams.get('limit')) || 50;
  let ids = searchParams.get('ids');

  const { channels } = getPlaylistData();
  let filtered = channels;

  // Filter by specific comma-separated IDs
  if (ids) {
    const idList = ids.split(',').map(id => id.trim());
    filtered = filtered.filter(ch => idList.includes(ch.id));
  }

  // Filter by group
  if (group) {
    const groupLower = group.toLowerCase();
    filtered = filtered.filter(ch => (ch.group || 'Other').toLowerCase() === groupLower);
  }

  // Filter by search query
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(ch => 
      (ch.name || '').toLowerCase().includes(searchLower) ||
      (ch.tvgName || '').toLowerCase().includes(searchLower) ||
      (ch.group || '').toLowerCase().includes(searchLower)
    );
  }

  // Paginate results
  const totalResults = filtered.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginated = filtered.slice(startIndex, endIndex);

  return new Response(JSON.stringify({
    success: true,
    total: totalResults,
    page: page,
    limit: limit,
    totalPages: Math.ceil(totalResults / limit),
    channels: paginated
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    }
  });
}
