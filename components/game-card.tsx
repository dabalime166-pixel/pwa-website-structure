import Link from 'next/link'
import Image from 'next/image'
import type { Game, Lang } from '@/lib/games'
import { i18n } from '@/lib/games'

interface GameCardProps {
  game: Game
  lang: Lang
}

const cornerStyle = (pos: { top?: number; bottom?: number; left?: number; right?: number }) =>
  ({
    position: 'absolute' as const,
    ...pos,
    width: 18,
    height: 18,
    borderTop: pos.top !== undefined ? '2px solid var(--color-gold-light)' : undefined,
    borderBottom: pos.bottom !== undefined ? '2px solid var(--color-gold-light)' : undefined,
    borderLeft: pos.left !== undefined ? '2px solid var(--color-gold-light)' : undefined,
    borderRight: pos.right !== undefined ? '2px solid var(--color-gold-light)' : undefined,
    borderRadius: `${pos.top !== undefined && pos.left !== undefined ? '2px' : '0'} ${pos.top !== undefined && pos.right !== undefined ? '2px' : '0'} ${pos.bottom !== undefined && pos.right !== undefined ? '2px' : '0'} ${pos.bottom !== undefined && pos.left !== undefined ? '2px' : '0'}`,
    pointerEvents: 'none' as const,
    zIndex: 3,
    opacity: 0.7,
  })

function CardInner({ game, lang }: { game: Game; lang: Lang }) {
  const t = i18n[lang]
  return (
    <>
      {/* Thumbnail */}
      <div className="card-img-wrap">
        <Image
          src={game.avatar}
          alt={game.name}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
          loading="lazy"
          unoptimized
          crossOrigin="anonymous"
        />
        {/* Gold corner accents */}
        <span aria-hidden="true" style={cornerStyle({ top: 6, left: 6 })} />
        <span aria-hidden="true" style={cornerStyle({ top: 6, right: 6 })} />
        <span aria-hidden="true" style={cornerStyle({ bottom: 6, left: 6 })} />
        <span aria-hidden="true" style={cornerStyle({ bottom: 6, right: 6 })} />

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
      <div style={{ padding: '0.625rem 0.75rem 0.75rem', borderTop: '1px solid var(--color-border)' }}>
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
    </>
  )
}

export function GameCard({ game, lang }: GameCardProps) {
  const t = i18n[lang]

  if (game.externalUrl) {
    return (
      <article className="game-card">
        <a
          href={game.externalUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label={`${game.name} — ${t.playDemo}`}
        >
          <CardInner game={game} lang={lang} />
        </a>
      </article>
    )
  }

  return (
    <article className="game-card">
      <Link href={`/${lang}/${game.slug}`} aria-label={`${game.name} — ${t.playDemo}`}>
        <CardInner game={game} lang={lang} />
      </Link>
    </article>
  )
}
