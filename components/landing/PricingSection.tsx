'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { formatHKD } from '@/lib/utils'
import { siteConfig } from '@/config/siteConfig'

const tiers = siteConfig.pricing.tiers
const SAVINGS_PER_FTE = siteConfig.pricing.savingsPerFte
const PRO_ANNUAL_COST = siteConfig.pricing.proAnnualCost

export default function PricingSection() {
  const [fteCount, setFteCount] = useState(2)
  const currentCost = fteCount * SAVINGS_PER_FTE
  const savings = currentCost - PRO_ANNUAL_COST
  const savingsPct = Math.round((savings / currentCost) * 100)

  return (
    <section id="pricing" className="section">
      <div className="container-site">
        <div className="max-w-xl mb-10">
          <p className="section-eyebrow mb-3">{siteConfig.pricing.eyebrow}</p>
          <h2 className="font-serif text-[clamp(1.4rem,3.8vw,2rem)] tracking-[-0.01em] text-jsc-ink mb-3">
            {siteConfig.pricing.heading}
          </h2>
          <p className="text-jsc-muted text-[0.88rem] leading-relaxed">
            {siteConfig.pricing.subtext}
          </p>
        </div>

        <div className="arbitrage-grid">
          <div className="panel-card p-6 flex flex-col gap-5">
            <div>
              <span className="text-[0.6rem] font-mono uppercase tracking-[0.1em] text-jsc-muted">
                {siteConfig.pricing.fteCalculatorLabel}
              </span>
              <p className="text-[0.68rem] text-jsc-muted mt-0.5">
                {siteConfig.pricing.fteSubtext}
              </p>
            </div>

            <div>
              <input
                type="range"
                min={1}
                max={5}
                value={fteCount}
                onChange={(e) => setFteCount(Number(e.target.value))}
                className="w-full h-1.5 appearance-none bg-jsc-line rounded-full cursor-pointer accent-jsc-accent mb-2"
                aria-label={siteConfig.pricing.fteSliderAria}
              />
              <div className="flex justify-between text-[0.68rem] text-jsc-muted">
                <span>{siteConfig.pricing.fteMinLabel}</span>
                <span className="font-mono text-[0.72rem] text-jsc-ink tabular-nums">{fteCount} FTEs</span>
                <span>{siteConfig.pricing.fteMaxLabel}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[0.72rem] text-jsc-muted mb-1.5">
                  <span>{siteConfig.pricing.traditionalCostLabel}</span>
                  <span className="font-mono tabular-nums">{formatHKD(currentCost)}/yr</span>
                </div>
                <div className="h-6 bg-jsc-accent-soft rounded-full overflow-hidden border border-jsc-line">
                  <motion.div
                    className="h-full bg-jsc-muted rounded-full"
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[0.72rem] text-jsc-muted mb-1.5">
                  <span>{siteConfig.pricing.proTierLabel}</span>
                  <span className="font-mono tabular-nums">{formatHKD(PRO_ANNUAL_COST)}/yr</span>
                </div>
                <div className="h-6 bg-jsc-accent-soft rounded-full overflow-hidden border border-jsc-line">
                  <motion.div
                    className="h-full bg-jsc-accent rounded-full"
                    animate={{ width: `${(PRO_ANNUAL_COST / currentCost) * 100}%` }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center py-5 bg-jsc-accent-soft rounded-jsc-lg border border-jsc-line">
              <p className="text-[0.65rem] uppercase tracking-[0.1em] text-jsc-muted mb-1">
                {siteConfig.pricing.directSavingsLabel}
              </p>
              <p className="font-mono text-[clamp(1.6rem,4vw,2.4rem)] text-jsc-accent tabular-nums font-medium">
                {formatHKD(savings)}
              </p>
              <p className="text-[0.78rem] text-jsc-muted">
                {savingsPct}% reduction · {formatHKD(currentCost)} → {formatHKD(PRO_ANNUAL_COST)}
              </p>
            </div>
          </div>

          <div className="panel-card p-6 flex flex-col gap-4">
            <div>
              <span className="text-[0.6rem] font-mono uppercase tracking-[0.1em] text-jsc-muted">
                {siteConfig.pricing.retainerPanelLabel}
              </span>
              <span className="chip text-[0.55rem] ml-2 py-[0.15rem] px-[0.45rem] align-middle">
                {siteConfig.pricing.retainerBadge}
              </span>
              <p className="text-[0.68rem] text-jsc-muted mt-1">
                {siteConfig.pricing.retainerSubtext}
              </p>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`flex items-center justify-between gap-3 p-3 rounded-jsc-lg border transition-colors duration-200 ${
                    tier.featured
                      ? 'bg-jsc-accent-soft border-jsc-accent'
                      : 'bg-jsc-bg border-jsc-line'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[0.8rem] font-medium text-jsc-ink">{tier.name}</span>
                      {tier.subtitle && (
                        <span className="text-[0.6rem] text-jsc-muted uppercase tracking-[0.06em]">
                          {tier.subtitle}
                        </span>
                      )}
                      {tier.featured && (
                        <span className="text-[0.55rem] font-mono uppercase tracking-[0.08em] text-jsc-accent">
                          {siteConfig.pricing.sweetSpotLabel}
                        </span>
                      )}
                    </div>
                    <span className="text-[0.62rem] text-jsc-muted">{tier.scope}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-mono text-[1rem] text-jsc-ink tabular-nums">
                      {tier.custom ? `${formatHKD(tier.monthly)}+` : formatHKD(tier.monthly)}
                    </span>
                    <span className="text-[0.6rem] text-jsc-muted ml-1">{siteConfig.pricing.perMonthSuffix}</span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={siteConfig.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-[0.72rem] min-h-[2.25rem] px-4 w-full text-center"
            >
              {siteConfig.pricing.retainerCta}
            </a>

            <p className="text-[0.65rem] text-jsc-muted text-center leading-relaxed">
              {siteConfig.pricing.footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
