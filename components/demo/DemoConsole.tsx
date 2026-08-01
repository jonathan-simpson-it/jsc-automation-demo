'use client'

import { useState, useCallback } from 'react'
import { workflows } from '@/lib/workflow-data'
import { useAgentEngine } from '@/lib/agent-engine'
import TopBar from './TopBar'
import CanvasStream from './CanvasStream'
import { siteConfig } from '@/config/siteConfig'

export default function DemoConsole() {
  const [workflowIndex, setWorkflowIndex] = useState(0)
  const workflow = workflows[workflowIndex]
  const { state, activeStep, stepProgress, play, pause, reset, setSpeed, startNew } =
    useAgentEngine(workflow)

  const togglePlay = useCallback(() => {
    if (state.status === 'complete') {
      startNew()
    } else if (state.status === 'running') {
      pause()
    } else {
      play()
    }
  }, [state.status, play, pause, startNew])

  const handleSelectWorkflow = useCallback(
    (idx: number) => {
      if (state.status === 'running') pause()
      setWorkflowIndex(idx)
      reset()
    },
    [state.status, pause, reset]
  )

  return (
    <div className="h-screen w-screen bg-jsc-bg flex flex-col text-jsc-ink overflow-hidden">
      <TopBar
        workflows={workflows}
        activeIndex={workflowIndex}
        onSelect={handleSelectWorkflow}
        disabled={state.status === 'running'}
      />

      <div className="flex-1 min-h-0">
        <CanvasStream
          workflow={workflow}
          visibleCount={state.visibleCount}
          activeIndex={state.activeIndex}
          stepProgress={stepProgress}
          status={state.status}
          onPlay={togglePlay}
        />
      </div>

      <div className="flex-shrink-0 border-t border-jsc-line bg-white">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full border border-jsc-line flex items-center justify-center hover:bg-jsc-accent-soft transition-colors cursor-pointer"
              aria-label={state.status === 'running' ? siteConfig.demo.pauseAriaLabel : state.status === 'complete' ? siteConfig.demo.replayAriaLabel : siteConfig.demo.playAriaLabel}
            >
              {state.status === 'running' ? (
                <span className="w-2.5 h-2.5 bg-jsc-ink block" />
              ) : (
                <span className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-jsc-ink border-b-[5px] border-b-transparent ml-0.5" />
              )}
            </button>

            {([0.5, 1, 2] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded text-[0.6rem] font-mono transition-colors cursor-pointer ${
                  state.speed === s
                    ? 'bg-jsc-accent/20 text-jsc-accent border border-jsc-accent/40'
                    : 'text-jsc-muted hover:text-jsc-ink border border-transparent'
                }`}
              >
                {s}x
              </button>
            ))}

            <button
              onClick={reset}
              disabled={state.status === 'idle'}
              className="px-2 py-1 rounded text-[0.6rem] font-mono text-jsc-muted hover:text-jsc-ink border border-transparent hover:border-jsc-line transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {siteConfig.demo.resetLabel}
            </button>

            {state.status !== 'idle' && (
              <span className="font-mono text-[0.6rem] text-jsc-muted/60 tabular-nums ml-2">
                {state.elapsedMs > 0
                  ? `${(state.elapsedMs / 1000).toFixed(1)}s`
                  : ''}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {state.status === 'complete' && (
              <>
                <span className="font-mono text-[0.65rem] text-jsc-accent">
                  {'\u26A1'} {workflow.completionMetric}
                </span>
                <a
                  href={siteConfig.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-jsc-ink text-white text-[0.65rem] font-mono uppercase tracking-[0.04em] font-medium hover:bg-jsc-muted transition-colors no-underline"
                >
                  {siteConfig.demo.consultationCta}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
