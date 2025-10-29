// Custom React hooks

import { useState, useEffect } from 'react'
import { throttle } from './utils'
import { BREAKPOINTS } from './data'

/**
 * Hook to detect mobile viewport with throttled resize listener
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE)
    }

    // Initial check
    checkMobile()

    // Throttled resize handler (max once per 150ms)
    const throttledCheck = throttle(checkMobile, 150)
    window.addEventListener('resize', throttledCheck, { passive: true })

    return () => {
      window.removeEventListener('resize', throttledCheck)
    }
  }, [])

  return isMobile
}
