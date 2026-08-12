import { NextResponse } from 'next/server'
import { countSubscriptions, deleteSubscription, listSubscriptions } from '@/lib/db'
import { assertAdminSecret, configureWebPush, type PushPayload } from '@/lib/web-push-server'

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
      tag: body.tag?.trim() || 'crashgames-broadcast',
    }

    const webpush = configureWebPush()
    const subscriptions = await listSubscriptions()

    let sent = 0
    let failed = 0
    const removed: string[] = []

    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
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
          // Gone / expired subscription
          if (statusCode === 404 || statusCode === 410) {
            await deleteSubscription(sub.endpoint)
            removed.push(sub.endpoint)
          }
        }
      }),
    )

    return NextResponse.json({
      ok: true,
      total: subscriptions.length,
      sent,
      failed,
      removed: removed.length,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Send failed'
    const status = message.includes('DATABASE_URL') || message.includes('VAPID') ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
