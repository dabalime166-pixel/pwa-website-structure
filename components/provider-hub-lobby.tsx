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

function pageWindow(current: number, total: number): (number | '…')[] {
  if (total <= 9) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '…')[] = []
  const push = (v: number | '…') => {
    if (pages[pages.length - 1] !== v) pages.push(v)
  }
  push(1)
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) push('…')
  for (let i = start; i <= end; i++) push(i)
  if (end < total - 1) push('…')
  push(total)
  return pages
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

  const pages = pageWindow(safePage, totalPages)

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
        <nav className="hub-pages" aria-label={isEn ? 'Pagination' : 'Страницы'}>
          <button
            type="button"
            className="hub-pages__nav"
            disabled={safePage <= 1}
            onClick={() => goToPage(safePage - 1)}
          >
            {isEn ? 'Prev' : 'Назад'}
          </button>
          <ol className="hub-pages__list">
            {pages.map((p, idx) =>
              p === '…' ? (
                <li key={`e-${idx}`} className="hub-pages__ellipsis" aria-hidden="true">
                  …
                </li>
              ) : (
                <li key={p}>
                  <button
                    type="button"
                    className={`hub-pages__leaf${p === safePage ? ' is-active' : ''}`}
                    aria-current={p === safePage ? 'page' : undefined}
                    onClick={() => goToPage(p)}
                  >
                    <span className="hub-pages__leaf-face">{p}</span>
                  </button>
                </li>
              ),
            )}
          </ol>
          <button
            type="button"
            className="hub-pages__nav"
            disabled={safePage >= totalPages}
            onClick={() => goToPage(safePage + 1)}
          >
            {isEn ? 'Next' : 'Далее'}
          </button>
        </nav>
      )}
    </div>
  )
}
