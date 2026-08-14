import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContinuePage } from '@/components/continue-page'
import { CONTINUE_COPY } from '@/lib/continue'

export const metadata: Metadata = {
  title: CONTINUE_COPY.ru.metaTitle,
  description: CONTINUE_COPY.ru.metaDesc,
  robots: { index: false, follow: false },
}

export default function RuContinueRoute() {
  return (
    <Suspense fallback={<div className="continue-page" aria-hidden="true" />}>
      <ContinuePage lang="ru" />
    </Suspense>
  )
}
