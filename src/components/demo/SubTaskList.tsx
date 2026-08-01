'use client'

import { motion } from 'motion/react'

interface Props {
  items: string[]
}

export default function SubTaskList({ items }: Props) {
  return (
    <div className="border-l border-jsc-line ml-4 pl-4 my-2 space-y-1">
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
                  ? 'text-[#4d665c]'
                  : isAgent
                  ? 'text-jsc-ink/80'
                  : isBatch
                  ? 'text-jsc-muted'
                  : 'text-jsc-muted/80'
              }`}
            >
              <span className="text-jsc-muted/40 select-none mt-px">&gt;</span>
              {item}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
