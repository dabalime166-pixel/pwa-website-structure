'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Lang } from '@/lib/games'
import { mediaAlt, type GameMediaItem } from '@/lib/game-media'

export function GameMediaGallery({
  items,
  lang,
}: {
  items: GameMediaItem[]
  lang: Lang
}) {
  const isEn = lang === 'en'
  const [failed, setFailed] = useState<Record<string, boolean>>({})

  const visible = items.filter((item) => !failed[item.src])
  if (!visible.length) return null

  return (
    <section className="gp-media" aria-labelledby="gp-media-heading">
      <div className="gp-media__head">
        <span className="gp-media__label">{isEn ? 'Visuals' : 'Визуалы'}</span>
        <h2 id="gp-media-heading" className="gp-media__title">
          {isEn ? 'Gameplay & cover art' : 'Геймплей и обложка'}
        </h2>
        <p className="gp-media__sub">
          {isEn
            ? 'Cover and studio art used for this free demo card — handy before you launch the iframe.'
            : 'Обложка и студийный арт этой демо-карточки — удобно посмотреть до запуска iframe.'}
        </p>
      </div>
      <ul className="gp-media__grid">
        {visible.map((item) => (
          <li key={item.src} className={`gp-media__item gp-media__item--${item.kind}`}>
            <Image
              src={item.src}
              alt={mediaAlt(item, lang)}
              width={item.kind === 'gameplay' ? 640 : 320}
              height={item.kind === 'gameplay' ? 360 : 427}
              sizes={
                item.kind === 'gameplay'
                  ? '(max-width: 720px) 100vw, 640px'
                  : '(max-width: 720px) 45vw, 220px'
              }
              loading="lazy"
              onError={() => setFailed((prev) => ({ ...prev, [item.src]: true }))}
            />
            <span className="gp-media__caption">
              {item.kind === 'cover'
                ? isEn
                  ? 'Cover'
                  : 'Обложка'
                : item.kind === 'gameplay'
                  ? isEn
                    ? 'Gameplay art'
                    : 'Арт геймплея'
                  : isEn
                    ? 'Studio thumb'
                    : 'Студийный кадр'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
