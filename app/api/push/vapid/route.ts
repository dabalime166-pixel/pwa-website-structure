import { NextResponse } from 'next/server'
import { getVapidPublicKey } from '@/lib/web-push-server'

export const runtime = 'nodejs'

export async function GET() {
  const publicKey = getVapidPublicKey()
  if (!publicKey) {
    return NextResponse.json({ error: 'VAPID public key not configured' }, { status: 503 })
  }
  return NextResponse.json({ publicKey })
}
