import Link from 'next/link'
import type { Lang } from '@/lib/games'
import type { SportScoreMatch } from '@/lib/sports-types'
import { isLiveStatus, matchSlugFromUrl } from '@/lib/sports-types'
import { tSports } from '@/lib/sports-i18n'

function scoreText(v: string | null | undefined) {
  if (v === null || v === undefined || v === '') return '–'
  return String(v)
}

function formatKickoff(iso: string, lang: Lang) {
  try {
    return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function MatchCard({
  match,
  lang,
}: {
  match: SportScoreMatch
  lang: Lang
}) {
  const t = tSports(lang)
  const live = isLiveStatus(match.status)
  const slug = matchSlugFromUrl(match.url)
  const href = lang === 'en' ? `/en/sports/match/${slug}` : `/ru/sports/match/${slug}`
  const statusLabel =
    live && match.live_minute != null
      ? `${match.status_text || 'Live'} ${match.live_minute}'`
      : match.status_text || match.status

  return (
    <Link href={href} className="sports-match-card">
      <div className="sports-match-card__meta">
        <span className="sports-match-card__league">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {match.competition_logo ? (
            <img src={match.competition_logo} alt="" width={16} height={16} />
          ) : null}
          {match.competition}
        </span>
        <span className={`sports-match-card__status${live ? ' is-live' : ''}`}>{statusLabel}</span>
      </div>

      <div className="sports-match-card__row">
        <div className="sports-match-card__team">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={match.home_logo} alt="" width={28} height={28} />
          <span>{match.home}</span>
        </div>
        <div
          className="sports-match-card__score"
          aria-label={`${t.home} ${scoreText(match.home_score)} ${t.away} ${scoreText(match.away_score)}`}
        >
          <strong>{scoreText(match.home_score)}</strong>
          <span>:</span>
          <strong>{scoreText(match.away_score)}</strong>
        </div>
        <div className="sports-match-card__team sports-match-card__team--away">
          <span>{match.away}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={match.away_logo} alt="" width={28} height={28} />
        </div>
      </div>

      <div className="sports-match-card__foot">
        <span>{formatKickoff(match.time, lang)}</span>
      </div>
    </Link>
  )
}
