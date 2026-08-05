import 'server-only'

import type {
  SportScoreMatch,
  SportScoreStandingsResponse,
  SportScoreTeam,
} from '@/lib/sports-types'

const BASE = 'https://sportscore.com'
/** Attribution / source tag required by SportScore free API */
const SRC = '1weapp.online'
const UA = '1weapp-sports/1.0 (+https://www.1weapp.online; powered-by-sportscore)'

export type SportScoreMatchesResponse = {
  sport: string
  count: number
  matches: SportScoreMatch[]
  updated?: string
}

export type SportScoreMatchResponse = {
  sport: string
  match: SportScoreMatch
  updated?: string
}

export type SportScoreTeamResponse = {
  sport: string
  team: SportScoreTeam
  count?: number
  matches?: SportScoreMatch[]
  updated?: string
}

type FetchOpts = {
  revalidate?: number
  searchParams?: Record<string, string | number | undefined | null>
}

async function sportscoreGet<T>(path: string, { revalidate = 30, searchParams }: FetchOpts = {}): Promise<T> {
  const url = new URL(path, BASE)
  url.searchParams.set('src', SRC)
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      if (v === undefined || v === null || v === '') continue
      url.searchParams.set(k, String(v))
    }
  }

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': UA,
    },
    next: { revalidate },
  })

  if (!res.ok) {
    throw new Error(`SportScore ${path} failed: HTTP ${res.status}`)
  }

  return (await res.json()) as T
}

export async function getFootballMatches(limit = 40) {
  return sportscoreGet<SportScoreMatchesResponse>('/api/widget/matches/', {
    searchParams: { sport: 'football', limit },
    revalidate: 20,
  })
}

export async function getFootballMatch(slug: string) {
  return sportscoreGet<SportScoreMatchResponse>('/api/widget/match/', {
    searchParams: { sport: 'football', slug },
    revalidate: 20,
  })
}

export async function getFootballTeam(slug: string, limit = 12) {
  return sportscoreGet<SportScoreTeamResponse>('/api/widget/team/', {
    searchParams: { sport: 'football', slug, limit },
    revalidate: 300,
  })
}

export async function getFootballStandings(slug: string) {
  return sportscoreGet<SportScoreStandingsResponse>('/api/widget/standings/', {
    searchParams: { sport: 'football', slug },
    revalidate: 600,
  })
}
