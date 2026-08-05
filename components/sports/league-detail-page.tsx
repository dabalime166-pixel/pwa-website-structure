import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StandingsTable } from '@/components/sports/standings-table'
import type { Lang } from '@/lib/games'
import { getFootballStandings } from '@/lib/sportscore'
import { getLeague, leagueName, leagueRegion } from '@/lib/sports-leagues'
import { tSports } from '@/lib/sports-i18n'
import { notFound } from 'next/navigation'

export async function LeagueDetailPage({ lang, slug }: { lang: Lang; slug: string }) {
  const league = getLeague(slug)
  if (!league) notFound()

  const t = tSports(lang)
  const name = leagueName(league, lang)
  const region = leagueRegion(league, lang)
  const backHref = lang === 'en' ? '/en/sports' : '/ru/sports'

  let tables: Awaited<ReturnType<typeof getFootballStandings>>['tables'] = []
  let logo = ''
  let error: string | null = null

  try {
    const res = await getFootballStandings(slug)
    tables = res.tables || []
    logo = res.competition_logo || ''
  } catch {
    error = t.noStandings
  }

  const leaders = tables[0]?.rows?.slice(0, 3) || []
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name,
    sport: 'Football',
    url: `https://www.1weapp.online/${lang}/sports/league/${slug}`,
  }

  return (
    <div className="page-shell sports-page sports-match-page">
      <div className="sports-match-page__bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/sports-match-bg.webp" alt="" width={1920} height={1080} />
        <div className="sports-match-page__veil" />
      </div>
      <SiteHeader lang={lang} section="sports" leagueSlug={slug} />
      <main className="sports-main sports-match-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <p className="sports-back">
          <Link href={backHref}>← {t.backSports}</Link>
        </p>

        <header className="sports-league-hero">
          <p className="sports-match-hero__league">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {logo ? <img src={logo} alt="" width={28} height={28} /> : null}
            {region}
          </p>
          <h1>{name}</h1>
          <p className="sports-hero__blurb">{t.seasonTableBlurb}</p>
          {league.kind === 'cup' || league.kind === 'uefa' ? (
            <p className="sports-muted">{t.cupNote}</p>
          ) : null}
        </header>

        {leaders.length > 0 ? (
          <section className="sports-section sports-panel" aria-labelledby="sports-leaders-title">
            <h2 id="sports-leaders-title">{t.topTable}</h2>
            <div className="sports-leader-grid">
              {leaders.map((row) => (
                <Link
                  key={row.team_slug}
                  href={lang === 'en' ? `/en/sports/team/${row.team_slug}` : `/ru/sports/team/${row.team_slug}`}
                  className="sports-leader-card"
                >
                  <span className="sports-leader-card__pos">#{row.pos}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {row.team_logo ? <img src={row.team_logo} alt="" width={48} height={48} /> : null}
                  <strong>{row.team}</strong>
                  <span className="sports-muted">
                    {row.pts} {t.pts.toLowerCase()} · {row.gf}:{row.ga}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="sports-section sports-panel" aria-labelledby="sports-table-title">
          <h2 id="sports-table-title">{t.seasonTable}</h2>
          {error ? <p className="sports-error">{error}</p> : <StandingsTable lang={lang} tables={tables} />}
        </section>

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
