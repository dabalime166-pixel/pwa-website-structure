import type { Metadata } from 'next'
import { GameGuidesIndexPage } from '@/components/game-guides-page'

export const metadata: Metadata = {
  title: 'Game Guides — How Popular Demos Work | 1weapp',
  description:
    'Short guides for Lucky Jet, Gates of Olympus, Sweet Bonanza and more — multipliers, free spins, crash timing. Free demo, no signup. 18+.',
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
