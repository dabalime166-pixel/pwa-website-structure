import type { MetadataRoute } from 'next'
import { games } from '@/lib/games'
import { GUIDES } from '@/lib/guides-data'

const BASE = 'https://www.1weapp.online'

const LEGAL_PATHS = [
  'privacy',
  'terms',
  'disclaimer',
  'responsible-gaming',
] as const

function hreflang(enPath: string, ruPath: string) {
  return {
    languages: {
      en: `${BASE}${enPath}`,
      ru: `${BASE}${ruPath}`,
      'x-default': `${BASE}${enPath}`,
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: hreflang('/en', '/ru'),
    },
    {
      url: `${BASE}/ru`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: hreflang('/en', '/ru'),
    },
  ]

  const gameEntries: MetadataRoute.Sitemap = games.flatMap((g) => {
    const priority = g.slug === 'mines' ? 0.3 : 0.8
    const enPath = `/en/${g.slug}`
    const ruPath = `/ru/${g.slug}`
    return [
      {
        url: `${BASE}${enPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority,
        alternates: hreflang(enPath, ruPath),
      },
      {
        url: `${BASE}${ruPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority,
        alternates: hreflang(enPath, ruPath),
      },
    ]
  })

  const guideIndexEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: hreflang('/en/guides', '/ru/guides'),
    },
    {
      url: `${BASE}/ru/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: hreflang('/en/guides', '/ru/guides'),
    },
  ]

  const guideEntries: MetadataRoute.Sitemap = GUIDES.flatMap((g) => {
    const enPath = `/en/guides/${g.id}`
    const ruPath = `/ru/guides/${g.id}`
    return [
      {
        url: `${BASE}${enPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
        alternates: hreflang(enPath, ruPath),
      },
      {
        url: `${BASE}${ruPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
        alternates: hreflang(enPath, ruPath),
      },
    ]
  })

  const legalEntries: MetadataRoute.Sitemap = LEGAL_PATHS.flatMap((path) => {
    const enPath = `/en/${path}`
    const ruPath = `/ru/${path}`
    return [
      {
        url: `${BASE}${enPath}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
        alternates: hreflang(enPath, ruPath),
      },
      {
        url: `${BASE}${ruPath}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
        alternates: hreflang(enPath, ruPath),
      },
    ]
  })

  return [
    ...homeEntries,
    ...gameEntries,
    ...guideIndexEntries,
    ...guideEntries,
    ...legalEntries,
  ]
}
