import { MessageSquare, ShieldCheck, FileText, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

const ICONS: Record<string, LucideIcon> = {
  'message-square': MessageSquare,
  'shield-check': ShieldCheck,
  'file-text': FileText,
}

export default function SimplicitySection() {
  return (
    <section id="simplicity" className="section">
      <div className="container-site">
        <div className="max-w-2xl mb-12">
          <p className="section-eyebrow mb-3">{siteConfig.simplicity.eyebrow}</p>
          <h2 className="font-serif text-[clamp(1.6rem,4.2vw,2.4rem)] tracking-[-0.01em] text-jsc-ink mb-4">
            {siteConfig.simplicity.heading}
          </h2>
          <p className="text-jsc-muted text-[0.9rem] leading-relaxed">
            {siteConfig.simplicity.subtext}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {siteConfig.simplicity.examples.map((ex) => {
            const Icon = ICONS[ex.icon] || MessageSquare
            return (
              <div key={ex.ask} className="panel-card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-jsc-accent-soft border border-jsc-line flex items-center justify-center">
                    <Icon size={16} className="text-jsc-accent" strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-[0.78rem] text-jsc-ink">
                    {ex.ask}
                  </span>
                </div>
                <p className="text-[0.8rem] text-jsc-muted leading-relaxed">
                  {ex.body}
                </p>
              </div>
            )
          })}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[0.85rem] text-jsc-muted leading-relaxed mb-6">
            {siteConfig.simplicity.note}
          </p>
          <a
            href={siteConfig.simplicity.ctaHref}
            className="btn-primary text-[0.78rem] min-h-[2.5rem] px-7 inline-flex items-center gap-2"
          >
            {siteConfig.simplicity.ctaLabel}
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  )
}
