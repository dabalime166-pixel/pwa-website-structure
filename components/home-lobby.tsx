'use client'

import { startTransition, useDeferredValue, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { GameCard } from '@/components/game-card'
import { RecentFavorites } from '@/components/recent-favorites'
import { LazyRandomDemo } from '@/components/lazy-random-demo'
import type { Game, Lang } from '@/lib/games'
import type { ProviderDef } from '@/lib/providers'
import { providerHref } from '@/lib/providers'

type ChipId = 'top' | string

const ROW_LIMIT = 10
const PROVIDER_VIEW_LIMIT = 24
const SEARCH_LIMIT = 24

function GameRow({
  games,
  lang,
  title,
  subtitle,
  moreHref,
  moreLabel,
  eager,
}: {
  games: Game[]
  lang: Lang
  title: string
  subtitle?: string
  moreHref?: string
  moreLabel?: string
  /** Only the first visible row should eager-load a couple images */
  eager?: boolean
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
            <GameCard game={game} lang={lang} priority={Boolean(eager && i < 2)} />
          </div>
        ))}
      </div>
    </section>
  )
}

/** Mount row only when near viewport — cuts image/DOM work on first paint */
function LazyGameRow(props: {
  games: Game[]
  lang: Lang
  title: string
  subtitle?: string
  moreHref?: string
  moreLabel?: string
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = hostRef.current
    if (!el || visible) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '240px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return (
    <div ref={hostRef} className="db-row-lazy">
      {visible ? (
        <GameRow {...props} />
      ) : (
        <div className="db-row-lazy__slot" aria-hidden="true">
          <div className="db-row__head">
            <div>
              <h2 className="db-row__title">{props.title}</h2>
            </div>
          </div>
          <div className="db-row-lazy__bones" />
        </div>
      )}
    </div>
  )
}

export function HomeLobby({
  lang,
  topGames,
  providers,
  gamesByProvider,
}: {
  lang: Lang
  topGames: Game[]
  providers: ProviderDef[]
  gamesByProvider: Record<string, Game[]>
}) {
  const isEn = lang === 'en'
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim())
  const [chip, setChip] = useState<ChipId>('top')
  const [searchResults, setSearchResults] = useState<Game[]>([])
  const [searchPending, setSearchPending] = useState(false)

  useEffect(() => {
    if (deferredQuery.length < 2) {
      setSearchResults([])
      setSearchPending(false)
      return
    }

    const ctrl = new AbortController()
    setSearchPending(true)
    const t = window.setTimeout(() => {
      fetch(`/api/games-search?q=${encodeURIComponent(deferredQuery)}&limit=${SEARCH_LIMIT}`, {
        signal: ctrl.signal,
      })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data: { games?: Game[] }) => {
          setSearchResults(Array.isArray(data.games) ? data.games : [])
        })
        .catch(() => {
          if (!ctrl.signal.aborted) setSearchResults([])
        })
        .finally(() => {
          if (!ctrl.signal.aborted) setSearchPending(false)
        })
    }, 160)

    return () => {
      ctrl.abort()
      window.clearTimeout(t)
    }
  }, [deferredQuery])

  const searching = deferredQuery.length >= 2
  const chips: { id: ChipId; label: string }[] = [
    { id: 'top', label: isEn ? 'Top' : 'Топ' },
    ...providers.slice(0, 8).map((p) => ({ id: p.slug, label: p.titleEn.split(' ')[0] })),
  ]
  const activeProvider = providers.find((p) => p.slug === chip)
  const topSlice = topGames.slice(0, ROW_LIMIT)

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
              onClick={() => startTransition(() => setChip(c.id))}
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
              <p className="db-row__sub">
                {searchPending ? (isEn ? 'Searching…' : 'Ищем…') : searchResults.length}
              </p>
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
          ) : searchPending ? null : (
            <p className="db-empty">{isEn ? 'No demos found' : 'Ничего не найдено'}</p>
          )}
        </section>
      ) : chip !== 'top' && activeProvider ? (
        <GameRow
          games={(gamesByProvider[activeProvider.name] || []).slice(0, PROVIDER_VIEW_LIMIT)}
          lang={lang}
          title={isEn ? activeProvider.titleEn : activeProvider.titleRu}
          subtitle={isEn ? 'Studio demos' : 'Демо студии'}
          moreHref={providerHref(lang, activeProvider.slug)}
          moreLabel={isEn ? 'More' : 'Ещё'}
          eager
        />
      ) : (
        <>
          <RecentFavorites lang={lang} />

          <GameRow
            games={topSlice}
            lang={lang}
            title={isEn ? 'Top picks' : 'Топ демо'}
            subtitle={isEn ? 'Most played demos' : 'Самые играемые демо'}
            eager
          />

          <div className="db-random">
            <LazyRandomDemo games={topSlice} lang={lang} />
          </div>

          {providers.map((p) => (
            <LazyGameRow
              key={p.slug}
              games={(gamesByProvider[p.name] || []).slice(0, ROW_LIMIT)}
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
