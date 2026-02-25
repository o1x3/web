'use client'

import { useEffect, useRef } from 'react'
import { startUniqueFaviconRotation } from '../favicon-manager'

export function FaviconInit() {
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      cleanupRef.current = startUniqueFaviconRotation()
    }, 100)

    return () => {
      clearTimeout(timer)
      cleanupRef.current?.()
    }
  }, [])

  return null
}
