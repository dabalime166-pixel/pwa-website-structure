import Link from 'next/link'
import Image from 'next/image'
import type { Game, Lang } from '@/lib/games'
import { i18n } from '@/lib/games'

interface GameCardProps {
  game: Game
  lang: Lang
}

export function GameCard({ game, lang }: GameCardProps) {
  const t = i18n[lang]
  const href = `/${lang}/${game.slug}`

  return (
    <article className="game-card">
      <Link href={href} aria-label={`${game.name} — ${t.playDemo}`}>
        {/* Thumbnail — full image visible via object-fit: contain */}
        <div className="card-img-wrap">
          <Image
            src={game.avatar}
            alt={`${game.name}`}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
            loading="lazy"
          />
          {/* Gold corner accents */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 6,
              left: 6,
              width: 18,
              height: 18,
              borderTop: '2px solid var(--color-gold-light)',
              borderLeft: '2px solid var(--color-gold-light)',
              borderRadius: '2px 0 0 0',
              pointerEvents: 'none',
              zIndex: 3,
              opacity: 0.7,
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 18,
              height: 18,
              borderTop: '2px solid var(--color-gold-light)',
              borderRight: '2px solid var(--color-gold-light)',
              borderRadius: '0 2px 0 0',
              pointerEvents: 'none',
              zIndex: 3,
              opacity: 0.7,
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 6,
              left: 6,
              width: 18,
              height: 18,
              borderBottom: '2px solid var(--color-gold-light)',
              borderLeft: '2px solid var(--color-gold-light)',
              borderRadius: '0 0 0 2px',
              pointerEvents: 'none',
              zIndex: 3,
              opacity: 0.7,
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 6,
              right: 6,
              width: 18,
              height: 18,
              borderBottom: '2px solid var(--color-gold-light)',
              borderRight: '2px solid var(--color-gold-light)',
              borderRadius: '0 0 2px 0',
              pointerEvents: 'none',
              zIndex: 3,
              opacity: 0.7,
            }}
          />

          {/* Hover overlay */}
          <div className="card-overlay" aria-hidden="true">
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-gold-light), var(--color-gold))',
                color: '#0a0a0b',
                fontWeight: 800,
                fontSize: '0.8125rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '99px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {t.playDemo}
            </span>
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            padding: '0.625rem 0.75rem 0.75rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.3,
              marginBottom: '0.2rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {game.name}
          </p>
          <p
            style={{
              fontSize: '0.7rem',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {game.provider}
          </p>
        </div>
      </Link>
    </article>
  )
}
