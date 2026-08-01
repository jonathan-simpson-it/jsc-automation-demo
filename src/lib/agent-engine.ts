'use client'

import { useReducer, useRef, useEffect, useCallback } from 'react'
import type { Workflow } from './workflow-data'
import { precomputeTimings, getTotalDuration } from './workflow-data'

export interface AgentState {
  status: 'idle' | 'running' | 'paused' | 'complete'
  visibleCount: number
  activeIndex: number
  elapsedMs: number
  speed: 0.5 | 1 | 2
}

type Action =
  | { type: 'TICK'; delta: number }
  | { type: 'SET_SPEED'; speed: 0.5 | 1 | 2 }
  | { type: 'SET_STATUS'; status: AgentState['status'] }
  | { type: 'COMPLETE' }
  | { type: 'RESET' }
  | { type: 'SET_VISIBLE'; count: number; active: number }

const initState: AgentState = {
  status: 'idle',
  visibleCount: 0,
  activeIndex: -1,
  elapsedMs: 0,
  speed: 1,
}

function reducer(state: AgentState, action: Action): AgentState {
  switch (action.type) {
    case 'TICK':
      return { ...state, elapsedMs: state.elapsedMs + action.delta }
    case 'SET_VISIBLE':
      return { ...state, visibleCount: action.count, activeIndex: action.active }
    case 'SET_SPEED':
      return { ...state, speed: action.speed }
    case 'SET_STATUS':
      return { ...state, status: action.status }
    case 'COMPLETE':
      return { ...state, status: 'complete' }
    case 'RESET':
      return initState
  }
}

export function useAgentEngine(workflow: Workflow) {
  const [state, dispatch] = useReducer(reducer, initState)
  const rafRef = useRef(0)
  const lastTimeRef = useRef(0)
  const runningRef = useRef(false)
  const elapsedRef = useRef(0)
  const speedRef = useRef(1)
  const timingsRef = useRef(precomputeTimings(workflow.steps))
  const totalRef = useRef(getTotalDuration(workflow.steps))

  useEffect(() => {
    speedRef.current = state.speed
  }, [state.speed])

  useEffect(() => {
    timingsRef.current = precomputeTimings(workflow.steps)
    totalRef.current = getTotalDuration(workflow.steps)
    if (state.status !== 'running') {
      elapsedRef.current = 0
    }
  }, [workflow])

  const tick = useCallback((timestamp: number) => {
    if (!runningRef.current) return
    if (lastTimeRef.current === 0) lastTimeRef.current = timestamp

    const realDelta = Math.min(timestamp - lastTimeRef.current, 100)
    lastTimeRef.current = timestamp
    elapsedRef.current += realDelta * speedRef.current
    const elapsed = elapsedRef.current

    const timings = timingsRef.current
    let visibleCount = 0
    let activeIndex = -1
    for (let i = 0; i < timings.length; i++) {
      if (elapsed >= timings[i].revealAt) {
        visibleCount = i + 1
        if (elapsed < timings[i].completeAt) {
          activeIndex = i
        }
      }
    }

    dispatch({ type: 'SET_VISIBLE', count: visibleCount, active: activeIndex })
    dispatch({ type: 'TICK', delta: realDelta * speedRef.current })

    if (elapsed >= totalRef.current) {
      runningRef.current = false
      dispatch({ type: 'COMPLETE' })
      return
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const play = useCallback(() => {
    if (state.status === 'complete') {
      elapsedRef.current = 0
      lastTimeRef.current = 0
      dispatch({ type: 'RESET' })
      setTimeout(() => {
        dispatch({ type: 'SET_STATUS', status: 'running' })
        runningRef.current = true
        lastTimeRef.current = 0
        dispatch({ type: 'SET_VISIBLE', count: 0, active: -1 })
        rafRef.current = requestAnimationFrame(tick)
      }, 100)
      return
    }
    runningRef.current = true
    lastTimeRef.current = 0
    dispatch({ type: 'SET_STATUS', status: 'running' })
    dispatch({ type: 'SET_VISIBLE', count: 0, active: -1 })
    rafRef.current = requestAnimationFrame(tick)
  }, [state.status, tick])

  const pause = useCallback(() => {
    runningRef.current = false
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    dispatch({ type: 'SET_STATUS', status: 'paused' })
    dispatch({ type: 'SET_VISIBLE', count: state.visibleCount, active: -1 })
  }, [state.visibleCount])

  const reset = useCallback(() => {
    runningRef.current = false
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    elapsedRef.current = 0
    lastTimeRef.current = 0
    dispatch({ type: 'RESET' })
  }, [])

  const startNew = useCallback(() => {
    reset()
    setTimeout(() => play(), 100)
  }, [reset, play])

  const setSpeed = useCallback((speed: 0.5 | 1 | 2) => {
    dispatch({ type: 'SET_SPEED', speed })
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const activeStep = state.activeIndex >= 0 ? workflow.steps[state.activeIndex] : null
  const revealAt = state.activeIndex >= 0 ? timingsRef.current[state.activeIndex]?.revealAt || 0 : 0
  const stepProgress = state.elapsedMs - revealAt

  return {
    state: { ...state },
    activeStep,
    stepProgress,
    play,
    pause,
    reset,
    setSpeed,
    startNew,
  }
}
