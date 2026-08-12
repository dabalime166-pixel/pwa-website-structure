import { NextResponse } from 'next/server'
import { countSubscriptions, deleteSubscription, listSubscriptions } from '@/lib/db'
import { assertAdminSecret, sendPushToSubscriptions, type PushPayload } from '@/lib/web-push-server'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function GET(request: Request) {
  if (!assertAdminSecret(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const count = await countSubscriptions()
    return NextResponse.json({ count })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to count'
    return NextResponse.json({ error: message }, { status: 503 })
  }
}

export async function POST(request: Request) {
  if (!assertAdminSecret(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await request.json()) as PushPayload
    const title = body.title?.trim()
    const text = body.body?.trim()

    if (!title || !text) {
      return NextResponse.json({ error: 'title and body are required' }, { status: 400 })
    }

    const payload: PushPayload = {
      title,
      body: text,
      url: body.url?.trim() || '/',
      icon: body.icon?.trim() || '/icon-192.png',
      badge: body.badge?.trim() || '/icon-192.png',
      image: body.image?.trim() || undefined,
      tag: body.tag?.trim() || '1weapp-broadcast',
    }

    const subscriptions = await listSubscriptions()
    const result = await sendPushToSubscriptions(subscriptions, payload)

    for (const endpoint of result.removed) {
      await deleteSubscription(endpoint)
    }

    return NextResponse.json({
      ok: true,
      total: result.total,
      sent: result.sent,
      failed: result.failed,
      removed: result.removed.length,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Send failed'
    const status = message.includes('DATABASE_URL') || message.includes('VAPID') ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
