import type { Metadata } from 'next'
import GuidesIndexPage from '@/components/guides-index-page'

export const metadata: Metadata = {
  title: 'Strategy Guides — iGaming Mechanics, RTP & Bonuses Explained | 1weapp',
  description:
    'Free strategy guides for crash games and slots: Plinko math, Mines tactics, Crash psychology, RTP analysis, bonus hunting, responsible gambling and debunked myths.',
  openGraph: {
    title: '1weapp Strategy Guides',
    description: 'Master iGaming mechanics with in-depth strategy guides.',
  },
}

export default function Page() {
  return <GuidesIndexPage lang="en" />
}
