import Image from 'next/image'
import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { getProviderCards, providerHref } from '@/lib/providers'

export function HomeProviderHubs({ lang }: { lang: Lang }) {
  const isEn = lang === 'en'
  const cards = getProviderCards()

  return (
    <div className="atelier-studios">
      <header className="atelier-head">
        <p className="atelier-head__eyebrow">{isEn ? 'Studios' : 'Студии'}</p>
        <h2 id="atelier-providers-title" className="atelier-head__title">
          {isEn ? 'Browse by provider' : 'Каталог по провайдерам'}
        </h2>
        <p className="atelier-head__sub">
          {isEn
            ? 'Full lobbies live on their own pages — keep the home light.'
            : 'Полные лобби на отдельных страницах — главная остаётся лёгкой.'}
        </p>
      </header>

      <ul className="atelier-studios__list">
        {cards.map((card) => {
          const hub = providerHref(lang, card.slug)
          return (
            <li key={card.slug}>
              <Link href={hub} className="atelier-studios__link">
                <span className="atelier-studios__thumb" aria-hidden="true">
                  <Image
                    src={card.previewImage}
                    alt=""
                    width={160}
                    height={90}
                    sizes="120px"
                    loading="lazy"
                    unoptimized
                  />
                </span>
                <span className="atelier-studios__text">
                  <span className="atelier-studios__name">
                    {isEn ? card.titleEn : card.titleRu}
                  </span>
                  <span className="atelier-studios__count">
                    {card.count} {isEn ? 'demos' : 'демо'}
                  </span>
                </span>
                <span className="atelier-studios__go" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
