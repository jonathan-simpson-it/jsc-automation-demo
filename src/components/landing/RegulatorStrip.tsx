import { siteConfig } from '@/config/siteConfig'

const REGULATORS = [
  { src: '/regulators/hkma.png', alt: 'Hong Kong Monetary Authority' },
  { src: '/regulators/sfc.png', alt: 'Securities and Futures Commission' },
  { src: '/regulators/pcpd-logo.png', alt: 'Privacy Commissioner for Personal Data' },
]

export default function RegulatorStrip() {
  return (
    <section className="border-y border-jsc-line bg-white">
      <div className="container-site py-8">
        <div className="flex flex-col items-center gap-6">
          <p className="section-eyebrow text-center">
            {siteConfig.regulatorStrip.eyebrow}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {REGULATORS.map((r) => (
              <div
                key={r.src}
                className="flex items-center justify-center bg-white border border-jsc-line rounded-jsc-lg px-5 py-4"
              >
                <img
                  src={r.src}
                  alt={r.alt}
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="text-[0.68rem] text-jsc-muted text-center max-w-md leading-relaxed">
            {siteConfig.regulatorStrip.note}
          </p>
        </div>
      </div>
    </section>
  )
}
