export type WorkflowType = 'sfc_type9_nav' | 'sfc_type1_kyc' | 'sfc_type6_dd';
export type TriggerType = 'cron' | 'webhook' | 'manual';

export interface WorkflowStage {
  id: 1 | 2 | 3 | 4;
  label: string;
  description: string;
  durationMs: number;
}

export interface WorkflowDefinition {
  id: WorkflowType;
  label: string;
  description: string;
  sfcType: string;
  triggerType: TriggerType;
  triggerLabel: string;
  triggerEndpoint?: string;
  connectorIds: string[];
  stages: WorkflowStage[];
  mockFileName: string;
  piiFields: { label: string; value: string; masked: string }[];
}

export const workflows: WorkflowDefinition[] = [
  {
    id: 'sfc_type9_nav',
    label: 'Multi-Custodian NAV Consolidation',
    description:
      'Aggregates daily NAVs from HSBC, UBS, and Julius Baer portals. Extracts multi-currency valuation tables, redacts client PII, runs LLM portfolio variance analysis, and outputs a branded PDF summary by 07:30 HKT.',
    sfcType: 'Type 9',
    triggerType: 'cron',
    triggerLabel: '05:30 HKT · Daily',
    triggerEndpoint: 'POST /webhooks/custodian/nav',
    connectorIds: ['m365', 'custodian', 'aladdin', 'slack'],
    stages: [
      {
        id: 1,
        label: 'Secure Ingestion & Sanitization',
        description: 'Ingesting HSBC custodian NAV report. Redacting client PII...',
        durationMs: 1000,
      },
      {
        id: 2,
        label: 'Ephemeral RAM Processing',
        description: 'Processing NAV tables in HK virtual sandbox 0x8F2A...',
        durationMs: 1200,
      },
      {
        id: 3,
        label: 'Multi-Agent AI-vs-AI Governance',
        description: 'Agent_Alpha: Variance check vs Agent_Beta: SFC Rule Gate...',
        durationMs: 1200,
      },
      {
        id: 4,
        label: 'Non-PII Audit Dispatch',
        description: 'Generating SHA-256 proof. Dispatching clean report to shared workspace...',
        durationMs: 1000,
      },
    ],
    mockFileName: 'HSBC_Custodian_NAV_20260728.pdf',
    piiFields: [
      { label: 'Client Name', value: 'Lee Ka-shing Foundation', masked: '[REDACTED_PII_01]' },
      { label: 'HKID', value: 'X123456(7)', masked: '[REDACTED_PII_02]' },
      { label: 'Account No.', value: 'CUST-8823-HK', masked: '[REDACTED_PII_03]' },
      { label: 'Contact Phone', value: '+852 9123 4567', masked: '[REDACTED_PII_04]' },
    ],
  },
  {
    id: 'sfc_type1_kyc',
    label: 'Automated KYC/AML Screening',
    description:
      'Parses incoming client identity documents via Granola or Outlook webhook, cross-references against global sanctions watchlists, compiles a risk-scoring matrix, and routes exceptions to the Human-in-the-Loop queue.',
    sfcType: 'Type 1',
    triggerType: 'webhook',
    triggerLabel: 'Granola / Outlook · On Event',
    triggerEndpoint: 'POST /webhooks/kyc/ingest',
    connectorIds: ['granola', 'm365', 'slack'],
    stages: [
      {
        id: 1,
        label: 'Document Ingestion & PII Redaction',
        description: 'Parsing client identity documents via Granola. Masking HKID and passport numbers...',
        durationMs: 900,
      },
      {
        id: 2,
        label: 'Ephemeral RAM Matching',
        description: 'Cross-referencing against global sanctions and PEP lists in volatile memory...',
        durationMs: 1300,
      },
      {
        id: 3,
        label: 'AI-vs-AI Risk Scoring',
        description: 'Agent_Alpha: Sanctions match confidence vs Agent_Beta: AML rule engine...',
        durationMs: 1100,
      },
      {
        id: 4,
        label: 'Clean Dispatch & Audit Log',
        description: 'Risk score compiled. Routing low-risk to auto-approve. SHA-256 audit generated...',
        durationMs: 900,
      },
    ],
    mockFileName: 'Client_ID_Lam_Wing_Tung_20260728.pdf',
    piiFields: [
      { label: 'Full Name', value: 'Lam Wing-tung', masked: '[REDACTED_PII_01]' },
      { label: 'HKID', value: 'Y987654(3)', masked: '[REDACTED_PII_02]' },
      { label: 'Passport No.', value: 'PP123456789', masked: '[REDACTED_PII_03]' },
      { label: 'Date of Birth', value: '1985-03-14', masked: '[REDACTED_PII_04]' },
    ],
  },
  {
    id: 'sfc_type6_dd',
    label: 'Due Diligence & Bank Reconciliation',
    description:
      'Ingests batch bank statement PDFs via Xero webhook. Fuzzy-matches transaction entries against Xero ledger items, flags anomalies, and outputs a cryptographic audit trail for CCO sign-off.',
    sfcType: 'Type 6',
    triggerType: 'webhook',
    triggerLabel: 'Xero · On Batch Upload',
    triggerEndpoint: 'POST /webhooks/reconciliation/ingest',
    connectorIds: ['xero', 'custodian', 'discord'],
    stages: [
      {
        id: 1,
        label: 'Statement Ingestion & PII Masking',
        description: 'Ingesting HSBC bank statement PDF via Xero webhook. Masking account numbers...',
        durationMs: 1000,
      },
      {
        id: 2,
        label: 'Ephemeral Fuzzy Matching',
        description: 'Running fuzzy-match algorithm against Xero ledger entries in RAM sandbox...',
        durationMs: 1200,
      },
      {
        id: 3,
        label: 'AI-vs-AI Anomaly Detection',
        description: 'Agent_Alpha: Statement vs ledger variance vs Agent_Beta: SFC Type 6 rule check...',
        durationMs: 1100,
      },
      {
        id: 4,
        label: 'Audit Log Dispatch',
        description: 'Matched 47/48 entries. 1 anomaly flagged for HITL. SHA-256 proof generated...',
        durationMs: 1000,
      },
    ],
    mockFileName: 'HSBC_Business_Statement_20260728.pdf',
    piiFields: [
      { label: 'Account Name', value: 'Omega Capital Partners Ltd', masked: '[REDACTED_PII_01]' },
      { label: 'Account No.', value: '808-123456-789', masked: '[REDACTED_PII_02]' },
      { label: 'Transaction Ref', value: 'TT-20260728-HKD-500K', masked: '[REDACTED_PII_03]' },
      { label: 'Signatory', value: 'Dr. Chan Siu-kei', masked: '[REDACTED_PII_04]' },
    ],
  },
];

export function getWorkflow(id: WorkflowType): WorkflowDefinition {
  return workflows.find((w) => w.id === id)!;
}
