'use client'

import { useEffect, useMemo, useState } from 'react'
import { GameCard } from '@/components/game-card'
import { RecentFavorites } from '@/components/recent-favorites'
import type { Game, Lang } from '@/lib/games'

interface HomeLobbyProps {
  lang: Lang
  popularGames: Game[]
  allGames: Game[]
}

const PREVIEW = 24

type TypeFilter = 'all' | 'Slots' | 'Crash Games' | 'Megaways' | 'Mines'

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9а-яё\s-]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function matchesQuery(game: Game, q: string) {
  if (!q) return true
  const hay = normalize(`${game.name} ${game.provider} ${game.slug} ${game.gameType || ''}`)
  const tokens = normalize(q).split(' ').filter(Boolean)
  if (!tokens.length) return true
  return tokens.every((t) => hay.includes(t))
}

function matchesType(game: Game, type: TypeFilter) {
  if (type === 'all') return true
  const gt = game.gameType || 'Slots'
  if (type === 'Slots') return gt === 'Slots' || !game.gameType
  return gt === type
}

export function HomeLobby({ lang, popularGames, allGames }: HomeLobbyProps) {
  const isEn = lang === 'en'
  const [query, setQuery] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQ(query), 160)
    return () => window.clearTimeout(t)
  }, [query])

  const isSearching = Boolean(debouncedQ)

  const filtered = useMemo(() => {
    const pool = isSearching ? allGames : popularGames
    return pool.filter((g) => matchesType(g, typeFilter) && matchesQuery(g, debouncedQ))
  }, [allGames, popularGames, typeFilter, debouncedQ, isSearching])

  const list =
    expanded || isSearching || typeFilter !== 'all' ? filtered : filtered.slice(0, PREVIEW)
  const canExpand = !isSearching && typeFilter === 'all' && filtered.length > PREVIEW

  const typeChips: { id: TypeFilter; label: string }[] = [
    { id: 'all', label: isEn ? 'All' : 'Все' },
    { id: 'Slots', label: isEn ? 'Slots' : 'Слоты' },
    { id: 'Crash Games', label: isEn ? 'Crash' : 'Краш' },
    { id: 'Megaways', label: 'Megaways' },
    { id: 'Mines', label: 'Mines' },
  ]

  return (
    <div className="atelier-lobby">
      <div className="atelier-lobby__controls">
        <label className="atelier-search">
          <span className="atelier-search__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isEn ? 'Search all demos…' : 'Поиск по всем демо…'}
            aria-label={isEn ? 'Search all demos' : 'Поиск по всем демо'}
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button
              type="button"
              className="atelier-search__clear"
              onClick={() => setQuery('')}
              aria-label={isEn ? 'Clear' : 'Сбросить'}
            >
              ×
            </button>
          ) : null}
        </label>

        <div className="atelier-filters" role="group" aria-label={isEn ? 'Game type' : 'Тип игры'}>
          {typeChips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className={`atelier-filters__chip${typeFilter === chip.id ? ' is-active' : ''}`}
              aria-pressed={typeFilter === chip.id}
              onClick={() => setTypeFilter(chip.id)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <RecentFavorites lang={lang} />

      <div className="atelier-lobby__meta">
        <p className="atelier-lobby__label">
          {isSearching
            ? isEn
              ? 'Search results'
              : 'Результаты'
            : isEn
              ? 'Popular picks'
              : 'Популярное'}
        </p>
        <span className="atelier-lobby__count">{filtered.length}</span>
      </div>

      {list.length > 0 ? (
        <div className="atelier-lobby__grid" role="list">
          {list.map((game, i) => (
            <div key={game.slug} className="atelier-lobby__tile" role="listitem">
              <GameCard game={game} lang={lang} priority={i < 4} />
            </div>
          ))}
        </div>
      ) : (
        <p className="atelier-lobby__empty">{isEn ? 'No demos found' : 'Ничего не найдено'}</p>
      )}

      {canExpand ? (
        <div className="atelier-lobby__more">
          <button
            type="button"
            className="atelier-btn atelier-btn--ghost"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? (isEn ? 'Show less' : 'Свернуть') : isEn ? 'Show more' : 'Показать ещё'}
          </button>
        </div>
      ) : null}
    </div>
  )
}
