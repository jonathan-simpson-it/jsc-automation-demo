import { slaFor } from "@/lib/dates";

export function SlaPill({ deadline }: { deadline?: string }) {
  const sla = slaFor(deadline);
  if (!sla) return <span className="sla-pill sla-pill--none">No SLA</span>;
  return (
    <span className={`sla-pill sla-pill--${sla.tone}`} title={`Deadline ${deadline}`}>
      SLA · {sla.label}
    </span>
  );
}
