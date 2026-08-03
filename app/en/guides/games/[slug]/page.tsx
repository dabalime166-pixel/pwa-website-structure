import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GAME_GUIDES, getGameGuide } from '@/lib/game-guides-data'
import { GameGuideSinglePage } from '@/components/game-guides-page'
import { EXPERT } from '@/lib/expert'

const BASE = 'https://www.1weapp.online/en'

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
    title: guide.titleSeoEn,
    description: guide.descriptionSeoEn,
    keywords: guide.keywordsEn.join(', '),
    alternates: {
      canonical: `${BASE}/guides/games/${slug}`,
      languages: {
        en: `${BASE}/guides/games/${slug}`,
        ru: `https://www.1weapp.online/ru/guides/games/${slug}`,
        'x-default': `${BASE}/guides/games/${slug}`,
      },
    },
    openGraph: {
      title: guide.titleSeoEn,
      description: guide.descriptionSeoEn,
      url: `${BASE}/guides/games/${slug}`,
      locale: 'en_US',
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
    headline: guide.titleEn,
    description: guide.subtitleEn,
    inLanguage: 'en',
    url: `${BASE}/guides/games/${slug}`,
    author: {
      '@type': 'Person',
      name: EXPERT.name,
      jobTitle: EXPERT.titleEn,
    },
    about: {
      '@type': 'VideoGame',
      name: 'Gates of Olympus',
      url: 'https://www.1weapp.online/en/gates-of-olympus',
    },
  })

  return <GameGuideSinglePage guide={guide} lang="en" jsonLd={jsonLd} />
}
