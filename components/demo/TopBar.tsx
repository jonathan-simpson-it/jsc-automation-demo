'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Workflow } from '@/lib/workflow-data'
import { siteConfig } from '@/config/siteConfig'

interface Props {
  workflows: Workflow[]
  activeIndex: number
  onSelect: (index: number) => void
  disabled: boolean
}

export default function TopBar({ workflows, activeIndex, onSelect, disabled }: Props) {
  return (
    <div className="flex-shrink-0 border-b border-jsc-line bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 h-14">
        <Link
          href="/"
          className="flex items-center gap-2 text-jsc-muted hover:text-jsc-ink transition-colors no-underline"
        >
          <ArrowLeft size={16} />
          <span className="font-sans text-[0.72rem] tracking-[0.04em] uppercase font-medium">
            {siteConfig.demo.backLabel}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {workflows.map((wf, i) => (
            <button
              key={wf.id}
              onClick={() => onSelect(i)}
              disabled={disabled}
              className={`px-3 py-1.5 rounded-full border text-[0.6rem] font-mono uppercase tracking-[0.06em] transition-all duration-200 cursor-pointer ${
                i === activeIndex
                  ? 'bg-jsc-accent/15 border-jsc-accent/50 text-jsc-accent shadow-[0_0_12px_rgba(128,152,143,0.15)]'
                  : 'border-jsc-line text-jsc-muted hover:border-jsc-accent/40 hover:text-jsc-ink'
              } ${disabled && i !== activeIndex ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {wf.label}
            </button>
          ))}
        </div>

        <div className="w-[72px]" />
      </div>
    </div>
  )
}
