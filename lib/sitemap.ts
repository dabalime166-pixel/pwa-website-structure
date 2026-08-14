import type { MetadataRoute } from 'next'
import { games } from '@/lib/games'
import { GUIDES } from '@/lib/guides-data'
import { REVIEWS } from '@/lib/reviews-data'
import { getProviderCards } from '@/lib/providers'

export const SITEMAP_BASE = 'https://www.1weapp.online'

/** Stable stamp — do not use `new Date()` (that fakes "updated today" on every crawl). */
export const CONTENT_STAMP = new Date('2026-08-14T00:00:00.000Z')

/** Games per chunk (each game is 2 locale URLs). Keep files small for Yandex/Vercel. */
export const GAMES_PER_SITEMAP = 400

const LEGAL_PATHS = [
  'privacy',
  'terms',
  'disclaimer',
  'responsible-gaming',
] as const

type SitemapEntry = MetadataRoute.Sitemap[number]

function hreflang(enPath: string, ruPath: string) {
  return {
    languages: {
      en: `${SITEMAP_BASE}${enPath}`,
      ru: `${SITEMAP_BASE}${ruPath}`,
      'x-default': `${SITEMAP_BASE}${enPath}`,
    },
  }
}

function pair(
  enPath: string,
  ruPath: string,
  lastModified: Date,
  changeFrequency: NonNullable<SitemapEntry['changeFrequency']>,
  priority: number,
): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITEMAP_BASE}${enPath}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: hreflang(enPath, ruPath),
    },
    {
      url: `${SITEMAP_BASE}${ruPath}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: hreflang(enPath, ruPath),
    },
  ]
}

function gamePriority(slug: string): number {
  if (slug === 'mines') return 0.3
  if (
    slug === 'gates-of-olympus-1000' ||
    slug === 'sweet-bonanza-1000' ||
    slug === 'gates-of-olympus' ||
    slug === 'sweet-bonanza' ||
    slug === 'lucky-jet'
  ) {
    return 0.9
  }
  return 0.8
}

export function gameSitemapCount(): number {
  return Math.max(1, Math.ceil(games.length / GAMES_PER_SITEMAP))
}

export function sitemapChunkIds(): string[] {
  return [
    'static',
    ...Array.from({ length: gameSitemapCount() }, (_, i) => `games-${i}`),
  ]
}

export function staticSitemapEntries(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITEMAP_BASE}/`,
      lastModified: CONTENT_STAMP,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: hreflang('/', '/ru'),
    },
    {
      url: `${SITEMAP_BASE}/ru`,
      lastModified: CONTENT_STAMP,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: hreflang('/', '/ru'),
    },
  ]

  const providerCards = getProviderCards()
  const providerIndexEntries = pair(
    '/en/providers',
    '/ru/providers',
    CONTENT_STAMP,
    'weekly',
    0.88,
  )
  const providerHubEntries: MetadataRoute.Sitemap = providerCards.flatMap((p) =>
    pair(`/en/providers/${p.slug}`, `/ru/providers/${p.slug}`, CONTENT_STAMP, 'weekly', 0.87),
  )

  const guidesLastUpdated = GUIDES.reduce(
    (max, g) => (g.updatedAt > max ? g.updatedAt : max),
    GUIDES[0]?.updatedAt ?? '2026-07-24',
  )
  const guideIndexEntries = pair(
    '/en/guides',
    '/ru/guides',
    new Date(guidesLastUpdated),
    'weekly',
    0.9,
  )
  const guideEntries: MetadataRoute.Sitemap = GUIDES.flatMap((g) =>
    pair(
      `/en/guides/${g.id}`,
      `/ru/guides/${g.id}`,
      new Date(g.updatedAt),
      'monthly',
      0.85,
    ),
  )

  const reviewIndexEntries = pair(
    '/en/reviews',
    '/ru/reviews',
    CONTENT_STAMP,
    'weekly',
    0.9,
  )
  const reviewEntries: MetadataRoute.Sitemap = REVIEWS.flatMap((r) =>
    pair(`/en/reviews/${r.id}`, `/ru/reviews/${r.id}`, CONTENT_STAMP, 'monthly', 0.92),
  )

  const legalEntries: MetadataRoute.Sitemap = LEGAL_PATHS.flatMap((path) =>
    pair(`/en/${path}`, `/ru/${path}`, CONTENT_STAMP, 'yearly', 0.3),
  )

  return [
    ...homeEntries,
    ...providerIndexEntries,
    ...providerHubEntries,
    ...guideIndexEntries,
    ...guideEntries,
    ...reviewIndexEntries,
    ...reviewEntries,
    ...legalEntries,
  ]
}

export function gameSitemapEntries(chunkIndex: number): MetadataRoute.Sitemap {
  const start = chunkIndex * GAMES_PER_SITEMAP
  const slice = games.slice(start, start + GAMES_PER_SITEMAP)
  return slice.flatMap((g) => {
    const priority = gamePriority(g.slug)
    return pair(`/en/${g.slug}`, `/ru/${g.slug}`, CONTENT_STAMP, 'monthly', priority)
  })
}

export function sitemapEntriesForChunk(chunk: string): MetadataRoute.Sitemap | null {
  if (chunk === 'static') return staticSitemapEntries()
  const match = /^games-(\d+)$/.exec(chunk)
  if (!match) return null
  const index = Number(match[1])
  if (!Number.isInteger(index) || index < 0 || index >= gameSitemapCount()) return null
  return gameSitemapEntries(index)
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function iso(value: string | Date | undefined): string {
  if (!value) return CONTENT_STAMP.toISOString()
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

export function urlsetXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const langs = entry.alternates?.languages
        ? Object.entries(entry.alternates.languages)
            .filter((item): item is [string, string] => typeof item[1] === 'string')
            .map(
              ([lang, href]) =>
                `<xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}"/>`,
            )
            .join('')
        : ''
      const changefreq = entry.changeFrequency
        ? `<changefreq>${entry.changeFrequency}</changefreq>`
        : ''
      const priority =
        typeof entry.priority === 'number' ? `<priority>${entry.priority.toFixed(1)}</priority>` : ''
      return `<url><loc>${escapeXml(entry.url)}</loc>${langs}<lastmod>${iso(entry.lastModified)}</lastmod>${changefreq}${priority}</url>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

export function sitemapIndexXml(): string {
  const lastmod = CONTENT_STAMP.toISOString()
  const items = sitemapChunkIds()
    .map((id) => {
      const loc = `${SITEMAP_BASE}/sitemaps/${id}.xml`
      return `<sitemap><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod></sitemap>`
    })
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</sitemapindex>`
}

export const SITEMAP_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
} as const
