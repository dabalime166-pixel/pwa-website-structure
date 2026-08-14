'use client'

export type NotifyUiVariant = 'desktop' | 'mobile' | 'ios-browser' | 'ios-pwa'

export function isIosDevice(): boolean {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua)
  const iPadOs =
    ua.includes('Mac') && 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 1
  return iOS || iPadOs
}

export function isAndroidDevice(): boolean {
  if (typeof window === 'undefined') return false
  return /Android/i.test(window.navigator.userAgent)
}

/** True when opened from Home Screen icon (standalone PWA). */
export function isStandalonePwa(): boolean {
  if (typeof window === 'undefined') return false
  const nav = window.navigator as Navigator & { standalone?: boolean }
  if (nav.standalone === true) return true
  return window.matchMedia('(display-mode: standalone)').matches
}

export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

export function isNarrowViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches
}

/** iOS Safari in a tab cannot use Web Push until Add to Home Screen. */
export function needsIosHomeScreenInstall(): boolean {
  return isIosDevice() && !isStandalonePwa()
}

export function getNotifyUiVariant(): NotifyUiVariant {
  if (needsIosHomeScreenInstall()) return 'ios-browser'
  if (isIosDevice() && isStandalonePwa()) return 'ios-pwa'
  if (isCoarsePointer() || isNarrowViewport()) return 'mobile'
  return 'desktop'
}
