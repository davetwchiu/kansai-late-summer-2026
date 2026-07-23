const CACHE_NAME = "kansai-todaiji-v1";
const CORE = [
  "./todaiji.html",
  "./assets/style.css",
  "./assets/site.js",
  "./assets/todaiji.js",
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
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => event.request.mode === "navigate" ? caches.match("./todaiji.html") : Response.error()))
  );
});
