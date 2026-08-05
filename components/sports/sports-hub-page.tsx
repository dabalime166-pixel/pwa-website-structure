import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MatchCard } from '@/components/sports/match-card'
import { LiveMatchesPanel } from '@/components/sports/live-matches-panel'
import type { Lang } from '@/lib/games'
import { getFixturesByDate, getLiveFixtures, utcDateString } from '@/lib/api-sports'
import { tSports } from '@/lib/sports-i18n'

export async function SportsHubPage({ lang }: { lang: Lang }) {
  const t = tSports(lang)
  const today = utcDateString()

  let live: Awaited<ReturnType<typeof getLiveFixtures>>['response'] = []
  let todayFixtures: Awaited<ReturnType<typeof getFixturesByDate>>['response'] = []
  let error: string | null = null

  try {
    if (!process.env.APISPORTS_KEY?.trim()) {
      error = t.missingKey
    } else {
      const [liveRes, todayRes] = await Promise.all([getLiveFixtures(), getFixturesByDate(today)])
      live = liveRes.response || []
      todayFixtures = (todayRes.response || []).slice(0, 40)
    }
  } catch {
    error = t.error
  }

  return (
    <div className="page-shell sports-page">
      <SiteHeader lang={lang} section="sports" />
      <main className="sports-main">
        <header className="sports-hero">
          <p className="sports-hero__eyebrow">API-Sports · Football</p>
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
                <h2 id="sports-today-title">
                  {t.today} · {today}
                </h2>
              </div>
              {todayFixtures.length === 0 ? (
                <p className="sports-empty">{t.noToday}</p>
              ) : (
                <div className="sports-match-grid">
                  {todayFixtures.map((f) => (
                    <MatchCard key={f.fixture.id} fixture={f} lang={lang} />
                  ))}
                </div>
              )}
            </section>
          </>
        ) : null}

        <p className="sports-back">
          <Link href={lang === 'en' ? '/' : '/ru'}>{lang === 'en' ? '← Home' : '← На главную'}</Link>
        </p>
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}
