'use client'

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from 'react'
import type { Lang } from '@/lib/games'
import type { SportScoreMatch } from '@/lib/sports-types'
import { isFinishedStatus, isLiveStatus } from '@/lib/sports-types'
import { MatchCard } from '@/components/sports/match-card'
import { tSports } from '@/lib/sports-i18n'

type StatusFilter = 'all' | 'live' | 'finished' | 'upcoming'

function matchesQuery(match: SportScoreMatch, q: string) {
  if (!q) return true
  const hay = `${match.home} ${match.away} ${match.competition}`.toLowerCase()
  return hay.includes(q)
}

function matchesStatus(match: SportScoreMatch, status: StatusFilter) {
  if (status === 'all') return true
  if (status === 'live') return isLiveStatus(match.status)
  if (status === 'finished') return isFinishedStatus(match.status)
  return !isLiveStatus(match.status) && !isFinishedStatus(match.status)
}

export function SportsMatchesBrowser({
  lang,
  initial,
}: {
  lang: Lang
  initial: SportScoreMatch[]
}) {
  const t = tSports(lang)
  const [matches, setMatches] = useState(initial)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [competition, setCompetition] = useState('all')
  const [pending, startTransition] = useTransition()
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  useEffect(() => {
    let cancelled = false
    const tick = async () => {
      try {
        const res = await fetch('/api/sports/live?all=1', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as { response?: SportScoreMatch[]; all?: SportScoreMatch[] }
        if (cancelled) return
        const next = Array.isArray(data.all)
          ? data.all
          : Array.isArray(data.response)
            ? data.response
            : null
        if (!next) return
        startTransition(() => {
          setMatches(next)
          setUpdatedAt(new Date().toLocaleTimeString())
        })
      } catch {
        /* keep last good payload */
      }
    }

    const id = window.setInterval(tick, 20000)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [])

  const competitions = useMemo(() => {
    const set = new Set<string>()
    for (const m of matches) {
      if (m.competition) set.add(m.competition)
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [matches])

  const filtered = useMemo(() => {
    return matches.filter(
      (m) =>
        matchesStatus(m, status) &&
        (competition === 'all' || m.competition === competition) &&
        matchesQuery(m, deferredQuery),
    )
  }, [matches, status, competition, deferredQuery])

  const liveCount = matches.filter((m) => isLiveStatus(m.status)).length

  const statusOptions: { id: StatusFilter; label: string; count?: number }[] = [
    { id: 'all', label: t.filterAll, count: matches.length },
    { id: 'live', label: t.filterLive, count: liveCount },
    { id: 'finished', label: t.filterFinished },
    { id: 'upcoming', label: t.filterUpcoming },
  ]

  return (
    <section className="sports-browser" aria-labelledby="sports-fixtures-title">
      <div className="sports-browser__toolbar">
        <div className="sports-browser__search">
          <label className="sr-only" htmlFor="sports-search">
            {t.searchPlaceholder}
          </label>
          <svg className="sports-browser__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M16.2 16.2 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            id="sports-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoComplete="off"
          />
        </div>

        <label className="sports-browser__select-wrap">
          <span className="sr-only">{t.filterCompetition}</span>
          <select
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
            aria-label={t.filterCompetition}
          >
            <option value="all">{t.filterCompetitionAll}</option>
            {competitions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="sports-browser__filters" role="tablist" aria-label={t.filterStatus}>
        {statusOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={status === opt.id}
            className={`sports-browser__chip${status === opt.id ? ' is-active' : ''}${opt.id === 'live' ? ' is-live' : ''}`}
            onClick={() => setStatus(opt.id)}
          >
            {opt.label}
            {typeof opt.count === 'number' ? <span>{opt.count}</span> : null}
          </button>
        ))}
      </div>

      <div className="sports-section__head sports-browser__head">
        <h2 id="sports-fixtures-title">{t.fixtures}</h2>
        <p className="sports-section__hint">
          {t.showing
            .replace('{shown}', String(filtered.length))
            .replace('{total}', String(matches.length))}
          {updatedAt ? ` · ${updatedAt}` : ''}
          {pending ? '…' : ''}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="sports-empty">{t.noResults}</p>
      ) : (
        <div className="sports-match-grid">
          {filtered.map((m) => (
            <MatchCard key={m.url} match={m} lang={lang} />
          ))}
        </div>
      )}
    </section>
  )
}
