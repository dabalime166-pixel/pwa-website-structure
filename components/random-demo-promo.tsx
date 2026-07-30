'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Game, Lang } from '@/lib/games'

interface RandomDemoPromoProps {
  games: Game[]
  lang: Lang
}

const CARD_W = 96
const GAP = 12
const STEP = CARD_W + GAP

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function RandomDemoPromo({ games, lang }: RandomDemoPromoProps) {
  const isEn = lang === 'en'
  const router = useRouter()
  const pool = useMemo(() => {
    const withAvatar = games.filter((g) => g.avatar)
    return shuffle(withAvatar).slice(0, 36)
  }, [games])

  const [offset, setOffset] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [picked, setPicked] = useState<Game | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function spin() {
    if (spinning || pool.length < 3) return
    setSpinning(true)
    setPicked(null)
    setActiveIndex(null)

    const loops = 2 + Math.floor(Math.random() * 2)
    const land = Math.floor(Math.random() * pool.length)
    const targetIndex = loops * pool.length + land
    setOffset(targetIndex * STEP)

    window.setTimeout(() => {
      setPicked(pool[land])
      setActiveIndex(targetIndex)
      setSpinning(false)
    }, 2200)
  }

  function playPicked() {
    if (!picked || spinning) return
    router.push(`/${lang}/${picked.slug}`)
  }

  const strip = [...pool, ...pool, ...pool]

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
        <button type="button" className="random-slot-promo__cta" onClick={spin} disabled={spinning}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          {spinning ? (isEn ? 'Spinning…' : 'Крутим…') : isEn ? 'Spin' : 'Крутить'}
        </button>
      </div>

      <div className="random-slot-promo__stage">
        <div className="random-slot-promo__tray">
          <span className="random-slot-promo__marker random-slot-promo__marker--top" aria-hidden="true" />
          <span className="random-slot-promo__marker random-slot-promo__marker--bottom" aria-hidden="true" />
          <div className="random-slot-promo__viewport">
            <div
              className={`random-slot-promo__track${spinning ? ' is-spinning' : ''}`}
              style={{
                transform: `translate3d(calc(50% - ${CARD_W / 2}px - ${offset}px), -50%, 0)`,
              }}
            >
              {strip.map((game, i) => (
                <div
                  key={`${game.slug}-${i}`}
                  className={`random-slot-promo__card${activeIndex === i && !spinning ? ' is-active' : ''}`}
                  aria-hidden="true"
                >
                  <Image
                    src={game.avatar}
                    alt=""
                    width={CARD_W}
                    height={Math.round(CARD_W * 1.3)}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="random-slot-promo__result" aria-live="polite">
          <p className="random-slot-promo__pick-name">
            {picked ? picked.name : isEn ? 'Press Spin' : 'Нажмите «Крутить»'}
          </p>
          <button
            type="button"
            className="random-slot-promo__go"
            onClick={playPicked}
            disabled={!picked || spinning}
          >
            {isEn ? 'Play' : 'Играть'}
          </button>
        </div>
      </div>
    </aside>
  )
}
