import type { Metadata } from 'next'
import type { Lang } from '@/lib/games'
import { getFootballMatch, getFootballStandings, getFootballTeam } from '@/lib/sportscore'
import type { SportScoreMatch } from '@/lib/sports-types'
import { isLiveStatus } from '@/lib/sports-types'
import { getLeague, leagueName } from '@/lib/sports-leagues'
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
    else if (score) core = `${pair} ${score} — отчёт, события и составы`
    else core = `${pair} — счёт, события и составы`
  } else {
    if (live) core = score ? `${pair} Live Score ${score}` : `${pair} Live Score`
    else if (score) core = `${pair} ${score} — Report, Events & Lineups`
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
    return `${pair} — матч ${competition}.${scoreBit}${liveBit} Таймлайн, составы, герой матча и статистика на 1weapp. Статус: ${status}.`.replace(
      /\s+/g,
      ' ',
    )
  }

  const scoreBit = score ? ` Score ${score}.` : ''
  const liveBit = live ? ' Follow the live score in real time.' : ''
  return `${pair} match in ${competition}.${scoreBit}${liveBit} Timeline, lineups, match hero and stats on 1weapp. Status: ${status}.`.replace(
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

function alts(enPath: string, ruPath: string, lang: Lang) {
  const enUrl = `https://www.1weapp.online${enPath}`
  const ruUrl = `https://www.1weapp.online${ruPath}`
  const canonical = lang === 'en' ? enUrl : ruUrl
  return { enUrl, ruUrl, canonical }
}

export async function buildMatchMetadata(slug: string, lang: Lang): Promise<Metadata> {
  const { enUrl, ruUrl, canonical } = alts(`/en/sports/match/${slug}`, `/ru/sports/match/${slug}`, lang)

  let title: string
  let description: string

  try {
    const res = await getFootballMatch(slug)
    title = buildMatchTitle(res.match, lang)
    description = buildMatchDescription(res.match, lang)
  } catch {
    title =
      lang === 'ru'
        ? withBrandTitle('Футбольный матч — live-счёт и составы', 70)
        : withBrandTitle('Football match — live score & lineups', 70)
    description =
      lang === 'ru'
        ? 'Live-счёт футбольного матча, таймлайн, составы и герой матча на 1weapp.'
        : 'Football match live score, timeline, lineups and match hero on 1weapp.'
  }

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical, languages: { en: enUrl, ru: ruUrl, 'x-default': enUrl } },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: '1weapp',
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.1weapp.online/banners/sports-match-bg.jpg',
          width: 1920,
          height: 1080,
          alt: title,
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export async function buildLeagueMetadata(slug: string, lang: Lang): Promise<Metadata> {
  const league = getLeague(slug)
  const name = league ? leagueName(league, lang) : slug
  const { enUrl, ruUrl, canonical } = alts(`/en/sports/league/${slug}`, `/ru/sports/league/${slug}`, lang)

  let tableHint = ''
  try {
    const standings = await getFootballStandings(slug)
    const rows = standings.tables?.[0]?.rows || []
    if (rows[0]) {
      tableHint =
        lang === 'ru'
          ? ` Лидер: ${rows[0].team} — ${rows[0].pts} очков.`
          : ` Table leaders: ${rows[0].team} on ${rows[0].pts} pts.`
    }
  } catch {
    /* optional */
  }

  const title =
    lang === 'ru'
      ? withBrandTitle(`${name} — таблица, клубы и форма`, 70)
      : withBrandTitle(`${name} table, clubs & form`, 70)
  const description =
    lang === 'ru'
      ? `Таблица ${name}, позиции клубов, разница мячей и очки на 1weapp.${tableHint} Данные SportScore.`
      : `${name} standings, club positions, goal difference and points on 1weapp.${tableHint} Powered by SportScore.`

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical, languages: { en: enUrl, ru: ruUrl, 'x-default': enUrl } },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: '1weapp',
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
  }
}

export async function buildTeamMetadata(slug: string, lang: Lang): Promise<Metadata> {
  const { enUrl, ruUrl, canonical } = alts(`/en/sports/team/${slug}`, `/ru/sports/team/${slug}`, lang)

  let name = slug
  try {
    const res = await getFootballTeam(slug, 1)
    name = res.team?.name || slug
  } catch {
    /* fallback */
  }

  const title =
    lang === 'ru'
      ? withBrandTitle(`${name} — профиль клуба, матчи и состав`, 70)
      : withBrandTitle(`${name} club profile, fixtures & squad`, 70)
  const description =
    lang === 'ru'
      ? `Профиль ${name}: недавние матчи, форма и снимок состава на 1weapp. Футбольные данные SportScore.`
      : `${name} club profile: recent matches, form and a squad snapshot on 1weapp. Football data via SportScore.`

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical, languages: { en: enUrl, ru: ruUrl, 'x-default': enUrl } },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: '1weapp',
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
  }
}
