'use client'

import { motion } from 'motion/react'
import { Search } from 'lucide-react'

interface Props {
  text: string
  variant?: 'query' | 'default'
}

export default function AgentProse({ text, variant = 'default' }: Props) {
  if (variant === 'query') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="my-3 border border-jsc-accent/25 bg-jsc-accent/[0.07] rounded-lg px-4 py-3"
      >
        <div className="flex items-start gap-3">
          <Search size={15} strokeWidth={2} className="text-jsc-accent shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-jsc-accent/70 mb-1.5">
              Query
            </span>
            <p className="text-[0.9rem] leading-relaxed text-white/90">{text}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className="text-[0.9rem] leading-relaxed text-gray-300/90 my-2 max-w-prose"
    >
      {text}
    </motion.p>
  )
}
