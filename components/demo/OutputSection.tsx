'use client'

import { motion } from 'motion/react'
import type { OutputRow } from '@/lib/workflow-data'

interface Props {
  rows: OutputRow[]
}

export default function OutputSection({ rows }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="bg-white/[0.04] border border-white/10 rounded-xl p-5 my-3"
    >
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4"
          >
            <span className="font-mono text-[0.7rem] text-white/50 tracking-wider uppercase">
              {row.label}
            </span>
            <span className="font-mono text-[0.78rem] text-white font-medium tabular-nums">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
