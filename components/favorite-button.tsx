'use client'

import { useEffect, useState } from 'react'
import { isFavorite, toggleFavorite } from '@/lib/player-prefs'
import type { Lang } from '@/lib/games'

export function FavoriteButton({ slug, lang }: { slug: string; lang: Lang }) {
  const isEn = lang === 'en'
  const [on, setOn] = useState(false)

  useEffect(() => {
    setOn(isFavorite(slug))
  }, [slug])

  return (
    <button
      type="button"
      className={`game-card__fav${on ? ' is-on' : ''}`}
      aria-pressed={on}
      aria-label={on ? (isEn ? 'Remove from favorites' : 'Убрать из избранного') : isEn ? 'Add to favorites' : 'В избранное'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setOn(toggleFavorite(slug))
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    </button>
  )
}
