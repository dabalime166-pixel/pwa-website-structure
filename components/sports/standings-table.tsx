import Link from 'next/link'
import type { Lang } from '@/lib/games'
import type { SportScoreStandingRow, SportScoreStandingTable } from '@/lib/sports-types'
import { tSports } from '@/lib/sports-i18n'

export function StandingsTable({
  lang,
  tables,
  limit,
}: {
  lang: Lang
  tables: SportScoreStandingTable[]
  limit?: number
}) {
  const t = tSports(lang)

  if (!tables.length) {
    return <p className="sports-empty">{t.noStandings}</p>
  }

  return (
    <div className="sports-standings">
      {tables.map((table, idx) => {
        const rows = typeof limit === 'number' ? table.rows.slice(0, limit) : table.rows
        return (
          <div key={`${table.group || 'main'}-${idx}`} className="sports-standings__block">
            {table.group ? (
              <h3 className="sports-standings__group">
                {t.group}: {table.group}
              </h3>
            ) : null}
            <div className="sports-standings__scroll">
              <table className="sports-standings__table">
                <thead>
                  <tr>
                    <th scope="col">{t.pos}</th>
                    <th scope="col">{t.teams}</th>
                    <th scope="col">{t.played}</th>
                    <th scope="col">{t.won}</th>
                    <th scope="col">{t.drawn}</th>
                    <th scope="col">{t.lost}</th>
                    <th scope="col">{t.gf}</th>
                    <th scope="col">{t.ga}</th>
                    <th scope="col">{t.gd}</th>
                    <th scope="col">{t.pts}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <StandingRow key={`${row.pos}-${row.team_slug}`} row={row} lang={lang} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StandingRow({ row, lang }: { row: SportScoreStandingRow; lang: Lang }) {
  const href = lang === 'en' ? `/en/sports/team/${row.team_slug}` : `/ru/sports/team/${row.team_slug}`
  return (
    <tr>
      <td className="sports-standings__pos">{row.pos}</td>
      <td>
        <Link href={href} className="sports-standings__team">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {row.team_logo ? <img src={row.team_logo} alt="" width={22} height={22} /> : null}
          <span>{row.team}</span>
        </Link>
      </td>
      <td>{row.p}</td>
      <td>{row.w}</td>
      <td>{row.d}</td>
      <td>{row.l}</td>
      <td>{row.gf}</td>
      <td>{row.ga}</td>
      <td>{row.gd}</td>
      <td className="sports-standings__pts">{row.pts}</td>
    </tr>
  )
}
