/* نسخة الكاش: غيّر الرقم عند كل تحديث للتطبيق */
const CACHE='nujum-v14';
const FILES=["./", "index.html", "manifest.webmanifest", "confetti.js", "fonts/cairo.css", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/icon-180.png", "images/p-four-connect.jpg", "images/p-gel-blaster.jpg", "images/p-hootoo-ht-ep84.jpg", "images/p-p9-headphones.jpg", "fonts/cairo-arabic-400-normal.woff2", "fonts/cairo-arabic-600-normal.woff2", "fonts/cairo-arabic-700-normal.woff2", "fonts/cairo-arabic-900-normal.woff2", "fonts/cairo-latin-400-normal.woff2", "fonts/cairo-latin-600-normal.woff2", "fonts/cairo-latin-700-normal.woff2", "fonts/cairo-latin-900-normal.woff2"];
/* التثبيت يجلب الملفات طازجة من الخادم متجاوزاً كاش المتصفح (GitHub يحتفظ بالملفات 10 دقائق) */
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:'reload'})).then(r=>{if(!r.ok)throw new Error(f);return c.put(f,r)})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* الكاش أولاً (يعمل دون إنترنت) ثم تحديث في الخلفية مع التحقق من الخادم */
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request.url,{cache:'no-cache'}).then(r=>{if(r&&r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>hit);
    return hit||net;
  }));
});
