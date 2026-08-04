import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProviderHubLobby } from '@/components/provider-hub-lobby'
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
  const previewImage = `/banners/providers/${provider.slug}.webp`

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
              ? `${all.length} free demos — search or browse by page.`
              : `${all.length} бесплатных демо — ищите или листайте по страницам.`}
          </p>
        </header>

        {all.length > 0 && (
          <div className="provider-hub__collage" aria-hidden="true">
            <Image
              src={previewImage}
              alt=""
              width={240}
              height={136}
              sizes="(max-width: 640px) 160px, 200px"
              priority={false}
            />
          </div>
        )}

        <Suspense
          fallback={
            <div className="games-grid provider-hub__grid">
              {all.slice(0, 12).map((game) => (
                <div key={game.slug} className="provider-hub__skel" aria-hidden="true" />
              ))}
            </div>
          }
        >
          <ProviderHubLobby lang={lang} games={all} initialPage={page} />
        </Suspense>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
