'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ExpertBanner } from '@/components/expert-banner'
import { GUIDES } from '@/lib/guides-data'
import type { Section } from '@/lib/guides-data'
import { CTA_URL, homeHref } from '@/lib/games'

function slugifyHeading(text: string, idx: number): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
  return `s${idx + 1}-${base || 'section'}`
}

function GuideSection({ section, idx }: { section: Section; idx: number }) {
  const id = slugifyHeading(section.heading, idx)
  return (
    <section className="guide-section" id={id}>
      <h2 className="guide-section__heading">
        <span className="guide-section__num">0{idx + 1}</span>
        {section.heading}
      </h2>
      {section.body && <p className="guide-section__body">{section.body}</p>}
      {section.formula && (
        <div className="guide-formula">
          <span className="guide-formula__label">Formula</span>
          <code className="guide-formula__code">{section.formula}</code>
        </div>
      )}
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
}

export default function GuideSinglePage({
  slug,
  lang,
  jsonLd,
}: {
  slug: string
  lang: 'en' | 'ru'
  jsonLd?: string
}) {
  const isEn = lang === 'en'
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const guide = GUIDES.find((g) => g.id === slug)
  if (!guide) return null

  const sections = isEn ? guide.sections.en : guide.sections.ru
  const title = isEn ? guide.titleEn : guide.titleRu
  const subtitle = isEn ? guide.subtitleEn : guide.subtitleRu
  const tag = isEn ? guide.tagEn : guide.tagRu
  const keywords = isEn ? guide.keywordsEn : guide.keywordsRu
  const idx = GUIDES.findIndex((g) => g.id === slug)
  const prev = GUIDES[idx - 1]
  const next = GUIDES[idx + 1]
  const related = GUIDES.filter((g) => g.id !== slug).slice(
    Math.max(0, idx - 1),
    Math.max(0, idx - 1) + 3
  )

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
      <SiteHeader lang={lang} />

      <main id="main-content" className="guide-page">
        <div className="guide-page__glow" aria-hidden="true" />

        <nav aria-label="Breadcrumb" className="guide-page__breadcrumb">
          <ol className="breadcrumb">
            <li>
              <Link href={homeHref(lang)}>{isEn ? 'Home' : 'Главная'}</Link>
            </li>
            <li aria-hidden="true" className="breadcrumb-sep">
              /
            </li>
            <li>
              <Link href={`/${lang}/guides`}>{isEn ? 'Guides' : 'Гайды'}</Link>
            </li>
            <li aria-hidden="true" className="breadcrumb-sep">
              /
            </li>
            <li>
              <span className="breadcrumb-current" aria-current="page">
                {title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="guide-page__toolbar">
          <div className="guides-dropdown" style={{ position: 'relative' }}>
            <button
              type="button"
              className="guides-dropdown__trigger"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label={isEn ? 'Switch guide' : 'Сменить гайд'}
            >
              <span className="guides-dropdown__icon" aria-hidden="true">
                {guide.icon}
              </span>
              <span className="guides-dropdown__current">{title}</span>
              <svg
                className={`guides-dropdown__chevron${dropdownOpen ? ' guides-dropdown__chevron--open' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="guides-dropdown__backdrop"
                  onClick={() => setDropdownOpen(false)}
                  aria-hidden="true"
                />
                <ul
                  className="guides-dropdown__menu"
                  role="listbox"
                  aria-label={isEn ? 'All guides' : 'Все гайды'}
                >
                  {GUIDES.map((g) => (
                    <li key={g.id} role="option" aria-selected={g.id === slug}>
                      <Link
                        href={`/${lang}/guides/${g.id}`}
                        className={`guides-dropdown__item${g.id === slug ? ' guides-dropdown__item--active' : ''}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="guides-dropdown__item-icon" aria-hidden="true">
                          {g.icon}
                        </span>
                        <span className="guides-dropdown__item-text">
                          <span className="guides-dropdown__item-title">
                            {isEn ? g.titleEn : g.titleRu}
                          </span>
                          <span className="guides-dropdown__item-tag">
                            {isEn ? g.tagEn : g.tagRu}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <p className="guide-page__readtime">
            {isEn
              ? `${Math.max(3, sections.length + 1)} min read`
              : `${Math.max(3, sections.length + 1)} мин чтения`}
          </p>
        </div>

        <header className="guide-hero">
          <span className="guide-hero__eyebrow">{tag}</span>
          <h1 className="guide-hero__title">{title}</h1>
          <p className="guide-hero__sub">{subtitle}</p>

          <div className="guide-hero__keys" aria-label={isEn ? 'Focus phrases' : 'Фокус-фразы'}>
            {keywords.map((k) => (
              <span key={k} className="guide-hero__key">
                {k}
              </span>
            ))}
          </div>
        </header>

        <div className="guide-layout">
          <aside className="guide-toc" aria-label={isEn ? 'Contents' : 'Содержание'}>
            <p className="guide-toc__label">{isEn ? 'On this page' : 'На этой странице'}</p>
            <ol className="guide-toc__list">
              {sections.map((s, i) => (
                <li key={i}>
                  <a href={`#${slugifyHeading(s.heading, i)}`} className="guide-toc__link">
                    <span className="guide-toc__num">0{i + 1}</span>
                    <span>{s.heading}</span>
                  </a>
                </li>
              ))}
            </ol>

            <div className="guide-toc__cta">
              <p>
                {isEn
                  ? 'Practice the idea in a free demo first.'
                  : 'Сначала отработайте идею в бесплатном демо.'}
              </p>
              <a
                href={CTA_URL}
                rel="noopener noreferrer nofollow sponsored"
                target="_blank"
                className="btn-cta"
              >
                {isEn ? 'Play for Real Money' : 'Играть на деньги'}
              </a>
              <p className="guide-toc__legal">
                {isEn ? '18+ · Gamble responsibly' : '18+ · Играйте ответственно'}
              </p>
            </div>
          </aside>

          <article className="guide-article" aria-label={title}>
            <div className="guide-takeaway">
              <p className="guide-takeaway__label">
                {isEn ? 'What you will learn' : 'Что вы узнаете'}
              </p>
              <ul className="guide-takeaway__list">
                {keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>

            {sections.map((section, i) => (
              <GuideSection key={i} section={section} idx={i} />
            ))}

            <div className="guide-article__footer">
              <p>
                {isEn
                  ? 'Use demos to verify timing and volatility before any real-money decision.'
                  : 'Проверяйте темп и волатильность в демо до любых решений на деньги.'}
              </p>
              <p className="guide-toc__legal">
                {isEn ? '18+ · Gamble responsibly · T&C apply' : '18+ · Играйте ответственно · Применяются условия'}
              </p>
            </div>

            <ExpertBanner lang={lang} />

            <nav className="guide-pager" aria-label={isEn ? 'Guide navigation' : 'Навигация по гайдам'}>
              {prev ? (
                <Link href={`/${lang}/guides/${prev.id}`} className="guide-pager__link">
                  <span className="guide-pager__dir">{isEn ? 'Previous' : 'Назад'}</span>
                  <span className="guide-pager__title">{isEn ? prev.titleEn : prev.titleRu}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/${lang}/guides/${next.id}`}
                  className="guide-pager__link guide-pager__link--next"
                >
                  <span className="guide-pager__dir">{isEn ? 'Next' : 'Далее'}</span>
                  <span className="guide-pager__title">{isEn ? next.titleEn : next.titleRu}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>

        {related.length > 0 && (
          <section className="guide-related" aria-labelledby="guide-related-heading">
            <div className="guide-related__head">
              <span className="guide-related__label">{isEn ? 'Keep learning' : 'Читать дальше'}</span>
              <h2 id="guide-related-heading" className="guide-related__title">
                {isEn ? 'Related guides' : 'Похожие гайды'}
              </h2>
            </div>
            <div className="guide-related__grid">
              {related.map((g) => (
                <Link key={g.id} href={`/${lang}/guides/${g.id}`} className="guide-related__card">
                  <span className="guide-related__icon" aria-hidden="true">
                    {g.icon}
                  </span>
                  <span className="guide-related__card-title">
                    {isEn ? g.titleEn : g.titleRu}
                  </span>
                  <span className="guide-related__card-sub">
                    {isEn ? g.subtitleEn : g.subtitleRu}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
