'use client'

import { useState, useCallback } from 'react'
import { workflows } from '@/lib/workflow-data'
import { useAgentEngine } from '@/lib/agent-engine'
import TopBar from './TopBar'
import CanvasStream from './CanvasStream'

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
    <div className="h-screen w-screen bg-[#0A0B0E] flex flex-col text-white overflow-hidden">
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

      {/* Controls bar */}
      <div className="flex-shrink-0 border-t border-white/10 bg-[#0D0F14]">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={state.status === 'running' ? 'Pause' : state.status === 'complete' ? 'Replay' : 'Play'}
            >
              {state.status === 'running' ? (
                <span className="w-2.5 h-2.5 bg-white block" />
              ) : (
                <span className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
              )}
            </button>

            {([0.5, 1, 2] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded text-[0.6rem] font-mono transition-colors cursor-pointer ${
                  state.speed === s
                    ? 'bg-jsc-accent/20 text-jsc-accent border border-jsc-accent/40'
                    : 'text-white/40 hover:text-white/70 border border-transparent'
                }`}
              >
                {s}x
              </button>
            ))}

            <button
              onClick={reset}
              disabled={state.status === 'idle'}
              className="px-2 py-1 rounded text-[0.6rem] font-mono text-white/40 hover:text-white/70 border border-transparent hover:border-white/20 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Reset
            </button>

            {state.status !== 'idle' && (
              <span className="font-mono text-[0.6rem] text-white/30 tabular-nums ml-2">
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
                  href="https://jonathansimpson.co/#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-jsc-accent text-black text-[0.65rem] font-mono uppercase tracking-[0.04em] font-medium hover:bg-white transition-colors no-underline"
                >
                  Book Consultation
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
