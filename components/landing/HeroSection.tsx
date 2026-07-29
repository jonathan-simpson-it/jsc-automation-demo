import PipelineDiagram from './PipelineDiagram'

export default function HeroSection() {
  return (
    <section className="section pt-10">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="section-eyebrow mb-4">
              2026 Strategic Briefing &amp; Live Demo
            </p>
            <h1 className="font-serif text-[clamp(2.4rem,7vw,4.8rem)] leading-[1.1] tracking-[-0.01em] text-jsc-ink mb-5">
              Automating the Hub:
              <br />
              Compliant Agentic AI
              <br />
              for HK Finance
            </h1>
            <p className="text-[clamp(0.88rem,1.8vw,1rem)] text-jsc-muted max-w-[34rem] leading-relaxed mb-6">
              <strong className="text-jsc-ink font-medium">70% operational cost reduction</strong>{' '}
              using Zero-Data-Retention multi-agent pipelines built for SFC-licensed
              SMEs — with full PCPD, SFC, and HKMA compliance from day one.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/demo" className="btn-primary">
                Watch the Pipelines Run
              </a>
              <a
                href="https://jonathansimpson.co/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Book a Consultation
              </a>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3 lg:mt-4">
              {['3-Year No-Junior-Hire Guarantee', '100% PCPD & SFC Compliant', '24/7/365 Automated'].map((b) => (
                <span
                  key={b}
                  className="text-[0.55rem] lg:text-[0.62rem] text-jsc-muted bg-jsc-accent-soft/40 border border-jsc-line/40 rounded-full px-2 lg:px-3 py-0.5 lg:py-1 font-mono uppercase tracking-[0.06em]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <PipelineDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
