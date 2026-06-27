const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let channels = [];
let groups = [];
let groupCounts = {};

// Clean and load all playlists from the Channels directory
function loadPlaylists() {
  channels = [];
  
  try {
    const playlistDir = path.join(__dirname, 'Channels');
    if (!fs.existsSync(playlistDir)) {
      fs.mkdirSync(playlistDir);
    }
    
    const files = fs.readdirSync(playlistDir);
    const playlistFiles = files.filter(f => 
      f.endsWith('.json') && 
      f !== 'package.json' && 
      f !== 'package-lock.json'
    );
    
    console.log(`Found playlist files: ${playlistFiles.join(', ')}`);
    
    playlistFiles.forEach(filename => {
      const filePath = path.join(playlistDir, filename);
      console.log(`Loading playlist: ${filename}`);
      
      try {
        let rawText = fs.readFileSync(filePath, 'utf8').trim();
        let fileChannels;
        try {
          // 1. Try parsing it directly (covers valid arrays and objects)
          const parsed = JSON.parse(rawText);
          if (Array.isArray(parsed)) {
            fileChannels = parsed;
          } else if (parsed && typeof parsed === 'object') {
            // If it's an object, find the key containing the channel array
            const arrayKey = Object.keys(parsed).find(k => Array.isArray(parsed[k]));
            if (arrayKey) {
              fileChannels = parsed[arrayKey];
            } else {
              fileChannels = [parsed];
            }
          }
        } catch (parseErr) {
          // 2. If parsing fails, it may be the malformed KSR Playlist format. Apply repair.
          console.log(`  [${filename}] Direct parse failed. Attempting structural repair...`);
          
          let cleanedText = rawText;
          if (rawText.startsWith('{') && rawText.endsWith('}')) {
            cleanedText = '[' + rawText.substring(1);
            if (cleanedText.endsWith('}')) {
              cleanedText = cleanedText.slice(0, -1);
            }
          }
          
          // Clean trailing commas that crash JSON.parse
          cleanedText = cleanedText.replace(/,\s*([\]}])/g, '$1');
          
          fileChannels = JSON.parse(cleanedText);
          if (!Array.isArray(fileChannels)) {
            fileChannels = [fileChannels];
          }
        }
        
        console.log(`  [${filename}] Parsed ${fileChannels.length} elements.`);
        
        // Format a default group based on filename
        const fileBaseGroup = filename.replace(/\.json$/i, '').replace(/[._-]/g, ' ');
        const defaultGroup = fileBaseGroup.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        
        let addedCount = 0;
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
          
          channels.push({
            id: id,
            name: name,
            url: url,
            logo: logo,
            group: group,
            tvgId: item.tvgId || '',
            tvgName: item.tvgName || ''
          });
          addedCount++;
        });
        
        console.log(`  [${filename}] Standardized and added ${addedCount} channels.`);
      } catch (err) {
        console.error(`  [${filename}] Failed to process playlist file:`, err.message);
      }
    });
    
    console.log(`Successfully loaded ${channels.length} total channels across all playlists.`);
    
    // Extract unique groups and count channels per group
    groupCounts = {};
    channels.forEach(channel => {
      const groupName = channel.group || 'Other';
      groupCounts[groupName] = (groupCounts[groupName] || 0) + 1;
    });

    // Create a sorted list of group objects
    groups = Object.keys(groupCounts)
      .map(name => ({ name, count: groupCounts[name] }))
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log(`Extracted ${groups.length} distinct groups/categories.`);
  } catch (error) {
    console.error('Failed to scan workspace for playlist files:', error.message);
    process.exit(1);
  }
}

// Initialize playlists
loadPlaylists();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve frontend static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoints

// 1. Get all categories/groups
app.get('/api/groups', (req, res) => {
  res.json({
    success: true,
    total: groups.length,
    groups: groups
  });
});

// 2. Get channels with query, group filter, and pagination
app.get('/api/channels', (req, res) => {
  let { group, search, page, limit, ids } = req.query;
  
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 50;
  
  let filtered = channels;

  // Filter by specific comma-separated IDs (useful for loading favorites)
  if (ids) {
    const idList = ids.split(',').map(id => id.trim());
    filtered = filtered.filter(ch => idList.includes(ch.id));
  }

  // Filter by group
  if (group) {
    const groupLower = group.toLowerCase();
    filtered = filtered.filter(ch => (ch.group || 'Other').toLowerCase() === groupLower);
  }

  // Filter by search query (checks name, group, and tvgName)
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

  res.json({
    success: true,
    total: totalResults,
    page: page,
    limit: limit,
    totalPages: Math.ceil(totalResults / limit),
    channels: paginated
  });
});

// Proxy endpoint to bypass CORS and resolve absolute/relative URLs in HLS manifests
app.get('/proxy', async (req, res) => {
  const urlPrefix = '/proxy?url=';
  const targetUrlIndex = req.originalUrl.indexOf(urlPrefix);
  let targetUrl = '';
  
  if (targetUrlIndex !== -1) {
    targetUrl = decodeURIComponent(req.originalUrl.slice(targetUrlIndex + urlPrefix.length));
  } else {
    targetUrl = req.query.url;
  }

  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }

  // Parse header parameters specified with pipe notation (e.g., URL|User-Agent=...&Referer=...)
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
    } catch (e) {
      console.warn('Failed to parse pipe headers:', targetUrl.slice(pipeIndex + 1));
    }
  }

  // Set standard headers to mimic a valid browser request and merge custom ones
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': actualTargetUrl,
    ...customHeaders
  };

  // Spoof User-Agent for MPEG-TS streams to bypass blocks on Xtream Codes / IPTV restreamers
  if (actualTargetUrl.toLowerCase().includes('.ts') && !customHeaders['User-Agent']) {
    headers['User-Agent'] = 'VLC/3.0.18 LibVLC/3.0.18';
  }

  if (req.headers.range) {
    headers['Range'] = req.headers.range;
  }

  try {
    const response = await fetch(actualTargetUrl, { headers });
    
    // Copy the response status and content headers
    res.status(response.status);
    
    const contentType = response.headers.get('content-type') || '';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const contentRange = response.headers.get('content-range');
    if (contentRange) res.setHeader('Content-Range', contentRange);
    
    const acceptRanges = response.headers.get('accept-ranges');
    if (acceptRanges) res.setHeader('Accept-Ranges', acceptRanges);

    const finalResponseUrl = response.url || actualTargetUrl;
    const lowerUrl = actualTargetUrl.toLowerCase();
    const isM3U8 = contentType.includes('mpegurl') || 
                   contentType.includes('mpegURL') || 
                   lowerUrl.includes('.m3u8') || 
                   lowerUrl.includes('.php') || 
                   lowerUrl.includes('/m3u/');

    // If it's an HLS manifest, we must parse and rewrite absolute and relative URLs
    if (isM3U8 && !lowerUrl.includes('.ts')) {
      const text = await response.text();
      
      if (text.startsWith('#EXTM3U') || text.includes('#EXT-X-')) {
        const lines = text.split(/\r?\n/);
        const proxyUrlBase = `${req.protocol}://${req.get('host')}/proxy?url=`;
        
        const rewrittenLines = lines.map(line => {
          const trimmed = line.trim();
          if (trimmed === '') return line;
          
          if (trimmed.startsWith('#')) {
            // Rewrite URI elements inside directives (e.g. key URLs or maps)
            if (trimmed.includes('URI=')) {
              return line.replace(/URI="([^"]+)"/g, (match, uri) => {
                let absoluteUri = uri;
                try {
                  if (!uri.startsWith('http://') && !uri.startsWith('https://')) {
                    absoluteUri = new URL(uri, finalResponseUrl).href;
                  }
                } catch (e) {
                  // Fallback
                }
                return `URI="${proxyUrlBase}${encodeURIComponent(absoluteUri + pipeString)}"`;
              });
            }
            return line;
          }
          
          // Resolve relative or absolute URLs to segment / sub-playlist files relative to finalResponseUrl
          let absoluteUrl = trimmed;
          try {
            if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
              absoluteUrl = new URL(trimmed, finalResponseUrl).href;
            }
          } catch (e) {
            // Fallback
          }
          return proxyUrlBase + encodeURIComponent(absoluteUrl + pipeString);
        });
        
        res.send(rewrittenLines.join('\n'));
      } else {
        res.send(text);
      }
    } else if (contentType.includes('dash+xml') || lowerUrl.includes('.mpd') || lowerUrl.includes('mpd.php')) {
      const text = await response.text();
      const proxyUrlBase = `${req.protocol}://${req.get('host')}/proxy?url=`;
      
      // 1. Determine the base URL for XML path resolution (handling any <BaseURL> elements)
      let xmlBaseUrl = finalResponseUrl;
      const baseUrlMatch = text.match(/<BaseURL([^>]*)>([^<]+)<\/BaseURL>/i);
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
      
      // 2. Rewrite any relative/absolute URLs in standard attributes to be absolute proxied URLs
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
        
        return `${attr}="${proxyUrlBase}${encodeURIComponent(absoluteUrl + pipeString)}"`;
      });
      
      // 3. Rewrite Location tags (resolving relative ones and proxying all)
      rewritten = rewritten.replace(/<Location([^>]*)>([^<]+)<\/Location>/g, (match, attrs, url) => {
        const trimmedUrl = url.trim();
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
        return `<Location${attrs}>${proxyUrlBase}${encodeURIComponent(absoluteUrl + pipeString)}<\/Location>`;
      });
      
      // 4. Strip <BaseURL> elements so the player doesn't resolve absolute proxied URLs relatively
      rewritten = rewritten.replace(/<BaseURL[^>]*>[^<]+<\/BaseURL>/gi, '');
      
      res.send(rewritten);
    } else {
      // Stream binary data back (e.g. .ts segments, media files)
      if (response.body) {
        const { Readable } = require('stream');
        const nodeReadable = Readable.fromWeb(response.body);
        
        // Handle stream error to prevent server crash on client disconnect/abort
        nodeReadable.on('error', (err) => {
          console.warn('Proxy segment pipe warning (client disconnected):', err.message);
          if (!res.writableEnded) {
            res.end();
          }
        });
        
        // Handle client request aborts to close the target socket stream
        req.on('close', () => {
          try {
            nodeReadable.destroy();
          } catch (e) {}
        });
        
        nodeReadable.pipe(res);
      } else {
        res.end();
      }
    }
  } catch (err) {
    console.error('Proxy failed for URL:', actualTargetUrl, err.message);
    res.status(500).send('Proxy error: ' + err.message);
  }
});

// Wildcard route to serve index.html for single-page routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`IPTV Server is running at http://localhost:${PORT}`);
});
