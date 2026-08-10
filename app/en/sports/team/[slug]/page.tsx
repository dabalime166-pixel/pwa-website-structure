import type { Metadata } from 'next'
import { TeamDetailPage } from '@/components/sports/team-detail-page'
import { listFootballTeamStaticParams } from '@/lib/sportscore'
import { buildTeamMetadata } from '@/lib/sports-seo'

export const revalidate = 600
/** Allow on-demand ISR for teams not known at build time */
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listFootballTeamStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildTeamMetadata(slug, 'en')
}

export default async function EnSportsTeamPage({ params }: Props) {
  const { slug } = await params
  return <TeamDetailPage lang="en" slug={slug} />
}
