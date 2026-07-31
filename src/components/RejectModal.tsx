"use client";

import { useEffect, useState } from "react";

const CATEGORIES = [
  "Insufficient Justification",
  "Incomplete Information",
  "Budget Exceeded",
  "Policy Violation",
  "Scope Mismatch",
  "Duplicate Request",
  "Other",
];

export function RejectModal({
  open,
  ticketIdLabel,
  bulkCount,
  onClose,
  onConfirm,
}: {
  open: boolean;
  ticketIdLabel?: string;
  bulkCount?: number;
  onClose: () => void;
  onConfirm: (reason: { category: string; explanation: string }) => void;
}) {
  const [category, setCategory] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setCategory("");
      setExplanation("");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = () => {
    if (!category) {
      setError("Choose a rejection category.");
      return;
    }
    if (!explanation.trim()) {
      setError("Explain the rejection. This is sent to the requester.");
      return;
    }
    onConfirm({ category, explanation: explanation.trim() });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3 id="reject-title" className="serif-h2">
            Reject {bulkCount ? `${bulkCount} requests` : ticketIdLabel}
          </h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className="text-muted" style={{ fontSize: "0.88rem" }}>
          The reason is sent to {bulkCount ? "the requesters" : "the requester"} and kept on the
          audit record. Rejection is terminal.
        </p>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <label className="field">
          <span className="field-label">
            Rejection category <span className="req" aria-hidden="true">*</span>
          </span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} autoFocus>
            <option value="">Select category…</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">
            Detailed explanation <span className="req" aria-hidden="true">*</span>
          </span>
          <textarea
            rows={4}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="e.g. Attach the approved Jira ticket before requesting access."
          />
        </label>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={submit}>
            Confirm rejection
          </button>
        </div>
      </div>
    </div>
  );
}
