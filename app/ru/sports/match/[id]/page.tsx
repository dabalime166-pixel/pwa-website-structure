import type { Metadata } from 'next'
import { MatchDetailPage } from '@/components/sports/match-detail-page'
import { withBrandTitle } from '@/lib/seo'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: withBrandTitle(`Матч ${id} — футбол live`),
    robots: { index: false, follow: false },
  }
}

export default async function RuMatchPage({ params }: Props) {
  const { id } = await params
  return <MatchDetailPage lang="ru" id={id} />
}
