import type { Priority } from "@/lib/dates";

const MAP: Record<Priority, { label: string; cls: string }> = {
  P1: { label: "P1 · Critical", cls: "priority-pill--p1" },
  P2: { label: "P2 · High", cls: "priority-pill--p2" },
  P3: { label: "P3 · Normal", cls: "priority-pill--p3" },
};

export function PriorityPill({ priority }: { priority: Priority }) {
  const m = MAP[priority];
  return <span className={`priority-pill ${m.cls}`}>{m.label}</span>;
}
