import 'server-only'

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { contentPath } from '@/lib/admin-persist'

export type GameRecord = {
  slug: string
  name: string
  provider: string
  iframeUrl: string
  keywordsRu: string
  keywordsEn: string
  seoTextRu: string
  seoTextEn: string
  avatar: string
  rtp?: string
  gameType?: string
  externalUrl?: string
  titleSeoEn?: string
  titleSeoRu?: string
  descriptionSeoEn?: string
  descriptionSeoRu?: string
}

const GAMES_PATH = 'lib/games-data.json'
const CATALOG_PATH = 'lib/games-catalog.json'
const SEO_PATH = 'lib/games-seo.json'

function readGames(): GameRecord[] {
  return JSON.parse(readFileSync(contentPath(GAMES_PATH), 'utf8')) as GameRecord[]
}

function toCatalogEntry(g: GameRecord) {
  const out: Record<string, string> = {
    slug: g.slug,
    name: g.name,
    provider: g.provider,
    avatar: g.avatar,
  }
  if (g.externalUrl) out.externalUrl = g.externalUrl
  if (g.rtp) out.rtp = g.rtp
  if (g.gameType) out.gameType = g.gameType
  return out
}

function toSeoEntry(g: GameRecord) {
  const out: Record<string, string> = {
    iframeUrl: g.iframeUrl || '',
    keywordsRu: g.keywordsRu || '',
    keywordsEn: g.keywordsEn || '',
    seoTextRu: g.seoTextRu || '',
    seoTextEn: g.seoTextEn || '',
  }
  if (g.titleSeoEn) out.titleSeoEn = g.titleSeoEn
  if (g.titleSeoRu) out.titleSeoRu = g.titleSeoRu
  if (g.descriptionSeoEn) out.descriptionSeoEn = g.descriptionSeoEn
  if (g.descriptionSeoRu) out.descriptionSeoRu = g.descriptionSeoRu
  return out
}

/** Patch catalog + seo for one slug only (cheap vs full rebuild). */
export function syncGameDerivatives(slug: string, game: GameRecord | null) {
  const catalog = JSON.parse(readFileSync(contentPath(CATALOG_PATH), 'utf8')) as Record<string, unknown>[]
  const seo = JSON.parse(readFileSync(contentPath(SEO_PATH), 'utf8')) as Record<string, unknown>

  const catIdx = catalog.findIndex((row) => (row as { slug?: string }).slug === slug)
  if (game) {
    const entry = toCatalogEntry(game)
    if (catIdx >= 0) catalog[catIdx] = entry
    else catalog.push(entry)
    seo[slug] = toSeoEntry(game)
  } else {
    if (catIdx >= 0) catalog.splice(catIdx, 1)
    delete seo[slug]
  }

  catalog.sort((a, b) =>
    String((a as { name?: string }).name || '').localeCompare(String((b as { name?: string }).name || '')),
  )

  writeFileSync(contentPath(CATALOG_PATH), JSON.stringify(catalog))
  writeFileSync(contentPath(SEO_PATH), JSON.stringify(seo))
}

export function listGames(options: {
  q?: string
  provider?: string
  page?: number
  limit?: number
}) {
  const q = (options.q || '').trim().toLowerCase()
  const provider = (options.provider || '').trim()
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(100, Math.max(1, options.limit || 30))

  let rows = readGames()
  if (provider) rows = rows.filter((g) => g.provider === provider)
  if (q) {
    rows = rows.filter(
      (g) =>
        g.slug.includes(q) ||
        g.name.toLowerCase().includes(q) ||
        g.provider.toLowerCase().includes(q),
    )
  }

  const total = rows.length
  const start = (page - 1) * limit
  const items = rows.slice(start, start + limit).map((g) => ({
    slug: g.slug,
    name: g.name,
    provider: g.provider,
    avatar: g.avatar,
    rtp: g.rtp,
    gameType: g.gameType,
  }))

  return { items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) }
}

export function getGameRecord(slug: string): GameRecord | undefined {
  return readGames().find((g) => g.slug === slug)
}

export function upsertGameRecord(next: GameRecord): GameRecord {
  const games = readGames()
  const idx = games.findIndex((g) => g.slug === next.slug)
  if (idx >= 0) games[idx] = next
  else games.push(next)
  games.sort((a, b) => a.name.localeCompare(b.name))
  writeFileSync(contentPath(GAMES_PATH), `${JSON.stringify(games, null, 2)}\n`)
  syncGameDerivatives(next.slug, next)
  return next
}

export function deleteGameRecord(slug: string): boolean {
  const games = readGames()
  const idx = games.findIndex((g) => g.slug === slug)
  if (idx < 0) return false
  games.splice(idx, 1)
  writeFileSync(contentPath(GAMES_PATH), `${JSON.stringify(games, null, 2)}\n`)
  syncGameDerivatives(slug, null)
  return true
}

export function gameProviders(): string[] {
  const set = new Set<string>()
  for (const g of readGames()) set.add(g.provider)
  return [...set].sort((a, b) => a.localeCompare(b))
}

export function gamesCount(): number {
  return readGames().length
}
