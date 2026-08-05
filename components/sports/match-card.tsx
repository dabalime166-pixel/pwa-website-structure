import Link from 'next/link'
import type { Lang } from '@/lib/games'
import type { FixtureItem } from '@/lib/sports-types'
import { isLiveStatus } from '@/lib/sports-types'
import { tSports } from '@/lib/sports-i18n'

function scoreText(v: number | null | undefined) {
  return v === null || v === undefined ? '–' : String(v)
}

function formatKickoff(iso: string, lang: Lang) {
  try {
    return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function MatchCard({
  fixture,
  lang,
}: {
  fixture: FixtureItem
  lang: Lang
}) {
  const t = tSports(lang)
  const live = isLiveStatus(fixture.fixture.status.short)
  const href = lang === 'en' ? `/en/sports/match/${fixture.fixture.id}` : `/ru/sports/match/${fixture.fixture.id}`
  const elapsed = fixture.fixture.status.elapsed

  return (
    <Link href={href} className="sports-match-card">
      <div className="sports-match-card__meta">
        <span className="sports-match-card__league">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {fixture.league.logo ? <img src={fixture.league.logo} alt="" width={16} height={16} /> : null}
          {fixture.league.country ? `${fixture.league.country} · ` : ''}
          {fixture.league.name}
        </span>
        <span className={`sports-match-card__status${live ? ' is-live' : ''}`}>
          {live && elapsed != null ? `${fixture.fixture.status.short} ${elapsed}'` : fixture.fixture.status.short}
        </span>
      </div>

      <div className="sports-match-card__row">
        <div className="sports-match-card__team">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fixture.teams.home.logo} alt="" width={28} height={28} />
          <span>{fixture.teams.home.name}</span>
        </div>
        <div className="sports-match-card__score" aria-label={`${t.home} ${scoreText(fixture.goals.home)} ${t.away} ${scoreText(fixture.goals.away)}`}>
          <strong>{scoreText(fixture.goals.home)}</strong>
          <span>:</span>
          <strong>{scoreText(fixture.goals.away)}</strong>
        </div>
        <div className="sports-match-card__team sports-match-card__team--away">
          <span>{fixture.teams.away.name}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fixture.teams.away.logo} alt="" width={28} height={28} />
        </div>
      </div>

      <div className="sports-match-card__foot">
        <span>{formatKickoff(fixture.fixture.date, lang)}</span>
        {fixture.league.round ? <span>{fixture.league.round}</span> : null}
      </div>
    </Link>
  )
}
