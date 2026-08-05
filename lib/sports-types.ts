export type FixtureTeam = {
  id: number
  name: string
  logo: string
  winner: boolean | null
}

export type FixtureItem = {
  fixture: {
    id: number
    referee: string | null
    timezone: string
    date: string
    timestamp: number
    periods: { first: number | null; second: number | null }
    venue: { id: number | null; name: string | null; city: string | null }
    status: {
      long: string
      short: string
      elapsed: number | null
      extra: number | null
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string | null
    season: number
    round: string
  }
  teams: {
    home: FixtureTeam
    away: FixtureTeam
  }
  goals: { home: number | null; away: number | null }
  score: {
    halftime: { home: number | null; away: number | null }
    fulltime: { home: number | null; away: number | null }
    extratime: { home: number | null; away: number | null }
    penalty: { home: number | null; away: number | null }
  }
  events?: FixtureEvent[]
  lineups?: FixtureLineup[]
  statistics?: FixtureTeamStats[]
  players?: unknown[]
}

export type FixtureEvent = {
  time: { elapsed: number | null; extra: number | null }
  team: { id: number; name: string; logo: string }
  player: { id: number | null; name: string | null }
  assist: { id: number | null; name: string | null }
  type: string
  detail: string
  comments: string | null
}

export type FixtureLineup = {
  team: { id: number; name: string; logo: string; colors?: unknown }
  formation: string | null
  startXI: { player: { id: number; name: string; number: number; pos: string; grid: string | null } }[]
  substitutes: { player: { id: number; name: string; number: number; pos: string; grid: string | null } }[]
  coach: { id: number | null; name: string | null; photo: string | null }
}

export type FixtureTeamStats = {
  team: { id: number; name: string; logo: string }
  statistics: { type: string; value: number | string | null }[]
}

export type TeamProfile = {
  team: {
    id: number
    name: string
    code: string | null
    country: string
    founded: number | null
    national: boolean
    logo: string
  }
  venue: {
    id: number | null
    name: string | null
    address: string | null
    city: string | null
    capacity: number | null
    surface: string | null
    image: string | null
  }
}

export function isLiveStatus(short: string): boolean {
  return ['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE', 'INT'].includes(short)
}

export function isFinishedStatus(short: string): boolean {
  return ['FT', 'AET', 'PEN'].includes(short)
}

/** UTC YYYY-MM-DD for API-Sports date filter */
export function utcDateString(d = new Date()): string {
  return d.toISOString().slice(0, 10)
}
