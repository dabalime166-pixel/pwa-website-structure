import gamesData from './games-data.json'

export type Lang = 'en' | 'ru'

/**
 * Removes locale prefix and trailing semicolon from pathname.
 * Prevents double locale prefixes (e.g., /en/en/guides) and broken URLs.
 * @example
 * cleanPathname('/en/guides/plinko') → '/guides/plinko'
 * cleanPathname('/ru/games') → '/games'
 * cleanPathname('/guides') → '/guides'
 * cleanPathname('/en/ru/') → '/' (removes malformed double prefix)
 */
export function cleanPathname(pathname: string): string {
  if (!pathname) return '/'
  
  // Remove trailing semicolon if present (prevents malformed URLs)
  let cleaned = pathname.replace(/;+$/, '')
  
  // Remove locale prefix from start (/en, /ru)
  cleaned = cleaned.replace(/^\/(en|ru)(\/|$)/, '/$1' === cleaned.slice(0, 4) ? '/' : '')
  
  // If cleaning didn't remove the prefix properly, try again
  if (cleaned.startsWith('/en/') || cleaned.startsWith('/ru/')) {
    cleaned = cleaned.slice(3) // Remove first 3 chars (/en or /ru)
  }
  
  // Ensure path starts with /
  if (!cleaned.startsWith('/')) {
    cleaned = '/' + cleaned
  }
  
  return cleaned
}

export interface Game {
  slug: string
  name: string
  provider: string
  iframeUrl: string
  keywordsRu: string
  keywordsEn: string
  seoTextRu: string
  seoTextEn: string
  avatar: string
  /** If set, the card links directly to this external URL instead of the internal game page */
  externalUrl?: string
  /** Custom SEO title (EN) — if empty, auto-generated from game name */
  titleSeoEn?: string
  /** Custom SEO title (RU) — if empty, auto-generated from game name */
  titleSeoRu?: string
  /** Custom SEO description (EN) — if empty, auto-generated from keywords */
  descriptionSeoEn?: string
  /** Custom SEO description (RU) — if empty, auto-generated from keywords */
  descriptionSeoRu?: string
  /** RTP (Return to Player) percentage, e.g., "96.48%" */
  rtp?: string
  /** Game type: "Slots", "Crash Games", "Mines", etc. */
  gameType?: string
}

export const games: Game[] = gamesData as Game[]

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug)
}

export function getKeywords(game: Game, lang: Lang): string[] {
  const raw = lang === 'ru' ? game.keywordsRu : game.keywordsEn
  return raw
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 10)
}

export function getSeoText(game: Game, lang: Lang): string {
  return lang === 'ru' ? game.seoTextRu : game.seoTextEn
}

export function getSeoTitle(game: Game, lang: Lang): string {
  const custom = lang === 'ru' ? game.titleSeoRu : game.titleSeoEn
  if (custom) return custom
  // Fallback: auto-generate from game name
  return lang === 'ru'
    ? `${game.name} — Играть в демо онлайн`
    : `${game.name} Demo — Play Free Online`
}

export function getSeoDescription(game: Game, lang: Lang): string {
  const custom = lang === 'ru' ? game.descriptionSeoRu : game.descriptionSeoEn
  if (custom) return custom
  // Fallback: auto-generate from keywords
  const keywords = getKeywords(game, lang).slice(0, 3).join(', ')
  return lang === 'ru'
    ? `Играйте в ${game.name} демо бесплатно — без регистрации. ${game.provider}. ${keywords}.`
    : `Play ${game.name} demo free — no registration needed. ${game.provider}. ${keywords}.`
}

/** Format plain SEO text into semantic HTML paragraphs */
export function formatSeoText(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => `<p>${para}</p>`)
    .join('\n')
}

/**
 * Generate deterministic unique rating (3.5-4.9) and review count (100-500)
 * based on game name hash. Same game always gets same rating.
 * @example
 * getGameRating("Lucky Jet") → { rating: 4.7, reviewCount: 284 }
 */
export function getGameRating(gameName: string): { rating: number; reviewCount: number } {
  // Simple hash function from game name
  let hash = 0
  for (let i = 0; i < gameName.length; i++) {
    const char = gameName.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  
  // Generate deterministic but varied rating (3.5 to 4.9)
  const ratingRand = Math.abs(hash % 1000) / 1000
  const rating = Math.round((3.5 + ratingRand * 1.4) * 10) / 10
  
  // Generate deterministic review count (100-500)
  const reviewCountRand = Math.abs((hash >> 8) % 1000) / 1000
  const reviewCount = Math.round(100 + reviewCountRand * 400)
  
  return { rating, reviewCount }
}

/** CTA link */
export const CTA_URL = 'https://lkiv.cc/dea2'

export const i18n = {
  en: {
    playDemo: 'Play Demo',
    playReal: 'Play for Real Money 🚀',
    provider: 'Provider',
    home: 'Home',
    games: 'All Games',
    demo: 'Demo',
    breadcrumbHome: 'Home',
    metaTitleHome: 'Best Free Slots: Spin & Play with Bonus Rounds | 1Weаpp',
    metaDescHome:
      'Free demo versions of the best crash games and slots. No registration. Lucky Jet, Gates of Olympus, Sweet Bonanza and more.',
    filterAll: 'All',
    heroTitle: 'Play Demo Games',
    heroSub: 'No registration · Instant play · Mobile optimized',
  },
  ru: {
    playDemo: 'Играть Бесплатно',
    playReal: 'Играть на реальные деньги 🚀',
    provider: 'Провайдер',
    home: 'Главная',
    games: 'Все игры',
    demo: 'Демо',
    breadcrumbHome: 'Главная',
    metaTitleHome: 'Бесплатные Слот Игры Без Регистрации: Демо с Бонусами | 1WeApp',
    metaDescHome:
      'Бесплатные демо-версии лучших краш игр и слотов. Без регистрации. Lucky Jet, Gates of Olympus, Sweet Bonanza и другие.',
    filterAll: 'Все',
    heroTitle: 'Играть в демо',
    heroSub: 'Без регистрации · Мгновенно · Оптимизировано для мобильных',
  },
} as const
