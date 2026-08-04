import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
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

/** Scrollable theme avatars in the mood banner */
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
  { id: 'fruit', labelEn: 'Fruit', labelRu: 'Фрукты', slug: 'fruit-party' },
  { id: 'dragon', labelEn: 'Dragon', labelRu: 'Дракон', slug: 'floating-dragon' },
  { id: 'destiny', labelEn: 'Destiny', labelRu: 'Таро', slug: 'madame-destiny-megaways' },
  { id: 'gods', labelEn: 'Gods', labelRu: 'Боги', slug: 'zeus-vs-hades-gods-of-war' },
  { id: 'mines', labelEn: 'Mines', labelRu: 'Mines', slug: 'mines' },
]

function resolveGame(slug: string, catalog: Game[]): Game | undefined {
  return catalog.find((g) => g.slug === slug) ?? getGame(slug)
}

export function HomeDiscover({ lang, catalog }: { lang: Lang; catalog: Game[] }) {
  const isEn = lang === 'en'
  const guidesHref = isEn ? '/en/guides/games' : '/ru/guides/games'
  const guideCards = GAME_GUIDES.slice(0, 6)
  const tiles = THEME_TILES.map((t) => ({ ...t, game: resolveGame(t.slug, catalog) })).filter(
    (t): t is ThemeTile & { game: Game } => Boolean(t.game)
  )

  const railItems = tiles.map((t) => ({
    id: t.id,
    label: isEn ? t.labelEn : t.labelRu,
    href: `/${lang}/${t.game.slug}`,
    avatar: t.game.avatar,
  }))

  return (
    <>
      <section className="home-mood-banner" aria-labelledby="home-moods-heading">
        <div className="home-mood-banner__frame">
          <div className="home-mood-banner__bg" aria-hidden="true">
            <Image
              src="/banners/mood-demos.webp"
              alt={
                isEn
                  ? 'Free demo games mood banner on 1weapp'
                  : 'Баннер бесплатных демо-игр на 1weapp'
              }
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="home-mood-banner__photo"
              priority={false}
            />
            <div className="home-mood-banner__veil" />
          </div>

          <div className="home-mood-banner__copy">
            <p className="home-mood-banner__badge">1WEAPP</p>
            <h2 id="home-moods-heading" className="home-mood-banner__title">
              {isEn ? 'Play the best demos for free' : 'Играй в лучшие демо бесплатно'}
            </h2>
            <p className="home-mood-banner__sub">
              {isEn
                ? 'Instant demos in your browser. No deposit or registration.'
                : 'Мгновенные демо в браузере. Без депозита и регистрации.'}
            </p>
          </div>

          <MoodThemeRail items={railItems} lang={lang} />
        </div>
      </section>

      <section className="home-guides-strip" aria-labelledby="home-guides-heading">
        <div className="home-guides-strip__inner">
          <div className="home-guides-strip__copy">
            <p className="home-guides-strip__eyebrow">
              {isEn ? 'Guides · Games' : 'Гайды · Игры'}
            </p>
            <h2 id="home-guides-heading" className="home-guides-strip__title">
              {isEn ? 'Learn the hit before you spin' : 'Разбери хит до первого спина'}
            </h2>
            <p className="home-guides-strip__sub">
              {isEn
                ? 'Short playbooks for Popular demos — multipliers, free spins, crash timing.'
                : 'Короткие разборы Popular-демо — множители, фриспины, момент кэшаута.'}
            </p>
            <Link href={guidesHref} className="home-guides-strip__cta">
              {isEn ? 'Browse game guides' : 'Смотреть гайды по играм'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <ul className="home-guides-strip__fan">
            {guideCards.map((g, i) => (
              <li key={g.id} style={{ '--i': i } as CSSProperties}>
                <Link href={`${guidesHref}/${g.id}`}>
                  <Image
                    src={g.avatar}
                    alt={
                      isEn
                        ? `${getGame(g.gameSlug)?.name ?? g.gameSlug} demo guide`
                        : `Гайд по демо ${getGame(g.gameSlug)?.name ?? g.gameSlug}`
                    }
                    width={128}
                    height={171}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
