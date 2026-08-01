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
  variant?: 'query'

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
          'detecting PII fields across both documents: 4 found',
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
          'Agent_Beta: verifying MNPI isolation: no client PII in consolidated output',
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
    id: 'teams-transcript',
    label: 'Teams Transcript',
    subtitle: 'Meeting transcript + financial records aggregation',
    steps: [
      {
        type: 'stage',
        delayBefore: 0,
        stageNum: '01',
        stageTitle: 'Transcript Capture via Graph API',
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Graph API webhook received: the Investment Committee briefing has concluded. Pulling the transcript directly from Teams and extracting decisions.',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Fetching meeting transcript via Microsoft Graph API...',
        thinkingDuration: 2000,
        capacity: 'medium',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'teams', name: 'MS Teams', action: 'Fetching transcript via Graph API: calls/records' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'meeting duration: 34 minutes, 6 participants identified',
          'extracting discussion segments: market outlook, portfolio review, risk limits',
          'detecting action items: 3 found, 2 flagged as high-priority',
          'archiving raw transcript to OneDrive compliance folder',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: 'Transcript ingested natively from Teams: no third-party meeting tool required. 3 action items detected, 2 high priority.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '02',
        stageTitle: 'Financial Record Cross-Reference',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Cross-referencing meeting decisions against Outlook financial threads and OneDrive reports...',
        thinkingDuration: 2200,
        capacity: 'medium',
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'outlook', name: 'Outlook', action: 'Scanning related email threads: 3 matches' },
        ],
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'onedrive', name: 'OneDrive', action: 'Opening Q2 position report attachment' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'scanning Outlook: 3 threads referencing HKEX liquidity and USDHKD peg',
          'opening OneDrive attachment: Q2_Position_Report.xlsx (412 KB)',
          'extracting figures: China stimulus exposure, HKEX volume trends',
          'detecting PII across emails: 1 field masked before processing',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: 'Cross-referenced 3 email threads and the Q2 position report. Market chatter clusters around HKEX liquidity and China stimulus.',
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
          'pass 1: entity extraction → HKEX, China stimulus, USDHKD peg, liquidity',
          'pass 2: sentiment classification → 10 positive, 3 neutral, 1 negative',
          'pass 3: agenda alignment scoring against committee decisions',
          'pass 4: contradiction detection → 1 misalignment flagged',
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
        text: '1 decision flagged as contradictory to email and report data: routing to Human-in-the-Loop for review. Remaining 2 actions auto-approved.',
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
        thinkingLabel: 'Assembling synthesis report with transcript summary, financial cross-reference, and flagged items...',
        thinkingDuration: 1500,
        capacity: 'low',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'teams', name: 'MS Teams', action: 'Posting synthesis report to #investment-committee' },
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
    id: 'rag-chatbot',
    label: 'Private RAG',
    subtitle: 'ZDR private knowledge assistant with retrieval-augmented generation',
    steps: [
      {
        type: 'stage',
        delayBefore: 0,
        stageNum: '01',
        stageTitle: 'Query & Source Link',
      },
      {
        type: 'prose',
        variant: 'query',
        delayBefore: 600,
        text: 'What is our China real estate exposure limit, and what does our current Aladdin position show?',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Parsing query intent → identified entities: China real estate, exposure limit, Aladdin position. Linking to approved knowledge sources...',
        thinkingDuration: 1800,
        capacity: 'medium',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'excel', name: 'Excel', action: 'Opening Risk_Policy_2026.xlsx (412 KB)' },
        ],
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'blackrock', name: 'BlackRock Aladdin', action: 'Fetching IBOR position export' },
        ],
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'onedrive', name: 'OneDrive', action: 'Fetching compliance SOP: client exposure limits' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'linked 3 sources: Risk_Policy_2026.xlsx, Aladdin IBOR export, OneDrive compliance SOP',
          'authenticating against vault credentials: session tokens rotated',
          'detecting PII fields across documents: 2 found',
          'applying redaction masks to all PII spans before any processing',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: '3 sources linked and authenticated. All PII masked before any content leaves the perimeter.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '02',
        stageTitle: 'ZDR Sanitize & Embed',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Chunking documents and computing embeddings inside ephemeral RAM sandbox...',
        thinkingDuration: 2600,
        capacity: 'high',
      },
      {
        type: 'subtasks',
        delayBefore: 400,
        subtasks: [
          'chunking 3 documents → 142 chunks (512 tokens each)',
          'computing embeddings in RAM sandbox 0x7C41: 0 bytes persisted',
          'building ephemeral retrieval index: cleared on session end',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: 'Chunks indexed in volatile memory only. No vector database, no cloud persistence: ZDR enforced end-to-end.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '03',
        stageTitle: 'Semantic Retrieval',
      },
      {
        type: 'thinking',
        delayBefore: 300,
        thinkingLabel: 'Running semantic search across 142 indexed chunks, ranking by cosine similarity...',
        thinkingDuration: 3000,
        capacity: 'high',
      },
      {
        type: 'subtasks',
        delayBefore: 400,
        subtasks: [
          'retrieved 5 chunks relevant to China real estate exposure',
          'chunk 037: Risk_Policy_2026.xlsx (similarity 0.94)',
          'chunk 102: Aladdin IBOR export (similarity 0.91)',
          'chunk 118: OneDrive compliance SOP (similarity 0.88)',
        ],
      },
      {
        type: 'output',
        delayBefore: 800,
        output: [
          { label: 'Policy Limit', value: '15% of NAV per sector' },
          { label: 'Current China RE Position', value: 'HKD 34.2M (11.8% of NAV)' },
          { label: 'Headroom', value: 'HKD 9.3M (3.2% of NAV)' },
          { label: 'Retrieved Chunks', value: '5 (top score 0.94)' },
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Top matches retrieved with high confidence. All cited chunks verified against source metadata before generation.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '04',
        stageTitle: 'Generation & Audit',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Composing grounded answer with inline citations from retrieved chunks...',
        thinkingDuration: 2000,
        capacity: 'medium',
      },
      {
        type: 'prose',
        delayBefore: 400,
        text: 'China real estate exposure is capped at 15% of NAV per the 2026 risk policy (chunk 037). Aladdin shows a current position of HKD 34.2M (11.8% of NAV, chunk 102), leaving HKD 9.3M of headroom. Figures cross-checked against the compliance SOP (chunk 118). No policy breach.',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'teams', name: 'MS Teams', action: 'Posting citation log to #compliance-alerts' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'generating SHA-256 audit proof → 5c1b9e8f2a4d...',
          'citation log appended: 3 sources, 5 chunks, 0 ungrounded claims',
          '[ZDR Gateway] Embedding buffer + index wiped. 0 bytes persisted to disk.',
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Pipeline complete. Answer grounded in 5 verified chunks. Estimated manual time saved: 25 minutes.',
      },
    ],
    completionMetric: 'Answer grounded in 5 verified chunks',
  },

  {
    id: 'stamp-ticketing',
    label: 'Stamp Pipeline',
    subtitle: 'Multi-tier approval pipeline with sequential sign-off and audit trail',
    steps: [
      {
        type: 'stage',
        delayBefore: 0,
        stageNum: '01',
        stageTitle: 'Ticket Submission & Chain Routing',
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'New work request STP-0013 filed by Emma Roberts: client deliverable sign-off. Building an ordered approval chain and routing to rung 1.',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Validating request, classifying work type, and compiling approval chain...',
        thinkingDuration: 1800,
        capacity: 'medium',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'outlook', name: 'Outlook', action: 'Routing submission to first approver' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 400,
        subtasks: [
          'generating ticket ID: STP-0013 · type: Deliverable',
          'building approval chain: Marcus Chen → Priya Natarajan → Jonathan Simpson',
          'setting SLA deadline: 48h from submission, no PII detected',
          'notifying rung 1: Marcus Chen · action required',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: 'Request filed and chain routed. Only one rung is live at a time - sequential, never parallel.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '02',
        stageTitle: 'Sequential Approvals',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Rung 1 in progress: Marcus Chen reviewing deliverables against scope and rate card...',
        thinkingDuration: 2400,
        capacity: 'medium',
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'excel', name: 'Excel', action: 'Cross-checking figures against fee schedule' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'rung 1 · Marcus Chen → Approved: "Clear and consistent with the rate card."',
          'advancing chain: rung 2 activated · Priya Natarajan',
          'rung 2 · Priya Natarajan → Approved: "No issues."',
          'advancing chain: rung 3 activated · Jonathan Simpson',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: 'Two of three rungs signed off. Every decision attributed, timestamped, and visible to the requester.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '03',
        stageTitle: 'Exception Handling',
      },
      {
        type: 'thinking',
        delayBefore: 300,
        thinkingLabel: 'Rung 3 flags scope mismatch. Routing an information request back to the requester...',
        thinkingDuration: 2800,
        capacity: 'high',
      },
      {
        type: 'tools',
        delayBefore: 400,
        tools: [
          { brandId: 'teams', name: 'MS Teams', action: 'Posting info request to #deliverables-review' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 400,
        subtasks: [
          'rung 3 · Jonathan Simpson → Request Info: "Scope exceeds brief - clarify sections 2-3."',
          'SLA paused while awaiting requester response (0 days elapsed)',
          'requester amends ticket and resubmits to same rung 3',
          'chain resumes: no rungs skipped, no approvals overridden',
        ],
      },
      {
        type: 'prose',
        delayBefore: 500,
        text: 'Exception handled without breaking the chain. The pipeline paused, resumed, and never lost its audit context.',
      },

      {
        type: 'stage',
        delayBefore: 800,
        stageNum: '04',
        stageTitle: 'Final Approval & Audit Trail',
      },
      {
        type: 'thinking',
        delayBefore: 200,
        thinkingLabel: 'Rung 3 approved - final sign-off. Dispatching deliverable and archiving the audit trail...',
        thinkingDuration: 2000,
        capacity: 'low',
      },
      {
        type: 'tools',
        delayBefore: 300,
        tools: [
          { brandId: 'slack', name: 'Slack', action: 'Posting confirmation to #compliance-alerts' },
        ],
      },
      {
        type: 'output',
        delayBefore: 700,
        output: [
          { label: 'Ticket', value: 'STP-0013 · Approved' },
          { label: 'Chain Rungs', value: '3 of 3 signed off' },
          { label: 'Info Requests', value: '1 (resolved)' },
          { label: 'Total SLA', value: '36h of 48h' },
          { label: 'Audit Trail', value: 'Complete · SHA-256' },
        ],
      },
      {
        type: 'subtasks',
        delayBefore: 300,
        subtasks: [
          'generating SHA-256 audit proof → 6f2b1c9d4e8a...',
          'dispatching approved deliverable to Xero ledger',
          'posting sign-off summary to #compliance-alerts',
        ],
      },
      {
        type: 'prose',
        delayBefore: 600,
        text: 'Pipeline complete. 3 approvals, 1 exception, 0 silent escalations. Estimated manual time saved: 2.5 hours.',
      },
    ],
    completionMetric: '3 approvals · 0 silent escalations',
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
