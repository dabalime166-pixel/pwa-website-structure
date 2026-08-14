import 'server-only'

import seoData from './games-seo.json'
import { games, getGame } from '@/lib/games'
import type { GameFull, Lang } from '@/lib/games'
import { clampMetaDescription, withBrandTitle } from '@/lib/seo'

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
  const raw =
    custom ||
    (lang === 'ru'
      ? `${game.name} — Играть в демо онлайн`
      : `${game.name} Demo — Play Free Online`)
  return withBrandTitle(raw)
}

export function getSeoDescription(game: GameFull, lang: Lang): string {
  const custom = lang === 'ru' ? game.descriptionSeoRu : game.descriptionSeoEn
  if (custom) return clampMetaDescription(custom, lang)
  const type = game.gameType || (lang === 'ru' ? 'игра' : 'game')
  const rtp = game.rtp ? ` RTP ${game.rtp}.` : ''
  const raw =
    lang === 'ru'
      ? `Играйте в ${game.name} демо бесплатно — без регистрации. ${game.provider}, ${type}.${rtp} Виртуальный баланс в браузере.`
      : `Play ${game.name} demo free — no registration needed. ${game.provider} ${type}.${rtp} Virtual credits in your browser.`
  return clampMetaDescription(raw, lang)
}

/** Format SEO article text into semantic HTML (headings, lists, paragraphs). */
export function formatSeoText(text: string): string {
  const lines = String(text || '')
    .replace(/\r\n/g, '\n')
    .split('\n')

  const html: string[] = []
  let paragraph: string[] = []
  let listItems: string[] = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    const body = paragraph.join(' ').trim()
    if (body) html.push(`<p>${inlineFormat(body)}</p>`)
    paragraph = []
  }

  const flushList = () => {
    if (!listItems.length) return
    html.push(`<ul>${listItems.map((item) => `<li>${inlineFormat(item)}</li>`).join('')}</ul>`)
    listItems = []
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    const trimmed = line.trim()

    if (!trimmed) {
      flushList()
      flushParagraph()
      continue
    }

    const h3 = trimmed.match(/^###\s+(.+)$/)
    if (h3) {
      flushList()
      flushParagraph()
      html.push(`<h3>${inlineFormat(h3[1].trim())}</h3>`)
      continue
    }

    const h2 = trimmed.match(/^##\s+(.+)$/)
    if (h2) {
      flushList()
      flushParagraph()
      html.push(`<h2>${inlineFormat(h2[1].trim())}</h2>`)
      continue
    }

    const li = trimmed.match(/^[-*•]\s+(.+)$/)
    if (li) {
      flushParagraph()
      listItems.push(li[1].trim())
      continue
    }

    flushList()
    paragraph.push(trimmed)
  }

  flushList()
  flushParagraph()
  return html.join('\n')
}

function inlineFormat(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

