import type { Metadata } from 'next'
import { SportsHubPage } from '@/components/sports/sports-hub-page'
import { withBrandTitle, clampMetaDescription } from '@/lib/seo'

export const metadata: Metadata = {
  title: withBrandTitle('Футбол live — счёт и матчи'),
  description: clampMetaDescription(
    'Live-счёт футбольных матчей, расписание на сегодня, события, составы и команды на 1weapp. Данные SportScore.',
    'ru',
  ),
  robots: { index: false, follow: false },
}

export default function RuSportsPage() {
  return <SportsHubPage lang="ru" />
}
