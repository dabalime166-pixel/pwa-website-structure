import type { Metadata } from 'next'
import { SportsHubPage } from '@/components/sports/sports-hub-page'
import { withBrandTitle, clampMetaDescription } from '@/lib/seo'

export const revalidate = 86400

export const metadata: Metadata = {
  title: withBrandTitle('Football livescore, tables & club profiles'),
  description: clampMetaDescription(
    'Live football scores, Premier League and Champions League tables, club profiles, match timelines and lineups on 1weapp. Powered by SportScore.',
    'en',
  ),
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.1weapp.online/en/sports',
    languages: {
      en: 'https://www.1weapp.online/en/sports',
      ru: 'https://www.1weapp.online/ru/sports',
      'x-default': 'https://www.1weapp.online/en/sports',
    },
  },
}

export default function EnSportsPage() {
  return <SportsHubPage lang="en" />
}
