// Fetches GitHub's public contribution calendars and merges them across
// accounts by summing per-day counts, then re-bucketing intensity levels.

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionCalendar {
  days: ContributionDay[]
  total: number
  accounts: string[]
}

const DAY_TAG_REGEX = /<td[^>]*class="ContributionCalendar-day"[^>]*>|<td[^>]*ContributionCalendar-day[^>]*>/g
const TOOLTIP_REGEX =
  /<tool-tip[^>]*for="(contribution-day-component-[\d-]+)"[^>]*>\s*(No|\d+) contributions?/g

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`))
  return m ? m[1] : null
}

async function fetchCalendar(user: string): Promise<Map<string, number> | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      next: { revalidate: 3600 },
      headers: { 'user-agent': 'o1x3.com' },
    })
    if (!res.ok) return null
    const html = await res.text()

    const countsById = new Map<string, number>()
    for (const m of html.matchAll(TOOLTIP_REGEX)) {
      countsById.set(m[1], m[2] === 'No' ? 0 : Number(m[2]))
    }

    const byDate = new Map<string, number>()
    for (const m of html.matchAll(DAY_TAG_REGEX)) {
      const tag = m[0]
      const date = attr(tag, 'data-date')
      const id = attr(tag, 'id')
      if (!date || !id) continue
      byDate.set(date, countsById.get(id) ?? 0)
    }

    return byDate.size > 0 ? byDate : null
  } catch {
    return null
  }
}

// Quartile thresholds over nonzero days, so one monster day doesn't flatten
// the rest of the year to level 1.
function levelThresholds(counts: number[]): [number, number, number] {
  const nonzero = counts.filter((c) => c > 0).sort((a, b) => a - b)
  if (nonzero.length === 0) return [0, 0, 0]
  const at = (q: number) => nonzero[Math.min(nonzero.length - 1, Math.floor(q * nonzero.length))]
  return [at(0.25), at(0.5), at(0.75)]
}

function toLevel(
  count: number,
  [q1, q2, q3]: [number, number, number]
): ContributionDay['level'] {
  if (count === 0) return 0
  if (count <= q1) return 1
  if (count <= q2) return 2
  if (count <= q3) return 3
  return 4
}

export async function fetchMergedContributions(
  users: readonly string[]
): Promise<ContributionCalendar | null> {
  const results = await Promise.all(
    users.map(async (user) => ({ user, cal: await fetchCalendar(user) }))
  )
  // Only credit accounts whose calendar actually loaded, so the caption
  // never claims data that isn't in the merge.
  const valid = results.filter(
    (r): r is { user: string; cal: Map<string, number> } => r.cal !== null
  )
  if (valid.length === 0) return null

  const merged = new Map<string, number>()
  for (const { cal } of valid) {
    for (const [date, count] of cal) {
      merged.set(date, (merged.get(date) ?? 0) + count)
    }
  }

  const dates = [...merged.keys()].sort()
  const thresholds = levelThresholds([...merged.values()])
  const days: ContributionDay[] = dates.map((date) => {
    const count = merged.get(date) ?? 0
    return { date, count, level: toLevel(count, thresholds) }
  })

  return {
    days,
    total: days.reduce((sum, d) => sum + d.count, 0),
    accounts: valid.map((r) => r.user),
  }
}
