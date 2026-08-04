import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { homeHref } from '@/lib/games'
import { getProviderCards, providerHref } from '@/lib/providers'

export const metadata: Metadata = {
  title: 'Провайдеры демо — бесплатные лобби | 1weapp',
  description: 'Каталог бесплатных демо по провайдерам на 1weapp: Pragmatic Play, Play\'n GO, Hacksaw, BGaming и другие.',
  alternates: {
    canonical: 'https://www.1weapp.online/ru/providers',
    languages: {
      en: 'https://www.1weapp.online/en/providers',
      ru: 'https://www.1weapp.online/ru/providers',
    },
  },
}

export default function RuProvidersIndexPage() {
  const cards = getProviderCards(4)
  return (
    <>
      <SiteHeader lang="ru" />
      <main id="main-content" className="provider-hub" role="main">
        <nav className="provider-hub__crumbs" aria-label="Breadcrumb">
          <Link href={homeHref('ru')}>Главная</Link>
          <span aria-hidden="true">/</span>
          <span>Провайдеры</span>
        </nav>
        <header className="provider-hub__head">
          <p className="provider-hub__eyebrow">Каталог</p>
          <h1>Провайдеры</h1>
          <p>Выберите студию и откройте её полное бесплатное лобби.</p>
        </header>
        <ul className="home-provider-hubs__grid">
          {cards.map((card) => (
            <li key={card.slug}>
              <Link href={providerHref('ru', card.slug)} className="home-provider-hubs__card">
                <div className="home-provider-hubs__previews" aria-hidden="true">
                  {card.previews.map((game) => (
                    <span key={game.slug} className="home-provider-hubs__shot">
                      <Image src={game.avatar} alt="" width={72} height={96} sizes="72px" />
                    </span>
                  ))}
                </div>
                <div className="home-provider-hubs__meta">
                  <span className="home-provider-hubs__name">{card.titleRu}</span>
                  <span className="home-provider-hubs__count">{card.count} демо</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter lang="ru" />
    </>
  )
}
