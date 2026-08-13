import { NextResponse } from 'next/server'
import { authorizeAdminRequest } from '@/lib/web-push-server'
import { countSubscriptions } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let extraSecret: string | null = null
  try {
    const body = (await request.json()) as { secret?: string }
    extraSecret = body.secret ?? null
  } catch {
    extraSecret = null
  }

  const auth = authorizeAdminRequest(request, extraSecret)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const count = await countSubscriptions()
    return NextResponse.json({ ok: true, count })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to count'
    return NextResponse.json({ ok: true, count: 0, warning: message })
  }
}
