'use client'

import { useEffect, useState } from 'react'
import { GameCard } from '@/components/game-card'
import type { Game, Lang } from '@/lib/games'

interface HotDemosCarouselProps {
  games: Game[]
  lang: Lang
  label: string
  title: string
}

export function HotDemosCarousel({ games, lang, label, title }: HotDemosCarouselProps) {
  const isEn = lang === 'en'
  const [paused, setPaused] = useState(false)

  // Respect reduced-motion preference: start paused
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) setPaused(true)
  }, [])

  if (games.length === 0) return null

  // Duplicate for seamless infinite loop
  const loop = [...games, ...games]

  return (
    <section className="home-featured" aria-label={title}>
      <div className="home-featured__inner">
        <div className="home-section-head home-section-head--carousel">
          <div className="home-section-head__text">
            <span className="home-section-head__label">{label}</span>
            <h2 className="home-section-head__title">{title}</h2>
          </div>

          <button
            type="button"
            className={`hot-carousel__toggle${paused ? ' is-paused' : ''}`}
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            aria-label={
              paused
                ? isEn
                  ? 'Resume hot demos scrolling'
                  : 'Возобновить прокрутку горячих демо'
                : isEn
                  ? 'Stop hot demos scrolling'
                  : 'Остановить прокрутку горячих демо'
            }
          >
            {paused ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {isEn ? 'Resume' : 'Продолжить'}
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
                {isEn ? 'Stop' : 'Остановить'}
              </>
            )}
          </button>
        </div>

        <div className={`hot-carousel${paused ? ' is-paused' : ''}`}>
          <div className="hot-carousel__fade hot-carousel__fade--left" aria-hidden="true" />
          <div className="hot-carousel__fade hot-carousel__fade--right" aria-hidden="true" />
          <div className="hot-carousel__viewport">
            <div className="hot-carousel__track">
              {loop.map((game, index) => (
                <div
                  key={`${game.slug}-${index}`}
                  className="hot-carousel__item"
                  aria-hidden={index >= games.length ? true : undefined}
                >
                  <GameCard game={game} lang={lang} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
