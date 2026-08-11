import 'server-only'

import type {
  SportScoreMatch,
  SportScoreStandingsResponse,
  SportScoreTeam,
} from '@/lib/sports-types'
import { matchSlugFromUrl, teamSlugFromName } from '@/lib/sports-types'

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
    // Next 16 defaults fetch to uncached; force-cache + revalidate enables ISR data cache.
    cache: 'force-cache',
    next: { revalidate },
  })

  if (!res.ok) {
    throw new Error(`SportScore ${path} failed: HTTP ${res.status}`)
  }

  return (await res.json()) as T
}

/** Segment / fetch cache windows — 24h to protect Vercel ISR limits. */
export const SPORTS_MATCHES_REVALIDATE = 86400
export const SPORTS_MATCH_REVALIDATE = 86400
export const SPORTS_TEAM_REVALIDATE = 86400
export const SPORTS_STANDINGS_REVALIDATE = 86400

export async function getFootballMatches(limit = 40) {
  return sportscoreGet<SportScoreMatchesResponse>('/api/widget/matches/', {
    searchParams: { sport: 'football', limit },
    revalidate: SPORTS_MATCHES_REVALIDATE,
  })
}

export async function getFootballMatch(slug: string) {
  return sportscoreGet<SportScoreMatchResponse>('/api/widget/match/', {
    searchParams: { sport: 'football', slug },
    revalidate: SPORTS_MATCH_REVALIDATE,
  })
}

export async function getFootballTeam(slug: string, limit = 12) {
  return sportscoreGet<SportScoreTeamResponse>('/api/widget/team/', {
    searchParams: { sport: 'football', slug, limit },
    revalidate: SPORTS_TEAM_REVALIDATE,
  })
}

export async function getFootballStandings(slug: string) {
  return sportscoreGet<SportScoreStandingsResponse>('/api/widget/standings/', {
    searchParams: { sport: 'football', slug },
    revalidate: SPORTS_STANDINGS_REVALIDATE,
  })
}

/**
 * Build-time / on-demand ISR seeds for match & team detail routes.
 * Without generateStaticParams, Next marks these as ƒ Dynamic and ignores
 * `export const revalidate` — every hit becomes a function invocation.
 */
export async function listFootballMatchStaticParams(): Promise<{ slug: string }[]> {
  try {
    const data = await getFootballMatches(80)
    const seen = new Set<string>()
    const out: { slug: string }[] = []
    for (const match of data.matches || []) {
      const slug = matchSlugFromUrl(match.url)
      if (!slug || seen.has(slug)) continue
      seen.add(slug)
      out.push({ slug })
    }
    return out
  } catch {
    return []
  }
}

export async function listFootballTeamStaticParams(): Promise<{ slug: string }[]> {
  try {
    const data = await getFootballMatches(80)
    const seen = new Set<string>()
    const out: { slug: string }[] = []
    for (const match of data.matches || []) {
      for (const name of [match.home, match.away]) {
        const slug = teamSlugFromName(name)
        if (!slug || seen.has(slug)) continue
        seen.add(slug)
        out.push({ slug })
      }
    }
    return out
  } catch {
    return []
  }
}
