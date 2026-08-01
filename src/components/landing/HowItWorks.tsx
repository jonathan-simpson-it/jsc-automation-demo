'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

const stages = siteConfig.howItWorks.stages
const STAGE_DURATION = 7000
const CYCLE_DURATION = STAGE_DURATION * 4

export default function HowItWorks() {
  const [active, setActive] = useState(1)
  const [interp, setInterp] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)
  const t0Ref = useRef(0)
  const pauseStartRef = useRef(0)
  const totalPauseRef = useRef(0)
  const seekRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const startFrame = useCallback(() => {
    t0Ref.current = 0
    totalPauseRef.current = 0
    pauseStartRef.current = 0

    const tick = (now: number) => {
      if (!t0Ref.current) {
        if (seekRef.current !== null) {
          t0Ref.current = now - seekRef.current
          seekRef.current = null
        } else {
          t0Ref.current = now
        }
      }
      if (pauseStartRef.current > 0) {
        totalPauseRef.current += now - pauseStartRef.current
        pauseStartRef.current = now
      }

      const elapsed = now - t0Ref.current - totalPauseRef.current
      const pct = (elapsed % CYCLE_DURATION) / CYCLE_DURATION
      const rawStage = pct * 4
      const s = Math.min(Math.floor(rawStage) + 1, 4)
      const i = rawStage - Math.floor(rawStage)

      setActive(s)
      setInterp(i)
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(4); setInterp(1)
      return
    }
    if (isVisible && !paused) {
      startFrame()
    } else {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [isVisible, paused, reduced, startFrame])

  const handleNodeClick = (id: number) => {
    seekRef.current = STAGE_DURATION * (id - 1)
    setActive(id)
    setInterp(0)
    setPaused(false)
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = 0
    startFrame()
  }

  const handleMouseEnter = () => {
    if (!reduced) setPaused(true)
  }

  const handleMouseLeave = () => {
    if (!reduced) setPaused(false)
  }

  const linePct = Math.min(((active - 1) + interp) / 3 * 75, 75)

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container-site">
        <div className="max-w-xl mb-12">
          <p className="section-eyebrow mb-3">{siteConfig.howItWorks.eyebrow}</p>
          <h2 className="font-serif text-[clamp(1.4rem,3.8vw,2rem)] tracking-[-0.01em] text-jsc-ink mb-3">
            {siteConfig.howItWorks.heading}
          </h2>
          <p className="text-jsc-muted text-[0.88rem] leading-relaxed">
            {siteConfig.howItWorks.subtext}
          </p>
        </div>

        <div className="relative mb-8">
          {!reduced && (
            <div className="absolute inset-x-0 top-[19px] h-[3px] pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
              <div
                className="absolute h-full"
                style={{ left: '12.5%', width: '75%', background: 'var(--color-jsc-line)', opacity: 0.5 }}
              />
              <div
                className="absolute h-full"
                style={{
                  left: '12.5%',
                  width: `${linePct}%`,
                  background: 'var(--color-jsc-accent)',
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-4 gap-2 relative" style={{ zIndex: 1 }}>
            {stages.map((stage) => {
              const isPassed = stage.id < active
              const isActive = active === stage.id
              let circleStyle: Record<string, string>
              let numColor: string
              let glow: string
              let scl: number

              if (isActive) {
                circleStyle = {
                  borderColor: 'var(--color-jsc-accent)',
                  backgroundColor: 'var(--color-jsc-accent)',
                }
                numColor = '#fff'
                glow = !reduced ? '0 0 12px rgba(174, 199, 189, 0.4)' : 'none'
                scl = 1.15
              } else if (isPassed) {
                circleStyle = {
                  borderColor: 'var(--color-jsc-accent)',
                  backgroundColor: 'var(--color-jsc-accent-soft)',
                }
                numColor = 'var(--color-jsc-ink)'
                glow = 'none'
                scl = 1
              } else {
                circleStyle = {
                  borderColor: 'var(--color-jsc-line)',
                  backgroundColor: 'var(--color-jsc-surface)',
                }
                numColor = 'var(--color-jsc-muted)'
                glow = 'none'
                scl = 1
              }

              return (
                <button
                  key={stage.id}
                  onClick={() => handleNodeClick(stage.id)}
                  className="flex flex-col items-center gap-2 cursor-pointer text-center"
                  aria-pressed={isActive}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                    style={{
                      ...circleStyle,
                      boxShadow: glow,
                      transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)',
                      transitionDuration: '500ms',
                      transitionProperty: 'background-color, border-color, box-shadow',
                    }}
                    animate={{ scale: scl }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    <span
                      className="font-mono text-sm font-medium"
                      style={{
                        color: numColor,
                        transition: 'color 500ms cubic-bezier(0.23,1,0.32,1)',
                      }}
                    >
                      {String(stage.id).padStart(2, '0')}
                    </span>
                  </motion.div>

                  <div className="hidden md:block">
                    <span
                      className={`font-sans text-[0.8rem] font-medium whitespace-nowrap transition-colors duration-300 ${
                        isActive ? 'text-jsc-ink' : 'text-jsc-muted'
                      }`}
                    >
                      {stage.label}
                    </span>
                    <br />
                    <span
                      className={`text-[0.65rem] uppercase tracking-[0.06em] whitespace-nowrap transition-colors duration-300 ${
                        isActive ? 'text-jsc-accent' : 'text-jsc-muted'
                      }`}
                    >
                      {stage.sub}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {!reduced && (
            <motion.div
              className="absolute top-0 pointer-events-none hidden md:block"
              style={{ zIndex: 0 }}
              animate={{
                left: `calc(12.5% + ${linePct}% - 6px)`,
                top: 17,
              }}
              transition={{ duration: 0 }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: 'var(--color-jsc-accent-glow)',
                  boxShadow: '0 0 8px rgba(174, 199, 189, 0.6)',
                }}
              />
            </motion.div>
          )}
        </div>

        <div className="panel-card p-6" style={{ overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-jsc-accent">
                  {siteConfig.howItWorks.cardLabels.stagePrefix} {String(active).padStart(2, '0')}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-jsc-muted">
                  : {stages[active - 1].label}
                </span>
                {paused && (
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-jsc-accent ml-auto">
                    {siteConfig.howItWorks.cardLabels.paused}
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <span className="text-[0.65rem] font-mono uppercase tracking-[0.08em] text-jsc-muted mb-1 block">
                    {siteConfig.howItWorks.cardLabels.underHood}
                  </span>
                  <p className="text-[0.85rem] text-jsc-ink leading-relaxed">
                    {stages[active - 1].tech}
                  </p>
                </div>
                <div>
                  <span className="text-[0.65rem] font-mono uppercase tracking-[0.08em] text-jsc-muted mb-1 block flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-jsc-accent" />
                    {siteConfig.howItWorks.cardLabels.whyMatters}
                  </span>
                  <p className="text-[0.85rem] text-jsc-ink leading-relaxed">
                    {stages[active - 1].benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8">
          <a href="/demo" className="btn-ghost">
            {siteConfig.howItWorks.ctaButton}
          </a>
        </div>
      </div>
    </section>
  )
}
