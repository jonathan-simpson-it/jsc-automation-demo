import { siteConfig } from '@/config/siteConfig'

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="section">
      <div className="container-site">
        <div className="max-w-xl mb-10">
          <p className="section-eyebrow mb-3">{siteConfig.roadmap.eyebrow}</p>
          <h2 className="font-serif text-[clamp(1.4rem,3.8vw,2rem)] tracking-[-0.01em] text-jsc-ink mb-3">
            {siteConfig.roadmap.heading}
          </h2>
          <p className="text-jsc-muted text-[0.88rem] leading-relaxed">
            {siteConfig.roadmap.subtext}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {siteConfig.roadmap.items.map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[0.85rem] text-jsc-ink font-medium">
                  {item.label}
                </span>
                <span className="font-mono text-[0.85rem] text-jsc-ink tabular-nums">
                  {item.pct}% of grant
                </span>
              </div>
              <div className="relative h-5 bg-jsc-accent-soft rounded-full overflow-hidden border border-jsc-line">
                <div
                  className="h-full bg-jsc-accent rounded-full transition-all duration-700"
                  style={{
                    width: `${item.pct}%`,
                    transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)',
                  }}
                />
              </div>
              <p className="text-[0.75rem] text-jsc-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
