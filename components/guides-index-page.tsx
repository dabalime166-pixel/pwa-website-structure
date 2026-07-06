'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GUIDES } from '@/lib/guides-data'
import type { Lang } from '@/lib/games'
import { CTA_URL } from '@/lib/games'

const TOPICS = {
  en: [
    {
      id: 'mechanics',
      label: 'Mechanics',
      description: 'Game math, probability and how engines work.',
      guides: ['plinko', 'mines', 'crash'],
    },
    {
      id: 'strategy',
      label: 'Strategy',
      description: 'RTP, volatility, bonuses and advanced tactics.',
      guides: ['rtp', 'bonuses', 'mistakes'],
    },
    {
      id: 'safe-play',
      label: 'Safe Play',
      description: 'Bankroll limits, self-control and responsible gambling.',
      guides: ['responsible', 'myths'],
    },
  ],
  ru: [
    {
      id: 'mechanics',
      label: 'Механики',
      description: 'Математика игр, вероятности и алгоритмы.',
      guides: ['plinko', 'mines', 'crash'],
    },
    {
      id: 'strategy',
      label: 'Стратегия',
      description: 'RTP, волатильность, бонусы и продвинутая тактика.',
      guides: ['rtp', 'bonuses', 'mistakes'],
    },
    {
      id: 'safe-play',
      label: 'Безопасная игра',
      description: 'Банкролл, самоконтроль и ответственная игра.',
      guides: ['responsible', 'myths'],
    },
  ],
}

// Estimated reading time per guide (min)
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

const TOTAL_MIN = Object.values(READ_TIMES).reduce((a, b) => a + b, 0)

interface Props {
  lang: Lang
}

export default function GuidesIndexPage({ lang }: Props) {
  const isEn = lang === 'en'
  const topics = isEn ? TOPICS.en : TOPICS.ru
  const [activeTopic, setActiveTopic] = useState<string | null>(null)

  const featuredGuide = GUIDES.find((g) => g.id === 'crash')!

  const ui = {
    eyebrow: isEn ? 'Academy' : 'Академия',
    heroTitle: isEn ? 'iGaming Strategy Guides' : 'Стратегические гайды iGaming',
    heroSub: isEn
      ? 'Step-by-step guides on game mechanics, RTP, bonuses and responsible gambling'
      : 'Пошаговые гайды по механикам игр, RTP, бонусам и ответственной игре',
    guidesCount: isEn ? `${GUIDES.length} guides` : `${GUIDES.length} гайдов`,
    minRead: isEn ? `${TOTAL_MIN} min read` : `${TOTAL_MIN} мин чтения`,
    topicsLabel: isEn ? `${topics.length} topics` : `${topics.length} темы`,
    startHere: isEn ? 'Start Here' : 'Начните здесь',
    editorsPick: isEn ? "Editor's Pick" : 'Выбор редакции',
    readGuide: isEn ? 'Read Guide →' : 'Читать гайд →',
    topicsHeading: isEn ? 'Topics' : 'Темы',
    ctaBrand: '1weapp',
    ctaBonus: isEn ? 'Same games — play for real' : 'Те же игры — на реальные деньги',
    ctaWelcome: isEn ? 'WELCOME BONUS' : 'ПРИВЕТСТВЕННЫЙ БОНУС',
    ctaPlay: isEn ? 'Play for real' : 'Играть на деньги',
    ctaPromo: isEn ? 'PROMO CODE' : 'ПРОМОКОД',
    ctaCode: 'ADBLOCK',
    ctaCopy: isEn ? 'Copy' : 'Копировать',
    ctaDisclaimer: isEn ? '18+ · Play responsibly' : '18+ · Играйте ответственно',
  }

  return (
    <>
      <SiteHeader lang={lang} />
      <main className="guides-idx">
        {/* ── Hero ── */}
        <header className="guides-idx__hero">
          <div className="guides-idx__hero-inner">
            <span className="guides-idx__eyebrow">{ui.eyebrow}</span>
            <h1 className="guides-idx__title">{ui.heroTitle}</h1>
            <div className="guides-idx__stats" aria-label="Guide stats">
              <span className="guides-idx__stat">{ui.guidesCount}</span>
              <span className="guides-idx__stat-sep" aria-hidden="true" />
              <span className="guides-idx__stat">{ui.minRead}</span>
              <span className="guides-idx__stat-sep" aria-hidden="true" />
              <span className="guides-idx__stat">{ui.topicsLabel}</span>
            </div>
            <p className="guides-idx__sub">{ui.heroSub}</p>
          </div>
        </header>

        <div className="guides-idx__body">
          {/* ── Main column ── */}
          <div className="guides-idx__main">

            {/* Featured guide */}
            <section className="guides-idx__section" aria-labelledby="featured-heading">
              <h2 id="featured-heading" className="guides-idx__section-label">{ui.startHere}</h2>
              <Link
                href={`/${lang}/guides/${featuredGuide.id}`}
                className="guides-idx__featured"
                aria-label={isEn ? featuredGuide.titleEn : featuredGuide.titleRu}
              >
                <div className="guides-idx__featured-icon" aria-hidden="true">
                  {featuredGuide.icon}
                </div>
                <div className="guides-idx__featured-body">
                  <div className="guides-idx__featured-tags">
                    <span className="guides-idx__tag guides-idx__tag--pick">{ui.editorsPick}</span>
                    <span className="guides-idx__tag">{isEn ? featuredGuide.tagEn : featuredGuide.tagRu}</span>
                  </div>
                  <h3 className="guides-idx__featured-title">
                    {isEn ? featuredGuide.titleEn : featuredGuide.titleRu}
                  </h3>
                  <p className="guides-idx__featured-desc">
                    {isEn ? featuredGuide.descriptionEn : featuredGuide.descriptionRu}
                  </p>
                  <div className="guides-idx__featured-footer">
                    <span className="guides-idx__read-time">{READ_TIMES[featuredGuide.id]} {isEn ? 'min' : 'мин'}</span>
                    <span className="guides-idx__read-link">{ui.readGuide}</span>
                  </div>
                </div>
              </Link>
            </section>

            {/* Topic sections */}
            {topics.map((topic) => {
              const isActive = activeTopic === null || activeTopic === topic.id
              const topicGuides = GUIDES.filter((g) => topic.guides.includes(g.id))
              return (
                <section
                  key={topic.id}
                  id={`topic-${topic.id}`}
                  className={`guides-idx__section${!isActive ? ' guides-idx__section--dimmed' : ''}`}
                  aria-labelledby={`topic-heading-${topic.id}`}
                >
                  <div className="guides-idx__topic-header">
                    <div>
                      <h2 id={`topic-heading-${topic.id}`} className="guides-idx__topic-title">
                        {topic.label}
                      </h2>
                      <p className="guides-idx__topic-desc">{topic.description}</p>
                    </div>
                    <span className="guides-idx__topic-count" aria-label={`${topicGuides.length} guides`}>
                      {topicGuides.length}
                    </span>
                  </div>
                  <div className="guides-idx__cards">
                    {topicGuides.map((guide) => (
                      <Link
                        key={guide.id}
                        href={`/${lang}/guides/${guide.id}`}
                        className="guides-idx__card"
                        aria-label={isEn ? guide.titleEn : guide.titleRu}
                      >
                        <div className="guides-idx__card-top">
                          <div className="guides-idx__card-tag-row">
                            <span className="guides-idx__tag">{topic.label}</span>
                            <span className="guides-idx__card-time">{READ_TIMES[guide.id]} {isEn ? 'min' : 'мин'}</span>
                          </div>
                          <span className="guides-idx__card-icon" aria-hidden="true">{guide.icon}</span>
                        </div>
                        <h3 className="guides-idx__card-title">
                          {isEn ? guide.titleEn : guide.titleRu}
                        </h3>
                        <p className="guides-idx__card-desc">
                          {isEn ? guide.descriptionEn : guide.descriptionRu}
                        </p>
                        <span className="guides-idx__card-read">{ui.readGuide}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {/* ── Sidebar ── */}
          <aside className="guides-idx__sidebar" aria-label={isEn ? 'Topics and CTA' : 'Темы и переход'}>
            {/* Topics filter */}
            <div className="guides-idx__sidebar-card">
              <p className="guides-idx__sidebar-heading">{ui.topicsHeading}</p>
              <ul className="guides-idx__topic-list" role="list">
                {topics.map((topic) => {
                  const count = GUIDES.filter((g) => topic.guides.includes(g.id)).length
                  return (
                    <li key={topic.id}>
                      <button
                        className={`guides-idx__topic-btn${activeTopic === topic.id ? ' guides-idx__topic-btn--active' : ''}`}
                        onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                        aria-pressed={activeTopic === topic.id}
                      >
                        <span className="guides-idx__topic-dot" aria-hidden="true" />
                        <span className="guides-idx__topic-btn-label">{topic.label}</span>
                        <span className="guides-idx__topic-btn-count">{count}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* CTA widget */}
            <div className="guides-idx__cta-card">
              <p className="guides-idx__cta-brand">{ui.ctaBrand}</p>
              <p className="guides-idx__cta-sub">{ui.ctaBonus}</p>
              <div className="guides-idx__cta-bonus-box">
                <p className="guides-idx__cta-welcome">{ui.ctaWelcome}</p>
                <p className="guides-idx__cta-amount">500% <span className="guides-idx__cta-fs">+70 FS</span></p>
                <div className="guides-idx__cta-promo-row">
                  <span className="guides-idx__cta-promo-label">{ui.ctaPromo}</span>
                  <span className="guides-idx__cta-promo-code">{ui.ctaCode}</span>
                </div>
              </div>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="guides-idx__cta-btn"
              >
                {ui.ctaPlay}
              </a>
              <p className="guides-idx__cta-disclaimer">{ui.ctaDisclaimer}</p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
