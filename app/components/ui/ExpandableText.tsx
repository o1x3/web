'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

interface ExpandableTextProps {
  short: string
  full: string
}

export function ExpandableText({ short, full }: ExpandableTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const fullRef = useRef<HTMLSpanElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [heights, setHeights] = useState({ short: 0, full: 0 })

  useEffect(() => {
    if (fullRef.current && containerRef.current) {
      // Measure heights after mount
      const fullHeight = fullRef.current.scrollHeight
      const lineHeight = parseFloat(getComputedStyle(containerRef.current).lineHeight)
      setHeights({ short: lineHeight, full: fullHeight })
    }
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setExpanded((prev) => !prev)
    }
  }, [])

  return (
    <span
      ref={containerRef}
      className="expandable-text"
      style={{
        maxHeight: expanded ? heights.full || '10em' : heights.short || '1.6em',
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <span className={`expandable-short ${expanded ? 'fade-out' : ''}`}>
        {short}
      </span>
      <span ref={fullRef} className={`expandable-full ${expanded ? '' : 'fade-out'}`}>
        {full}
      </span>
    </span>
  )
}
