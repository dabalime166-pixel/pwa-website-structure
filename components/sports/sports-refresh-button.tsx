'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { Lang } from '@/lib/games'
import { tSports } from '@/lib/sports-i18n'

export function SportsRefreshButton({
  lang,
  className = '',
}: {
  lang: Lang
  className?: string
}) {
  const t = tSports(lang)
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  return (
    <button
      type="button"
      className={`sports-refresh-btn${className ? ` ${className}` : ''}${pending ? ' is-pending' : ''}`}
      disabled={pending}
      aria-busy={pending}
      onClick={() => {
        startTransition(() => {
          router.refresh()
          setUpdatedAt(new Date().toLocaleTimeString())
        })
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 12a8 8 0 1 1-2.34-5.66"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path d="M20 4v5h-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{pending ? t.refreshing : t.refresh}</span>
      {updatedAt && !pending ? <span className="sports-refresh-btn__time">{updatedAt}</span> : null}
    </button>
  )
}
