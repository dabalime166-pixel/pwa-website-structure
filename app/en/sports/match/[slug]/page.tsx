import type { Metadata } from 'next'
import { MatchDetailPage } from '@/components/sports/match-detail-page'
import { listFootballMatchStaticParams } from '@/lib/sportscore'
import { buildMatchMetadata } from '@/lib/sports-seo'

/** 24h — protects Vercel ISR limits; use Refresh button for fresher scores */
export const revalidate = 86400
/** Allow on-demand ISR for matches not known at build time */
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listFootballMatchStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildMatchMetadata(slug, 'en')
}

export default async function EnSportsMatchPage({ params }: Props) {
  const { slug } = await params
  return <MatchDetailPage lang="en" slug={slug} />
}
