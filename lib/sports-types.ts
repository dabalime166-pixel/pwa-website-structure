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

export type SportScoreStandingRow = {
  pos: number
  team: string
  team_logo: string
  team_slug: string
  team_url: string
  p: number
  w: number
  d: number
  l: number
  gf: number
  ga: number
  gd: number
  pts: number
  promo_color?: string
  promo_name?: string
}

export type SportScoreStandingTable = {
  group?: string | null
  rows: SportScoreStandingRow[]
}

export type SportScoreStandingsResponse = {
  sport: string
  competition: string
  competition_logo?: string
  competition_slug: string
  tables: SportScoreStandingTable[]
  updated?: string
}

export type MatchHero = {
  name: string
  side: 'home' | 'away'
  goals: number
  assists: number
  rating: number | null
  reason: string
}

export function matchSlugFromUrl(url: string): string {
  const m = String(url || '').match(/\/match\/([^/]+)\/?/)
  return m?.[1] || ''
}

export function teamSlugFromName(name: string): string {
  return String(name || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function playerSlugFromName(name: string): string {
  return teamSlugFromName(name)
}

export function isLiveStatus(status: string): boolean {
  return String(status || '').toLowerCase() === 'live'
}

export function isFinishedStatus(status: string): boolean {
  return String(status || '').toLowerCase() === 'finished'
}

export function isGoalIncident(ev: SportScoreIncident): boolean {
  if (ev.is_goal) return true
  return /goal|гол/i.test(String(ev.type || ''))
}

/** Pick match hero from ratings and/or goal involvement */
export function pickMatchHero(
  match: SportScoreMatch,
  lang: 'en' | 'ru' = 'en',
): MatchHero | null {
  const events = match.incidents || []
  const goals = new Map<string, { goals: number; assists: number; side: 'home' | 'away' }>()

  for (const ev of events) {
    if (!isGoalIncident(ev)) continue
    const side = ev.side === 'away' ? 'away' : 'home'
    if (ev.player) {
      const cur = goals.get(ev.player) || { goals: 0, assists: 0, side }
      cur.goals += 1
      cur.side = side
      goals.set(ev.player, cur)
    }
    if (ev.assist) {
      const cur = goals.get(ev.assist) || { goals: 0, assists: 0, side }
      cur.assists += 1
      cur.side = side
      goals.set(ev.assist, cur)
    }
  }

  const lineupPlayers: { p: SportScorePlayer; side: 'home' | 'away' }[] = []
  const lu = match.lineups
  if (lu) {
    for (const p of lu.home_xi || []) lineupPlayers.push({ p, side: 'home' })
    for (const p of lu.away_xi || []) lineupPlayers.push({ p, side: 'away' })
  }

  let bestRated: MatchHero | null = null
  for (const { p, side } of lineupPlayers) {
    const rating = Number.parseFloat(String(p.rating || ''))
    if (!Number.isFinite(rating) || rating <= 0) continue
    if (!bestRated || (bestRated.rating || 0) < rating) {
      const inv = goals.get(p.name)
      bestRated = {
        name: p.name,
        side,
        goals: inv?.goals || 0,
        assists: inv?.assists || 0,
        rating,
        reason: lang === 'ru' ? `Лучший рейтинг ${rating.toFixed(1)}` : `Top rating ${rating.toFixed(1)}`,
      }
    }
  }
  if (bestRated) return bestRated

  let bestInvolved: MatchHero | null = null
  for (const [name, inv] of goals.entries()) {
    const score = inv.goals * 3 + inv.assists
    const prev = bestInvolved ? bestInvolved.goals * 3 + bestInvolved.assists : -1
    if (score > prev) {
      bestInvolved = {
        name,
        side: inv.side,
        goals: inv.goals,
        assists: inv.assists,
        rating: null,
        reason:
          lang === 'ru'
            ? `Г+П: ${inv.goals}+${inv.assists}`
            : `G+A: ${inv.goals}+${inv.assists}`,
      }
    }
  }
  return bestInvolved
}

export function summarizeTeamForm(matches: SportScoreMatch[], teamName: string): string {
  const finished = matches.filter((m) => isFinishedStatus(m.status)).slice(0, 5)
  return finished
    .map((m) => {
      const home = m.home === teamName
      const hs = Number(m.home_score)
      const as = Number(m.away_score)
      if (!Number.isFinite(hs) || !Number.isFinite(as)) return '—'
      if (hs === as) return 'D'
      if (home) return hs > as ? 'W' : 'L'
      return as > hs ? 'W' : 'L'
    })
    .join('')
}
