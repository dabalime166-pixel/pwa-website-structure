'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { REVIEWS, reviewHref } from '@/lib/reviews-data'
import { CTA_URL, homeHref } from '@/lib/games'

export default function ReviewsIndexPage({ lang }: { lang: 'en' | 'ru' }) {
  const isEn = lang === 'en'

  return (
    <>
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
          <h1>{isEn ? 'Game reviews' : 'Обзоры игр'}</h1>
          <p>
            {isEn
              ? 'Detailed write-ups with keywords, RTP notes and casino redirects — no demo iframes on these pages.'
              : 'Подробные тексты с ключами, RTP и редиректом в казино — без демо iframe на этих страницах.'}
          </p>
          <a
            href={CTA_URL}
            rel="noopener noreferrer nofollow sponsored"
            target="_blank"
            className="btn-cta"
          >
            {isEn ? 'Open casino' : 'Открыть казино'}
          </a>
        </header>

        <div className="review-index__grid">
          {REVIEWS.map((r) => (
            <Link key={r.id} href={reviewHref(lang, r.id)} className="review-index__card">
              <Image src={r.avatar} alt="" width={96} height={96} />
              <div>
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
    </>
  )
}
