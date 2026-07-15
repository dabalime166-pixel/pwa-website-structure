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
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedProvider, setSelectedProvider] = useState<string>('')
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  // Extract unique game types and providers from games data
  const gameTypes = [...new Set(games.map(g => g.gameType).filter(Boolean))].sort()
  const providers = [...new Set(games.map(g => g.provider).filter(Boolean))].sort()

  const q = query.trim().toLowerCase()
  const filtered = games.filter((g) => {
    // Text search (name or provider)
    const matchesQuery = !q ||
      g.name.toLowerCase().includes(q) ||
      g.provider.toLowerCase().includes(q)
    
    // Game type filter
    const matchesType = !selectedType || g.gameType === selectedType
    
    // Provider filter
    const matchesProvider = !selectedProvider || g.provider === selectedProvider
    
    return matchesQuery && matchesType && matchesProvider
  })
  
  // Only show up to displayedCount games, but show all when searching or filtering
  const isActiveFilter = q || selectedType || selectedProvider
  const displayed = isActiveFilter ? filtered : filtered.slice(0, displayedCount)
  const hasMore = !isActiveFilter && displayedCount < filtered.length

  function clearAll() {
    setQuery('')
    setSelectedType('')
    setSelectedProvider('')
    setDisplayedCount(INITIAL_GAMES_COUNT)
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
            onClick={clearAll}
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

      {/* ── Filter controls ── */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Game Type Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label
            htmlFor="game-type-select"
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
            }}
          >
            {lang === 'en' ? 'Type' : 'Тип'}:
          </label>
          <select
            id="game-type-select"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value)
              setDisplayedCount(INITIAL_GAMES_COUNT)
            }}
            style={{
              padding: '0.625rem 0.875rem',
              background: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              border: '1.5px solid var(--color-gold)',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 8px rgba(218, 165, 32, 0.15)',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23DAA520' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.625rem center',
              backgroundSize: '1rem',
              paddingRight: '2.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f4d03f'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(218, 165, 32, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-gold)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(218, 165, 32, 0.15)'
            }}
          >
            <option value="">
              {lang === 'en' ? 'All' : 'Все'}
            </option>
            {gameTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Provider Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label
            htmlFor="provider-select"
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
            }}
          >
            {lang === 'en' ? 'Provider' : 'Провайдер'}:
          </label>
          <select
            id="provider-select"
            value={selectedProvider}
            onChange={(e) => {
              setSelectedProvider(e.target.value)
              setDisplayedCount(INITIAL_GAMES_COUNT)
            }}
            style={{
              padding: '0.625rem 0.875rem',
              background: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              border: '1.5px solid var(--color-gold)',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 8px rgba(218, 165, 32, 0.15)',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23DAA520' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.625rem center',
              backgroundSize: '1rem',
              paddingRight: '2.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f4d03f'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(218, 165, 32, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-gold)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(218, 165, 32, 0.15)'
            }}
          >
            <option value="">
              {lang === 'en' ? 'All' : 'Все'}
            </option>
            {providers.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        {(selectedType || selectedProvider) && (
          <button
            type="button"
            onClick={() => {
              setSelectedType('')
              setSelectedProvider('')
              setDisplayedCount(INITIAL_GAMES_COUNT)
            }}
            style={{
              padding: '0.5rem 0.75rem',
              background: 'transparent',
              color: 'var(--color-gold)',
              border: '1px solid var(--color-gold)',
              borderRadius: '0.375rem',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-gold)'
              e.currentTarget.style.color = 'var(--color-bg-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-gold)'
            }}
            aria-label={lang === 'en' ? 'Reset filters' : 'Сбросить фильтры'}
          >
            {lang === 'en' ? 'Reset' : 'Сбросить'}
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
                  padding: '0.875rem 2rem',
                  background: 'var(--color-gold)',
                  color: 'var(--color-bg-primary)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 12px rgba(218, 165, 32, 0.25)',
                  letterSpacing: '0.3px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(218, 165, 32, 0.35)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(218, 165, 32, 0.25)'
                }}
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
            onClick={clearAll}
          >
            {clearLabel}
          </button>
        </div>
      )}
    </>
  )
}
