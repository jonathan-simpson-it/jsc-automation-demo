export interface DocumentArtifact {
  id: string
  fileName: string
  receivedAt: string
  sizeKB: number
  type: 'pdf' | 'xlsx'
  source: string
  summary: string
  docLines: string[]
  piiSpans: { lineIndex: number; start: number; end: number; label: string }[]
}

export interface AgentCheck {
  agent: 'alpha' | 'beta'
  label: string
  result: 'pass' | 'flag' | 'warn'
  detail: string
}

export interface OutputReport {
  title: string
  summary: string
  rows: { label: string; value: string }[]
}

export interface ExtendedWorkflowData {
  id: string
  artifacts: DocumentArtifact[]
  agentChecks: AgentCheck[]
  outputReport: OutputReport
}

const outputReports: Record<string, OutputReport> = {
  sfc_type9_nav: {
    title: 'Multi-Custodian NAV Summary',
    summary: 'Consolidated portfolio valuation across 3 custodians. All variances within SFC tolerance thresholds. Ready for CCO review.',
    rows: [
      { label: 'HSBC Total NAV', value: 'HKD 4,892,300.00' },
      { label: 'UBS Total NAV', value: 'HKD 2,145,600.00' },
      { label: 'Julius Baer Total NAV', value: 'HKD 1,672,100.00' },
      { label: 'Consolidated NAV', value: 'HKD 8,710,000.00' },
      { label: 'Largest Variance', value: '0.3 bps (HSBC vs UBS)' },
      { label: 'SFC Threshold', value: '2.0 bps ✓' },
      { label: 'Currency', value: 'HKD / USD / SGD' },
    ],
  },
  sfc_type1_kyc: {
    title: 'KYC / AML Risk Assessment',
    summary: 'Client identity verified against 3 watchlists. Low-risk classification. Recommended: auto-approve with standard monitoring.',
    rows: [
      { label: 'Client Name', value: 'Lam Wing-tung' },
      { label: 'Risk Score', value: '12 / 100 (Low)' },
      { label: 'Sanctions Match', value: 'None ✓' },
      { label: 'PEP Status', value: 'Non-PEP ✓' },
      { label: 'Adverse Media', value: 'None found ✓' },
      { label: 'ID Verification', value: 'Passed ✓' },
      { label: 'Review Required', value: 'No, auto-approved' },
    ],
  },
  sfc_type6_dd: {
    title: 'Bank Statement Reconciliation',
    summary: '47 of 48 transactions matched to Xero ledger. 1 anomaly flagged for manual review. Audit trail generated.',
    rows: [
      { label: 'Total Transactions', value: '48' },
      { label: 'Matched', value: '47 (97.9%)' },
      { label: 'Unmatched', value: '1 (flagged)' },
      { label: 'Total Value Matched', value: 'HKD 3,245,670.00' },
      { label: 'Anomaly Value', value: 'HKD 82,300.00' },
      { label: 'Reconciliation Status', value: 'Partial, HITL required' },
      { label: 'Ledger Period', value: 'Jul 2026' },
    ],
  },
}

const agentChecks: Record<string, AgentCheck[]> = {
  sfc_type9_nav: [
    { agent: 'alpha', label: 'Variance: HSBC vs UBS', result: 'pass', detail: '0.3 bps, within 2.0 bps threshold ✓' },
    { agent: 'alpha', label: 'Variance: HSBC vs JB', result: 'pass', detail: '0.8 bps, within 2.0 bps threshold ✓' },
    { agent: 'alpha', label: 'Multi-currency FX delta', result: 'pass', detail: 'SGD leg hedged at 0.1% variance ✓' },
    { agent: 'beta', label: 'SFC Circular 24-XX: Output monitoring', result: 'pass', detail: 'HITL gate engaged, variance log attached ✓' },
    { agent: 'beta', label: 'SFC Circular 26-06: MNPI isolation', result: 'pass', detail: 'No client PII in consolidated output ✓' },
    { agent: 'beta', label: 'HKMA: Portfolio valuation rules', result: 'pass', detail: 'Mark-to-market pricing verified ✓' },
  ],
  sfc_type1_kyc: [
    { agent: 'alpha', label: 'Sanctions: UN sanctions list', result: 'pass', detail: 'No match (confidence 99.7%) ✓' },
    { agent: 'alpha', label: 'Sanctions: OFAC SDN list', result: 'pass', detail: 'No match (confidence 99.9%) ✓' },
    { agent: 'alpha', label: 'PEP: Global PEP database', result: 'pass', detail: 'Non-PEP classification ✓' },
    { agent: 'beta', label: 'PCPD: Data minimization check', result: 'pass', detail: 'Only mandatory KYC fields retained ✓' },
    { agent: 'beta', label: 'SFC Type 1: ID verification rule', result: 'pass', detail: 'HKID checksum valid, document not expired ✓' },
    { agent: 'beta', label: 'AML: Transaction pattern screen', result: 'warn', detail: 'Low transaction frequency: flagged for manual review' },
  ],
  sfc_type6_dd: [
    { agent: 'alpha', label: 'Fuzzy match: Statement vs Xero', result: 'pass', detail: '47/48 entries matched (threshold 90%) ✓' },
    { agent: 'alpha', label: 'Anomaly: Unmatched entry HKD 82,300', result: 'flag', detail: 'No matching ledger entry found: routed to HITL' },
    { agent: 'alpha', label: 'Date reconciliation', result: 'pass', detail: 'All transaction dates within statement period ✓' },
    { agent: 'beta', label: 'SFC Type 6: Reconciliation record rule', result: 'pass', detail: 'Full match log maintained for 7-year audit ✓' },
    { agent: 'beta', label: 'HKMA: Endorsement requirement', result: 'pass', detail: 'CCO digital signature required before dispatch ✓' },
    { agent: 'beta', label: 'PCPD: Retention gate', result: 'pass', detail: 'Raw statement data expunged from RAM ✓' },
  ],
}

const artifactsData: Record<string, DocumentArtifact[]> = {
  sfc_type9_nav: [
    {
      id: 'art-nav-01',
      fileName: 'HSBC_Custodian_NAV_20260728.pdf',
      receivedAt: '05:32 HKT',
      sizeKB: 214,
      type: 'pdf',
      source: 'HSBC Securities Services',
      summary: 'Daily NAV report for portfolio HK-8823. Multi-currency valuations.',
      docLines: [
        'HSBC SECURITIES SERVICES | DAILY NAV REPORT',
        'Portfolio: HK-8823 · Valuation Date: 28 Jul 2026',
        '',
        'Client: Lee Ka-shing Foundation',
        'HKID: X123456(7)',
        'Account No: CUST-8823-HK',
        'Contact: +852 9123 4567',
        '',
        '--- Holdings ---',
        'ISIN HK0000012345  NAV/HKD 12.45  Units 80,000  Total 996,000',
        'ISIN HK0000056789  NAV/HKD 48.20  Units 25,000  Total 1,205,000',
        'ISIN US0000098765  NAV/USD 15.30  Units 120,000 Total 1,836,000',
        'ISIN SG0000076543  NAV/SGD 22.10  Units 35,000  Total 773,500',
        '',
        'Grand Total: HKD 4,892,300.00 (FX converted at 7.82)',
      ],
      piiSpans: [
        { lineIndex: 4, start: 8, end: 28, label: 'Client Name' },
        { lineIndex: 5, start: 6, end: 16, label: 'HKID' },
        { lineIndex: 6, start: 12, end: 25, label: 'Account No.' },
        { lineIndex: 7, start: 9, end: 23, label: 'Contact Phone' },
      ],
    },
    {
      id: 'art-nav-02',
      fileName: 'UBS_Portfolio_Valuation_20260728.pdf',
      receivedAt: '05:33 HKT',
      sizeKB: 186,
      type: 'pdf',
      source: 'UBS Wealth Management',
      summary: 'Portfolio IBOR positions and risk analytics report.',
      docLines: [
        'UBS WEALTH MANAGEMENT | PORTFOLIO VALUATION',
        'Account: UBS-7721-HK · Date: 28 Jul 2026',
        '',
        'Client: Lee Ka-shing Foundation',
        'HKID: X123456(7)',
        '',
        '--- Position Summary ---',
        'Fixed Income HKD  1,245,000',
        'Equity HKD        580,600',
        'Cash HKD          320,000',
        'Grand Total: HKD  2,145,600',
        '',
        'Risk Metrics: VaR(95%) 1.2%, Duration 3.4yr',
      ],
      piiSpans: [
        { lineIndex: 4, start: 8, end: 28, label: 'Client Name' },
        { lineIndex: 5, start: 6, end: 16, label: 'HKID' },
      ],
    },
  ],
  sfc_type1_kyc: [
    {
      id: 'art-kyc-01',
      fileName: 'Client_ID_Lam_Wing_Tung_20260728.pdf',
      receivedAt: '08:15 HKT',
      sizeKB: 342,
      type: 'pdf',
      source: 'Granola Meeting Notes',
      summary: 'Client identity documents from onboarding meeting. Includes HKID and proof of address.',
      docLines: [
        'CLIENT ONBOARDING DOCUMENTS',
        'Meeting Date: 28 Jul 2026 · Source: Granola.ai',
        '',
        'Full Name: Lam Wing-tung',
        'HKID: Y987654(3)',
        'Passport No: PP123456789',
        'Date of Birth: 1985-03-14',
        'Nationality: Hong Kong (SAR)',
        'Residential Address: 15/F, Central Tower, 8 Queen\'s Road Central',
        'Occupation: Director, Omega Capital Partners Ltd',
        'Source of Funds: Salary & Investment Income',
        '',
        '--- Risk Indicators ---',
        'High-value transaction profile: >HKD 5M annually',
        'Multiple jurisdiction exposure: HK, SG, UK',
      ],
      piiSpans: [
        { lineIndex: 4, start: 11, end: 24, label: 'Full Name' },
        { lineIndex: 5, start: 6, end: 16, label: 'HKID' },
        { lineIndex: 6, start: 13, end: 25, label: 'Passport No.' },
        { lineIndex: 7, start: 15, end: 25, label: 'Date of Birth' },
      ],
    },
    {
      id: 'art-kyc-02',
      fileName: 'Sanctions_Screening_Report_20260728.pdf',
      receivedAt: '08:17 HKT',
      sizeKB: 98,
      type: 'pdf',
      source: 'Automated Screening Engine',
      summary: 'Cross-reference results against UN, OFAC, EU sanctions lists.',
      docLines: [
        'SANCTIONS SCREENING REPORT',
        'Run ID: SCR-20260728-001 · 28 Jul 2026 08:17 HKT',
        '',
        'Subject: Lam Wing-tung',
        '',
        '--- Results ---',
        'UN Sanctions List:         No match (99.7% confidence)',
        'OFAC SDN List:             No match (99.9% confidence)',
        'EU Consolidated List:      No match (99.5% confidence)',
        'HK Police Watchlist:       No match',
        '',
        'PEP Database:              Non-PEP',
        'Adverse Media:             None found',
        '',
        'Overall Risk Score:        12/100 (Low)',
      ],
      piiSpans: [
        { lineIndex: 4, start: 9, end: 22, label: 'Full Name' },
      ],
    },
  ],
  sfc_type6_dd: [
    {
      id: 'art-dd-01',
      fileName: 'HSBC_Business_Statement_20260728.pdf',
      receivedAt: '09:45 HKT',
      sizeKB: 456,
      type: 'pdf',
      source: 'HSBC Business Banking',
      summary: 'Monthly business bank statement with 48 transactions requiring reconciliation.',
      docLines: [
        'HSBC BUSINESS BANKING | ACCOUNT STATEMENT',
        'Account: Omega Capital Partners Ltd',
        'Account No: 808-123456-789',
        'Period: 01 Jul 2026 to 28 Jul 2026',
        '',
        'Date        Description                    Debit      Credit',
        '01 Jul      Client payment · ABC Fund      500,000',
        '03 Jul      Subscription · Def Capital               1,200,000',
        '05 Jul      Management fee · XYZ Ltd       12,000',
        '08 Jul      Dividend · HKFE Clearing                240,000',
        '10 Jul      FX conversion · USD/HKD        15,300',
        '12 Jul      Advisory retainer · Entrust     85,000',
        '...         (42 additional entries)',
        '28 Jul      Interest income                             3,200',
        '',
        'Total: Debits HKD 1,892,450  Credits HKD 4,138,120',
        'Signatory: Dr. Chan Siu-kei',
      ],
      piiSpans: [
        { lineIndex: 2, start: 12, end: 27, label: 'Account Name' },
        { lineIndex: 3, start: 12, end: 26, label: 'Account No.' },
        { lineIndex: 17, start: 11, end: 29, label: 'Signatory' },
      ],
    },
    {
      id: 'art-dd-02',
      fileName: 'Xero_Ledger_Export_Jul2026.xlsx',
      receivedAt: '09:47 HKT',
      sizeKB: 124,
      type: 'xlsx',
      source: 'Xero Accounting',
      summary: 'Xero ledger entries for Jul 2026. 47 matched, 1 unmatched entry flagged.',
      docLines: [
        'XERO LEDGER EXPORT | Jul 2026',
        'Omega Capital Partners Ltd',
        '',
        'Entry  Date       Description              Amount    Match',
        '001    01 Jul     ABC Fund Payment         500,000   ✓',
        '002    03 Jul     Def Capital Subscription  1,200,000 ✓',
        '003    05 Jul     XYZ Management Fee        12,000    ✓',
        '004    08 Jul     HKFE Dividend             240,000   ✓',
        '005    10 Jul     FX USD/HKD                15,300    ✓',
        '006    12 Jul     Entrust Advisory Fee       85,000    ✓',
        '047    28 Jul     Interest Income             3,200    ✓',
        '---    10 Jul     Unknown Debit             82,300    ✗ FLAGGED',
        '',
        'Anomaly: HKD 82,300 debit on 10 Jul with no matching statement entry.',
        'Routed to Human-in-the-Loop queue for manual review.',
      ],
      piiSpans: [
        { lineIndex: 1, start: 0, end: 27, label: 'Account Name' },
      ],
    },
  ],
}

export function getExtendedData(): Record<string, ExtendedWorkflowData> {
  const data: Record<string, ExtendedWorkflowData> = {}
  for (const [id, artifacts] of Object.entries(artifactsData)) {
    data[id] = {
      id,
      artifacts,
      agentChecks: agentChecks[id] || [],
      outputReport: outputReports[id] || { title: '', summary: '', rows: [] },
    }
  }
  return data
}
