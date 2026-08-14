import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GUIDES } from '@/lib/guides-data'
import GuideSinglePage from '@/components/guide-single-page'
import type { GuideData } from '@/lib/guides-data'
import { EXPERT } from '@/lib/expert'
import { clampMetaDescription, withBrandTitle, DEFAULT_OG_IMAGE, absoluteUrl } from '@/lib/seo'

const BASE = 'https://www.1weapp.online/en'

function buildGuideJsonLd(guide: GuideData, slug: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.titleEn,
    description: guide.subtitleEn,
    image: absoluteUrl(DEFAULT_OG_IMAGE.url),
    author: {
      '@type': 'Person',
      name: EXPERT.name,
      jobTitle: EXPERT.titleEn,
      image: `https://www.1weapp.online${EXPERT.avatar}`,
      description: EXPERT.bioEn,
    },
    reviewedBy: {
      '@type': 'Person',
      name: EXPERT.name,
      jobTitle: EXPERT.titleEn,
    },
    inLanguage: 'en',
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
    title: 'Plinko Low Risk Strategy Demo — Rows & Odds Guide | 1weapp',
    description:
      'Learn plinko low risk strategy demo, how plinko demo rows affect odds, and risk level settings — practice free before real play.',
    keywords:
      'plinko low risk strategy demo, how plinko demo rows affect odds, plinko risk level settings guide',
  },
  mines: {
    title: 'Mines 3 Bombs Strategy — Cashout Timing Demo Guide | 1weapp',
    description:
      'Learn mines 3 bombs strategy, cashout timing, and how to play mines demo with no deposit before real stakes.',
    keywords: 'mines 3 bombs strategy, mines cashout timing guide, play mines demo no deposit',
  },
  crash: {
    title: 'Crash Auto Cashout Strategy — Timing & Demo Tactics | 1weapp',
    description:
      'Learn crash auto cashout strategy, when to cash out crash games, and lucky jet demo cashout tactics before real stakes.',
    keywords:
      'crash auto cashout strategy, when to cash out crash games, lucky jet demo cashout tactics',
  },
  mistakes: {
    title: 'Online Casino Beginner Mistakes — Chasing Losses & Bankroll | 1weapp',
    description:
      'The costliest online casino beginner mistakes, why chasing losses fails, and bankroll management for new players.',
    keywords:
      'online casino beginner mistakes, why chasing losses fails, bankroll management for new players',
  },
  rtp: {
    title: 'Slot RTP Explained Simply — Volatility & Bankroll Fit | 1weapp',
    description:
      'Slot rtp explained simply, how slot volatility and bankroll interact, and when high rtp low volatility slots fit your sessions.',
    keywords:
      'slot rtp explained simply, slot volatility and bankroll, high rtp low volatility slots',
  },
  bonuses: {
    title: 'Casino Wagering Requirement Explained — Free Spins & Traps | 1weapp',
    description:
      'Casino wagering requirement explained, free spins wagering terms clarified, and welcome bonus traps to avoid.',
    keywords:
      'casino wagering requirement explained, free spins wagering terms, welcome bonus traps to avoid',
  },
  responsible: {
    title: 'Online Casino Deposit Limit Guide — Session Limits & Checklist | 1weapp',
    description:
      'Set an online casino deposit limit, use a problem gambling warning signs checklist, and learn how to set casino session limits.',
    keywords:
      'online casino deposit limit guide, problem gambling warning signs checklist, how to set casino session limits',
  },
  myths: {
    title: 'Hot and Cold Slots Myth — RNG & Due Payout Explained | 1weapp',
    description:
      'Why the hot and cold slots myth persists, whether you can beat slot rng, and why the due payout after losing streak myth is costly.',
    keywords:
      'hot and cold slots myth, can you beat slot rng, due payout after losing streak myth',
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
    guide.titleSeoEn ?? SEO[slug]?.title ?? `${guide.titleEn} — iGaming Strategy Guide`
  )
  const description = clampMetaDescription(
    guide.descriptionSeoEn ?? SEO[slug]?.description ?? guide.subtitleEn,
    'en'
  )
  const keywords =
    guide.keywordsEn?.join(', ') || SEO[slug]?.keywords || guide.tagEn

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE}/guides/${slug}`,
      languages: {
        en: `${BASE}/guides/${slug}`,
        ru: `https://www.1weapp.online/ru/guides/${slug}`,
        'x-default': `${BASE}/guides/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/guides/${slug}`,
      locale: 'en_US',
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      images: [{ ...DEFAULT_OG_IMAGE, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
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
  return <GuideSinglePage slug={slug} lang="en" jsonLd={jsonLd} />
}
