import Image from 'next/image'
import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { getProviderCards, providerHref } from '@/lib/providers'

export function HomeProviderHubs({ lang }: { lang: Lang }) {
  const isEn = lang === 'en'
  const cards = getProviderCards(3)

  return (
    <section className="home-provider-hubs" aria-labelledby="home-providers-title">
      <div className="home-provider-hubs__head">
        <h2 id="home-providers-title">
          {isEn ? 'Browse by provider' : 'Каталог по провайдерам'}
        </h2>
        <p>
          {isEn
            ? 'Full lobbies live on their own pages — lighter home, faster phone.'
            : 'Полные лобби на отдельных страницах — легче главная, быстрее на телефоне.'}
        </p>
      </div>

      <ul className="home-provider-hubs__grid">
        {cards.map((card) => (
          <li key={card.slug}>
            <Link href={providerHref(lang, card.slug)} className="home-provider-hubs__card">
              <div className="home-provider-hubs__previews" aria-hidden="true">
                {card.previews.map((game) => (
                  <span key={game.slug} className="home-provider-hubs__shot">
                    <Image
                      src={game.avatar}
                      alt=""
                      width={72}
                      height={96}
                      sizes="72px"
                      loading="lazy"
                    />
                  </span>
                ))}
              </div>
              <div className="home-provider-hubs__meta">
                <span className="home-provider-hubs__name">
                  {isEn ? card.titleEn : card.titleRu}
                </span>
                <span className="home-provider-hubs__count">
                  {card.count} {isEn ? 'demos' : 'демо'}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
