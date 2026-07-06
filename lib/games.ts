import gamesData from './games-data.json'

export type Lang = 'en' | 'ru'

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
    metaTitleHome: 'Play Free Demo — Crash Games & Slots',
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
    metaTitleHome: 'Играть в демо — Краш игры и слоты',
    metaDescHome:
      'Бесплатные демо-версии лучших краш игр и слотов. Без регистрации. Lucky Jet, Gates of Olympus, Sweet Bonanza и другие.',
    filterAll: 'Все',
    heroTitle: 'Играть в демо',
    heroSub: 'Без регистрации · Мгновенно · Оптимизировано для мобильных',
  },
} as const
