import { NextResponse } from 'next/server'
import { getFootballMatches } from '@/lib/sportscore'
import { isLiveStatus } from '@/lib/sports-types'

export const runtime = 'nodejs'
/** Cache the live feed — hub no longer polls; manual refresh busts with ?t= */
export const revalidate = 86400

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const wantAll = searchParams.get('all') === '1'
    const data = await getFootballMatches(wantAll ? 80 : 40)
    const all = data.matches || []
    const live = all.filter((m) => isLiveStatus(m.status))
    return NextResponse.json(
      {
        response: live,
        all: wantAll ? all : undefined,
        results: live.length,
        updated: data.updated,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
        },
      },
    )
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Sports API error', response: [], all: [] },
      { status: 502 },
    )
  }
}
