import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { i18n } from '@/lib/games'

/**
 * Root page (/) serves English content without redirect.
 * Canonical points to /en to avoid duplicate content issues.
 * Users see clean / URL with 200 OK response and full English homepage.
 */
export const metadata: Metadata = {
  title: i18n.en.metaTitleHome,
  description: i18n.en.metaDescHome,
 alternates: {
      canonical: 'https://www.1weapp.online', // Убрали /en
      languages: {
        en: 'https://www.1weapp.online', // Убрали /en
        ru: 'https://www.1weapp.online/ru',
        'x-default': 'https://www.1weapp.online', // Убрали /en
      },
    },
    openGraph: {
      title: i18n.en.metaTitleHome,
      description: i18n.en.metaDescHome,
      url: 'https://www.1weapp.online', // Убрали /en
      locale: 'en_US',
    },
}

export default function RootHomePage() {
  return <HomePage lang="en" />
}
