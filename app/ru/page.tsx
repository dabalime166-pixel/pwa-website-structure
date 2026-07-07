import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { i18n } from '@/lib/games'

export const metadata: Metadata = {
  title: i18n.ru.metaTitleHome,
  description: i18n.ru.metaDescHome,
  alternates: {
    canonical: 'https://1weapp.online;/ru',
    languages: {
      en: 'https://1weapp.online;/en',
      ru: 'https://1weapp.online;/ru',
    },
  },
  openGraph: {
    title: i18n.ru.metaTitleHome,
    description: i18n.ru.metaDescHome,
    url: 'https://1weapp.online;/ru',
    locale: 'ru_RU',
  },
}

export default function RuHomePage() {
  return <HomePage lang="ru" />
}
