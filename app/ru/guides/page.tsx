import type { Metadata } from 'next'
import GuidesIndexPage from '@/components/guides-index-page'

export const metadata: Metadata = {
  title: 'Стратегические гайды — механики iGaming, RTP и бонусы | 1weapp',
  description:
    'Бесплатные стратегические гайды по краш-играм и слотам: математика Plinko, тактика Mines, психология Crash, анализ RTP, охота за бонусами и мифы об онлайн-казино.',
  openGraph: {
    title: 'Гайды 1weapp по iGaming',
    description: 'Освойте механики iGaming с нашими подробными стратегическими гайдами.',
  },
}

export default function Page() {
  return <GuidesIndexPage lang="ru" />
}
