import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type Body = {
  endpoint?: string
  keys?: { p256dh?: string; auth?: string }
  lang?: string
  gameSlug?: string
}

/**
 * Saves push subscriptions only when persistence is explicitly enabled.
 * Without DATABASE_URL + NEXT_PUBLIC_PUSH_PERSIST_SUBSCRIPTIONS=true on the client,
 * the client never calls this route.
 */
export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_PUSH_PERSIST_SUBSCRIPTIONS !== 'true') {
    return NextResponse.json({ ok: true, persisted: false, reason: 'persistence_disabled' })
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: true, persisted: false, reason: 'no_database' })
  }

  try {
    const body = (await request.json()) as Body
    const endpoint = body.endpoint?.trim()
    const p256dh = body.keys?.p256dh?.trim()
    const auth = body.keys?.auth?.trim()

    if (!endpoint || !p256dh || !auth) {
      return NextResponse.json(
        { error: 'endpoint, keys.p256dh and keys.auth are required' },
        { status: 400 },
      )
    }

    // Wire lib/db upsert here when DATABASE_URL is configured.
    return NextResponse.json({ ok: true, persisted: false, reason: 'db_not_wired' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Subscribe failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
