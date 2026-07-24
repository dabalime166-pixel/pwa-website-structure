'use client'

import { useState, useId, useRef } from 'react'
import { GameCard } from '@/components/game-card'
import { CustomDropdown } from '@/components/custom-dropdown'
import type { Game, Lang } from '@/lib/games'

interface GameSearchProps {
  games: Game[]
  lang: Lang
  totalLabel: string
  emptyLabel: string
  clearLabel: string
  placeholderLabel: string
}

const INITIAL_GAMES_COUNT = 12
const LOAD_MORE_COUNT = 12

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

  const gameTypes = [...new Set(games.map((g) => g.gameType).filter(Boolean))].sort() as string[]
  const providers = [...new Set(games.map((g) => g.provider).filter(Boolean))].sort() as string[]

  const q = query.trim().toLowerCase()
  const filtered = games.filter((g) => {
    const matchesQuery =
      !q || g.name.toLowerCase().includes(q) || g.provider.toLowerCase().includes(q)
    const matchesType = !selectedType || g.gameType === selectedType
    const matchesProvider = !selectedProvider || g.provider === selectedProvider
    return matchesQuery && matchesType && matchesProvider
  })

  const isActiveFilter = Boolean(q || selectedType || selectedProvider)
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

  function selectType(type: string) {
    setSelectedType(type)
    setDisplayedCount(INITIAL_GAMES_COUNT)
  }

  return (
    <>
      <div className="game-search__bar">
        <label htmlFor={inputId} className="sr-only">
          {placeholderLabel}
        </label>

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

        {q && (
          <button
            type="button"
            className="game-search__clear"
            onClick={clearAll}
            aria-label={clearLabel}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className="game-search__chips" role="group" aria-label={lang === 'en' ? 'Game type' : 'Тип игры'}>
        <button
          type="button"
          className={`filter-chip ${selectedType === '' ? 'is-active' : ''}`}
          onClick={() => selectType('')}
        >
          {lang === 'en' ? 'All' : 'Все'}
        </button>
        {gameTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={`filter-chip ${selectedType === type ? 'is-active' : ''}`}
            onClick={() => selectType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="game-search__filters">
        <div className="game-search__filter">
          <label htmlFor="provider-select">{lang === 'en' ? 'Provider' : 'Провайдер'}</label>
          <CustomDropdown
            id="provider-select"
            value={selectedProvider}
            onChange={(value) => {
              setSelectedProvider(value)
              setDisplayedCount(INITIAL_GAMES_COUNT)
            }}
            label={lang === 'en' ? 'All' : 'Все'}
            options={[
              { value: '', label: lang === 'en' ? 'All' : 'Все' },
              ...providers.map((provider) => ({
                value: provider,
                label: provider,
              })),
            ]}
          />
        </div>

        {(selectedType || selectedProvider) && (
          <button type="button" className="game-search__reset" onClick={clearAll}>
            {lang === 'en' ? 'Reset' : 'Сбросить'}
          </button>
        )}
      </div>

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

      {filtered.length > 0 ? (
        <>
          <div
            id="games-grid-results"
            className="games-grid anim-stagger"
            role="list"
            aria-label={lang === 'en' ? 'Games list' : 'Список игр'}
          >
            {displayed.map((game) => (
              <div key={game.slug} role="listitem" className="anim-fade-up">
                <GameCard game={game} lang={lang} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="game-search__more">
              <button type="button" className="btn-ghost game-search__more-btn" onClick={loadMore}>
                {lang === 'en' ? 'Load more' : 'Показать ещё'} ({filtered.length - displayed.length})
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="game-search__empty" role="status" aria-live="polite">
          <p className="game-search__empty-text">{emptyLabel}</p>
          <button type="button" className="game-search__empty-reset" onClick={clearAll}>
            {clearLabel}
          </button>
        </div>
      )}
    </>
  )
}
