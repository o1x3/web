'use client'

import { useEffect, useState } from 'react'
import type { ContributionCalendar } from '../../lib/contributions'
import { DotField } from './DotField'

// Re-poll while the tab is visible; hidden tabs stay quiet and get a fresh
// pull the moment they come back.
const POLL_MS = 180_000

export function LiveDotField({ initial }: { initial: ContributionCalendar }) {
  const [calendar, setCalendar] = useState(initial)

  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setInterval> | null = null

    const refresh = async () => {
      try {
        const res = await fetch('/api/contributions')
        if (!res.ok) return
        const next = (await res.json()) as ContributionCalendar
        if (!cancelled && next?.days?.length) setCalendar(next)
      } catch {
        // keep showing the last good calendar
      }
    }

    const stop = () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    const start = () => {
      stop()
      timer = setInterval(refresh, POLL_MS)
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        refresh()
        start()
      } else {
        stop()
      }
    }

    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelled = true
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <DotField calendar={calendar} />
}
