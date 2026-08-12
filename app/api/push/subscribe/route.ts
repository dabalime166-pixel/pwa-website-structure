import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type Body = {
  endpoint?: string
  keys?: { p256dh?: string; auth?: string }
  lang?: string
  gameSlug?: string
}

/** Accepts push subscriptions when a backend is configured; otherwise no-ops successfully. */
export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: true, persisted: false })
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

    // Persistence hook — wire DATABASE_URL + lib/db when ready.
    return NextResponse.json({ ok: true, persisted: false })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Subscribe failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
