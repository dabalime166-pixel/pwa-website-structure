import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { i18n } from '@/lib/games'

export const metadata: Metadata = {
  title: i18n.ru.metaTitleHome,
  description: i18n.ru.metaDescHome,
  alternates: {
    canonical: 'https://www.1weapp.online/ru',
    languages: {
      ru: 'https://www.1weapp.online/ru',
      en: 'https://www.1weapp.online/en',
      'x-default': 'https://www.1weapp.online/en',
    },
  },
  openGraph: {
    title: i18n.ru.metaTitleHome,
    description: i18n.ru.metaDescHome,
    url: 'https://www.1weapp.online/ru',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: 'https://raw.githubusercontent.com/dabalime133/ava/main/og-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Играй в бесплатные демо игры - 1weapp',
      },
    ],
  },
}

export default function RuHomePage() {
  return <HomePage lang="ru" />
}
