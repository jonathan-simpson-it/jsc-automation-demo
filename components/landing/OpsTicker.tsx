'use client'

const tickerLines = [
  { time: '05:32:04', msg: 'HSBC NAV file ingested — 14 PII fields detected', status: 'info' },
  { time: '05:32:05', msg: 'PII redaction engine active — masking 14 fields', status: 'processing' },
  { time: '05:32:06', msg: 'Ephemeral sandbox 0x8F2A — RAM execution started', status: 'info' },
  { time: '05:32:07', msg: 'Variance check: 0.3 bps — within SFC 2.0 bps ✓', status: 'pass' },
  { time: '05:32:08', msg: 'Agent_Alpha: portfolio variance check ✓', status: 'pass' },
  { time: '05:32:08', msg: 'Agent_Beta: SFC Circular 24-XX output rule verified ✓', status: 'pass' },
  { time: '05:32:09', msg: 'SHA-256: e3b0c44… audit proof generated ✓', status: 'pass' },
  { time: '05:32:10', msg: 'Clean report dispatched to Xero + Slack ✓', status: 'pass' },
]

function LogLine({ time, msg, status, sep }: { time: string; msg: string; status: string; sep?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      {sep && <span className="text-white/10 mx-2">|</span>}
      <span className="font-mono text-[0.62rem] text-white/30 tabular-nums">{time}</span>
      <span
        className={
          status === 'pass' ? 'text-[#aec7bd]' : status === 'processing' ? 'text-[#aec7bd]' : 'text-white/40'
        }
      >
        {status === 'pass' ? '✓' : status === 'processing' ? '●' : '→'}
      </span>
      <span
        className={
          status === 'pass' ? 'text-[#aec7bd]' : status === 'processing' ? 'text-[#aec7bd]' : 'text-white/60'
        }
      >
        {msg}
      </span>
    </span>
  )
}

export default function OpsTicker() {
  const items = tickerLines.map((l, i) => (
    <LogLine key={i} {...l} sep={i > 0 ? '|' : undefined} />
  ))

  return (
    <div className="telemetry-bar overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="telemetry-dot" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/40 whitespace-nowrap">
            LIVE OPS
          </span>
        </div>

        <div className="flex-1 overflow-hidden marquee-container">
          <div className="flex items-center gap-0 animate-[marquee_25s_linear_infinite] min-w-max">
            {items}
            {/* Duplicate for seamless loop */}
            <span className="ml-4">{items}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
