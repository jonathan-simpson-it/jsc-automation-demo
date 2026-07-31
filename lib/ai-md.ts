import { siteConfig } from '@/config/siteConfig'
import { blogPosts } from '@/content/blog/posts'

export function mdResponse(text: string) {
  return new Response(text, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex, follow',
    },
  })
}

export function okfFrontmatter(fields: {
  title: string
  description: string
  url: string
  updated?: string
}) {
  const lines = [
    '---',
    `title: ${fields.title}`,
    `description: ${fields.description}`,
    `url: ${fields.url}`,
    `updated: ${fields.updated || new Date().toISOString().slice(0, 10)}`,
    '---',
    '',
  ]
  return lines.join('\n')
}

export function buildHomeMd() {
  const c = siteConfig
  const sections: string[] = []

  sections.push(`# ${c.brandName} | ${c.seo.defaultTitle}`)
  sections.push('')
  sections.push(c.seo.defaultDescription)
  sections.push('')

  sections.push('## Overview')
  sections.push(`- **Positioning**: ${c.positioningStatement}`)
  sections.push(`- **Primary URL**: ${c.url}`)
  sections.push('')
  sections.push(c.hero.boldIntro + ' ' + c.hero.subtext)
  sections.push('')
  sections.push('Badges: ' + c.hero.badges.join(' · '))
  sections.push('')

  sections.push('## Zero-Data-Retention Architecture (4 stages)')
  sections.push('')
  for (const stage of c.howItWorks.stages) {
    sections.push(`### ${stage.id}. ${stage.label}: ${stage.sub}`)
    sections.push('')
    sections.push(stage.tech)
    sections.push('')
    sections.push(`Benefit: ${stage.benefit}`)
    sections.push('')
  }

  sections.push('## Connectors')
  sections.push('')
  for (const connector of [
    { name: 'Multi-Custodian Adapters', desc: 'HSBC, UBS, Julius Baer, LGT portal extraction' },
    { name: 'Portfolio & Market Data', desc: 'BlackRock Aladdin IBOR positions and risk analytics' },
    { name: 'Microsoft 365', desc: 'Outlook inbox monitoring, Excel workbook processing, Teams compliance alerts' },
    { name: 'Google Workspace', desc: 'Gmail attachment parsing with Google Sheets and Docs extraction' },
    { name: 'Omnichannel Comms', desc: 'Teams, Slack, WhatsApp chat thread ingestion' },
    { name: 'AI Meeting Intelligence', desc: 'Granola meeting notes and transcript ingestion' },
    { name: 'Knowledge & SOPs', desc: 'Notion SOP synchronization and audit archival' },
    { name: 'Accounting & ERP Ledger', desc: 'Xero bank reconciliation and anomaly flagging' },
  ]) {
    sections.push(`- **${connector.name}**: ${connector.desc}`)
  }
  sections.push('')

  sections.push('## Pricing model')
  sections.push('')
  sections.push('Bespoke per build: setup/integration quote plus recurring backend and server hosting fee. Benchmark retainers for reference:')
  sections.push('')
  for (const tier of c.pricing.tiers) {
    sections.push(
      `- **${tier.name}** (${tier.subtitle}): ${tier.scope}, ${tier.custom ? 'custom' : `HKD ${tier.monthly.toLocaleString()}/month`}`
    )
  }
  sections.push('')

  sections.push('## CCMF Grant Roadmap')
  sections.push('')
  for (const item of c.roadmap.items) {
    sections.push(`- **${item.label}** (${item.pct}%, HKD ${item.amount.toLocaleString()}): ${item.description}`)
  }
  sections.push('')

  sections.push('## FAQ')
  sections.push('')
  for (const item of c.seo.faq) {
    sections.push(`### ${item.question}`)
    sections.push('')
    sections.push(item.answer)
    sections.push('')
  }

  sections.push('## Contact')
  sections.push('')
  sections.push(`Book a consultation: ${c.primaryCta.href}`)
  sections.push('')

  return sections.join('\n')
}

export function buildDemoMd() {
  const c = siteConfig
  const sections: string[] = []

  sections.push(`# Live Demo: ${c.seo.demo.title}`)
  sections.push('')
  sections.push(c.seo.demo.description)
  sections.push('')
  sections.push(`Demo URL: ${c.url}/demo`)
  sections.push('')

  sections.push('## Workflows')
  sections.push('')
  for (const [id, wf] of Object.entries(c.demo.canvasWorkflows)) {
    sections.push(`### ${wf.title} (${id})`)
    sections.push('')
    sections.push(wf.description)
    sections.push('')
  }

  sections.push('## What you can watch')
  sections.push('')
  sections.push('- Document ingestion and PII redaction in real time')
  sections.push('- Multi-agent AI-vs-AI governance checks against SFC rules')
  sections.push('- Ephemeral RAM execution with zero data persisted to disk')
  sections.push('- SHA-256 audit proof generation on dispatch')
  sections.push('- Human-in-the-Loop review routing for flagged items')
  sections.push('')

  return sections.join('\n')
}

export function buildBlogMd() {
  const c = siteConfig
  const sections: string[] = []

  sections.push(`# Blog | ${c.brandName}`)
  sections.push('')
  sections.push(c.seo.blog.description)
  sections.push('')
  sections.push(`Blog URL: ${c.url}/blog`)
  sections.push('')

  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (posts.length === 0) {
    sections.push('No posts published yet.')
    sections.push('')
  } else {
    sections.push('## Posts')
    sections.push('')
    for (const post of posts) {
      sections.push(`### ${post.title}`)
      sections.push('')
      sections.push(`- Published: ${post.date}`)
      sections.push(`- URL: ${c.url}/blog/${post.slug}`)
      sections.push(`- Markdown mirror: ${c.url}/blog/${post.slug}/blog.md`)
      sections.push(`- OKF mirror: ${c.url}/okf/blog/${post.slug}/blog.md`)
      sections.push('')
      sections.push(post.description)
      sections.push('')
    }
  }

  return sections.join('\n')
}

export function buildOkfIndexMd() {
  const c = siteConfig
  const updated = new Date().toISOString().slice(0, 10)

  const body = `# JS&C Automation: Open Knowledge Bundle

${c.seo.defaultDescription}

This bundle describes the site in machine-readable markdown. Each file covers one page.

## Files

- [site.md](/okf/site.md): ${c.hero.headline.join(' ')} (homepage)
- [demo.md](/okf/demo.md): ${c.seo.demo.ogTitle}
- [blog.md](/okf/blog.md): Blog listing and per-post mirrors
- [pricing.md](/okf/pricing.md): Pricing model

## See also

- [llms.txt](/llms.txt): plain-text site overview
- [pricing.md](/pricing.md): pricing for AI agents
- [Homepage](/)

Contact: ${c.primaryCta.href}
`

  return okfFrontmatter({
    title: 'JS&C Automation: Open Knowledge Bundle',
    description: c.seo.defaultDescription,
    url: `${c.url}/okf/index.md`,
    updated,
  }) + body
}

export function buildOkfSiteMd() {
  const c = siteConfig
  const updated = new Date().toISOString().slice(0, 10)

  const body = buildHomeMd()

  return okfFrontmatter({
    title: c.seo.defaultTitle,
    description: c.seo.defaultDescription,
    url: `${c.url}/okf/site.md`,
    updated,
  }) + body
}

export function buildOkfDemoMd() {
  const c = siteConfig
  const updated = new Date().toISOString().slice(0, 10)

  const body = buildDemoMd()

  return okfFrontmatter({
    title: c.seo.demo.ogTitle,
    description: c.seo.demo.ogDescription,
    url: `${c.url}/okf/demo.md`,
    updated,
  }) + body
}

export function buildOkfBlogMd() {
  const c = siteConfig
  const updated = new Date().toISOString().slice(0, 10)

  const body = buildBlogMd()

  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const postIndex = posts.length
    ? `\n## Individual post files\n\n${posts
        .map((post) => `- [${post.title}](${c.url}/okf/blog/${post.slug}/blog.md)`)
        .join('\n')}\n`
    : ''

  return okfFrontmatter({
    title: `Blog | ${c.brandName}`,
    description: c.seo.blog.description,
    url: `${c.url}/okf/blog.md`,
    updated,
  }) + body + postIndex
}

export function buildOkfPricingMd() {
  const c = siteConfig
  const updated = new Date().toISOString().slice(0, 10)

  const body = c.pricingMd

  return okfFrontmatter({
    title: 'Pricing | JS&C Automation',
    description: 'Bespoke pricing per build with recurring infrastructure fees.',
    url: `${c.url}/okf/pricing.md`,
    updated,
  }) + body
}
