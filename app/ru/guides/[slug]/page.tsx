import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GUIDES } from '@/lib/guides-data'
import GuideSinglePage from '@/components/guide-single-page'
import type { GuideData } from '@/lib/guides-data'
import { EXPERT } from '@/lib/expert'
import { clampMetaDescription, withBrandTitle } from '@/lib/seo'

const BASE = 'https://www.1weapp.online/ru'

function buildGuideJsonLd(guide: GuideData, slug: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.titleRu,
    description: guide.subtitleRu,
    image: 'https://www.1weapp.online/og-image.jpg',
    author: {
      '@type': 'Person',
      name: EXPERT.name,
      jobTitle: EXPERT.titleRu,
      image: `https://www.1weapp.online${EXPERT.avatar}`,
      description: EXPERT.bioRu,
    },
    reviewedBy: {
      '@type': 'Person',
      name: EXPERT.name,
      jobTitle: EXPERT.titleRu,
    },
    inLanguage: 'ru',
    url: `${BASE}/guides/${slug}`,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: '1weapp',
    },
  })
}

/* Default SEO fallbacks — prefer GuideData titleSeo / descriptionSeo / keywords fields */
const SEO: Record<string, { title: string; description: string; keywords: string }> = {
  plinko: {
    title: 'Plinko стратегия низкий риск — как работает демо | 1weapp',
    description:
      'Разбор: plinko стратегия низкий риск, как работает plinko демо и влияние количества рядов на множители. Тренируйтесь без депозита.',
    keywords:
      'plinko стратегия низкий риск, как работает plinko демо, plinko количество рядов влияние',
  },
  mines: {
    title: 'Mines стратегия 3 мины — кэшаут и демо без депозита | 1weapp',
    description:
      'Разберите mines стратегию 3 мины, когда делать кэшаут и как тренироваться в mines демо без депозита.',
    keywords: 'mines стратегия 3 мины, mines когда делать кэшаут, как играть mines демо без депозита',
  },
  crash: {
    title: 'Crash автокэшаут стратегия — когда выводить | 1weapp',
    description:
      'Разберите crash автокэшаут стратегию, решите краш игра когда выводить и отработайте lucky jet демо тактику кэшаута.',
    keywords:
      'crash автокэшаут стратегия, краш игра когда выводить, lucky jet демо тактика кэшаута',
  },
  mistakes: {
    title: 'Ошибки новичков в онлайн казино — банкролл и догон | 1weapp',
    description:
      'Какие ошибки новичков в онлайн казино стоят дороже всего, почему нельзя догонять проигрыш и как строить банкролл менеджмент для новичков.',
    keywords:
      'ошибки новичков в онлайн казино, почему нельзя догонять проигрыш, банкролл менеджмент для новичков',
  },
  rtp: {
    title: 'Что такое RTP слота простыми словами — волатильность | 1weapp',
    description:
      'Объясняем, что такое rtp слота простыми словами, как связаны волатильность слота и банкролл, и кому подходит высокий rtp низкая волатильность.',
    keywords:
      'что такое rtp слота простыми словами, волатильность слота и банкролл, высокий rtp низкая волатильность',
  },
  bonuses: {
    title: 'Вейджер бонуса казино как считать — фриспины и ловушки | 1weapp',
    description:
      'Считаем вейджер бонуса казино, читаем условия фриспинов с вейджером и разбираем подводные камни приветственного бонуса.',
    keywords:
      'вейджер бонуса казино как считать, фриспины с вейджером условия, приветственный бонус подводные камни',
  },
  responsible: {
    title: 'Лимит депозита онлайн казино — сессии и чеклист | 1weapp',
    description:
      'Как поставить лимит депозита онлайн казино, пройти чеклист признаков проблемной игры и ограничить время сессии.',
    keywords:
      'лимит депозита онлайн казино, признаки проблемной игры чеклист, как ограничить время сессии в казино',
  },
  myths: {
    title: 'Миф о горячих и холодных слотах — RNG и «должен отдать» | 1weapp',
    description:
      'Почему жив миф о горячих и холодных слотах, можно ли обмануть rng слота и почему фраза «слот должен отдать после проигрышей» опасна.',
    keywords:
      'миф о горячих и холодных слотах, можно ли обмануть rng слота, слот должен отдать после проигрышей',
  },
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES.find((g) => g.id === slug)
  if (!guide) return {}

  // Prefer custom SEO fields + low-frequency keyword list from guides-data
  const title = withBrandTitle(
    guide.titleSeoRu ?? SEO[slug]?.title ?? `${guide.titleRu} — Гайд iGaming`
  )
  const description = clampMetaDescription(
    guide.descriptionSeoRu ?? SEO[slug]?.description ?? guide.subtitleRu,
    'ru'
  )
  const keywords =
    guide.keywordsRu?.join(', ') || SEO[slug]?.keywords || guide.tagRu

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE}/guides/${slug}`,
      languages: {
        ru: `${BASE}/guides/${slug}`,
        en: `https://www.1weapp.online/en/guides/${slug}`,
        'x-default': `https://www.1weapp.online/en/guides/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/guides/${slug}`,
      locale: 'ru_RU',
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = GUIDES.find((g) => g.id === slug)
  if (!guide) notFound()
  const jsonLd = buildGuideJsonLd(guide, slug)
  return <GuideSinglePage slug={slug} lang="ru" jsonLd={jsonLd} />
}
