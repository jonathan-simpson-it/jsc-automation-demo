'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { connectors, type Connector } from '@/lib/connectors'
import { BrandIcon, getBrand } from '@/lib/brands'

const STACKED_IDS = ['custodian', 'omnichannel']
const HIDDEN_IDS = ['teams', 'slack', 'whatsapp']

const STACKED_BRAND_MAP: Record<string, string[]> = {
  custodian: ['hsbc', 'ubs', 'juliusbaer', 'lgt'],
  omnichannel: ['teams', 'slack', 'whatsapp'],
}

const PROTOCOL_BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  'OAUTH 2.0': { bg: '#eaf4ed', text: '#2d5a3d' },
  'MTLS + API KEY': { bg: '#fdf3e3', text: '#7a5d2e' },
  'SESSION VAULT': { bg: '#e6edf8', text: '#2e4a7a' },
  'HMAC WEBHOOK': { bg: '#ebebe9', text: '#4a4a4a' },
  'BOT TOKEN': { bg: '#eee5f2', text: '#5a3d6b' },
  'BUSINESS API': { bg: '#e9e6f5', text: '#3d3a7a' },
}

function MatrixCard({ connector, onClick }: { connector: Connector; onClick: () => void }) {
  const isStacked = STACKED_IDS.includes(connector.id)
  const brandIds = isStacked ? (STACKED_BRAND_MAP[connector.id] || []) : [connector.brandId]
  const brand = isStacked ? null : getBrand(connector.brandId)
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
        borderColor: !isStacked && isHovered ? '#aec7bd' : undefined,
        transition: 'border-color 300ms cubic-bezier(0.23,1,0.32,1), transform 220ms cubic-bezier(0.23,1,0.32,1), box-shadow 220ms cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      {/* Zone 1: Top Metadata Bar — 36px */}
      <div className="flex items-center justify-between h-[36px] flex-shrink-0">
        {/* Icon Slot — fixed 48w x 32h */}
        <div className="relative w-[48px] h-[32px] flex items-center">
          {isStacked ? (
            brandIds.slice(0, 4).map((bid, i) => {
              const b = getBrand(bid)
              if (!b) return null
              return (
                <motion.div
                  key={bid}
                  className="absolute left-0 w-5 h-5 rounded-[5px] flex items-center justify-center"
                  style={{
                    top: 6,
                    background: b.multiColor ? '#fff' : (b.hex || '#e3e9e6'),
                    border: '1px solid var(--color-jsc-line)',
                    zIndex: brandIds.length - i,
                  }}
                  animate={{ x: isHovered ? i * 28 : i * 7 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.7 }}
                >
                  <BrandIcon id={bid} size={14} className={b.multiColor ? '' : 'text-white'} />
                </motion.div>
              )
            })
          ) : (
            <div
              className="w-[48px] h-[32px] rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: brand?.multiColor ? '#fff' : (brand?.hex || '#e3e9e6') }}
            >
              <BrandIcon id={connector.brandId} size={24} className={brand?.multiColor ? '' : 'text-white'} />
            </div>
          )}
        </div>

        {/* Protocol Badge — right-aligned */}
        <span
          className="text-[0.6rem] leading-none py-[0.2rem] px-[0.5rem] rounded-full border border-transparent font-sans font-medium"
          style={{
            background: badgeStyle.bg,
            color: badgeStyle.text,
            opacity: isStacked ? 1 : (isHovered ? 1 : 0.8),
            transition: 'opacity 250ms cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          {connector.protocolBadge}
        </span>
      </div>

      {/* Zone 2: Full-width Title */}
      <div className="flex-1 min-h-0 flex flex-col justify-center pt-2 pb-1">
        <span className="text-[0.82rem] font-medium text-jsc-ink leading-tight line-clamp-2">
          {connector.name}
        </span>
        {connector.subItems && connector.subItems.length > 0 && (
          <span className="text-[0.6rem] text-jsc-muted uppercase tracking-[0.06em] mt-0.5 line-clamp-1">
            {connector.subItems.join(' · ')}
          </span>
        )}
      </div>

      {/* Zone 3: Description Subtext */}
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
          <p className="section-eyebrow mb-3">Universal Gateway</p>
          <h2 className="font-serif text-[clamp(1.4rem,3.8vw,2rem)] tracking-[-0.01em] text-jsc-ink mb-3">
            Connector Matrix
          </h2>
          <p className="text-jsc-muted text-[0.88rem] leading-relaxed">
            Pre-built integrations connecting directly to your stack.
            Select any tile to inspect its authentication protocol and simulated payload.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
              Need a proprietary in-house API connected?
            </p>
            <p className="text-[0.72rem] text-jsc-muted">
              We build custom connectors during onboarding.
            </p>
          </div>
          <a
            href="https://jonathansimpson.co/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-[0.72rem] min-h-[2.25rem] px-4 flex-shrink-0"
          >
            Request a Connector →
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
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: getBrand(selected.brandId)?.multiColor ? '#fff' : (getBrand(selected.brandId)?.hex || '#e3e9e6') }}
                    >
                      <BrandIcon id={selected.brandId} size={16} className={getBrand(selected.brandId)?.multiColor ? '' : 'text-white'} />
                    </div>
                    <div>
                      <h3 className="font-sans text-[1rem] font-medium text-jsc-ink">
                        {selected.name}
                      </h3>
                      {selected.subItems && (
                        <span className="text-[0.6rem] text-jsc-muted uppercase tracking-[0.06em]">
                          {selected.subItems.join(' · ')}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-jsc-accent-soft transition-colors duration-200 cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-5 overflow-y-auto flex flex-col gap-4">
                  <div>
                    <span className="text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted font-medium">
                      Description
                    </span>
                    <p className="text-[0.85rem] text-jsc-ink mt-1">
                      {selected.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted font-medium">
                      Authentication
                    </span>
                    <span className="chip mt-1">{selected.authType}</span>
                  </div>
                  <div>
                    <span className="text-[0.72rem] uppercase tracking-[0.06em] text-jsc-muted font-medium">
                      Simulated Payload
                    </span>
                    <pre className="mt-2 p-3 bg-jsc-bg rounded-jsc-lg border border-jsc-line overflow-x-auto">
                      <code className="font-mono text-[0.72rem] text-jsc-ink leading-relaxed whitespace-pre">
                        {selected.payloadExample}
                      </code>
                    </pre>
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
