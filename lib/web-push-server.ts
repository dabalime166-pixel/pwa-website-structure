import webpush from 'web-push'

export type PushPayload = {
  title: string
  body: string
  url?: string
  icon?: string
  badge?: string
  image?: string
  tag?: string
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not configured`)
  return value
}

export function configureWebPush() {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@crashgames.demo',
    requireEnv('NEXT_PUBLIC_VAPID_PUBLIC_KEY'),
    requireEnv('VAPID_PRIVATE_KEY'),
  )
  return webpush
}

export function getVapidPublicKey(): string | null {
  return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || null
}

export function assertAdminSecret(headerValue: string | null): boolean {
  const secret = process.env.ADMIN_PUSH_SECRET
  if (!secret) return false
  return headerValue === secret || headerValue === `Bearer ${secret}`
}
