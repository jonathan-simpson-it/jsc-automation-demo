'use client'

import { useEffect, useState, useRef } from 'react'

const stages = [
  { label: 'Ingest', sub: 'PDF / Transcript', color: '#80988f' },
  { label: 'ZDR RAM', sub: 'Ephemeral Sandbox', color: '#80988f' },
  { label: 'AI-vs-AI', sub: 'SFC Gate', color: '#80988f' },
  { label: 'Audit', sub: 'SHA-256 Proof', color: '#80988f' },
]

const LOOP_MS = 4000

export default function PipelineDiagram() {
  const [progress, setProgress] = useState(0)
  const [reduced, setReduced] = useState(false)
  const frameRef = useRef(0)
  const t0Ref = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(1)
      return
    }

    let running = true
    const tick = (now: number) => {
      if (!running) return
      if (!t0Ref.current) t0Ref.current = now
      const elapsed = now - t0Ref.current
      setProgress((elapsed % (LOOP_MS * 4)) / (LOOP_MS * 4))
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => { running = false; cancelAnimationFrame(frameRef.current) }
  }, [reduced])

  const activeIndex = Math.min(Math.floor(progress * 4), 3)
  const spanPct = progress * 100

  // Particle x: 0% to 100% of the connector span (from center of card 1 to center of card 4)
  const particleX = 12.5 + spanPct * 0.75

  return (
    <div
      className="panel-card overflow-hidden"
      role="img"
      aria-label="Animated pipeline: data flows through four stages — ingest, ZDR RAM, AI-vs-AI verify, audit report"
    >
      {/* Header strip */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0f14]">
        <span className="w-2 h-2 rounded-full bg-[#aec7bd] shadow-[0_0_6px_rgba(174,199,189,0.5)]" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/40">
          Pipeline Engine — Live
        </span>
      </div>

      {/* Canvas */}
      <div className="p-4">
        <div className="relative">
          {/* Connector line — background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Background path */}
            <line
              x1="12.5" y1="50" x2="87.5" y2="50"
              stroke="#d6d8d1" strokeWidth={0.3} strokeDasharray="1.5 1.5" opacity={0.3}
            />
            {/* Active progress line */}
            <line
              x1="12.5" y1="50" x2={12.5 + spanPct * 0.75} y2="50"
              stroke="#80988f" strokeWidth={0.6} strokeLinecap="round"
            />
            {/* Particle glow */}
            <circle cx={particleX} cy={50} r={1.5} fill="#aec7bd" opacity={0.4}>
              {!reduced && (
                <animate attributeName="r" values="1.5;3;1.5" dur="1.2s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx={particleX} cy={50} r={0.5} fill="#80988f">
              {!reduced && (
                <animate attributeName="cy" values="50;46;50" dur="0.8s" repeatCount="indefinite" />
              )}
            </circle>
            {/* PII scatter particles near ZDR RAM stage */}
            {activeIndex >= 1 && activeIndex <= 2 && !reduced && (
              <g opacity={0.4}>
                {[0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    cx={37.5 + i * 2 - 2}
                    cy={38}
                    r={0.3}
                    fill="#b88a44"
                  >
                    <animate
                      attributeName="cy" values="38;46;38"
                      dur={`${0.35 + i * 0.12}s`} repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity" values="0.5;0;0.5"
                      dur={`${0.35 + i * 0.12}s`} repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </g>
            )}
          </svg>

          {/* Stage cards */}
          <div className="grid grid-cols-4 gap-2 relative z-10">
            {stages.map((stg, i) => {
              const isActive = activeIndex >= i
              const isCurrent = activeIndex === i
              return (
                <div
                  key={stg.label}
                  className={`rounded-lg border py-2 px-[0.45rem] text-center transition-colors duration-300 ${
                    isActive
                      ? 'bg-jsc-accent-soft border-jsc-accent'
                      : 'bg-jsc-surface border-jsc-line'
                  }`}
                >
                  <div className={`font-mono text-[0.58rem] font-medium mb-0.5 ${
                    isActive ? 'text-jsc-accent' : 'text-jsc-muted'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className={`text-[0.65rem] font-medium leading-tight ${
                    isActive ? 'text-jsc-ink' : 'text-jsc-muted'
                  }`}>
                    {stg.label}
                  </div>
                  {isCurrent && (
                    <div className="text-[0.5rem] text-jsc-muted mt-0.5 leading-tight">
                      {stg.sub}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Annotations */}
        <div className="flex justify-between mt-3 text-[0.55rem] font-mono uppercase tracking-[0.06em]">
          <span className="text-jsc-muted/50">Sources</span>
          <span className="text-jsc-accent/50">ZDR encrypted</span>
          <span className="text-jsc-muted/50">Destinations</span>
        </div>
      </div>
    </div>
  )
}
