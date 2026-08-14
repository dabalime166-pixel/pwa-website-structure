'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { REVIEWS, reviewHref } from '@/lib/reviews-data'
import { homeHref, i18n } from '@/lib/games'
import { continueHref } from '@/lib/continue'

export default function ReviewsIndexPage({ lang }: { lang: 'en' | 'ru' }) {
  const isEn = lang === 'en'
  const heading = isEn ? 'Game reviews' : 'Обзоры игр'

  return (
    <div className="review-shell">
      <SiteHeader lang={lang} section="reviews" />
      <main id="main-content" className="review-page review-index">
        <nav aria-label="Breadcrumb" className="review-page__breadcrumb">
          <ol className="breadcrumb">
            <li>
              <Link href={homeHref(lang)}>{isEn ? 'Home' : 'Главная'}</Link>
            </li>
            <li aria-hidden="true" className="breadcrumb-sep">
              /
            </li>
            <li>
              <span className="breadcrumb-current" aria-current="page">
                {isEn ? 'Reviews' : 'Обзоры'}
              </span>
            </li>
          </ol>
        </nav>

        <header className="review-index__hero">
          <div className="review-index__hero-stack">
            <p className="review-index__watermark" aria-hidden="true">
              {heading}
            </p>
            <div className="review-index__hero-copy">
              <h1 className="visually-hidden">{heading}</h1>
              <p className="review-index__lead">
                {isEn
                  ? 'Detailed write-ups with keywords, RTP notes and casino redirects — no demo iframes on these pages.'
                  : 'Подробные тексты с ключами, RTP и редиректом в казино — без демо iframe на этих страницах.'}
              </p>
              <a href={continueHref(lang)} className="review-index__cta">
                {i18n[lang].playReal}
              </a>
            </div>
          </div>
        </header>

        <div className="review-index__grid">
          {REVIEWS.map((r) => (
            <Link key={r.id} href={reviewHref(lang, r.id)} className="review-index__card">
              <div className="review-index__thumb">
                <Image
                  src={r.avatar}
                  alt=""
                  width={128}
                  height={128}
                  sizes="(max-width: 640px) 88px, 128px"
                />
              </div>
              <div className="review-index__body">
                <span className="review-index__tag">{isEn ? r.tagEn : r.tagRu}</span>
                <h2>{isEn ? r.titleEn : r.titleRu}</h2>
                <p>{isEn ? r.subtitleEn : r.subtitleRu}</p>
                <span className="review-index__meta">
                  {r.provider} · RTP {r.rtp}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}
