'use client'

import { motion } from 'motion/react'
import { Plug, Calculator, Brain, BarChart3, Search, ShieldCheck, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

interface Props {
  label: string
  capacity?: 'low' | 'medium' | 'high'
  active?: boolean
}

const CAPACITY_CONFIG = {
  low: { pulseDur: '1.2s', label: siteConfig.demo.capacityLabels.low, className: 'bg-blue-500/10 text-blue-700 border-blue-500/30' },
  medium: { pulseDur: '0.8s', label: siteConfig.demo.capacityLabels.medium, className: 'bg-amber-500/10 text-amber-700 border-amber-500/30' },
  high: { pulseDur: '0.5s', label: siteConfig.demo.capacityLabels.high, className: 'bg-jsc-accent/15 text-[#4d665c] border-jsc-accent/40' },
}

const ICON_MAP: [RegExp, LucideIcon][] = [
  [/search|research|query/i, Search],
  [/connect|fetch|pull|init/i, Plug],
  [/sentiment|analyz|match|comput/i, BarChart3],
  [/verify|screen|check|complian/i, ShieldCheck],
  [/variance|benchmark/i, Calculator],
  [/assembl|bundl/i, Package],
]

function pickIconElement(label: string) {
  for (const [pattern, Icon] of ICON_MAP) {
    if (pattern.test(label)) {
      return <Icon size={16} strokeWidth={2} className="text-jsc-muted shrink-0" />
    }
  }
  return <Brain size={16} strokeWidth={2} className="text-jsc-muted shrink-0" />
}

export default function ThinkingIndicator({ label, capacity, active = true }: Props) {
  const icon = pickIconElement(label)

  const dot = (i: number) => (
    <span
      key={i}
      className="inline-block w-1.5 h-1.5 rounded-full bg-jsc-accent"
      style={
        active
          ? { animation: `thinking-bounce 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }
          : { opacity: 0.35 }
      }
    />
  )

  const cap = capacity ? CAPACITY_CONFIG[capacity] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-2.5 my-3"
    >
      {icon}
      <span className="font-sans text-[0.82rem] text-jsc-ink/70">{label}</span>
      <span className="flex items-center gap-1 ml-1">
        {dot(0)}{dot(1)}{dot(2)}
      </span>
      {cap && (
        <span
          className={`text-[0.55rem] font-mono px-1.5 py-0.5 rounded-full border ${cap.className}`}
          style={
            active
              ? {
                  animation: capacity === 'high'
                    ? 'capacity-pulse-high 0.6s ease-in-out infinite'
                    : capacity === 'medium'
                    ? 'capacity-pulse-med 0.9s ease-in-out infinite'
                    : 'capacity-pulse-low 1.2s ease-in-out infinite',
                }
              : undefined
          }
        >
          {cap.label}
        </span>
      )}
    </motion.div>
  )
}
