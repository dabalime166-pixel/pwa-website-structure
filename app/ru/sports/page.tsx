import type { Metadata } from 'next'
import { SportsHubPage } from '@/components/sports/sports-hub-page'
import { withBrandTitle, clampMetaDescription } from '@/lib/seo'

export const revalidate = 180

export const metadata: Metadata = {
  title: withBrandTitle('Футбол live — таблицы и профили клубов'),
  description: clampMetaDescription(
    'Live-счёт, таблицы АПЛ и Лиги чемпионов, профили клубов, таймлайн матчей и составы на 1weapp. Данные SportScore.',
    'ru',
  ),
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.1weapp.online/ru/sports',
    languages: {
      en: 'https://www.1weapp.online/en/sports',
      ru: 'https://www.1weapp.online/ru/sports',
      'x-default': 'https://www.1weapp.online/en/sports',
    },
  },
}

export default function RuSportsPage() {
  return <SportsHubPage lang="ru" />
}
