import Image from 'next/image'
import Link from 'next/link'
import { MoodThemeRail } from '@/components/mood-theme-rail'
import type { Game, Lang } from '@/lib/games'
import { GAME_GUIDES } from '@/lib/game-guides-data'
import { getGame } from '@/lib/games'

type ThemeTile = {
  id: string
  labelEn: string
  labelRu: string
  slug: string
}

const THEME_TILES: ThemeTile[] = [
  { id: 'crash', labelEn: 'Crash', labelRu: 'Crash', slug: 'lucky-jet' },
  { id: 'olympus', labelEn: 'Olympus', labelRu: 'Олимп', slug: 'gates-of-olympus' },
  { id: 'candy', labelEn: 'Candy', labelRu: 'Candy', slug: 'sweet-bonanza' },
  { id: 'princess', labelEn: 'Anime', labelRu: 'Аниме', slug: 'starlight-princess' },
  { id: 'fishing', labelEn: 'Fishing', labelRu: 'Рыбалка', slug: 'big-bass-bonanza' },
  { id: 'western', labelEn: 'Western', labelRu: 'Вестерн', slug: 'wild-west-gold' },
  { id: 'dogs', labelEn: 'Kennel', labelRu: 'Dogs', slug: 'the-dog-house' },
  { id: 'megaways', labelEn: 'Megaways', labelRu: 'Megaways', slug: 'buffalo-king-megaways' },
  { id: 'sugar', labelEn: 'Sugar', labelRu: 'Sugar', slug: 'sugar-rush' },
  { id: 'mustang', labelEn: 'Mustang', labelRu: 'Mustang', slug: 'mustang-gold' },
  { id: 'rocket', labelEn: 'Rocket', labelRu: 'Ракета', slug: 'rocket-queen' },
  { id: 'mines', labelEn: 'Mines', labelRu: 'Mines', slug: 'mines' },
]

function resolveGame(slug: string, catalog: Game[]): Game | undefined {
  return catalog.find((g) => g.slug === slug) ?? getGame(slug)
}

export function HomeDiscover({ lang, catalog }: { lang: Lang; catalog: Game[] }) {
  const isEn = lang === 'en'
  const guidesHref = isEn ? '/en/guides/games' : '/ru/guides/games'
  const guideCards = GAME_GUIDES.slice(0, 5)
  const tiles = THEME_TILES.map((t) => ({ ...t, game: resolveGame(t.slug, catalog) })).filter(
    (t): t is ThemeTile & { game: Game } => Boolean(t.game),
  )

  const railItems = tiles.map((t) => ({
    id: t.id,
    label: isEn ? t.labelEn : t.labelRu,
    href: `/${lang}/${t.game.slug}`,
    avatar: t.game.avatar,
  }))

  return (
    <div className="atelier-discover">
      <section className="atelier-mood" aria-labelledby="atelier-moods-heading">
        <div className="atelier-mood__media" aria-hidden="true">
          <Image
            src="/banners/mood-demos.webp"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="atelier-mood__photo"
          />
          <div className="atelier-mood__veil" />
        </div>
        <div className="atelier-mood__copy">
          <p className="atelier-head__eyebrow">1weapp</p>
          <h2 id="atelier-moods-heading" className="atelier-mood__title">
            {isEn ? 'Pick a mood, open a demo' : 'Выбери настроение — открой демо'}
          </h2>
          <p className="atelier-mood__sub">
            {isEn
              ? 'Instant browser play. No deposit, no registration.'
              : 'Мгновенно в браузере. Без депозита и регистрации.'}
          </p>
        </div>
        <MoodThemeRail items={railItems} lang={lang} />
      </section>

      <section className="atelier-guides" aria-labelledby="atelier-guides-heading">
        <div className="atelier-guides__copy">
          <p className="atelier-head__eyebrow">{isEn ? 'Guides' : 'Гайды'}</p>
          <h2 id="atelier-guides-heading" className="atelier-head__title">
            {isEn ? 'Learn the hit before you spin' : 'Разбери хит до первого спина'}
          </h2>
          <p className="atelier-head__sub">
            {isEn
              ? 'Short playbooks — multipliers, free spins, crash timing.'
              : 'Короткие разборы — множители, фриспины, момент кэшаута.'}
          </p>
          <Link href={guidesHref} className="atelier-btn atelier-btn--ghost">
            {isEn ? 'Browse guides' : 'Смотреть гайды'}
          </Link>
        </div>

        <ul className="atelier-guides__row">
          {guideCards.map((g) => (
            <li key={g.id}>
              <Link href={`${guidesHref}/${g.id}`} className="atelier-guides__card">
                <Image
                  src={g.avatar}
                  alt={
                    isEn
                      ? `${getGame(g.gameSlug)?.name ?? g.gameSlug} demo guide`
                      : `Гайд по демо ${getGame(g.gameSlug)?.name ?? g.gameSlug}`
                  }
                  width={120}
                  height={160}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
