'use client'

import { useState } from 'react'
import { ExpandableText } from '../ui/ExpandableText'

const VISIBLE = 4

export function ExperienceBullets({
  items,
}: {
  items: readonly { short: string; full: string }[]
}) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? items : items.slice(0, VISIBLE)
  const hidden = items.length - VISIBLE

  return (
    <>
      <ul className="bullet-list">
        {visible.map((item) => (
          <li key={item.short}>
            <ExpandableText short={item.short} full={item.full} />
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          className="oss-hint"
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
        >
          {showAll ? 'show fewer' : `+ ${hidden} more`}
        </button>
      )}
    </>
  )
}
