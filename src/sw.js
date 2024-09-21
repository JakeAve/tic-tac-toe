const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

const PRECACHE_URLS = [
  "/tic-tac-toe",
  "/tic-tac-toe/index.html",
  "/tic-tac-toe/styles/dialog-polyfill.css",
  "/tic-tac-toe/styles/main.css",
  "/tic-tac-toe/styles/toggle.css",
  "/tic-tac-toe/scripts/ai.js",
  "/tic-tac-toe/scripts/dialogPolyfill.js",
  "/tic-tac-toe/scripts/game.js",
  "/tic-tac-toe/scripts/main.js",
  "/tic-tac-toe/assets/fonts/Nunito-Medium.ttf",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then((cache) => {
          return fetch(event.request).then((response) => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
