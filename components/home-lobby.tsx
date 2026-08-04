'use client'

import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GameCard } from '@/components/game-card'
import { RecentFavorites } from '@/components/recent-favorites'
import type { Game, Lang } from '@/lib/games'

export type LobbySection = {
  id: string
  title: string
  subtitle: string
  games: Game[]
}

interface HomeLobbyProps {
  lang: Lang
  sections: LobbySection[]
  allGames: Game[]
}

const PREVIEW = 8
/** How many sections to hydrate ahead of the viewport */
const PRELOAD_MARGIN = '640px 0px'

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

/** Simple fuzzy: all query tokens must appear in haystack (order-free, typo-tolerant via includes). */
function matchesQuery(game: Game, q: string) {
  if (!q) return true
  const hay = normalize(`${game.name} ${game.provider} ${game.slug} ${game.gameType || ''}`)
  const tokens = normalize(q).split(' ').filter(Boolean)
  if (!tokens.length) return true
  return tokens.every((t) => {
    if (hay.includes(t)) return true
    if (t.length < 4) return false
    return hay.split(' ').some((w) => withinOneEdit(w, t))
  })
}

function withinOneEdit(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return false
  if (a.includes(b) || b.includes(a)) return true
  let i = 0
  let j = 0
  let edits = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++
      j++
      continue
    }
    edits++
    if (edits > 1) return false
    if (a.length > b.length) i++
    else if (a.length < b.length) j++
    else {
      i++
      j++
    }
  }
  edits += a.length - i + (b.length - j)
  return edits <= 1
}

function matchesType(game: Game, type: TypeFilter) {
  if (type === 'all') return true
  const gt = game.gameType || 'Slots'
  if (type === 'Slots') return gt === 'Slots' || !game.gameType
  return gt === type
}

function LobbyRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="lobby-section__skeleton" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="lobby-section__skeleton-tile" />
      ))}
    </div>
  )
}

export function HomeLobby({ lang, sections, allGames }: HomeLobbyProps) {
  const isEn = lang === 'en'
  const firstId = sections[0]?.id || ''
  const [active, setActive] = useState(firstId)
  const [query, setQuery] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [readyIds, setReadyIds] = useState<Record<string, true>>(() =>
    firstId ? { [firstId]: true } : {},
  )
  const barRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const markReady = useCallback((id: string) => {
    startTransition(() => {
      setReadyIds((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
    })
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQ(query), 180)
    return () => window.clearTimeout(t)
  }, [query])

  const filteredSections = useMemo(() => {
    return sections
      .map((s) => ({
        ...s,
        games: s.games.filter((g) => matchesType(g, typeFilter) && matchesQuery(g, debouncedQ)),
      }))
      .filter((s) => s.games.length > 0)
  }, [sections, typeFilter, debouncedQ])

  const searchHits = useMemo(() => {
    if (!debouncedQ.trim() && typeFilter === 'all') return []
    return allGames.filter((g) => matchesType(g, typeFilter) && matchesQuery(g, debouncedQ))
  }, [allGames, debouncedQ, typeFilter])

  const showSearch = Boolean(debouncedQ.trim()) || typeFilter !== 'all'

  /* Hydrate rows when they approach the viewport */
  useEffect(() => {
    if (showSearch) return
    const nodes = filteredSections
      .map((s) => sectionRefs.current[s.id])
      .filter((n): n is HTMLElement => Boolean(n))
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = (entry.target as HTMLElement).dataset.sectionId
          if (id) markReady(id)
        }
      },
      { rootMargin: PRELOAD_MARGIN, threshold: 0.01 },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [filteredSections, showSearch, markReady])

  /* Track active tab from visible sections */
  useEffect(() => {
    if (showSearch) return
    const nodes = filteredSections
      .map((s) => sectionRefs.current[s.id])
      .filter((n): n is HTMLElement => Boolean(n))
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = (visible[0]?.target as HTMLElement | undefined)?.dataset.sectionId
        if (id) setActive(id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [filteredSections, showSearch, readyIds])

  function jump(id: string) {
    setActive(id)
    setQuery('')
    setDebouncedQ('')
    setTypeFilter('all')
    markReady(id)
    // Allow shell to paint before scrolling
    requestAnimationFrame(() => {
      const el = sectionRefs.current[id] || document.getElementById(id)
      if (!el) return
      const offset = (barRef.current?.offsetHeight || 56) + 12
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    })
  }

  function scrollRow(id: string, dir: -1 | 1) {
    const row = document.getElementById(`${id}-row`)
    if (!row) return
    row.scrollBy({ left: dir * Math.min(640, row.clientWidth * 0.85), behavior: 'smooth' })
  }

  const typeChips: { id: TypeFilter; label: string }[] = [
    { id: 'all', label: isEn ? 'All' : 'Все' },
    { id: 'Slots', label: isEn ? 'Slots' : 'Слоты' },
    { id: 'Crash Games', label: isEn ? 'Crash' : 'Краш' },
    { id: 'Megaways', label: 'Megaways' },
    { id: 'Mines', label: 'Mines' },
  ]

  return (
    <div className="home-lobby">
      <div className="lobby-toolbar" ref={barRef}>
        <div className="lobby-toolbar__panel">
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
              placeholder={isEn ? 'Search demos…' : 'Поиск демо…'}
              aria-label={isEn ? 'Search demos' : 'Поиск демо'}
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

          <div className="lobby-toolbar__rails">
            <nav className="lobby-providers" aria-label={isEn ? 'Providers' : 'Провайдеры'}>
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`lobby-providers__tab${active === s.id && !showSearch ? ' is-active' : ''}`}
                  onClick={() => jump(s.id)}
                  aria-current={active === s.id && !showSearch ? 'true' : undefined}
                >
                  <span className="lobby-providers__name">{s.title}</span>
                  <span className="lobby-providers__count">{s.games.length}</span>
                </button>
              ))}
            </nav>

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
      </div>

      {!showSearch && <RecentFavorites lang={lang} allGames={allGames} />}

      {showSearch ? (
        <section className="lobby-section lobby-section--search" aria-label={isEn ? 'Search results' : 'Результаты поиска'}>
          <div className="lobby-section-header">
            <div>
              <p className="lobby-section-header__subtitle">{isEn ? 'Filter' : 'Фильтр'}</p>
              <h2 className="lobby-section-header__title">
                {debouncedQ.trim()
                  ? isEn
                    ? `Results for “${query}”`
                    : `Результаты по «${query}»`
                  : isEn
                    ? typeFilter
                    : typeFilter === 'Slots'
                      ? 'Слоты'
                      : typeFilter === 'Crash Games'
                        ? 'Краш'
                        : typeFilter}
              </h2>
            </div>
            <span className="lobby-section-header__count">{searchHits.length}</span>
          </div>
          {searchHits.length > 0 ? (
            <div className="games-grid">
              {searchHits.slice(0, 48).map((game, i) => (
                <GameCard key={game.slug} game={game} lang={lang} priority={i < 4} />
              ))}
            </div>
          ) : (
            <p className="lobby-empty">{isEn ? 'No demos found' : 'Ничего не найдено'}</p>
          )}
        </section>
      ) : (
        <div className="home-lobby-stack">
          {filteredSections.map((section, sectionIndex) => {
            const isOpen = Boolean(expanded[section.id])
            const isReady = Boolean(readyIds[section.id])
            const list = isReady
              ? isOpen
                ? section.games
                : section.games.slice(0, PREVIEW)
              : []
            const canExpand = section.games.length > PREVIEW

            return (
              <section
                key={section.id}
                id={section.id}
                data-section-id={section.id}
                ref={(node) => {
                  sectionRefs.current[section.id] = node
                }}
                className={`lobby-section lobby-section--${section.id}${isReady ? ' is-ready' : ' is-pending'}`}
                aria-labelledby={`${section.id}-title`}
                aria-busy={!isReady}
              >
                <div className="lobby-section-header">
                  <div className="lobby-section-header__brand">
                    <span className="lobby-section-mark" aria-hidden="true">
                      {section.title.slice(0, 1)}
                    </span>
                    <div>
                      <p className="lobby-section-header__subtitle">{section.subtitle}</p>
                      <h2 id={`${section.id}-title`} className="lobby-section-header__title">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="lobby-section-header__actions">
                    <span className="lobby-section-header__count">{section.games.length}</span>
                    {isReady && !isOpen && (
                      <div className="lobby-scroll-btns">
                        <button
                          type="button"
                          className="lobby-scroll-btn"
                          onClick={() => scrollRow(section.id, -1)}
                          aria-label={isEn ? 'Previous' : 'Назад'}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M14.5 5 L8 12 L14.5 19" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="lobby-scroll-btn"
                          onClick={() => scrollRow(section.id, 1)}
                          aria-label={isEn ? 'Next' : 'Вперёд'}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M9.5 5 L16 12 L9.5 19" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    )}
                    {isReady && canExpand && (
                      <button
                        type="button"
                        className="lobby-section-more"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setExpanded((prev) => ({ ...prev, [section.id]: !prev[section.id] }))
                        }
                      >
                        {isOpen ? (isEn ? 'Collapse' : 'Свернуть') : isEn ? 'More' : 'Ещё'}
                      </button>
                    )}
                    {!isReady && (
                      <button
                        type="button"
                        className="lobby-section-more"
                        onClick={() => markReady(section.id)}
                      >
                        {isEn ? 'Load' : 'Загрузить'}
                      </button>
                    )}
                  </div>
                </div>

                {isReady ? (
                  <div
                    id={`${section.id}-row`}
                    className={isOpen ? 'lobby-section__grid' : 'lobby-section__row'}
                    role="list"
                  >
                    {list.map((game, i) => (
                      <div key={game.slug} className="lobby-tile" role="listitem">
                        <GameCard
                          game={game}
                          lang={lang}
                          priority={sectionIndex === 0 && i < 2}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <LobbyRowSkeleton />
                )}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
