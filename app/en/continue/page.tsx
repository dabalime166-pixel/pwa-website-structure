import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContinuePage } from '@/components/continue-page'
import { CONTINUE_COPY } from '@/lib/continue'

export const metadata: Metadata = {
  title: CONTINUE_COPY.en.metaTitle,
  description: CONTINUE_COPY.en.metaDesc,
  robots: { index: false, follow: false },
}

export default function EnContinueRoute() {
  return (
    <Suspense fallback={<div className="continue-page" aria-hidden="true" />}>
      <ContinuePage lang="en" />
    </Suspense>
  )
}
