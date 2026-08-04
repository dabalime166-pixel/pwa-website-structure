import Image from 'next/image'
import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { getProviderCards, pageChipNumbers, providerHref } from '@/lib/providers'

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
            ? 'Jump straight into a studio lobby — or open any page number below.'
            : 'Сразу в лобби студии — или откройте нужную страницу ниже.'}
        </p>
      </div>

      <ul className="home-provider-hubs__grid">
        {cards.map((card) => {
          const chips = pageChipNumbers(card.pages, 7)
          const hub = providerHref(lang, card.slug)
          return (
            <li key={card.slug} className="home-provider-hubs__item">
              <Link href={hub} className="home-provider-hubs__card">
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
                    {card.pages > 1
                      ? ` · ${card.pages} ${isEn ? 'pages' : 'стр.'}`
                      : ''}
                  </span>
                </div>
              </Link>

              {card.pages > 1 && (
                <nav
                  className="hub-pages hub-pages--home"
                  aria-label={
                    isEn
                      ? `${card.titleEn} pages`
                      : `Страницы ${card.titleRu}`
                  }
                >
                  <ol className="hub-pages__list">
                    {chips.map((p, idx) =>
                      p === '…' ? (
                        <li key={`e-${card.slug}-${idx}`} className="hub-pages__ellipsis" aria-hidden="true">
                          …
                        </li>
                      ) : (
                        <li key={`${card.slug}-${p}`}>
                          <Link
                            href={p === 1 ? hub : `${hub}?page=${p}`}
                            className="hub-pages__leaf"
                            prefetch={false}
                          >
                            <span className="hub-pages__leaf-face">{p}</span>
                          </Link>
                        </li>
                      ),
                    )}
                  </ol>
                </nav>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
