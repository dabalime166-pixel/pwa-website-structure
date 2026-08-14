import Image from 'next/image'
import Link from 'next/link'
import { MoodThemeRail } from '@/components/mood-theme-rail'
import type { Game, Lang } from '@/lib/games'
import { REVIEWS } from '@/lib/reviews-data'
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
  const reviewsHref = isEn ? '/en/reviews' : '/ru/reviews'
  const reviewCards = REVIEWS.filter((r) => r.legacyGuideId || r.relatedDemoSlug).slice(0, 5)
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
          <p className="atelier-head__eyebrow">{isEn ? 'Reviews' : 'Обзоры'}</p>
          <h2 id="atelier-guides-heading" className="atelier-head__title">
            {isEn ? 'Read the review before you deposit' : 'Прочитай обзор до депозита'}
          </h2>
          <p className="atelier-head__sub">
            {isEn
              ? 'Mechanics, RTP and casino shortlists — no demo iframe on review pages.'
              : 'Механика, RTP и шортлист казино — на страницах обзоров без демо iframe.'}
          </p>
          <Link href={reviewsHref} className="atelier-btn atelier-btn--ghost">
            {isEn ? 'Browse reviews' : 'Смотреть обзоры'}
          </Link>
        </div>

        <ul className="atelier-guides__row">
          {reviewCards.map((g) => (
            <li key={g.id}>
              <Link href={`${reviewsHref}/${g.id}`} className="atelier-guides__card">
                <Image
                  src={g.avatar}
                  alt={isEn ? `${g.titleEn} cover` : `Обложка ${g.titleRu}`}
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
