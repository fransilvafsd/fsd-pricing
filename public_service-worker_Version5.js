self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('cost-calc-v1').then(cache =>
      cache.addAll(['/', '/index.html', '/manifest.json'])
    )
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});