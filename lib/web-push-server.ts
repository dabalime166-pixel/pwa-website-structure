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
    process.env.VAPID_SUBJECT || 'mailto:admin@1weapp.online',
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

export async function sendPushToSubscriptions(
  subscriptions: Array<{ endpoint: string; p256dh: string; auth: string }>,
  payload: PushPayload,
) {
  const webpushClient = configureWebPush()
  let sent = 0
  let failed = 0
  const removed: string[] = []

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await webpushClient.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          JSON.stringify(payload),
          { TTL: 60 * 60 * 12, urgency: 'normal' },
        )
        sent += 1
      } catch (err: unknown) {
        failed += 1
        const statusCode =
          err && typeof err === 'object' && 'statusCode' in err
            ? Number((err as { statusCode: number }).statusCode)
            : 0
        if (statusCode === 404 || statusCode === 410) {
          removed.push(sub.endpoint)
        }
      }
    }),
  )

  return { sent, failed, removed, total: subscriptions.length }
}
