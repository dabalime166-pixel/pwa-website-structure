import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import type { Lang } from '@/lib/games'
import { getFootballMatch } from '@/lib/sportscore'
import type { SportScoreIncident, SportScoreMatch, SportScorePlayer } from '@/lib/sports-types'
import { isLiveStatus } from '@/lib/sports-types'
import { tSports } from '@/lib/sports-i18n'

function scoreText(v: string | null | undefined) {
  if (v === null || v === undefined || v === '') return '–'
  return String(v)
}

function eventLabel(ev: SportScoreIncident) {
  const min = ev.time != null ? `${ev.time}'` : '—'
  const who = ev.player || '—'
  const assist = ev.assist ? ` (${ev.assist})` : ''
  return `${min} · ${ev.type} — ${who}${assist}`
}

function PlayersList({
  title,
  players,
}: {
  title: string
  players?: SportScorePlayer[]
}) {
  if (!players?.length) return null
  return (
    <>
      <h4>{title}</h4>
      <ul>
        {players.map((p, idx) => (
          <li key={`${p.name}-${p.number}-${idx}`}>
            <span className="sports-lineup__num">{p.number ?? '–'}</span>
            {p.name}
            {p.captain ? ' ©' : ''}
            <span className="sports-muted">{p.position}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function normalizeStats(stats: SportScoreMatch['stats']) {
  if (!stats) return [] as { label: string; home: string; away: string }[]
  if (Array.isArray(stats)) {
    return stats
      .map((s) => ({
        label: String(s.type || s.name || 'Stat'),
        home: String(s.home ?? '–'),
        away: String(s.away ?? '–'),
      }))
      .filter((s) => s.label)
  }
  // object map fallback
  return Object.entries(stats).map(([label, value]) => {
    if (value && typeof value === 'object' && ('home' in value || 'away' in value)) {
      const v = value as { home?: unknown; away?: unknown }
      return { label, home: String(v.home ?? '–'), away: String(v.away ?? '–') }
    }
    return { label, home: String(value ?? '–'), away: '–' }
  })
}

export async function MatchDetailPage({
  lang,
  slug,
}: {
  lang: Lang
  slug: string
}) {
  const t = tSports(lang)
  const backHref = lang === 'en' ? '/en/sports' : '/ru/sports'

  let match: SportScoreMatch | null = null
  let error: string | null = null

  try {
    const res = await getFootballMatch(slug)
    match = res.match || null
  } catch {
    error = t.error
  }

  if (error || !match) {
    return (
      <div className="page-shell sports-page">
        <SiteHeader lang={lang} section="sports" matchId={slug} />
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

  const live = isLiveStatus(match.status)
  const events = match.incidents || []
  const lineups = match.lineups
  const stats = normalizeStats(match.stats)
  const statusLabel =
    live && match.live_minute != null
      ? `${match.status_text || 'Live'} ${match.live_minute}'`
      : match.status_text || match.status

  return (
    <div className="page-shell sports-page">
      <SiteHeader lang={lang} section="sports" matchId={slug} />
      <main className="sports-main">
        <p className="sports-back">
          <Link href={backHref}>← {t.back}</Link>
        </p>

        <header className="sports-match-hero">
          <p className="sports-match-hero__league">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {match.competition_logo ? (
              <img src={match.competition_logo} alt="" width={20} height={20} />
            ) : null}
            {match.competition}
          </p>

          <div className="sports-match-hero__scoreboard">
            <div className="sports-match-hero__side">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={match.home_logo} alt="" width={64} height={64} />
              <h1>{match.home}</h1>
            </div>
            <div className="sports-match-hero__score">
              <p className={`sports-match-hero__status${live ? ' is-live' : ''}`}>{statusLabel}</p>
              <p className="sports-match-hero__numbers">
                <span>{scoreText(match.home_score)}</span>
                <span>:</span>
                <span>{scoreText(match.away_score)}</span>
              </p>
              <p className="sports-muted">
                HT {scoreText(match.home_ht_score)}:{scoreText(match.away_ht_score)}
              </p>
            </div>
            <div className="sports-match-hero__side sports-match-hero__side--away">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={match.away_logo} alt="" width={64} height={64} />
              <h1>{match.away}</h1>
            </div>
          </div>

          <ul className="sports-match-meta">
            <li>
              <strong>{t.kickoff}:</strong> {new Date(match.time).toUTCString()}
            </li>
          </ul>
        </header>

        <section className="sports-section" aria-labelledby="sports-teams-title">
          <h2 id="sports-teams-title">{t.teams}</h2>
          <div className="sports-team-grid">
            <article className="sports-team-card">
              <div className="sports-team-card__head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={match.home_logo} alt="" width={48} height={48} />
                <div>
                  <p className="sports-team-card__side">{t.home}</p>
                  <h3>{match.home}</h3>
                </div>
              </div>
            </article>
            <article className="sports-team-card">
              <div className="sports-team-card__head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={match.away_logo} alt="" width={48} height={48} />
                <div>
                  <p className="sports-team-card__side">{t.away}</p>
                  <h3>{match.away}</h3>
                </div>
              </div>
            </article>
          </div>
        </section>

        {events.length > 0 ? (
          <section className="sports-section" aria-labelledby="sports-events-title">
            <h2 id="sports-events-title">{t.events}</h2>
            <ol className="sports-events">
              {events.map((ev, idx) => (
                <li key={`${ev.time}-${ev.type}-${idx}`}>
                  <span className={`sports-events__side sports-events__side--${ev.side || 'home'}`}>
                    {ev.side === 'away' ? t.away : t.home}
                  </span>
                  <span>{eventLabel(ev)}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {stats.length > 0 ? (
          <section className="sports-section" aria-labelledby="sports-stats-title">
            <h2 id="sports-stats-title">{t.stats}</h2>
            <div className="sports-stats">
              {stats.map((row) => (
                <div key={row.label} className="sports-stats__row">
                  <span>{row.home}</span>
                  <span className="sports-muted">{row.label}</span>
                  <span>{row.away}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {lineups ? (
          <section className="sports-section" aria-labelledby="sports-lineups-title">
            <h2 id="sports-lineups-title">{t.lineups}</h2>
            <div className="sports-lineups">
              <article className="sports-lineup">
                <header>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={match.home_logo} alt="" width={24} height={24} />
                  <h3>{match.home}</h3>
                  {lineups.home_formation ? (
                    <span className="sports-muted">
                      {t.formation}: {lineups.home_formation}
                    </span>
                  ) : null}
                </header>
                {lineups.home_coach ? (
                  <p className="sports-muted">
                    {t.coach}: {lineups.home_coach}
                  </p>
                ) : null}
                <PlayersList title={t.starters} players={lineups.home_xi} />
                <PlayersList title={t.bench} players={lineups.home_subs} />
              </article>
              <article className="sports-lineup">
                <header>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={match.away_logo} alt="" width={24} height={24} />
                  <h3>{match.away}</h3>
                  {lineups.away_formation ? (
                    <span className="sports-muted">
                      {t.formation}: {lineups.away_formation}
                    </span>
                  ) : null}
                </header>
                {lineups.away_coach ? (
                  <p className="sports-muted">
                    {t.coach}: {lineups.away_coach}
                  </p>
                ) : null}
                <PlayersList title={t.starters} players={lineups.away_xi} />
                <PlayersList title={t.bench} players={lineups.away_subs} />
              </article>
            </div>
          </section>
        ) : null}

        <p className="sports-attribution">
          <a href="https://sportscore.com/" rel="noopener follow" target="_blank">
            {t.powered}
          </a>
        </p>
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}
