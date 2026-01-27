'use client'

import { useEffect, useRef, useState } from 'react'
import { ThemeToggle } from './ui/ThemeToggle'
import { startUniqueFaviconRotation } from '../favicon-manager'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const faviconCleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    setMounted(true)

    // Initialize dynamic favicon rotation
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        faviconCleanupRef.current = startUniqueFaviconRotation()
      }, 100)

      return () => {
        clearTimeout(timer)
        faviconCleanupRef.current?.()
      }
    }
  }, [])

  // Prevent hydration mismatch - show minimal loading state
  if (!mounted) {
    return (
      <div className="container">
        <div style={{ minHeight: '100vh' }} />
      </div>
    )
  }

  return (
    <>
      <ThemeToggle />
      {children}
    </>
  )
}
