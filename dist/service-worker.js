importScripts("/precache-manifest.51c7ecb006cad78ce98ffd8e9549dfac.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.precaching.cleanupOutdatedCaches();

workbox.core.setCacheNameDetails({
    prefix: "appCache"
});

workbox.core.clientsClaim();

workbox.core.skipWaiting();

workbox.precaching.precacheAndRoute(["https://use.fontawesome.com/releases/v5.8.2/css/all.css", "https://fonts.googleapis.com/css?family=Roboto:400,700"].concat(self.__precacheManifest));

