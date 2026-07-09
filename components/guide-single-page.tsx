'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GUIDES } from '@/lib/guides-data';
import { cleanPathname } from '@/lib/games';
import type { Guide } from '@/lib/guides-data';

/* ─── Section Renderer (shared) ─── */
function GuideSection({ section, idx }: { section: Guide['sections']['en'][number]; idx: number }) {
  return (
    <div className="guide-section">
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
        <div className="guide-callout">
          <span className="guide-callout__icon" aria-hidden="true">!</span>
          <p className="guide-callout__text">{section.callout}</p>
        </div>
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
    </div>
  );
}

/* ─── Individual Guide Page ─── */
export default function GuideSinglePage({
  slug,
  lang,
}: {
  slug: string;
  lang: 'en' | 'ru';
}) {
  const isEn = lang === 'en';
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const guide = GUIDES.find((g) => g.id === slug);
  if (!guide) return null;

  const sections = isEn ? guide.sections.en : guide.sections.ru;
  const title    = isEn ? guide.titleEn    : guide.titleRu;
  const subtitle = isEn ? guide.subtitleEn : guide.subtitleRu;
  const tag      = isEn ? guide.tagEn      : guide.tagRu;

  return (
    <main className="guides-main">

      {/* ── Sticky top bar ── */}
      <div className="guides-topbar">
        <div className="guides-topbar__inner">

          {/* Back to guides index */}
          <Link
            href={`/${lang}/guides`}
            className="guides-back__link"
            aria-label={isEn ? 'Back to guides' : 'Назад к гайдам'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="guides-back__label">{isEn ? 'Guides' : 'Гайды'}</span>
          </Link>

          <span aria-hidden="true" className="guides-topbar__sep" />

          {/* Guide picker dropdown */}
          <div className="guides-dropdown" style={{ position: 'relative' }}>
            <button
              className="guides-dropdown__trigger"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label={isEn ? 'Switch guide' : 'Сменить гайд'}
            >
              <span className="guides-dropdown__icon" aria-hidden="true">{guide.icon}</span>
              <span className="guides-dropdown__current">{title}</span>
              <svg
                className={`guides-dropdown__chevron${dropdownOpen ? ' guides-dropdown__chevron--open' : ''}`}
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
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
                <ul className="guides-dropdown__menu" role="listbox"
                  aria-label={isEn ? 'All guides' : 'Все гайды'}>
                  {GUIDES.map((g) => (
                    <li key={g.id} role="option" aria-selected={g.id === slug}>
                      <Link
                        href={`/${lang}/guides/${g.id}`}
                        className={`guides-dropdown__item${g.id === slug ? ' guides-dropdown__item--active' : ''}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="guides-dropdown__item-icon" aria-hidden="true">{g.icon}</span>
                        <span className="guides-dropdown__item-text">
                          <span className="guides-dropdown__item-title">
                            {isEn ? g.titleEn : g.titleRu}
                          </span>
                          <span className="guides-dropdown__item-tag">
                            {isEn ? g.tagEn : g.tagRu}
                          </span>
                        </span>
                        {g.id === slug && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                            strokeLinejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div style={{ flex: 1 }} />

          {/* Language switcher */}
          <nav aria-label={isEn ? 'Language' : 'Язык'} className="guides-topbar__lang">
            <Link
              href={`/en/guides/${slug}`}
              hrefLang="en"
              className={`lang-btn${isEn ? ' active' : ''}`}
              aria-current={isEn ? 'true' : undefined}
            >
              EN
            </Link>
            <Link
              href={`/ru/guides/${slug}`}
              hrefLang="ru"
              className={`lang-btn${!isEn ? ' active' : ''}`}
              aria-current={!isEn ? 'true' : undefined}
            >
              RU
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <header className="guides-hero">
        <span className="guides-hero__eyebrow">{tag}</span>
        <h1 className="guides-hero__title">{title}</h1>
        <p className="guides-hero__sub">{subtitle}</p>
      </header>

      {/* Content */}
      <div className="guides-content-wrap">

        {/* Sidebar — table of contents */}
        <aside className="guides-sidebar" aria-label={isEn ? 'Contents' : 'Содержание'}>
          <div className="guides-sidebar__card">
            <span className="guides-sidebar__icon" aria-hidden="true">{guide.icon}</span>
            <p className="guides-sidebar__tag">{tag}</p>
            <p className="guides-sidebar__title">{title}</p>
            <p className="guides-sidebar__sub">{subtitle}</p>
            <ol className="guides-sidebar__toc" aria-label={isEn ? 'Table of contents' : 'Содержание'}>
              {sections.map((s, i) => (
                <li key={i} className="guides-sidebar__toc-item">
                  <span className="guides-sidebar__toc-num">0{i + 1}</span>
                  <span className="guides-sidebar__toc-label">{s.heading}</span>
                </li>
              ))}
            </ol>

            {/* Prev / Next */}
            <div className="guide-single__nav">
              {(() => {
                const idx = GUIDES.findIndex((g) => g.id === slug);
                const prev = GUIDES[idx - 1];
                const next = GUIDES[idx + 1];
                return (
                  <>
                    {prev && (
                      <Link href={`/${lang}/guides/${prev.id}`} className="guide-single__nav-link">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                          strokeLinejoin="round" aria-hidden="true">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                        {isEn ? prev.titleEn : prev.titleRu}
                      </Link>
                    )}
                    {next && (
                      <Link href={`/${lang}/guides/${next.id}`} className="guide-single__nav-link guide-single__nav-link--next">
                        {isEn ? next.titleEn : next.titleRu}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                          strokeLinejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </aside>

        {/* Article */}
        <article className="guides-article" aria-label={title}>
          {sections.map((section, idx) => (
            <GuideSection key={idx} section={section} idx={idx} />
          ))}

          {/* Bottom prev/next for mobile */}
          <div className="guide-single__bottom-nav">
            {(() => {
              const idx = GUIDES.findIndex((g) => g.id === slug);
              const prev = GUIDES[idx - 1];
              const next = GUIDES[idx + 1];
              return (
                <div className="guide-single__bottom-row">
                  {prev ? (
                    <Link href={`/${lang}/guides/${prev.id}`} className="guide-single__bottom-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      <span>
                        <span className="guide-single__bottom-label">{isEn ? 'Previous' : 'Назад'}</span>
                        <span className="guide-single__bottom-title">
                          {isEn ? prev.titleEn : prev.titleRu}
                        </span>
                      </span>
                    </Link>
                  ) : <div />}
                  {next ? (
                    <Link href={`/${lang}/guides/${next.id}`} className="guide-single__bottom-btn guide-single__bottom-btn--next">
                      <span>
                        <span className="guide-single__bottom-label">{isEn ? 'Next' : 'Далее'}</span>
                        <span className="guide-single__bottom-title">
                          {isEn ? next.titleEn : next.titleRu}
                        </span>
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  ) : <div />}
                </div>
              );
            })()}
          </div>
        </article>
      </div>
    </main>
  );
}
