// Utility functions

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
