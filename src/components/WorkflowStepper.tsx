"use client";

import { useState } from "react";
import type { ApprovalStep, Ticket, User } from "@/lib/types";
import { myStepForEdit } from "@/lib/permissions";
import { editRemarks } from "@/lib/store";
import { formatDate, timeAgo } from "@/lib/dates";

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function StepRow({ step, isCurrent }: { step: ApprovalStep; isCurrent: boolean }) {
  const done = step.status === "Approved";
  const rejected = step.status === "Rejected";
  const pending = step.status === "Pending";

  return (
    <li
      className={`step${isCurrent ? " is-current" : ""}${done ? " is-done" : ""}${rejected ? " is-rejected" : ""}`}
      aria-current={isCurrent ? "step" : undefined}
    >
      <span className="step-node" aria-hidden="true">
        {done ? <CheckIcon /> : rejected ? <CrossIcon /> : <span className="step-node-blank" />}
      </span>
      <div className="step-body">
        <div className="step-head">
          <span className="step-name">{step.approverName}</span>
          {isCurrent && <span className="step-awaiting">Awaiting your action</span>}
          {rejected && <span className="step-rejected-tag">Rejected</span>}
        </div>
        <span className="step-meta">
          {pending
            ? "Pending"
            : `${done ? "Approved" : "Rejected"} · ${step.actionedAt ? `${formatDate(step.actionedAt)} (${timeAgo(step.actionedAt)})` : ""}`}
        </span>
        {step.remarks && <p className="step-note">“{step.remarks}”</p>}
      </div>
    </li>
  );
}

export function WorkflowStepper({
  ticket,
  user,
  showEdit = true,
}: {
  ticket: Ticket;
  user: User | null;
  showEdit?: boolean;
}) {
  const mine = myStepForEdit(ticket, user);
  const canEdit = showEdit && !!mine;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(mine?.remarks ?? "");

  return (
    <div className="stepper">
      <ol className="stepper-list" role="list" aria-label="Approval workflow">
        {ticket.approvals.map((s, i) => (
          <StepRow key={s.order} step={s} isCurrent={ticket.currentStepIndex === i && ticket.status === "Pending"} />
        ))}
      </ol>
      {canEdit && mine && !editing && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => {
          setDraft(mine.remarks ?? "");
          setEditing(true);
        }}>
          Edit my note
        </button>
      )}
      {editing && mine && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editRemarks(ticket.id, mine.order, draft);
            setEditing(false);
          }}
          className="step-edit"
        >
          <label className="field">
            <span className="field-label">Notes for the requester</span>
            <textarea rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} />
          </label>
          <div className="step-edit-actions">
            <button type="submit" className="btn btn-solid btn-sm">Save note</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
