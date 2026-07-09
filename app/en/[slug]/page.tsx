import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GamePage } from '@/components/game-page'
import { games, getGame, getKeywords, getSeoTitle, getSeoDescription } from '@/lib/games'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const game = getGame(slug)
  if (!game) return {}

  const keywords = getKeywords(game, 'en').join(', ')
  const title = getSeoTitle(game, 'en')
  const description = getSeoDescription(game, 'en')

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://1weapp.online/en/${slug}`,
      languages: {
        en: `https://1weapp.online/en/${slug}`,
        ru: `https://1weapp.online/ru/${slug}`,
        'x-default': `https://1weapp.online/en/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://1weapp.online/en/${slug}`,
      locale: 'en_US',
      images: [{ url: game.avatar, width: 400, height: 533, alt: `${game.name} avatar` }],
    },
  }
}

export default async function EnGamePage({ params }: Props) {
  const { slug } = await params
  const game = getGame(slug)
  if (!game) notFound()
  return <GamePage slug={slug} lang="en" />
}
