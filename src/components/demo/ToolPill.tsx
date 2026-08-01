'use client'

import { motion } from 'motion/react'
import { BrandIcon, getBrand } from '@/lib/brands'
import type { ToolDef } from '@/lib/workflow-data'

interface Props {
  tool: ToolDef
}

function hexLuminance(hex: string): number {
  const c = hex.replace('#', '')
  if (c.length < 6) return 0.5
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  return 0.299 * r + 0.587 * g + 0.114 * b
}

export default function ToolPill({ tool }: Props) {
  const brand = getBrand(tool.brandId)
  const color = brand?.hex || '#80988f'
  const luminance = hexLuminance(color)
  const textColor = luminance < 0.15 ? '#4B5563' : color

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-2 bg-white border border-jsc-line rounded-lg px-3 py-1.5 w-fit my-1.5"
      style={{
        borderColor: `${color}66`,
        boxShadow: `0 0 12px ${color}22`,
      }}
    >
      <span
        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
        style={{
          background: brand?.multiColor ? 'rgba(0,0,0,0.05)' : `${color}33`,
        }}
      >
        <BrandIcon id={tool.brandId} size={12} className={brand?.multiColor ? '' : 'text-jsc-ink'} />
      </span>
      <span className="font-sans text-[0.8rem] font-medium text-jsc-ink/90">{tool.name}</span>
      <span
        className="font-mono text-[0.65rem]"
        style={{ color: textColor }}
      >
        {tool.action}
      </span>
    </motion.div>
  )
}
