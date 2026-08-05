import { games, type Game, type Lang, homeHref } from '@/lib/games'

/** Games per page on provider hubs (and home page chips). */
export const PROVIDER_PAGE_SIZE = 36

export type ProviderDef = {
  /** URL segment, e.g. play-n-go */
  slug: string
  /** Catalog provider string */
  name: string
  titleEn: string
  titleRu: string
}

export const PROVIDERS: ProviderDef[] = [
  { slug: 'pragmatic-play', name: 'Pragmatic Play', titleEn: 'Pragmatic Play', titleRu: 'Pragmatic Play' },
  { slug: 'play-n-go', name: "Play'n GO", titleEn: "Play'n GO", titleRu: "Play'n GO" },
  { slug: 'netent', name: 'NetEnt', titleEn: 'NetEnt', titleRu: 'NetEnt' },
  { slug: 'hacksaw-gaming', name: 'Hacksaw Gaming', titleEn: 'Hacksaw Gaming', titleRu: 'Hacksaw Gaming' },
  { slug: 'bgaming', name: 'BGaming', titleEn: 'BGaming', titleRu: 'BGaming' },
  { slug: 'nolimit-city', name: 'Nolimit City', titleEn: 'Nolimit City', titleRu: 'Nolimit City' },
  { slug: 'big-time-gaming', name: 'Big Time Gaming', titleEn: 'Big Time Gaming', titleRu: 'Big Time Gaming' },
  { slug: 'red-tiger', name: 'Red Tiger', titleEn: 'Red Tiger', titleRu: 'Red Tiger' },
  { slug: '1weapp-games', name: '1weapp Games', titleEn: '1weapp Games', titleRu: '1weapp Games' },
]

export function getProviderBySlug(slug: string): ProviderDef | undefined {
  return PROVIDERS.find((p) => p.slug === slug)
}

export function getProviderByName(name: string): ProviderDef | undefined {
  return PROVIDERS.find((p) => p.name === name)
}

export function getGamesByProvider(name: string): Game[] {
  return games
    .filter((g) => g.provider === name)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function providerHref(lang: Lang, providerSlug: string): string {
  return lang === 'en' ? `/en/providers/${providerSlug}` : `/ru/providers/${providerSlug}`
}

export function providersIndexHref(lang: Lang): string {
  return lang === 'en' ? '/en/providers' : '/ru/providers'
}

export type ProviderCard = ProviderDef & {
  count: number
  pages: number
  /** Single collage image: /banners/providers/{slug}.webp */
  previewImage: string
}

export function getProviderCards(): ProviderCard[] {
  return PROVIDERS.map((p) => {
    const list = getGamesByProvider(p.name)
    return {
      ...p,
      count: list.length,
      pages: Math.max(1, Math.ceil(list.length / PROVIDER_PAGE_SIZE)),
      previewImage: `/banners/providers/${p.slug}.webp`,
    }
  }).filter((p) => p.count > 0)
}

export function homePath(lang: Lang): string {
  return homeHref(lang)
}
