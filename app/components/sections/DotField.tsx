import type { ContributionCalendar } from '../../lib/contributions'

// A year of commits as a field of dots: the same dots as the favicon, just
// more of them. Rendered server-side as plain SVG circles.

const DOT_RADIUS = 1.9
const CELL = 8.4
const ROWS = 7

function weekday(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay()
}

export function DotField({ calendar }: { calendar: ContributionCalendar }) {
  const { days, total, accounts } = calendar

  // Column per week; first column may be partial.
  let col = 0
  const dots = days.map((day, i) => {
    const row = weekday(day.date)
    if (i > 0 && row === 0) col++
    return { ...day, row, col }
  })
  const cols = col + 1

  const width = cols * CELL
  const height = ROWS * CELL

  return (
    <div className="dotfield-wrap">
      <div className="dotfield-scroll">
        <svg
          className="dotfield"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${total} contributions in the last year across ${accounts.join(' and ')}`}
        >
          {dots.map((d) => (
            <circle
              key={d.date}
              cx={d.col * CELL + CELL / 2}
              cy={d.row * CELL + CELL / 2}
              r={d.level === 0 ? DOT_RADIUS * 0.72 : DOT_RADIUS}
              fill={`var(--dot-${d.level})`}
            >
              <title>{`${d.count} on ${d.date}`}</title>
            </circle>
          ))}
        </svg>
      </div>
      <p className="dotfield-caption">
        {total.toLocaleString()} contributions in the last year ·{' '}
        {accounts.map((a, i) => (
          <span key={a}>
            {i > 0 && ' + '}
            <a href={`https://github.com/${a}`} target="_blank" rel="noopener noreferrer">
              {a}
            </a>
          </span>
        ))}
      </p>
    </div>
  )
}
