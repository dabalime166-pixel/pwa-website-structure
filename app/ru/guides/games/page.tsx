import type { Metadata } from 'next'
import { GameGuidesIndexPage } from '@/components/game-guides-page'

export const metadata: Metadata = {
  title: 'Гайды по играм — как работают популярные демо',
  description:
    'Короткие разборы Lucky Jet, Gates of Olympus, Sweet Bonanza и других хитов — множители, фриспины, кэшаут. Бесплатное демо без регистрации. 18+.',
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
