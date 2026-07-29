export interface ToolDef {
  brandId: string
  name: string
  action: string
}

export interface OutputRow {
  label: string
  value: string
}

export type StepType = 'stage' | 'thinking' | 'prose' | 'tools' | 'subtasks' | 'output'

export interface WorkflowStep {
  type: StepType
  delayBefore?: number

  stageNum?: string
  stageTitle?: string

  thinkingLabel?: string
  thinkingDuration?: number
  capacity?: 'low' | 'medium' | 'high'

  text?: string

  tools?: ToolDef[]

  subtasks?: string[]

  output?: OutputRow[]
}

export interface Workflow {
  id: string
  label: string
  subtitle: string
  steps: WorkflowStep[]
  completionMetric: string
}

export const workflows: Workflow[] = [
  {
    id: 'nav-recon',
    label: 'Portfolio NAV',
    subtitle: 'Multi-custodian NAV consolidation with SFC compliance',
    steps: [
      {
        type: 'stage',
        delayBefore: 0,
        stageNum: '01',
        stageTitle: 'Secure Ingestion & Extraction',
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Running the daily NAV consolidation pipeline. I need to pull the latest valuation reports from each custodian before I can compute the consolidated total.',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Initiating secure connections to custodial gateways...',
        thinkingDuration: 1500,
        capacity: 'low',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'hsbc', name: 'HSBC Securities', action: 'Connecting to SFTP gateway' },
        ],
      },
      {
        type: 'tools',
        delayBefore: 500,
        tools: [
          { brandId: 'ubs', name: 'UBS Wealth Mgmt', action: 'Connecting to REST API' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 400,
        subtasks: [
          'downloading HSBC_Custodian_NAV_20260728.pdf (214 KB)',
          'downloading UBS_Portfolio_Valuation_20260728.pdf (186 KB)',
          'detecting PII fields across both documents — 4 found',
          'applying redaction masks to all PII spans',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: 'Both custodial reports successfully ingested. 4 PII fields detected and redacted before any processing begins.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '02',
        stageTitle: 'Market Data Cross-Reference',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Cross-referencing custodial positions against BlackRock Aladdin benchmark data...',
        thinkingDuration: 2500,
        capacity: 'medium',
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'blackrock', name: 'BlackRock Aladdin', action: 'Pulling IBOR positions and risk analytics' },
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: 'Portfolio HK-0923 has 12 positions across HKD, USD, and SGD. Pulling Aladdin risk bounds to establish variance thresholds.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '03',
        stageTitle: 'Variance Engine & Compliance',
      },
      {
        type: 'thinking',
        delayBefore: 300,
        thinkingLabel: 'Computing NAV variance matrix across HSBC, UBS, and Aladdin benchmarks...',
        thinkingDuration: 3000,
        capacity: 'high',
      },
      {
        type: 'subtasks',
        delayBefore: 400,
        subtasks: [
          'Agent_Alpha: computing per-position variance across 3 custodians',
          'Agent_Alpha: identifying largest deltas and outliers',
          'Agent_Beta: evaluating SFC Circular 24-XX compliance rules',
          'Agent_Beta: verifying MNPI isolation — no client PII in consolidated output',
        ],
      },
      {
        type: 'output',
        delayBefore: 800,
        output: [
          { label: 'HSBC NAV', value: 'HKD 4,892,300' },
          { label: 'UBS NAV', value: 'HKD 2,145,600' },
          { label: 'Consolidated', value: 'HKD 8,710,000' },
          { label: 'Largest Variance', value: '0.3 bps' },
          { label: 'SFC Threshold', value: '2.0 bps ✓' },
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'All variance within SFC tolerance. No compliance flags raised. Report formatted and ready for dispatch.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '04',
        stageTitle: 'Audit Trail & Dispatch',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'slack', name: 'Slack', action: 'Posting confirmation to #compliance-alerts' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'generating SHA-256 audit proof → e3b0c44298fc1c149afbf4c8996fb924',
          'dispatching clean NAV report to Xero ledger',
          '[ZDR Gateway] Ephemeral RAM buffer wiped. 0 bytes persisted to disk.',
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Pipeline complete. 0 PII fields persisted to disk. Estimated manual time saved: 45 minutes.',
      },
    ],
    completionMetric: 'Estimated manual time saved: 45 mins',
  },

  {
    id: 'teams-synthesis',
    label: 'Teams & Granola',
    subtitle: 'Meeting transcript + live sentiment aggregation',
    steps: [
      {
        type: 'stage',
        delayBefore: 0,
        stageNum: '01',
        stageTitle: 'Meeting Transcript Ingestion',
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Webhook received from Granola — an Investment Committee briefing just concluded. Let me parse the full transcript and extract decisions.',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Extracting action items and key decisions from meeting transcript...',
        thinkingDuration: 2000,
        capacity: 'medium',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'granola', name: 'Granola', action: 'Ingesting Investment Committee Briefing transcript' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'meeting duration: 34 minutes — 6 participants identified',
          'extracting discussion segments: market outlook, portfolio review, risk limits',
          'detecting action items — 3 found, 2 flagged as high-priority',
          'classifying decisions: 4 binding, 1 advisory, 0 deferred',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: '6 participants, 3 action items detected. 2 high-priority actions require immediate cross-referencing with live team communications.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '02',
        stageTitle: 'Live Communication Mining',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Querying Microsoft Teams channels for related discussions...',
        thinkingDuration: 2000,
        capacity: 'medium',
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'teams', name: 'MS Teams', action: 'Querying Graph API — #market-updates, #investment-committee' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'fetching messages from past 24 hours across 2 channels',
          '14 messages retrieved from 4 active threads',
          'extracting references: HKEX liquidity, China stimulus, USDHKD peg',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: 'Retrieved 14 messages from 4 threads. Market chatter clusters around HKEX liquidity and China stimulus. Ready for sentiment analysis.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '03',
        stageTitle: 'Sentiment & Alignment Analysis',
      },
      {
        type: 'thinking',
        delayBefore: 300,
        thinkingLabel: 'Running multi-pass NLP pipeline: topic extraction, sentiment scoring, agenda alignment, contradiction detection...',
        thinkingDuration: 3000,
        capacity: 'high',
      },
      {
        type: 'subtasks',
        delayBefore: 400,
        subtasks: [
          'pass 1: entity extraction — HKEX, China stimulus, USDHKD peg, liquidity',
          'pass 2: sentiment classification — 10 positive, 3 neutral, 1 negative',
          'pass 3: agenda alignment scoring against committee decisions',
          'pass 4: contradiction detection — 1 misalignment flagged',
        ],
      },
      {
        type: 'output',
        delayBefore: 800,
        output: [
          { label: 'Meeting Alignment', value: '82%' },
          { label: 'Key Topics', value: 'Liquidity, Stimulus, FX' },
          { label: 'Action Items', value: '3 (2 auto-approved)' },
          { label: 'Sentiment Score', value: '+0.64 (Bullish)' },
          { label: 'Flagged', value: '1 item for review' },
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: '1 decision flagged as contradictory to market chatter — routing to Human-in-the-Loop for review. Remaining 2 actions auto-approved.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '04',
        stageTitle: 'Synthesis & Dispatch',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Assembling synthesis report with transcript summary, sentiment breakdown, and flagged items...',
        thinkingDuration: 1500,
        capacity: 'low',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'slack', name: 'Slack', action: 'Dispatching synthesis report to #investment-committee' },
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Pipeline complete. Context window closed. 1 item awaiting human review. Estimated manual time saved: 28 minutes.',
      },
    ],
    completionMetric: 'Estimated manual time saved: 28 mins',
  },

  {
    id: 'kyc-recon',
    label: 'KYC / Recon',
    subtitle: 'Automated identity verification + statement matching',
    steps: [
      {
        type: 'stage',
        delayBefore: 0,
        stageNum: '01',
        stageTitle: 'Document Intake & Classification',
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Webhook received from Outlook — new KYC package from compliance@custodian.com.hk. Classifying attachments and validating integrity.',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'outlook', name: 'Outlook', action: 'Parsing KYC email attachments' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'classifying Client_ID_Lam_Wing_Tung_20260728.pdf → KYC Identity Document (342 KB)',
          'classifying Sanctions_Screening_Report_20260728.pdf → AML Screening Report (98 KB)',
          'validating file integrity — checksums match expected values',
          'extracting subject name and document metadata for verification pipeline',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: '2 attachments classified and validated. Identity document ready for multi-jurisdiction verification. Proceeding to sanctions screening.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '02',
        stageTitle: 'Identity & Sanctions Verification',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Running multi-jurisdiction compliance checks — HKID, UN, OFAC, EU, PCPD...',
        thinkingDuration: 3000,
        capacity: 'high',
      },
      {
        type: 'subtasks',
        delayBefore: 400,
        subtasks: [
          'verifying HKID Y987654(3) — checksum valid, document not expired',
          'screening against UN consolidated sanctions list — no matches',
          'screening against OFAC SDN list — no matches',
          'screening against EU consolidated list — no matches',
          'validating data privacy compliance against HKMA / PCPD guidelines',
          'checking PEP status database — non-PEP classification',
          'computing aggregate risk score from 6 weighted signals',
        ],
      },
      {
        type: 'output',
        delayBefore: 800,
        output: [
          { label: 'Risk Score', value: '12/100 (Low)' },
          { label: 'Sanctions Matches', value: '0' },
          { label: 'HKMA / PCPD', value: 'Compliant' },
          { label: 'ID Verification', value: 'Passed' },
          { label: 'PEP Status', value: 'Non-PEP' },
          { label: 'Auto-Approval', value: 'Recommended' },
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Identity verified across all 3 sanctions frameworks plus HKMA/PCPD. Risk score 12/100 — low risk classification. Proceeding to financial reconciliation.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '03',
        stageTitle: 'Transaction Reconciliation',
      },
      {
        type: 'thinking',
        delayBefore: 300,
        thinkingLabel: 'Running fuzzy matching engine across 48 statement entries vs 47 ledger entries...',
        thinkingDuration: 3500,
        capacity: 'high',
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'hsbc', name: 'HSBC Banking', action: 'Downloading HSBC Business Statement — 48 entries' },
        ],
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'xero', name: 'Xero', action: 'Pulling Xero Ledger Export Jul 2026 — 47 entries' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'batch 1: matching 20 statement entries against ledger — 100% match',
          'batch 2: matching 20 statement entries against ledger — 95% match',
          'batch 3: matching 8 statement entries against ledger — 100% match',
          'anomaly detected: HKD 82,300 debit on 10 Jul — no corresponding ledger entry',
          'routing unmatched item to Human-in-the-Loop queue',
        ],
      },
      {
        type: 'output',
        delayBefore: 800,
        output: [
          { label: 'Transactions Matched', value: '47 / 48 (97.9%)' },
          { label: 'Anomalies Flagged', value: '1 (HKD 82,300)' },
          { label: 'Batch Confidence', value: '98.3%' },
          { label: 'HITL Queue', value: '1 item pending' },
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: '47 of 48 transactions matched at 90%+ confidence. One anomaly flagged — HKD 82,300 debit with no ledger counterpart. Sent to human review.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '04',
        stageTitle: 'Compliance Report & Dispatch',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Assembling final compliance package with full audit trail...',
        thinkingDuration: 1000,
        capacity: 'low',
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'generating SHA-256 audit proof → 9f86d081884c7d659a2feaa0c55ad015',
          'dispatching reconciliation report to compliance workspace',
        ],
      },
      {
        type: 'output',
        delayBefore: 800,
        output: [
          { label: 'Overall Risk Score', value: '12 / 100 (Low)' },
          { label: 'Sanctions Matches', value: '0' },
          { label: 'ID Verification', value: 'Passed' },
          { label: 'Transactions Matched', value: '47 / 48 (97.9%)' },
          { label: 'Anomalies Flagged', value: '1 (HKD 82,300)' },
          { label: 'Recommendation', value: 'Conditional Approval' },
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Pipeline complete. 1 item awaiting human review. Estimated manual time saved: 36 minutes.',
      },
    ],
    completionMetric: 'Estimated manual time saved: 36 mins',
  },
]

export function getContentDuration(step: WorkflowStep): number {
  switch (step.type) {
    case 'stage':
      return 400
    case 'thinking':
      return step.thinkingDuration || 2000
    case 'prose':
      return 400
    case 'tools':
      return 300 + (step.tools?.length || 0) * 150
    case 'subtasks':
      return 200 + (step.subtasks?.length || 0) * 250
    case 'output':
      return 500
  }
}

export function precomputeTimings(steps: WorkflowStep[]) {
  const timings: { revealAt: number; completeAt: number }[] = []
  let elapsed = 0
  for (const step of steps) {
    const delay = step.delayBefore || 0
    const revealAt = elapsed + delay
    const duration = getContentDuration(step)
    const completeAt = revealAt + duration
    timings.push({ revealAt, completeAt })
    elapsed = completeAt
  }
  return timings
}

export function getTotalDuration(steps: WorkflowStep[]): number {
  const timings = precomputeTimings(steps)
  return timings.length > 0 ? timings[timings.length - 1].completeAt : 0
}
