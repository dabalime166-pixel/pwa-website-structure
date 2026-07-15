'use client'

import { useState, useId, useRef } from 'react'
import { GameCard } from '@/components/game-card'
import type { Game, Lang } from '@/lib/games'

interface GameSearchProps {
  games: Game[]
  lang: Lang
  totalLabel: string     // "All Games" / "Все игры"
  emptyLabel: string     // "No games found" / "Ничего не найдено"
  clearLabel: string     // "Clear" / "Очистить"
  placeholderLabel: string
}

const INITIAL_GAMES_COUNT = 12  // Show first 12 games initially for performance
const LOAD_MORE_COUNT = 12       // Load 12 more games on each "Load More" click

export function GameSearch({
  games,
  lang,
  totalLabel,
  emptyLabel,
  clearLabel,
  placeholderLabel,
}: GameSearchProps) {
  const [query, setQuery] = useState('')
  const [displayedCount, setDisplayedCount] = useState(INITIAL_GAMES_COUNT)
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const q = query.trim().toLowerCase()
  const filtered = q
    ? games.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.provider.toLowerCase().includes(q),
      )
    : games
  
  // Only show up to displayedCount games, but show all when searching
  const displayed = q ? filtered : filtered.slice(0, displayedCount)
  const hasMore = !q && displayedCount < filtered.length

  function clear() {
    setQuery('')
    setDisplayedCount(INITIAL_GAMES_COUNT)  // Reset to initial count when clearing
    inputRef.current?.focus()
  }
  
  function loadMore() {
    setDisplayedCount((prev) => prev + LOAD_MORE_COUNT)
  }

  return (
    <>
      {/* ── Search bar ── */}
      <div className="game-search__bar">
        <label htmlFor={inputId} className="sr-only">
          {placeholderLabel}
        </label>

        {/* Search icon */}
        <svg
          className="game-search__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          ref={inputRef}
          id={inputId}
          className="game-search__input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholderLabel}
          autoComplete="off"
          spellCheck={false}
          aria-label={placeholderLabel}
          aria-controls="games-grid-results"
        />

        {/* Clear button — only visible when there is a query */}
        {q && (
          <button
            type="button"
            className="game-search__clear"
            onClick={clear}
            aria-label={clearLabel}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Result count ── */}
      <div className="game-search__meta" aria-live="polite" aria-atomic="true">
        <span className="game-search__meta-title">
          {q ? (lang === 'en' ? 'Results' : 'Результаты') : totalLabel}
        </span>
        <span className="game-search__meta-count">{filtered.length}</span>
        {q && filtered.length > 0 && (
          <span className="game-search__meta-query">
            {lang === 'en' ? `for "${query}"` : `по "${query}"`}
          </span>
        )}
      </div>

      {/* ── Grid or empty state ── */}
      {filtered.length > 0 ? (
        <>
          <div
            id="games-grid-results"
            className="games-grid"
            role="list"
            aria-label={lang === 'en' ? 'Games list' : 'Список игр'}
          >
            {displayed.map((game) => (
              <div key={game.slug} role="listitem">
                <GameCard game={game} lang={lang} />
              </div>
            ))}
          </div>
          
          {/* Load More button — visible only when there are hidden games */}
          {hasMore && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
              <button
                type="button"
                onClick={loadMore}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--color-gold)',
                  color: 'var(--color-bg-primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-button)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                aria-label={lang === 'en' ? 'Load more games' : 'Загрузить ещё'}
              >
                {lang === 'en' ? 'Load More' : 'Показать ещё'} ({filtered.length - displayed.length} {lang === 'en' ? 'remaining' : 'осталось'})
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="game-search__empty" role="status" aria-live="polite">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ color: 'var(--color-gold)', opacity: 0.5, marginBottom: '0.75rem' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p className="game-search__empty-text">{emptyLabel}</p>
          <button
            type="button"
            className="game-search__empty-reset"
            onClick={clear}
          >
            {clearLabel}
          </button>
        </div>
      )}
    </>
  )
}
