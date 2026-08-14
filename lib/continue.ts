import type { Lang } from '@/lib/games'
import { CTA_URL } from '@/lib/games'

/** First-party hop before the licensed operator. Keeps demo pages less doorway-like. */
export function continueHref(lang: Lang, gameSlug?: string): string {
  const base = lang === 'ru' ? '/ru/continue' : '/en/continue'
  if (!gameSlug) return base
  return `${base}?game=${encodeURIComponent(gameSlug)}`
}

export function operatorHref(): string {
  return CTA_URL
}

/** External operator links open in a new tab with sponsored rel; hop URLs stay on-site. */
export function ctaAnchorProps(href: string): { href: string; rel?: string; target?: string } {
  if (/^https?:\/\//i.test(href)) {
    return { href, rel: 'noopener noreferrer nofollow sponsored', target: '_blank' }
  }
  return { href }
}

export const CONTINUE_COPY = {
  en: {
    playReal: 'Play for real (18+)',
    operatorCta: 'Play at 1win (18+)',
    title: 'Open 1win',
    metaTitle: 'Open 1win (18+) | 1weapp',
    metaDesc:
      'Leave the 1weapp demo catalog for 1win. 18+ only — set limits first. Real-money play is on the operator, not on this site.',
    kicker: '18+ · 1win',
    lead: '1weapp is a free demo catalog. Real-money play continues on 1win — a licensed operator, not this site.',
    stepsTitle: 'Before you continue',
    steps: [
      'You are 18 or older in your jurisdiction.',
      'Set a deposit and session limit you can afford to lose.',
      'Treat this as entertainment — never chase a loss.',
    ],
    gameNote: (name: string) =>
      `You came from the ${name} demo. In 1win, search the same title in the lobby after you open the site.`,
    legal: '18+ · Gamble responsibly · T&C of the operator apply',
    backDemo: 'Back to demos',
    responsible: 'Responsible gaming',
  },
  ru: {
    playReal: 'Играть на деньги (18+)',
    operatorCta: 'Играть в 1win (18+)',
    title: 'Переход на 1win',
    metaTitle: 'Переход на 1win (18+) | 1weapp',
    metaDesc:
      'С каталога демо 1weapp можно перейти в 1win. Только 18+, сначала лимиты. Игра на деньги — у оператора, не на этом сайте.',
    kicker: '18+ · 1win',
    lead: '1weapp — каталог бесплатных демо. Игра на деньги продолжается в 1win — у лицензированного оператора, не на этом сайте.',
    stepsTitle: 'Перед тем как продолжить',
    steps: [
      'Вам есть 18 лет в вашей юрисдикции.',
      'Задайте лимит депозита и сессии, который готовы потерять.',
      'Это развлечение: не отыгрывайтесь после проигрыша.',
    ],
    gameNote: (name: string) =>
      `Вы пришли из демо ${name}. В лобби 1win ищите то же название после перехода.`,
    legal: '18+ · Играйте ответственно · Действуют правила оператора',
    backDemo: 'К демо',
    responsible: 'Ответственная игра',
  },
} as const
