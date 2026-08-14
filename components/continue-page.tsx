'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CONTINUE_COPY, operatorHref } from '@/lib/continue'
import { getGame, homeHref, type Lang } from '@/lib/games'

export function ContinuePage({ lang }: { lang: Lang }) {
  const isEn = lang === 'en'
  const t = CONTINUE_COPY[lang]
  const params = useSearchParams()
  const slug = (params.get('game') || '').trim()
  const game = slug ? getGame(slug) : undefined

  return (
    <>
      <SiteHeader lang={lang} />
      <main id="main-content" className="continue-page">
        <div className="continue-page__glow" aria-hidden="true" />
        <section className="continue-card">
          <p className="continue-card__kicker">{t.kicker}</p>
          <h1 className="continue-card__title">{t.title}</h1>
          <p className="continue-card__lead">{t.lead}</p>

          {game ? <p className="continue-card__game">{t.gameNote(game.name)}</p> : null}

          <h2 className="continue-card__steps-title">{t.stepsTitle}</h2>
          <ol className="continue-card__steps">
            {t.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <a
            href={operatorHref()}
            rel="noopener noreferrer nofollow sponsored"
            target="_blank"
            className="btn-cta continue-card__cta"
          >
            {t.operatorCta}
          </a>

          <p className="continue-card__legal">{t.legal}</p>

          <p className="continue-card__links">
            <Link href={homeHref(lang)}>{t.backDemo}</Link>
            <span aria-hidden="true"> · </span>
            <Link href={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'}>
              {t.responsible}
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
