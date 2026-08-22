/* ─── Types ─── */
export interface Section {
  heading: string
  body?: string
  body2?: string
  formula?: string
  bullets?: string[]
  callout?: string
  strategies?: { title: string; bullets: string[] }[]
}

export interface GuideData {
  id: string
  slug: string
  icon: string
  titleRu: string
  titleEn: string
  subtitleRu: string
  subtitleEn: string
  tagRu: string
  tagEn: string
  keywordsRu: string[]
  keywordsEn: string[]
  descriptionRu: string
  descriptionEn: string
  titleSeoRu?: string
  titleSeoEn?: string
  descriptionSeoRu?: string
  descriptionSeoEn?: string
  /** ISO date YYYY-MM-DD — first public version */
  publishedAt?: string
  /** ISO date YYYY-MM-DD — last substantive content edit */
  updatedAt?: string
  sections: { ru: Section[]; en: Section[] }
}

import guidesJson from './guides.json'

export const GUIDES: GuideData[] = guidesJson as GuideData[]

export function getGuide(slug: string): GuideData | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
