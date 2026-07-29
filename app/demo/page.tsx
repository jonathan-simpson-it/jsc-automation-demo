import type { Metadata } from 'next'
import DemoConsole from '@/components/demo/DemoConsole'

export const metadata: Metadata = {
  title: 'Agent Canvas',
  description:
    'Watch an AI agent execute multi-step financial workflows inline — document ingestion, sanctions screening, variance analysis, and dispatch. Zero-data-retention, SFC-compliant.',
  openGraph: {
    title: 'JS&C Automation — Agent Canvas Demo',
    description:
      'Inline AI agent stream-of-thought showing live tool execution, compliance checks, and financial data reconciliation.',
  },
}

export default function DemoPage() {
  return <DemoConsole />
}
