'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { GameCard } from '@/components/game-card'
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

const PREVIEW = 12

export function HomeLobby({ lang, sections, allGames }: HomeLobbyProps) {
  const isEn = lang === 'en'
  const [active, setActive] = useState(sections[0]?.id || '')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const barRef = useRef<HTMLDivElement>(null)

  const q = query.trim().toLowerCase()
  const searchHits = useMemo(() => {
    if (!q) return []
    return allGames.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.provider.toLowerCase().includes(q) ||
        g.slug.includes(q),
    )
  }, [allGames, q])

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n))

    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [sections])

  function jump(id: string) {
    setActive(id)
    const el = document.getElementById(id)
    if (!el) return
    const offset = (barRef.current?.offsetHeight || 56) + 12
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  function scrollRow(id: string, dir: -1 | 1) {
    const row = document.getElementById(`${id}-row`)
    if (!row) return
    row.scrollBy({ left: dir * Math.min(640, row.clientWidth * 0.85), behavior: 'smooth' })
  }

  return (
    <div className="home-lobby">
      <div className="lobby-tabs-bar" ref={barRef}>
        <div className="lobby-tabs-bar__inner">
          <nav className="lobby-tabs" aria-label={isEn ? 'Providers' : 'Провайдеры'}>
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`lobby-tab${active === s.id ? ' is-active' : ''}`}
                onClick={() => jump(s.id)}
                aria-current={active === s.id ? 'true' : undefined}
              >
                {s.title}
                <span className="lobby-tab__count">{s.games.length}</span>
              </button>
            ))}
          </nav>

          <div className="lobby-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEn ? 'Search demos…' : 'Поиск демо…'}
              aria-label={isEn ? 'Search demos' : 'Поиск демо'}
              autoComplete="off"
              spellCheck={false}
            />
            {q && (
              <button type="button" className="lobby-search__clear" onClick={() => setQuery('')} aria-label={isEn ? 'Clear' : 'Сбросить'}>
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {q ? (
        <section className="lobby-section lobby-section--search" aria-label={isEn ? 'Search results' : 'Результаты поиска'}>
          <div className="lobby-section-header">
            <div>
              <p className="lobby-section-header__subtitle">{isEn ? 'Search' : 'Поиск'}</p>
              <h2 className="lobby-section-header__title">
                {isEn ? `Results for “${query}”` : `Результаты по «${query}»`}
              </h2>
            </div>
            <span className="lobby-section-header__count">{searchHits.length}</span>
          </div>
          {searchHits.length > 0 ? (
            <div className="games-grid">
              {searchHits.map((game) => (
                <GameCard key={game.slug} game={game} lang={lang} />
              ))}
            </div>
          ) : (
            <p className="lobby-empty">{isEn ? 'No demos found' : 'Ничего не найдено'}</p>
          )}
        </section>
      ) : (
        <div className="home-lobby-stack">
          {sections.map((section) => {
            const isOpen = Boolean(expanded[section.id])
            const list = isOpen ? section.games : section.games.slice(0, PREVIEW)
            const canExpand = section.games.length > PREVIEW

            return (
              <section
                key={section.id}
                id={section.id}
                className={`lobby-section lobby-section--${section.id}`}
                aria-labelledby={`${section.id}-title`}
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
                    {!isOpen && (
                      <div className="lobby-scroll-btns">
                        <button type="button" className="lobby-scroll-btn" onClick={() => scrollRow(section.id, -1)} aria-label={isEn ? 'Previous' : 'Назад'}>
                          ‹
                        </button>
                        <button type="button" className="lobby-scroll-btn" onClick={() => scrollRow(section.id, 1)} aria-label={isEn ? 'Next' : 'Вперёд'}>
                          ›
                        </button>
                      </div>
                    )}
                    {canExpand && (
                      <button
                        type="button"
                        className="lobby-section-more"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setExpanded((prev) => ({ ...prev, [section.id]: !prev[section.id] }))
                        }
                      >
                        {isOpen
                          ? isEn
                            ? 'Collapse'
                            : 'Свернуть'
                          : isEn
                            ? 'More'
                            : 'Ещё'}
                      </button>
                    )}
                  </div>
                </div>

                <div
                  id={`${section.id}-row`}
                  className={isOpen ? 'lobby-section__grid' : 'lobby-section__row'}
                  role="list"
                >
                  {list.map((game) => (
                    <div key={game.slug} className="lobby-tile" role="listitem">
                      <GameCard game={game} lang={lang} />
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
