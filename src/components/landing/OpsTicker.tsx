'use client'

import { siteConfig } from '@/config/siteConfig'

function LogLine({ time, msg, status, sep }: { time: string; msg: string; status: string; sep?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      {sep && <span className="text-white/10 mx-2">|</span>}
      <span className="font-mono text-[0.62rem] text-white/30 tabular-nums">{time}</span>
      <span
        className={
          status === 'pass' ? 'text-[#aec7bd]' : status === 'processing' ? 'text-[#aec7bd]' : 'text-white/40'
        }
      >
        {status === 'pass' ? '✓' : status === 'processing' ? '●' : '→'}
      </span>
      <span
        className={
          status === 'pass' ? 'text-[#aec7bd]' : status === 'processing' ? 'text-[#aec7bd]' : 'text-white/60'
        }
      >
        {msg}
      </span>
    </span>
  )
}

export default function OpsTicker() {
  const items = siteConfig.ticker.lines.map((l, i) => (
    <LogLine key={i} {...l} sep={i > 0 ? '|' : undefined} />
  ))

  return (
    <div className="telemetry-bar overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="telemetry-dot" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/40 whitespace-nowrap">
            {siteConfig.ticker.label}
          </span>
        </div>

        <div className="flex-1 overflow-hidden marquee-container">
          <div className="flex items-center gap-0 animate-[marquee_35s_linear_infinite] min-w-max">
            {items}
            <span className="ml-4">{items}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
