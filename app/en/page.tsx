import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { i18n } from '@/lib/games'

export const metadata: Metadata = {
  title: i18n.en.metaTitleHome,
  description: i18n.en.metaDescHome,
  alternates: {
    canonical: 'https://crashgames.demo/en',
    languages: {
      en: 'https://crashgames.demo/en',
      ru: 'https://crashgames.demo/ru',
    },
  },
  openGraph: {
    title: i18n.en.metaTitleHome,
    description: i18n.en.metaDescHome,
    url: 'https://crashgames.demo/en',
    locale: 'en_US',
  },
}

export default function EnHomePage() {
  return <HomePage lang="en" />
}
