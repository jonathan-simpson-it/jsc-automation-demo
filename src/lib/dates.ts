export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISODate(d);
}

export function hoursAgo(n: number): string {
  return new Date(Date.now() - n * 3600_000).toISOString();
}

export function formatDate(iso?: string): string {
  if (!iso) return "Not set";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(iso?: string): string {
  if (!iso) return "Not set";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export type DeadlineWindow =
  | "Overdue"
  | "Due Today"
  | "Next 7 Days"
  | "Next 30 Days"
  | "No Deadline";

export function deadlineWindow(deadline?: string): DeadlineWindow {
  if (!deadline) return "No Deadline";
  const due = new Date(deadline + "T00:00:00");
  if (Number.isNaN(due.getTime())) return "No Deadline";
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((due.getTime() - today.getTime()) / 86400_000);
  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Due Today";
  if (diffDays <= 7) return "Next 7 Days";
  return "Next 30 Days";
}

export interface Cue {
  deadline: "red" | "amber" | null;
  aging: "red" | "amber" | null;
}

export function pendingDays(ticketCreatedAt: string, prevActionedAt?: string): number {
  const from = prevActionedAt ?? ticketCreatedAt;
  const d = new Date(from);
  if (Number.isNaN(d.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - d.getTime()) / 86400_000));
}

export function cuesFor(
  createdAt: string,
  prevActionedAt: string | undefined,
  deadline: string | undefined,
): Cue {
  const deadlineCue: Cue["deadline"] = (() => {
    if (!deadline) return null;
    const due = new Date(deadline + "T00:00:00");
    if (Number.isNaN(due.getTime())) return null;
    const diff = due.getTime() - Date.now();
    if (diff < 0) return "red";
    if (diff <= 3 * 86400_000) return "amber";
    return null;
  })();
  const days = pendingDays(createdAt, prevActionedAt);
  const agingCue: Cue["aging"] = days >= 7 ? "red" : days >= 3 ? "amber" : null;
  return { deadline: deadlineCue, aging: agingCue };
}

/* ======= Priority (derived: urgent or overdue = P1, due ≤3d = P2, else P3) ======= */
export type Priority = "P1" | "P2" | "P3";

export function priorityFor(urgent: boolean, pending: boolean, deadline?: string): Priority {
  if (urgent) return "P1";
  if (pending && deadline) {
    const w = deadlineWindow(deadline);
    if (w === "Overdue") return "P1";
    const due = new Date(deadline + "T00:00:00");
    if (!Number.isNaN(due.getTime()) && due.getTime() - Date.now() <= 3 * 86400_000) return "P2";
  }
  return "P3";
}

/* ======= SLA pill (time to deadline) ======= */
export interface SlaInfo {
  label: string;
  tone: "red" | "amber" | "muted";
}

export function slaFor(deadline?: string): SlaInfo | null {
  if (!deadline) return null;
  const due = new Date(deadline + "T00:00:00");
  if (Number.isNaN(due.getTime())) return null;
  const diff = due.getTime() - Date.now();
  const neg = diff < 0;
  const abs = Math.abs(diff);
  const h = Math.floor(abs / 3_600_000);
  const m = Math.floor((abs % 3_600_000) / 60_000);
  const d = Math.floor(abs / 86_400_000);
  const label = d >= 1 ? `${d}d ${h % 24}h` : h >= 1 ? `${h}h ${m}m` : `${m}m`;
  if (neg) return { label: `Overdue · ${label}`, tone: "red" };
  if (abs < 2 * 3_600_000) return { label, tone: "red" };
  if (abs < 24 * 3_600_000) return { label, tone: "amber" };
  return { label, tone: "muted" };
}

/* ======= Relative time ======= */
export function timeAgo(iso?: string): string {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 60_000) return "just now";
  const m = Math.floor(ms / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
