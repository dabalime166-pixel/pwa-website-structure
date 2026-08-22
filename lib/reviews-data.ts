/* ─── Game review pages (no demo iframe) — SEO + casino redirect ─── */

export type ReviewLang = 'en' | 'ru'

export interface ReviewFaq {
  q: string
  a: string
}

export interface ReviewSection {
  heading: string
  body?: string
  body2?: string
  bullets?: string[]
  callout?: string
  steps?: string[]
}

export interface ReviewData {
  id: string
  relatedDemoSlug?: string
  legacyGuideId?: string
  provider: string
  rtp: string
  volatilityEn: string
  volatilityRu: string
  maxWin: string
  releasedEn: string
  releasedRu: string
  avatar: string
  titleEn: string
  titleRu: string
  subtitleEn: string
  subtitleRu: string
  tagEn: string
  tagRu: string
  keywordsEn: string[]
  keywordsRu: string[]
  descriptionEn: string
  descriptionRu: string
  titleSeoEn: string
  titleSeoRu: string
  descriptionSeoEn: string
  descriptionSeoRu: string
  specsEn: string[]
  specsRu: string[]
  prosEn: string[]
  prosRu: string[]
  consEn: string[]
  consRu: string[]
  sections: { en: ReviewSection[]; ru: ReviewSection[] }
  faq: { en: ReviewFaq[]; ru: ReviewFaq[] }
  relatedIds: string[]
}

import reviewsJson from './reviews.json'

export const REVIEWS: ReviewData[] = reviewsJson as ReviewData[]

export function getReviewById(id: string): ReviewData | undefined {
  return REVIEWS.find((r) => r.id === id)
}

export function getReviewByLegacyGuideId(id: string): ReviewData | undefined {
  return REVIEWS.find((r) => r.legacyGuideId === id || r.id === id)
}

export function getReviewByGameSlug(gameSlug: string): ReviewData | undefined {
  return REVIEWS.find((r) => r.relatedDemoSlug === gameSlug || r.id === gameSlug)
}

export function reviewHref(lang: ReviewLang, id?: string): string {
  if (!id) return `/${lang}/reviews`
  return `/${lang}/reviews/${id}`
}
