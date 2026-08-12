import type { Lang } from '@/lib/games'

export type SportsLeague = {
  slug: string
  nameEn: string
  nameRu: string
  regionEn: string
  regionRu: string
  kind: 'league' | 'cup' | 'uefa'
  priority: number
}

/** Curated competitions with working SportScore standings widgets */
export const SPORTS_LEAGUES: SportsLeague[] = [
  {
    slug: 'english-premier-league',
    nameEn: 'English Premier League',
    nameRu: 'АПЛ',
    regionEn: 'England',
    regionRu: 'Англия',
    kind: 'league',
    priority: 1,
  },
  {
    slug: 'spanish-la-liga',
    nameEn: 'Spanish La Liga',
    nameRu: 'Ла Лига',
    regionEn: 'Spain',
    regionRu: 'Испания',
    kind: 'league',
    priority: 2,
  },
  {
    slug: 'italian-serie-a',
    nameEn: 'Italian Serie A',
    nameRu: 'Серия A',
    regionEn: 'Italy',
    regionRu: 'Италия',
    kind: 'league',
    priority: 3,
  },
  {
    slug: 'bundesliga',
    nameEn: 'Bundesliga',
    nameRu: 'Бундеслига',
    regionEn: 'Germany',
    regionRu: 'Германия',
    kind: 'league',
    priority: 4,
  },
  {
    slug: 'french-ligue-1',
    nameEn: 'French Ligue 1',
    nameRu: 'Лига 1',
    regionEn: 'France',
    regionRu: 'Франция',
    kind: 'league',
    priority: 5,
  },
  {
    slug: 'uefa-champions-league',
    nameEn: 'UEFA Champions League',
    nameRu: 'Лига чемпионов УЕФА',
    regionEn: 'Europe',
    regionRu: 'Европа',
    kind: 'uefa',
    priority: 6,
  },
  {
    slug: 'uefa-europa-league',
    nameEn: 'UEFA Europa League',
    nameRu: 'Лига Европы УЕФА',
    regionEn: 'Europe',
    regionRu: 'Европа',
    kind: 'uefa',
    priority: 7,
  },
  {
    slug: 'brazilian-serie-a',
    nameEn: 'Brazilian Serie A',
    nameRu: 'Бразильская Серия A',
    regionEn: 'Brazil',
    regionRu: 'Бразилия',
    kind: 'league',
    priority: 8,
  },
  {
    slug: 'scottish-premiership',
    nameEn: 'Scottish Premiership',
    nameRu: 'Шотландская Премьершип',
    regionEn: 'Scotland',
    regionRu: 'Шотландия',
    kind: 'league',
    priority: 9,
  },
  {
    slug: 'russian-premier-league',
    nameEn: 'Russian Premier League',
    nameRu: 'РПЛ',
    regionEn: 'Russia',
    regionRu: 'Россия',
    kind: 'league',
    priority: 10,
  },
  {
    slug: 'ukrainian-premier-league',
    nameEn: 'Ukrainian Premier League',
    nameRu: 'УПЛ',
    regionEn: 'Ukraine',
    regionRu: 'Украина',
    kind: 'league',
    priority: 11,
  },
  {
    slug: 'belgian-pro-league',
    nameEn: 'Belgian Pro League',
    nameRu: 'Бельгийская Про-лига',
    regionEn: 'Belgium',
    regionRu: 'Бельгия',
    kind: 'league',
    priority: 12,
  },
  {
    slug: 'austrian-bundesliga',
    nameEn: 'Austrian Bundesliga',
    nameRu: 'Австрийская Бундеслига',
    regionEn: 'Austria',
    regionRu: 'Австрия',
    kind: 'league',
    priority: 13,
  },
  {
    slug: 'danish-superliga',
    nameEn: 'Danish Superliga',
    nameRu: 'Датская Суперлига',
    regionEn: 'Denmark',
    regionRu: 'Дания',
    kind: 'league',
    priority: 14,
  },
  {
    slug: 'greek-super-league',
    nameEn: 'Greek Super League',
    nameRu: 'Греческая Суперлига',
    regionEn: 'Greece',
    regionRu: 'Греция',
    kind: 'league',
    priority: 15,
  },
  {
    slug: 'fa-cup',
    nameEn: 'FA Cup',
    nameRu: 'Кубок Англии',
    regionEn: 'England',
    regionRu: 'Англия',
    kind: 'cup',
    priority: 16,
  },
  {
    slug: 'copa-del-rey',
    nameEn: 'Copa del Rey',
    nameRu: 'Кубок Короля',
    regionEn: 'Spain',
    regionRu: 'Испания',
    kind: 'cup',
    priority: 17,
  },
  {
    slug: 'dfb-pokal',
    nameEn: 'DFB Pokal',
    nameRu: 'Кубок Германии',
    regionEn: 'Germany',
    regionRu: 'Германия',
    kind: 'cup',
    priority: 18,
  },
  {
    slug: 'uefa-nations-league',
    nameEn: 'UEFA Nations League',
    nameRu: 'Лига наций УЕФА',
    regionEn: 'Europe',
    regionRu: 'Европа',
    kind: 'uefa',
    priority: 19,
  },
  {
    slug: 'leagues-cup',
    nameEn: 'Leagues Cup',
    nameRu: 'Leagues Cup',
    regionEn: 'North America',
    regionRu: 'Северная Америка',
    kind: 'cup',
    priority: 20,
  },
]

export function getLeague(slug: string) {
  return SPORTS_LEAGUES.find((l) => l.slug === slug)
}

export function leagueName(league: SportsLeague, lang: Lang) {
  return lang === 'ru' ? league.nameRu : league.nameEn
}

export function leagueRegion(league: SportsLeague, lang: Lang) {
  return lang === 'ru' ? league.regionRu : league.regionEn
}
