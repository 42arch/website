const CACHE_NAME = 'starllow-pwa-v1'
const CACHE_PREFIX = 'starllow-pwa-'
const OFFLINE_ZH = '/offline?lang=zh'
const OFFLINE_EN = '/offline?lang=en'
const PRECACHE_URLS = [OFFLINE_ZH, OFFLINE_EN, '/pwa/icon-192.png']

globalThis.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)),
  )
})

globalThis.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      await Promise.all(keys
        .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
        .map(key => caches.delete(key)))
      await globalThis.clients.claim()
    }),
  )
})

globalThis.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  if (request.method !== 'GET' || url.origin !== globalThis.location.origin || request.headers.has('range'))
    return

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request)
        const cacheControl = response.headers.get('cache-control') ?? ''
        if (response.ok && response.headers.get('content-type')?.includes('text/html') && !cacheControl.includes('no-store')) {
          event.waitUntil(
            caches.open(CACHE_NAME)
              .then(cache => cache.put(request, response.clone()))
              .catch(() => {}),
          )
        }
        return response
      }
      catch {
        const cache = await caches.open(CACHE_NAME)
        const cachedPage = await cache.match(request)
        if (cachedPage)
          return cachedPage

        const language = request.headers.get('accept-language')?.toLowerCase().startsWith('en') ? OFFLINE_EN : OFFLINE_ZH
        return await cache.match(language) ?? Response.error()
      }
    })())
    return
  }

  const isStaticAsset = url.pathname.startsWith('/_next/static/')
    || url.pathname.startsWith('/pwa/')
    || url.pathname.startsWith('/images/')
    || url.pathname === '/icon.png'
    || url.pathname === '/apple-icon.png'

  if (!isStaticAsset)
    return

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME)
    const cached = await cache.match(request)
    if (cached)
      return cached

    const response = await fetch(request)
    if (response.ok)
      event.waitUntil(cache.put(request, response.clone()).catch(() => {}))
    return response
  })())
})
