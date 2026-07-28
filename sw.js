const META_CACHE = "kansai-offline-meta-v1";
const CONTENT_PREFIX = "kansai-offline-content-";
const ACTIVE_KEY = new URL("./__active_content__", self.registration.scope);
const OFFLINE_MANIFEST = "./offline-files.json";

async function getActiveCacheName() {
  const response = await (await caches.open(META_CACHE)).match(ACTIVE_KEY);
  return response ? response.text() : null;
}

async function setActiveCacheName(name) {
  const meta = await caches.open(META_CACHE);
  await meta.put(ACTIVE_KEY, new Response(name));
}

async function downloadContent() {
  const manifestResponse = await fetch(OFFLINE_MANIFEST, { cache: "reload" });
  if (!manifestResponse.ok) throw new Error("無法下載離線檔案清單");

  const manifest = await manifestResponse.json();
  const nextCacheName = `${CONTENT_PREFIX}${manifest.version}-${Date.now()}`;
  const nextCache = await caches.open(nextCacheName);

  try {
    await nextCache.addAll(
      manifest.files.map((url) => new Request(url, { cache: "reload" }))
    );
    const previousCacheName = await getActiveCacheName();
    await setActiveCacheName(nextCacheName);
    if (previousCacheName && previousCacheName !== nextCacheName) {
      await caches.delete(previousCacheName);
    }
    return manifest.version;
  } catch (error) {
    await caches.delete(nextCacheName);
    throw error;
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    getActiveCacheName().then((name) => name || downloadContent())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(async (names) => {
        const active = await getActiveCacheName();
        await Promise.all(
          names
            .filter((name) =>
              (name.startsWith(CONTENT_PREFIX) && name !== active) ||
              name.startsWith("kansai-todaiji-")
            )
            .map((name) => caches.delete(name))
        );
      }),
    ])
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  if (event.data?.type !== "UPDATE_CONTENT") return;
  event.waitUntil(
    downloadContent()
      .then((version) => event.ports[0]?.postMessage({ ok: true, version }))
      .catch((error) =>
        event.ports[0]?.postMessage({
          ok: false,
          message: error.message || "更新失敗",
        })
      )
  );
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.method !== "GET" ||
    new URL(event.request.url).origin !== self.location.origin
  ) {
    return;
  }

  event.respondWith(
    getActiveCacheName().then(async (name) => {
      const cache = name ? await caches.open(name) : null;
      const cached = cache
        ? await cache.match(event.request, { ignoreSearch: true })
        : null;
      if (cached) return cached;

      try {
        return await fetch(event.request);
      } catch (error) {
        if (event.request.mode === "navigate" && cache) {
          return (
            (await cache.match("./index.html")) ||
            (await cache.match("./"))
          );
        }
        throw error;
      }
    })
  );
});
