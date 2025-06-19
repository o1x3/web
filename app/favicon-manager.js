'use client'

// UUID-inspired unique circular favicon generator - never the same twice
export function createUniqueFavicon() {
  if (typeof window === 'undefined') return

  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')
  
  // Generate truly unique parameters using crypto API for maximum entropy
  const getRandomByte = () => {
    const array = new Uint8Array(1)
    crypto.getRandomValues(array)
    return array[0]
  }
  
  const getRandomFloat = () => getRandomByte() / 255
  const getRandomInt = (max) => Math.floor(getRandomFloat() * max)
  const getRandomHex = () => {
    const r = getRandomByte().toString(16).padStart(2, '0')
    const g = getRandomByte().toString(16).padStart(2, '0') 
    const b = getRandomByte().toString(16).padStart(2, '0')
    return `#${r}${g}${b}`
  }
  
  const center = 16
  const radius = 15
  
  // Clip to circular shape
  ctx.beginPath()
  ctx.arc(center, center, radius, 0, 2 * Math.PI)
  ctx.clip()
  
  // Generate unique circular background
  const bgType = getRandomInt(4)
  switch(bgType) {
    case 0: // Solid color
      ctx.fillStyle = getRandomHex()
      ctx.fillRect(0, 0, 32, 32)
      break
    case 1: // Linear gradient across circle
      const angle = getRandomFloat() * Math.PI * 2
      const x1 = center + Math.cos(angle) * radius
      const y1 = center + Math.sin(angle) * radius
      const x2 = center + Math.cos(angle + Math.PI) * radius
      const y2 = center + Math.sin(angle + Math.PI) * radius
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
      gradient.addColorStop(0, getRandomHex())
      gradient.addColorStop(1, getRandomHex())
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 32, 32)
      break
    case 2: // Radial gradient from center
      const radGrad = ctx.createRadialGradient(center, center, 0, center, center, radius)
      radGrad.addColorStop(0, getRandomHex())
      radGrad.addColorStop(1, getRandomHex())
      ctx.fillStyle = radGrad
      ctx.fillRect(0, 0, 32, 32)
      break
    case 3: // Concentric circles
      for(let i = 0; i < 5; i++) {
        ctx.fillStyle = getRandomHex()
        ctx.beginPath()
        ctx.arc(center, center, radius - i * 3, 0, 2 * Math.PI)
        ctx.fill()
      }
      break
  }
  
  // Generate random circular elements
  const elementCount = getRandomInt(6) + 2
  
  for(let i = 0; i < elementCount; i++) {
    const elementType = getRandomInt(5)
    const color = getRandomHex()
    const alpha = getRandomFloat() * 0.7 + 0.3
    
    ctx.globalAlpha = alpha
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = getRandomInt(2) + 1
    
    switch(elementType) {
      case 0: // Concentric circle
        const circleRadius = getRandomInt(10) + 2
        const offsetX = (getRandomFloat() - 0.5) * 20
        const offsetY = (getRandomFloat() - 0.5) * 20
        ctx.beginPath()
        ctx.arc(center + offsetX, center + offsetY, circleRadius, 0, 2 * Math.PI)
        getRandomInt(2) ? ctx.fill() : ctx.stroke()
        break
        
      case 1: // Radial lines from center
        const lineCount = getRandomInt(8) + 4
        for(let j = 0; j < lineCount; j++) {
          const angle = (j / lineCount) * 2 * Math.PI + getRandomFloat() * 0.5
          const startRadius = getRandomInt(5) + 2
          const endRadius = getRandomInt(10) + 8
          const x1 = center + Math.cos(angle) * startRadius
          const y1 = center + Math.sin(angle) * startRadius
          const x2 = center + Math.cos(angle) * endRadius
          const y2 = center + Math.sin(angle) * endRadius
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
        break
        
      case 2: // Arc segments
        const arcRadius = getRandomInt(12) + 4
        const startAngle = getRandomFloat() * Math.PI * 2
        const endAngle = startAngle + (getRandomFloat() * Math.PI + 0.5)
        ctx.beginPath()
        ctx.arc(center, center, arcRadius, startAngle, endAngle)
        ctx.stroke()
        break
        
      case 3: // Dots in circular pattern
        const dotCount = getRandomInt(12) + 6
        const dotRadius = getRandomInt(8) + 4
        const dotSize = getRandomInt(3) + 1
        for(let j = 0; j < dotCount; j++) {
          const angle = (j / dotCount) * 2 * Math.PI
          const x = center + Math.cos(angle) * dotRadius
          const y = center + Math.sin(angle) * dotRadius
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, 2 * Math.PI)
          ctx.fill()
        }
        break
        
      case 4: // Spiral
        ctx.beginPath()
        const spiralTurns = getRandomInt(3) + 1
        const maxRadius = getRandomInt(10) + 5
        let currentAngle = 0
        let currentRadius = 0
        ctx.moveTo(center, center)
        for(let j = 0; j < 100; j++) {
          currentAngle += 0.2
          currentRadius = (j / 100) * maxRadius
          const x = center + Math.cos(currentAngle * spiralTurns) * currentRadius
          const y = center + Math.sin(currentAngle * spiralTurns) * currentRadius
          ctx.lineTo(x, y)
        }
        ctx.stroke()
        break
    }
  }
  
  // Reset alpha
  ctx.globalAlpha = 1
  
  // Add random circular noise overlay (sometimes)
  if(getRandomInt(3) === 0) {
    ctx.globalCompositeOperation = 'overlay'
    ctx.globalAlpha = 0.4
    for(let i = 0; i < 30; i++) {
      const angle = getRandomFloat() * Math.PI * 2
      const distance = getRandomFloat() * radius
      const x = center + Math.cos(angle) * distance
      const y = center + Math.sin(angle) * distance
      ctx.fillStyle = getRandomHex()
      ctx.beginPath()
      ctx.arc(x, y, getRandomInt(2) + 1, 0, 2 * Math.PI)
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
  }
  
  // Convert to favicon
  const dataURL = canvas.toDataURL('image/png')
  
  // Update favicon
  let favicon = document.querySelector('link[rel="icon"]')
  if (!favicon) {
    favicon = document.createElement('link')
    favicon.rel = 'icon'
    favicon.type = 'image/png'
    document.head.appendChild(favicon)
  }
  favicon.href = dataURL
  
  // Also update apple-touch-icon for mobile
  let appleFavicon = document.querySelector('link[rel="apple-touch-icon"]')
  if (!appleFavicon) {
    appleFavicon = document.createElement('link')
    appleFavicon.rel = 'apple-touch-icon'
    appleFavicon.sizes = '180x180'
    document.head.appendChild(appleFavicon)
  }
  appleFavicon.href = dataURL
}

// Change favicon every 20 seconds with completely unique generation
export function startUniqueFaviconRotation() {
  if (typeof window === 'undefined') return
  
  createUniqueFavicon() // Initial unique favicon
  
  setInterval(() => {
    createUniqueFavicon() // Generate completely new unique favicon
  }, 20000) // Change every 20 seconds
}