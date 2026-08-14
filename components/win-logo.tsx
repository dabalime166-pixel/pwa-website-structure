'use client'

import { Nunito } from 'next/font/google'

const winSans = Nunito({
  subsets: ['latin', 'latin-ext'],
  weight: ['900'],
  style: ['italic'],
  display: 'swap',
})

export function WinLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`win-logo ${winSans.className} ${className}`.trim()} aria-label="1win">
      <span className="win-logo__one">1</span>
      <span className="win-logo__w">w</span>
      <span className="win-logo__i">
        {'ı'}
        <span className="win-logo__dot" aria-hidden="true" />
      </span>
      <span className="win-logo__n">n</span>
    </span>
  )
}
