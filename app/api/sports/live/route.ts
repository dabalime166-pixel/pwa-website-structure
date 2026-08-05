import { NextResponse } from 'next/server'
import { getFootballMatches } from '@/lib/sportscore'
import { isLiveStatus } from '@/lib/sports-types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getFootballMatches(40)
    const live = (data.matches || []).filter((m) => isLiveStatus(m.status))
    return NextResponse.json(
      { response: live, results: live.length, updated: data.updated },
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
