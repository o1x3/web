'use client'

import { useRef, useState, useEffect } from 'react'

interface ExpandableTextProps {
  short: string
  full: string
}

export function ExpandableText({ short, full }: ExpandableTextProps) {
  const shortRef = useRef<HTMLSpanElement>(null)
  const fullRef = useRef<HTMLSpanElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [heights, setHeights] = useState({ short: 0, full: 0 })

  useEffect(() => {
    // Measure real rendered heights so wrapped short text isn't clipped.
    // ResizeObserver catches wrapping changes that window resize events miss.
    const measure = () => {
      if (shortRef.current && fullRef.current) {
        const short = shortRef.current.scrollHeight
        const full = fullRef.current.scrollHeight
        setHeights((prev) =>
          prev.short === short && prev.full === full ? prev : { short, full }
        )
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (shortRef.current) observer.observe(shortRef.current)
    if (fullRef.current) observer.observe(fullRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <button
      type="button"
      className="expandable-text"
      style={{
        maxHeight: expanded ? heights.full || '10em' : heights.short || '1.6em',
      }}
      onClick={() => setExpanded((prev) => !prev)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      aria-expanded={expanded}
    >
      <span ref={shortRef} className={`expandable-short ${expanded ? 'fade-out' : ''}`} aria-hidden={expanded}>
        {short}
      </span>
      <span ref={fullRef} className={`expandable-full ${expanded ? '' : 'fade-out'}`} aria-hidden={!expanded}>
        {full}
      </span>
    </button>
  )
}
