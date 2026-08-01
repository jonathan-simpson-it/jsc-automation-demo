import { siteConfig } from '@/config/siteConfig'

export default function CtaBand() {
  return (
    <section className="section border-t border-jsc-line">
      <div className="container-site text-center">
        <p className="section-eyebrow mb-4">{siteConfig.ctaBand.eyebrow}</p>
        <h2 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] tracking-[-0.01em] text-jsc-ink mb-4">
          {siteConfig.ctaBand.heading}
        </h2>
        <p className="text-jsc-muted text-[0.88rem] max-w-[30rem] mx-auto mb-8">
          {siteConfig.ctaBand.subtext}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={siteConfig.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {siteConfig.ctaBand.primaryCta}
          </a>
          <a href="/demo" className="btn-ghost">
            {siteConfig.ctaBand.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  )
}
