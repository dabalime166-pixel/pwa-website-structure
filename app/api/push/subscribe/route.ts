import { NextResponse } from 'next/server'
import { upsertSubscription } from '@/lib/db'

export const runtime = 'nodejs'

type Body = {
  endpoint?: string
  keys?: { p256dh?: string; auth?: string }
  lang?: string
  gameSlug?: string
}

export async function POST(request: Request) {
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

    await upsertSubscription({
      endpoint,
      p256dh,
      auth,
      userAgent: request.headers.get('user-agent'),
      lang: body.lang ?? null,
      gameSlug: body.gameSlug ?? null,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Subscribe failed'
    const status = message.includes('DATABASE_URL') ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
