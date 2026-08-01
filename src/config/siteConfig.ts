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
    defaultTitle: 'JS&C Automation | Zero-Data-Retention AI',
    defaultDescription:
      'Watch our automated pipeline ingest data, verify identities, reconcile records, and dispatch audit results - with zero data retention.',
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
      ogTitle: 'JS&C Automation | Zero-Data-Retention Agentic AI for HK Finance',
    },
    demo: {
      title: 'Agent Canvas',
      description:
        'Watch an AI agent execute multi-step financial workflows inline: document ingestion, sanctions screening, variance analysis, and dispatch. Zero-data-retention, SFC-compliant.',
      keywords: [
        'AI agent demo Hong Kong',
        'financial workflow automation demo',
        'SFC compliance demo',
        'agentic AI pipeline demo',
        'zero-data-retention demo',
      ],
      ogTitle: 'JS&C Automation | Agent Canvas Demo',
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
      name: 'JS&C Automation',
      alternateName: 'Jonathan Simpson & Co.',
      description:
        'Interactive demo of Zero-Data-Retention Agentic AI middleware for Hong Kong financial institutions.',
    },
    faq: [
      {
        question: 'What is Zero-Data-Retention Agentic AI?',
        answer:
          'ZDR Agentic AI processes client data in ephemeral RAM sandboxes. Raw data vanishes immediately after execution: no persistent storage, no third-party model training, full PCPD compliance.',
      },
      {
        question: 'Is this compliant with SFC regulations?',
        answer:
          'Yes. Our architecture includes mandatory Human-in-the-Loop validation gates, AI-vs-AI governance checks against SFC circulars, and cryptographic audit logs for every execution.',
      },
      {
        question: 'How much time does a typical firm save?',
        answer:
          'Typical clients cut 60-70% of the time spent on routine processing - reconciliation, report assembly, compliance checks - freeing analysts for client-facing and judgment work. Schedule a diagnostic for a tailored estimate.',
      },
    ],
    ogImage: {
      alt: 'JS&C Automation | Compliant Agentic AI for HK Finance',
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
      { label: 'Engagement', href: '/#engagement' },
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
      { label: 'Engagement', href: '/#engagement' },
      { label: 'Blog', href: '/blog' },
    ],
    copyright:
      'All rights reserved. This is a demonstration application. Pipeline simulations are for illustrative purposes only.',
  },

  hero: {
    eyebrow: '2026 Strategic Briefing & Live Demo',
    headline: ['Ask anything.', 'Store nothing.', 'Automate it all.'],
    headlineEmphasisIndex: 1,
    boldIntro: '70% less time on repetitive work',
    subtext:
      'with private RAG chat and zero-data-retention automation pipelines for SFC-licensed firms, with your data never leaving your control and PCPD, SFC & HKMA compliance built in from day one.',
    primaryCta: 'Watch the Pipelines Run',
    secondaryCta: 'Book a Consultation',
    badges: [
      'Juniors Do the Meaningful Work',
      '100% PCPD & SFC Compliant',
      '24/7/365 Automated',
    ],
  },

  ticker: {
    label: 'LIVE OPS',
    lines: [
      { time: '05:32:04', msg: 'HSBC NAV file ingested: 14 PII fields detected', status: 'info' },
      { time: '05:32:05', msg: 'PII redaction engine active: masking 14 fields', status: 'processing' },
      { time: '05:32:06', msg: 'Ephemeral sandbox 0x8F2A: RAM execution started', status: 'info' },
      { time: '05:32:07', msg: 'Variance check: 0.3 bps (within SFC 2.0 bps ✓)', status: 'pass' },
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
        benefit: 'Eliminates PCPD risk: prevents accidental data exposure to public LLMs.',
      },
      {
        id: 2,
        label: 'Ephemeral RAM Execution',
        sub: 'HK Virtual Node',
        tech: 'Payload processes inside encrypted, volatile RAM buffers on local HK/SG virtual nodes.',
        benefit: 'Zero data retention: data exists in memory only during execution and leaves 0 footprint.',
      },
      {
        id: 3,
        label: 'AI-vs-AI Governance',
        sub: 'SFC Rule Verified',
        tech: 'Multi-agent validation checks outputs against SFC Circular rules and custom tolerance thresholds.',
        benefit: 'Audit-ready accuracy: prevents AI hallucinations from reaching client-facing reports.',
      },
      {
        id: 4,
        label: 'Audit Dispatch',
        sub: 'SHA-256 Proof',
        tech: 'Clean report written back to Xero/Slack; RAM wiped; cryptographic proof logged.',
        benefit: 'Automated compliance proof: provides verifiable proof for internal and SFC regulators.',
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
    heading: 'Ask the Pipeline: 60-Second Demo',
    subtext:
      'Watch a Zero-Data-Retention agent answer live questions, pulling custodial valuations, screening sanctions lists, and routing exceptions to your sign-off. Fully automated.',
    videoSrc: '/jsc-agent-chat.mp4',
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
      'Animated pipeline: data flows through four stages: ingest, ZDR RAM, AI-vs-AI verify, audit report',
    header: 'Pipeline Engine: Live',
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
        'Portfolio valuations land in one place before markets open: no portal logins at 5:30 AM, no manual NAV chasing, no stale numbers in client reports.',
      aladdin:
        'NAV and market-value checks run against live benchmark data every cycle: position pulls and pricing lookups stop being a manual daily chore.',
      microsoft365:
        'Statements, spreadsheets, and alerts flow into the pipeline the moment they arrive: nothing waits on someone opening Outlook, and Excel workbooks are processed without a human touch.',
      google:
        'Invoices and statements move from inbox to pipeline automatically: no manual downloads, no missed attachments, no re-keying into spreadsheets.',
      omnichannel:
        'Exceptions reach the right person in seconds, wherever the team works: nothing gets lost in chat noise between Teams, Slack, and WhatsApp.',
      granola:
        'Decisions made in meetings turn into executed actions automatically: no one has to transcribe notes or chase follow-through.',
      notion:
        'Documentation always matches what the pipeline actually does: auditors and new hires see current runbooks, not outdated screenshots.',
      xero:
        'Month-end closes on time with anomalies flagged in advance: reconciliation no longer eats a week of finance-team hours.',
    } as Record<string, string>,
  },

  pricing: {
    eyebrow: 'Your Analysts, Amplified',
    heading: 'Your Analysts. Supercharged.',
    subtext:
      'Your team already has the judgment. Our pipelines handle the repetitive 80% of middle-office work - data ingestion, reconciliation, compliance checks, document processing - so your analysts stay focused on clients, decisions, and strategy.',
    valueCards: [
      {
        icon: 'users',
        title: 'Augment, don\u2019t replace',
        body:
          'Your analysts gain an AI co-pilot, not a pink slip. The repetitive work gets automated; the rewarding work stays human.',
      },
      {
        icon: 'trending-up',
        title: 'Pays for itself in weeks',
        body:
          'Most teams recover their investment within the first billing cycle. Fewer errors, faster turnaround, less rework.',
      },
      {
        icon: 'unplug',
        title: 'No lock-in, no minimums',
        body:
          'Start with one workflow. Scale when you\u2019re ready. Every engagement scoped to your compliance and workflow needs.',
      },
    ],
    valuePanelLabel: 'What Changes For Your Team',
    processLabel: 'How We Work With You',
    processSubtext:
      'Every engagement follows the same compliance-first path, tailored to your stack, your team, and your SFC obligations.',
    processSteps: [
      {
        num: '01',
        icon: 'message-circle',
        title: 'Free Diagnostic',
        body: 'A 30-minute call mapping your compliance matrix and operational bottlenecks.',
      },
      {
        num: '02',
        icon: 'file-search',
        title: 'Custom Scoping',
        body: 'We design pipelines around your custodian stack, obligations, and team size.',
      },
      {
        num: '03',
        icon: 'server',
        title: 'Deploy & Train',
        body: 'HK virtual node deployment, typically 2-4 weeks, with team onboarding included.',
      },
      {
        num: '04',
        icon: 'layers',
        title: 'Scale At Your Pace',
        body: 'Add workflows when you\u2019re ready. No repapering, no renegotiation, no lock-in.',
      },
    ],
    capabilityNote:
      'From a single workflow for boutique teams to enterprise-wide automation, every engagement is compliance-scoped to your operational reality.',
    retainerCta: 'Book a Free Diagnostic',
    footnote: 'Schedule a 30-minute compliance diagnostic - no commitment, no paperwork.',
  },

  roadmap: {
    eyebrow: 'Grant Deployment',
    heading: 'CCMF: 6-Month Deployment Roadmap',
    subtext:
      'Transparent 6-month allocation of the Cyberport Creative Micro Fund grant across engineering, compliance, infrastructure, and go-to-market.',
    items: [
      {
        label: 'R&D & Multi-Agent Pipeline Refinement',
        pct: 35,
        description:
          'Iterative development of LLM orchestration, PII redaction engine, and SFC rule gate logic.',
      },
      {
        label: 'Independent Security & SFC Compliance Audit',
        pct: 30,
        description:
          'Third-party penetration testing, data privacy certification, and regulatory submission prep.',
      },
      {
        label: 'Compliance Infrastructure & HK Virtual Servers',
        pct: 20,
        description:
          'HK-based bare-metal nodes with ephemeral RAM execution environment, TLS-in-TLS gateway.',
      },
      {
        label: 'Targeted SME Client Acquisition Workshops',
        pct: 15,
        description:
          'Sector-specific briefings for boutique asset managers, IAMs, and family offices in Central.',
      },
    ],
  },

  ctaBand: {
    eyebrow: 'Ready to Eliminate Operational Friction',
    heading: 'Your compliance-first pipeline is one conversation away.',
    subtext:
      'Every JS&C solution is bespoke: mapped to your internal compliance matrix, custodian stack, and software architecture.',
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
          'Watch a ZDR-compliant agent pull custodial valuations from HSBC and UBS, cross-reference against BlackRock Aladdin benchmarks, and run SFC variance checks, all in a single ephemeral pipeline with zero data persisted.',
      },
      'teams-transcript': {
        title: 'Teams Transcript Automation',
        description:
          'Watch a ZDR-compliant agent pull a meeting transcript straight from Microsoft Teams via Graph API, cross-reference decisions against Outlook financial threads and OneDrive reports, and run multi-pass NLP, routing flagged items to human review.',
      },
      'rag-chatbot': {
        title: 'Private RAG Assistant',
        description:
          'Watch a ZDR-compliant private RAG assistant answer a question by linking your Excel risk policies, BlackRock Aladdin positions, and OneDrive compliance SOPs, masking PII, embedding in ephemeral RAM, and answering with grounded source citations.',
      },
      'stamp-ticketing': {
        title: 'Stamp Approval Pipeline',
        description:
          'Watch the Stamp pipeline route a work request through an ordered chain of reviewers: ticket STP-0013 filed and classified, sequential rung-by-rung sign-off with attributed remarks, an information-request loop that pauses and resumes the chain, and a final approval with SHA-256 audit trail.',
      },
    },
  },

  llmsTxt: `# JS&C Automation

JS&C Automation is a compliance-first Agentic AI middleware provider for SFC-licensed financial SMEs in Hong Kong.

## Description

Zero-Data-Retention (ZDR) multi-agent AI pipelines that process client data in ephemeral RAM sandboxes. Raw data vanishes immediately after execution: no persistent storage, no third-party model training, full PCPD compliance.

Key differentiators:
- ZDR (Zero-Data-Retention) architecture: data processed in ephemeral RAM, never stored
- AI-vs-AI governance: multi-agent validation against SFC circulars and HKMA guidelines
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

## Engagement model

Bespoke engagement per build. Each deployment includes:
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

  pricingMd: `# Engagement | JS&C Automation

Every engagement is bespoke and scoped to your compliance and workflow needs. Each deployment includes setup, integration, and recurring infrastructure costs.

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
