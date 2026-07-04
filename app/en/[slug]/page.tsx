import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GamePage } from '@/components/game-page'
import { games, getGame, getKeywords } from '@/lib/games'

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
  const title = `${game.name} Demo — Play Free Online`
  const description = `Play ${game.name} demo free — no registration needed. ${game.provider} slot. ${keywords.slice(0, 120)}.`

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://crashgames.demo/en/${slug}`,
      languages: {
        en: `https://crashgames.demo/en/${slug}`,
        ru: `https://crashgames.demo/ru/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://crashgames.demo/en/${slug}`,
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
