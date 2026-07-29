'use client'

import { motion } from 'motion/react'

interface Props {
  stageNum: string
  stageTitle: string
}

export default function StageIndicator({ stageNum, stageTitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-3 mt-8 mb-2"
    >
      <span className="font-mono text-[0.7rem] tracking-[0.08em] text-jsc-accent/80 px-2.5 py-1 rounded-full border border-jsc-accent/30 bg-jsc-accent/10 shadow-[0_0_12px_rgba(128,152,143,0.15)]">
        [ {stageNum} ]
      </span>
      <span className="font-sans text-[0.82rem] text-white/50 tracking-[0.02em] font-medium">
        {stageTitle}
      </span>
    </motion.div>
  )
}
