import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/siteConfig'

export const alt = siteConfig.seo.ogImage.alt
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
          {siteConfig.seo.ogImage.eyebrow}
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
          {siteConfig.seo.ogImage.title}
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
          <span>{siteConfig.seo.ogImage.subtitle1}</span>
          <span>{siteConfig.seo.ogImage.subtitle2}</span>
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
          <span>{siteConfig.seo.ogImage.domain}</span>
          <span
            style={{
              width: 1,
              height: 20,
              background: '#d6d8d1',
            }}
          />
          <span>{siteConfig.seo.ogImage.badge}</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
