// Service worker E-Surat. Naikkan nomor versi di bawah setiap kali Anda mengunggah versi baru ke GitHub.
const C = 'esurat-v9-courier';
const CDN = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'cdn.tailwindcss.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'])));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== C).map(k => caches.delete(k))))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return; // permintaan ke server Apps Script (POST) tidak pernah disentuh
  const url = new URL(req.url);

  // Halaman: ambil dari jaringan dulu, cadangan dari cache saat offline
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('index.html')));
    return;
  }

  // Pustaka dari CDN (React, Babel, Tailwind, font): simpan agar pembukaan berikutnya jauh lebih cepat
  if (CDN.includes(url.hostname)) {
    e.respondWith(
      caches.open(C).then(cache =>
        cache.match(req).then(hit => {
          const net = fetch(req).then(res => { cache.put(req, res.clone()); return res; }).catch(() => hit);
          return hit || net;
        })
      )
    );
    return;
  }

  // Aset frontend same-origin yang sudah diprecache tetap tersedia ketika koneksi putus.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.open(C).then(cache => cache.match(req).then(hit => hit || fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      })))
    );
  }
});
