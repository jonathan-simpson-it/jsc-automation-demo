import type { Metadata } from 'next'
import DemoConsole from '@/components/demo/DemoConsole'
import { siteConfig } from '@/config/siteConfig'

export const metadata: Metadata = {
  title: siteConfig.seo.demo.title,
  description: siteConfig.seo.demo.description,
  keywords: siteConfig.seo.demo.keywords,
  openGraph: {
    title: siteConfig.seo.demo.ogTitle,
    description: siteConfig.seo.demo.ogDescription,
  },
}

export default function DemoPage() {
  return <DemoConsole />
}
