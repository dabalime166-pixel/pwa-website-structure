import gamesData from './games-data.json'

export type Lang = 'en' | 'ru'

/**
 * Normalize pathnames. Keeps locale prefixes intact for valid localized routes.
 */
export function cleanPathname(pathname: string): string {
  if (!pathname) return '/'
  let cleaned = pathname.replace(/;+$/, '').trim()
  if (!cleaned.startsWith('/')) cleaned = `/${cleaned}`
  // Collapse duplicate locale prefixes like /en/en/...
  cleaned = cleaned.replace(/^\/(en|ru)\/(en|ru)(?=\/|$)/, '/$1')
  return cleaned === '' ? '/' : cleaned
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
  return lang === 'ru'
    ? `${game.name} — Играть в демо онлайн`
    : `${game.name} Demo — Play Free Online`
}

export function getSeoDescription(game: Game, lang: Lang): string {
  const custom = lang === 'ru' ? game.descriptionSeoRu : game.descriptionSeoEn
  if (custom) return custom
  const type = game.gameType || (lang === 'ru' ? 'игра' : 'game')
  const rtp = game.rtp ? ` RTP ${game.rtp}.` : ''
  return lang === 'ru'
    ? `Играйте в ${game.name} демо бесплатно — без регистрации. ${game.provider}, ${type}.${rtp}`
    : `Play ${game.name} demo free — no registration needed. ${game.provider} ${type}.${rtp}`
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
    heroTitle: 'Play the hottest demos free',
    heroSub: 'Crash, slots & mines — instant browser play, zero signup.',
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
    heroTitle: 'Играй в топовые демо бесплатно',
    heroSub: 'Краш, слоты и mines — мгновенно в браузере, без регистрации.',
  },
} as const
