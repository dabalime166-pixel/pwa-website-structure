import type { Metadata } from 'next'
import { SportsHubPage } from '@/components/sports/sports-hub-page'
import { withBrandTitle, clampMetaDescription } from '@/lib/seo'

export const metadata: Metadata = {
  title: withBrandTitle('Football livescore — live scores & fixtures'),
  description: clampMetaDescription(
    'Live football scores, today’s fixtures, match events, lineups and team info on 1weapp. Powered by SportScore.',
    'en',
  ),
  robots: { index: false, follow: false },
}

export default function EnSportsPage() {
  return <SportsHubPage lang="en" />
}
