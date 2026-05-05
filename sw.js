const CACHE_NAME = 'amn-portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/home.html',
  '/about.html',
  '/github.html',
  '/skills.html',
  '/experience.html',
  '/education.html',
  '/certificates.html',
  '/friends.html',
  '/contact.html',
  'https://cdn.tailwindcss.com',
  'https://code.jquery.com/jquery-3.6.0.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
];

// Install Service Worker & Caching Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate & Cleanup Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Strategy: Cache First, Fallback to Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});