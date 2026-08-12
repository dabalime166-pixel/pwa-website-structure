import type { MetadataRoute } from 'next'
import { games } from '@/lib/games'
import { GUIDES } from '@/lib/guides-data'
import { GAME_GUIDES } from '@/lib/game-guides-data'
import { REVIEWS } from '@/lib/reviews-data'
import { getProviderCards } from '@/lib/providers'
import { SPORTS_LEAGUES } from '@/lib/sports-leagues'

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
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: hreflang('/', '/ru'),
    },
    {
      url: `${BASE}/ru`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: hreflang('/', '/ru'),
    },
  ]

  const gameEntries: MetadataRoute.Sitemap = games.flatMap((g) => {
    const priority =
      g.slug === 'mines'
        ? 0.3
        : g.slug === 'gates-of-olympus-1000' ||
            g.slug === 'sweet-bonanza-1000' ||
            g.slug === 'gates-of-olympus' ||
            g.slug === 'sweet-bonanza' ||
            g.slug === 'lucky-jet'
          ? 0.9
          : 0.8
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

  const providerCards = getProviderCards()
  const providerIndexEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en/providers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.88,
      alternates: hreflang('/en/providers', '/ru/providers'),
    },
    {
      url: `${BASE}/ru/providers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.88,
      alternates: hreflang('/en/providers', '/ru/providers'),
    },
  ]

  const providerHubEntries: MetadataRoute.Sitemap = providerCards.flatMap((p) => {
    const enPath = `/en/providers/${p.slug}`
    const ruPath = `/ru/providers/${p.slug}`
    return [
      {
        url: `${BASE}${enPath}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.87,
        alternates: hreflang(enPath, ruPath),
      },
      {
        url: `${BASE}${ruPath}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.87,
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

  const gameGuideIndexEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en/guides/games`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.88,
      alternates: hreflang('/en/guides/games', '/ru/guides/games'),
    },
    {
      url: `${BASE}/ru/guides/games`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.88,
      alternates: hreflang('/en/guides/games', '/ru/guides/games'),
    },
  ]

  const gameGuideEntries: MetadataRoute.Sitemap = GAME_GUIDES.flatMap((g) => {
    const enPath = `/en/guides/games/${g.id}`
    const ruPath = `/ru/guides/games/${g.id}`
    return [
      {
        url: `${BASE}${enPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.86,
        alternates: hreflang(enPath, ruPath),
      },
      {
        url: `${BASE}${ruPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.86,
        alternates: hreflang(enPath, ruPath),
      },
    ]
  })

  const reviewIndexEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: hreflang('/en/reviews', '/ru/reviews'),
    },
    {
      url: `${BASE}/ru/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: hreflang('/en/reviews', '/ru/reviews'),
    },
  ]

  const reviewEntries: MetadataRoute.Sitemap = REVIEWS.flatMap((r) => {
    const enPath = `/en/reviews/${r.id}`
    const ruPath = `/ru/reviews/${r.id}`
    return [
      {
        url: `${BASE}${enPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.92,
        alternates: hreflang(enPath, ruPath),
      },
      {
        url: `${BASE}${ruPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.92,
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

  const sportsHubEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en/sports`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
      alternates: hreflang('/en/sports', '/ru/sports'),
    },
    {
      url: `${BASE}/ru/sports`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
      alternates: hreflang('/en/sports', '/ru/sports'),
    },
  ]

  const sportsLeagueEntries: MetadataRoute.Sitemap = SPORTS_LEAGUES.flatMap((league) => {
    const enPath = `/en/sports/league/${league.slug}`
    const ruPath = `/ru/sports/league/${league.slug}`
    return [
      {
        url: `${BASE}${enPath}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.86,
        alternates: hreflang(enPath, ruPath),
      },
      {
        url: `${BASE}${ruPath}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.86,
        alternates: hreflang(enPath, ruPath),
      },
    ]
  })

  return [
    ...homeEntries,
    ...gameEntries,
    ...providerIndexEntries,
    ...providerHubEntries,
    ...guideIndexEntries,
    ...guideEntries,
    ...gameGuideIndexEntries,
    ...gameGuideEntries,
    ...reviewIndexEntries,
    ...reviewEntries,
    ...sportsHubEntries,
    ...sportsLeagueEntries,
    ...legalEntries,
  ]
}
