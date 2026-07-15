import type { MetadataRoute } from 'next'
import { games } from '@/lib/games'
import { GUIDES } from '@/lib/guides-data'

const BASE = 'https://www.1weapp.online'

export default function sitemap(): MetadataRoute.Sitemap {
  // Home entries (both languages)
  const homeEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE}/en`,
          ru: `${BASE}/ru`,
        },
      },
    },
    {
      url: `${BASE}/ru`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE}/en`,
          ru: `${BASE}/ru`,
        },
      },
    },
  ]

  // Game entries (all games × 2 languages)
  const gameEntries: MetadataRoute.Sitemap = games.flatMap((g) => {
    // Mines demo doesn't work, so lower priority
    const priority = g.slug === 'mines' ? 0.3 : 0.8
    return [
      {
        url: `${BASE}/en/${g.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority,
        alternates: {
          languages: {
            en: `${BASE}/en/${g.slug}`,
            ru: `${BASE}/ru/${g.slug}`,
          },
        },
      },
      {
        url: `${BASE}/ru/${g.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority,
        alternates: {
          languages: {
            en: `${BASE}/en/${g.slug}`,
            ru: `${BASE}/ru/${g.slug}`,
          },
        },
      },
    ]
  })

  // Guide index entries (both languages)
  const guideIndexEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { en: `${BASE}/en/guides`, ru: `${BASE}/ru/guides` } },
    },
    {
      url: `${BASE}/ru/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { en: `${BASE}/en/guides`, ru: `${BASE}/ru/guides` } },
    },
  ]

  // Guide detail entries (all guides × 2 languages)
  const guideEntries: MetadataRoute.Sitemap = GUIDES.flatMap((g) => [
    {
      url: `${BASE}/en/guides/${g.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: `${BASE}/en/guides/${g.id}`,
          ru: `${BASE}/ru/guides/${g.id}`,
        },
      },
    },
    {
      url: `${BASE}/ru/guides/${g.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: `${BASE}/en/guides/${g.id}`,
          ru: `${BASE}/ru/guides/${g.id}`,
        },
      },
    },
  ])

  return [...homeEntries, ...gameEntries, ...guideIndexEntries, ...guideEntries]
}
