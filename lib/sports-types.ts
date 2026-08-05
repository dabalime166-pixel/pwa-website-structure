export type SportScoreMatch = {
  home: string
  away: string
  home_logo: string
  away_logo: string
  home_score: string | null
  away_score: string | null
  status: string
  status_text: string
  time: string
  competition: string
  competition_logo: string
  url: string
  live_minute?: number | null
  home_ht_score?: string | null
  away_ht_score?: string | null
  incidents?: SportScoreIncident[]
  stats?: SportScoreStat[] | Record<string, unknown>
  lineups?: SportScoreLineups | null
  tracker?: Record<string, unknown> | null
}

export type SportScoreIncident = {
  time: number | null
  type: string
  type_id?: number
  side?: 'home' | 'away' | string
  player?: string | null
  assist?: string | null
  is_card?: boolean
  is_goal?: boolean
}

export type SportScorePlayer = {
  name: string
  number: number | null
  position: string | null
  captain?: boolean
  rating?: string | null
}

export type SportScoreLineups = {
  home_formation?: string | null
  away_formation?: string | null
  home_coach?: string | null
  away_coach?: string | null
  confirmed?: boolean
  home_xi?: SportScorePlayer[]
  home_subs?: SportScorePlayer[]
  away_xi?: SportScorePlayer[]
  away_subs?: SportScorePlayer[]
}

export type SportScoreStat = {
  type?: string
  name?: string
  home?: string | number | null
  away?: string | number | null
}

export type SportScoreTeam = {
  name: string
  logo: string
  slug: string
  url: string
}

export function matchSlugFromUrl(url: string): string {
  const m = String(url || '').match(/\/match\/([^/]+)\/?/)
  return m?.[1] || ''
}

export function isLiveStatus(status: string): boolean {
  return String(status || '').toLowerCase() === 'live'
}

export function isFinishedStatus(status: string): boolean {
  return String(status || '').toLowerCase() === 'finished'
}
