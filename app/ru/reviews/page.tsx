import type { Metadata } from 'next'
import ReviewsIndexPage from '@/components/reviews-index-page'
import { clampMetaDescription, withBrandTitle } from '@/lib/seo'

const BASE = 'https://www.1weapp.online/ru'

export const metadata: Metadata = {
  title: withBrandTitle('Обзоры игр — RTP, механика и где играть'),
  description: clampMetaDescription(
    'Независимые обзоры игр с уникальным SEO-текстом, RTP и редиректом в казино — без демо iframe. Mine Slot, Mine Slot 2 и другие.',
    'ru',
  ),
  keywords:
    'обзоры игр, обзор Mine Slot, обзор Mine Slot 2, где играть на деньги, шортлист казино',
  alternates: {
    canonical: `${BASE}/reviews`,
    languages: {
      en: 'https://www.1weapp.online/en/reviews',
      ru: `${BASE}/reviews`,
      'x-default': 'https://www.1weapp.online/en/reviews',
    },
  },
}

export default function Page() {
  return <ReviewsIndexPage lang="ru" />
}
