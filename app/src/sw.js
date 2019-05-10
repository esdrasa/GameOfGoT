/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
    /\.(?:js|css|html)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-resources"
    })
  );
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: "images"
    })
  );
  workbox.routing.registerRoute(
    "https://www.anapioficeandfire.com/api/characters?page=2&pageSize=100",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "api"
    })
  );
}
