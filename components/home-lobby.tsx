'use client'

import { useEffect, useMemo, useState } from 'react'
import { GameCard } from '@/components/game-card'
import { RecentFavorites } from '@/components/recent-favorites'
import type { Game, Lang } from '@/lib/games'

interface HomeLobbyProps {
  lang: Lang
  /** Keep this list small (Popular only) — large catalogs live on provider hubs. */
  popularGames: Game[]
}

const PREVIEW = 10

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

export function HomeLobby({ lang, popularGames }: HomeLobbyProps) {
  const isEn = lang === 'en'
  const [query, setQuery] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQ(query), 160)
    return () => window.clearTimeout(t)
  }, [query])

  const filtered = useMemo(() => {
    return popularGames.filter(
      (g) => matchesType(g, typeFilter) && matchesQuery(g, debouncedQ),
    )
  }, [popularGames, typeFilter, debouncedQ])

  const list = expanded || debouncedQ || typeFilter !== 'all' ? filtered : filtered.slice(0, PREVIEW)
  const canExpand = !debouncedQ && typeFilter === 'all' && filtered.length > PREVIEW

  const typeChips: { id: TypeFilter; label: string }[] = [
    { id: 'all', label: isEn ? 'All' : 'Все' },
    { id: 'Slots', label: isEn ? 'Slots' : 'Слоты' },
    { id: 'Crash Games', label: isEn ? 'Crash' : 'Краш' },
    { id: 'Megaways', label: 'Megaways' },
    { id: 'Mines', label: 'Mines' },
  ]

  function scrollRow(dir: -1 | 1) {
    const row = document.getElementById('lobby-popular-row')
    if (!row) return
    row.scrollBy({ left: dir * Math.min(640, row.clientWidth * 0.85), behavior: 'smooth' })
  }

  return (
    <div className="home-lobby">
      <div className="lobby-toolbar">
        <div className="lobby-toolbar__panel lobby-toolbar__panel--simple">
          <label className="lobby-search">
            <span className="lobby-search__icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEn ? 'Search popular…' : 'Поиск в популярных…'}
              aria-label={isEn ? 'Search popular demos' : 'Поиск популярных демо'}
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button
                type="button"
                className="lobby-search__clear"
                onClick={() => setQuery('')}
                aria-label={isEn ? 'Clear' : 'Сбросить'}
              >
                ×
              </button>
            ) : null}
          </label>

          <div className="lobby-types" role="group" aria-label={isEn ? 'Game type' : 'Тип игры'}>
            {typeChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className={`lobby-types__chip${typeFilter === chip.id ? ' is-active' : ''}`}
                aria-pressed={typeFilter === chip.id}
                onClick={() => setTypeFilter(chip.id)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <RecentFavorites lang={lang} />

      <section
        id="lobby-popular"
        className="lobby-section lobby-section--popular is-ready"
        aria-labelledby="lobby-popular-title"
      >
        <div className="lobby-section-header">
          <div className="lobby-section-header__brand">
            <span className="lobby-section-mark" aria-hidden="true">
              P
            </span>
            <div>
              <p className="lobby-section-header__subtitle">
                {isEn ? 'Instant picks' : 'Быстрый выбор'}
              </p>
              <h2 id="lobby-popular-title" className="lobby-section-header__title">
                {isEn ? 'Popular' : 'Популярные'}
              </h2>
            </div>
          </div>

          <div className="lobby-section-header__actions">
            <span className="lobby-section-header__count">{filtered.length}</span>
            {!expanded && !(debouncedQ || typeFilter !== 'all') && (
              <div className="lobby-scroll-btns">
                <button
                  type="button"
                  className="lobby-scroll-btn"
                  onClick={() => scrollRow(-1)}
                  aria-label={isEn ? 'Previous' : 'Назад'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M14.5 5 L8 12 L14.5 19" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="lobby-scroll-btn"
                  onClick={() => scrollRow(1)}
                  aria-label={isEn ? 'Next' : 'Вперёд'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9.5 5 L16 12 L9.5 19" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
            {canExpand && (
              <button
                type="button"
                className="lobby-section-more"
                aria-expanded={expanded}
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? (isEn ? 'Collapse' : 'Свернуть') : isEn ? 'More' : 'Ещё'}
              </button>
            )}
          </div>
        </div>

        {list.length > 0 ? (
          <div
            id="lobby-popular-row"
            className={expanded || debouncedQ || typeFilter !== 'all' ? 'lobby-section__grid' : 'lobby-section__row'}
            role="list"
          >
            {list.map((game, i) => (
              <div key={game.slug} className="lobby-tile" role="listitem">
                <GameCard game={game} lang={lang} priority={i < 2} />
              </div>
            ))}
          </div>
        ) : (
          <p className="lobby-empty">{isEn ? 'No demos found' : 'Ничего не найдено'}</p>
        )}
      </section>
    </div>
  )
}
