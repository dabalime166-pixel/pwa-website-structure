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

type Phase = 'teaser' | 'spinning' | 'landed'

export function RandomDemoPromo({ games, lang }: RandomDemoPromoProps) {
  const isEn = lang === 'en'
  const router = useRouter()

  /** Pool only built after first Spin — no avatar work before that */
  const [armed, setArmed] = useState(false)
  const pool = useMemo(() => {
    if (!armed) return [] as Game[]
    const withAvatar = games.filter((g) => g.avatar)
    return shuffle(withAvatar).slice(0, POOL_SIZE)
  }, [games, armed])

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

  const [phase, setPhase] = useState<Phase>('teaser')
  const [offset, setOffset] = useState(0)
  const [picked, setPicked] = useState<Game | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const offsetRef = useRef(0)
  const phaseRef = useRef<Phase>('teaser')
  const spinRafRef = useRef(0)
  const trayRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef(strip)
  stripRef.current = strip
  const bySlugRef = useRef(bySlug)
  bySlugRef.current = bySlug
  const pendingSpinRef = useRef(false)

  useEffect(() => {
    return () => {
      if (spinRafRef.current) cancelAnimationFrame(spinRafRef.current)
    }
  }, [])

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

    requestAnimationFrame(() => {
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
      phaseRef.current = 'landed'
      setPhase('landed')
    })
  }

  function runSpinAnimation() {
    if (pool.length < 3) {
      phaseRef.current = 'teaser'
      setPhase('teaser')
      return
    }

    cancelAnimationFrame(spinRafRef.current)
    setPicked(null)
    setActiveIndex(null)

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
      if (phaseRef.current !== 'spinning') return
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

  // First Spin: wait until reel DOM exists, then animate
  useEffect(() => {
    if (!pendingSpinRef.current || !armed || pool.length < 3) return
    pendingSpinRef.current = false
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => runSpinAnimation())
    })
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, pool.length])

  function onSpinClick() {
    if (phaseRef.current === 'spinning') return

    phaseRef.current = 'spinning'
    setPhase('spinning')
    setPicked(null)
    setActiveIndex(null)

    if (!armed) {
      pendingSpinRef.current = true
      setArmed(true)
      return
    }

    runSpinAnimation()
  }

  function playPicked() {
    if (!picked || phaseRef.current === 'spinning') return
    router.push(`/${lang}/${picked.slug}`)
  }

  const showReel = armed

  return (
    <aside
      className={`random-slot-promo${phase === 'teaser' ? ' is-teaser' : ''}`}
      aria-label={isEn ? 'Random demo' : 'Случайное демо'}
    >
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
          {isEn
            ? 'One tap — we pick a free demo for you.'
            : 'Один тап — случайное бесплатное демо.'}
        </p>
        <button
          type="button"
          className="random-slot-promo__cta"
          onClick={onSpinClick}
          disabled={phase === 'spinning'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          {phase === 'spinning'
            ? isEn
              ? 'Spinning…'
              : 'Крутим…'
            : phase === 'landed'
              ? isEn
                ? 'Spin again'
                : 'Ещё раз'
              : isEn
                ? 'Spin'
                : 'Крутить'}
        </button>
      </div>

      <div className="random-slot-promo__stage">
        {!showReel ? (
          <button
            type="button"
            className="random-slot-promo__teaser"
            onClick={onSpinClick}
            aria-label={isEn ? 'Spin for a random demo' : 'Крутить случайное демо'}
          >
            <span className="random-slot-promo__teaser-glow" aria-hidden="true" />
            <span className="random-slot-promo__teaser-reel" aria-hidden="true">
              <span className="random-slot-promo__ghost" />
              <span className="random-slot-promo__ghost random-slot-promo__ghost--focus">
                <span className="random-slot-promo__ghost-q">?</span>
              </span>
              <span className="random-slot-promo__ghost" />
            </span>
            <span className="random-slot-promo__teaser-copy">
              <span className="random-slot-promo__teaser-kicker">
                {isEn ? 'Mystery pick' : 'Случайный выбор'}
              </span>
              <span className="random-slot-promo__teaser-hint">
                {isEn ? 'Tap Spin to reveal a demo' : 'Нажмите «Крутить», чтобы открыть демо'}
              </span>
            </span>
          </button>
        ) : (
          <>
            <div className="random-slot-promo__tray" ref={trayRef}>
              <span className="random-slot-promo__marker random-slot-promo__marker--top" aria-hidden="true" />
              <span className="random-slot-promo__marker random-slot-promo__marker--bottom" aria-hidden="true" />
              <div className="random-slot-promo__viewport">
                <div
                  ref={trackRef}
                  className={`random-slot-promo__track${phase === 'landed' ? ' is-landed' : ''}`}
                  style={{
                    transform: `translate3d(calc(-${CARD_W / 2}px - ${offset}px), -50%, 0)`,
                  }}
                >
                  {strip.map((game, i) => (
                    <div
                      key={`${game.slug}-${i}`}
                      data-game-slug={game.slug}
                      className={`random-slot-promo__card${
                        activeIndex === i && phase === 'landed' ? ' is-active' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <img
                        src={game.avatar}
                        alt={game.name}
                        width={CARD_W}
                        height={Math.round(CARD_W * 1.3)}
                        draggable={false}
                        loading={i < 6 ? 'eager' : 'lazy'}
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
                  : phase === 'spinning'
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
                disabled={!picked || phase === 'spinning'}
              >
                {isEn ? 'Play' : 'Играть'}
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
