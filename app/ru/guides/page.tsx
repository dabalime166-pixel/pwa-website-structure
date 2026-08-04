import type { Metadata } from 'next'
import GuidesIndexPage from '@/components/guides-index-page'
import { withBrandTitle } from '@/lib/seo'

export const metadata: Metadata = {
  title: withBrandTitle('Стратегические гайды — механики iGaming, RTP и бонусы'),
  description:
    'Бесплатные стратегические гайды по краш-играм и слотам: математика Plinko, тактика Mines, психология Crash, анализ RTP, охота за бонусами и мифы об онлайн-казино.',
  openGraph: {
    title: 'Гайды 1weapp по iGaming',
    description: 'Освойте механики iGaming с нашими подробными стратегическими гайдами.',
    type: 'website',
  },
}

export default function Page() {
  return <GuidesIndexPage lang="ru" />
}
