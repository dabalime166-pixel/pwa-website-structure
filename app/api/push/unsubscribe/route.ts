import { NextResponse } from 'next/server'
import { deleteSubscription } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: true })
  }

  try {
    const body = (await request.json()) as { endpoint?: string }
    const endpoint = body.endpoint?.trim()
    if (!endpoint) {
      return NextResponse.json({ error: 'endpoint is required' }, { status: 400 })
    }
    await deleteSubscription(endpoint)
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unsubscribe failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
