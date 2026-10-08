'use client'

import { useEffect } from 'react'
import { initializeThemeFavicon } from '../favicon-manager'

export function FaviconInit() {
  useEffect(() => {
    return initializeThemeFavicon()
  }, [])

  return null
}
