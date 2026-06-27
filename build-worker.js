const fs = require('fs');
const path = require('path');

let channels = [];
let groups = [];
let groupCounts = {};

// Parse playlists
const playlistDir = path.join(__dirname, 'Channels');
const files = fs.readdirSync(playlistDir);
const playlistFiles = files.filter(f => 
  f.endsWith('.json') && 
  f !== 'package.json' && 
  f !== 'package-lock.json'
);

playlistFiles.forEach(filename => {
  const filePath = path.join(playlistDir, filename);
  console.log(`Processing: ${filename}`);
  
  try {
    let rawText = fs.readFileSync(filePath, 'utf8').trim();
    let fileChannels;
    try {
      const parsed = JSON.parse(rawText);
      if (Array.isArray(parsed)) {
        fileChannels = parsed;
      } else if (parsed && typeof parsed === 'object') {
        const arrayKey = Object.keys(parsed).find(k => Array.isArray(parsed[k]));
        if (arrayKey) {
          fileChannels = parsed[arrayKey];
        } else {
          fileChannels = [parsed];
        }
      }
    } catch (parseErr) {
      let cleanedText = rawText;
      if (rawText.startsWith('{') && rawText.endsWith('}')) {
        cleanedText = '[' + rawText.substring(1);
        if (cleanedText.endsWith('}')) {
          cleanedText = cleanedText.slice(0, -1);
        }
      }
      cleanedText = cleanedText.replace(/,\s*([\]}])/g, '$1');
      fileChannels = JSON.parse(cleanedText);
      if (!Array.isArray(fileChannels)) {
        fileChannels = [fileChannels];
      }
    }
    
    const fileBaseGroup = filename.replace(/\.json$/i, '').replace(/[._-]/g, ' ');
    const defaultGroup = fileBaseGroup.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    fileChannels.forEach((item, idx) => {
      const name = item.name || item.title || 'Unknown Channel';
      const url = (item.url || item.video_token || '').trim();
      const logo = item.logo || item.image_url || '';
      
      if (!url) return;
      
      const rawId = item.id || `item-${idx}`;
      const id = `${filename.replace(/\.json$/i, '')}-${rawId}`;
      
      let group = item.group;
      if (!group) {
        if (url.includes('/zee5/')) {
          group = 'ZEE5';
        } else {
          group = defaultGroup;
        }
      }
      
      channels.push({
        id: id,
        name: name,
        url: url,
        logo: logo,
        group: group,
        tvgId: item.tvgId || '',
        tvgName: item.tvgName || ''
      });
    });
  } catch (err) {
    console.error(`Failed to process ${filename}:`, err.message);
  }
});

channels.forEach(channel => {
  const groupName = channel.group || 'Other';
  groupCounts[groupName] = (groupCounts[groupName] || 0) + 1;
});

groups = Object.keys(groupCounts)
  .map(name => ({ name, count: groupCounts[name] }))
  .sort((a, b) => a.name.localeCompare(b.name));

console.log(`Standardized ${channels.length} channels and ${groups.length} groups.`);

// Generate worker.js content
const workerTemplate = `/**
 * Cloudflare Worker for Unicorn TV Backend (Channels API + CORS Proxy)
 */

const channels = ${JSON.stringify(channels, null, 2)};
const groups = ${JSON.stringify(groups, null, 2)};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Groups Endpoint
    if (path === '/api/groups') {
      return new Response(
        JSON.stringify({
          success: true,
          total: groups.length,
          groups: groups
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // 2. Channels Endpoint
    if (path === '/api/channels') {
      const groupParam = url.searchParams.get('group');
      const searchParam = url.searchParams.get('search');
      const idsParam = url.searchParams.get('ids');
      const pageParam = parseInt(url.searchParams.get('page')) || 1;
      const limitParam = parseInt(url.searchParams.get('limit')) || 50;

      let filtered = channels;

      if (idsParam) {
        const idList = idsParam.split(',').map(id => id.trim());
        filtered = filtered.filter(ch => idList.includes(ch.id));
      }

      if (groupParam) {
        const groupLower = groupParam.toLowerCase();
        filtered = filtered.filter(ch => (ch.group || 'Other').toLowerCase() === groupLower);
      }

      if (searchParam) {
        const searchLower = searchParam.toLowerCase();
        filtered = filtered.filter(ch => 
          (ch.name || '').toLowerCase().includes(searchLower) ||
          (ch.tvgName || '').toLowerCase().includes(searchLower) ||
          (ch.group || '').toLowerCase().includes(searchLower)
        );
      }

      const totalResults = filtered.length;
      const startIndex = (pageParam - 1) * limitParam;
      const endIndex = pageParam * limitParam;
      const paginated = filtered.slice(startIndex, endIndex);

      return new Response(
        JSON.stringify({
          success: true,
          total: totalResults,
          page: pageParam,
          limit: limitParam,
          totalPages: Math.ceil(totalResults / limitParam),
          channels: paginated
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // 3. Proxy Endpoint
    if (path === '/proxy') {
      // Extract target URL from request
      const urlPrefix = '/proxy?url=';
      const targetUrlIndex = request.url.indexOf(urlPrefix);
      let targetUrl = '';
      
      if (targetUrlIndex !== -1) {
        targetUrl = decodeURIComponent(request.url.slice(targetUrlIndex + urlPrefix.length));
      } else {
        targetUrl = url.searchParams.get('url');
      }

      if (!targetUrl) {
        return new Response('Missing url parameter', { status: 400, headers: corsHeaders });
      }

      // Parse header parameters specified with pipe notation (URL|User-Agent=...)
      let actualTargetUrl = targetUrl;
      const customHeaders = {};
      let pipeString = '';
      let cleanBaseUrl = targetUrl;

      const pipeIndex = targetUrl.indexOf('|');
      if (pipeIndex !== -1) {
        actualTargetUrl = targetUrl.slice(0, pipeIndex);
        pipeString = targetUrl.slice(pipeIndex);
        cleanBaseUrl = actualTargetUrl;
        
        try {
          const headerParams = new URLSearchParams(targetUrl.slice(pipeIndex + 1));
          for (const [key, value] of headerParams.entries()) {
            customHeaders[key] = value;
          }
        } catch (e) {}
      }

      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': actualTargetUrl,
        ...customHeaders
      };

      if (actualTargetUrl.toLowerCase().includes('.ts') && !customHeaders['User-Agent']) {
        headers['User-Agent'] = 'VLC/3.0.18 LibVLC/3.0.18';
      }

      const rangeHeader = request.headers.get('range');
      if (rangeHeader) {
        headers['Range'] = rangeHeader;
      }

      try {
        const response = await fetch(actualTargetUrl, { headers });
        const contentType = response.headers.get('content-type') || '';
        const finalResponseUrl = response.url || actualTargetUrl;
        const lowerUrl = actualTargetUrl.toLowerCase();
        
        const isM3U8 = contentType.includes('mpegurl') || 
                       contentType.includes('mpegURL') || 
                       lowerUrl.includes('.m3u8') || 
                       lowerUrl.includes('.php') || 
                       lowerUrl.includes('/m3u/');

        // If it's an HLS manifest, rewrite relative segment paths to use the proxy
        if (isM3U8 && !lowerUrl.includes('.ts')) {
          const text = await response.text();
          
          if (text.startsWith('#EXTM3U') || text.includes('#EXT-X-')) {
            const lines = text.split(/\\r?\\n/);
            const proxyUrlBase = \`\${url.protocol}//\${url.host}/proxy?url=\`;
            
            const rewrittenLines = lines.map(line => {
              const trimmed = line.trim();
              if (trimmed === '') return line;
              
              if (trimmed.startsWith('#')) {
                if (trimmed.includes('URI=')) {
                  return line.replace(/URI="([^"]+)"/g, (match, uri) => {
                    let absoluteUri = uri;
                    try {
                      if (!uri.startsWith('http://') && !uri.startsWith('https://')) {
                        absoluteUri = new URL(uri, finalResponseUrl).href;
                      }
                    } catch (e) {}
                    return \`URI="\${proxyUrlBase}\${encodeURIComponent(absoluteUri + pipeString)}"\`;
                  });
                }
                return line;
              }
              
              let absoluteUrl = trimmed;
              try {
                if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
                  absoluteUrl = new URL(trimmed, finalResponseUrl).href;
                }
              } catch (e) {}
              return proxyUrlBase + encodeURIComponent(absoluteUrl + pipeString);
            });
            
            return new Response(rewrittenLines.join('\\n'), {
              headers: {
                'Content-Type': contentType,
                ...corsHeaders
              }
            });
          }
          
          return new Response(text, {
            headers: {
              'Content-Type': contentType,
              ...corsHeaders
            }
          });
        }
        
        // Handle DASH streams
        if (contentType.includes('dash+xml') || lowerUrl.includes('.mpd') || lowerUrl.includes('mpd.php')) {
          const text = await response.text();
          const proxyUrlBase = \`\${url.protocol}//\${url.host}/proxy?url=\`;
          
          let xmlBaseUrl = finalResponseUrl;
          const baseUrlMatch = text.match(/<BaseURL([^>]*)>([^<]+)<\\/BaseURL>/i);
          if (baseUrlMatch) {
            const relBase = baseUrlMatch[2].trim();
            try {
              const baseUrlObj = new URL(finalResponseUrl);
              const resolvedUrlObj = new URL(relBase, finalResponseUrl);
              if (baseUrlObj.search && !resolvedUrlObj.search) {
                resolvedUrlObj.search = baseUrlObj.search;
              }
              xmlBaseUrl = resolvedUrlObj.href;
            } catch (e) {}
          }
          
          let rewritten = text.replace(/(href|media|initialization|url|uri)="([^"]+)"/gi, (match, attr, val) => {
            const trimmedVal = val.trim();
            if (trimmedVal === '' || trimmedVal.startsWith('#')) return match;
            
            let absoluteUrl = trimmedVal;
            try {
              if (!trimmedVal.startsWith('http://') && !trimmedVal.startsWith('https://')) {
                const xmlBaseObj = new URL(xmlBaseUrl);
                const resolvedObj = new URL(trimmedVal, xmlBaseUrl);
                if (xmlBaseObj.search && !resolvedObj.search) {
                  resolvedObj.search = xmlBaseObj.search;
                }
                absoluteUrl = resolvedObj.href;
              }
            } catch (e) {
              return match;
            }
            
            return \`\${attr}="\${proxyUrlBase}\${encodeURIComponent(absoluteUrl + pipeString)}"\`;
          });
          
          rewritten = rewritten.replace(/<Location([^>]*)>([^<]+)<\\/Location>/g, (match, attrs, lUrl) => {
            const trimmedUrl = lUrl.trim();
            let absoluteUrl = trimmedUrl;
            try {
              if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
                const xmlBaseObj = new URL(xmlBaseUrl);
                const resolvedObj = new URL(trimmedUrl, xmlBaseUrl);
                if (xmlBaseObj.search && !resolvedObj.search) {
                  resolvedObj.search = xmlBaseObj.search;
                }
                absoluteUrl = resolvedObj.href;
              }
            } catch (e) {}
            return \`<Location\${attrs}>\${proxyUrlBase}\${encodeURIComponent(absoluteUrl + pipeString)}<\\/Location>\`;
          });
          
          rewritten = rewritten.replace(/<BaseURL[^>]*>[^<]+<\\/BaseURL>/gi, '');
          
          return new Response(rewritten, {
            headers: {
              'Content-Type': contentType,
              ...corsHeaders
            }
          });
        }

        // Return the media stream binary response directly
        const newResponseHeaders = new Headers(response.headers);
        newResponseHeaders.set('Access-Control-Allow-Origin', '*');
        newResponseHeaders.set('Access-Control-Allow-Headers', '*');
        newResponseHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newResponseHeaders
        });
      } catch (err) {
        return new Response('Proxy error: ' + err.message, { status: 500, headers: corsHeaders });
      }
    }

    return new Response('Not found', { status: 404 });
  }
};
`;

fs.writeFileSync(path.join(__dirname, 'worker.js'), workerTemplate);
console.log('Successfully created worker.js!');
