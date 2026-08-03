import type { Metadata } from 'next'
import { GameGuidesIndexPage } from '@/components/game-guides-page'

export const metadata: Metadata = {
  title: 'Гайды по играм — средне- и низкочастотные запросы | 1weapp',
  description:
    'SEO-разборы популярных демо: Gates of Olympus и другие — множители, фриспины, RTP. Сначала демо, 18+.',
  alternates: {
    canonical: 'https://www.1weapp.online/ru/guides/games',
    languages: {
      ru: 'https://www.1weapp.online/ru/guides/games',
      en: 'https://www.1weapp.online/en/guides/games',
      'x-default': 'https://www.1weapp.online/en/guides/games',
    },
  },
}

export default function Page() {
  return <GameGuidesIndexPage lang="ru" />
}
