import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GamePage } from '@/components/game-page'
import { games } from '@/lib/games'
import {
  getGameFull,
  getKeywords,
  getSeoTitle,
  getSeoDescription,
} from '@/lib/games-content'
import { absoluteUrl } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const game = getGameFull(slug)
  if (!game) return {}

  const keywords = getKeywords(game, 'en').join(', ')
  const title = getSeoTitle(game, 'en')
  const description = getSeoDescription(game, 'en')

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://www.1weapp.online/en/${slug}`,
      languages: {
        en: `https://www.1weapp.online/en/${slug}`,
        ru: `https://www.1weapp.online/ru/${slug}`,
        'x-default': `https://www.1weapp.online/en/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.1weapp.online/en/${slug}`,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: absoluteUrl(game.avatar),
          width: 400,
          height: 533,
          alt: `${game.name} free demo cover`,
        },
      ],
    },
  }
}

export default async function EnGamePage({ params }: Props) {
  const { slug } = await params
  const game = getGameFull(slug)
  if (!game) notFound()
  return <GamePage slug={slug} lang="en" />
}
