// Utility functions

/**
 * Throttle function to limit execution frequency
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Safely open external link
 */
export function safeOpenLink(url: string): void {
  if (typeof window !== 'undefined') {
    try {
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.warn('Failed to open link:', error)
    }
  }
}

/**
 * Format array into string with separator
 */
export function formatList(items: readonly string[], separator = ' • '): string {
  return items.join(separator)
}
