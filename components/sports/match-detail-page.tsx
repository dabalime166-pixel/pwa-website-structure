import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import type { Lang } from '@/lib/games'
import {
  getFixtureById,
  getTeamById,
  isLiveStatus,
  type FixtureEvent,
  type FixtureItem,
  type TeamProfile,
} from '@/lib/api-sports'
import { tSports } from '@/lib/sports-i18n'

function scoreText(v: number | null | undefined) {
  return v === null || v === undefined ? '–' : String(v)
}

function eventLabel(ev: FixtureEvent, lang: Lang) {
  const min = ev.time.elapsed != null ? `${ev.time.elapsed}'` : '—'
  const extra = ev.time.extra != null ? `+${ev.time.extra}` : ''
  const who = ev.player?.name || '—'
  const assist = ev.assist?.name ? ` (${ev.assist.name})` : ''
  if (lang === 'ru') {
    return `${min}${extra} · ${ev.detail} — ${who}${assist}`
  }
  return `${min}${extra} · ${ev.detail} — ${who}${assist}`
}

function TeamCard({
  profile,
  lang,
  side,
}: {
  profile: TeamProfile | null
  lang: Lang
  side: 'home' | 'away'
}) {
  const t = tSports(lang)
  if (!profile) return null
  const { team, venue } = profile
  return (
    <article className="sports-team-card">
      <div className="sports-team-card__head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={team.logo} alt="" width={48} height={48} />
        <div>
          <p className="sports-team-card__side">{side === 'home' ? t.home : t.away}</p>
          <h3>{team.name}</h3>
          <p className="sports-muted">
            {team.country}
            {team.founded ? ` · ${t.founded} ${team.founded}` : ''}
          </p>
        </div>
      </div>
      {venue?.name ? (
        <p className="sports-team-card__venue">
          <strong>{t.venue}:</strong> {venue.name}
          {venue.city ? `, ${venue.city}` : ''}
          {venue.capacity ? ` · ${t.capacity} ${venue.capacity.toLocaleString()}` : ''}
        </p>
      ) : null}
    </article>
  )
}

export async function MatchDetailPage({
  lang,
  id,
}: {
  lang: Lang
  id: string
}) {
  const t = tSports(lang)
  const backHref = lang === 'en' ? '/en/sports' : '/ru/sports'

  let fixture: FixtureItem | null = null
  let homeTeam: TeamProfile | null = null
  let awayTeam: TeamProfile | null = null
  let error: string | null = null

  try {
    if (!process.env.APISPORTS_KEY?.trim()) {
      error = t.missingKey
    } else {
      const res = await getFixtureById(id)
      fixture = res.response?.[0] || null
      if (fixture) {
        const [home, away] = await Promise.all([
          getTeamById(fixture.teams.home.id).catch(() => null),
          getTeamById(fixture.teams.away.id).catch(() => null),
        ])
        homeTeam = home?.response?.[0] || null
        awayTeam = away?.response?.[0] || null
      }
    }
  } catch {
    error = t.error
  }

  if (error || !fixture) {
    return (
      <div className="page-shell sports-page">
        <SiteHeader lang={lang} section="sports" matchId={id} />
        <main className="sports-main">
          <p className="sports-error">{error || t.error}</p>
          <p className="sports-back">
            <Link href={backHref}>← {t.back}</Link>
          </p>
        </main>
        <SiteFooter lang={lang} />
      </div>
    )
  }

  const live = isLiveStatus(fixture.fixture.status.short)
  const events = fixture.events || []
  const lineups = fixture.lineups || []
  const stats = fixture.statistics || []

  return (
    <div className="page-shell sports-page">
      <SiteHeader lang={lang} section="sports" matchId={id} />
      <main className="sports-main">
        <p className="sports-back">
          <Link href={backHref}>← {t.back}</Link>
        </p>

        <header className="sports-match-hero">
          <p className="sports-match-hero__league">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {fixture.league.logo ? <img src={fixture.league.logo} alt="" width={20} height={20} /> : null}
            {fixture.league.country} · {fixture.league.name}
            {fixture.league.round ? ` · ${fixture.league.round}` : ''}
          </p>

          <div className="sports-match-hero__scoreboard">
            <div className="sports-match-hero__side">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fixture.teams.home.logo} alt="" width={64} height={64} />
              <h1>{fixture.teams.home.name}</h1>
            </div>
            <div className="sports-match-hero__score">
              <p className={`sports-match-hero__status${live ? ' is-live' : ''}`}>
                {live && fixture.fixture.status.elapsed != null
                  ? `${fixture.fixture.status.short} ${fixture.fixture.status.elapsed}'`
                  : fixture.fixture.status.long}
              </p>
              <p className="sports-match-hero__numbers">
                <span>{scoreText(fixture.goals.home)}</span>
                <span>:</span>
                <span>{scoreText(fixture.goals.away)}</span>
              </p>
              <p className="sports-muted">
                HT {scoreText(fixture.score.halftime.home)}:{scoreText(fixture.score.halftime.away)}
              </p>
            </div>
            <div className="sports-match-hero__side sports-match-hero__side--away">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fixture.teams.away.logo} alt="" width={64} height={64} />
              <h1>{fixture.teams.away.name}</h1>
            </div>
          </div>

          <ul className="sports-match-meta">
            <li>
              <strong>{t.kickoff}:</strong> {new Date(fixture.fixture.date).toUTCString()}
            </li>
            {fixture.fixture.venue?.name ? (
              <li>
                <strong>{t.venue}:</strong> {fixture.fixture.venue.name}
                {fixture.fixture.venue.city ? `, ${fixture.fixture.venue.city}` : ''}
              </li>
            ) : null}
            {fixture.fixture.referee ? (
              <li>
                <strong>{t.referee}:</strong> {fixture.fixture.referee}
              </li>
            ) : null}
          </ul>
        </header>

        <section className="sports-section" aria-labelledby="sports-teams-title">
          <h2 id="sports-teams-title">{t.teams}</h2>
          <div className="sports-team-grid">
            <TeamCard profile={homeTeam} lang={lang} side="home" />
            <TeamCard profile={awayTeam} lang={lang} side="away" />
          </div>
        </section>

        {events.length > 0 ? (
          <section className="sports-section" aria-labelledby="sports-events-title">
            <h2 id="sports-events-title">{t.events}</h2>
            <ol className="sports-events">
              {events.map((ev, idx) => (
                <li key={`${ev.time.elapsed}-${ev.type}-${idx}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ev.team.logo} alt="" width={18} height={18} />
                  <span>{eventLabel(ev, lang)}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {stats.length > 0 ? (
          <section className="sports-section" aria-labelledby="sports-stats-title">
            <h2 id="sports-stats-title">{t.stats}</h2>
            <div className="sports-stats">
              {(() => {
                const home = stats[0]
                const away = stats[1]
                const types = home?.statistics?.map((s) => s.type) || []
                return types.map((type) => {
                  const hv = home?.statistics?.find((s) => s.type === type)?.value ?? '–'
                  const av = away?.statistics?.find((s) => s.type === type)?.value ?? '–'
                  return (
                    <div key={type} className="sports-stats__row">
                      <span>{hv ?? '–'}</span>
                      <span className="sports-muted">{type}</span>
                      <span>{av ?? '–'}</span>
                    </div>
                  )
                })
              })()}
            </div>
          </section>
        ) : null}

        {lineups.length > 0 ? (
          <section className="sports-section" aria-labelledby="sports-lineups-title">
            <h2 id="sports-lineups-title">{t.lineups}</h2>
            <div className="sports-lineups">
              {lineups.map((lu) => (
                <article key={lu.team.id} className="sports-lineup">
                  <header>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lu.team.logo} alt="" width={24} height={24} />
                    <h3>{lu.team.name}</h3>
                    {lu.formation ? (
                      <span className="sports-muted">
                        {t.formation}: {lu.formation}
                      </span>
                    ) : null}
                  </header>
                  {lu.coach?.name ? (
                    <p className="sports-muted">
                      {t.coach}: {lu.coach.name}
                    </p>
                  ) : null}
                  <h4>{t.starters}</h4>
                  <ul>
                    {lu.startXI.map((row) => (
                      <li key={row.player.id}>
                        <span className="sports-lineup__num">{row.player.number}</span>
                        {row.player.name}
                        <span className="sports-muted">{row.player.pos}</span>
                      </li>
                    ))}
                  </ul>
                  {lu.substitutes?.length ? (
                    <>
                      <h4>{t.bench}</h4>
                      <ul>
                        {lu.substitutes.map((row) => (
                          <li key={row.player.id}>
                            <span className="sports-lineup__num">{row.player.number}</span>
                            {row.player.name}
                            <span className="sports-muted">{row.player.pos}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}
