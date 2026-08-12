'use client'

export function isIosDevice(): boolean {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua)
  // iPadOS 13+ reports as MacIntel with touch
  const iPadOs =
    ua.includes('Mac') && 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 1
  return iOS || iPadOs
}

/** True when opened from Home Screen icon (standalone PWA). */
export function isStandalonePwa(): boolean {
  if (typeof window === 'undefined') return false
  const nav = window.navigator as Navigator & { standalone?: boolean }
  if (nav.standalone === true) return true
  return window.matchMedia('(display-mode: standalone)').matches
}

/**
 * iOS Safari in browser tab: push is unavailable until the site is
 * installed to Home Screen. In that case we should show the A2HS guide.
 */
export function needsIosHomeScreenInstall(): boolean {
  return isIosDevice() && !isStandalonePwa()
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  const output = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i)
  }
  return output
}

export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  )
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return null
  try {
    return await navigator.serviceWorker.register('/sw.js', { scope: '/' })
  } catch {
    return null
  }
}

export type SubscribeResult =
  | { status: 'subscribed' }
  | { status: 'denied' }
  | { status: 'unsupported' }
  | { status: 'needs_ios_install' }
  | { status: 'skipped' }
  | { status: 'error'; message: string }

/**
 * Ask for notification permission and save the Web Push subscription.
 * On iPhone Safari (not installed to Home Screen) returns needs_ios_install
 * so the UI can show the Add to Home Screen guide.
 */
export async function requestPushAndSubscribe(opts?: {
  lang?: string
  gameSlug?: string
}): Promise<SubscribeResult> {
  if (needsIosHomeScreenInstall()) {
    return { status: 'needs_ios_install' }
  }

  if (!isPushSupported()) return { status: 'unsupported' }

  try {
    const registration = await registerServiceWorker()
    if (!registration) return { status: 'unsupported' }

    await navigator.serviceWorker.ready

    let permission = Notification.permission
    if (permission === 'default') {
      permission = await Notification.requestPermission()
    }
    if (permission !== 'granted') {
      return { status: 'denied' }
    }

    const vapidRes = await fetch('/api/push/vapid')
    if (!vapidRes.ok) {
      return { status: 'error', message: 'VAPID key unavailable' }
    }
    const { publicKey } = (await vapidRes.json()) as { publicKey: string }

    let subscription = await registration.pushManager.getSubscription()
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
      })
    }

    const json = subscription.toJSON()
    const res = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: json.endpoint,
        keys: json.keys,
        lang: opts?.lang,
        gameSlug: opts?.gameSlug,
      }),
    })

    if (!res.ok) {
      const err = (await res.json().catch(() => null)) as { error?: string } | null
      return { status: 'error', message: err?.error || 'Failed to save subscription' }
    }

    return { status: 'subscribed' }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Subscribe failed',
    }
  }
}
