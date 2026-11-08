importScripts('./offline.js');
const CACHE='course-player-shell-v2';
const ASSETS=['./','./index.html','./style.css','./config.js','./offline.js','./playback.js','./app.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('course-player-shell-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
  const u=new URL(event.request.url); const root=new URL(self.registration.scope);
  if(u.origin!==root.origin)return;
  const prefix=root.pathname+'offline/';
  if(u.pathname.startsWith(prefix)){
    const id=decodeURIComponent(u.pathname.slice(prefix.length));
    event.respondWith(offlineStore.respond(event.request,id).catch(()=>new Response('Offline storage unavailable',{status:503})));return;
  }
  if(event.request.method!=='GET')return;
  const shell=ASSETS.map(path=>new URL(path,root).pathname);
  if(!shell.includes(u.pathname))return;
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));}
    return response;
  }).catch(async()=>await caches.match(event.request)||await caches.match(new URL('./index.html',root))));
});
