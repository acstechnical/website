const CACHE_VERSION = 'v1';
const CACHE_NAME = `video-cache-${CACHE_VERSION}`;

const VIDEO_FILES = [
  '/assets/static/antiddos/background.mp4',
  '/assets/static/global/footer_background.mp4',
  '/assets/static/home/home_background.mp4',
  '/assets/static/hpc/cpu_background.mp4'
];

self.addEventListener('install', event => {
  console.log('Service Worker Installing 🛠️');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching video files ⏳');
      return cache.addAll(VIDEO_FILES);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker Activated ✅');

  // Xóa cache cũ khi có version mới
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );

  self.clients.claim();
});

// Trả từ cache khi fetch video
self.addEventListener('fetch', event => {
  const urlPath = new URL(event.request.url).pathname;

  if (VIDEO_FILES.includes(urlPath)) {
    console.log('Serving video from cache 🎥:', urlPath);
    event.respondWith(
      caches.match(event.request).then(res => res || fetch(event.request))
    );
  }
});
