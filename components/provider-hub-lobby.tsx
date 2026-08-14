'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { GameCard } from '@/components/game-card'
import type { Game, Lang } from '@/lib/games'
import { PROVIDER_PAGE_SIZE } from '@/lib/providers'

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

export function ProviderHubLobby({
  lang,
  games,
  initialPage = 1,
}: {
  lang: Lang
  games: Game[]
  initialPage?: number
}) {
  const isEn = lang === 'en'
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(() => searchParams.get('q') || '')
  const [debouncedQ, setDebouncedQ] = useState(query)
  const [page, setPage] = useState(() => Math.max(1, initialPage))

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQ(query), 140)
    return () => window.clearTimeout(t)
  }, [query])

  const filtered = useMemo(
    () => games.filter((g) => matchesQuery(g, debouncedQ)),
    [games, debouncedQ],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PROVIDER_PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const slice = filtered.slice(
    (safePage - 1) * PROVIDER_PAGE_SIZE,
    safePage * PROVIDER_PAGE_SIZE,
  )

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedQ.trim()) params.set('q', debouncedQ.trim())
    if (safePage > 1) params.set('page', String(safePage))
    const qs = params.toString()
    const next = qs ? `${pathname}?${qs}` : pathname
    const currentQs = searchParams.toString()
    const current = currentQs ? `${pathname}?${currentQs}` : pathname
    if (next === current) return
    router.replace(next, { scroll: false })
    // intentionally omit searchParams — compare once against latest URL
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, safePage, pathname, router])

  function goToPage(n: number) {
    setPage(n)
    const grid = document.getElementById('provider-hub-grid')
    grid?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function onQueryChange(value: string) {
    setQuery(value)
    setPage(1)
  }

  return (
    <div className="provider-hub-lobby">
      <div className="provider-hub-lobby__toolbar">
        <label className="lobby-search provider-hub-lobby__search">
          <span className="lobby-search__icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={isEn ? 'Search this lobby…' : 'Поиск в этом лобби…'}
            aria-label={isEn ? 'Search demos in this provider' : 'Поиск демо у этого провайдера'}
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button
              type="button"
              className="lobby-search__clear"
              onClick={() => onQueryChange('')}
              aria-label={isEn ? 'Clear search' : 'Очистить поиск'}
            >
              ×
            </button>
          ) : null}
        </label>
        <p className="provider-hub-lobby__meta" aria-live="polite">
          {debouncedQ
            ? isEn
              ? `${filtered.length} match${filtered.length === 1 ? '' : 'es'}`
              : `${filtered.length} совпад.`
            : isEn
              ? `${games.length} demos`
              : `${games.length} демо`}
          {totalPages > 1 ? (
            <span>
              {' · '}
              {isEn ? `page ${safePage}/${totalPages}` : `стр. ${safePage}/${totalPages}`}
            </span>
          ) : null}
        </p>
      </div>

      {slice.length > 0 ? (
        <div id="provider-hub-grid" className="games-grid provider-hub__grid">
          {slice.map((game, i) => (
            <GameCard key={game.slug} game={game} lang={lang} priority={i < 4} />
          ))}
        </div>
      ) : (
        <p className="provider-hub-lobby__empty">
          {isEn ? 'No demos match that search.' : 'По этому запросу демо не найдено.'}
        </p>
      )}

      {totalPages > 1 && (
        <nav className="hub-arrows hub-arrows--lobby" aria-label={isEn ? 'Pagination' : 'Страницы'}>
          <button
            type="button"
            className="hub-arrows__btn"
            disabled={safePage <= 1}
            onClick={() => goToPage(safePage - 1)}
            aria-label={isEn ? 'Previous page' : 'Предыдущая страница'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14.5 5.5 8 12l6.5 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="hub-arrows__status" aria-live="polite">
            {isEn ? `Page ${safePage} of ${totalPages}` : `Стр. ${safePage} из ${totalPages}`}
          </span>
          <button
            type="button"
            className="hub-arrows__btn hub-arrows__btn--next"
            disabled={safePage >= totalPages}
            onClick={() => goToPage(safePage + 1)}
            aria-label={isEn ? 'Next page' : 'Следующая страница'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9.5 5.5 16 12l-6.5 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>
      )}
    </div>
  )
}
