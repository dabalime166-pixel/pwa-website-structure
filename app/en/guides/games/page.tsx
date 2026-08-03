import type { Metadata } from 'next'
import { GameGuidesIndexPage } from '@/components/game-guides-page'

export const metadata: Metadata = {
  title: 'Game Guides — Mid & Low-Frequency Demo SEO | 1weapp',
  description:
    'SEO playbooks for popular demos: Gates of Olympus and more — multipliers, free spins, RTP. Demo-first, 18+.',
  alternates: {
    canonical: 'https://www.1weapp.online/en/guides/games',
    languages: {
      en: 'https://www.1weapp.online/en/guides/games',
      ru: 'https://www.1weapp.online/ru/guides/games',
      'x-default': 'https://www.1weapp.online/en/guides/games',
    },
  },
}

export default function Page() {
  return <GameGuidesIndexPage lang="en" />
}
