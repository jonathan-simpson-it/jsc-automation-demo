'use client'

import { motion } from 'motion/react'

interface Props {
  text: string
}

export default function AgentProse({ text }: Props) {
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
