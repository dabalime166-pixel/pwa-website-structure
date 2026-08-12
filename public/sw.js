/* CrashGames Demo — Web Push service worker */
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  let data = {
    title: 'CrashGames Demo',
    body: 'Новое уведомление',
    url: '/',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    image: undefined,
    tag: 'crashgames',
  }

  try {
    if (event.data) {
      data = { ...data, ...event.data.json() }
    }
  } catch {
    try {
      const text = event.data?.text()
      if (text) data.body = text
    } catch {
      /* keep defaults */
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icon-192.png',
    badge: data.badge || '/icon-192.png',
    image: data.image,
    tag: data.tag || 'crashgames',
    renotify: true,
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Открыть' },
      { action: 'close', title: 'Закрыть' },
    ],
  }

  event.waitUntil(self.registration.showNotification(data.title || 'CrashGames Demo', options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  if (event.action === 'close') return

  const targetUrl = (event.notification.data && event.notification.data.url) || '/'
  const absolute = new URL(targetUrl, self.location.origin).href

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client && client.url.startsWith(self.location.origin)) {
          client.navigate(absolute)
          return client.focus()
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(absolute)
      }
    }),
  )
})
