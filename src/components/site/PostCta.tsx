import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'

export default function PostCta() {
  return (
    <div className="panel-card p-6 sm:p-8 mt-14 text-center">
      <p className="section-eyebrow">{siteConfig.ctaBand.eyebrow}</p>
      <h2 className="font-serif text-[clamp(1.2rem,3vw,1.6rem)] text-jsc-ink mt-3 leading-snug">
        {siteConfig.ctaBand.heading}
      </h2>
      <p className="text-jsc-muted text-[0.9rem] mt-3 leading-relaxed max-w-md mx-auto">
        {siteConfig.ctaBand.subtext}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <Link
          href={siteConfig.primaryCta.href}
          className="btn-primary inline-flex items-center justify-center min-h-[2.75rem] px-6"
        >
          {siteConfig.primaryCta.label}
        </Link>
        <Link
          href="/demo"
          className="btn-ghost inline-flex items-center justify-center min-h-[2.75rem] px-6"
        >
          {siteConfig.ctaBand.secondaryCta}
        </Link>
      </div>
    </div>
  )
}
