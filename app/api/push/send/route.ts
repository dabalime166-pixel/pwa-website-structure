import { NextResponse } from 'next/server'
import { countSubscriptions, deleteSubscription, listSubscriptions } from '@/lib/db'
import { authorizeAdminRequest, sendPushToSubscriptions, type PushPayload } from '@/lib/web-push-server'

export const runtime = 'nodejs'
export const maxDuration = 60

function absolutize(input: string | undefined, origin: string): string | undefined {
  if (!input) return undefined
  let value = input.trim()
  if (!value) return undefined
  if (value.startsWith('/workspace/public/')) {
    value = value.replace('/workspace/public', '')
  }
  try {
    return new URL(value, origin).toString()
  } catch {
    return undefined
  }
}

function looksLikeDirectImageUrl(url: string | undefined): boolean {
  if (!url) return false
  return /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(url)
}

export async function GET(request: Request) {
  const auth = authorizeAdminRequest(request)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
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
  const auth = authorizeAdminRequest(request)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const origin = new URL(request.url).origin
    const body = (await request.json()) as PushPayload
    const title = body.title?.trim()
    const text = body.body?.trim()

    if (!title || !text) {
      return NextResponse.json({ error: 'title and body are required' }, { status: 400 })
    }

    const imageUrl = absolutize(body.image, origin)
    const iconUrl = absolutize(body.icon, origin) || `${origin}/icon.svg`
    const badgeUrl = absolutize(body.badge, origin) || `${origin}/icon.svg`

    if (!iconUrl) {
      return NextResponse.json({ error: 'icon URL is invalid' }, { status: 400 })
    }
    if (imageUrl && !looksLikeDirectImageUrl(imageUrl)) {
      return NextResponse.json(
        {
          error:
            'image must be a direct file URL (png/jpg/webp/gif/avif), not a page link',
        },
        { status: 400 },
      )
    }

    const payload: PushPayload = {
      title,
      body: text,
      url: absolutize(body.url, origin) || origin,
      icon: iconUrl,
      badge: badgeUrl,
      image: imageUrl,
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
