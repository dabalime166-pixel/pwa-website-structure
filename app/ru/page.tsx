import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { i18n } from '@/lib/games'

export const metadata: Metadata = {
  title: i18n.ru.metaTitleHome,
  description: i18n.ru.metaDescHome,
  keywords: [
    'бесплатные демо слоты без регистрации',
    'краш игры демо онлайн',
    'lucky jet демо играть бесплатно',
    'слоты pragmatic play демо',
    'mines демо без депозита',
    'бесплатные игровые автоматы онлайн демо',
    'демо казино без регистрации',
  ],
  alternates: {
    canonical: 'https://www.1weapp.online/ru',
    languages: {
      ru: 'https://www.1weapp.online/ru',
      en: 'https://www.1weapp.online/',
      'x-default': 'https://www.1weapp.online/',
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
        url: '/og-picture.jpg',
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
