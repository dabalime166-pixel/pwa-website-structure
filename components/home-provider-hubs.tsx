import Image from 'next/image'
import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { getProviderCards, providerHref } from '@/lib/providers'

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 5.5 8 12l6.5 6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.5 5.5 16 12l-6.5 6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HomeProviderHubs({ lang }: { lang: Lang }) {
  const isEn = lang === 'en'
  const cards = getProviderCards()

  return (
    <section className="home-provider-hubs" aria-labelledby="home-providers-title">
      <div className="home-provider-hubs__head">
        <h2 id="home-providers-title">
          {isEn ? 'Browse by provider' : 'Каталог по провайдерам'}
        </h2>
        <p>
          {isEn
            ? 'Open a studio lobby — use the arrows to step through pages.'
            : 'Откройте лобби студии — стрелками листайте страницы.'}
        </p>
      </div>

      <ul className="home-provider-hubs__grid">
        {cards.map((card) => {
          const hub = providerHref(lang, card.slug)
          const nextPage = card.pages > 1 ? `${hub}?page=2` : hub
          return (
            <li key={card.slug} className="home-provider-hubs__item">
              <Link href={hub} className="home-provider-hubs__card">
                <span className="home-provider-hubs__fan" aria-hidden="true">
                  <Image
                    src={card.previewImage}
                    alt=""
                    width={240}
                    height={136}
                    sizes="(max-width: 640px) 120px, 140px"
                    loading="lazy"
                  />
                </span>
                <div className="home-provider-hubs__meta">
                  <span className="home-provider-hubs__name">
                    {isEn ? card.titleEn : card.titleRu}
                  </span>
                  <span className="home-provider-hubs__count">
                    {card.count} {isEn ? 'demos' : 'демо'}
                    {card.pages > 1
                      ? ` · ${card.pages} ${isEn ? 'pages' : 'стр.'}`
                      : ''}
                  </span>
                </div>
              </Link>

              <nav
                className="hub-arrows"
                aria-label={
                  isEn
                    ? `${card.titleEn} lobby navigation`
                    : `Навигация лобби ${card.titleRu}`
                }
              >
                <Link
                  href={hub}
                  className="hub-arrows__btn"
                  prefetch={false}
                  aria-label={isEn ? 'Open lobby' : 'Открыть лобби'}
                >
                  <ArrowLeftIcon />
                </Link>
                <Link href={hub} className="hub-arrows__label" prefetch={false}>
                  {isEn ? 'Open lobby' : 'Открыть лобби'}
                </Link>
                <Link
                  href={nextPage}
                  className="hub-arrows__btn hub-arrows__btn--next"
                  prefetch={false}
                  aria-label={
                    card.pages > 1
                      ? isEn
                        ? 'Next page'
                        : 'Следующая страница'
                      : isEn
                        ? 'Open lobby'
                        : 'Открыть лобби'
                  }
                >
                  <ArrowRightIcon />
                </Link>
              </nav>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
