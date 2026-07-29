import Link from 'next/link'

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="max-w-lg mx-auto text-center">
          <p className="section-eyebrow">Blog</p>
          <h1 className="font-serif text-[clamp(1.6rem,4.5vw,3rem)] text-jsc-ink mt-4 leading-tight">
            Coming Soon
          </h1>
          <p className="text-jsc-muted text-[0.9rem] mt-4 leading-relaxed">
            Insights on SFC-compliant agentic AI, zero-data-retention architecture,
            and the future of middle-office automation in Hong Kong finance.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center min-h-[2.75rem] px-6 mt-8 text-[0.78rem]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
