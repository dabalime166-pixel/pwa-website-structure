import Image from 'next/image'
import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { getProviderCards, providerHref } from '@/lib/providers'

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
            ? 'Full studio lobbies on their own pages — lighter home, faster phone.'
            : 'Полные лобби студий на отдельных страницах — легче главная, быстрее телефон.'}
        </p>
      </div>

      <ul className="home-provider-hubs__grid">
        {cards.map((card) => {
          const hub = providerHref(lang, card.slug)
          return (
            <li key={card.slug} className="home-provider-hubs__item">
              <Link href={hub} className="home-provider-hubs__card">
                <span className="home-provider-hubs__fan" aria-hidden="true">
                  <Image
                    src={card.previewImage}
                    alt=""
                    width={240}
                    height={136}
                    sizes="140px"
                    loading="lazy"
                    unoptimized
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

              <Link href={hub} className="hub-open" prefetch={false}>
                {isEn ? 'Open lobby' : 'Открыть лобби'}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
