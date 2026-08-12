'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { GameCard } from '@/components/game-card'
import { RecentFavorites } from '@/components/recent-favorites'
import { LazyRandomDemo } from '@/components/lazy-random-demo'
import type { Game, Lang } from '@/lib/games'
import type { ProviderDef } from '@/lib/providers'
import { providerHref } from '@/lib/providers'

type ChipId = 'top' | string

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

function GameRow({
  games,
  lang,
  title,
  subtitle,
  moreHref,
  moreLabel,
}: {
  games: Game[]
  lang: Lang
  title: string
  subtitle?: string
  moreHref?: string
  moreLabel?: string
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  if (!games.length) return null

  function scroll(dir: -1 | 1) {
    const el = rowRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(720, el.clientWidth * 0.85), behavior: 'smooth' })
  }

  return (
    <section className="db-row">
      <div className="db-row__head">
        <div>
          <h2 className="db-row__title">{title}</h2>
          {subtitle ? <p className="db-row__sub">{subtitle}</p> : null}
        </div>
        <div className="db-row__actions">
          {moreHref ? (
            <Link href={moreHref} className="db-row__more">
              {moreLabel || 'More'} <span aria-hidden="true">→</span>
            </Link>
          ) : null}
          <button type="button" className="db-row__nav" onClick={() => scroll(-1)} aria-label="Prev">
            ‹
          </button>
          <button type="button" className="db-row__nav" onClick={() => scroll(1)} aria-label="Next">
            ›
          </button>
        </div>
      </div>
      <div className="db-row__track" ref={rowRef} role="list">
        {games.map((game, i) => (
          <div key={game.slug} className="db-row__tile" role="listitem">
            <GameCard game={game} lang={lang} priority={i < 3} />
          </div>
        ))}
      </div>
    </section>
  )
}

export function HomeLobby({
  lang,
  topGames,
  allGames,
  providers,
  gamesByProvider,
}: {
  lang: Lang
  topGames: Game[]
  allGames: Game[]
  providers: ProviderDef[]
  gamesByProvider: Record<string, Game[]>
}) {
  const isEn = lang === 'en'
  const [query, setQuery] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [chip, setChip] = useState<ChipId>('top')

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQ(query), 140)
    return () => window.clearTimeout(t)
  }, [query])

  const searching = Boolean(debouncedQ)

  const searchResults = useMemo(() => {
    if (!searching) return []
    return allGames.filter((g) => matchesQuery(g, debouncedQ)).slice(0, 60)
  }, [allGames, debouncedQ, searching])

  const chips: { id: ChipId; label: string }[] = [
    { id: 'top', label: isEn ? 'Top' : 'Топ' },
    ...providers.slice(0, 8).map((p) => ({ id: p.slug, label: p.titleEn.split(' ')[0] })),
  ]

  const activeProvider = providers.find((p) => p.slug === chip)

  return (
    <div className="db-lobby">
      <div className="db-toolbar">
        <div className="db-chips" role="tablist" aria-label={isEn ? 'Catalog' : 'Каталог'}>
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={chip === c.id}
              className={`db-chip${chip === c.id ? ' is-active' : ''}`}
              onClick={() => setChip(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <label className="db-search">
          <span className="sr-only">{isEn ? 'Search demos' : 'Поиск демо'}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isEn ? 'Search demos…' : 'Поиск демо…'}
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button type="button" className="db-search__clear" onClick={() => setQuery('')} aria-label="Clear">
              ×
            </button>
          ) : null}
        </label>
      </div>

      {searching ? (
        <section className="db-search-results" aria-label={isEn ? 'Search results' : 'Результаты'}>
          <div className="db-row__head">
            <div>
              <h2 className="db-row__title">{isEn ? 'Search results' : 'Результаты поиска'}</h2>
              <p className="db-row__sub">{searchResults.length}</p>
            </div>
          </div>
          {searchResults.length ? (
            <div className="db-search-grid" role="list">
              {searchResults.map((game) => (
                <div key={game.slug} className="db-row__tile" role="listitem">
                  <GameCard game={game} lang={lang} />
                </div>
              ))}
            </div>
          ) : (
            <p className="db-empty">{isEn ? 'No demos found' : 'Ничего не найдено'}</p>
          )}
        </section>
      ) : chip !== 'top' && activeProvider ? (
        <GameRow
          games={gamesByProvider[activeProvider.name] || []}
          lang={lang}
          title={isEn ? activeProvider.titleEn : activeProvider.titleRu}
          subtitle={isEn ? 'Studio demos' : 'Демо студии'}
          moreHref={providerHref(lang, activeProvider.slug)}
          moreLabel={isEn ? 'More' : 'Ещё'}
        />
      ) : (
        <>
          <RecentFavorites lang={lang} />

          <GameRow
            games={topGames}
            lang={lang}
            title={isEn ? 'Top picks' : 'Топ демо'}
            subtitle={isEn ? 'Most played demos' : 'Самые играемые демо'}
          />

          <div className="db-random">
            <LazyRandomDemo games={topGames.slice(0, 24)} lang={lang} />
          </div>

          {providers.map((p) => (
            <GameRow
              key={p.slug}
              games={(gamesByProvider[p.name] || []).slice(0, 16)}
              lang={lang}
              title={isEn ? p.titleEn : p.titleRu}
              moreHref={providerHref(lang, p.slug)}
              moreLabel={isEn ? 'More' : 'Ещё'}
            />
          ))}
        </>
      )}
    </div>
  )
}
