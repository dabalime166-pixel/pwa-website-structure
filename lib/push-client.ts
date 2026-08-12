'use client'

import { needsIosHomeScreenInstall } from '@/lib/device-profile'

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

export function canAskNotificationPermission(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return null
  try {
    return await navigator.serviceWorker.register('/sw.js', { scope: '/' })
  } catch {
    return null
  }
}

export type PermissionResult =
  | { status: 'granted' }
  | { status: 'denied' }
  | { status: 'unsupported' }
  | { status: 'needs_ios_install' }

const DISMISS_KEY = '1weapp-notify-dismissed'

export function wasNotifyPromptDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

export function markNotifyPromptDismissed(): void {
  try {
    sessionStorage.setItem(DISMISS_KEY, '1')
  } catch {
    /* private mode */
  }
}

export function shouldShowNotifyPrompt(): boolean {
  if (!canAskNotificationPermission()) return false
  if (Notification.permission !== 'default') return false
  if (wasNotifyPromptDismissed()) return false
  if (needsIosHomeScreenInstall()) return true
  return true
}

/**
 * Runs inside a user gesture (button click). Requests browser permission and,
 * when push infra is available, registers a subscription in the background.
 */
export async function requestNotificationPermission(opts?: {
  lang?: string
  gameSlug?: string
}): Promise<PermissionResult> {
  if (needsIosHomeScreenInstall()) {
    return { status: 'needs_ios_install' }
  }

  if (!canAskNotificationPermission()) {
    return { status: 'unsupported' }
  }

  try {
    if (isPushSupported()) {
      await registerServiceWorker()
    }

    let permission = Notification.permission
    if (permission === 'default') {
      permission = await Notification.requestPermission()
    }

    if (permission !== 'granted') {
      return { status: 'denied' }
    }

    if (isPushSupported()) {
      void subscribeInBackground(opts)
    }

    return { status: 'granted' }
  } catch {
    return { status: 'denied' }
  }
}

async function subscribeInBackground(opts?: { lang?: string; gameSlug?: string }) {
  try {
    const registration = await navigator.serviceWorker.ready
    const vapidRes = await fetch('/api/push/vapid')
    if (!vapidRes.ok) return

    const { publicKey } = (await vapidRes.json()) as { publicKey: string }
    if (!publicKey) return

    let subscription = await registration.pushManager.getSubscription()
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
      })
    }

    const json = subscription.toJSON()
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: json.endpoint,
        keys: json.keys,
        lang: opts?.lang,
        gameSlug: opts?.gameSlug,
      }),
    })
  } catch {
    /* permission already granted — subscription is optional */
  }
}
