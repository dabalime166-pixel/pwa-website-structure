import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { i18n } from '@/lib/games'

export const metadata: Metadata = {
  title: i18n.ru.metaTitleHome,
  description: i18n.ru.metaDescHome,
  alternates: {
    canonical: 'https://crashgames.demo/ru',
    languages: {
      en: 'https://crashgames.demo/en',
      ru: 'https://crashgames.demo/ru',
    },
  },
  openGraph: {
    title: i18n.ru.metaTitleHome,
    description: i18n.ru.metaDescHome,
    url: 'https://crashgames.demo/ru',
    locale: 'ru_RU',
  },
}

export default function RuHomePage() {
  return <HomePage lang="ru" />
}
