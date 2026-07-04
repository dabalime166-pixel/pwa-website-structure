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

  const keywords = getKeywords(game, 'ru').join(', ')
  const title = `${game.name} Демо — Играть Бесплатно Онлайн`
  const description = `Играть в ${game.name} демо бесплатно — без регистрации. Провайдер: ${game.provider}. ${keywords.slice(0, 100)}.`

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://crashgames.demo/ru/${slug}`,
      languages: {
        en: `https://crashgames.demo/en/${slug}`,
        ru: `https://crashgames.demo/ru/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://crashgames.demo/ru/${slug}`,
      locale: 'ru_RU',
      images: [{ url: game.avatar, width: 400, height: 533, alt: `${game.name} аватарка` }],
    },
  }
}

export default async function RuGamePage({ params }: Props) {
  const { slug } = await params
  const game = getGame(slug)
  if (!game) notFound()
  return <GamePage slug={slug} lang="ru" />
}
