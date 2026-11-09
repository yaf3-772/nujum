/* نسخة الكاش: غيّر الرقم عند كل تحديث للتطبيق */
const CACHE='nujum-v2';
const FILES=["./", "index.html", "manifest.webmanifest", "confetti.js", "fonts/cairo.css", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/icon-180.png", "fonts/cairo-arabic-400-normal.woff2", "fonts/cairo-arabic-600-normal.woff2", "fonts/cairo-arabic-700-normal.woff2", "fonts/cairo-arabic-900-normal.woff2", "fonts/cairo-latin-400-normal.woff2", "fonts/cairo-latin-600-normal.woff2", "fonts/cairo-latin-700-normal.woff2", "fonts/cairo-latin-900-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* الكاش أولاً ثم تحديث في الخلفية، فيعمل دون إنترنت */
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>hit);
    return hit||net;
  }));
});
