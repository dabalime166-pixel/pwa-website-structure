import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { REVIEWS, getReviewById, type ReviewData } from '@/lib/reviews-data'
import ReviewSinglePage from '@/components/review-single-page'
import { EXPERT } from '@/lib/expert'
import { clampMetaDescription, withBrandTitle } from '@/lib/seo'

const BASE = 'https://www.1weapp.online/ru'

function buildReviewJsonLd(review: ReviewData, slug: string): string {
  const faq = review.faq.ru.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  }))

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Review',
        itemReviewed: {
          '@type': 'SoftwareApplication',
          name: review.titleRu.replace('Обзор ', ''),
          applicationCategory: 'GameApplication',
          operatingSystem: 'Web',
        },
        author: {
          '@type': 'Person',
          name: EXPERT.name,
          jobTitle: EXPERT.titleRu,
        },
        reviewBody: review.descriptionRu,
        headline: review.titleSeoRu,
        inLanguage: 'ru',
        url: `${BASE}/reviews/${slug}`,
        datePublished: '2026-03-15',
        dateModified: new Date().toISOString().split('T')[0],
        publisher: {
          '@type': 'Organization',
          name: '1weapp',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq,
      },
    ],
  })
}

export async function generateStaticParams() {
  return REVIEWS.map((r) => ({ slug: r.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const review = getReviewById(slug)
  if (!review) return {}

  const title = withBrandTitle(review.titleSeoRu)
  const description = clampMetaDescription(review.descriptionSeoRu, 'ru')
  const keywords = review.keywordsRu.join(', ')

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE}/reviews/${slug}`,
      languages: {
        en: `https://www.1weapp.online/en/reviews/${slug}`,
        ru: `${BASE}/reviews/${slug}`,
        'x-default': `https://www.1weapp.online/en/reviews/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/reviews/${slug}`,
      locale: 'ru_RU',
      type: 'article',
      images: [{ url: `https://www.1weapp.online${review.avatar}` }],
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
  const review = getReviewById(slug)
  if (!review) notFound()
  return <ReviewSinglePage slug={slug} lang="ru" jsonLd={buildReviewJsonLd(review, slug)} />
}
