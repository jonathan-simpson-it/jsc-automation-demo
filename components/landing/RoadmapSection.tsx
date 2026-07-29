const budgetItems = [
  {
    label: 'R&D & Multi-Agent Pipeline Refinement',
    pct: 35,
    amount: 35000,
    description:
      'Iterative development of LLM orchestration, PII redaction engine, and SFC rule gate logic.',
  },
  {
    label: 'Independent Security & SFC Compliance Audit',
    pct: 30,
    amount: 30000,
    description:
      'Third-party penetration testing, data privacy certification, and regulatory submission prep.',
  },
  {
    label: 'Compliance Infrastructure & HK Virtual Servers',
    pct: 20,
    amount: 20000,
    description:
      'HK-based bare-metal nodes with ephemeral RAM execution environment, TLS-in-TLS gateway.',
  },
  {
    label: 'Targeted SME Client Acquisition Workshops',
    pct: 15,
    amount: 15000,
    description:
      'Sector-specific briefings for boutique asset managers, IAMs, and family offices in Central.',
  },
]

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="section">
      <div className="container-site">
        <div className="max-w-xl mb-10">
          <p className="section-eyebrow mb-3">Grant Deployment</p>
          <h2 className="font-serif text-[clamp(1.4rem,3.8vw,2rem)] tracking-[-0.01em] text-jsc-ink mb-3">
            CCMF — HKD 100,000 Budget Roadmap
          </h2>
          <p className="text-jsc-muted text-[0.88rem] leading-relaxed">
            Transparent 6-month allocation of the Cyberport Creative Micro Fund
            grant across engineering, compliance, infrastructure, and go-to-market.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {budgetItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[0.85rem] text-jsc-ink font-medium">
                  {item.label}
                </span>
                <span className="font-mono text-[0.85rem] text-jsc-ink tabular-nums">
                  {item.pct}% — HKD {item.amount.toLocaleString()}
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
