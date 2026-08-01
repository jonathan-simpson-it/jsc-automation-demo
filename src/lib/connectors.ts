export type ConnectorCategory = 'productivity' | 'financial';

export interface Connector {
  id: string;
  brandId: string;
  name: string;
  category: ConnectorCategory;
  description: string;
  authType: string;
  protocolBadge: string;
  functionLabel: string;
  subItems?: string[];
  stackedBrandIds?: string[];
  payloadExample: string;
}

export const connectors: Connector[] = [
  {
    id: 'custodian',
    brandId: 'hsbc',
    name: 'Multi-Custodian Adapters',
    category: 'financial',
    description: 'Headless data extraction from HSBC, UBS, Julius Baer, and LGT client portals. Scheduled 05:30 HKT daily pulls.',
    authType: 'Session-based (Credential Vault)',
    protocolBadge: 'SESSION VAULT',
    functionLabel: 'Custodian portal data extraction via session vault',
    stackedBrandIds: ['hsbc', 'ubs', 'juliusbaer', 'lgt'],
    payloadExample: JSON.stringify(
      { custodian: 'HSBC Securities Services', report_type: 'daily_nav', account: 'CUST-8823-HK', currency: 'HKD', valuation_date: '2026-07-28', entries: [{ isin: 'HK0000012345', nav_per_share: 12.45, units: 80000, total_hkd: 996000 }] },
      null, 2
    ),
  },
  {
    id: 'aladdin',
    brandId: 'blackrock',
    name: 'Portfolio & Market Data',
    category: 'financial',
    description: 'Portfolio IBOR positions and risk analytics. Automated NAV reconciliation against custodian reports.',
    authType: 'Encrypted API Key + mTLS',
    protocolBadge: 'MTLS + API KEY',
    functionLabel: 'Portfolio IBOR & automated NAV reconciliation',
    stackedBrandIds: ['blackrock', 'bloomberg', 'factset'],
    payloadExample: JSON.stringify(
      { request: 'GET /api/portfolio/IBOR', portfolio_id: 'PORT-HK-0923', as_of_date: '2026-07-28', positions: [{ ticker: '0005.HK', quantity: 50000, market_value_hkd: 3890000 }] },
      null, 2
    ),
  },
  {
    id: 'microsoft365',
    brandId: 'microsoft365',
    name: 'Microsoft 365',
    category: 'productivity',
    description: 'Outlook inbox and Excel workbook monitoring via Graph API. Triggers on custodian email attachments, parses spreadsheet data, and sends Teams alerts for compliance notifications.',
    authType: 'OAuth 2.0 (Microsoft Identity)',
    protocolBadge: 'OAUTH 2.0',
    functionLabel: 'Graph API inbox, spreadsheet, document & alert orchestration',
    stackedBrandIds: ['microsoft365', 'outlook', 'excel', 'teams', 'sharepoint', 'onedrive'],
    payloadExample: JSON.stringify(
      { subscription_id: 'sub_3c8f', resource: 'mail.read', change_type: 'created', mailbox: 'ops@firm.hk', has_attachments: true, attachment_types: ['.pdf', '.xlsx'] },
      null, 2
    ),
  },
  {
    id: 'google',
    brandId: 'google',
    name: 'Google Workspace',
    category: 'productivity',
    description: 'Gmail attachment parsing with Google Sheets and Docs extraction. Automated ticket creation from incoming invoice and statement emails.',
    authType: 'OAuth 2.0 (Google Workspace)',
    protocolBadge: 'OAUTH 2.0',
    functionLabel: 'Email, spreadsheet, drive attachment & calendar schedule ingest',
    stackedBrandIds: ['google', 'gmail', 'googlesheets', 'googledocs', 'googledrive', 'googlecalendar'],
    payloadExample: JSON.stringify(
      { userId: 'admin@firm.hk', messages: [{ id: '18f8a2b', from: 'reports@custodian.com', subject: 'Daily NAV (2026-07-28)', attachments: ['nav_20260728.xlsx'] }] },
      null, 2
    ),
  },
  {
    id: 'omnichannel',
    brandId: 'teams',
    name: 'Omnichannel Comms',
    category: 'productivity',
    description: 'Ingests unstructured chat threads from Teams, Slack, and WhatsApp, verifies sentiment against meeting notes, and broadcasts automated compliance alerts.',
    authType: 'OAuth 2.0 + Webhook',
    protocolBadge: 'OAUTH 2.0',
    functionLabel: 'Chat thread ingest & alert broadcast',
    stackedBrandIds: ['teams', 'slack', 'whatsapp'],
    payloadExample: JSON.stringify(
      { source: 'teams', channel: 'Compliance-Ops', message: 'Pipeline complete. SHA-256: e3b0c44…', priority: 'normal' },
      null, 2
    ),
  },
  {
    id: 'granola',
    brandId: 'granola',
    name: 'AI Meeting Intelligence',
    category: 'productivity',
    description: 'Ingests AI meeting notes and transcripts via webhook. Automatically parses action items, attendee lists, and client onboarding data.',
    authType: 'Webhook HMAC-SHA256',
    protocolBadge: 'HMAC WEBHOOK',
    functionLabel: 'Meeting-note ingestion, transcription & synthesis',
    stackedBrandIds: ['granola', 'fireflies', 'otter'],
    payloadExample: JSON.stringify(
      { event: 'meeting.completed', meeting_id: 'gm_9f8a2e', title: 'Weekly NAV Review', transcript_snippet: 'Client portfolio NAV...', participants: ['j.wong@am.hk'], recorded_at: '2026-07-28T05:30:00+08:00' },
      null, 2
    ),
  },
  {
    id: 'notion',
    brandId: 'notion',
    name: 'Knowledge & SOPs',
    category: 'productivity',
    description: 'Automated SOP synchronization. Pipeline documentation and runbook management. Audit log archival.',
    authType: 'OAuth 2.0 (Internal Integration)',
    protocolBadge: 'OAUTH 2.0',
    functionLabel: 'SOP & runbook workflow automation',
    stackedBrandIds: ['notion', 'confluence'],
    payloadExample: JSON.stringify(
      { parent: { database_id: 'db_compliance' }, properties: { 'Pipeline ID': { title: [{ text: { content: 'sfc_type9_nav' } }] }, Status: { select: { name: 'Complete' } }, 'SHA-256': { rich_text: [{ text: { content: 'e3b0c44…' } }] } } },
      null, 2
    ),
  },
  {
    id: 'xero',
    brandId: 'xero',
    name: 'Accounting & ERP Ledger',
    category: 'financial',
    description: 'Automated bank reconciliation. Ledger entry matching against bank statements. Anomaly flagging for unmatched transactions.',
    authType: 'OAuth 2.0 (Xero)',
    protocolBadge: 'OAUTH 2.0',
    functionLabel: 'Automated bank reconciliation & general ledger',
    stackedBrandIds: ['xero', 'quickbooks', 'netsuite'],
    payloadExample: JSON.stringify(
      { webhook_key: 'xero_whk_8f2a', events: [{ resource_url: 'https://api.xero.com/.../BankTransactions/abc-123', resource_id: 'abc-123', event_type: 'CREATE' }] },
      null, 2
    ),
  },
  {
    id: 'slack',
    brandId: 'slack',
    name: 'Slack',
    category: 'productivity',
    description: 'Operational alert pings. Automated compliance SOP distribution. Pipeline execution broadcast to designated channels.',
    authType: 'OAuth 2.0 (Bot Token)',
    protocolBadge: 'BOT TOKEN',
    functionLabel: 'Compliance alert broadcast',
    payloadExample: JSON.stringify(
      { channel: '#compliance-alerts', blocks: [{ type: 'header', text: 'Pipeline Exception: SFC Type 9' }, { type: 'section', text: 'NAV variance > 2bps flagged.' }] },
      null, 2
    ),
  },
  {
    id: 'teams',
    brandId: 'teams',
    name: 'Microsoft Teams',
    category: 'productivity',
    description: 'Compliance notification broadcasting. Audit trail delivery to Teams channels. Automated report sharing.',
    authType: 'OAuth 2.0 + Webhook',
    protocolBadge: 'OAUTH 2.0',
    functionLabel: 'Audit & notification relay',
    payloadExample: JSON.stringify(
      { type: 'message', channel: 'Compliance-Operations', content: 'Pipeline complete. SHA-256: e3b0c44…', priority: 'normal' },
      null, 2
    ),
  },
  {
    id: 'whatsapp',
    brandId: 'whatsapp',
    name: 'WhatsApp',
    category: 'productivity',
    description: 'Urgent compliance alerts via WhatsApp Business API. Real-time pipeline failure notifications to on-call officers.',
    authType: 'WhatsApp Business API',
    protocolBadge: 'BUSINESS API',
    functionLabel: 'Urgent compliance alerts',
    payloadExample: JSON.stringify(
      { to: '+85291234567', type: 'template', template: { name: 'pipeline_alert', language: { code: 'en' }, components: [{ type: 'body', parameters: [{ type: 'text', text: 'SFC Type 9 pipeline exception: review required.' }] }] } },
      null, 2
    ),
  },
];

export function getConnectorsByIds(ids: string[]): Connector[] {
  return connectors.filter((c) => ids.includes(c.id));
}
