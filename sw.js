const CACHE_NAME = "kansai-todaiji-v14";
const CORE = [
  "./todaiji.html",
  "./museums.html",
  "./assets/style.css?v=20260723-2",
  "./assets/todaiji-enhanced.css?v=20260724-2",
  "./assets/todaiji-quick-read.css?v=20260724-1",
  "./assets/todaiji-deep-stations.css?v=20260724-1",
  "./assets/todaiji-kaidando-gallery.css?v=20260724-2",
  "./assets/todaiji-sound-ritual.css?v=20260724-1",
  "./assets/site.js",
  "./assets/todaiji.js",
  "./assets/todaiji-media-audit.js",
  "./assets/todaiji-quick-read.js?v=20260724-1",
  "./assets/todaiji-deep-stations.js?v=20260724-1",
  "./assets/todaiji-kaidando-gallery.js?v=20260724-2",
  "./assets/todaiji-sound-ritual.js?v=20260724-1",
  "./assets/images/todaiji/daibutsuden.webp",
  "./assets/images/todaiji/nandaimon-structure.webp",
  "./assets/images/todaiji/nio-ungyo.webp",
  "./assets/images/todaiji/daibutsu.webp",
  "./assets/images/todaiji/octagonal-lantern.webp",
  "./assets/images/todaiji/hokkedo.webp",
  "./assets/images/todaiji/nigatsudo.webp",
  "./assets/images/todaiji/shunie.webp",
  "./data/todaiji-media.json",
  "./daily.html",
  "./maps.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("kansai-todaiji-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  const networkFirst = event.request.mode === "navigate" || ["style", "script"].includes(event.request.destination);
  if (networkFirst) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./todaiji.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => event.request.mode === "navigate" ? caches.match("./todaiji.html") : Response.error()))
  );
});
