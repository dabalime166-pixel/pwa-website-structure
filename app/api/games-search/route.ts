import { NextResponse } from 'next/server'
import { games, type Game } from '@/lib/games'

export const runtime = 'nodejs'
export const revalidate = 86400

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9а-яё\s-]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function matches(game: Game, q: string) {
  const hay = normalize(`${game.name} ${game.provider} ${game.slug} ${game.gameType || ''}`)
  const tokens = normalize(q).split(' ').filter(Boolean)
  if (!tokens.length) return true
  return tokens.every((t) => hay.includes(t))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') || '').trim()
  const limit = Math.min(36, Math.max(1, Number(searchParams.get('limit') || 24) || 24))

  if (q.length < 2) {
    return NextResponse.json(
      { games: [] as Game[], count: 0 },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600',
        },
      },
    )
  }

  const hits = games.filter((g) => matches(g, q)).slice(0, limit)

  return NextResponse.json(
    { games: hits, count: hits.length },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  )
}
