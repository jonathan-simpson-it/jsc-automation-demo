import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import HeaderNav from '@/components/site/HeaderNav'
import Footer from '@/components/site/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-plex',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://automation.jonathansimpson.co'),
  title: {
    template: '%s | JS&C Automation',
    default: 'JS&C Automation — Zero-Data-Retention Agentic AI for HK Finance',
  },
  description:
    'Simulate ZDR multi-agent pipelines that eliminate junior analyst overhead while maintaining SFC, HKMA, and PCPD compliance. Built by Jonathan Simpson & Co.',
  openGraph: {
    type: 'website',
    siteName: 'JS&C Automation',
    locale: 'en_HK',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Jonathan Simpson & Co.',
  url: 'https://jonathansimpson.co',
  description: 'Premium compliance-first Agentic AI middleware for SFC-licensed financial SMEs in Hong Kong.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Central',
    addressRegion: 'Hong Kong',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'JS&C Automation Demo',
  url: 'https://automation.jonathansimpson.co',
  description:
    'Interactive demo of Zero-Data-Retention Agentic AI middleware for Hong Kong financial institutions.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-jsc-bg text-jsc-ink font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-jsc-surface focus:border focus:border-jsc-line focus:rounded-jsc-lg focus:text-jsc-ink focus:outline-accent"
        >
          Skip to content
        </a>
        <HeaderNav />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
