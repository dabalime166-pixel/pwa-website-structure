import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GUIDES } from '@/lib/guides-data'
import GuideSinglePage from '@/components/guide-single-page'
import type { Guide } from '@/lib/guides-data'

const BASE = 'https://www.1weapp.online/en'

function buildGuideJsonLd(guide: Guide, slug: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.titleEn,
    description: guide.subtitleEn,
    image: guide.image || 'https://www.1weapp.online/og-image.jpg',
    author: {
      '@type': 'Organization',
      name: '1weapp',
    },
    inLanguage: 'en',
    url: `${BASE}/guides/${slug}`,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: '1weapp',
    },
  })
}

/* ─── Default SEO-optimised titles & descriptions per guide (EN) ─── */
/* Override these by setting titleSeoEn/descriptionSeoEn in lib/guides-data.ts */
const SEO: Record<string, { title: string; description: string; keywords: string }> = {
  plinko: {
    title: 'Plinko Strategy Guide 2025 — How to Win at Plinko Online | 1weapp',
    description:
      'Master Plinko with our expert strategy guide. Learn probability theory, optimal risk settings, bankroll management, and how RTP affects your long-term results.',
    keywords:
      'plinko strategy, plinko guide, how to win plinko, plinko tips, plinko online, plinko probability, plinko rtp',
  },
  mines: {
    title: 'Mines Game Strategy Guide 2025 — Best Tactics & How to Win | 1weapp',
    description:
      'Learn the best Mines strategies: combinatorics explained, how to choose the right mine count, volatility management, and when to cash out for maximum profit.',
    keywords:
      'mines game strategy, mines tips, how to win mines, mines crash game, mines tactics, mines rtp, mines volatility',
  },
  crash: {
    title: 'Crash Game Strategy Guide 2025 — When to Cash Out & How to Win | 1weapp',
    description:
      'Discover proven Crash game strategies — auto-cashout tactics, Martingale vs flat betting, psychological traps, and bankroll rules every serious player must know.',
    keywords:
      'crash game strategy, crash game tips, how to win crash, auto cashout crash, crash game guide, lucky jet strategy',
  },
  mistakes: {
    title: 'Top 7 Gambling Mistakes to Avoid in 2025 — iGaming Player Guide | 1weapp',
    description:
      'Avoid the most costly gambling mistakes: chasing losses, no bankroll plan, ignoring RTP, and more. A must-read guide for every online casino player.',
    keywords:
      'gambling mistakes, casino mistakes, online gambling tips, how to gamble smarter, avoid losing casino, player mistakes guide',
  },
  rtp: {
    title: 'RTP & Volatility Guide 2025 — What They Mean and How to Use Them | 1weapp',
    description:
      'Understand RTP and volatility in online slots and crash games. Learn how to pick the right games for your bankroll style and maximise long-term returns.',
    keywords:
      'rtp guide, what is rtp, slot volatility, high volatility slots, low volatility slots, rtp vs volatility, best rtp slots',
  },
  bonuses: {
    title: 'Casino Bonus Guide 2025 — How to Claim & Clear Bonuses the Right Way | 1weapp',
    description:
      'Everything you need to know about casino bonuses: welcome bonuses, free spins, wagering requirements, cashback, and how to choose the most profitable offers.',
    keywords:
      'casino bonus guide, wagering requirements, free spins guide, welcome bonus casino, how to clear wagering, best casino bonuses 2025',
  },
  responsible: {
    title: 'Responsible Gambling Guide 2025 — Bankroll Management & Safe Play | 1weapp',
    description:
      'Play smarter and safer with our responsible gambling guide. Covers session budgets, the 1-3% rule, self-exclusion tools, and the warning signs of problem gambling.',
    keywords:
      'responsible gambling, bankroll management, problem gambling signs, deposit limits, self exclusion casino, safe gambling tips',
  },
  myths: {
    title: 'Online Slot Myths Debunked 2025 — Casino Facts vs Fiction | 1weapp',
    description:
      'We bust 8 common slot and casino myths: hot/cold machines, guaranteed win streaks, unbeatable strategies. Learn what really determines your results.',
    keywords:
      'casino myths, slot myths, online slot facts, hot cold slots myth, gambling myths debunked, casino rng truth',
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

  // Use custom SEO fields if provided, otherwise fall back to defaults
  const title = guide.titleSeoEn ?? SEO[slug]?.title ?? `${guide.titleEn} — iGaming Strategy Guide | 1weapp`
  const description = guide.descriptionSeoEn ?? SEO[slug]?.description ?? guide.subtitleEn
  const keywords = SEO[slug]?.keywords ?? guide.tagEn

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE}/en/guides/${slug}`,
      languages: {
        en: `${BASE}/en/guides/${slug}`,
        ru: `${BASE}/ru/guides/${slug}`,
        'x-default': `${BASE}/en/guides/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/en/guides/${slug}`,
      locale: 'en_US',
      type: 'article',
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
  return <GuideSinglePage slug={slug} lang="en" jsonLd={jsonLd} />
}
