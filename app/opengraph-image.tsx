import { ImageResponse } from 'next/og'

export const alt = 'JS&C Automation — Compliant Agentic AI for HK Finance'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f4f4ef',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <div
          style={{
            fontSize: 14,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#80988f',
            marginBottom: 16,
          }}
        >
          2026 Strategic Briefing · Live Demo
        </div>
        <div
          style={{
            fontSize: 52,
            color: '#161714',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          JS&C Automation
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#5c5e56',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>Zero-Data-Retention Agentic AI pipelines for</span>
          <span>SFC-licensed financial SMEs in Hong Kong</span>
        </div>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            fontSize: 14,
            color: '#5c5e56',
          }}
        >
          <span>jonathansimpson.co</span>
          <span
            style={{
              width: 1,
              height: 20,
              background: '#d6d8d1',
            }}
          />
          <span>SFC · HKMA · PCPD Compliant</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
