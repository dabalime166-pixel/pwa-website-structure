'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WinLogo } from '@/components/win-logo'
import { CONTINUE_COPY, operatorHref } from '@/lib/continue'
import { getGame, homeHref, type Lang } from '@/lib/games'

export function ContinuePage({ lang }: { lang: Lang }) {
  const isEn = lang === 'en'
  const t = CONTINUE_COPY[lang]
  const params = useSearchParams()
  const slug = (params.get('game') || '').trim()
  const game = slug ? getGame(slug) : undefined

  return (
    <div className="win-hop-shell">
      <SiteHeader lang={lang} />
      <main id="main-content" className="win-hop">
        <div className="win-hop__sky" aria-hidden="true">
          <div className="win-hop__mesh" />
          <img
            src="/brands/win-triangle.svg"
            alt=""
            className="win-hop__tri win-hop__tri--bl"
          />
          <img
            src="/brands/win-triangle.svg"
            alt=""
            className="win-hop__tri win-hop__tri--tr"
          />
          <img
            src="/brands/win-triangle.svg"
            alt=""
            className="win-hop__tri win-hop__tri--sm1"
          />
          <img
            src="/brands/win-triangle.svg"
            alt=""
            className="win-hop__tri win-hop__tri--sm2"
          />
          <img
            src="/brands/win-triangle.svg"
            alt=""
            className="win-hop__tri win-hop__tri--sm3"
          />
        </div>

        <section className="win-hop__window" aria-labelledby="win-hop-title">
          <div className="win-hop__window-glow" aria-hidden="true" />

          <p className="win-hop__kicker">{t.kicker}</p>
          <WinLogo className="win-hop__logo" />
          <h1 id="win-hop-title" className="win-hop__title">
            {t.title}
          </h1>
          <p className="win-hop__lead">{t.lead}</p>

          {game ? (
            <p className="win-hop__game">
              {game.avatar ? (
                <Image
                  src={game.avatar}
                  alt=""
                  width={36}
                  height={36}
                  className="win-hop__game-art"
                />
              ) : null}
              <span>{t.gameNote(game.name)}</span>
            </p>
          ) : null}

          <ul className="win-hop__checks">
            {t.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>

          <a
            href={operatorHref()}
            rel="noopener noreferrer nofollow sponsored"
            target="_blank"
            className="win-hop__cta"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.5 3.8 19 12 6.5 20.2V3.8Z" />
            </svg>
            {t.operatorCta}
          </a>

          <p className="win-hop__legal">{t.legal}</p>
          <p className="win-hop__links">
            <Link href={homeHref(lang)}>{t.backDemo}</Link>
            <span aria-hidden="true"> · </span>
            <Link href={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'}>
              {t.responsible}
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}
