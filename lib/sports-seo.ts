import type { Metadata } from 'next'
import type { Lang } from '@/lib/games'
import { getFootballMatch } from '@/lib/sportscore'
import type { SportScoreMatch } from '@/lib/sports-types'
import { isLiveStatus } from '@/lib/sports-types'
import { withBrandTitle } from '@/lib/seo'

function scorePair(match: SportScoreMatch) {
  const home = match.home_score
  const away = match.away_score
  if (home == null || home === '' || away == null || away === '') return null
  return `${home}-${away}`
}

export function matchHeadline(match: SportScoreMatch, lang: Lang) {
  const vs = lang === 'ru' ? 'против' : 'vs'
  return `${match.home} ${vs} ${match.away}`
}

export function buildMatchTitle(match: SportScoreMatch, lang: Lang) {
  const pair = matchHeadline(match, lang)
  const score = scorePair(match)
  const live = isLiveStatus(match.status)

  let core: string
  if (lang === 'ru') {
    if (live) core = score ? `${pair} — Live ${score}` : `${pair} — Live-счёт`
    else if (score) core = `${pair} ${score} — результат и составы`
    else core = `${pair} — счёт, события и составы`
  } else {
    if (live) core = score ? `${pair} Live Score ${score}` : `${pair} Live Score`
    else if (score) core = `${pair} ${score} — Result, Events & Lineups`
    else core = `${pair} — Live Score, Events & Lineups`
  }

  return withBrandTitle(core, 70)
}

export function buildMatchDescription(match: SportScoreMatch, lang: Lang) {
  const pair = matchHeadline(match, lang)
  const score = scorePair(match)
  const competition = match.competition || (lang === 'ru' ? 'футбол' : 'football')
  const status = match.status_text || match.status
  const live = isLiveStatus(match.status)

  if (lang === 'ru') {
    const scoreBit = score ? ` Счёт ${score}.` : ''
    const liveBit = live ? ' Live-счёт в реальном времени.' : ''
    return `${pair} — матч ${competition}.${scoreBit}${liveBit} События, составы и статистика на 1weapp. Статус: ${status}.`.replace(
      /\s+/g,
      ' ',
    )
  }

  const scoreBit = score ? ` Score ${score}.` : ''
  const liveBit = live ? ' Follow the live score in real time.' : ''
  return `${pair} match in ${competition}.${scoreBit}${liveBit} Events, lineups and stats on 1weapp. Status: ${status}.`.replace(
    /\s+/g,
    ' ',
  )
}

export function buildMatchH1(match: SportScoreMatch, lang: Lang) {
  const pair = matchHeadline(match, lang)
  const score = scorePair(match)
  const live = isLiveStatus(match.status)

  if (lang === 'ru') {
    if (live) return score ? `${pair}: live-счёт ${score}` : `${pair}: live-счёт`
    if (score) return `${pair}: результат ${score}`
    return `${pair}: счёт и составы`
  }

  if (live) return score ? `${pair}: live score ${score}` : `${pair}: live score`
  if (score) return `${pair}: result ${score}`
  return `${pair}: live score & lineups`
}

export async function buildMatchMetadata(
  slug: string,
  lang: Lang,
): Promise<Metadata> {
  const path = lang === 'en' ? `/en/sports/match/${slug}` : `/ru/sports/match/${slug}`
  const enUrl = `https://www.1weapp.online/en/sports/match/${slug}`
  const ruUrl = `https://www.1weapp.online/ru/sports/match/${slug}`
  const canonical = lang === 'en' ? enUrl : ruUrl

  let title: string
  let description: string

  try {
    const res = await getFootballMatch(slug)
    const match = res.match
    title = buildMatchTitle(match, lang)
    description = buildMatchDescription(match, lang)
  } catch {
    title =
      lang === 'ru'
        ? withBrandTitle('Футбольный матч — live-счёт и составы', 70)
        : withBrandTitle('Football match — live score & lineups', 70)
    description =
      lang === 'ru'
        ? 'Live-счёт футбольного матча, события, составы и статистика на 1weapp.'
        : 'Football match live score, events, lineups and statistics on 1weapp.'
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        ru: ruUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: '1weapp',
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.1weapp.online/banners/sports-hub-hero.jpg',
          width: 1920,
          height: 1080,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
