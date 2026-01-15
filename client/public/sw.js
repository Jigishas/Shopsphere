const CACHE_NAME = 'shopsphere-cache-v1';
const urlsToCache = [
  '/',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/vite.svg',
  '/manifest.json',
  '/src/Signup.tsx',
  '/src/Login.tsx',
  '/src/Shop.tsx',
  '/src/Categories.tsx',
  '/src/Deals.tsx',
  '/src/About.tsx',
  '/src/Contact.tsx'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
