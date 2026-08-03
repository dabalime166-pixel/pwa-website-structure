'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ExpertBanner } from '@/components/expert-banner'
import { GAME_GUIDES } from '@/lib/game-guides-data'
import type { GameGuide } from '@/lib/game-guides-data'
import type { Lang } from '@/lib/games'
import { getGame, homeHref } from '@/lib/games'

interface Props {
  lang: Lang
}

export function GameGuidesIndexPage({ lang }: Props) {
  const isEn = lang === 'en'
  const base = isEn ? '/en/guides/games' : '/ru/guides/games'
  const heroAvatars = GAME_GUIDES.slice(0, 6)

  return (
    <>
      <SiteHeader lang={lang} section="guides" gameGuides />
      <main className="guides-hub game-guides-hub">
        <section className="game-guides-hub__hero" aria-label={isEn ? 'Game guides' : 'Гайды по играм'}>
          <div className="game-guides-hub__hero-bg" aria-hidden="true" />
          <div className="game-guides-hub__hero-inner">
            <p className="guides-hub__brand anim-fade-up">
              <span className="guides-hub__brand-main">1we</span>
              <span className="guides-hub__brand-accent">app</span>
            </p>
            <p className="guides-hub__eyebrow anim-fade-up anim-delay-1">
              {isEn ? 'Guides · Games' : 'Гайды · Игры'}
            </p>
            <h1 className="guides-hub__title anim-fade-up anim-delay-2">
              {isEn ? 'How popular demos really work' : 'Как на самом деле работают хиты'}
            </h1>
            <p className="guides-hub__sub anim-fade-up anim-delay-3">
              {isEn
                ? 'Multipliers, free spins and crash timing — short guides tied to free play, no signup.'
                : 'Множители, фриспины и момент кэшаута — короткие разборы с бесплатным демо, без регистрации.'}
            </p>
            <ul className="game-guides-hub__hero-fan anim-fade-up anim-delay-3" aria-hidden="true">
              {heroAvatars.map((g, i) => (
                <li key={g.id} style={{ '--i': i } as CSSProperties}>
                  <Image src={g.avatar} alt="" width={96} height={128} priority={i < 3} />
                </li>
              ))}
            </ul>
            <p className="guides-hub__meta anim-fade-up anim-delay-3">
              <Link href={isEn ? '/en/guides' : '/ru/guides'} className="guides-hub__back">
                {isEn ? '← All guides' : '← Все гайды'}
              </Link>
            </p>
          </div>
        </section>

        <section className="guides-hub__library" aria-label={isEn ? 'Game guide library' : 'Библиотека гайдов по играм'}>
          <div className="game-guides-hub__mosaic">
            {GAME_GUIDES.map((g) => {
              const game = getGame(g.gameSlug)
              const shortTitle = game?.name ?? g.gameSlug
              return (
              <Link key={g.id} href={`${base}/${g.id}`} className="game-guides-hub__tile">
                <span className="game-guides-hub__tile-art">
                  <Image
                    src={g.avatar}
                    alt=""
                    width={200}
                    height={267}
                    className="game-guides-hub__tile-avatar"
                  />
                </span>
                <span className="game-guides-hub__tile-body">
                  <span className="game-guides-hub__tile-tag">{isEn ? g.tagEn : g.tagRu}</span>
                  <span className="game-guides-hub__tile-title">{shortTitle}</span>
                  <span className="game-guides-hub__tile-sub">
                    {isEn ? g.subtitleEn : g.subtitleRu}
                  </span>
                  <span className="game-guides-hub__tile-cta">
                    {isEn ? 'Read guide' : 'Читать гайд'}
                  </span>
                </span>
              </Link>
              )
            })}
          </div>
        </section>

        <ExpertBanner lang={lang} variant="compact" />
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}

function slugifyHeading(text: string, idx: number): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
  return `s${idx + 1}-${base || 'section'}`
}

export function GameGuideSinglePage({
  guide,
  lang,
  jsonLd,
}: {
  guide: GameGuide
  lang: Lang
  jsonLd?: string
}) {
  const isEn = lang === 'en'
  const sections = isEn ? guide.sections.en : guide.sections.ru
  const playHref = `/${lang}/${guide.gameSlug}`
  const indexHref = isEn ? '/en/guides/games' : '/ru/guides/games'

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ) : null}
      <SiteHeader lang={lang} section="guides" gameGuideSlug={guide.id} />
      <main className="guide-page game-guide-page" id="main-content">
        <div className="guide-page__layout">
          <aside className="guide-sidebar" aria-label={isEn ? 'On this page' : 'На этой странице'}>
            <p className="guide-sidebar__label">{isEn ? 'Contents' : 'Содержание'}</p>
            <nav className="guide-sidebar__nav">
              {sections.map((s, i) => (
                <a key={s.heading} href={`#${slugifyHeading(s.heading, i)}`}>
                  {s.heading}
                </a>
              ))}
            </nav>
            <Link href={playHref} className="btn-cta guide-sidebar__play">
              {isEn ? 'Open free demo' : 'Открыть бесплатное демо'}
            </Link>
            <Link href={indexHref} className="guide-sidebar__back">
              {isEn ? '← Game guides' : '← Гайды по играм'}
            </Link>
          </aside>

          <article className="guide-article">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href={homeHref(lang)}>{isEn ? 'Home' : 'Главная'}</Link>
              <span aria-hidden="true">/</span>
              <Link href={isEn ? '/en/guides' : '/ru/guides'}>{isEn ? 'Guides' : 'Гайды'}</Link>
              <span aria-hidden="true">/</span>
              <Link href={indexHref}>{isEn ? 'Games' : 'Игры'}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{isEn ? guide.titleEn : guide.titleRu}</span>
            </nav>

            <header className="guide-article__header game-guide-page__header">
              <div className="game-guide-page__hero-row">
                <Image
                  src={guide.avatar}
                  alt=""
                  width={160}
                  height={213}
                  className="game-guide-page__avatar"
                  priority
                />
                <div className="game-guide-page__hero-text">
                  <p className="guide-article__tag">{isEn ? guide.tagEn : guide.tagRu}</p>
                  <h1 className="guide-article__title">{isEn ? guide.titleEn : guide.titleRu}</h1>
                  <p className="guide-article__sub">{isEn ? guide.subtitleEn : guide.subtitleRu}</p>
                </div>
              </div>
              <div className="game-guide-page__kw">
                <p className="game-guide-page__kw-label">
                  {isEn ? 'Also searched as' : 'Также ищут'}
                </p>
                <ul>
                  {(isEn ? guide.keywordsEn : guide.keywordsRu).map((kw) => (
                    <li key={kw}>{kw}</li>
                  ))}
                </ul>
              </div>
              <Link href={playHref} className="btn-cta game-guide-page__demo-cta">
                {isEn ? `Play ${guide.gameSlug.replace(/-/g, ' ')} demo` : `Играть ${guide.gameSlug.replace(/-/g, ' ')} демо`}
              </Link>
            </header>

            {sections.map((section, idx) => {
              const id = slugifyHeading(section.heading, idx)
              return (
                <section key={section.heading} className="guide-section" id={id}>
                  <h2 className="guide-section__heading">
                    <span className="guide-section__num">0{idx + 1}</span>
                    {section.heading}
                  </h2>
                  {section.body && <p className="guide-section__body">{section.body}</p>}
                  {section.body2 && <p className="guide-section__body">{section.body2}</p>}
                  {section.callout && (
                    <aside className="guide-callout">
                      <span className="guide-callout__icon" aria-hidden="true">
                        !
                      </span>
                      <p className="guide-callout__text">{section.callout}</p>
                    </aside>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="guide-bullets" role="list">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="guide-bullets__item">
                          <span className="guide-bullets__dot" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.strategies && section.strategies.length > 0 && (
                    <div className="guide-strategies">
                      {section.strategies.map((s, i) => (
                        <div key={i} className="guide-strategy-card">
                          <p className="guide-strategy-card__title">{s.title}</p>
                          <ul className="guide-bullets" role="list">
                            {s.bullets.map((b, j) => (
                              <li key={j} className="guide-bullets__item">
                                <span className="guide-bullets__dot" aria-hidden="true" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )
            })}

            <ExpertBanner lang={lang} />

            <div className="game-guide-page__end-cta">
              <p>
                {isEn
                  ? 'Ready to test the same mechanics in the browser?'
                  : 'Готовы проверить ту же механику в браузере?'}
              </p>
              <Link href={playHref} className="btn-cta">
                {isEn ? 'Open free demo' : 'Открыть бесплатное демо'}
              </Link>
              <p className="rg-note">
                18+ ·{' '}
                <Link
                  href={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'}
                  className="rg-note__link"
                >
                  {isEn ? 'Gamble responsibly' : 'Играйте ответственно'}
                </Link>
              </p>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
