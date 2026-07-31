"use client";

import type { DeadlineWindow } from "@/lib/dates";
import { deadlineWindow } from "@/lib/dates";

export interface TicketFilters {
  status: "All" | "Pending" | "Approved" | "Rejected";
  type: string;
  requester: string;
  window: DeadlineWindow | "All";
  search: string;
}

export const EMPTY_FILTERS: TicketFilters = {
  status: "All",
  type: "All",
  requester: "All",
  window: "All",
  search: "",
};

export function filterMatch(
  t: {
    ticketId: string;
    requesterName: string;
    requesterEmail: string;
    description: string;
    status: string;
    type: string;
    requesterId: string;
    submissionDeadline?: string;
  },
  f: TicketFilters,
  requesterScope: string | null,
): boolean {
  if (requesterScope && t.requesterId !== requesterScope) return false;
  if (f.status !== "All" && t.status !== f.status) return false;
  if (f.type !== "All" && t.type !== f.type) return false;
  if (f.requester !== "All" && t.requesterId !== f.requester) return false;
  if (f.window !== "All" && deadlineWindow(t.submissionDeadline) !== f.window) return false;
  if (f.search.trim()) {
    const q = f.search.trim().toLowerCase();
    if (
      !t.ticketId.toLowerCase().includes(q) &&
      !t.requesterName.toLowerCase().includes(q) &&
      !t.requesterEmail.toLowerCase().includes(q) &&
      !t.description.toLowerCase().includes(q)
    )
      return false;
  }
  return true;
}

interface FilterBarProps {
  filters: TicketFilters;
  onChange: (f: TicketFilters) => void;
  types: string[];
  requesters: { id: string; name: string }[];
  showRequester: boolean;
}

const STATUSES: TicketFilters["status"][] = ["All", "Pending", "Approved", "Rejected"];
const WINDOWS: (DeadlineWindow | "All")[] = [
  "All",
  "Overdue",
  "Due Today",
  "Next 7 Days",
  "Next 30 Days",
  "No Deadline",
];

export function FilterBar({ filters, onChange, types, requesters, showRequester }: FilterBarProps) {
  const set = (patch: Partial<TicketFilters>) => onChange({ ...filters, ...patch });

  return (
    <form
      className="filter-bar"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Ticket filters"
    >
      <label className="field">
        <span className="field-label">Status</span>
        <select
          value={filters.status}
          onChange={(e) => set({ status: e.target.value as TicketFilters["status"] })}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="field-label">Classification</span>
        <select value={filters.type} onChange={(e) => set({ type: e.target.value })}>
          <option>All</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      {showRequester && (
        <label className="field">
          <span className="field-label">Requester</span>
          <select value={filters.requester} onChange={(e) => set({ requester: e.target.value })}>
            <option>All</option>
            {requesters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="field">
        <span className="field-label">Deadline</span>
        <select
          value={filters.window}
          onChange={(e) => set({ window: e.target.value as TicketFilters["window"] })}
        >
          {WINDOWS.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </label>
      <label className="field field--grow">
        <span className="field-label">Search</span>
        <input
          type="search"
          placeholder="ID, requester, description…"
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
        />
      </label>
      {(filters.status !== "All" ||
        filters.type !== "All" ||
        filters.requester !== "All" ||
        filters.window !== "All" ||
        filters.search) && (
        <button
          type="button"
          className="btn btn-ghost btn-sm filter-clear"
          onClick={() => onChange(EMPTY_FILTERS)}
        >
          Clear
        </button>
      )}
    </form>
  );
}
