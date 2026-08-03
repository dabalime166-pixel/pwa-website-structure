'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ExpertBanner } from '@/components/expert-banner'
import { GUIDES } from '@/lib/guides-data'
import type { Lang } from '@/lib/games'
import { CTA_URL } from '@/lib/games'

const TOPICS = {
  en: [
    {
      id: 'all',
      label: 'All',
      description: 'Full strategy library',
      guides: GUIDES.map((g) => g.id),
    },
    {
      id: 'mechanics',
      label: 'Mechanics',
      description: 'Math, probability and engines',
      guides: ['plinko', 'mines', 'crash'],
    },
    {
      id: 'strategy',
      label: 'Strategy',
      description: 'RTP, bonuses and tactics',
      guides: ['rtp', 'bonuses', 'mistakes'],
    },
    {
      id: 'safe-play',
      label: 'Safe play',
      description: 'Limits and responsible habits',
      guides: ['responsible', 'myths'],
    },
  ],
  ru: [
    {
      id: 'all',
      label: 'Все',
      description: 'Вся библиотека гайдов',
      guides: GUIDES.map((g) => g.id),
    },
    {
      id: 'mechanics',
      label: 'Механики',
      description: 'Математика и алгоритмы',
      guides: ['plinko', 'mines', 'crash'],
    },
    {
      id: 'strategy',
      label: 'Стратегия',
      description: 'RTP, бонусы и тактика',
      guides: ['rtp', 'bonuses', 'mistakes'],
    },
    {
      id: 'safe-play',
      label: 'Безопасная игра',
      description: 'Лимиты и самоконтроль',
      guides: ['responsible', 'myths'],
    },
  ],
}

const READ_TIMES: Record<string, number> = {
  plinko: 6,
  mines: 5,
  crash: 7,
  rtp: 5,
  bonuses: 6,
  mistakes: 5,
  responsible: 4,
  myths: 5,
}

interface Props {
  lang: Lang
}

export default function GuidesIndexPage({ lang }: Props) {
  const isEn = lang === 'en'
  const topics = isEn ? TOPICS.en : TOPICS.ru
  const [activeTopic, setActiveTopic] = useState('all')

  const featuredGuide = GUIDES.find((g) => g.id === 'crash') ?? GUIDES[0]

  const visibleGuides = useMemo(() => {
    const topic = topics.find((t) => t.id === activeTopic) ?? topics[0]
    return GUIDES.filter((g) => topic.guides.includes(g.id))
  }, [activeTopic, topics])

  const ui = {
    brand: '1weapp',
    eyebrow: isEn ? 'Guides' : 'Гайды',
    heroTitle: isEn ? 'Play smarter with strategy guides' : 'Играй умнее со стратегическими гайдами',
    heroSub: isEn
      ? 'Clear breakdowns of crash math, slot RTP, bonuses and safer play — built for demo-first learning.'
      : 'Понятные разборы краш-математики, RTP слотов, бонусов и безопасной игры — сначала демо, потом решения.',
    featuredLabel: isEn ? 'Start here' : 'Начните здесь',
    read: isEn ? 'Read guide' : 'Читать гайд',
    library: isEn ? 'Guide library' : 'Библиотека гайдов',
    gamesSection: isEn ? 'Guides by game' : 'Гайды по играм',
    gamesSectionSub: isEn
      ? 'Hot mid/low-frequency headlines for popular demos'
      : 'Горячие СЧ/НЧ-заголовки под популярные демо',
    min: isEn ? 'min' : 'мин',
    ctaTitle: isEn ? 'Tried the theory?' : 'Теория освоена?',
    ctaSub: isEn
      ? 'Open the same games in demo, then continue for real if it fits your style.'
      : 'Откройте те же игры в демо — и переходите на деньги, если формат вам подходит.',
    ctaBtn: isEn ? 'Play for real money' : 'Играть на реальные деньги',
    legal: isEn ? '18+ · Gamble responsibly' : '18+ · Играйте ответственно',
  }

  return (
    <>
      <SiteHeader lang={lang} section="guides" />

      <main className="guides-hub">
        <section className="guides-hub__hero" aria-label={ui.eyebrow}>
          <div className="guides-hub__hero-bg" aria-hidden="true" />
          <div className="guides-hub__hero-inner">
            <p className="guides-hub__brand anim-fade-up">
              <span className="guides-hub__brand-main">{ui.brand.slice(0, 3)}</span>
              <span className="guides-hub__brand-accent">{ui.brand.slice(3)}</span>
            </p>
            <p className="guides-hub__eyebrow anim-fade-up anim-delay-1">{ui.eyebrow}</p>
            <h1 className="guides-hub__title anim-fade-up anim-delay-2">{ui.heroTitle}</h1>
            <p className="guides-hub__sub anim-fade-up anim-delay-3">{ui.heroSub}</p>
          </div>
        </section>

        <section className="guides-hub__featured" aria-labelledby="guides-featured-heading">
          <div className="guides-hub__section-head">
            <span className="guides-hub__label">{ui.featuredLabel}</span>
            <h2 id="guides-featured-heading" className="guides-hub__heading">
              {isEn ? featuredGuide.titleEn : featuredGuide.titleRu}
            </h2>
          </div>

          <Link
            href={`/${lang}/guides/${featuredGuide.id}`}
            className="guides-hub__feature-card"
          >
            <div className="guides-hub__feature-meta">
              <span className="card-badge card-badge--type">
                {isEn ? featuredGuide.tagEn : featuredGuide.tagRu}
              </span>
              <span className="guides-hub__time">
                {READ_TIMES[featuredGuide.id] ?? 5} {ui.min}
              </span>
            </div>
            <p className="guides-hub__feature-desc">
              {isEn ? featuredGuide.descriptionEn : featuredGuide.descriptionRu}
            </p>
            <span className="guides-hub__feature-cta">
              {ui.read}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </section>

        <section className="guides-hub__featured game-guides-promo" aria-labelledby="game-guides-heading">
          <div className="guides-hub__section-head">
            <span className="guides-hub__label">{ui.gamesSection}</span>
            <h2 id="game-guides-heading" className="guides-hub__heading">
              {ui.gamesSectionSub}
            </h2>
          </div>
          <Link
            href={isEn ? '/en/guides/games' : '/ru/guides/games'}
            className="guides-hub__feature-card game-guides-promo__card"
          >
            <div className="guides-hub__feature-meta">
              <span className="card-badge card-badge--type">
                {isEn ? 'New section' : 'Новый раздел'}
              </span>
            </div>
            <p className="guides-hub__feature-desc">
              {isEn
                ? 'Test article live: Gates of Olympus demo no registration — multipliers, free spins, RTP.'
                : 'Уже в тесте: Gates of Olympus демо без регистрации — множители, фриспины, RTP.'}
            </p>
            <span className="guides-hub__feature-cta">
              {isEn ? 'Open game guides' : 'Открыть гайды по играм'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </section>

        <section className="guides-hub__library" aria-labelledby="guides-library-heading">
          <div className="guides-hub__section-head">
            <span className="guides-hub__label">{ui.library}</span>
            <h2 id="guides-library-heading" className="guides-hub__heading">
              {GUIDES.length} {isEn ? 'guides' : 'гайдов'}
            </h2>
          </div>

          <div className="guides-hub__chips" role="tablist" aria-label={isEn ? 'Topics' : 'Темы'}>
            {topics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                role="tab"
                aria-selected={activeTopic === topic.id}
                className={`filter-chip ${activeTopic === topic.id ? 'is-active' : ''}`}
                onClick={() => setActiveTopic(topic.id)}
              >
                {topic.label}
              </button>
            ))}
          </div>

          <div className="guides-hub__grid">
            {visibleGuides.map((guide, index) => (
              <Link
                key={guide.id}
                href={`/${lang}/guides/${guide.id}`}
                className="guides-hub__card anim-fade-up"
                style={{ animationDelay: `${Math.min(index, 7) * 0.05}s` }}
              >
                <div className="guides-hub__card-top">
                  <span className="guides-hub__card-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="guides-hub__time">
                    {READ_TIMES[guide.id] ?? 5} {ui.min}
                  </span>
                </div>
                <h3 className="guides-hub__card-title">
                  {isEn ? guide.titleEn : guide.titleRu}
                </h3>
                <p className="guides-hub__card-desc">
                  {isEn ? guide.subtitleEn : guide.subtitleRu}
                </p>
                <div className="guides-hub__card-keys" aria-hidden="true">
                  {(isEn ? guide.keywordsEn : guide.keywordsRu).slice(0, 2).map((k) => (
                    <span key={k} className="guides-hub__card-key">
                      {k}
                    </span>
                  ))}
                </div>
                <span className="guides-hub__card-tag">
                  {isEn ? guide.tagEn : guide.tagRu}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="guides-hub__expert">
          <ExpertBanner lang={lang} />
        </div>

        <section className="guides-hub__cta" aria-label={ui.ctaTitle}>
          <div className="guides-hub__cta-inner">
            <h2 className="guides-hub__cta-title">{ui.ctaTitle}</h2>
            <p className="guides-hub__cta-sub">{ui.ctaSub}</p>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="btn-cta"
            >
              {ui.ctaBtn}
            </a>
            <p className="guides-hub__cta-legal">{ui.legal}</p>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
