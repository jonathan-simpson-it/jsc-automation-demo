'use client'

import {
  Users,
  TrendingUp,
  Unplug,
  MessageCircle,
  FileSearch,
  Server,
  Layers,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

const ICONS: Record<string, LucideIcon> = {
  users: Users,
  'trending-up': TrendingUp,
  unplug: Unplug,
  'message-circle': MessageCircle,
  'file-search': FileSearch,
  server: Server,
  layers: Layers,
}

export default function PricingSection() {
  return (
    <section id="engagement" className="section">
      <div className="container-site">
        <div className="max-w-2xl mb-12">
          <p className="section-eyebrow mb-3">{siteConfig.pricing.eyebrow}</p>
          <h2 className="font-serif text-[clamp(1.6rem,4.2vw,2.4rem)] tracking-[-0.01em] text-jsc-ink mb-4">
            {siteConfig.pricing.heading}
          </h2>
          <p className="text-jsc-muted text-[0.9rem] leading-relaxed">
            {siteConfig.pricing.subtext}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {siteConfig.pricing.valueCards.map((card) => {
            const Icon = ICONS[card.icon] || Users
            return (
              <div
                key={card.title}
                className="panel-card p-6 flex flex-col gap-4"
              >
                <span className="w-10 h-10 rounded-full bg-jsc-accent-soft border border-jsc-line flex items-center justify-center">
                  <Icon size={18} className="text-jsc-accent" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-serif text-[1.05rem] text-jsc-ink mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-[0.8rem] text-jsc-muted leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mb-12">
          <div className="max-w-xl mb-8">
            <p className="section-eyebrow mb-2">{siteConfig.pricing.processLabel}</p>
            <p className="text-jsc-muted text-[0.85rem] leading-relaxed">
              {siteConfig.pricing.processSubtext}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-3">
            {siteConfig.pricing.processSteps.map((step, i) => {
              const Icon = ICONS[step.icon] || MessageCircle
              return (
                <div key={step.num} className="relative">
                  <div className="flex flex-col gap-3 p-5 border border-jsc-line bg-white rounded-jsc-lg h-full">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.6rem] text-jsc-accent tracking-[0.1em]">
                        {step.num}
                      </span>
                      <Icon size={16} className="text-jsc-muted" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-[0.85rem] font-medium text-jsc-ink mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[0.72rem] text-jsc-muted leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                  {i < siteConfig.pricing.processSteps.length - 1 && (
                    <span className="hidden md:flex absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 text-jsc-muted/50">
                      <ArrowRight size={16} strokeWidth={1.8} />
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[0.85rem] text-jsc-muted leading-relaxed mb-6">
            {siteConfig.pricing.capabilityNote}
          </p>
          <a
            href={siteConfig.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[0.78rem] min-h-[2.5rem] px-7 inline-flex items-center gap-2"
          >
            {siteConfig.pricing.retainerCta}
            <ArrowRight size={14} strokeWidth={2} />
          </a>
          <p className="text-[0.65rem] text-jsc-muted mt-4">
            {siteConfig.pricing.footnote}
          </p>
        </div>
      </div>
    </section>
  )
}
