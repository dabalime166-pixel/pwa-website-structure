'use client'

import { useEffect, useRef, useState } from 'react'
import { RandomDemoPromo } from '@/components/random-demo-promo'
import type { Game, Lang } from '@/lib/games'

/** Mount Random demo only when near viewport — keeps first paint light. */
export function LazyRandomDemo({ games, lang }: { games: Game[]; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setReady(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true)
          io.disconnect()
        }
      },
      { rootMargin: '240px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="lazy-random-demo">
      {ready ? (
        <RandomDemoPromo games={games} lang={lang} />
      ) : (
        <div className="random-slot-promo random-slot-promo--skeleton" aria-hidden="true" />
      )}
    </div>
  )
}
