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
                  <Image src={g.avatar} alt="" width={76} height={102} sizes="(max-width: 639px) 36px, 76px" priority={i < 3} />
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
                    width={128}
                    height={170}
                    sizes="(max-width: 639px) 64px, (max-width: 1023px) 40vw, 200px"
                    className="game-guides-hub__tile-avatar"
                    loading="lazy"
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

const TOC_LABELS = {
  en: ['Quick start', 'How it works', 'Free play tips', 'RTP', 'Checklist'],
  ru: ['С чего начать', 'Как устроено', 'Советы в демо', 'RTP', 'Чеклист'],
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
  const game = getGame(guide.gameSlug)
  const gameName = game?.name ?? guide.gameSlug.replace(/-/g, ' ')
  const tocLabels = isEn ? TOC_LABELS.en : TOC_LABELS.ru
  const displayTitle = isEn ? `${gameName} demo guide` : `Демо-гайд: ${gameName}`
  const displaySub = isEn
    ? `How free play works, what to watch for, and how to practice without a deposit.`
    : `Как устроено бесплатное демо, на что смотреть и как потренироваться без депозита.`

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ) : null}
      <SiteHeader lang={lang} section="guides" gameGuideSlug={guide.id} />
      <main className="gg-page" id="main-content">
        <div className="gg-page__glow" aria-hidden="true" />

        <nav className="gg-crumb" aria-label="Breadcrumb">
          <Link href={homeHref(lang)}>{isEn ? 'Home' : 'Главная'}</Link>
          <span aria-hidden="true">/</span>
          <Link href={isEn ? '/en/guides' : '/ru/guides'}>{isEn ? 'Guides' : 'Гайды'}</Link>
          <span aria-hidden="true">/</span>
          <Link href={indexHref}>{isEn ? 'Games' : 'Игры'}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{gameName}</span>
        </nav>

        <header className="gg-hero">
          <div className="gg-hero__art">
            <Image
              src={guide.avatar}
              alt=""
              width={200}
              height={267}
              sizes="(max-width: 719px) 72px, 200px"
              className="gg-hero__avatar"
              priority
            />
          </div>
          <div className="gg-hero__copy">
            <p className="gg-hero__eyebrow">{isEn ? guide.tagEn : guide.tagRu}</p>
            <h1 className="gg-hero__title">{displayTitle}</h1>
            <p className="gg-hero__sub">{displaySub}</p>
            <div className="gg-hero__actions">
              <Link href={playHref} className="gg-hero__play">
                {isEn ? 'Open free demo' : 'Открыть демо'}
              </Link>
              <Link href={indexHref} className="gg-hero__back">
                {isEn ? 'All game guides' : 'Все гайды по играм'}
              </Link>
            </div>
          </div>
        </header>

        <div className="gg-layout">
          <aside className="gg-toc" aria-label={isEn ? 'On this page' : 'На этой странице'}>
            <p className="gg-toc__label">{isEn ? 'On this page' : 'На странице'}</p>
            <nav className="gg-toc__nav">
              {sections.map((s, i) => (
                <a key={s.heading} href={`#${slugifyHeading(s.heading, i)}`} className="gg-toc__link">
                  <span className="gg-toc__num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{tocLabels[i] ?? s.heading}</span>
                </a>
              ))}
            </nav>
          </aside>

          <article className="gg-article">
            {sections.map((section, idx) => {
              const id = slugifyHeading(section.heading, idx)
              return (
                <section key={section.heading} className="gg-section" id={id}>
                  <h2 className="gg-section__heading">
                    <span className="gg-section__num">{String(idx + 1).padStart(2, '0')}</span>
                    {tocLabels[idx] ?? section.heading}
                  </h2>
                  {section.body && <p className="gg-section__body">{section.body}</p>}
                  {section.body2 && <p className="gg-section__body">{section.body2}</p>}
                  {section.callout && (
                    <aside className="gg-callout">
                      <p>{section.callout}</p>
                    </aside>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="gg-bullets" role="list">
                      {section.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {section.strategies && section.strategies.length > 0 && (
                    <div className="gg-strategies">
                      {section.strategies.map((s, i) => (
                        <div key={i} className="gg-strategy">
                          <p className="gg-strategy__title">{s.title}</p>
                          <ul className="gg-bullets" role="list">
                            {s.bullets.map((b, j) => (
                              <li key={j}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )
            })}

            <details className="gg-keywords">
              <summary>{isEn ? 'Also searched as' : 'Также ищут'}</summary>
              <ul>
                {(isEn ? guide.keywordsEn : guide.keywordsRu).map((kw) => (
                  <li key={kw}>{kw}</li>
                ))}
              </ul>
            </details>

            <ExpertBanner lang={lang} />

            <div className="gg-end">
              <p className="gg-end__text">
                {isEn
                  ? `Try ${gameName} in free demo — same rules, virtual balance.`
                  : `Попробуйте ${gameName} в бесплатном демо — те же правила, виртуальный баланс.`}
              </p>
              <Link href={playHref} className="gg-hero__play">
                {isEn ? 'Open free demo' : 'Открыть демо'}
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
