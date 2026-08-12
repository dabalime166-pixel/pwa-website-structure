'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Lang } from '@/lib/games'

export type MoodThemeItem = {
  id: string
  label: string
  href: string
  avatar: string
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === 'left' ? 'M14.5 4.5 L7.5 12 L14.5 19.5' : 'M9.5 4.5 L16.5 12 L9.5 19.5'}
        stroke="currentColor"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MoodThemeRail({
  items,
  lang,
}: {
  items: MoodThemeItem[]
  lang: Lang
}) {
  const railRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max - 4)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(sync) : null
    ro?.observe(el)
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      ro?.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [sync, items.length])

  const scrollByDir = (dir: -1 | 1) => {
    const el = railRef.current
    if (!el) return
    const step = Math.min(el.clientWidth * 0.72, 360)
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const isEn = lang === 'en'

  return (
    <div className={`home-mood-banner__rail-wrap${canPrev ? ' has-prev' : ''}${canNext ? ' has-next' : ''}`}>
      <button
        type="button"
        className="home-mood-banner__arrow home-mood-banner__arrow--prev"
        onClick={() => scrollByDir(-1)}
        disabled={!canPrev}
        aria-label={isEn ? 'Scroll themes left' : 'Листать темы влево'}
      >
        <Chevron dir="left" />
      </button>

      <ul
        ref={railRef}
        className="home-mood-banner__rail"
        aria-label={isEn ? 'Themes' : 'Темы'}
      >
        {items.map((t, i) => (
          <li key={t.id} style={{ '--i': i } as CSSProperties}>
            <Link href={t.href} className="home-mood-banner__tile">
              <span className="home-mood-banner__tile-art">
                <Image
                  src={t.avatar}
                  alt={
                    isEn
                      ? `${t.label} demo theme`
                      : `Тема демо: ${t.label}`
                  }
                  width={120}
                  height={160}
                  sizes="96px"
                />
              </span>
              <span className="home-mood-banner__tile-label">{t.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="home-mood-banner__arrow home-mood-banner__arrow--next"
        onClick={() => scrollByDir(1)}
        disabled={!canNext}
        aria-label={isEn ? 'Scroll themes right' : 'Листать темы вправо'}
      >
        <Chevron dir="right" />
      </button>
    </div>
  )
}
