import { NextResponse } from 'next/server'
import { getLiveFixtures } from '@/lib/api-sports'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    if (!process.env.APISPORTS_KEY?.trim()) {
      return NextResponse.json({ error: 'APISPORTS_KEY missing', response: [] }, { status: 503 })
    }
    const data = await getLiveFixtures()
    return NextResponse.json(
      { response: data.response || [], results: data.results || 0 },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30',
        },
      },
    )
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Sports API error', response: [] },
      { status: 502 },
    )
  }
}
