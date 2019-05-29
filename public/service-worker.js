try {
  importScripts("/AssetsManager.js");

  let assetsManager = new AssetsManager(); //create an instance of AssetsManager

  self.addEventListener("install", event => {
    event.waitUntil(assetsManager.addAllToCache());
  });

  self.addEventListener("activate", event => {
    event.waitUntil(assetsManager.removeNotInAssets());
  });

  self.addEventListener("fetch", function(event) {
    if (event.request.method !== "GET") {
      return;
    }
    // Cache then network
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
} catch (ex) {
  console.log(ex);
}
