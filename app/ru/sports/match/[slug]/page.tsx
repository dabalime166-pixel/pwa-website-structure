import type { Metadata } from 'next'
import { MatchDetailPage } from '@/components/sports/match-detail-page'
import { listFootballMatchStaticParams } from '@/lib/sportscore'
import { buildMatchMetadata } from '@/lib/sports-seo'

/** 3 minutes — protects Fluid limits; use Refresh for fresher scores */
export const revalidate = 180
/** Allow on-demand ISR for matches not known at build time */
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listFootballMatchStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildMatchMetadata(slug, 'ru')
}

export default async function RuSportsMatchPage({ params }: Props) {
  const { slug } = await params
  return <MatchDetailPage lang="ru" slug={slug} />
}
