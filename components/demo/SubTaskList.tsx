'use client'

import { motion } from 'motion/react'

interface Props {
  items: string[]
}

export default function SubTaskList({ items }: Props) {
  return (
    <div className="border-l border-white/10 ml-4 pl-4 my-2 space-y-1">
      {items.map((item, i) => {
        const isZdr = item.startsWith('[ZDR Gateway]')
        const isAgent = item.startsWith('Agent_')
        const isBatch = item.startsWith('batch') || item.startsWith('pass')

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: i * 0.12,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <span
              className={`font-mono text-[0.72rem] leading-relaxed flex items-start gap-2 ${
                isZdr
                  ? 'text-jsc-accent drop-shadow-[0_0_6px_rgba(128,152,143,0.4)]'
                  : isAgent
                  ? 'text-white/70'
                  : isBatch
                  ? 'text-white/60'
                  : 'text-white/50'
              }`}
            >
              <span className="text-white/20 select-none mt-px">&gt;</span>
              {item}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
