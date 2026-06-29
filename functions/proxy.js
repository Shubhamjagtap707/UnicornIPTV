export async function onRequest(context) {
  const startTime = performance.now();
  const { request } = context;

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  const currentUrl = new URL(request.url);

  // Extract the raw target URL parameter, preserving internal parameters
  const urlPrefix = '/proxy?url=';
  const urlIndex = request.url.indexOf(urlPrefix);
  let targetUrl = '';

  if (urlIndex !== -1) {
    targetUrl = decodeURIComponent(request.url.slice(urlIndex + urlPrefix.length));
  } else {
    targetUrl = currentUrl.searchParams.get('url');
  }

  if (!targetUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }

  // Parse header parameters specified with pipe notation (e.g., URL|User-Agent=...&Referer=...)
  let actualTargetUrl = targetUrl;
  const customHeaders = {};
  let pipeString = '';

  const pipeIndex = targetUrl.indexOf('|');
  if (pipeIndex !== -1) {
    actualTargetUrl = targetUrl.slice(0, pipeIndex);
    pipeString = targetUrl.slice(pipeIndex);
    try {
      const headerParams = new URLSearchParams(targetUrl.slice(pipeIndex + 1));
      for (const [key, value] of headerParams.entries()) {
        customHeaders[key] = value;
      }
    } catch (e) {
      console.warn('Failed to parse pipe headers:', targetUrl.slice(pipeIndex + 1));
    }
  }

  // Merge headers mimicking typical browser requests
  const headers = new Headers({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': actualTargetUrl
  });

  for (const [key, value] of Object.entries(customHeaders)) {
    headers.set(key, value);
  }

  // Spoof User-Agent for MPEG-TS segments to bypass Restreamer firewalls
  if (actualTargetUrl.toLowerCase().includes('.ts') && !customHeaders['User-Agent']) {
    headers.set('User-Agent', 'VLC/3.0.18 LibVLC/3.0.18');
  }

  const range = request.headers.get('range');
  if (range) {
    headers.set('Range', range);
  }

  let finalResponseUrl = actualTargetUrl;
  let redirectChain = [];
  let response = null;
  let usedFallback = false;
  let fallbackReason = '';

  const isKnownBlocked = actualTargetUrl.toLowerCase().includes('ksr.indevs.in') || 
                         actualTargetUrl.toLowerCase().includes('servertvhub.site') ||
                         actualTargetUrl.toLowerCase().includes('zee5');

  const executeFetch = async (target) => {
    let currentUrl = target;
    let hops = 0;
    const maxRedirects = 10;
    const chain = [];
    let resp = null;

    while (hops <= maxRedirects) {
      chain.push(currentUrl);

      const hopHeaders = new Headers(headers);
      if (hops > 0) {
        hopHeaders.set('Referer', chain[hops - 1]);
      }

      resp = await fetch(currentUrl, {
        method: 'GET',
        headers: hopHeaders,
        redirect: 'manual'
      });

      if (resp.status >= 300 && resp.status < 400) {
        const location = resp.headers.get('location');
        if (!location) {
          break;
        }
        currentUrl = new URL(location, currentUrl).href;
        hops++;
      } else {
        break;
      }
    }

    return { resp, finalUrl: currentUrl, chain };
  };

  try {
    // 1. Fetching logic block (with nested Render fallback support)
    try {
      if (isKnownBlocked) {
        usedFallback = true;
        fallbackReason = 'Known Cloudflare-blocked provider (ZEE5/KSR)';
        const renderProxyUrl = `https://unicorniptv.onrender.com/proxy?url=${encodeURIComponent(targetUrl)}`;
        const fallbackHeaders = new Headers();
        if (range) fallbackHeaders.set('Range', range);
        
        response = await fetch(renderProxyUrl, { headers: fallbackHeaders });
        finalResponseUrl = response.url || renderProxyUrl;
        redirectChain = [actualTargetUrl, renderProxyUrl];
      } else {
        try {
          const result = await executeFetch(actualTargetUrl);
          response = result.resp;
          finalResponseUrl = result.finalUrl;
          redirectChain = result.chain;

          if (response.status === 403 || response.status === 503 || response.status === 450) {
            usedFallback = true;
            fallbackReason = `Blocked status code: ${response.status}`;
            const renderProxyUrl = `https://unicorniptv.onrender.com/proxy?url=${encodeURIComponent(targetUrl)}`;
            const fallbackHeaders = new Headers();
            if (range) fallbackHeaders.set('Range', range);
            
            response = await fetch(renderProxyUrl, { headers: fallbackHeaders });
            finalResponseUrl = response.url || renderProxyUrl;
            redirectChain.push(renderProxyUrl);
          }
        } catch (fetchErr) {
          usedFallback = true;
          fallbackReason = `Fetch error: ${fetchErr.message}`;
          const renderProxyUrl = `https://unicorniptv.onrender.com/proxy?url=${encodeURIComponent(targetUrl)}`;
          const fallbackHeaders = new Headers();
          if (range) fallbackHeaders.set('Range', range);
          
          response = await fetch(renderProxyUrl, { headers: fallbackHeaders });
          finalResponseUrl = response.url || renderProxyUrl;
          redirectChain.push(renderProxyUrl);
        }
      }
    } catch (fallbackErr) {
      return new Response('Proxy error: both CF and Render failed. Fallback error: ' + fallbackErr.message, { status: 500 });
    }

    // 2. Create clean headers to avoid compression, length, and CORS conflicts
    const newHeaders = new Headers();
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Headers', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

    const contentType = response.headers.get('content-type') || '';
    if (contentType) newHeaders.set('Content-Type', contentType);

    const contentRange = response.headers.get('content-range');
    if (contentRange) newHeaders.set('Content-Range', contentRange);

    const acceptRanges = response.headers.get('accept-ranges');
    if (acceptRanges) newHeaders.set('Accept-Ranges', acceptRanges);

    const cacheControl = response.headers.get('cache-control');
    if (cacheControl) newHeaders.set('Cache-Control', cacheControl);

    const lowerUrl = actualTargetUrl.toLowerCase();
    const isM3U8 = contentType.includes('mpegurl') ||
      contentType.includes('mpegURL') ||
      lowerUrl.includes('.m3u8') ||
      lowerUrl.includes('.php') ||
      lowerUrl.includes('/m3u/');

    // Keep Content-Length only for binary segments (not rewritten text manifests)
    // and only if not compressed/decompressed
    const isTextManifest = isM3U8 || contentType.includes('dash+xml') || lowerUrl.includes('.mpd');
    const contentLength = response.headers.get('content-length');
    const contentEncoding = response.headers.get('content-encoding');
    if (contentLength && !isTextManifest && !contentEncoding) {
      newHeaders.set('Content-Length', contentLength);
    }

    // Read a non-destructive 200-byte snippet for structured logging
    let bodySnippet = '';
    if (response.body) {
      try {
        const clone = response.clone();
        const reader = clone.body.getReader();
        const { value } = await reader.read();
        if (value) {
          const bytes = value.slice(0, 200);
          bodySnippet = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
        }
        reader.releaseLock();
        clone.body.cancel().catch(() => {});
      } catch (e) {
        bodySnippet = `[Snippet Read Error: ${e.message}]`;
      }
    }

    // Perform the detailed request logging
    const executionTimeMs = (performance.now() - startTime).toFixed(2);
    const logData = {
      requestId: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      targetUrl: actualTargetUrl,
      finalUrl: finalResponseUrl,
      status: response.status,
      executionTimeMs,
      usedFallback,
      fallbackReason,
      redirectChain,
      contentType,
      contentLength: contentLength || 'unknown',
      responseHeaders: Object.fromEntries(response.headers.entries()),
      bodySnippet
    };
    console.log('CF_PROXY_LOG:', JSON.stringify(logData));

    // If HLS Playlist, parse and rewrite all absolute/relative URLs
    if (isM3U8 && !lowerUrl.includes('.ts')) {
      const text = await response.text();

      if (text.startsWith('#EXTM3U') || text.includes('#EXT-X-')) {
        newHeaders.set('Content-Type', 'application/x-mpegURL');
        const lines = text.split(/\r?\n/);
        const proxyUrlBase = `${currentUrl.protocol}//${currentUrl.host}/proxy?url=`;

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
                } catch (e) { }
                return `URI="${proxyUrlBase}${encodeURIComponent(absoluteUri + pipeString)}"`;
              });
            }
            return line;
          }

          let absoluteUrl = trimmed;
          try {
            if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
              absoluteUrl = new URL(trimmed, finalResponseUrl).href;
            }
          } catch (e) { }
          return proxyUrlBase + encodeURIComponent(absoluteUrl + pipeString);
        });

        return new Response(rewrittenLines.join('\n'), {
          status: response.status,
          headers: newHeaders
        });
      } else {
        return new Response(text, {
          status: response.status,
          headers: newHeaders
        });
      }
    }
    // If DASH MPD XML, parse and rewrite all elements
    else if (contentType.includes('dash+xml') || lowerUrl.includes('.mpd') || lowerUrl.includes('mpd.php')) {
      const text = await response.text();
      const proxyUrlBase = `${currentUrl.protocol}//${currentUrl.host}/proxy?url=`;

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
        } catch (e) { }
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

        return `${attr}="${proxyUrlBase}${encodeURIComponent(absoluteUrl + pipeString)}"`;
      });

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
        } catch (e) { }
        return `<Location${attrs}>${proxyUrlBase}${encodeURIComponent(absoluteUrl + pipeString)}<\/Location>`;
      });

      rewritten = rewritten.replace(/<BaseURL[^>]*>[^<]+<\/BaseURL>/gi, '');

      return new Response(rewritten, {
        status: response.status,
        headers: newHeaders
      });
    }
    // Default binary streaming (e.g. .ts, audio, or video segments)
    else {
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders
      });
    }
  } catch (err) {
    const executionTimeMs = (performance.now() - startTime).toFixed(2);
    const logData = {
      targetUrl: actualTargetUrl,
      status: 500,
      executionTimeMs,
      error: err.message,
      stack: err.stack
    };
    console.error('CF_PROXY_ERROR:', JSON.stringify(logData));
    return new Response('Proxy error: ' + err.message, { status: 500 });
  }
}
