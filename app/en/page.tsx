import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { i18n } from '@/lib/games'

export const metadata: Metadata = {
  title: i18n.en.metaTitleHome,
  description: i18n.en.metaDescHome,
  alternates: {
    canonical: 'www.https://www.1weapp.online/en',
    languages: {
      en: 'www.https://www.1weapp.online/en',
      ru: 'www.https://www.1weapp.online/ru',
      'x-default': 'www.https://www.1weapp.online/en',
    },
  },
  openGraph: {
    title: i18n.en.metaTitleHome,
    description: i18n.en.metaDescHome,
    url: 'www.https://www.1weapp.online/en',
    locale: 'en_US',
  },
}

export default function EnHomePage() {
  return <HomePage lang="en" />
}
