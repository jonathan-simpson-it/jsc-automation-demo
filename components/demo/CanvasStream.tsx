'use client'

import { useRef, useEffect } from 'react'
import { Play } from 'lucide-react'
import type { Workflow } from '@/lib/workflow-data'
import StageIndicator from './StageIndicator'
import ThinkingIndicator from './ThinkingIndicator'
import AgentProse from './AgentProse'
import ToolPill from './ToolPill'
import SubTaskList from './SubTaskList'
import OutputSection from './OutputSection'

interface Props {
  workflow: Workflow
  visibleCount: number
  activeIndex: number
  stepProgress: number
  status: string
  onPlay?: () => void
}

const WORKFLOW_DESCRIPTIONS: Record<string, { title: string; description: string }> = {
  'nav-recon': {
    title: 'Multi-Custodian NAV Consolidation',
    description:
      'Watch a ZDR-compliant agent pull custodial valuations from HSBC and UBS, cross-reference against BlackRock Aladdin benchmarks, and run SFC variance checks \u2014 all in a single ephemeral pipeline with zero data persisted.',
  },
  'teams-synthesis': {
    title: 'Meeting & Sentiment Synthesis',
    description:
      'Watch an agent ingest meeting transcripts from Granola, mine MS Teams discussions, and run multi-pass NLP to detect sentiment contradictions \u2014 routing flagged items to human review.',
  },
  'kyc-recon': {
    title: 'KYC Identity & Bank Reconciliation',
    description:
      'Watch an agent verify HKID identity, screen against UN/OFAC/EU sanctions, validate HKMA/PCPD compliance, and reconcile 48 bank transactions against the Xero ledger \u2014 with a full audit trail.',
  },
}

export default function CanvasStream({ workflow, visibleCount, activeIndex, stepProgress, status, onPlay }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleCount, stepProgress])

  const visibleSteps = workflow.steps.slice(0, visibleCount)
  const info = WORKFLOW_DESCRIPTIONS[workflow.id]

  return (
    <div className="h-full overflow-y-auto scrollbar-hide px-6">
      <div className="max-w-3xl mx-auto py-6">
        {visibleSteps.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center max-w-lg">
              {info && (
                <>
                  <h2 className="font-sans text-[0.82rem] text-jsc-accent/80 font-medium tracking-[0.03em] mb-3">
                    {info.title}
                  </h2>
                  <p className="text-[0.85rem] leading-relaxed text-white/40 mb-6">
                    {info.description}
                  </p>
                </>
              )}
              <button
                onClick={onPlay}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-jsc-accent text-black text-[0.72rem] font-mono uppercase tracking-[0.06em] font-medium hover:bg-white transition-colors cursor-pointer mx-auto"
              >
                <Play size={14} strokeWidth={2} />
                Run Pipeline
              </button>
              <p className="font-mono text-[0.6rem] text-white/20 mt-4">
                Or press Play in the controls bar below
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {visibleSteps.map((step, i) => {
              const isActive = i === activeIndex && status === 'running'

              switch (step.type) {
                case 'stage':
                  return (
                    <StageIndicator
                      key={i}
                      stageNum={step.stageNum!}
                      stageTitle={step.stageTitle!}
                    />
                  )

                case 'thinking':
                  return (
                    <div key={i} className={isActive ? '' : 'opacity-60 transition-opacity duration-500'}>
                      <ThinkingIndicator
                        label={step.thinkingLabel || 'Thinking...'}
                        capacity={step.capacity}
                        progress={isActive ? stepProgress : (step.thinkingDuration || 2000)}
                      />
                    </div>
                  )

                case 'prose':
                  return (
                    <AgentProse key={i} text={step.text!} />
                  )

                case 'tools':
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      {step.tools!.map((tool, ti) => (
                        <ToolPill key={ti} tool={tool} />
                      ))}
                    </div>
                  )

                case 'subtasks':
                  return (
                    <SubTaskList key={i} items={step.subtasks!} />
                  )

                case 'output':
                  return (
                    <OutputSection key={i} rows={step.output!} />
                  )

                default:
                  return null
              }
            })}

            {status === 'complete' && (
              <div className="mt-8 flex items-center gap-2 text-jsc-accent/80">
                <span className="w-1.5 h-1.5 rounded-full bg-jsc-accent" />
                <span className="font-mono text-[0.65rem] tracking-[0.06em]">
                  Pipeline Complete
                </span>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
