import type { Metadata } from 'next'
import './site.css'
import HeaderNav from '@/components/site/HeaderNav'
import Footer from '@/components/site/Footer'
import { siteConfig } from '@/config/siteConfig'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.metadataBase),
  title: {
    template: siteConfig.seo.titleTemplate,
    default: siteConfig.seo.defaultTitle,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.defaultKeywords,
  alternates: {
    canonical: siteConfig.seo.canonical,
    types: {
      'text/markdown': '/home.md',
    },
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.seo.website.name,
    locale: siteConfig.seo.locale,
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
  name: siteConfig.seo.organization.name,
  url: siteConfig.seo.organization.url,
  description: siteConfig.seo.organization.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.seo.organization.addressLocality,
    addressRegion: siteConfig.seo.organization.addressRegion,
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.seo.website.name,
  alternateName: siteConfig.seo.website.alternateName,
  url: siteConfig.url,
  description: siteConfig.seo.website.description,
}

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col bg-jsc-bg text-jsc-ink font-sans">
      <link rel="llms.txt" href="/llms.txt" />
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
    </div>
  )
}
