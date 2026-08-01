import PipelineDiagram from './PipelineDiagram'
import { siteConfig } from '@/config/siteConfig'

export default function HeroSection() {
  return (
    <section className="section pt-10">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="section-eyebrow mb-4">
              {siteConfig.hero.eyebrow}
            </p>
            <h1 className="font-serif text-[clamp(2.2rem,6.4vw,4.3rem)] leading-[1.1] tracking-[-0.01em] text-jsc-ink mb-5">
              {siteConfig.hero.headline.map((line, i) => (
                <span key={i} className="block">
                  {i === siteConfig.hero.headlineEmphasisIndex ? (
                    <em className="hero-em font-serif not-italic">
                      {line}
                    </em>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
            <p className="text-[clamp(0.88rem,1.8vw,1rem)] text-jsc-muted max-w-[34rem] leading-relaxed mb-6">
              <strong className="text-jsc-ink font-medium">{siteConfig.hero.boldIntro}</strong>{' '}
              {siteConfig.hero.subtext}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/demo" className="btn-primary">
                {siteConfig.hero.primaryCta}
              </a>
              <a
                href={siteConfig.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {siteConfig.hero.secondaryCta}
              </a>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3 lg:mt-4">
              {siteConfig.hero.badges.map((b) => (
                <span
                  key={b}
                  className="text-[0.55rem] lg:text-[0.62rem] text-jsc-muted bg-jsc-accent-soft/40 border border-jsc-line/40 rounded-full px-2 lg:px-3 py-0.5 lg:py-1 font-mono uppercase tracking-[0.06em]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <PipelineDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
