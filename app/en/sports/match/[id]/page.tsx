import type { Metadata } from 'next'
import { MatchDetailPage } from '@/components/sports/match-detail-page'
import { withBrandTitle } from '@/lib/seo'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: withBrandTitle(`Match ${id} — football livescore`),
    robots: { index: false, follow: false },
  }
}

export default async function EnMatchPage({ params }: Props) {
  const { id } = await params
  return <MatchDetailPage lang="en" id={id} />
}
