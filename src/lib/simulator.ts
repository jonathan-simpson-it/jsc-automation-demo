'use client'

import { useReducer, useCallback, useRef, useEffect } from 'react'
import type { WorkflowType } from './workflows'
import { formatTimestamp, generateHash } from './utils'

export type StepKey = 1 | 2 | 3 | 4
export type StepStatus = 'idle' | 'processing' | 'complete' | 'flagged'

export interface SimulatorState {
  activeWorkflow: WorkflowType
  currentStep: StepKey
  isExecuting: boolean
  stepStatuses: Record<StepKey, StepStatus>
  piiMaskCount: number
  executionHash: string
  logs: LogEntry[]
  elapsedMs: number
  isComplete: boolean
}

export interface LogEntry {
  id: string
  timestamp: string
  message: string
  level: 'info' | 'warn' | 'success' | 'system'
}

type SimulatorAction =
  | { type: 'START' }
  | { type: 'STEP_PROCESSING'; step: StepKey }
  | { type: 'STEP_COMPLETE'; step: StepKey; log?: string; flagged?: boolean }
  | { type: 'ADD_LOG'; entry: LogEntry }
  | { type: 'COMPLETE'; hash: string }
  | { type: 'RESET'; workflow: WorkflowType }
  | { type: 'SET_MASK_COUNT'; count: number }

const initialState: SimulatorState = {
  activeWorkflow: 'sfc_type9_nav',
  currentStep: 1,
  isExecuting: false,
  stepStatuses: { 1: 'idle', 2: 'idle', 3: 'idle', 4: 'idle' },
  piiMaskCount: 0,
  executionHash: '',
  logs: [],
  elapsedMs: 0,
  isComplete: false,
}

function simulatorReducer(state: SimulatorState, action: SimulatorAction): SimulatorState {
  switch (action.type) {
    case 'START':
      return {
        ...initialState,
        activeWorkflow: state.activeWorkflow,
        isExecuting: true,
        currentStep: 1,
        stepStatuses: { 1: 'processing', 2: 'idle', 3: 'idle', 4: 'idle' },
        logs: [
          {
            id: 'init',
            timestamp: formatTimestamp(new Date()),
            message: `Pipeline initiated: ${state.activeWorkflow}`,
            level: 'system',
          },
        ],
        piiMaskCount: 0,
        executionHash: '',
        elapsedMs: 0,
        isComplete: false,
      }
    case 'STEP_PROCESSING':
      return {
        ...state,
        currentStep: action.step,
        stepStatuses: { ...state.stepStatuses, [action.step]: 'processing' },
      }
    case 'STEP_COMPLETE':
      return {
        ...state,
        stepStatuses: {
          ...state.stepStatuses,
          [action.step]: action.flagged ? 'flagged' : 'complete',
        },
        ...(action.log
          ? {
              logs: [
                ...state.logs,
                {
                  id: `step-${action.step}-${Date.now()}`,
                  timestamp: formatTimestamp(new Date()),
                  message: action.log,
                  level: action.flagged ? 'warn' : 'success',
                },
              ],
            }
          : {}),
        ...(action.step < 4
          ? { currentStep: (action.step + 1) as StepKey, stepStatuses: { ...state.stepStatuses, [(action.step + 1) as StepKey]: 'processing' } }
          : {}),
      }
    case 'ADD_LOG':
      return {
        ...state,
        logs: [...state.logs, action.entry],
      }
    case 'COMPLETE':
      return {
        ...state,
        isExecuting: false,
        isComplete: true,
        executionHash: action.hash,
        stepStatuses: { ...state.stepStatuses, 4: 'complete' },
        logs: [
          ...state.logs,
          {
            id: `complete-${Date.now()}`,
            timestamp: formatTimestamp(new Date()),
            message: `Execution complete. SHA-256: ${action.hash.slice(0, 16)}...`,
            level: 'success',
          },
        ],
      }
    case 'RESET':
      return {
        ...initialState,
        activeWorkflow: action.workflow,
      }
    case 'SET_MASK_COUNT':
      return { ...state, piiMaskCount: action.count }
    default:
      return state
  }
}

export function useSimulator(initialWorkflow: WorkflowType = 'sfc_type9_nav') {
  const [state, dispatch] = useReducer(simulatorReducer, {
    ...initialState,
    activeWorkflow: initialWorkflow,
  })
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const isExecutingRef = useRef(false)
  const startTimeRef = useRef(0)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  const start = useCallback(
    (workflowDurationMs: number = 1000) => {
      isExecutingRef.current = true
      startTimeRef.current = Date.now()
      dispatch({ type: 'START' })

      const totalSteps = 4
      const stepDelays = [
        workflowDurationMs,
        workflowDurationMs * 1.2,
        workflowDurationMs * 1.2,
        workflowDurationMs * 1.0,
      ]

      let cumulativeDelay = 0

      for (let i = 0; i < totalSteps; i++) {
        const stepNum = (i + 1) as StepKey
        const entryDelay = cumulativeDelay + 100
        const completionDelay = cumulativeDelay + stepDelays[i]

        const processTimer = setTimeout(() => {
          if (!isExecutingRef.current) return
          dispatch({
            type: 'STEP_PROCESSING',
            step: stepNum,
          })
          dispatch({
            type: 'ADD_LOG',
            entry: {
              id: `proc-${stepNum}-${Date.now()}`,
              timestamp: formatTimestamp(new Date()),
              message: `Step ${stepNum} processing...`,
              level: 'info',
            },
          })
        }, entryDelay)
        timersRef.current.push(processTimer)

        const completeTimer = setTimeout(async () => {
          if (!isExecutingRef.current) return
          const elapsed = Date.now() - startTimeRef.current
          dispatch({ type: 'SET_MASK_COUNT', count: 4 })

          if (stepNum === 4) {
            const payload = `pipeline-${state.activeWorkflow}-${Date.now()}-${Math.random()}`
            const hash = await generateHash(payload)
            dispatch({ type: 'COMPLETE', hash })
            isExecutingRef.current = false
          } else {
            dispatch({
              type: 'STEP_COMPLETE',
              step: stepNum,
              log: `Step ${stepNum} complete (${elapsed}ms)`,
            })
          }
        }, completionDelay)
        timersRef.current.push(completeTimer)

        cumulativeDelay += stepDelays[i]
      }
    },
    [state.activeWorkflow, clearTimers]
  )

  const reset = useCallback(() => {
    clearTimers()
    isExecutingRef.current = false
    dispatch({ type: 'RESET', workflow: state.activeWorkflow })
  }, [state.activeWorkflow])

  const setWorkflow = useCallback(
    (workflow: WorkflowType) => {
      clearTimers()
      isExecutingRef.current = false
      dispatch({ type: 'RESET', workflow })
    },
    []
  )

  return { state, start, reset, setWorkflow }
}

export type SimulatorReturn = ReturnType<typeof useSimulator>
