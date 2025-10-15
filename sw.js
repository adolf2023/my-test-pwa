self.addEventListener('install', (event) => {
  console.log('Service Worker встановлено');
});

self.addEventListener('fetch', (event) => {
  // Можна додати кешування пізніше
});