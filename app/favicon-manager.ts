// Braille spinners as dot-bitmasks (U+2800 + mask). Transitions between
// spinners pick the next start frame to maximize shared dots with the
// previous frame, so there's always at least one dot in common.

type Spinner = {
  name: string
  frames: number[]
  interval: number
}

const CANVAS_SIZE = 32
const CYCLES_PER_SPINNER = 3

// breathe trimmed: drops the empty (0x00) frames at start/end so transitions
// never have a zero prevMask (which would force a no-overlap handoff).
const SPINNERS: Spinner[] = [
  { name: 'classic', frames: parseGlyphs('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'), interval: 80 },
  { name: 'fill', frames: parseGlyphs('⣾⣽⣻⢿⡿⣟⣯⣷'), interval: 80 },
  { name: 'wave', frames: parseGlyphs('⠈⠉⠋⠓⠒⠐⠐⠒⠓⠋⠉⠈'), interval: 80 },
  { name: 'dots3', frames: parseGlyphs('⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓'), interval: 80 },
  { name: 'breathe', frames: parseGlyphs('⠂⠌⡑⢕⢝⣫⣟⣿⣟⣫⢝⢕⡑⠌⠂'), interval: 100 },
  { name: 'orbit', frames: parseGlyphs('⠃⠉⠘⠰⢠⣀⡄⠆'), interval: 90 },
  { name: 'sweep', frames: parseGlyphs('⢄⢂⢁⡁⡈⡐⡠'), interval: 80 },
  { name: 'dots11', frames: parseGlyphs('⠁⠂⠄⡀⢀⠠⠐⠈'), interval: 100 },
]

function parseGlyphs(s: string): number[] {
  return Array.from(s).map((g) => (g.codePointAt(0) ?? 0x2800) - 0x2800)
}

function maskToGlyph(mask: number): string {
  return String.fromCodePoint(0x2800 + mask)
}

function popcount(n: number): number {
  let c = 0
  let v = n
  while (v) {
    c += v & 1
    v >>>= 1
  }
  return c
}

function findBestStart(frames: number[], prevMask: number): number {
  let bestIdx = 0
  let bestOverlap = -1
  for (let i = 0; i < frames.length; i++) {
    const overlap = popcount(frames[i] & prevMask)
    if (overlap > bestOverlap) {
      bestOverlap = overlap
      bestIdx = i
    }
  }
  return bestIdx
}

let timer: ReturnType<typeof setTimeout> | null = null
let themeMedia: MediaQueryList | null = null
let themeListener: (() => void) | null = null
let classObserver: MutationObserver | null = null
let originalHref: string | null = null

let spinnerIdx = 0
let frameIdx = 0
let cyclesElapsed = 0
let prevMask = 0

const cache = new Map<number, string>()
let cacheColor = ''
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null

function ensureCanvas(): boolean {
  if (ctx) return true
  canvas = document.createElement('canvas')
  canvas.width = CANVAS_SIZE
  canvas.height = CANVAS_SIZE
  ctx = canvas.getContext('2d')
  return !!ctx
}

function renderMask(mask: number): string {
  if (!ctx) return ''
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  ctx.fillStyle = cacheColor
  ctx.font = '28px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(maskToGlyph(mask), CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 1)
  return canvas!.toDataURL('image/png')
}

function currentColor(): string {
  const isDark =
    document.documentElement.classList.contains('dark') ||
    (themeMedia?.matches ?? false)
  return isDark ? '#e5e5e5' : '#1a1a1a'
}

function refreshCache(): void {
  const color = currentColor()
  if (color === cacheColor && cache.size > 0) return
  cacheColor = color
  cache.clear()
  if (!ensureCanvas()) return
  for (const sp of SPINNERS) {
    for (const mask of sp.frames) {
      if (!cache.has(mask)) cache.set(mask, renderMask(mask))
    }
  }
}

function getFaviconLink(): HTMLLinkElement {
  let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    document.head.appendChild(link)
  }
  return link
}

function setFavicon(href: string): void {
  getFaviconLink().href = href
}

function tick(): void {
  const sp = SPINNERS[spinnerIdx]
  const mask = sp.frames[frameIdx]
  const url = cache.get(mask)
  if (url) setFavicon(url)
  prevMask = mask

  frameIdx++
  if (frameIdx >= sp.frames.length) {
    frameIdx = 0
    cyclesElapsed++
    if (cyclesElapsed >= CYCLES_PER_SPINNER) {
      cyclesElapsed = 0
      spinnerIdx = (spinnerIdx + 1) % SPINNERS.length
      frameIdx = findBestStart(SPINNERS[spinnerIdx].frames, prevMask)
    }
  }

  timer = setTimeout(tick, SPINNERS[spinnerIdx].interval)
}

export function startUniqueFaviconRotation(): () => void {
  if (typeof window === 'undefined') return () => {}

  if (timer) clearTimeout(timer)

  // Stash the static icon href so we can restore it if this stops.
  const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null
  originalHref = link?.href ?? null

  themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
  themeListener = () => refreshCache()
  themeMedia.addEventListener('change', themeListener)

  classObserver = new MutationObserver(refreshCache)
  classObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  spinnerIdx = 0
  frameIdx = 0
  cyclesElapsed = 0
  prevMask = 0

  refreshCache()
  tick()

  return () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (themeMedia && themeListener) {
      themeMedia.removeEventListener('change', themeListener)
      themeMedia = null
      themeListener = null
    }
    if (classObserver) {
      classObserver.disconnect()
      classObserver = null
    }
    if (originalHref) {
      getFaviconLink().href = originalHref
    }
  }
}
