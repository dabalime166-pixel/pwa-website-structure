import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import type { Lang } from '@/lib/games'
import { getFootballMatch } from '@/lib/sportscore'
import type { SportScoreIncident, SportScoreMatch, SportScorePlayer } from '@/lib/sports-types'
import {
  isGoalIncident,
  isLiveStatus,
  pickMatchHero,
  teamSlugFromName,
} from '@/lib/sports-types'
import { tSports, SPORTS_BET_URL } from '@/lib/sports-i18n'
import { BallIcon } from '@/components/sports/ball-icon'
import { SportsRefreshButton } from '@/components/sports/sports-refresh-button'
import { buildMatchH1 } from '@/lib/sports-seo'

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
      <h3 className="sports-lineup__group">{title}</h3>
      <ul>
        {players.map((p, idx) => (
          <li key={`${p.name}-${p.number}-${idx}`}>
            <span className="sports-lineup__num">{p.number ?? '–'}</span>
            {p.name}
            {p.captain ? ' ©' : ''}
            <span className="sports-muted">{p.position}</span>
            {p.rating && Number(p.rating) > 0 ? (
              <span className="sports-pill">{p.rating}</span>
            ) : null}
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
  return Object.entries(stats).map(([label, value]) => {
    if (value && typeof value === 'object' && ('home' in value || 'away' in value)) {
      const v = value as { home?: unknown; away?: unknown }
      return { label, home: String(v.home ?? '–'), away: String(v.away ?? '–') }
    }
    return { label, home: String(value ?? '–'), away: '–' }
  })
}

function collectByType(events: SportScoreIncident[], pred: (ev: SportScoreIncident) => boolean) {
  return events.filter(pred)
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
      <div className="page-shell sports-page sports-match-page">
        <div className="sports-match-page__bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/banners/sports-match-bg.webp" alt="" width={1920} height={1080} />
          <div className="sports-match-page__veil" />
        </div>
        <SiteHeader lang={lang} section="sports" matchId={slug} />
        <main className="sports-main sports-match-main">
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
  const h1 = buildMatchH1(match, lang)
  const hero = pickMatchHero(match, lang)
  const goals = collectByType(events, isGoalIncident)
  const cards = collectByType(events, (ev) => Boolean(ev.is_card) || /card|карточ/i.test(String(ev.type || '')))
  const subs = collectByType(events, (ev) => /sub/i.test(String(ev.type || '')))
  const homeSlug = teamSlugFromName(match.home)
  const awaySlug = teamSlugFromName(match.away)
  const homeHref = lang === 'en' ? `/en/sports/team/${homeSlug}` : `/ru/sports/team/${homeSlug}`
  const awayHref = lang === 'en' ? `/en/sports/team/${awaySlug}` : `/ru/sports/team/${awaySlug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${match.home} vs ${match.away}`,
    startDate: match.time,
    eventStatus: live
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventScheduled',
    homeTeam: { '@type': 'SportsTeam', name: match.home },
    awayTeam: { '@type': 'SportsTeam', name: match.away },
    organizer: match.competition,
    url: `https://www.1weapp.online/${lang}/sports/match/${slug}`,
  }

  return (
    <div className="page-shell sports-page sports-match-page">
      <div className="sports-match-page__bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="sports-match-page__photo"
          src="/banners/sports-match-bg.webp"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="sports-match-page__veil" />
        <div className="sports-match-page__glow" />
      </div>

      <SiteHeader lang={lang} section="sports" matchId={slug} />
      <main className="sports-main sports-match-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <div className="sports-back-row">
          <p className="sports-back">
            <Link href={backHref}>← {t.back}</Link>
          </p>
          <SportsRefreshButton lang={lang} />
        </div>

        <header className="sports-match-hero">
          <p className="sports-match-hero__league">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {match.competition_logo ? (
              <img src={match.competition_logo} alt="" width={20} height={20} />
            ) : null}
            {match.competition}
          </p>

          <h1 className="sports-match-hero__title">{h1}</h1>

          <div className="sports-match-hero__scoreboard">
            <Link href={homeHref} className="sports-match-hero__side">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={match.home_logo} alt="" width={72} height={72} />
              <p className="sports-match-hero__team">{match.home}</p>
              <p className="sports-match-hero__side-label">{t.home}</p>
            </Link>
            <div className="sports-match-hero__score">
              <p className={`sports-match-hero__status${live ? ' is-live' : ''}`}>{statusLabel}</p>
              <p className="sports-match-hero__numbers">
                <span>{scoreText(match.home_score)}</span>
                <BallIcon className="sports-ball sports-ball--lg" size={28} title={t.goal} />
                <span>{scoreText(match.away_score)}</span>
              </p>
              <p className="sports-muted">
                HT {scoreText(match.home_ht_score)}:{scoreText(match.away_ht_score)}
              </p>
            </div>
            <Link href={awayHref} className="sports-match-hero__side sports-match-hero__side--away">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={match.away_logo} alt="" width={72} height={72} />
              <p className="sports-match-hero__team">{match.away}</p>
              <p className="sports-match-hero__side-label">{t.away}</p>
            </Link>
          </div>

          <ul className="sports-match-meta">
            <li>
              <strong>{t.kickoff}:</strong> {new Date(match.time).toUTCString()}
            </li>
          </ul>

          <div className="sports-match-hero__cta">
            <a
              href={SPORTS_BET_URL}
              className="sports-bet-cta"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              {t.placeBet}
            </a>
          </div>
        </header>

        {hero ? (
          <section className="sports-section sports-panel sports-hero-card" aria-labelledby="sports-hero-player">
            <h2 id="sports-hero-player">{t.matchHero}</h2>
            <div className="sports-hero-card__body">
              <BallIcon className="sports-ball sports-ball--lg" size={28} title={t.goal} />
              <div>
                <p className="sports-hero-card__name">{hero.name}</p>
                <p className="sports-muted">
                  {hero.side === 'away' ? match.away : match.home} · {hero.reason}
                  {hero.goals || hero.assists
                    ? ` · ${t.goals} ${hero.goals} / ${t.assists} ${hero.assists}`
                    : ''}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="sports-section sports-panel" aria-labelledby="sports-teams-title">
          <h2 id="sports-teams-title">{t.teams}</h2>
          <div className="sports-team-grid">
            <Link href={homeHref} className="sports-team-card">
              <div className="sports-team-card__head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={match.home_logo} alt="" width={48} height={48} />
                <div>
                  <p className="sports-team-card__side">{t.home}</p>
                  <h3>{match.home}</h3>
                </div>
              </div>
            </Link>
            <Link href={awayHref} className="sports-team-card">
              <div className="sports-team-card__head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={match.away_logo} alt="" width={48} height={48} />
                <div>
                  <p className="sports-team-card__side">{t.away}</p>
                  <h3>{match.away}</h3>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {(goals.length > 0 || cards.length > 0 || subs.length > 0) && (
          <section className="sports-section sports-panel" aria-labelledby="sports-report-title">
            <h2 id="sports-report-title">{t.matchReport}</h2>
            <div className="sports-report-grid">
              {goals.length > 0 ? (
                <div>
                  <h3>{t.scorers}</h3>
                  <ul className="sports-report-list">
                    {goals.map((ev, idx) => (
                      <li key={`g-${idx}`}>
                        <BallIcon className="sports-ball" size={14} />
                        {ev.time != null ? `${ev.time}' ` : ''}
                        {ev.player || '—'}
                        {ev.assist ? ` ← ${ev.assist}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {cards.length > 0 ? (
                <div>
                  <h3>{t.cards}</h3>
                  <ul className="sports-report-list">
                    {cards.map((ev, idx) => (
                      <li key={`c-${idx}`}>
                        {ev.time != null ? `${ev.time}' ` : ''}
                        {ev.type} — {ev.player || '—'}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {subs.length > 0 ? (
                <div>
                  <h3>{t.substitutions}</h3>
                  <ul className="sports-report-list">
                    {subs.map((ev, idx) => (
                      <li key={`s-${idx}`}>
                        {ev.time != null ? `${ev.time}' ` : ''}
                        {ev.player || '—'}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {events.length > 0 ? (
          <section className="sports-section sports-panel" aria-labelledby="sports-events-title">
            <h2 id="sports-events-title">{t.events}</h2>
            <ol className="sports-events">
              {events.map((ev, idx) => {
                const goal = isGoalIncident(ev)
                return (
                  <li
                    key={`${ev.time}-${ev.type}-${idx}`}
                    className={goal ? 'sports-events__item--goal' : undefined}
                  >
                    {goal ? <BallIcon className="sports-ball" size={16} title={t.goal} /> : null}
                    <span className={`sports-events__side sports-events__side--${ev.side || 'home'}`}>
                      {ev.side === 'away' ? t.away : t.home}
                    </span>
                    <span>{eventLabel(ev)}</span>
                  </li>
                )
              })}
            </ol>
          </section>
        ) : null}

        {stats.length > 0 ? (
          <section className="sports-section sports-panel" aria-labelledby="sports-stats-title">
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
          <section className="sports-section sports-panel" aria-labelledby="sports-lineups-title">
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
