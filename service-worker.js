const CACHE_NAME = "skillswap-v1";

const urlsToCache = [
  "/Swap/",
  "/index.html",
  "/login.html",
  "/signup.html",
  "/dashboard.html",
  "/style.css",
  "/dashboard.js",
  "/calendar.js"
];

/***********************
 * INSTALL
 ***********************/
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Caching files...");
        return cache.addAll(urlsToCache);
      })
  );
});

/***********************
 * FETCH
 ***********************/
self.addEventListener("fetch", event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {

        // Return cache if exists
        if (response) {
          return response;
        }

        // Else fetch from network
        return fetch(event.request);

      })
  );

});

/***********************
 * ACTIVATE
 ***********************/
self.addEventListener("activate", event => {

  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {

          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }

        })
      );
    })
  );

});