'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { Expand, Volume2, VolumeX } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const handleFullscreen = useCallback(() => {
    const el = sectionRef.current?.querySelector('video')
    if (el) {
      if (el.requestFullscreen) el.requestFullscreen()
      else if ('webkitRequestFullscreen' in el) (el as HTMLVideoElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
    }
  }, [])

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    if (!video.muted) video.volume = 1
    setIsMuted(video.muted)
    video.play().catch(() => {})
  }, [])

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
          <p className="section-eyebrow mb-3">{siteConfig.video.eyebrow}</p>
          <h2 className="font-serif text-[clamp(1.4rem,3.8vw,2rem)] tracking-[-0.01em] text-jsc-ink mb-3">
            {siteConfig.video.heading}
          </h2>
          <p className="text-jsc-muted text-[0.88rem] leading-relaxed">
            {siteConfig.video.subtext}
          </p>
        </div>

        <div className="video-app-frame mx-auto" style={{ maxWidth: 'min(100%, calc(65vh * 16 / 9))' }}>
          <div className="relative bg-[#f4f4ef]">
            <video
              ref={videoRef}
              src={siteConfig.video.videoSrc}
              muted
              playsInline
              loop
              className="w-full h-auto block"
              aria-label={siteConfig.video.videoAriaLabel}
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                onClick={handleToggleMute}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label={isMuted ? siteConfig.video.unmuteAriaLabel : siteConfig.video.muteAriaLabel}
              >
                {isMuted ? <VolumeX size={14} className="text-jsc-ink/70" /> : <Volume2 size={14} className="text-jsc-ink/70" />}
              </button>
              <button
                onClick={handleFullscreen}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label={siteConfig.video.fullscreenAriaLabel}
              >
                <Expand size={14} className="text-jsc-ink/70" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
