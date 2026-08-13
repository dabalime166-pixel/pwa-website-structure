import { timingSafeEqual } from 'crypto'
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

function normalizeSecret(value: string | null | undefined): string {
  if (!value) return ''
  let next = value.replace(/^\uFEFF/, '').trim()
  if (
    (next.startsWith('"') && next.endsWith('"')) ||
    (next.startsWith("'") && next.endsWith("'"))
  ) {
    next = next.slice(1, -1).trim()
  }
  if (next.toLowerCase().startsWith('bearer ')) {
    next = next.slice(7).trim()
  }
  return next
}

export function getConfiguredAdminSecret(): string {
  return normalizeSecret(process.env.ADMIN_PUSH_SECRET)
}

export function secretsMatch(provided: string | null | undefined, expected: string): boolean {
  const a = normalizeSecret(provided)
  const b = expected
  if (!a || !b || a.length !== b.length) return false
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export type AdminAuthResult =
  | { ok: true }
  | { ok: false; status: 401 | 503; error: string }

export function assertAdminSecret(headerValue: string | null): boolean {
  const secret = getConfiguredAdminSecret()
  if (!secret) return false
  return secretsMatch(headerValue, secret)
}

export function authorizeAdminRequest(
  request: Request,
  extraSecret?: string | null,
): AdminAuthResult {
  const expected = getConfiguredAdminSecret()
  if (!expected) {
    return {
      ok: false,
      status: 503,
      error: 'ADMIN_PUSH_SECRET is not set on the server. Add it in Vercel env and redeploy.',
    }
  }

  const candidates = [
    extraSecret,
    request.headers.get('x-admin-secret'),
    request.headers.get('authorization'),
  ]

  if (candidates.some((value) => secretsMatch(value, expected))) {
    return { ok: true }
  }

  return { ok: false, status: 401, error: 'Unauthorized' }
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
