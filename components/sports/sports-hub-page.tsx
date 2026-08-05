import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SportsMatchesBrowser } from '@/components/sports/sports-matches-browser'
import type { Lang } from '@/lib/games'
import { getFootballMatches } from '@/lib/sportscore'
import { tSports } from '@/lib/sports-i18n'

export async function SportsHubPage({ lang }: { lang: Lang }) {
  const t = tSports(lang)

  let matches: Awaited<ReturnType<typeof getFootballMatches>>['matches'] = []
  let error: string | null = null

  try {
    const res = await getFootballMatches(80)
    matches = res.matches || []
  } catch {
    error = t.error
  }

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
            </div>
          </div>
        </section>

        <div className="sports-main" id="sports-fixtures">
          {error ? <p className="sports-error">{error}</p> : null}

          {!error ? <SportsMatchesBrowser lang={lang} initial={matches} /> : null}

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
