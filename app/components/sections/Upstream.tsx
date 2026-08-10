import type { OSSContribution } from '../../lib/github'

// Merged PRs to other people's projects, pulled live from the profile README.
export function UpstreamSection({
  contributions,
}: {
  contributions: OSSContribution[]
}) {
  if (contributions.length === 0) return null

  return (
    <section className="section-row" aria-label="Upstream contributions">
      <h2 className="section-label">upstream</h2>
      <div className="section-content">
        {contributions.map((c) => (
          <div key={c.id} className="entry">
            <div className="entry-header">
              <span className="entry-title contrib-title">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.avatarUrl}
                  alt=""
                  width={18}
                  height={18}
                  className="contrib-avatar"
                />
                <a href={c.prUrl} target="_blank" rel="noopener noreferrer">
                  {c.repo.toLowerCase()}#{c.prNumber}
                </a>
                <span className="badge star-badge">★ {c.stars}</span>
              </span>
              <span className="entry-leader" aria-hidden="true" />
              <span className="entry-date">{c.date.toLowerCase()}</span>
            </div>
            <p className="entry-subtitle">{c.description.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
