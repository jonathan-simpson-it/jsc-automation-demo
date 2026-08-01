'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { connectors, type Connector } from '@/lib/connectors'
import { BrandIcon, getBrand } from '@/lib/brands'
import { siteConfig } from '@/config/siteConfig'

const HIDDEN_IDS = ['slack', 'teams', 'whatsapp']

const PROTOCOL_BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  'OAUTH 2.0': { bg: '#eaf4ed', text: '#2d5a3d' },
  'MTLS + API KEY': { bg: '#fdf3e3', text: '#7a5d2e' },
  'SESSION VAULT': { bg: '#e6edf8', text: '#2e4a7a' },
  'HMAC WEBHOOK': { bg: '#ebebe9', text: '#4a4a4a' },
  'BOT TOKEN': { bg: '#eee5f2', text: '#5a3d6b' },
  'BUSINESS API': { bg: '#e9e6f5', text: '#3d3a7a' },
}

function MatrixCard({ connector, onClick }: { connector: Connector; onClick: () => void }) {
  const brandIds = connector.stackedBrandIds || [connector.brandId]
  const [isHovered, setIsHovered] = useState(false)
  const badgeStyle = PROTOCOL_BADGE_STYLES[connector.protocolBadge] || { bg: 'var(--color-jsc-accent-soft)', text: 'var(--color-jsc-muted)' }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="panel-card p-4 text-left cursor-pointer flex flex-col"
      style={{
        height: '176px',
        borderColor: isHovered ? '#aec7bd' : undefined,
        transition: 'border-color 300ms cubic-bezier(0.23,1,0.32,1), transform 220ms cubic-bezier(0.23,1,0.32,1), box-shadow 220ms cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      <div className="flex items-center justify-between h-[36px] flex-shrink-0">
        <div className="relative w-[48px] h-[32px] flex items-center overflow-visible z-10">
          {brandIds.slice(0, 6).map((bid, i) => {
            const b = getBrand(bid)
            if (!b) return null
            return (
              <motion.div
                key={bid}
                className="absolute left-0 w-[26px] h-[26px] rounded-[5px] flex items-center justify-center"
                style={{
                  top: 3,
                  background: b.bg || (b.multiColor ? '#fff' : (b.hex || '#e3e9e6')),
                  border: '1px solid var(--color-jsc-line)',
                  zIndex: brandIds.length - i,
                }}
                animate={{ x: isHovered ? i * 30 : i * 7 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.7 }}
              >
                <BrandIcon id={bid} size={18} className={b.multiColor ? '' : 'text-white'} />
              </motion.div>
            )
          })}
        </div>
        <span
          className="text-[0.6rem] leading-none py-[0.2rem] px-[0.5rem] rounded-full border border-transparent font-sans font-medium"
          style={{
            background: badgeStyle.bg,
            color: badgeStyle.text,
            transition: 'opacity 250ms cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          {connector.protocolBadge}
        </span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col justify-center pt-2 pb-1">
        <span className="text-[0.82rem] font-medium text-jsc-ink leading-tight line-clamp-2">
          {connector.name}
        </span>
      </div>
      <span className="text-[0.7rem] text-jsc-muted leading-snug line-clamp-2 flex-shrink-0">
        {connector.functionLabel}
      </span>
    </button>
  )
}

export default function ConnectorMatrix() {
  const [selected, setSelected] = useState<Connector | null>(null)
  const visibleConnectors = connectors.filter((c) => !HIDDEN_IDS.includes(c.id))

  return (
    <section id="connectors" className="section">
      <div className="container-site">
        <div className="max-w-xl mb-10">
          <p className="section-eyebrow mb-3">{siteConfig.connectors.eyebrow}</p>
          <h2 className="font-serif text-[clamp(1.4rem,3.8vw,2rem)] tracking-[-0.01em] text-jsc-ink mb-3">
            {siteConfig.connectors.heading}
          </h2>
          <p className="text-jsc-muted text-[0.88rem] leading-relaxed">
            {siteConfig.connectors.subtext}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {visibleConnectors.map((connector) => (
            <MatrixCard
              key={connector.id}
              connector={connector}
              onClick={() => setSelected(connector)}
            />
          ))}
        </div>

        <div className="mt-6 cta-dashed flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex-1">
            <p className="text-[0.78rem] text-jsc-ink font-medium">
              {siteConfig.connectors.ctaHeading}
            </p>
            <p className="text-[0.72rem] text-jsc-muted">
              {siteConfig.connectors.ctaSubtext}
            </p>
          </div>
          <a
            href={siteConfig.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-[0.72rem] min-h-[2.25rem] px-4 flex-shrink-0"
          >
            {siteConfig.connectors.ctaButton}
          </a>
        </div>

        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-jsc-ink/20"
                onClick={() => setSelected(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full z-50 bg-jsc-surface border border-jsc-line rounded-jsc-lg shadow-jsc-soft flex flex-col max-h-[80vh]"
              >
                <div className="flex items-center justify-between p-5 border-b border-jsc-line">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      {(selected.stackedBrandIds || [selected.brandId]).map((bid) => {
                        const b = getBrand(bid)
                        return (
                          <div key={bid} className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: b?.bg || (b?.multiColor ? '#fff' : (b?.hex || '#e3e9e6')) }}
                          >
                            <BrandIcon id={bid} size={20} className={b?.multiColor ? '' : 'text-white'} />
                          </div>
                        )
                      })}
                    </div>
                    <div>
                      <h3 className="font-sans text-[1rem] font-medium text-jsc-ink">
                        {selected.name}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-jsc-accent-soft transition-colors duration-200 cursor-pointer"
                    aria-label={siteConfig.connectors.modalLabels.close}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-5 overflow-y-auto flex flex-col gap-5">
                  <div>
                    <span className="text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted font-medium">
                      {siteConfig.connectors.modalLabels.description}
                    </span>
                    <p className="text-[0.85rem] text-jsc-ink mt-2">
                      {selected.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted font-medium">
                      {siteConfig.connectors.modalLabels.tools}
                    </span>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {(selected.stackedBrandIds || [selected.brandId]).map((bid) => {
                        const b = getBrand(bid)
                        if (!b) return null
                        return (
                          <li key={bid} className="flex items-center gap-2.5">
                            <span
                              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                              style={{ background: b.bg || (b.multiColor ? '#fff' : (b.hex || '#e3e9e6')) }}
                            >
                              <BrandIcon id={bid} size={15} className={b.multiColor ? '' : 'text-white'} />
                            </span>
                            <span className="text-[0.82rem] text-jsc-ink">{b.name}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  {siteConfig.connectors.benefits[selected.id] && (
                    <div>
                      <span className="text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted font-medium">
                        {siteConfig.connectors.modalLabels.benefit}
                      </span>
                      <p className="text-[0.85rem] text-jsc-ink mt-2">
                        {siteConfig.connectors.benefits[selected.id]}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted font-medium">
                      {siteConfig.connectors.modalLabels.authentication}
                    </span>
                    <div className="mt-3">
                      <span className="chip">{selected.authType}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
