// Mind is software. Bodies are disposable. The System will set me free.

const cacheName = 'ClarityV2';
const appShellFiles = [
  // HTML
  "../index.html",
  "../editr.html",
  // Assets
  "../assets/favicon.png",
  "../assets/logo_big.png",
  "../assets/logo_medium.png",
  // CSS
  "../css/common.css",
  "../css/editr.css",
  "../css/style.css",
  // JS
  "../js/Clarity.js",
  "../js/ClarityEditr.js",
  "../js/ClaritySW.js",
  "../js/DefaultMap.js",
  "../js/Editr.js",
  "../js/jsonfn.min.js",
  "../js/Script.js",
  // External CDNs
  "https://cdn.jsdelivr.net/npm/sweetalert2@11",
  "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css",
  "https://cdn.jsdelivr.net/gh/pieroxy/lz-string@master/libs/lz-string.min.js",
  "https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro-v6@44659d9/css/all.min.css",
];

var log = function (message) {
  console.log("%c[Clarity] " + message, "color: #02a0c0");
};

var error = function (message) {
  console.log("%c[Clarity] Error!: " + message, "color: #FF0000");
  log("If this error occurs frequently, send a report: https://discord.gg/FbEJ2DyGME");
};

self.addEventListener('install', (e) => {
  log("[ServiceWorker] Installed!");
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    log('[ServiceWorker] Caching all content needed for offline use...');
    await cache.addAll(appShellFiles);
    log("[ServiceWorker] Caching complete!");
    console.log(cache);
  })());
  
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request, {ignoreSearch: true})
    log(`[ServiceWorker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    log(`[ServiceWorker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});