// Simple Service Worker for caching
const CACHE_NAME = 'visionx-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/script.js',
  '/assets/visionx-logo.png',
  '/assets/FInagro LOGO 3.png',
  'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap',
  'https://use.fontawesome.com/releases/v6.5.0/css/all.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});