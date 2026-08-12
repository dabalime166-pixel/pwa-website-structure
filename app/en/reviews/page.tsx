import type { Metadata } from 'next'
import ReviewsIndexPage from '@/components/reviews-index-page'
import { clampMetaDescription, withBrandTitle } from '@/lib/seo'

const BASE = 'https://www.1weapp.online/en'

export const metadata: Metadata = {
  title: withBrandTitle('Game Reviews — RTP, Mechanics & Where to Play'),
  description: clampMetaDescription(
    'Independent game reviews with unique SEO copy, RTP notes and casino redirects — no demo iframes. Mine Slot, Mine Slot 2 and more.',
    'en',
  ),
  keywords:
    'game reviews, Mine Slot review, Mine Slot 2 review, where to play for real money, casino shortlist',
  alternates: {
    canonical: `${BASE}/reviews`,
    languages: {
      en: `${BASE}/reviews`,
      ru: 'https://www.1weapp.online/ru/reviews',
      'x-default': `${BASE}/reviews`,
    },
  },
}

export default function Page() {
  return <ReviewsIndexPage lang="en" />
}
