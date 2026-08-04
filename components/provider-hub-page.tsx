import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GameCard } from '@/components/game-card'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import type { Lang } from '@/lib/games'
import { homeHref } from '@/lib/games'
import {
  getGamesByProvider,
  getProviderBySlug,
  PROVIDERS,
  providerHref,
  providersIndexHref,
} from '@/lib/providers'

const PAGE_SIZE = 36

export function providerStaticParams() {
  return PROVIDERS.map((p) => ({ provider: p.slug }))
}

export function providerMetadata(lang: Lang, providerSlug: string): Metadata {
  const provider = getProviderBySlug(providerSlug)
  if (!provider) return {}
  const title =
    lang === 'en'
      ? `${provider.titleEn} demos — play free | 1weapp`
      : `${provider.titleRu} демо — играть бесплатно | 1weapp`
  const description =
    lang === 'en'
      ? `Browse free ${provider.titleEn} demo games on 1weapp. No signup, instant browser play.`
      : `Смотрите бесплатные демо ${provider.titleRu} на 1weapp. Без регистрации, сразу в браузере.`
  const url = `https://www.1weapp.online${providerHref(lang, provider.slug)}`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `https://www.1weapp.online${providerHref('en', provider.slug)}`,
        ru: `https://www.1weapp.online${providerHref('ru', provider.slug)}`,
      },
    },
  }
}

export function ProviderHubPage({
  lang,
  providerSlug,
  page = 1,
}: {
  lang: Lang
  providerSlug: string
  page?: number
}) {
  const provider = getProviderBySlug(providerSlug)
  if (!provider) notFound()

  const isEn = lang === 'en'
  const all = getGamesByProvider(provider.name)
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const slice = all.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const hubBase = providerHref(lang, provider.slug)

  return (
    <>
      <SiteHeader lang={lang} />
      <main id="main-content" className="provider-hub" role="main">
        <nav className="provider-hub__crumbs" aria-label="Breadcrumb">
          <Link href={homeHref(lang)}>{isEn ? 'Home' : 'Главная'}</Link>
          <span aria-hidden="true">/</span>
          <Link href={providersIndexHref(lang)}>{isEn ? 'Providers' : 'Провайдеры'}</Link>
          <span aria-hidden="true">/</span>
          <span>{isEn ? provider.titleEn : provider.titleRu}</span>
        </nav>

        <header className="provider-hub__head">
          <p className="provider-hub__eyebrow">{isEn ? 'Provider lobby' : 'Лобби провайдера'}</p>
          <h1>{isEn ? provider.titleEn : provider.titleRu}</h1>
          <p>
            {isEn
              ? `${all.length} free demos — open any title in your browser.`
              : `${all.length} бесплатных демо — открывайте любой тайтл в браузере.`}
          </p>
        </header>

        {slice.length > 0 && (
          <div className="provider-hub__previews" aria-hidden="true">
            {all.slice(0, 5).map((g) => (
              <span key={g.slug} className="provider-hub__shot">
                <Image src={g.avatar} alt="" width={64} height={85} sizes="64px" priority={false} />
              </span>
            ))}
          </div>
        )}

        <div className="games-grid provider-hub__grid">
          {slice.map((game, i) => (
            <GameCard key={game.slug} game={game} lang={lang} priority={i < 4} />
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="provider-hub__pager" aria-label={isEn ? 'Pagination' : 'Страницы'}>
            {safePage > 1 ? (
              <Link
                href={safePage - 1 === 1 ? hubBase : `${hubBase}?page=${safePage - 1}`}
                className="provider-hub__page-btn"
              >
                {isEn ? 'Previous' : 'Назад'}
              </Link>
            ) : (
              <span className="provider-hub__page-btn is-disabled">{isEn ? 'Previous' : 'Назад'}</span>
            )}
            <span className="provider-hub__page-status">
              {safePage} / {totalPages}
            </span>
            {safePage < totalPages ? (
              <Link href={`${hubBase}?page=${safePage + 1}`} className="provider-hub__page-btn">
                {isEn ? 'Next' : 'Далее'}
              </Link>
            ) : (
              <span className="provider-hub__page-btn is-disabled">{isEn ? 'Next' : 'Далее'}</span>
            )}
          </nav>
        )}
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
