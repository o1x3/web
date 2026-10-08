/** Keep the exported dithered mark in sync with the selected site theme. */
export function initializeThemeFavicon(): () => void {
  if (typeof document === 'undefined') return () => {}

  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = 'image/svg+xml'
  link.sizes.value = 'any'

  const update = () => {
    link.href = document.documentElement.classList.contains('dark')
      ? '/brand/favicon-dark.svg'
      : '/brand/favicon-light.svg'
  }

  update()
  const observer = new MutationObserver(update)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}
