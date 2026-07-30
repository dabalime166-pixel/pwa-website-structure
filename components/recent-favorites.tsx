'use client'

import { useEffect, useMemo, useState } from 'react'
import { GameCard } from '@/components/game-card'
import { readFavoriteSlugs, readRecentSlugs } from '@/lib/player-prefs'
import type { Game, Lang } from '@/lib/games'

interface RecentFavoritesProps {
  lang: Lang
  allGames: Game[]
}

export function RecentFavorites({ lang, allGames }: RecentFavoritesProps) {
  const isEn = lang === 'en'
  const [recent, setRecent] = useState<string[]>([])
  const [favs, setFavs] = useState<string[]>([])

  useEffect(() => {
    setRecent(readRecentSlugs())
    setFavs(readFavoriteSlugs())
  }, [])

  const bySlug = useMemo(() => {
    const m = new Map<string, Game>()
    for (const g of allGames) m.set(g.slug, g)
    return m
  }, [allGames])

  const recentGames = recent.map((s) => bySlug.get(s)).filter((g): g is Game => Boolean(g))
  const favGames = favs.map((s) => bySlug.get(s)).filter((g): g is Game => Boolean(g))

  if (!recentGames.length && !favGames.length) return null

  return (
    <div className="lobby-personal">
      {recentGames.length > 0 && (
        <section className="lobby-section lobby-section--recent" aria-label={isEn ? 'Recently viewed' : 'Недавно смотрели'}>
          <div className="lobby-section-header">
            <div>
              <p className="lobby-section-header__subtitle">{isEn ? 'For you' : 'Для вас'}</p>
              <h2 className="lobby-section-header__title">{isEn ? 'Recently viewed' : 'Недавно смотрели'}</h2>
            </div>
            <span className="lobby-section-header__count">{recentGames.length}</span>
          </div>
          <div className="lobby-section__row" role="list">
            {recentGames.map((game) => (
              <div key={game.slug} className="lobby-tile" role="listitem">
                <GameCard game={game} lang={lang} />
              </div>
            ))}
          </div>
        </section>
      )}

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
