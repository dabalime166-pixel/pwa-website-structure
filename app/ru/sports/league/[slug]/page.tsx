import type { Metadata } from 'next'
import { LeagueDetailPage } from '@/components/sports/league-detail-page'
import { buildLeagueMetadata } from '@/lib/sports-seo'
import { SPORTS_LEAGUES } from '@/lib/sports-leagues'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return SPORTS_LEAGUES.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildLeagueMetadata(slug, 'ru')
}

export default async function RuSportsLeaguePage({ params }: Props) {
  const { slug } = await params
  return <LeagueDetailPage lang="ru" slug={slug} />
}
