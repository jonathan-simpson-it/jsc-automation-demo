'use client'

import { useRef, useEffect, useCallback } from 'react'
import { Expand } from 'lucide-react'

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleFullscreen = useCallback(() => {
    const el = sectionRef.current?.querySelector('video')
    if (el) {
      if (el.requestFullscreen) el.requestFullscreen()
      else if ('webkitRequestFullscreen' in el) (el as HTMLVideoElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
    }
  }, [])

  // Auto-play on scroll
  useEffect(() => {
    const el = sectionRef.current
    const video = videoRef.current
    if (!el || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section">
      <div className="container-site">
        <div className="max-w-xl mb-10">
          <p className="section-eyebrow mb-3">See It in Action</p>
          <h2 className="font-serif text-[clamp(1.4rem,3.8vw,2rem)] tracking-[-0.01em] text-jsc-ink mb-3">
            33-Second Live Pipeline Execution
          </h2>
          <p className="text-jsc-muted text-[0.88rem] leading-relaxed">
            Watch the pipeline ingest data, verify identities, reconcile records, and dispatch audit results. Fully automated.
          </p>
        </div>

        <div className="video-app-frame mx-auto" style={{ maxWidth: 'min(100%, calc(55vh * 2530 / 1856))' }}>
          <div className="relative bg-[#161718]">
            <video
              ref={videoRef}
              src="/workflow-3-video.mp4"
              muted
              playsInline
              loop
              className="w-full h-auto block"
              aria-label="Pipeline workflow demo video"
            />

            {/* Fullscreen button — bottom-right overlay */}
            <button
              onClick={handleFullscreen}
              className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Expand full screen"
            >
              <Expand size={14} className="text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
