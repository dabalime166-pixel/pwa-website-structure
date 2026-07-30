'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Game, Lang } from '@/lib/games'

interface RandomDemoPromoProps {
  games: Game[]
  lang: Lang
}

const CARD_W = 96
const GAP = 12
const STEP = CARD_W + GAP
const IDLE_SPEED = 0.55
const SPIN_MS = 2400
const POOL_SIZE = 20
const STRIP_LOOPS = 3

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

type Mode = 'idle' | 'spinning' | 'landed'

export function RandomDemoPromo({ games, lang }: RandomDemoPromoProps) {
  const isEn = lang === 'en'
  const router = useRouter()
  const pool = useMemo(() => {
    const withAvatar = games.filter((g) => g.avatar)
    return shuffle(withAvatar).slice(0, POOL_SIZE)
  }, [games])

  const strip = useMemo(() => {
    const out: Game[] = []
    for (let i = 0; i < STRIP_LOOPS; i++) out.push(...pool)
    return out
  }, [pool])

  const bySlug = useMemo(() => {
    const map = new Map<string, Game>()
    for (const g of pool) map.set(g.slug, g)
    return map
  }, [pool])

  const [mode, setMode] = useState<Mode>('idle')
  const [offset, setOffset] = useState(0)
  const [picked, setPicked] = useState<Game | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const offsetRef = useRef(0)
  const modeRef = useRef<Mode>('idle')
  const spinRafRef = useRef(0)
  const trayRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef(strip)
  stripRef.current = strip
  const bySlugRef = useRef(bySlug)
  bySlugRef.current = bySlug

  useEffect(() => {
    return () => {
      if (spinRafRef.current) cancelAnimationFrame(spinRafRef.current)
    }
  }, [])

  /** Card closest to the gold markers — source of truth for name/play */
  function measureCentered(): { game: Game; index: number; delta: number } | null {
    const tray = trayRef.current
    const track = trackRef.current
    if (!tray || !track) return null

    const markerX = tray.getBoundingClientRect().left + tray.clientWidth / 2
    const cards = track.querySelectorAll<HTMLElement>('[data-game-slug]')
    let best: HTMLElement | null = null
    let bestDist = Infinity
    let bestIndex = -1

    for (let i = 0; i < cards.length; i++) {
      const el = cards[i]
      const r = el.getBoundingClientRect()
      const center = r.left + r.width / 2
      const dist = Math.abs(center - markerX)
      if (dist < bestDist) {
        bestDist = dist
        best = el
        bestIndex = i
      }
    }

    if (!best) return null
    const slug = best.dataset.gameSlug
    if (!slug) return null
    const game = bySlugRef.current.get(slug)
    if (!game) return null
    const rect = best.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    return { game, index: bestIndex, delta: cx - markerX }
  }

  function finishSpin(fallbackIndex: number) {
    const hit = measureCentered()
    if (hit && Math.abs(hit.delta) > 0.5) {
      offsetRef.current += hit.delta
      setOffset(offsetRef.current)
    }

    const settle = () => {
      const final = measureCentered()
      if (final) {
        setPicked(final.game)
        setActiveIndex(final.index)
      } else {
        const game = stripRef.current[fallbackIndex]
        if (game) {
          setPicked(game)
          setActiveIndex(fallbackIndex)
        }
      }
      modeRef.current = 'landed'
      setMode('landed')
    }

    // One frame for the nudge to paint, then always land (never stick on Spinning…)
    requestAnimationFrame(settle)
  }

  // Idle scroll — own RAF id so cleanup cannot cancel the spin loop
  useEffect(() => {
    if (mode !== 'idle' || pool.length < 3) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const loopWidth = pool.length * STEP
    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      if (modeRef.current !== 'idle') return
      const dt = Math.min(32, now - last)
      last = now
      const next = (offsetRef.current + IDLE_SPEED * (dt / 16.67)) % loopWidth
      offsetRef.current = next
      setOffset(next)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mode, pool.length])

  function spin() {
    if (modeRef.current === 'spinning' || pool.length < 3) return

    modeRef.current = 'spinning'
    setMode('spinning')
    setPicked(null)
    setActiveIndex(null)
    cancelAnimationFrame(spinRafRef.current)

    const currentCard = Math.round(offsetRef.current / STEP)
    const start = currentCard * STEP
    offsetRef.current = start
    setOffset(start)

    const landInPool = Math.floor(Math.random() * pool.length)
    const currentInPool = ((currentCard % pool.length) + pool.length) % pool.length
    const loops = 1 + Math.floor(Math.random() * 2)
    const stepsForward =
      ((landInPool - currentInPool + pool.length) % pool.length) + loops * pool.length

    let finalIndex = currentCard + stepsForward
    if (finalIndex >= strip.length) {
      finalIndex = landInPool + Math.max(0, STRIP_LOOPS - 2) * pool.length
    }
    finalIndex = Math.max(0, Math.min(strip.length - 1, finalIndex))
    const target = finalIndex * STEP
    const distance = target - start
    const t0 = performance.now()

    const tick = (now: number) => {
      if (modeRef.current !== 'spinning') return
      const t = Math.min(1, (now - t0) / SPIN_MS)
      const next = start + distance * easeOutCubic(t)
      offsetRef.current = next
      setOffset(next)

      if (t < 1) {
        spinRafRef.current = requestAnimationFrame(tick)
        return
      }

      offsetRef.current = target
      setOffset(target)
      finishSpin(finalIndex)
    }

    spinRafRef.current = requestAnimationFrame(tick)
  }

  function playPicked() {
    if (!picked || modeRef.current === 'spinning') return
    router.push(`/${lang}/${picked.slug}`)
  }

  return (
    <aside className="random-slot-promo" aria-label={isEn ? 'Random demo' : 'Случайное демо'}>
      <div className="random-slot-promo__glow" aria-hidden="true" />
      <div className="random-slot-promo__copy">
        <p className="random-slot-promo__eyebrow">{isEn ? 'Random demo' : 'Случайное демо'}</p>
        <p className="random-slot-promo__title">
          {isEn ? (
            <>
              Don&apos;t know
              <br />
              what to play?
            </>
          ) : (
            <>
              Не знаете,
              <br />
              во что сыграть?
            </>
          )}
        </p>
        <p className="random-slot-promo__lead">
          {isEn ? 'Try your luck with a random demo!' : 'Испытайте удачу — случайное демо!'}
        </p>
        <button
          type="button"
          className="random-slot-promo__cta"
          onClick={spin}
          disabled={mode === 'spinning'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          {mode === 'spinning' ? (isEn ? 'Spinning…' : 'Крутим…') : isEn ? 'Spin' : 'Крутить'}
        </button>
      </div>

      <div className="random-slot-promo__stage">
        <div className="random-slot-promo__tray" ref={trayRef}>
          <span className="random-slot-promo__marker random-slot-promo__marker--top" aria-hidden="true" />
          <span className="random-slot-promo__marker random-slot-promo__marker--bottom" aria-hidden="true" />
          <div className="random-slot-promo__viewport">
            <div
              ref={trackRef}
              className={`random-slot-promo__track${mode === 'idle' ? ' is-idle' : ''}${mode === 'landed' ? ' is-landed' : ''}`}
              style={{
                transform: `translate3d(calc(-${CARD_W / 2}px - ${offset}px), -50%, 0)`,
              }}
            >
              {strip.map((game, i) => (
                <div
                  key={`${game.slug}-${i}`}
                  data-game-slug={game.slug}
                  className={`random-slot-promo__card${
                    activeIndex === i && mode === 'landed' ? ' is-active' : ''
                  }`}
                  aria-hidden="true"
                >
                  <img
                    src={game.avatar}
                    alt=""
                    width={CARD_W}
                    height={Math.round(CARD_W * 1.3)}
                    draggable={false}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="random-slot-promo__result" aria-live="polite">
          <p className="random-slot-promo__pick-name">
            {picked
              ? picked.name
              : mode === 'spinning'
                ? isEn
                  ? 'Spinning…'
                  : 'Крутим…'
                : isEn
                  ? 'Press Spin'
                  : 'Нажмите «Крутить»'}
          </p>
          <button
            type="button"
            className="random-slot-promo__go"
            onClick={playPicked}
            disabled={!picked || mode === 'spinning'}
          >
            {isEn ? 'Play' : 'Играть'}
          </button>
        </div>
      </div>
    </aside>
  )
}
