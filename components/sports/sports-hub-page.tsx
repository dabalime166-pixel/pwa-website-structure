import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MatchCard } from '@/components/sports/match-card'
import { LiveMatchesPanel } from '@/components/sports/live-matches-panel'
import type { Lang } from '@/lib/games'
import { getFootballMatches } from '@/lib/sportscore'
import { isLiveStatus } from '@/lib/sports-types'
import { tSports } from '@/lib/sports-i18n'

export async function SportsHubPage({ lang }: { lang: Lang }) {
  const t = tSports(lang)

  let matches: Awaited<ReturnType<typeof getFootballMatches>>['matches'] = []
  let error: string | null = null

  try {
    const res = await getFootballMatches(40)
    matches = res.matches || []
  } catch {
    error = t.error
  }

  const live = matches.filter((m) => isLiveStatus(m.status))
  const rest = matches.filter((m) => !isLiveStatus(m.status)).slice(0, 30)

  return (
    <div className="page-shell sports-page">
      <SiteHeader lang={lang} section="sports" />
      <main className="sports-main">
        <header className="sports-hero">
          <p className="sports-hero__eyebrow">SportScore · Football</p>
          <h1>{t.title}</h1>
          <p className="sports-hero__blurb">{t.blurb}</p>
          <p className="sports-hero__note">{t.freePlanNote}</p>
        </header>

        {error ? <p className="sports-error">{error}</p> : null}

        {!error ? (
          <>
            <LiveMatchesPanel
              lang={lang}
              initial={live}
              emptyLabel={t.noLive}
              refreshLabel={t.refresh}
            />

            <section className="sports-section" aria-labelledby="sports-today-title">
              <div className="sports-section__head">
                <h2 id="sports-today-title">{t.today}</h2>
              </div>
              {rest.length === 0 ? (
                <p className="sports-empty">{t.noToday}</p>
              ) : (
                <div className="sports-match-grid">
                  {rest.map((m) => (
                    <MatchCard key={m.url} match={m} lang={lang} />
                  ))}
                </div>
              )}
            </section>
          </>
        ) : null}

        <p className="sports-attribution">
          <a href="https://sportscore.com/" rel="noopener follow" target="_blank">
            {t.powered}
          </a>
        </p>

        <p className="sports-back">
          <Link href={lang === 'en' ? '/' : '/ru'}>{lang === 'en' ? '← Home' : '← На главную'}</Link>
        </p>
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}
