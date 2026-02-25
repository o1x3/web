export interface OSSContribution {
  id: string
  repo: string
  prNumber: string
  prUrl: string
  description: string
  date: string
  avatarUrl: string
  stars: string
}

const README_URL =
  'https://raw.githubusercontent.com/o1x3/o1x3/refs/heads/main/README.md'

// Each PR line looks like:
// - <img ...> [owner/repo#N](url) — description · Mon YYYY <!-- ★ 12345 -->
const PR_REGEX =
  /-\s*<img\s+src="([^"]+)"[^/]*\/>\s*\[([^\]]+)\]\(([^)]+)\)\s*—\s*(.+?)\s*·\s*(.+?)\s*<!--\s*★\s*(\d+)\s*-->/

export async function fetchOSSContributions(): Promise<OSSContribution[]> {
  try {
    const res = await fetch(README_URL, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const text = await res.text()

    const contributions: OSSContribution[] = []

    for (const line of text.split('\n')) {
      const match = line.match(PR_REGEX)
      if (!match) continue

      const [, avatarUrl, repoRef, prUrl, description, date, starsRaw] = match
      const [repo, prNumber] = repoRef.split('#')

      contributions.push({
        id: `oss-${repo}-${prNumber}`,
        repo,
        prNumber,
        prUrl,
        description: description.replace(/`/g, '').trim(),
        date: date.trim(),
        avatarUrl,
        stars: Number(starsRaw) >= 1000
          ? `${(Number(starsRaw) / 1000).toFixed(1).replace(/\.0$/, '')}k`
          : starsRaw,
      })
    }

    return contributions
  } catch {
    return []
  }
}
