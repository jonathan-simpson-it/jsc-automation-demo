'use client'

import { motion } from 'motion/react'
import { Plug, Calculator, Brain, BarChart3, Search, ShieldCheck, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Props {
  label: string
  capacity?: 'low' | 'medium' | 'high'
  progress: number
}

const CAPACITY_CONFIG = {
  low: { pulseDur: '1.2s', label: 'LOW', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  medium: { pulseDur: '0.8s', label: 'MED', className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  high: { pulseDur: '0.5s', label: 'HIGH', className: 'bg-jsc-accent/20 text-jsc-accent border-jsc-accent/30' },
}

const ICON_MAP: [RegExp, LucideIcon][] = [
  [/search|research|query/i, Search],
  [/connect|fetch|pull|init/i, Plug],
  [/sentiment|analyz|match|comput/i, BarChart3],
  [/verify|screen|check|complian/i, ShieldCheck],
  [/variance|benchmark/i, Calculator],
  [/assembl|bundl/i, Package],
]

function pickIcon(label: string): LucideIcon {
  for (const [pattern, Icon] of ICON_MAP) {
    if (pattern.test(label)) return Icon
  }
  return Brain
}

export default function ThinkingIndicator({ label, capacity, progress }: Props) {
  const Icon = pickIcon(label)

  const dot = (i: number) => (
    <span
      key={i}
      className="inline-block w-1.5 h-1.5 rounded-full bg-jsc-accent"
      style={{
        animation: `thinking-bounce 1.2s ease-in-out infinite`,
        animationDelay: `${i * 0.2}s`,
      }}
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
      <Icon size={16} strokeWidth={2} className="text-white/50 shrink-0" />
      <span className="font-sans text-[0.82rem] text-white/60">{label}</span>
      <span className="flex items-center gap-1 ml-1">
        {dot(0)}{dot(1)}{dot(2)}
      </span>
      {cap && (
        <span
          className={`text-[0.55rem] font-mono px-1.5 py-0.5 rounded-full border ${cap.className}`}
          style={{
            animation: capacity === 'high'
              ? 'capacity-pulse-high 0.6s ease-in-out infinite'
              : capacity === 'medium'
              ? 'capacity-pulse-med 0.9s ease-in-out infinite'
              : 'capacity-pulse-low 1.2s ease-in-out infinite',
          }}
        >
          {cap.label}
        </span>
      )}
    </motion.div>
  )
}
