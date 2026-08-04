import { games, type Game, type Lang, homeHref } from '@/lib/games'

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
  { slug: 'hacksaw-gaming', name: 'Hacksaw Gaming', titleEn: 'Hacksaw Gaming', titleRu: 'Hacksaw Gaming' },
  { slug: 'bgaming', name: 'BGaming', titleEn: 'BGaming', titleRu: 'BGaming' },
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
  previews: Game[]
}

export function getProviderCards(previewCount = 4): ProviderCard[] {
  return PROVIDERS.map((p) => {
    const list = getGamesByProvider(p.name)
    return {
      ...p,
      count: list.length,
      previews: list.slice(0, previewCount),
    }
  }).filter((p) => p.count > 0)
}

export function homePath(lang: Lang): string {
  return homeHref(lang)
}
