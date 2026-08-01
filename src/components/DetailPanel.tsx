"use client";

import { useEffect, useRef, useState } from "react";
import type { Ticket, User } from "@/lib/types";
import { canActionTicket, canSeeAll, currentStep, eligibleApprovers } from "@/lib/permissions";
import { actionTicket, reassignTicket, requestInfo, useDB, useOoo } from "@/lib/store";
import { formatBytes, formatDate, priorityFor, slaFor, timeAgo } from "@/lib/dates";
import { PriorityPill } from "./PriorityPill";
import { Avatar } from "./Avatar";
import { WorkflowStepper } from "./WorkflowStepper";
import { RejectModal } from "./RejectModal";

function InfoBanner({ children, tone = "wax" }: { children: React.ReactNode; tone?: "wax" | "red" | "sage" }) {
  return <p className={`info-banner info-banner--${tone}`} role="status">{children}</p>;
}

export function DetailPanel({
  ticket,
  user,
  onBack,
}: {
  ticket: Ticket;
  user: User;
  onBack?: () => void;
}) {
  const db = useDB();
  const ooo = useOoo();
  const [rejectOpen, setRejectOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [reassignOpen, setReassignOpen] = useState(false);
  const [reassignError, setReassignError] = useState<string | null>(null);
  const [approveOpen, setApproveOpen] = useState(false);
  const [approveNote, setApproveNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const localAction = useRef(false);
  const prevStatus = useRef(ticket.status);

  const isPending = ticket.status === "Pending";
  const step = currentStep(ticket);
  const actionable = canActionTicket(ticket, user) && ticket.requesterId !== user.id;
  const selfApproval = isPending && step?.approverId === user.id && ticket.requesterId === user.id;
  const canSee = canSeeAll(user) || ticket.requesterId === user.id;
  const requester = db.users.find((u) => u.id === ticket.requesterId);
  const priority = priorityFor(ticket.isUrgent, isPending, ticket.submissionDeadline);
  const sla = slaFor(ticket.submissionDeadline);
  const eligible = eligibleApprovers(db.users).filter((a) => !ticket.approvals.some((s) => s.approverId === a.id));

  /* Race-condition toast: another tab actioned this ticket while we view it. */
  useEffect(() => {
    if (ticket.status !== prevStatus.current) {
      if (!localAction.current) {
        setToast(
          ticket.status === "Approved"
            ? `This ticket was approved moments ago. Action buttons are disabled.`
            : `This ticket was rejected moments ago. Action buttons are disabled.`,
        );
        setTimeout(() => setToast(null), 5000);
      }
      prevStatus.current = ticket.status;
      localAction.current = false;
    }
  }, [ticket.status]);

  /* Keyboard shortcuts: Shift+A approve, Shift+R reject */
  useEffect(() => {
    if (!actionable) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setApproveOpen((o) => !o);
      }
      if (e.shiftKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setRejectOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [actionable]);

  if (!canSee) return null;

  const doApprove = () => {
    localAction.current = true;
    actionTicket(ticket.id, "approve", approveNote);
    setApproveOpen(false);
    setApproveNote("");
  };

  const doReject = (reason: { category: string; explanation: string }) => {
    localAction.current = true;
    actionTicket(ticket.id, "reject", `${reason.category}: ${reason.explanation}`);
    setRejectOpen(false);
  };

  const doInfo = () => {
    requestInfo(ticket.id, user, infoMsg);
    setInfoOpen(false);
    setInfoMsg("");
  };

  const doReassign = (targetId: string) => {
    const err = reassignTicket(ticket.id, targetId);
    setReassignError(err);
    if (!err) setReassignOpen(false);
  };

  return (
    <article className="detail-panel" aria-label={`Ticket ${ticket.ticketId} details`}>
      {toast && <div className="toast" role="status">{toast}</div>}

      {/* Header */}
      <div className="detail-head">
        {onBack && (
          <button type="button" className="btn btn-ghost btn-sm detail-back" onClick={onBack}>
            ← Back
          </button>
        )}
        <div className="detail-title-row">
          <div>
            <p className="section-eyebrow">{ticket.type}</p>
            <h2 className="detail-id">{ticket.ticketId}</h2>
          </div>
          <div className="detail-badges">
            <PriorityPill priority={priority} />
            <span className={`tag ${isPending ? "tag--solid-wax" : ticket.status === "Approved" ? "tag--solid-pine" : "tag--solid-oxblood"}`}>
              {ticket.status}
            </span>
            {ticket.isUrgent && <span className="stamp-badge stamp-badge--red">Urgent</span>}
          </div>
        </div>
        <p className="detail-sub">
          Submitted {timeAgo(ticket.createdAt)} by {ticket.requesterName}
        </p>
      </div>

      {/* SLA + urgency banners */}
      {isPending && sla && (
        <InfoBanner tone={sla.tone === "red" ? "red" : "wax"}>
          SLA {sla.tone === "red" ? "critical" : "at risk"}: {sla.label}
          {sla.tone === "red" ? " until deadline. Escalates if missed." : " until the deadline."}
        </InfoBanner>
      )}
      {ticket.infoRequest && (
        <InfoBanner tone="sage">
          Info requested by {ticket.infoRequest.byName}: “{ticket.infoRequest.message}”. SLA paused
          while awaiting requester input.
        </InfoBanner>
      )}
      {selfApproval && (
        <InfoBanner tone="red">
          You are the requester. Self-approval is restricted by governance policy.
        </InfoBanner>
      )}
      {ooo && (
        <InfoBanner tone="wax">
          Delegation active: tickets automatically assigned to your delegate.
        </InfoBanner>
      )}

      {/* Requester profile */}
      <div className="requester-block">
        <Avatar name={ticket.requesterName} size={38} active={requester?.isActive ?? true} />
        <div>
          <p className="requester-name">{ticket.requesterName}</p>
          <p className="requester-email">
            {ticket.requesterEmail} · {requester ? requester.role : "member"}
          </p>
        </div>
      </div>

      {/* Context payload */}
      <section className="detail-section">
        <h3 className="section-heading">Request context</h3>
        <p className="detail-desc">{ticket.description}</p>
        <dl className="context-grid">
          <div>
            <dt>Classification</dt>
            <dd>{ticket.type}</dd>
          </div>
          <div>
            <dt>Deadline</dt>
            <dd>{formatDate(ticket.submissionDeadline)}</dd>
          </div>
          <div>
            <dt>Urgent</dt>
            <dd>{ticket.isUrgent ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt>Submitted</dt>
            <dd>{formatDate(ticket.createdAt)}</dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd>{formatDate(ticket.updatedAt)}</dd>
          </div>
          {ticket.approvedAt && (
            <div>
              <dt>Cleared</dt>
              <dd>{formatDate(ticket.approvedAt)}</dd>
            </div>
          )}
        </dl>
        {ticket.links.length > 0 && (
          <div className="context-links">
            <p className="section-heading" style={{ marginTop: "0.8rem" }}>Deliverables</p>
            <ul className="link-list" role="list">
              {ticket.links.map((l, i) => (
                <li key={i} className="link-item">
                  <a href={l.url} target="_blank" rel="noreferrer">{l.subject}</a>
                  <span className="text-muted">{l.url}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {ticket.attachments.length > 0 && (
          <div className="context-links">
            <p className="section-heading" style={{ marginTop: "0.8rem" }}>Attachments</p>
            <ul className="attachment-list" role="list">
              {ticket.attachments.map((a) => (
                <li key={a.fileId} className="chip attachment-chip">
                  {a.dataUrl ? (
                    <a href={a.dataUrl} download={a.filename} target="_blank" rel="noreferrer">{a.filename}</a>
                  ) : (
                    <span>{a.filename}</span>
                  )}
                  <span className="text-muted">{formatBytes(a.size)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Workflow */}
      <section className="detail-section">
        <h3 className="section-heading">Approval workflow</h3>
        <WorkflowStepper ticket={ticket} user={user} />
      </section>

      {/* Sticky action bar */}
      <div className="action-bar">
        {actionable ? (
          <>
            <button type="button" className="btn btn-approve" onClick={() => setApproveOpen((o) => !o)}>
              Approve
            </button>
            <button type="button" className="btn btn-reject" onClick={() => setRejectOpen(true)}>
              Reject…
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setInfoOpen(true)}>
              Request Info
            </button>
            <div className="reassign-wrap">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setReassignOpen((o) => !o)}
                aria-expanded={reassignOpen}
              >
                Reassign
              </button>
              {reassignOpen && (
                <div className="reassign-menu">
                  <p className="reassign-title">Reassign to</p>
                  {reassignError && <p className="form-error">{reassignError}</p>}
                  {eligible.length === 0 ? (
                    <p className="text-muted" style={{ padding: "0.5rem" }}>No other eligible reviewers.</p>
                  ) : (
                    <ul className="reassign-list" role="list">
                      {eligible.map((a) => (
                        <li key={a.id}>
                          <button type="button" onClick={() => doReassign(a.id)}>
                            {a.name} <span className="text-muted">· {a.role}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <span className="action-hint">Shift+A approve · Shift+R reject</span>
          </>
        ) : isPending ? (
          <p className="action-muted">Awaiting {step?.approverName ?? "the next reviewer"}.</p>
        ) : (
          <p className="action-muted">{ticket.status}. This decision is final on the record.</p>
        )}
      </div>

      {/* Approve popover */}
      {approveOpen && actionable && (
        <div className="approve-popover" role="dialog" aria-label="Approve request">
          <p className="decision-title">Stamp approved{step ? ` · handoff to ${step.approverName}` : ""}</p>
          <label className="field">
            <span className="field-label">Optional note</span>
            <textarea
              rows={2}
              value={approveNote}
              onChange={(e) => setApproveNote(e.target.value)}
              placeholder="Note for the requester…"
              autoFocus
            />
          </label>
          <div className="decision-actions">
            <button type="button" className="btn btn-approve btn-sm" onClick={doApprove}>
              Confirm approve
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setApproveOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Request info drawer */}
      {infoOpen && actionable && (
        <div className="modal-backdrop" onClick={() => setInfoOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3 className="serif-h2">Request more information</h3>
              <button type="button" className="modal-close" onClick={() => setInfoOpen(false)} aria-label="Close">×</button>
            </div>
            <p className="text-muted" style={{ fontSize: "0.88rem" }}>
              The SLA pauses and the ticket goes back to {ticket.requesterName} for input.
            </p>
            <label className="field">
              <span className="field-label">What do you need?</span>
              <textarea
                rows={3}
                value={infoMsg}
                onChange={(e) => setInfoMsg(e.target.value)}
                placeholder="e.g. Attach the approved scope before I can sign off."
                autoFocus
              />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setInfoOpen(false)}>Cancel</button>
              <button type="button" className="btn btn-solid" onClick={doInfo} disabled={!infoMsg.trim()}>
                Send request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      <RejectModal
        open={rejectOpen}
        ticketIdLabel={ticket.ticketId}
        onClose={() => setRejectOpen(false)}
        onConfirm={doReject}
      />
    </article>
  );
}
