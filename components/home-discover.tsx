import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Game, Lang } from '@/lib/games'
import { GAME_GUIDES } from '@/lib/game-guides-data'
import { getGame } from '@/lib/games'

type Mood = {
  id: string
  titleEn: string
  titleRu: string
  subEn: string
  subRu: string
  ctaEn: string
  ctaRu: string
  leadSlug: string
  cast: string[]
}

const MOODS: Mood[] = [
  {
    id: 'crash',
    titleEn: 'Ride the multiplier',
    titleRu: 'Поймай множитель',
    subEn: 'Crash demos — cash out before the jet leaves.',
    subRu: 'Crash-демо — кэшаут до улёта джета.',
    ctaEn: 'Open Lucky Jet',
    ctaRu: 'Открыть Lucky Jet',
    leadSlug: 'lucky-jet',
    cast: ['lucky-jet', 'rocket-queen'],
  },
  {
    id: 'olympus',
    titleEn: 'Gods & tumbles',
    titleRu: 'Боги и каскады',
    subEn: 'Olympus energy — orbs, free spins, high drama.',
    subRu: 'Олимп — сферы, фриспины, высокая драма.',
    ctaEn: 'Open Gates of Olympus',
    ctaRu: 'Открыть Gates of Olympus',
    leadSlug: 'gates-of-olympus',
    cast: ['gates-of-olympus', 'starlight-princess', 'zeus-vs-hades-gods-of-war'],
  },
  {
    id: 'candy',
    titleEn: 'Sweet cascades',
    titleRu: 'Сладкие каскады',
    subEn: 'Candy clusters that keep falling.',
    subRu: 'Конфетные кластеры, которые всё падают.',
    ctaEn: 'Open Sweet Bonanza',
    ctaRu: 'Открыть Sweet Bonanza',
    leadSlug: 'sweet-bonanza',
    cast: ['sweet-bonanza', 'sugar-rush', 'fruit-party'],
  },
  {
    id: 'western',
    titleEn: 'Dust & sticky wilds',
    titleRu: 'Пыль и липкие вайлды',
    subEn: 'Western money respins and outlaw free spins.',
    subRu: 'Вестерн: money-respin и outlaw-фриспины.',
    ctaEn: 'Open Wild West Gold',
    ctaRu: 'Открыть Wild West Gold',
    leadSlug: 'wild-west-gold',
    cast: ['wild-west-gold', 'mustang-gold', 'wolf-gold'],
  },
]

function resolveCast(slugs: string[], catalog: Game[]): Game[] {
  return slugs
    .map((slug) => catalog.find((g) => g.slug === slug) ?? getGame(slug))
    .filter((g): g is Game => Boolean(g))
}

export function HomeDiscover({ lang, catalog }: { lang: Lang; catalog: Game[] }) {
  const isEn = lang === 'en'
  const guidesHref = isEn ? '/en/guides/games' : '/ru/guides/games'
  const guideCards = GAME_GUIDES.slice(0, 6)

  return (
    <>
      <section className="home-moods" aria-labelledby="home-moods-heading">
        <div className="home-moods__head">
          <p className="home-moods__eyebrow">{isEn ? 'Start by mood' : 'Начни с настроения'}</p>
          <h2 id="home-moods-heading" className="home-moods__title">
            {isEn ? 'What do you want to feel tonight?' : 'Какое настроение на сегодня?'}
          </h2>
          <p className="home-moods__sub">
            {isEn
              ? 'Four demo paths — pick a vibe, open the lead title free.'
              : 'Четыре демо-маршрута — выбери вайб и открой главный тайтл бесплатно.'}
          </p>
        </div>

        <div className="home-moods__grid">
          {MOODS.map((mood, index) => {
            const cast = resolveCast(mood.cast, catalog)
            const lead = cast.find((g) => g.slug === mood.leadSlug) ?? cast[0]
            if (!lead) return null
            const href = `/${lang}/${lead.slug}`
            return (
              <article
                key={mood.id}
                className={`home-mood home-mood--${mood.id}`}
                style={{ '--mood-i': index } as CSSProperties}
              >
                <div className="home-mood__art" aria-hidden="true">
                  <Image
                    src={lead.avatar}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="home-mood__bg"
                  />
                  <div className="home-mood__shade" />
                </div>

                <div className="home-mood__body">
                  <div className="home-mood__cast" aria-hidden="true">
                    {cast.map((g) => (
                      <span key={g.slug} className="home-mood__chip">
                        <Image src={g.avatar} alt="" width={56} height={74} />
                      </span>
                    ))}
                  </div>
                  <h3 className="home-mood__title">{isEn ? mood.titleEn : mood.titleRu}</h3>
                  <p className="home-mood__sub">{isEn ? mood.subEn : mood.subRu}</p>
                  <Link href={href} className="home-mood__cta">
                    {isEn ? mood.ctaEn : mood.ctaRu}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
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

          <ul className="home-guides-strip__fan" aria-hidden="true">
            {guideCards.map((g, i) => (
              <li key={g.id} style={{ '--i': i } as CSSProperties}>
                <Link href={`${guidesHref}/${g.id}`} tabIndex={-1}>
                  <Image src={g.avatar} alt="" width={112} height={149} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
