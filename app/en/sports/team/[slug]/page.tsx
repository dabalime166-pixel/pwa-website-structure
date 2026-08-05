import type { Metadata } from 'next'
import { TeamDetailPage } from '@/components/sports/team-detail-page'
import { buildTeamMetadata } from '@/lib/sports-seo'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildTeamMetadata(slug, 'en')
}

export default async function EnSportsTeamPage({ params }: Props) {
  const { slug } = await params
  return <TeamDetailPage lang="en" slug={slug} />
}
