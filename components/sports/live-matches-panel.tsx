'use client'

import { useEffect, useState, useTransition } from 'react'
import type { FixtureItem } from '@/lib/sports-types'
import type { Lang } from '@/lib/games'
import { MatchCard } from '@/components/sports/match-card'

export function LiveMatchesPanel({
  lang,
  initial,
  emptyLabel,
  refreshLabel,
}: {
  lang: Lang
  initial: FixtureItem[]
  emptyLabel: string
  refreshLabel: string
}) {
  const [items, setItems] = useState(initial)
  const [pending, startTransition] = useTransition()
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const tick = async () => {
      try {
        const res = await fetch('/api/sports/live', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as { response?: FixtureItem[] }
        if (cancelled) return
        startTransition(() => {
          setItems(Array.isArray(data.response) ? data.response : [])
          setUpdatedAt(new Date().toLocaleTimeString())
        })
      } catch {
        /* keep last good payload */
      }
    }

    const id = window.setInterval(tick, 20000)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [])

  return (
    <section className="sports-section" aria-labelledby="sports-live-title">
      <div className="sports-section__head">
        <h2 id="sports-live-title">{lang === 'en' ? 'Live now' : 'Сейчас идут'}</h2>
        <p className="sports-section__hint">
          {refreshLabel}
          {updatedAt ? ` · ${updatedAt}` : ''}
          {pending ? '…' : ''}
        </p>
      </div>
      {items.length === 0 ? (
        <p className="sports-empty">{emptyLabel}</p>
      ) : (
        <div className="sports-match-grid">
          {items.map((f) => (
            <MatchCard key={f.fixture.id} fixture={f} lang={lang} />
          ))}
        </div>
      )}
    </section>
  )
}
