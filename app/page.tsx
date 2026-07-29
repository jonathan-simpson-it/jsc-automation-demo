import type { Metadata } from 'next'
import HeroSection from '@/components/landing/HeroSection'
import OpsTicker from '@/components/landing/OpsTicker'
import HowItWorks from '@/components/landing/HowItWorks'
import VideoSection from '@/components/landing/VideoSection'
import ConnectorMatrix from '@/components/landing/ConnectorMatrix'
import PricingSection from '@/components/landing/PricingSection'
import RoadmapSection from '@/components/landing/RoadmapSection'
import CtaBand from '@/components/landing/CtaBand'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Zero-Data-Retention Agentic AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ZDR Agentic AI processes client data in ephemeral RAM sandboxes. Raw data vanishes immediately after execution — no persistent storage, no third-party model training, full PCPD compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this compliant with SFC regulations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our architecture includes mandatory Human-in-the-Loop validation gates, AI-vs-AI governance checks against SFC circulars, and cryptographic audit logs for every execution.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a typical firm save?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Replacing one junior analyst FTE (HKD 580,000/year including overhead) with the JS&C Pro Tier (HKD 202,000/year all-in) saves HKD 378,000 per year — a 65% cost reduction.',
      },
    },
  ],
}

export const metadata: Metadata = {
  openGraph: {
    title: 'JS&C Automation — Zero-Data-Retention Agentic AI for HK Finance',
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
      <HowItWorks />
      <VideoSection />
      <ConnectorMatrix />
      <PricingSection />
      <RoadmapSection />
      <CtaBand />
    </>
  )
}
