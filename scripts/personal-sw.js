// Cache public application files only. GitHub data keeps its existing separate cache and authorization checks.
const BASE = new URL('./', self.location.href);
const PREFIX = 'personal-shell:' + BASE.pathname + ':';
const CACHE = PREFIX + BUILD.version;
const PAGE = new URL('index.html', BASE).href;
const ASSETS = new Set(BUILD.assets.map(path => new URL(path, BASE).href));
const assetPath = new RegExp('^' + BASE.pathname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 'assets/[^/]+-[A-Z0-9]+\\.(js|css|woff2)$');

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll([...ASSETS].map(url => new Request(url, { cache: 'reload' })));
    // Embedded HTML matches this build even if a CDN still serves an older index page.
    const html = BUILD.html.replace('<html ', '<html data-personal-shell="local" ');
    await cache.put(PAGE, new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const old = [];
    for (const key of (await caches.keys()).filter(key => key.startsWith(PREFIX) && key !== CACHE)) {
      if (await (await caches.open(key)).match(PAGE)) old.push(key);
      else await caches.delete(key);
    }
    // Keep one previous set for open tabs. Never force a reload over an unsaved edit.
    await Promise.all(old.slice(0, -1).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== BASE.origin || request.headers.has('Authorization')) return;
  const navigation = request.mode === 'navigate' && (url.pathname === BASE.pathname || url.pathname === BASE.pathname + 'index.html');
  const asset = !url.search && (ASSETS.has(url.href) || assetPath.test(url.pathname));
  if (!navigation && !asset) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(navigation ? PAGE : request);
    if (hit) return hit;
    if (asset) {
      for (const key of (await caches.keys()).filter(key => key.startsWith(PREFIX) && key !== CACHE)) {
        const old = await (await caches.open(key)).match(request);
        if (old) return old;
      }
    }
    // Browser storage eviction falls back to the network; failed responses are never cached.
    return fetch(request);
  })());
});
