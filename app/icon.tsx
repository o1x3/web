import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  const dot = 4
  const gap = 2
  const color = '#1a1a1a'

  const dotStyle = {
    width: dot,
    height: dot,
    borderRadius: dot / 2,
    background: color,
  }
  const rowStyle = { display: 'flex', gap }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F7F5F0',
          borderRadius: 7,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap }}>
          <div style={rowStyle}>
            <div style={dotStyle} />
            <div style={dotStyle} />
            <div style={dotStyle} />
          </div>
          <div style={rowStyle}>
            <div style={dotStyle} />
            <div style={dotStyle} />
            <div style={dotStyle} />
          </div>
          <div style={rowStyle}>
            <div style={dotStyle} />
            <div style={dotStyle} />
            <div style={dotStyle} />
          </div>
        </div>
      </div>
    ),
    size,
  )
}
