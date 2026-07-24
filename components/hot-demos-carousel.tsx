'use client'

import { GameCard } from '@/components/game-card'
import type { Game, Lang } from '@/lib/games'

interface HotDemosCarouselProps {
  games: Game[]
  lang: Lang
  label: string
  title: string
}

export function HotDemosCarousel({ games, lang, label, title }: HotDemosCarouselProps) {
  if (games.length === 0) return null

  // Duplicate for seamless infinite loop on desktop
  const loop = [...games, ...games]

  return (
    <section className="home-featured" aria-label={title}>
      <div className="home-featured__inner">
        <div className="home-section-head">
          <span className="home-section-head__label">{label}</span>
          <h2 className="home-section-head__title">{title}</h2>
        </div>

        {/* Desktop: continuous auto-scrolling marquee */}
        <div className="hot-carousel hot-carousel--desktop" aria-hidden={false}>
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

        {/* Mobile: swipeable row (no endless auto-spin) */}
        <div className="hot-carousel hot-carousel--mobile">
          <div className="hot-carousel__mobile-track">
            {games.map((game) => (
              <div key={game.slug} className="hot-carousel__item">
                <GameCard game={game} lang={lang} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
