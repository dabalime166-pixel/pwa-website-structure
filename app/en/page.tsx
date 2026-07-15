import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { i18n } from '@/lib/games'

export const metadata: Metadata = {
  title: i18n.en.metaTitleHome,
  description: i18n.en.metaDescHome,
  alternates: {
    canonical: 'https://www.1weapp.online/en/',
    languages: {
      en: 'https://www.1weapp.online/en',
      ru: 'https://www.1weapp.online/ru',
      'x-default': 'https://www.1weapp.online/en',
    },
  },
  openGraph: {
    title: i18n.en.metaTitleHome,
    description: i18n.en.metaDescHome,
    url: 'https://www.1weapp.online/en',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://raw.githubusercontent.com/dabalime133/ava/main/og-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Play Free Demo Games - 1weapp',
      },
    ],
  },
}

export default function EnHomePage() {
  return <HomePage lang="en" />
}
