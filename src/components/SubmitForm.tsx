"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Attachment, TicketType, User } from "@/lib/types";
import { createTicket, useDB } from "@/lib/store";
import { eligibleApprovers } from "@/lib/permissions";
import { todayISO } from "@/lib/dates";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_FILES = 5;

interface LinkDraft {
  subject: string;
  url: string;
}

export function SubmitForm({ user }: { user: User }) {
  const router = useRouter();
  const db = useDB();
  const eligible = eligibleApprovers(db.users);

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [chain, setChain] = useState<string[]>([]);
  const [links, setLinks] = useState<LinkDraft[]>([{ subject: "", url: "" }]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const addApprover = (id: string) => {
    if (!id || chain.includes(id)) return;
    setChain((c) => [...c, id]);
  };
  const moveApprover = (idx: number, dir: -1 | 1) => {
    setChain((c) => {
      const next = [...c];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return c;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  };
  const removeApprover = (idx: number) => setChain((c) => c.filter((_, i) => i !== idx));

  const addLink = () => setLinks((l) => [...l, { subject: "", url: "" }]);
  const setLink = (idx: number, patch: Partial<LinkDraft>) =>
    setLinks((l) => l.map((x, i) => (i === idx ? { ...x, ...patch } : x)));
  const removeLink = (idx: number) => setLinks((l) => l.filter((_, i) => i !== idx));

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const errs: string[] = [];
    const accepted: Attachment[] = [];
    let pending = 0;
    Array.from(files).forEach((f) => {
      if (f.size > MAX_FILE_SIZE) {
        errs.push(`${f.name} exceeds the 2 MB per-file limit and was skipped.`);
        return;
      }
      if (attachments.some((a) => a.filename === f.name && a.size === f.size)) {
        errs.push(`${f.name} is a duplicate and was skipped.`);
        return;
      }
      if (attachments.length + accepted.length >= MAX_FILES) {
        errs.push(`Attachment limit is ${MAX_FILES} files. ${f.name} was skipped.`);
        return;
      }
      pending += 1;
      const reader = new FileReader();
      reader.onload = () => {
        accepted.push({
          fileId: `${f.name}-${f.size}-${Date.now()}`,
          filename: f.name,
          contentType: f.type || "application/octet-stream",
          size: f.size,
          dataUrl: String(reader.result),
        });
        pending -= 1;
        if (pending === 0) {
          if (accepted.length) setAttachments((prev) => [...prev, ...accepted]);
          if (errs.length) setErrors((prev) => [...prev, ...errs]);
        }
      };
      reader.readAsDataURL(f);
    });
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    if (chain.length === 0) errs.push("Add at least one reviewer to the chain.");
    if (!type) errs.push("Choose a classification.");
    if (!description.trim()) errs.push("Write a description.");
    if (deadline && deadline < todayISO()) errs.push("Deadline cannot be in the past.");
    links.filter((l) => l.subject || l.url).forEach((l) => {
      if (!l.subject.trim()) errs.push("Every deliverable link needs a subject label.");
      if (!/^https?:\/\/.+/.test(l.url)) errs.push("Every deliverable link must start with http(s)://.");
    });
    return errs;
  };

  const submit = () => {
    const errs = validate();
    setErrors(errs);
    if (errs.length) return;
    const t = createTicket({
      requester: user,
      type,
      description: description.trim(),
      submissionDeadline: deadline || undefined,
      isUrgent: urgent,
      approverIds: chain,
      links: links.filter((l) => l.subject.trim() && l.url.trim()),
      attachments,
    });
    setSubmittedId(t.ticketId);
  };

  if (submittedId) {
    return (
      <div className="panel-card submit-success" role="status">
        <p className="section-eyebrow">In the pipeline</p>
        <h2 className="serif-h2">
          <span className="success-id">{submittedId}</span> is with the first reviewer
        </h2>
        <p className="text-muted">
          The chain is live. Reviewers see your request in their pipeline the moment they sign in.
        </p>
        <button type="button" className="btn btn-solid" onClick={() => router.push("/dashboard")}>
          View pipeline
        </button>
      </div>
    );
  }

  return (
    <div className="submit-layout">
      <form
        className="submit-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        noValidate
      >
        {errors.length > 0 && (
          <ul className="form-errors" role="alert">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        <section className="panel-card form-section">
          <h2 className="section-heading">1 · The work</h2>
          <label className="field">
            <span className="field-label">
              Classification <span className="req" aria-hidden="true">*</span>
            </span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Choose a classification…</option>
              {db.types.map((t: TicketType) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">
              Description <span className="req" aria-hidden="true">*</span>
            </span>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is the deliverable, what context matters, what needs review?"
            />
          </label>
          <div className="form-row">
            <label className="field">
              <span className="field-label">Deadline</span>
              <input
                type="date"
                min={todayISO()}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
            <label className="field-check">
              <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
              <span>Mark as urgent</span>
            </label>
          </div>
        </section>

        <section className="panel-card form-section">
          <h2 className="section-heading">2 · Deliverables</h2>
          {links.map((l, i) => (
            <div className="form-row" key={i}>
              <label className="field">
                <span className="field-label">Subject</span>
                <input value={l.subject} onChange={(e) => setLink(i, { subject: e.target.value })} placeholder="e.g. Deck draft v3" />
              </label>
              <label className="field">
                <span className="field-label">URL</span>
                <input value={l.url} onChange={(e) => setLink(i, { url: e.target.value })} placeholder="https://…" inputMode="url" />
              </label>
              <button type="button" className="btn btn-ghost btn-sm link-remove" onClick={() => removeLink(i)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm" onClick={addLink}>
            + Add link
          </button>
        </section>

        <section className="panel-card form-section">
          <h2 className="section-heading">3 · Attachments</h2>
          <p className="form-hint">Up to {MAX_FILES} files, 2 MB each. Duplicates are skipped.</p>
          <label className="btn btn-ghost btn-sm file-picker">
            Choose files
            <input
              type="file"
              multiple
              className="sr-only"
              onChange={(e) => {
                onFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          {attachments.length > 0 && (
            <ul className="attachment-list" role="list">
              {attachments.map((a) => (
                <li key={a.fileId} className="tag tag--soft attachment-chip">
                  {a.filename}
                  <span className="text-muted">{Math.round(a.size / 1024)} KB</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="submit-actions">
          <button type="submit" className="btn btn-solid">
            Route for sign-off
          </button>
        </div>
      </form>

      <aside className="chain-slip" aria-label="Approval chain">
        <p className="section-eyebrow">4 · The chain</p>
        <p className="form-hint" style={{ marginBottom: "0.7rem" }}>
          Reviewers sign off in the order added. Seniors and Admins only.
        </p>
        <label className="field" style={{ marginBottom: "0.8rem" }}>
          <span className="field-label">Add a reviewer</span>
          <select value="" onChange={(e) => addApprover(e.target.value)}>
            <option value="">Select…</option>
            {eligible
              .filter((a) => !chain.includes(a.id))
              .map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} · {a.role}
                </option>
              ))}
          </select>
        </label>
        {chain.length === 0 ? (
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            No reviewers yet. Every request needs at least one rung on its chain.
          </p>
        ) : (
          <ol className="chain-builder" role="list">
            {chain.map((id, idx) => {
              const a = db.users.find((x) => x.id === id)!;
              return (
                <li key={id} className="chain-builder-item">
                  <span className="chain-builder-order">{idx + 1}</span>
                  <span className="chain-builder-name">
                    <span>{a.name}</span>
                    <span className="tag tag--soft">{a.role}</span>
                  </span>
                  <span className="chain-builder-actions">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      disabled={idx === 0}
                      onClick={() => moveApprover(idx, -1)}
                      aria-label={`Move ${a.name} earlier`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      disabled={idx === chain.length - 1}
                      onClick={() => moveApprover(idx, 1)}
                      aria-label={`Move ${a.name} later`}
                    >
                      ↓
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeApprover(idx)}>
                      Remove
                    </button>
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </aside>
    </div>
  );
}
