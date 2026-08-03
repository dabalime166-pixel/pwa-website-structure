import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GAME_GUIDES, getGameGuide } from '@/lib/game-guides-data'
import { GameGuideSinglePage } from '@/components/game-guides-page'
import { EXPERT } from '@/lib/expert'

const BASE = 'https://www.1weapp.online/ru'

export async function generateStaticParams() {
  return GAME_GUIDES.map((g) => ({ slug: g.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGameGuide(slug)
  if (!guide) return {}
  return {
    title: guide.titleSeoRu,
    description: guide.descriptionSeoRu,
    keywords: guide.keywordsRu.join(', '),
    alternates: {
      canonical: `${BASE}/guides/games/${slug}`,
      languages: {
        ru: `${BASE}/guides/games/${slug}`,
        en: `https://www.1weapp.online/en/guides/games/${slug}`,
        'x-default': `https://www.1weapp.online/en/guides/games/${slug}`,
      },
    },
    openGraph: {
      title: guide.titleSeoRu,
      description: guide.descriptionSeoRu,
      url: `${BASE}/guides/games/${slug}`,
      locale: 'ru_RU',
      type: 'article',
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGameGuide(slug)
  if (!guide) notFound()

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.titleRu,
    description: guide.subtitleRu,
    inLanguage: 'ru',
    url: `${BASE}/guides/games/${slug}`,
    author: {
      '@type': 'Person',
      name: EXPERT.name,
      jobTitle: EXPERT.titleRu,
    },
    about: {
      '@type': 'VideoGame',
      name: 'Gates of Olympus',
      url: 'https://www.1weapp.online/ru/gates-of-olympus',
    },
  })

  return <GameGuideSinglePage guide={guide} lang="ru" jsonLd={jsonLd} />
}
