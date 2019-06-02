importScripts("/precache-manifest.5153e12b0543636591322526f408ba4d.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.cleanupOutdatedCaches();

workbox.core.setCacheNameDetails({
  prefix: "appCache"
});

workbox.core.clientsClaim();

workbox.core.skipWaiting();

workbox.precaching.precacheAndRoute(
  [
    "https://use.fontawesome.com/releases/v5.8.2/css/all.css",
    "https://fonts.googleapis.com/css?family=Roboto:400,700"
  ].concat(self.__precacheManifest)
);


workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL('/index.html')
);
