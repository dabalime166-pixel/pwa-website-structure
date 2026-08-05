import 'server-only'

import type { FixtureItem, TeamProfile } from '@/lib/sports-types'

export type {
  FixtureEvent,
  FixtureItem,
  FixtureLineup,
  FixtureTeam,
  FixtureTeamStats,
  TeamProfile,
} from '@/lib/sports-types'

export { isFinishedStatus, isLiveStatus, utcDateString } from '@/lib/sports-types'

const BASE = 'https://v3.football.api-sports.io'

export type ApiSportsEnvelope<T> = {
  get?: string
  parameters?: Record<string, string>
  errors?: Record<string, string> | string[]
  results?: number
  paging?: { current: number; total: number }
  response: T
}

function getApiKey(): string {
  const key = process.env.APISPORTS_KEY?.trim()
  if (!key) {
    throw new Error('APISPORTS_KEY is not set')
  }
  return key
}

type FetchOpts = {
  revalidate?: number
  searchParams?: Record<string, string | number | undefined | null>
}

export async function apiSportsGet<T>(
  path: string,
  { revalidate = 60, searchParams }: FetchOpts = {},
): Promise<ApiSportsEnvelope<T>> {
  const url = new URL(path.replace(/^\//, ''), `${BASE}/`)
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      if (v === undefined || v === null || v === '') continue
      url.searchParams.set(k, String(v))
    }
  }

  const res = await fetch(url, {
    headers: {
      'x-apisports-key': getApiKey(),
      Accept: 'application/json',
    },
    next: { revalidate },
  })

  if (!res.ok) {
    throw new Error(`API-Sports ${path} failed: HTTP ${res.status}`)
  }

  const data = (await res.json()) as ApiSportsEnvelope<T>
  const errors = data.errors
  if (
    errors &&
    ((Array.isArray(errors) && errors.length) ||
      (!Array.isArray(errors) && Object.keys(errors).length))
  ) {
    throw new Error(`API-Sports ${path} errors: ${JSON.stringify(errors)}`)
  }
  return data
}

export async function getLiveFixtures() {
  return apiSportsGet<FixtureItem[]>('fixtures', {
    searchParams: { live: 'all' },
    revalidate: 20,
  })
}

export async function getFixturesByDate(date: string) {
  return apiSportsGet<FixtureItem[]>('fixtures', {
    searchParams: { date },
    revalidate: 90,
  })
}

export async function getFixtureById(id: number | string) {
  return apiSportsGet<FixtureItem[]>('fixtures', {
    searchParams: { id },
    revalidate: 30,
  })
}

export async function getTeamById(id: number | string) {
  return apiSportsGet<TeamProfile[]>('teams', {
    searchParams: { id },
    revalidate: 3600,
  })
}
