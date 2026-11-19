self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Service worker aktif untuk memenuhi kriteria instalasi PWA
});
