import { NextResponse } from 'next/server'
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  authorizeAdminRequest,
  getConfiguredAdminSecret,
  normalizeSecret,
} from '@/lib/admin-auth'
import { countSubscriptions } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const NO_STORE = { 'Cache-Control': 'no-store' }

async function readSecretFromRequest(request: Request): Promise<string | null> {
  const contentType = request.headers.get('content-type') || ''
  try {
    if (contentType.includes('application/json')) {
      const body = (await request.json()) as { secret?: string }
      return body.secret ?? null
    }
    if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const form = await request.formData()
      const value = form.get('secret')
      return typeof value === 'string' ? value : null
    }
    const text = await request.text()
    if (!text) return null
    try {
      const body = JSON.parse(text) as { secret?: string }
      return body.secret ?? null
    } catch {
      return text
    }
  } catch {
    return null
  }
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: NO_STORE })
}

function withAdminCookie(response: NextResponse, secret: string) {
  response.cookies.set(ADMIN_COOKIE_NAME, normalizeSecret(secret), adminCookieOptions(60 * 60 * 12))
  return response
}

function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE_NAME, '', { ...adminCookieOptions(0), expires: new Date(0) })
  return response
}

export async function GET() {
  const configured = Boolean(getConfiguredAdminSecret())
  return json({
    configured,
    error: configured
      ? undefined
      : 'ADMIN_PUSH_SECRET is not set on the server. Add it in Vercel env and redeploy.',
    code: configured ? undefined : 'missing_admin_secret',
  })
}

export async function POST(request: Request) {
  const extraSecret = await readSecretFromRequest(request)
  const auth = authorizeAdminRequest(request, extraSecret)
  if (!auth.ok) {
    return clearAdminCookie(json({ error: auth.error, code: auth.code }, auth.status))
  }

  const cookieSecret = normalizeSecret(extraSecret) || normalizeSecret(request.headers.get('x-admin-secret'))

  try {
    const count = await countSubscriptions()
    const response = json({ ok: true, count })
    if (cookieSecret) withAdminCookie(response, cookieSecret)
    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to count'
    const response = json({ ok: true, count: 0, warning: message })
    if (cookieSecret) withAdminCookie(response, cookieSecret)
    return response
  }
}

export async function DELETE() {
  return clearAdminCookie(json({ ok: true }))
}
