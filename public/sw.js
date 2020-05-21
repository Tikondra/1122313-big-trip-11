const CACHE_PREFIX = `bigtrip-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const getFilteredKeysPromises = (keys) => {
  return keys.map((key) => {
    if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
      return caches.delete(key);
    }

    return null;
  })
    .filter((key) => key !== null);
};

self.addEventListener(`install`, (event) => {
  const openCache = caches.open(CACHE_NAME)
    .then((cache) => {

      return cache.addAll([
        `/`,
        `/index.html`,
        `/bundle.js`,
        `/css/style.css`,
        `/img/icons/bus.png`,
        `/img/icons/check-in.png`,
        `/img/icons/drive.png`,
        `/img/icons/flight.png`,
        `/img/icons/restaurant.png`,
        `/img/icons/ship.png`,
        `/img/icons/sightseeing.png`,
        `/img/icons/taxi.png`,
        `/img/icons/train.png`,
        `/img/icons/transport.png`,
        `/img/header-bg.png`,
        `/img/header-bg@2x.png`,
        `/img/logo.png`
      ]);
    })

  event.waitUntil(openCache);
});

self.addEventListener(`activate`, (event) => {
  const cashedKeys = caches.keys()
    .then((keys) => {

      return Promise.all(getFilteredKeysPromises(keys));
    });

  event.waitUntil(cashedKeys);
});

self.addEventListener(`fetch`, (event) => {
  const {request} = event;

  const resource = caches.match(request)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse;
      }

      return fetch(request);
    })
    .then((response) => {

      if (!response || !response.ok || response.type !== `basic`) {
        return response;
      }

      const clonedResponse = response.clone();

      caches.open(CACHE_NAME)
        .then((cache) => cache.put(request, clonedResponse));

      return response;
    })

  event.respondWith(resource);
});
