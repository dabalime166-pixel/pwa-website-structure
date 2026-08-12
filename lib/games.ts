import catalogData from './games-catalog.json'

export type Lang = 'en' | 'ru'

/**
 * Normalize pathnames. Keeps locale prefixes intact for valid localized routes.
 */
export function cleanPathname(pathname: string): string {
  if (!pathname) return '/'
  let cleaned = pathname.replace(/;+$/, '').trim()
  if (!cleaned.startsWith('/')) cleaned = `/${cleaned}`
  cleaned = cleaned.replace(/^\/(en|ru)\/(en|ru)(?=\/|$)/, '/$1')
  return cleaned === '' ? '/' : cleaned
}

/** Lightweight catalog entry — safe for client components & RSC payloads. */
export interface Game {
  slug: string
  name: string
  provider: string
  avatar: string
  externalUrl?: string
  rtp?: string
  gameType?: string
}

/** Full game record used only on the server (SEO + iframe). */
export interface GameFull extends Game {
  iframeUrl: string
  keywordsRu: string
  keywordsEn: string
  seoTextRu: string
  seoTextEn: string
  titleSeoEn?: string
  titleSeoRu?: string
  descriptionSeoEn?: string
  descriptionSeoRu?: string
}

export const games: Game[] = catalogData as Game[]

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug)
}

/** Related games by type/provider, excluding current slug */
export function getRelatedGames(slug: string, limit = 4): Game[] {
  const current = getGame(slug)
  if (!current) return games.filter((g) => g.slug !== slug).slice(0, limit)

  const scored = games
    .filter((g) => g.slug !== slug)
    .map((g) => {
      let score = 0
      if (current.gameType && g.gameType === current.gameType) score += 3
      if (g.provider === current.provider) score += 2
      return { g, score }
    })
    .sort((a, b) => b.score - a.score || a.g.name.localeCompare(b.g.name))

  return scored.slice(0, limit).map((x) => x.g)
}

/** Guides relevant to a game type */
export function getRelatedGuideIds(gameType?: string): string[] {
  const type = (gameType || '').toLowerCase()
  if (type.includes('crash')) return ['crash', 'rtp', 'responsible']
  if (type.includes('mine')) return ['mines', 'rtp', 'responsible']
  return ['rtp', 'bonuses', 'mistakes', 'responsible']
}

/** CTA link */
export const CTA_URL = 'https://lkiv.cc/dea2'

/** English home lives at `/`; Russian at `/ru` */
export function homeHref(lang: Lang): string {
  return lang === 'en' ? '/' : '/ru'
}

export const i18n = {
  en: {
    playDemo: 'Play Demo',
    playReal: 'Play for Real Money',
    provider: 'Provider',
    home: 'Home',
    games: 'All Games',
    demo: 'Demo',
    breadcrumbHome: 'Home',
    metaTitleHome: 'Free Slot Demos No Registration — Crash & Mines | 1weapp',
    metaDescHome:
      'Free slot demos with no signup: Lucky Jet crash, Pragmatic Play slots and mines — no deposit. Open instantly in your browser on 1weapp.',
    filterAll: 'All',
    heroTitle: 'Play the best demos for free',
    heroSub: 'Instant demos in your browser. No deposit or registration.',
  },
  ru: {
    playDemo: 'Играть Бесплатно',
    playReal: 'Играть на реальные деньги',
    provider: 'Провайдер',
    home: 'Главная',
    games: 'Все игры',
    demo: 'Демо',
    breadcrumbHome: 'Главная',
    metaTitleHome: 'Бесплатные демо слоты без регистрации — краш и mines | 1weapp',
    metaDescHome:
      'Бесплатные демо слоты без регистрации: Lucky Jet, слоты Pragmatic Play и mines без депозита. Открывайте демо сразу в браузере на 1weapp.',
    filterAll: 'Все',
    heroTitle: 'Играй в лучшие демо бесплатно',
    heroSub: 'Мгновенные демо в браузере. Без депозита и регистрации.',
  },
} as const
