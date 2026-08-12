'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ExpertBanner } from '@/components/expert-banner'
import {
  REVIEW_CASINO_OFFERS,
  REVIEWS,
  getReviewById,
  reviewHref,
  type ReviewSection,
} from '@/lib/reviews-data'
import { CTA_URL, homeHref } from '@/lib/games'

function slugifyHeading(text: string, idx: number): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
  return `s${idx + 1}-${base || 'section'}`
}

function ReviewSectionBlock({ section, idx }: { section: ReviewSection; idx: number }) {
  const id = slugifyHeading(section.heading, idx)
  return (
    <section className="review-section" id={id}>
      <h2 className="review-section__heading">{section.heading}</h2>
      {section.body && <p className="review-section__body">{section.body}</p>}
      {section.body2 && <p className="review-section__body">{section.body2}</p>}
      {section.callout && (
        <aside className="review-callout">
          <p>{section.callout}</p>
        </aside>
      )}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="review-bullets" role="list">
          {section.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {section.steps && section.steps.length > 0 && (
        <ol className="review-steps">
          {section.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default function ReviewSinglePage({
  slug,
  lang,
  jsonLd,
}: {
  slug: string
  lang: 'en' | 'ru'
  jsonLd?: string
}) {
  const isEn = lang === 'en'
  const review = getReviewById(slug)
  if (!review) return null

  const sections = isEn ? review.sections.en : review.sections.ru
  const faq = isEn ? review.faq.en : review.faq.ru
  const title = isEn ? review.titleEn : review.titleRu
  const subtitle = isEn ? review.subtitleEn : review.subtitleRu
  const tag = isEn ? review.tagEn : review.tagRu
  const keywords = isEn ? review.keywordsEn : review.keywordsRu
  const specs = isEn ? review.specsEn : review.specsRu
  const pros = isEn ? review.prosEn : review.prosRu
  const cons = isEn ? review.consEn : review.consRu
  const related = (() => {
    const seen = new Set<string>([slug])
    const out: typeof REVIEWS = []
    for (const id of review.relatedIds) {
      const r = getReviewById(id)
      if (r && !seen.has(r.id)) {
        seen.add(r.id)
        out.push(r)
      }
    }
    for (const r of REVIEWS) {
      if (out.length >= 4) break
      if (!seen.has(r.id)) {
        seen.add(r.id)
        out.push(r)
      }
    }
    return out
  })()

  return (
    <div className="review-shell">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      )}
      <SiteHeader lang={lang} section="reviews" reviewSlug={slug} />

      <main id="main-content" className="review-page">
        <nav aria-label="Breadcrumb" className="review-page__breadcrumb">
          <ol className="breadcrumb">
            <li>
              <Link href={homeHref(lang)}>{isEn ? 'Home' : 'Главная'}</Link>
            </li>
            <li aria-hidden="true" className="breadcrumb-sep">
              /
            </li>
            <li>
              <Link href={reviewHref(lang)}>{isEn ? 'Reviews' : 'Обзоры'}</Link>
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

        <header className="review-hero">
          <div className="review-hero__media">
            <Image
              src={review.avatar}
              alt={title}
              width={160}
              height={160}
              className="review-hero__avatar"
              priority
            />
          </div>
          <div className="review-hero__copy">
            <span className="review-hero__eyebrow">{tag}</span>
            <h1 className="review-hero__title">{title}</h1>
            <p className="review-hero__sub">{subtitle}</p>
            <dl className="review-hero__meta">
              <div>
                <dt>{isEn ? 'Provider' : 'Провайдер'}</dt>
                <dd>{review.provider}</dd>
              </div>
              <div>
                <dt>RTP</dt>
                <dd>{review.rtp}</dd>
              </div>
              <div>
                <dt>{isEn ? 'Volatility' : 'Волатильность'}</dt>
                <dd>{isEn ? review.volatilityEn : review.volatilityRu}</dd>
              </div>
              <div>
                <dt>{isEn ? 'Released' : 'Релиз'}</dt>
                <dd>{isEn ? review.releasedEn : review.releasedRu}</dd>
              </div>
            </dl>
            <div className="review-hero__keys" aria-label={isEn ? 'Focus phrases' : 'Фокус-фразы'}>
              {keywords.map((k) => (
                <span key={k} className="review-hero__key">
                  {k}
                </span>
              ))}
            </div>
            <div className="review-hero__actions">
              <a href="#top-casino" className="btn-cta">
                {isEn ? 'Play for real money' : 'Играть на деньги'}
              </a>
              <p className="review-hero__note">
                {isEn
                  ? 'No demo on this page · review + casino redirect only'
                  : 'Без демо на этой странице · только обзор и редирект в казино'}
              </p>
            </div>
          </div>
        </header>

        <ul className="review-specs" role="list">
          {specs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className="review-layout">
          <aside className="review-toc" aria-label={isEn ? 'Contents' : 'Содержание'}>
            <p className="review-toc__label">{isEn ? 'On this page' : 'На этой странице'}</p>
            <ol className="review-toc__list">
              {sections.map((s, i) => (
                <li key={i}>
                  <a href={`#${slugifyHeading(s.heading, i)}`}>{s.heading}</a>
                </li>
              ))}
              <li>
                <a href="#top-casino">{isEn ? 'Top casinos' : 'Топ казино'}</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ol>
            <div className="review-toc__cta">
              <p>
                {isEn
                  ? 'Ready to play for real? Open a licensed casino below.'
                  : 'Готовы играть на деньги? Откройте лицензированное казино ниже.'}
              </p>
              <a
                href={CTA_URL}
                rel="noopener noreferrer nofollow sponsored"
                target="_blank"
                className="btn-cta"
              >
                {isEn ? 'Go to casino' : 'Перейти в казино'}
              </a>
              <p className="review-toc__legal">
                {isEn ? '18+ · Gamble responsibly' : '18+ · Играйте ответственно'}
              </p>
            </div>
          </aside>

          <article className="review-article" aria-label={title}>
            {sections.map((section, i) => (
              <ReviewSectionBlock key={i} section={section} idx={i} />
            ))}

            <section className="review-proscons" aria-labelledby="proscons-heading">
              <h2 id="proscons-heading">{isEn ? 'Pros & cons' : 'Плюсы и минусы'}</h2>
              <div className="review-proscons__grid">
                <div>
                  <h3>{isEn ? 'Pros' : 'Плюсы'}</h3>
                  <ul>
                    {pros.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{isEn ? 'Cons' : 'Минусы'}</h3>
                  <ul>
                    {cons.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="review-casinos" id="top-casino" aria-labelledby="casino-heading">
              <h2 id="casino-heading">
                {isEn ? 'Top casinos to play for real money' : 'Топ казино для игры на деньги'}
              </h2>
              <p className="review-casinos__lead">
                {isEn
                  ? `Pick a shortlisted casino, claim a welcome path, search “${review.titleEn.replace(' Review', '')}” in the lobby, and launch on a real balance.`
                  : `Выберите казино из шортлиста, заберите welcome, найдите «${review.titleRu.replace('Обзор ', '')}» в лобби и запустите на реальном балансе.`}
              </p>
              <div className="review-casinos__grid">
                {REVIEW_CASINO_OFFERS.map((offer) => (
                  <a
                    key={offer.id}
                    href={CTA_URL}
                    rel="noopener noreferrer nofollow sponsored"
                    target="_blank"
                    className={`review-casino-card${offer.highlight ? ' review-casino-card--hot' : ''}`}
                  >
                    <div className="review-casino-card__top">
                      <span className="review-casino-card__badge">
                        {isEn ? offer.badgeEn : offer.badgeRu}
                      </span>
                      <span className="review-casino-card__rating">{offer.rating}</span>
                    </div>
                    <p className="review-casino-card__name">{offer.name}</p>
                    <p className="review-casino-card__bonus">
                      {isEn ? offer.bonusEn : offer.bonusRu}
                    </p>
                    <p className="review-casino-card__note">
                      {isEn ? offer.noteEn : offer.noteRu}
                    </p>
                    <span className="review-casino-card__cta">
                      {isEn ? 'Play now' : 'Играть'}
                    </span>
                    <span className="review-casino-card__legal">
                      {isEn ? '18+ · Play responsibly · T&C apply' : '18+ · Играйте ответственно · Условия'}
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section className="review-faq" id="faq" aria-labelledby="faq-heading">
              <h2 id="faq-heading">{isEn ? 'FAQ' : 'FAQ'}</h2>
              <div className="review-faq__list">
                {faq.map((item) => (
                  <details key={item.q} className="review-faq__item">
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <ExpertBanner lang={lang} />
          </article>
        </div>

        {related.length > 0 && (
          <section className="review-related" aria-labelledby="related-heading">
            <h2 id="related-heading">{isEn ? 'More reviews' : 'Ещё обзоры'}</h2>
            <div className="review-related__grid">
              {related.map((r) => (
                <Link key={r.id} href={reviewHref(lang, r.id)} className="review-related__card">
                  <Image src={r.avatar} alt="" width={72} height={72} />
                  <span>
                    <strong>{isEn ? r.titleEn : r.titleRu}</strong>
                    <em>{isEn ? r.subtitleEn : r.subtitleRu}</em>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
