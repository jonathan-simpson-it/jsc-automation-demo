import type { Metadata } from 'next'
import HeroSection from '@/components/landing/HeroSection'
import OpsTicker from '@/components/landing/OpsTicker'
import RegulatorStrip from '@/components/landing/RegulatorStrip'
import HowItWorks from '@/components/landing/HowItWorks'
import VideoSection from '@/components/landing/VideoSection'
import SimplicitySection from '@/components/landing/SimplicitySection'
import ConnectorMatrix from '@/components/landing/ConnectorMatrix'
import PricingSection from '@/components/landing/PricingSection'
import RoadmapSection from '@/components/landing/RoadmapSection'
import CtaBand from '@/components/landing/CtaBand'
import { siteConfig } from '@/config/siteConfig'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: siteConfig.seo.faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export const metadata: Metadata = {
  keywords: siteConfig.seo.home.keywords,
  openGraph: {
    title: siteConfig.seo.home.ogTitle,
  },
}

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <section className="landing-hero-shell">
        <HeroSection />
        <div className="container-site">
          <OpsTicker />
        </div>
      </section>
      <RegulatorStrip />
      <HowItWorks />
      <VideoSection />
      <SimplicitySection />
      <ConnectorMatrix />
      <PricingSection />
      <RoadmapSection />
      <CtaBand />
    </>
  )
}
