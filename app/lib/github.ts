export interface OSSContribution {
  id: string
  repo: string
  prNumber: string
  prUrl: string
  description: string
  date: string
  avatarUrl: string
}

const README_URL =
  'https://raw.githubusercontent.com/o1x3/o1x3/refs/heads/main/README.md'

// Each PR line looks like:
// - <img src="https://github.com/owner.png" width="18" /> [owner/repo#N](url) — description · Mon YYYY
const PR_REGEX =
  /-\s*<img\s+src="([^"]+)"[^/]*\/>\s*\[([^\]]+)\]\(([^)]+)\)\s*—\s*(.+?)\s*·\s*(.+)$/

export async function fetchOSSContributions(): Promise<OSSContribution[]> {
  try {
    const res = await fetch(README_URL, { next: { revalidate: 0 } })
    if (!res.ok) return []
    const text = await res.text()

    const contributions: OSSContribution[] = []

    for (const line of text.split('\n')) {
      const match = line.match(PR_REGEX)
      if (!match) continue

      const [, avatarUrl, repoRef, prUrl, description, date] = match
      const [repo, prNumber] = repoRef.split('#')

      contributions.push({
        id: `oss-${repo}-${prNumber}`,
        repo,
        prNumber,
        prUrl,
        description: description.replace(/`/g, '').trim(),
        date: date.trim(),
        avatarUrl,
      })
    }

    return contributions
  } catch {
    return []
  }
}
