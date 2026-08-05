import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SportsMatchesBrowser } from '@/components/sports/sports-matches-browser'
import { StandingsTable } from '@/components/sports/standings-table'
import type { Lang } from '@/lib/games'
import { getFootballMatches, getFootballStandings } from '@/lib/sportscore'
import { SPORTS_LEAGUES, leagueName, leagueRegion } from '@/lib/sports-leagues'
import { tSports } from '@/lib/sports-i18n'

const PREVIEW_LEAGUES = [
  'english-premier-league',
  'spanish-la-liga',
  'uefa-champions-league',
  'bundesliga',
] as const

export async function SportsHubPage({ lang }: { lang: Lang }) {
  const t = tSports(lang)

  let matches: Awaited<ReturnType<typeof getFootballMatches>>['matches'] = []
  let error: string | null = null
  const leaguePreviews: {
    slug: string
    name: string
    region: string
    logo?: string
    tables: Awaited<ReturnType<typeof getFootballStandings>>['tables']
  }[] = []

  try {
    const res = await getFootballMatches(80)
    matches = res.matches || []
  } catch {
    error = t.error
  }

  await Promise.all(
    PREVIEW_LEAGUES.map(async (slug) => {
      const meta = SPORTS_LEAGUES.find((l) => l.slug === slug)
      if (!meta) return
      try {
        const standings = await getFootballStandings(slug)
        leaguePreviews.push({
          slug,
          name: leagueName(meta, lang),
          region: leagueRegion(meta, lang),
          logo: standings.competition_logo,
          tables: standings.tables || [],
        })
      } catch {
        leaguePreviews.push({
          slug,
          name: leagueName(meta, lang),
          region: leagueRegion(meta, lang),
          tables: [],
        })
      }
    }),
  )

  leaguePreviews.sort(
    (a, b) =>
      (SPORTS_LEAGUES.find((l) => l.slug === a.slug)?.priority || 99) -
      (SPORTS_LEAGUES.find((l) => l.slug === b.slug)?.priority || 99),
  )

  return (
    <div className="page-shell sports-page">
      <SiteHeader lang={lang} section="sports" />
      <main>
        <section className="sports-hero" aria-labelledby="sports-hero-title">
          <div className="sports-hero__media" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="sports-hero__photo"
              src="/banners/sports-hub-hero.webp"
              alt=""
              width={1920}
              height={1080}
              fetchPriority="high"
            />
            <div className="sports-hero__veil" />
            <div className="sports-hero__shine" />
          </div>

          <div className="sports-hero__inner">
            <p className="sports-hero__brand">
              <span className="sports-hero__brand-plain">1we</span>
              <span className="sports-hero__brand-accent">app</span>
              <span className="sports-hero__brand-sep" aria-hidden="true">
                /
              </span>
              <span className="sports-hero__brand-sport">{t.nav}</span>
            </p>
            <h1 id="sports-hero-title">{t.title}</h1>
            <p className="sports-hero__blurb">{t.blurb}</p>
            <div className="sports-hero__actions">
              <a className="sports-hero__cta" href="#sports-fixtures">
                {t.browseCta}
              </a>
              <a className="sports-hero__cta sports-hero__cta--ghost" href="#sports-leagues">
                {t.browseLeagues}
              </a>
            </div>
          </div>
        </section>

        <div className="sports-main">
          <section className="sports-section" id="sports-leagues" aria-labelledby="sports-leagues-title">
            <div className="sports-section__head">
              <h2 id="sports-leagues-title">{t.leagues}</h2>
              <p className="sports-section__hint">{t.leaguesBlurb}</p>
            </div>

            <div className="sports-league-grid">
              {SPORTS_LEAGUES.map((league) => (
                <Link
                  key={league.slug}
                  href={lang === 'en' ? `/en/sports/league/${league.slug}` : `/ru/sports/league/${league.slug}`}
                  className="sports-league-card"
                >
                  <span className="sports-league-card__region">{leagueRegion(league, lang)}</span>
                  <strong>{leagueName(league, lang)}</strong>
                  <span className="sports-muted">{t.viewTable} →</span>
                </Link>
              ))}
            </div>
          </section>

          {leaguePreviews.map((preview) => (
            <section
              key={preview.slug}
              className="sports-section sports-panel"
              aria-labelledby={`preview-${preview.slug}`}
            >
              <div className="sports-section__head">
                <h2 id={`preview-${preview.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {preview.logo ? <img src={preview.logo} alt="" width={22} height={22} /> : null}{' '}
                  {preview.name}
                </h2>
                <Link
                  className="sports-section__hint"
                  href={
                    lang === 'en'
                      ? `/en/sports/league/${preview.slug}`
                      : `/ru/sports/league/${preview.slug}`
                  }
                >
                  {t.viewTable} →
                </Link>
              </div>
              {preview.tables.length ? (
                <StandingsTable lang={lang} tables={preview.tables} limit={5} />
              ) : (
                <p className="sports-empty">{t.noStandings}</p>
              )}
            </section>
          ))}

          <div id="sports-fixtures">
            {error ? <p className="sports-error">{error}</p> : null}
            {!error ? <SportsMatchesBrowser lang={lang} initial={matches} /> : null}
          </div>

          <p className="sports-attribution">
            <a href="https://sportscore.com/" rel="noopener follow" target="_blank">
              {t.powered}
            </a>
          </p>

          <p className="sports-back">
            <Link href={lang === 'en' ? '/' : '/ru'}>
              {lang === 'en' ? '← Home' : '← На главную'}
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}
