import Link from 'next/link'
import Image from 'next/image'
import type { Game, Lang } from '@/lib/games'
import { i18n } from '@/lib/games'

interface GameCardProps {
  game: Game
  lang: Lang
}

function CardInner({ game, lang }: { game: Game; lang: Lang }) {
  const t = i18n[lang]
  const isEn = lang === 'en'

  return (
    <>
      <div className="card-img-wrap">
        <Image
          src={game.avatar}
          alt={game.name}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 180px"
          loading="lazy"
        />

        <div className="card-badges" aria-hidden={!game.rtp && !game.gameType}>
          {game.gameType && <span className="card-badge card-badge--type">{game.gameType}</span>}
          {game.rtp && <span className="card-badge card-badge--rtp">RTP {game.rtp}</span>}
        </div>

        <div className="card-overlay" aria-hidden="true">
          <span className="card-overlay__cta">{t.playDemo}</span>
        </div>
      </div>

      <div className="game-card__info">
        <p className="game-card__name">{game.name}</p>
        <p className="game-card__provider">{game.provider}</p>
        <p className="sr-only">
          {isEn ? 'Free demo available' : 'Доступно бесплатное демо'}
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
