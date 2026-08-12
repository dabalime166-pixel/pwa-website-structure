import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MatchCard } from '@/components/sports/match-card'
import type { Lang } from '@/lib/games'
import { getFootballMatch, getFootballTeam } from '@/lib/sportscore'
import {
  isFinishedStatus,
  matchSlugFromUrl,
  summarizeTeamForm,
  type SportScorePlayer,
} from '@/lib/sports-types'
import { tSports } from '@/lib/sports-i18n'
import { SportsRefreshButton } from '@/components/sports/sports-refresh-button'

export async function TeamDetailPage({ lang, slug }: { lang: Lang; slug: string }) {
  const t = tSports(lang)
  const backHref = lang === 'en' ? '/en/sports' : '/ru/sports'

  let teamName = slug
  let logo = ''
  let matches: Awaited<ReturnType<typeof getFootballTeam>>['matches'] = []
  let squad: SportScorePlayer[] = []
  let formation: string | null = null
  let coach: string | null = null
  let error: string | null = null

  try {
    const res = await getFootballTeam(slug, 12)
    teamName = res.team?.name || slug
    logo = res.team?.logo || ''
    matches = res.matches || []

    const finished = matches.find((m) => isFinishedStatus(m.status))
    if (finished) {
      const matchSlug = matchSlugFromUrl(finished.url)
      if (matchSlug) {
        try {
          const detail = await getFootballMatch(matchSlug)
          const lu = detail.match?.lineups
          const isHome = detail.match?.home === teamName
          if (lu) {
            squad = (isHome ? lu.home_xi : lu.away_xi) || []
            formation = (isHome ? lu.home_formation : lu.away_formation) || null
            coach = (isHome ? lu.home_coach : lu.away_coach) || null
          }
        } catch {
          /* squad optional */
        }
      }
    }
  } catch {
    error = t.noTeam
  }

  const form = summarizeTeamForm(matches || [], teamName)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: teamName,
    sport: 'Football',
    url: `https://www.1weapp.online/${lang}/sports/team/${slug}`,
    logo: logo || undefined,
  }

  return (
    <div className="page-shell sports-page sports-match-page">
      <div className="sports-match-page__bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/sports-match-bg.webp" alt="" width={1920} height={1080} />
        <div className="sports-match-page__veil" />
      </div>
      <SiteHeader lang={lang} section="sports" teamSlug={slug} />
      <main className="sports-main sports-match-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <div className="sports-back-row">
          <p className="sports-back">
            <Link href={backHref}>← {t.backSports}</Link>
          </p>
          <SportsRefreshButton lang={lang} />
        </div>

        {error ? (
          <p className="sports-error">{error}</p>
        ) : (
          <>
            <header className="sports-team-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {logo ? <img src={logo} alt="" width={88} height={88} /> : null}
              <div>
                <p className="sports-match-hero__league">{t.teamProfile}</p>
                <h1>{teamName}</h1>
                {form ? (
                  <p className="sports-team-hero__form">
                    <span>{t.form}</span>
                    <strong className="sports-form">{form || '—'}</strong>
                  </p>
                ) : null}
              </div>
            </header>

            <section className="sports-section sports-panel" aria-labelledby="sports-team-matches">
              <h2 id="sports-team-matches">{t.recentMatches}</h2>
              {matches.length === 0 ? (
                <p className="sports-empty">{t.noToday}</p>
              ) : (
                <div className="sports-match-grid">
                  {matches.map((m) => (
                    <MatchCard key={m.url} match={m} lang={lang} />
                  ))}
                </div>
              )}
            </section>

            {squad.length > 0 ? (
              <section className="sports-section sports-panel" aria-labelledby="sports-team-squad">
                <h2 id="sports-team-squad">{t.squad}</h2>
                <p className="sports-muted">{t.squadBlurb}</p>
                {formation || coach ? (
                  <p className="sports-team-squad__meta">
                    {formation ? (
                      <span>
                        {t.formation}: {formation}
                      </span>
                    ) : null}
                    {coach ? (
                      <span>
                        {t.coach}: {coach}
                      </span>
                    ) : null}
                  </p>
                ) : null}
                <ul className="sports-squad-list">
                  {squad.map((p, idx) => (
                    <li key={`${p.name}-${p.number}-${idx}`}>
                      <span className="sports-lineup__num">{p.number ?? '–'}</span>
                      <strong>{p.name}</strong>
                      <span className="sports-muted">{p.position}</span>
                      {p.captain ? <span className="sports-pill">C</span> : null}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </>
        )}

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
