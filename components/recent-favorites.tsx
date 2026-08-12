'use client'

import { useEffect, useState } from 'react'
import { GameCard } from '@/components/game-card'
import {
  dismissRecentSection,
  isRecentSectionDismissed,
  readFavoriteSlugs,
  readRecentSlugs,
} from '@/lib/player-prefs'
import type { Game, Lang } from '@/lib/games'

interface RecentFavoritesProps {
  lang: Lang
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function RecentFavorites({ lang }: RecentFavoritesProps) {
  const isEn = lang === 'en'
  const [recentGames, setRecentGames] = useState<Game[]>([])
  const [favGames, setFavGames] = useState<Game[]>([])
  const [recentDismissed, setRecentDismissed] = useState<boolean | null>(null)

  useEffect(() => {
    setRecentDismissed(isRecentSectionDismissed())
  }, [])

  useEffect(() => {
    const recent = readRecentSlugs().slice(0, 8)
    const favs = readFavoriteSlugs().slice(0, 8)
    const needed = [...new Set([...recent, ...favs])]
    if (!needed.length) return

    let cancelled = false
    const ctrl = new AbortController()

    fetch(`/api/games-lookup?slugs=${encodeURIComponent(needed.join(','))}`, {
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { games?: Game[] }) => {
        if (cancelled) return
        const bySlug = new Map((data.games || []).map((g) => [g.slug, g]))
        setRecentGames(recent.map((s) => bySlug.get(s)).filter((g): g is Game => Boolean(g)))
        setFavGames(favs.map((s) => bySlug.get(s)).filter((g): g is Game => Boolean(g)))
      })
      .catch(() => {
        /* ignore */
      })

    return () => {
      cancelled = true
      ctrl.abort()
    }
  }, [])

  const closeRecent = () => {
    dismissRecentSection()
    setRecentHidden(true)
  }

  const showRecent = recentGames.length > 0 && !recentHidden

  if (!showRecent && !favGames.length) return null

  return (
    <div className="lobby-personal">
      {showRecent ? (
        <section className="lobby-section lobby-section--recent" aria-label={isEn ? 'Recently viewed' : 'Недавно смотрели'}>
          <div className="lobby-section-header">
            <div>
              <p className="lobby-section-header__subtitle">{isEn ? 'For you' : 'Для вас'}</p>
              <h2 className="lobby-section-header__title">{isEn ? 'Recently viewed' : 'Недавно смотрели'}</h2>
            </div>
            <div className="lobby-section-header__actions">
              <span className="lobby-section-header__count">{recentGames.length}</span>
              <button
                type="button"
                className="lobby-section-header__close"
                onClick={closeRecent}
                aria-label={isEn ? 'Hide recently viewed' : 'Скрыть недавно смотрели'}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="lobby-section__row" role="list">
            {recentGames.map((game) => (
              <div key={game.slug} className="lobby-tile" role="listitem">
                <GameCard game={game} lang={lang} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {favGames.length > 0 && (
        <section className="lobby-section lobby-section--favorites" aria-label={isEn ? 'Favorites' : 'Избранное'}>
          <div className="lobby-section-header">
            <div>
              <p className="lobby-section-header__subtitle">{isEn ? 'Saved' : 'Сохранено'}</p>
              <h2 className="lobby-section-header__title">{isEn ? 'Favorites' : 'Избранное'}</h2>
            </div>
            <span className="lobby-section-header__count">{favGames.length}</span>
          </div>
          <div className="lobby-section__row" role="list">
            {favGames.map((game) => (
              <div key={game.slug} className="lobby-tile" role="listitem">
                <GameCard game={game} lang={lang} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
