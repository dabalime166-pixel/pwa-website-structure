import 'server-only'

import seoData from './games-seo.json'
import { games, getGame } from '@/lib/games'
import type { GameFull, Lang } from '@/lib/games'

type SeoRecord = {
  iframeUrl: string
  keywordsRu: string
  keywordsEn: string
  seoTextRu: string
  seoTextEn: string
  titleSeoEn?: string
  titleSeoRu?: string
  descriptionSeoEn?: string
  descriptionSeoRu?: string
}

const seoBySlug = seoData as Record<string, SeoRecord>

export function getGameFull(slug: string): GameFull | undefined {
  const base = getGame(slug)
  const seo = seoBySlug[slug]
  if (!base || !seo) return undefined
  return { ...base, ...seo }
}

export function getKeywords(game: GameFull, lang: Lang): string[] {
  const raw = lang === 'ru' ? game.keywordsRu : game.keywordsEn
  return raw
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 10)
}

export function getSeoText(game: GameFull, lang: Lang): string {
  return lang === 'ru' ? game.seoTextRu : game.seoTextEn
}

export function getSeoTitle(game: GameFull, lang: Lang): string {
  const custom = lang === 'ru' ? game.titleSeoRu : game.titleSeoEn
  if (custom) return custom
  return lang === 'ru'
    ? `${game.name} — Играть в демо онлайн`
    : `${game.name} Demo — Play Free Online`
}

export function getSeoDescription(game: GameFull, lang: Lang): string {
  const custom = lang === 'ru' ? game.descriptionSeoRu : game.descriptionSeoEn
  if (custom) return custom
  const type = game.gameType || (lang === 'ru' ? 'игра' : 'game')
  const rtp = game.rtp ? ` RTP ${game.rtp}.` : ''
  return lang === 'ru'
    ? `Играйте в ${game.name} демо бесплатно — без регистрации. ${game.provider}, ${type}.${rtp}`
    : `Play ${game.name} demo free — no registration needed. ${game.provider} ${type}.${rtp}`
}

/** Format plain SEO text into semantic HTML paragraphs */
export function formatSeoText(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => `<p>${para}</p>`)
    .join('\n')
}
