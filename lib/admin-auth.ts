import { timingSafeEqual } from 'crypto'

export const ADMIN_COOKIE_NAME = '1weapp_admin'

export type AdminAuthResult =
  | { ok: true }
  | { ok: false; status: 401 | 503; error: string; code: 'missing_admin_secret' | 'unauthorized' }

export function normalizeSecret(value: string | null | undefined): string {
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

export function secretFromCookieHeader(cookieHeader: string | null | undefined): string | null {
  if (!cookieHeader) return null
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    const key = part.slice(0, idx).trim()
    if (key !== ADMIN_COOKIE_NAME) continue
    const value = part.slice(idx + 1).trim()
    try {
      return decodeURIComponent(value)
    } catch {
      return value
    }
  }
  return null
}

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
      code: 'missing_admin_secret',
      error: 'ADMIN_PUSH_SECRET is not set on the server. Add it in Vercel env and redeploy.',
    }
  }

  const candidates = [
    extraSecret,
    request.headers.get('x-admin-secret'),
    request.headers.get('authorization'),
    secretFromCookieHeader(request.headers.get('cookie')),
  ]

  if (candidates.some((value) => secretsMatch(value, expected))) {
    return { ok: true }
  }

  return { ok: false, status: 401, code: 'unauthorized', error: 'Unauthorized' }
}

export function adminCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  }
}
