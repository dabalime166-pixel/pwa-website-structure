import type { Metadata } from 'next'
import { MatchDetailPage } from '@/components/sports/match-detail-page'
import { buildMatchMetadata } from '@/lib/sports-seo'

/** 3 minutes — protects Fluid limits; use Refresh for fresher scores */
export const revalidate = 180

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildMatchMetadata(slug, 'en')
}

export default async function EnSportsMatchPage({ params }: Props) {
  const { slug } = await params
  return <MatchDetailPage lang="en" slug={slug} />
}
