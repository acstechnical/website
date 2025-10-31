const CACHE_NAME = "video-cache-v2";
const VIDEO_FILES = [
  /* list như cũ */
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        VIDEO_FILES.map((url) => {
          return fetch(url, { method: "GET" }).then((res) => cache.put(url, res.clone()));
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const urlPath = new URL(event.request.url).pathname;
  if (VIDEO_FILES.includes(urlPath)) {
    event.respondWith(handleVideoRequest(event.request));
  }
});

async function handleVideoRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedRes = await cache.match(request.url);

  if (!cachedRes) {
    // Nếu chưa cache, fetch và cache full
    const networkRes = await fetch(request);
    cache.put(request.url, networkRes.clone());
    return networkRes;
  }

  // Handle Range requests
  const rangeHeader = request.headers.get("range");
  if (!rangeHeader) {
    return cachedRes; // Full file nếu không range
  }

  // Parse range (e.g., bytes=0-1023)
  const ranges = rangeHeader.replace(/bytes=/, "").split("-");
  const start = parseInt(ranges[0], 10);
  const end = ranges[1] ? parseInt(ranges[1], 10) : undefined;

  const cachedBody = await cachedRes.arrayBuffer();
  const totalLength = cachedBody.byteLength;
  const sliceEnd = end ? Math.min(end + 1, totalLength) : totalLength;
  const slicedBuffer = cachedBody.slice(start, sliceEnd);

  return new Response(slicedBuffer, {
    status: 206, // Partial Content
    statusText: "Partial Content",
    headers: {
      "Content-Type": "video/mp4",
      "Content-Range": `bytes ${start}-${sliceEnd - 1}/${totalLength}`,
      "Content-Length": slicedBuffer.byteLength.toString(),
    },
  });
}
