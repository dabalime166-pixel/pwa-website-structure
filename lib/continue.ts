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
    operatorCta: 'Open operator site (18+)',
    title: 'Continue to real play',
    metaTitle: 'Continue to real play (18+) | 1weapp',
    metaDesc:
      'Finished the free demo? Continue to a licensed operator. 18+ only — set limits first. 1weapp stays a demo catalog.',
    kicker: '18+ · Next step',
    lead: '1weapp is a free demo catalog. Real-money play happens on a licensed operator, not inside this site.',
    stepsTitle: 'Before you continue',
    steps: [
      'You are 18 or older in your jurisdiction.',
      'Set a deposit and session limit you can afford to lose.',
      'Treat this as entertainment — never chase a loss.',
    ],
    gameNote: (name: string) =>
      `You came from the ${name} demo. The operator lobby uses the same game title — search it after you open the site.`,
    legal: '18+ · Gamble responsibly · T&C of the operator apply',
    backDemo: 'Back to demos',
    responsible: 'Responsible gaming',
  },
  ru: {
    playReal: 'Играть на деньги (18+)',
    operatorCta: 'Открыть сайт оператора (18+)',
    title: 'Продолжить в реальной игре',
    metaTitle: 'Продолжить в реальной игре (18+) | 1weapp',
    metaDesc:
      'Закончили бесплатное демо? Дальше — лицензированный оператор. Только 18+, сначала лимиты. 1weapp остаётся каталогом демо.',
    kicker: '18+ · Следующий шаг',
    lead: '1weapp — каталог бесплатных демо. Игра на деньги проходит у лицензированного оператора, не на этом сайте.',
    stepsTitle: 'Перед тем как продолжить',
    steps: [
      'Вам есть 18 лет в вашей юрисдикции.',
      'Задайте лимит депозита и сессии, который готовы потерять.',
      'Это развлечение: не отыгрывайтесь после проигрыша.',
    ],
    gameNote: (name: string) =>
      `Вы пришли из демо ${name}. В лобби оператора ищите то же название игры после перехода.`,
    legal: '18+ · Играйте ответственно · Действуют правила оператора',
    backDemo: 'К демо',
    responsible: 'Ответственная игра',
  },
} as const
