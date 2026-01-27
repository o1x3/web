'use client'

// Constants
const CANVAS_SIZE = 32
const FAVICON_ROTATION_INTERVAL = 30000 // 30 seconds

// Track active interval for cleanup
let activeInterval: NodeJS.Timeout | null = null

// Color palettes for fractals
const PALETTES = [
  // Fire
  ['#000000', '#330000', '#660000', '#990000', '#CC3300', '#FF6600', '#FFCC00', '#FFFFFF'],
  // Ocean
  ['#000022', '#001144', '#002266', '#003388', '#0055AA', '#0077CC', '#00AAFF', '#CCFFFF'],
  // Forest
  ['#001100', '#002200', '#003300', '#005500', '#007700', '#009900', '#00BB00', '#88FF88'],
  // Sunset
  ['#1a0533', '#330066', '#660066', '#990066', '#CC3366', '#FF6666', '#FFCC99', '#FFFFFF'],
  // Neon
  ['#000000', '#110033', '#220066', '#440099', '#6600CC', '#8800FF', '#AA00FF', '#FF00FF'],
  // Grayscale
  ['#000000', '#222222', '#444444', '#666666', '#888888', '#AAAAAA', '#CCCCCC', '#FFFFFF'],
  // Cosmic
  ['#0D0221', '#1A0533', '#2D1B4E', '#472D6C', '#6B3F8A', '#9B59B6', '#E74C3C', '#F1C40F'],
  // Aurora
  ['#001F3F', '#003366', '#006666', '#009966', '#00CC66', '#33FF99', '#99FFCC', '#CCFFFF'],
]

// Random utilities using crypto API
function getRandomByte(): number {
  const array = new Uint8Array(1)
  crypto.getRandomValues(array)
  return array[0]
}

function getRandomFloat(): number {
  return getRandomByte() / 255
}

function getRandomInt(max: number): number {
  return Math.floor(getRandomFloat() * max)
}

function getRandomPalette(): string[] {
  return PALETTES[getRandomInt(PALETTES.length)]
}

function getPaletteColor(palette: string[], value: number, maxValue: number): string {
  const normalized = Math.min(value / maxValue, 1)
  const index = Math.floor(normalized * (palette.length - 1))
  return palette[index]
}

// Mandelbrot set fractal
function drawMandelbrot(ctx: CanvasRenderingContext2D, palette: string[]): void {
  const maxIter = 50
  // Random zoom and pan for variety
  const zoom = 0.8 + getRandomFloat() * 2.5
  const panX = -0.5 + (getRandomFloat() - 0.5) * 1.5
  const panY = (getRandomFloat() - 0.5) * 1.5

  for (let px = 0; px < CANVAS_SIZE; px++) {
    for (let py = 0; py < CANVAS_SIZE; py++) {
      const x0 = (px - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4) / zoom + panX
      const y0 = (py - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4) / zoom + panY

      let x = 0
      let y = 0
      let iter = 0

      while (x * x + y * y <= 4 && iter < maxIter) {
        const xNew = x * x - y * y + x0
        y = 2 * x * y + y0
        x = xNew
        iter++
      }

      ctx.fillStyle = iter === maxIter ? '#000000' : getPaletteColor(palette, iter, maxIter)
      ctx.fillRect(px, py, 1, 1)
    }
  }
}

// Julia set fractal
function drawJulia(ctx: CanvasRenderingContext2D, palette: string[]): void {
  const maxIter = 50
  // Random c parameter for different Julia sets
  const cReal = -0.8 + getRandomFloat() * 1.2
  const cImag = -0.3 + getRandomFloat() * 0.6
  const zoom = 1 + getRandomFloat() * 1.5

  for (let px = 0; px < CANVAS_SIZE; px++) {
    for (let py = 0; py < CANVAS_SIZE; py++) {
      let x = (px - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4) / zoom
      let y = (py - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4) / zoom
      let iter = 0

      while (x * x + y * y <= 4 && iter < maxIter) {
        const xNew = x * x - y * y + cReal
        y = 2 * x * y + cImag
        x = xNew
        iter++
      }

      ctx.fillStyle = iter === maxIter ? '#000000' : getPaletteColor(palette, iter, maxIter)
      ctx.fillRect(px, py, 1, 1)
    }
  }
}

// Sierpinski triangle fractal
function drawSierpinski(ctx: CanvasRenderingContext2D, palette: string[]): void {
  // Fill background
  ctx.fillStyle = palette[0]
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  const triangleColor = palette[palette.length - 2]
  const rotation = getRandomFloat() * Math.PI * 2

  function drawTriangle(x: number, y: number, size: number, depth: number): void {
    if (depth === 0 || size < 2) {
      ctx.fillStyle = triangleColor
      ctx.beginPath()

      // Rotate the triangle
      const cos = Math.cos(rotation)
      const sin = Math.sin(rotation)
      const cx = CANVAS_SIZE / 2
      const cy = CANVAS_SIZE / 2

      const points = [
        [x, y - size * 0.866],
        [x - size / 2, y + size * 0.433],
        [x + size / 2, y + size * 0.433]
      ].map(([px, py]) => {
        const dx = px - cx
        const dy = py - cy
        return [
          cx + dx * cos - dy * sin,
          cy + dx * sin + dy * cos
        ]
      })

      ctx.moveTo(points[0][0], points[0][1])
      ctx.lineTo(points[1][0], points[1][1])
      ctx.lineTo(points[2][0], points[2][1])
      ctx.closePath()
      ctx.fill()
      return
    }

    const newSize = size / 2
    const h = size * 0.433

    // Draw 3 sub-triangles
    drawTriangle(x, y - h / 2, newSize, depth - 1)
    drawTriangle(x - newSize / 2, y + h / 2, newSize, depth - 1)
    drawTriangle(x + newSize / 2, y + h / 2, newSize, depth - 1)
  }

  drawTriangle(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE * 0.9, 4 + getRandomInt(2))
}

// Koch snowflake fractal
function drawKoch(ctx: CanvasRenderingContext2D, palette: string[]): void {
  ctx.fillStyle = palette[0]
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  ctx.strokeStyle = palette[palette.length - 1]
  ctx.lineWidth = 1

  function kochLine(x1: number, y1: number, x2: number, y2: number, depth: number): void {
    if (depth === 0) {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      return
    }

    const dx = x2 - x1
    const dy = y2 - y1

    const x3 = x1 + dx / 3
    const y3 = y1 + dy / 3
    const x5 = x1 + 2 * dx / 3
    const y5 = y1 + 2 * dy / 3

    // Peak of the triangle
    const angle = Math.atan2(dy, dx) - Math.PI / 3
    const len = Math.sqrt(dx * dx + dy * dy) / 3
    const x4 = x3 + Math.cos(angle) * len
    const y4 = y3 + Math.sin(angle) * len

    kochLine(x1, y1, x3, y3, depth - 1)
    kochLine(x3, y3, x4, y4, depth - 1)
    kochLine(x4, y4, x5, y5, depth - 1)
    kochLine(x5, y5, x2, y2, depth - 1)
  }

  const size = CANVAS_SIZE * 0.8
  const cx = CANVAS_SIZE / 2
  const cy = CANVAS_SIZE / 2
  const h = size * Math.sqrt(3) / 2

  // Draw snowflake (3 Koch curves forming a triangle)
  const depth = 3 + getRandomInt(2)
  const rotation = getRandomFloat() * Math.PI * 2

  const points = [
    [cx, cy - h * 0.6],
    [cx - size / 2, cy + h * 0.4],
    [cx + size / 2, cy + h * 0.4]
  ].map(([x, y]) => {
    const dx = x - cx
    const dy = y - cy
    const cos = Math.cos(rotation)
    const sin = Math.sin(rotation)
    return [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos]
  })

  kochLine(points[0][0], points[0][1], points[1][0], points[1][1], depth)
  kochLine(points[1][0], points[1][1], points[2][0], points[2][1], depth)
  kochLine(points[2][0], points[2][1], points[0][0], points[0][1], depth)
}

// Barnsley fern fractal (IFS)
function drawFern(ctx: CanvasRenderingContext2D, palette: string[]): void {
  ctx.fillStyle = palette[0]
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  let x = 0
  let y = 0
  const iterations = 10000
  const rotation = getRandomFloat() * Math.PI * 2
  const cos = Math.cos(rotation)
  const sin = Math.sin(rotation)

  for (let i = 0; i < iterations; i++) {
    const r = getRandomFloat()
    let xNew: number, yNew: number

    if (r < 0.01) {
      xNew = 0
      yNew = 0.16 * y
    } else if (r < 0.86) {
      xNew = 0.85 * x + 0.04 * y
      yNew = -0.04 * x + 0.85 * y + 1.6
    } else if (r < 0.93) {
      xNew = 0.2 * x - 0.26 * y
      yNew = 0.23 * x + 0.22 * y + 1.6
    } else {
      xNew = -0.15 * x + 0.28 * y
      yNew = 0.26 * x + 0.24 * y + 0.44
    }

    x = xNew
    y = yNew

    // Map to canvas coordinates with rotation
    const plotX = (x + 2.5) * 5
    const plotY = 32 - y * 3

    const dx = plotX - CANVAS_SIZE / 2
    const dy = plotY - CANVAS_SIZE / 2
    const rotatedX = CANVAS_SIZE / 2 + dx * cos - dy * sin
    const rotatedY = CANVAS_SIZE / 2 + dx * sin + dy * cos

    if (rotatedX >= 0 && rotatedX < CANVAS_SIZE && rotatedY >= 0 && rotatedY < CANVAS_SIZE) {
      const colorIdx = Math.min(Math.floor((y / 10) * palette.length), palette.length - 1)
      ctx.fillStyle = palette[Math.max(1, colorIdx)]
      ctx.fillRect(Math.floor(rotatedX), Math.floor(rotatedY), 1, 1)
    }
  }
}

// Dragon curve fractal (L-system)
function drawDragon(ctx: CanvasRenderingContext2D, palette: string[]): void {
  ctx.fillStyle = palette[0]
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  // Generate dragon curve path
  let path = 'FX'
  const iterations = 10

  for (let i = 0; i < iterations; i++) {
    let newPath = ''
    for (const char of path) {
      if (char === 'X') newPath += 'X+YF+'
      else if (char === 'Y') newPath += '-FX-Y'
      else newPath += char
    }
    path = newPath
  }

  // Draw the path
  let x = CANVAS_SIZE * 0.3
  let y = CANVAS_SIZE * 0.5
  let angle = getRandomFloat() * Math.PI * 2
  const stepSize = 0.8

  ctx.strokeStyle = palette[palette.length - 1]
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x, y)

  let colorStep = 0
  const totalSteps = path.split('F').length - 1

  for (const char of path) {
    if (char === 'F') {
      x += Math.cos(angle) * stepSize
      y += Math.sin(angle) * stepSize

      const colorIdx = Math.floor((colorStep / totalSteps) * (palette.length - 1))
      ctx.strokeStyle = palette[Math.min(colorIdx + 1, palette.length - 1)]
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
      colorStep++
    } else if (char === '+') {
      angle += Math.PI / 2
    } else if (char === '-') {
      angle -= Math.PI / 2
    }
  }
}

// Burning ship fractal (variation of Mandelbrot)
function drawBurningShip(ctx: CanvasRenderingContext2D, palette: string[]): void {
  const maxIter = 50
  const zoom = 0.5 + getRandomFloat() * 2
  const panX = -0.5 + (getRandomFloat() - 0.5) * 0.5
  const panY = -0.5 + (getRandomFloat() - 0.5) * 0.5

  for (let px = 0; px < CANVAS_SIZE; px++) {
    for (let py = 0; py < CANVAS_SIZE; py++) {
      const x0 = (px - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4) / zoom + panX
      const y0 = (py - CANVAS_SIZE / 2) / (CANVAS_SIZE / 4) / zoom + panY

      let x = 0
      let y = 0
      let iter = 0

      while (x * x + y * y <= 4 && iter < maxIter) {
        const xNew = x * x - y * y + x0
        y = Math.abs(2 * x * y) + y0
        x = Math.abs(xNew)
        iter++
      }

      ctx.fillStyle = iter === maxIter ? '#000000' : getPaletteColor(palette, iter, maxIter)
      ctx.fillRect(px, py, 1, 1)
    }
  }
}

// Main fractal generator
export function createUniqueFavicon(): void {
  if (typeof window === 'undefined') return

  try {
    const canvas = document.createElement('canvas')
    canvas.width = CANVAS_SIZE
    canvas.height = CANVAS_SIZE
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      console.warn('Failed to get canvas context for favicon')
      return
    }

    const palette = getRandomPalette()
    const fractalType = getRandomInt(7)

    switch (fractalType) {
      case 0:
        drawMandelbrot(ctx, palette)
        break
      case 1:
        drawJulia(ctx, palette)
        break
      case 2:
        drawSierpinski(ctx, palette)
        break
      case 3:
        drawKoch(ctx, palette)
        break
      case 4:
        drawFern(ctx, palette)
        break
      case 5:
        drawDragon(ctx, palette)
        break
      case 6:
        drawBurningShip(ctx, palette)
        break
    }

    // Convert to favicon
    const dataURL = canvas.toDataURL('image/png')

    // Update favicon
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      favicon.type = 'image/png'
      document.head.appendChild(favicon)
    }
    favicon.href = dataURL

    // Also update apple-touch-icon for mobile
    let appleFavicon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement | null
    if (!appleFavicon) {
      appleFavicon = document.createElement('link')
      appleFavicon.rel = 'apple-touch-icon'
      appleFavicon.sizes = '180x180'
      document.head.appendChild(appleFavicon)
    }
    appleFavicon.href = dataURL
  } catch (error) {
    console.warn('Error generating fractal favicon:', error)
  }
}

// Optimized favicon generation using requestIdleCallback for better performance
function generateFaviconInIdle(deadline?: IdleDeadline): void {
  // Only generate if we have sufficient idle time (at least 10ms)
  if (deadline && deadline.timeRemaining() < 10) {
    requestIdleCallback(generateFaviconInIdle)
    return
  }
  createUniqueFavicon()
}

// Change favicon every 30 seconds with idle-time generation for max performance
export function startUniqueFaviconRotation(): () => void {
  if (typeof window === 'undefined') return () => {}

  // Clear any existing interval
  if (activeInterval) {
    clearInterval(activeInterval)
  }

  // Initial favicon generation during idle time
  if ('requestIdleCallback' in window) {
    requestIdleCallback(generateFaviconInIdle)
  } else {
    createUniqueFavicon()
  }

  activeInterval = setInterval(() => {
    // Schedule during browser idle time for zero jank
    if ('requestIdleCallback' in window) {
      requestIdleCallback(generateFaviconInIdle)
    } else {
      createUniqueFavicon()
    }
  }, FAVICON_ROTATION_INTERVAL)

  // Return cleanup function
  return () => {
    if (activeInterval) {
      clearInterval(activeInterval)
      activeInterval = null
    }
  }
}
