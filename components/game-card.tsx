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
    <article className="game-card" style={{ position: 'relative' }}>
      <Link href={href} aria-label={`${game.name} — ${t.playDemo}`}>
        {/* Thumbnail */}
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
          <Image
            src={game.avatar}
            alt={`${game.name} avatar`}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
          {/* Hover overlay */}
          <div className="card-overlay" aria-hidden="true">
            <span
              style={{
                background: 'var(--color-neon)',
                color: '#000',
                fontWeight: 700,
                fontSize: '0.8125rem',
                padding: '0.5rem 1rem',
                borderRadius: '99px',
                letterSpacing: '0.03em',
              }}
            >
              {t.playDemo}
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '0.75rem' }}>
          <p
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              lineHeight: 1.3,
              marginBottom: '0.25rem',
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
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
            }}
          >
            {game.provider}
          </p>
        </div>
      </Link>
    </article>
  )
}
