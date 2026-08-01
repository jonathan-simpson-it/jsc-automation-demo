"use client";

import type { Ticket } from "@/lib/types";
import { priorityFor } from "@/lib/dates";
import { PriorityPill } from "./PriorityPill";
import { SlaPill } from "./SlaPill";
import { Avatar } from "./Avatar";

export function QueueCard({
  ticket,
  selected,
  bulkSelected,
  onSelect,
  onBulkToggle,
  dense,
}: {
  ticket: Ticket;
  selected: boolean;
  bulkSelected: boolean;
  onSelect: () => void;
  onBulkToggle: () => void;
  dense: boolean;
}) {
  const priority = priorityFor(ticket.isUrgent, ticket.status === "Pending", ticket.submissionDeadline);
  const stageLabel =
    ticket.status === "Pending" && ticket.currentStepIndex >= 0
      ? `Stage ${ticket.currentStepIndex + 1} of ${ticket.approvals.length} · ${ticket.approvals[ticket.currentStepIndex].approverName}`
      : "Complete";

  return (
    <li className={`queue-card${selected ? " is-selected" : ""}${dense ? " is-dense" : ""}`}>
      <button type="button" className="queue-card-hit" onClick={onSelect} aria-pressed={selected}>
        <span className="queue-card-top">
          <PriorityPill priority={priority} />
          {ticket.isUrgent && <span className="stamp-badge stamp-badge--red">Urgent</span>}
        </span>
        <span className="queue-card-title" title={ticket.description}>
          {ticket.description}
        </span>
        <span className="queue-card-meta">
          <span className="queue-id">{ticket.ticketId}</span>
          <span className="queue-requester">
            <Avatar name={ticket.requesterName} size={18} />
            {ticket.requesterName}
          </span>
        </span>
        <span className="queue-card-bottom">
          <SlaPill deadline={ticket.submissionDeadline} />
          <span className="stage-pill">{stageLabel}</span>
        </span>
      </button>
      <label className="queue-check">
        <input
          type="checkbox"
          checked={bulkSelected}
          onChange={onBulkToggle}
          aria-label={`Select ${ticket.ticketId} for bulk action`}
        />
        <span className="sr-only">Select</span>
      </label>
    </li>
  );
}
