const WebApp = "generador_curp_web"
const assets = [
  "/",
  "/index.html",
  "/estilos/style.css",
  "/estilos/normalize.css",
  "/scripts/scripts.js",
  "/img/logo.svg"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(WebApp).then(cache => {
      cache.addAll(assets)
    })
  )
})

// Estrategia de Cache en el Service Worker *Stale While Revalidate (Obsoleto mientras se revalida)*
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open('mi-cache').then((cache) => {
          cache.put(event.request, networkResponse);  // Actualiza la caché
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;  // Devuelve de la caché o hace la solicitud de red
    })
  );
});