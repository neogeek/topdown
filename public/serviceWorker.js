const cacheName = 'top-down-app';
const cacheVersion = `${cacheName}::2.0.0`;

const cachedFiles = [
  '/',
  '/favicon.ico',
  '/css/styles.css',
  '/js/bundle.min.js'
];

const networkFiles = [];

self.addEventListener('install', event => {
  console.log('[pwa install]');

  event.waitUntil(
    caches.open(cacheVersion).then(cache => cache.addAll(cachedFiles))
  );
});

self.addEventListener('activate', event => {
  console.log('[pwa activate]');

  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key.indexOf(cacheName) === 0 && key !== cacheVersion)
            .map(key => caches.delete(key))
        )
      )
  );

  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (!event.request.url.match(/^http/u)) {
    return;
  }

  if (networkFiles.filter(item => event.request.url.match(item)).length) {
    console.log('[network fetch]', event.request.url);

    event.respondWith(
      caches
        .match(event.request)
        .then(response => response || fetch(event.request))
    );
  } else {
    console.log('[pwa fetch]', event.request.url);

    event.respondWith(
      caches.match(event.request).then(response => {
        caches.open(cacheVersion).then(cache => cache.add(event.request.url));

        return fetch(event.request).catch(() => response);
      })
    );
  }
});
