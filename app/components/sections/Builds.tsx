import Link from 'next/link'
import { BUILDS, type Build } from '../../data'

function BuildEntry({ build }: { build: Build }) {
  return (
    <div className="entry">
      <div className="entry-header">
        <span className="entry-title">
          {build.url ? (
            <a href={build.url} target="_blank" rel="noopener noreferrer">
              {build.title}
            </a>
          ) : (
            build.title
          )}
          {build.badges.map((badge) =>
            badge.url ? (
              <a
                key={badge.label}
                href={badge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="badge"
              >
                {badge.label}
              </a>
            ) : (
              <span
                key={badge.label}
                className={`badge${badge.label === 'WIP' ? ' wip-badge' : ''}`}
              >
                {badge.label}
              </span>
            )
          )}
        </span>
        <span className="entry-leader" aria-hidden="true" />
        <span className="entry-date">{build.year}</span>
      </div>
      <p className="entry-hook">{build.description}</p>
      {build.detail && <p className="entry-detail">{build.detail}</p>}
    </div>
  )
}

export function FeaturedBuildsSection() {
  const featured = BUILDS.filter((b) => b.featured)

  return (
    <section className="section-row" aria-label="Featured builds">
      <div>
        <h2 className="section-label">Builds</h2>
        <Link href="/stuff" className="section-label-btn">
          everything →
        </Link>
      </div>
      <div className="section-content">
        {featured.map((build) => (
          <BuildEntry key={build.id} build={build} />
        ))}
      </div>
    </section>
  )
}

const GROUPS: Build['group'][] = ['tools', 'web & apps', 'odd ones']

export function AllBuildsSections() {
  return (
    <>
      {GROUPS.map((group) => {
        const builds = BUILDS.filter((b) => b.group === group)
        return (
          <section key={group} className="section-row" aria-label={group}>
            <h2 className="section-label">
              {group}{' '}
              <span className="section-count">⠿ {builds.length}</span>
            </h2>
            <div className="section-content">
              {builds.map((build) => (
                <BuildEntry key={build.id} build={build} />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
