export const siteConfig = {
  url: 'https://automation.jonathansimpson.co',
  brandName: 'Jonathan Simpson & Co.',
  shortName: 'JS&C',
  positioningStatement: 'Compliance-first Agentic AI for HK Finance',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/jonathan-simpson-co' },
    { label: 'Website', href: 'https://jonathansimpson.co' },
  ],
  primaryCta: {
    label: 'Book Consultation',
    href: 'https://jonathansimpson.co/#contact',
  },

  seo: {
    metadataBase: 'https://automation.jonathansimpson.co',
    lang: 'en',
    locale: 'en_HK',
    titleTemplate: '%s | JS&C Automation',
    defaultTitle: 'JS&C Automation — Zero-Data-Retention Agentic AI for HK Finance',
    defaultDescription:
      'Simulate ZDR multi-agent pipelines that eliminate junior analyst overhead while maintaining SFC, HKMA, and PCPD compliance. Built by Jonathan Simpson & Co.',
    defaultKeywords: [
      'AI automation Hong Kong',
      'agentic AI Hong Kong',
      'zero-data-retention AI',
      'SFC compliance automation',
      'Hong Kong finance automation',
      'ZDR multi-agent pipelines',
      'financial AI middleware Hong Kong',
    ],
    home: {
      keywords: [
        'AI automation Hong Kong',
        'agentic AI demo',
        'zero-data-retention AI pipeline',
        'SFC compliant AI',
        'HK finance automation',
      ],
      ogTitle: 'JS&C Automation — Zero-Data-Retention Agentic AI for HK Finance',
    },
    demo: {
      title: 'Agent Canvas',
      description:
        'Watch an AI agent execute multi-step financial workflows inline — document ingestion, sanctions screening, variance analysis, and dispatch. Zero-data-retention, SFC-compliant.',
      keywords: [
        'AI agent demo Hong Kong',
        'financial workflow automation demo',
        'SFC compliance demo',
        'agentic AI pipeline demo',
        'zero-data-retention demo',
      ],
      ogTitle: 'JS&C Automation — Agent Canvas Demo',
      ogDescription:
        'Inline AI agent stream-of-thought showing live tool execution, compliance checks, and financial data reconciliation.',
    },
    blog: {
      title: 'Blog',
      description:
        'Insights on SFC-compliant agentic AI, zero-data-retention architecture, and the future of middle-office automation in Hong Kong finance.',
      keywords: [
        'AI automation Hong Kong',
        'Hong Kong finance automation',
        'SFC compliance AI',
        'agentic AI Hong Kong',
        'zero-data-retention architecture',
        'financial AI blog',
      ],
    },
    blogPost: {
      ogTitleSuffix: '| JS&C Automation',
      authorName: 'Jonathan Simpson & Co.',
      publisherName: 'Jonathan Simpson & Co.',
    },
    canonical: '/',
    organization: {
      name: 'Jonathan Simpson & Co.',
      url: 'https://jonathansimpson.co',
      description:
        'Premium compliance-first Agentic AI middleware for SFC-licensed financial SMEs in Hong Kong.',
      addressLocality: 'Central',
      addressRegion: 'Hong Kong',
    },
    website: {
      name: 'JS&C Automation Demo',
      description:
        'Interactive demo of Zero-Data-Retention Agentic AI middleware for Hong Kong financial institutions.',
    },
    faq: [
      {
        question: 'What is Zero-Data-Retention Agentic AI?',
        answer:
          'ZDR Agentic AI processes client data in ephemeral RAM sandboxes. Raw data vanishes immediately after execution — no persistent storage, no third-party model training, full PCPD compliance.',
      },
      {
        question: 'Is this compliant with SFC regulations?',
        answer:
          'Yes. Our architecture includes mandatory Human-in-the-Loop validation gates, AI-vs-AI governance checks against SFC circulars, and cryptographic audit logs for every execution.',
      },
      {
        question: 'How much does a typical firm save?',
        answer:
          'Replacing one junior analyst FTE (HKD 580,000/year including overhead) with the JS&C Pro Tier (HKD 202,000/year all-in) saves HKD 378,000 per year — a 65% cost reduction.',
      },
    ],
    ogImage: {
      alt: 'JS&C Automation — Compliant Agentic AI for HK Finance',
      eyebrow: '2026 Strategic Briefing · Live Demo',
      title: 'JS&C Automation',
      subtitle1: 'Zero-Data-Retention Agentic AI pipelines for',
      subtitle2: 'SFC-licensed financial SMEs in Hong Kong',
      domain: 'jonathansimpson.co',
      badge: 'SFC · HKMA · PCPD Compliant',
    },
  },

  header: {
    navLinks: [
      { label: 'Demo', href: '/demo' },
      { label: 'Blog', href: '/blog' },
      { label: 'Connectors', href: '/#connectors' },
      { label: 'Pricing', href: '/#pricing' },
    ],
    ctaLabel: 'Book Consultation',
    logoAlt: 'Jonathan Simpson & Co.',
    brandText: 'Jonathan Simpson & Co.',
    menuOpenLabel: 'Open menu',
    menuCloseLabel: 'Close menu',
  },

  footer: {
    columnHeadings: {
      connect: 'Connect',
      explore: 'Explore',
      start: 'Start',
    },
    exploreLinks: [
      { label: 'Demo', href: '/demo' },
      { label: 'Connectors', href: '/#connectors' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Blog', href: '/blog' },
    ],
    copyright:
      'All rights reserved. This is a demonstration application. Reference pricing and pipeline simulations are for illustrative purposes only.',
  },

  hero: {
    eyebrow: '2026 Strategic Briefing & Live Demo',
    headline: ['Ask anything.', 'Store nothing.', 'Automate it all.'],
    headlineEmphasisIndex: 1,
    boldIntro: '70% operational cost reduction',
    subtext:
      'with private RAG chat and zero-data-retention automation pipelines for SFC-licensed firms — your data never leaves your control, and PCPD, SFC & HKMA compliance is built in from day one.',
    primaryCta: 'Watch the Pipelines Run',
    secondaryCta: 'Book a Consultation',
    badges: [
      '3-Year No-Junior-Hire Guarantee',
      '100% PCPD & SFC Compliant',
      '24/7/365 Automated',
    ],
  },

  ticker: {
    label: 'LIVE OPS',
    lines: [
      { time: '05:32:04', msg: 'HSBC NAV file ingested — 14 PII fields detected', status: 'info' },
      { time: '05:32:05', msg: 'PII redaction engine active — masking 14 fields', status: 'processing' },
      { time: '05:32:06', msg: 'Ephemeral sandbox 0x8F2A — RAM execution started', status: 'info' },
      { time: '05:32:07', msg: 'Variance check: 0.3 bps — within SFC 2.0 bps ✓', status: 'pass' },
      { time: '05:32:08', msg: 'Agent_Alpha: portfolio variance check ✓', status: 'pass' },
      { time: '05:32:08', msg: 'Agent_Beta: SFC Circular 24-XX output rule verified ✓', status: 'pass' },
      { time: '05:32:09', msg: 'SHA-256: e3b0c44… audit proof generated ✓', status: 'pass' },
      { time: '05:32:10', msg: 'Clean report dispatched to Xero + Slack ✓', status: 'pass' },
    ],
  },

  howItWorks: {
    eyebrow: 'The Pipeline Architecture',
    heading: 'Zero-Data-Retention in Four Steps',
    subtext:
      'Every pipeline follows the same architecture: ephemeral processing in a cryptographic sandbox with strict Human-in-the-Loop validation before any output reaches your approved systems.',
    stages: [
      {
        id: 1,
        label: 'Secure Ingest & Mask',
        sub: 'PII Redacted',
        tech: 'Local regex engine strips client PII (HKID, Name, Account #) before any payload leaves the perimeter.',
        benefit: 'Eliminates PCPD risk — prevents accidental data exposure to public LLMs.',
      },
      {
        id: 2,
        label: 'Ephemeral RAM Execution',
        sub: 'HK Virtual Node',
        tech: 'Payload processes inside encrypted, volatile RAM buffers on local HK/SG virtual nodes.',
        benefit: 'Zero data retention — data exists in memory only during execution and leaves 0 footprint.',
      },
      {
        id: 3,
        label: 'AI-vs-AI Governance',
        sub: 'SFC Rule Verified',
        tech: 'Multi-agent validation checks outputs against SFC Circular rules and custom tolerance thresholds.',
        benefit: 'Audit-ready accuracy — prevents AI hallucinations from reaching client-facing reports.',
      },
      {
        id: 4,
        label: 'Audit Dispatch',
        sub: 'SHA-256 Proof',
        tech: 'Clean report written back to Xero/Slack; RAM wiped; cryptographic proof logged.',
        benefit: 'Automated compliance proof — provides verifiable proof for internal and SFC regulators.',
      },
    ],
    ctaButton: 'Run the Full Interactive Demo →',
    cardLabels: {
      stagePrefix: 'Stage',
      underHood: 'What happens under the hood',
      whyMatters: 'Why it matters',
      paused: '[ Paused ]',
    },
  },

  video: {
    eyebrow: 'See It in Action',
    heading: '33-Second Live Pipeline Execution',
    subtext:
      'Watch the pipeline ingest data, verify identities, reconcile records, and dispatch audit results. Fully automated.',
    videoSrc: '/workflow-3-video.mp4',
    videoAriaLabel: 'Pipeline workflow demo video',
    fullscreenAriaLabel: 'Expand full screen',
  },

  pipeline: {
    stages: [
      { label: 'Ingest', sub: 'PDF / Transcript' },
      { label: 'ZDR RAM', sub: 'Ephemeral Sandbox' },
      { label: 'AI-vs-AI', sub: 'SFC Gate' },
      { label: 'Audit', sub: 'SHA-256 Proof' },
    ],
    ariaLabel:
      'Animated pipeline: data flows through four stages — ingest, ZDR RAM, AI-vs-AI verify, audit report',
    header: 'Pipeline Engine — Live',
    annotations: {
      left: 'Sources',
      center: 'ZDR encrypted',
      right: 'Destinations',
    },
  },

  connectors: {
    eyebrow: 'Universal Gateway',
    heading: 'Connector Matrix',
    subtext:
      'Pre-built integrations connecting directly to your stack. Select any tile to inspect the connected tools and how they support your pipeline.',
    ctaHeading: 'Need a proprietary in-house API connected?',
    ctaSubtext: 'We build custom connectors during onboarding.',
    ctaButton: 'Request a Connector →',
    modalLabels: {
      close: 'Close',
      description: 'Description',
      tools: 'Connected Tools',
      benefit: 'Pipeline Benefit',
      authentication: 'Authentication',
    },
    benefits: {
      custodian:
        'Portfolio valuations land in one place before markets open — no portal logins at 5:30 AM, no manual NAV chasing, no stale numbers in client reports.',
      aladdin:
        'NAV and market-value checks run against live benchmark data every cycle — position pulls and pricing lookups stop being a manual daily chore.',
      microsoft365:
        'Statements, spreadsheets, and alerts flow into the pipeline the moment they arrive — nothing waits on someone opening Outlook, and Excel workbooks are processed without a human touch.',
      google:
        'Invoices and statements move from inbox to pipeline automatically — no manual downloads, no missed attachments, no re-keying into spreadsheets.',
      omnichannel:
        'Exceptions reach the right person in seconds, wherever the team works — nothing gets lost in chat noise between Teams, Slack, and WhatsApp.',
      granola:
        'Decisions made in meetings turn into executed actions automatically — no one has to transcribe notes or chase follow-through.',
      notion:
        'Documentation always matches what the pipeline actually does — auditors and new hires see current runbooks, not outdated screenshots.',
      xero:
        'Month-end closes on time with anomalies flagged in advance — reconciliation no longer eats a week of finance-team hours.',
    } as Record<string, string>,
  },

  pricing: {
    eyebrow: 'Arbitrage Economics',
    heading: 'Headcount Replacement vs. Digital Analyst Retainers',
    subtext:
      'Slide your junior analyst headcount. The left panel prices the arbitrage; the right panel benchmarks our compliance-engineered retainers.',
    fteCalculatorLabel: 'Junior Analyst Calculator',
    fteSubtext: 'HK$580,000 fully-loaded cost per FTE',
    fteSliderAria: 'Number of FTEs',
    fteMinLabel: '1 FTE',
    fteMaxLabel: '5 FTEs',
    traditionalCostLabel: 'Traditional FTE Cost',
    proTierLabel: 'JS&C Pro Tier (all-in)',
    directSavingsLabel: 'Direct Savings',
    retainerPanelLabel: 'Estimated Consulting Retainers',
    retainerBadge: 'Custom Engineering Benchmark',
    retainerSubtext: 'Every deployment scoped following an SFC compliance diagnostic.',
    sweetSpotLabel: 'Sweet Spot',
    perMonthSuffix: '/mo',
    retainerCta: 'Book Workflow Diagnostic',
    footnote: 'Reference pricing serves as a benchmark for custom consulting scope.',
    tiers: [
      { name: 'Starter', subtitle: 'Foundation', monthly: 8000, setup: 12000, scope: '1 workflow · 1–5 staff', featured: false },
      { name: 'Core', subtitle: 'Growth', monthly: 12000, setup: 15000, scope: '3 workflows · 4–10 staff', featured: false },
      { name: 'Pro Tier', subtitle: 'Sweet Spot', monthly: 15000, setup: 22000, scope: '5 workflows · 10–25 staff', featured: true },
      { name: 'Scale', subtitle: 'Enterprise', monthly: 27000, setup: 0, scope: 'Unlimited workflows · 25+ staff', featured: false, custom: true },
    ],
    savingsPerFte: 580000,
    proAnnualCost: 202000,
  },

  roadmap: {
    eyebrow: 'Grant Deployment',
    heading: 'CCMF — HKD 100,000 Budget Roadmap',
    subtext:
      'Transparent 6-month allocation of the Cyberport Creative Micro Fund grant across engineering, compliance, infrastructure, and go-to-market.',
    items: [
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
    ],
  },

  ctaBand: {
    eyebrow: 'Ready to Eliminate Operational Friction',
    heading: 'Your compliance-first pipeline is one conversation away.',
    subtext:
      'Every JS&C solution is bespoke — mapped to your internal compliance matrix, custodian stack, and software architecture.',
    primaryCta: 'Book a Consultation',
    secondaryCta: 'Watch the Demo',
  },

  blog: {
    listingHeading: 'Latest Insights',
    listingSubtext:
      'SFC-compliant agentic AI, zero-data-retention architecture, and the future of middle-office automation in Hong Kong finance.',
    emptyState:
      'No posts yet. Check back soon for insights on AI and automation for Hong Kong finance.',
    emptyStateButton: 'Back to Home',
    readMore: 'Read more',
    breadcrumbLabels: {
      home: 'Home',
      blog: 'Blog',
    },
    collectionPageName: 'JS&C Automation Blog',
  },

  demo: {
    backLabel: 'JS&C',
    playAriaLabel: 'Play',
    pauseAriaLabel: 'Pause',
    replayAriaLabel: 'Replay',
    resetLabel: 'Reset',
    runPipeline: 'Run Pipeline',
    idleHelper: 'Or press Play in the controls bar below',
    completeLabel: 'Pipeline Complete',
    consultationCta: 'Book Consultation',
    capacityLabels: {
      low: 'LOW',
      medium: 'MED',
      high: 'HIGH',
    },
    canvasWorkflows: {
      'nav-recon': {
        title: 'Multi-Custodian NAV Consolidation',
        description:
          'Watch a ZDR-compliant agent pull custodial valuations from HSBC and UBS, cross-reference against BlackRock Aladdin benchmarks, and run SFC variance checks — all in a single ephemeral pipeline with zero data persisted.',
      },
      'teams-transcript': {
        title: 'Teams Transcript Automation',
        description:
          'Watch a ZDR-compliant agent pull a meeting transcript straight from Microsoft Teams via Graph API, cross-reference decisions against Outlook financial threads and OneDrive reports, and run multi-pass NLP — routing flagged items to human review.',
      },
      'rag-chatbot': {
        title: 'Private RAG Assistant',
        description:
          'Watch a ZDR-compliant private RAG assistant answer a question by linking your Excel risk policies, BlackRock Aladdin positions, and OneDrive compliance SOPs — masking PII, embedding in ephemeral RAM, and answering with grounded source citations.',
      },
    },
  },

  llmsTxt: `# JS&C Automation

JS&C Automation is a compliance-first Agentic AI middleware provider for SFC-licensed financial SMEs in Hong Kong.

## Description

Zero-Data-Retention (ZDR) multi-agent AI pipelines that process client data in ephemeral RAM sandboxes. Raw data vanishes immediately after execution — no persistent storage, no third-party model training, full PCPD compliance.

Key differentiators:
- ZDR (Zero-Data-Retention) architecture — data processed in ephemeral RAM, never stored
- AI-vs-AI governance — multi-agent validation against SFC circulars and HKMA guidelines
- Human-in-the-Loop validation gates on every workflow
- Cryptographic audit trails for SFC and HKMA compliance
- Hong Kong virtual node deployment
- Connectors for HK financial institutions (HSBC, UBS, Julius Baer, LGT, etc.)

## Use cases

- Multi-custodian daily statement reconciliation
- SFC and HKMA compliance filing preparation
- Client portfolio NAV and variance report generation
- Trade document and invoice ingestion (TSW Phase 3)
- Cross-border AML/KYC sanction list screening
- Sanctions screening and suspicious transaction reporting

## Pricing

Bespoke pricing per build. Each deployment includes:
- Setup and integration with existing systems
- Recurring backend/server hosting
- Ongoing compliance updates and support

Contact: https://jonathansimpson.co/#contact

## Links

- Homepage: https://automation.jonathansimpson.co
- Live Demo: https://automation.jonathansimpson.co/demo
- Blog: https://automation.jonathansimpson.co/blog
- Main site: https://jonathansimpson.co

## AI-readable endpoints

Markdown mirrors of key pages (serve full content without rendering):

- https://automation.jonathansimpson.co/home.md
- https://automation.jonathansimpson.co/demo.md
- https://automation.jonathansimpson.co/blog.md
- https://automation.jonathansimpson.co/pricing.md

Open Knowledge Format bundle (Google-backed, markdown with YAML frontmatter):

- https://automation.jonathansimpson.co/okf/index.md
- https://automation.jonathansimpson.co/okf/site.md
- https://automation.jonathansimpson.co/okf/demo.md
- https://automation.jonathansimpson.co/okf/blog.md
- https://automation.jonathansimpson.co/okf/pricing.md
`,

  pricingMd: `# Pricing — JS&C Automation

Pricing is bespoke per build. Each deployment includes setup, integration, and recurring infrastructure costs.

## Typical engagement

- **Setup & integration**: Custom quote based on scope
- **Recurring backend & server hosting**: Ongoing monthly fee
- **Compliance updates**: Included in recurring fee
- **Support**: Priority support during business hours (HK time)

## What's included

- Agentic AI pipeline deployment
- Connector integration with existing financial systems
- ZDR (Zero-Data-Retention) compliance architecture
- Human-in-the-Loop validation gates
- Cryptographic audit trail
- SFC/HKMA/PCPD compliance alignment
- Hong Kong virtual node deployment

## Next step

Book a consultation to discuss your specific requirements:
https://jonathansimpson.co/#contact
`,
}
