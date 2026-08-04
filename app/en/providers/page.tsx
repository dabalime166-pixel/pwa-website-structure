import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { homeHref } from '@/lib/games'
import { getProviderCards, providerHref } from '@/lib/providers'

export const metadata: Metadata = {
  title: 'Demo providers — free lobbies | 1weapp',
  description: 'Browse free demo lobbies by provider on 1weapp: Pragmatic Play, Play\'n GO, Hacksaw, BGaming and more.',
  alternates: {
    canonical: 'https://www.1weapp.online/en/providers',
    languages: {
      en: 'https://www.1weapp.online/en/providers',
      ru: 'https://www.1weapp.online/ru/providers',
    },
  },
}

export default function EnProvidersIndexPage() {
  const cards = getProviderCards(4)
  return (
    <>
      <SiteHeader lang="en" />
      <main id="main-content" className="provider-hub" role="main">
        <nav className="provider-hub__crumbs" aria-label="Breadcrumb">
          <Link href={homeHref('en')}>Home</Link>
          <span aria-hidden="true">/</span>
          <span>Providers</span>
        </nav>
        <header className="provider-hub__head">
          <p className="provider-hub__eyebrow">Catalog</p>
          <h1>Providers</h1>
          <p>Pick a studio and open its full free-demo lobby.</p>
        </header>
        <ul className="home-provider-hubs__grid">
          {cards.map((card) => (
            <li key={card.slug}>
              <Link href={providerHref('en', card.slug)} className="home-provider-hubs__card">
                <div className="home-provider-hubs__previews" aria-hidden="true">
                  {card.previews.map((game) => (
                    <span key={game.slug} className="home-provider-hubs__shot">
                      <Image src={game.avatar} alt="" width={72} height={96} sizes="72px" />
                    </span>
                  ))}
                </div>
                <div className="home-provider-hubs__meta">
                  <span className="home-provider-hubs__name">{card.titleEn}</span>
                  <span className="home-provider-hubs__count">{card.count} demos</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter lang="en" />
    </>
  )
}
