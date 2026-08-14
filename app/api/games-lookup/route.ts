import { NextResponse } from 'next/server'
import { getGame } from '@/lib/games'

/** Resolve a small set of game cards by slug — for recent/favorites without shipping the full catalog. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const raw = searchParams.get('slugs') || ''
  const slugs = [...new Set(raw.split(',').map((s) => s.trim()).filter(Boolean))].slice(0, 24)

  const games = slugs
    .map((slug) => getGame(slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g))
    .map((g) => ({
      slug: g.slug,
      name: g.name,
      provider: g.provider,
      avatar: g.avatar,
      rtp: g.rtp,
      gameType: g.gameType,
      externalUrl: g.externalUrl,
    }))

  return NextResponse.json(
    { games },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
      },
    },
  )
}
