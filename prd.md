# PRD — Multi-Step Ticket Approval System

**Product type:** Internal work-request submission and approval pipeline
**Status:** Draft
**Intended use:** Reference for building a similar system — the concepts, roles, and workflows are transferable; the UI is intentionally left unspecified so each implementation can have its own look and feel.

---

## 1. Product Overview

### 1.1 Elevator pitch

A system where staff submit "work tickets" (deliverables, proposals, documents, client material) that must be reviewed and signed off by a predefined, ordered chain of approvers before the work is considered cleared for delivery. Every step of the chain is visible, every decision is attributed, and no approval happens in a silo.

### 1.2 Problem statement

In consulting and advisory firms, work products (decks, proposals, memos, reports) routinely need sign-off from one or more senior reviewers before going to a client. Without a system:

- Review requests happen over email/chat and get lost or forgotten.
- Nobody knows where an item sits in the approval process.
- Feedback is scattered across threads and not attributed to a decision.
- Deadlines slip because nothing surfaces what is overdue or aging.
- There is no audit trail of who approved/rejected what, when, and why.

### 1.3 Goals

1. Give every work request a transparent, ordered approval chain.
2. Give approvers a single place to see everything waiting on them.
3. Give requesters visibility into where their submission stands and what was said about it.
4. Surface urgency and aging so nothing silently stalls.
5. Provide an audit trail: every decision, remark, and timestamp is retained.

### 1.4 Non-goals

- No billing, invoicing, or financial workflows.
- No real-time chat or collaboration features.
- No client-facing portal.
- No document creation or editing — the system references files hosted elsewhere.

---

## 2. Users & Roles

Three tiers, strictly ordered by permission:

| Role | Can submit tickets | Can approve/reject | Can manage system |
| --- | --- | --- | --- |
| **Junior** (Analyst) | Yes | No | No |
| **Senior** (Approver) | Yes | Yes | No |
| **Admin** | Yes | Yes | Yes |

**Role rules**

- Any tier can submit a ticket (approvers also raise their own requests).
- Only Seniors and Admins may sit on an approval chain and take action on tickets.
- New accounts always start as Junior.
- A user cannot change their own role, and a user cannot change the role of someone at the same tier (promoting someone to Admin is effectively permanent).
- Only Admins manage users and ticket classifications.

---

## 3. Core Concepts

### 3.1 Ticket

A unit of work submitted for review. Contains:

- **Identity:** unique ticket ID (e.g. `REQ-0001`), auto-incrementing.
- **Requester:** who submitted it (name + email denormalized).
- **Classification:** the work type, drawn from a configurable list.
- **Description:** free text describing the deliverable, context, and what needs review.
- **Deadline:** optional submission deadline date.
- **Urgency:** optional urgent flag.
- **Deliverable links:** optional list of external URLs (each with a human-readable subject label).
- **Attachments:** optional uploaded files.
- **Status:** Pending, Approved, or Rejected (see §4.2).
- **Approval chain:** the ordered list of approvers and their individual decisions (see §3.2).
- **Lifecycle metadata:** created/updated/approved timestamps.

### 3.2 Approval chain

The heart of the product. The submitter builds an ordered list of approvers (the order matters — it defines the sequence of sign-offs). Each position in the chain is called a "rung" and records:

- Which approver it belongs to.
- That approver's individual status (Pending / Approved / Rejected).
- Their remarks (if any).
- When they actioned it.

The chain is *sequential*: the ticket is only with one approver at a time, and later approvers see the remarks of all earlier approvers.

---

## 4. Core Workflows

### 4.1 Ticket submission

1. User selects approvers in the order they should approve (click order = chain order; at least one required).
2. User picks a classification, sets a deadline, optionally marks urgent.
3. User optionally adds deliverable links (subject + URL, validated) and/or file attachments (with size/count limits).
4. User writes a description (required).
5. On submit, the ticket is created as **Pending**, assigned to the first rung of the chain, and the requester is redirected to the dashboard with confirmation.

Validation rules: chain must not be empty, classification required, deadline required (no past dates), URL must start with http(s)://, description required, files within limits.

### 4.2 Approval decision

A ticket awaiting action is visible to exactly one approver: the current rung.

- **Approve:**
  - If more rungs remain, the rung is marked Approved with remarks, and the ticket hands off to the next approver. Status stays **Pending**.
  - If it was the final rung, the ticket becomes **Approved**.
- **Reject:** the deciding rung is marked Rejected with remarks, and the ticket becomes **Rejected** immediately. A rejection at any step is terminal — the chain stops.
- Remarks are optional on approval, recommended on rejection (the requester needs to know what to fix).
- Approvers see all earlier rungs' remarks before deciding (context, not just the latest note).
- After the fact, an approver can edit their own remarks on an already-processed ticket (status is preserved).

### 4.3 Dashboard & pipeline tracking

Each user gets a role-appropriate view of tickets:

- **Juniors** see only their own submissions (their "pipeline").
- **Seniors/Admins** see all tickets, and can filter by requester.

The dashboard provides:

- **KPI cards:** counts of Total / Pending / Approved / Rejected (scoped to what the user can see).
- **Filters:** status, classification, requester (approvers only), deadline window (Overdue / Due Today / Next 7 Days / Next 30 Days / No Deadline), and free-text search (matches ticket ID, requester name/email, description).
- **Ticket rows** with expandable detail showing description, deliverable links, attachments, the full approval chain, lifecycle timestamps, and all attributed remarks.
- **Action buttons** (Approve / Reject) only on tickets currently awaiting the signed-in approver.

### 4.4 Visibility cues (urgency & aging)

- **Urgent flag:** tickets marked urgent are visually flagged for approvers.
- **Deadline cue:** overdue deadlines are highlighted red; deadlines within 3 days are highlighted amber. Only applies while the ticket is still pending.
- **Aging cue:** a pending ticket that has sat undecided for 3+ days shifts to amber, 7+ days to red — progressively highlighting stalls.

### 4.5 Admin management

- **Manage users:** view all users, promote/demote roles (respecting the tier-change protections in §2).
- **Manage classifications:** add new ticket classifications (name, max length); remove existing ones (deletion is non-destructive to tickets — they keep their historical classification label; if the removed classification was the active filter, it falls back to "All").

---

## 5. Functional Requirements

| ID | Requirement |
| --- | --- |
| FR-1 | Users can sign in as one of the seeded role personas (demo mode), or create a local account that starts as Junior. |
| FR-2 | Any authenticated user can submit a ticket. |
| FR-3 | Submitters define an ordered approval chain of at least one approver (only Senior/Admin users are eligible). |
| FR-4 | A ticket is always assigned to exactly one current approver — the first undecided rung. |
| FR-5 | Approving at a non-final rung advances the chain and keeps the ticket Pending. |
| FR-6 | Approving at the final rung marks the ticket Approved. |
| FR-7 | Rejecting at any rung marks the ticket Rejected (terminal). |
| FR-8 | Every rung decision records status, remarks, and timestamp, attributed to the approver. |
| FR-9 | All earlier rungs' remarks are visible to later approvers and to the requester. |
| FR-10 | Approvers can edit their own remarks on processed tickets without changing status. |
| FR-11 | Juniors only see their own tickets; Seniors/Admins see all. |
| FR-12 | Only the current approver can action a pending ticket. |
| FR-13 | Dashboard supports filters: status, classification, requester, deadline window, free-text search — combinable. |
| FR-14 | Deadline window filter supports: Overdue, Due Today, Next 7 Days, Next 30 Days, No Deadline Set. |
| FR-15 | KPI counts (Total/Pending/Approved/Rejected) reflect the active scope. |
| FR-16 | Pending tickets surface aging cues (3-day / 7-day thresholds) and deadline proximity cues. |
| FR-17 | Attachments support multi-file upload with per-file size limit and total count limit, de-duplication, and in-place preview/download. |
| FR-18 | Deliverable links support subject label + URL with validation. |
| FR-19 | Admins can change user roles, subject to: no self-change, no same-tier change. |
| FR-20 | Admins can add and remove ticket classifications; removal is non-destructive to existing tickets. |
| FR-21 | Session persists across page refreshes; logout returns to the login screen. |
| FR-22 | All changes persist between sessions (data store survives reload); a "reset" option restores the seeded demo state. |

---

## 6. Data Model (conceptual)

```
User
  id, name, email, role (junior|senior|admin), isActive, createdAt, updatedAt

TicketType
  id, name, createdAt

Ticket
  id, ticketId, requesterId, requesterName, requesterEmail,
  type, description, submissionDeadline?, isUrgent,
  status (Pending|Approved|Rejected),
  approverId/approverName   — the current awaiting approver (denormalized)
  approvals[]               — the ordered chain
  currentStepIndex          — index of the rung awaiting action (-1 when done)
  links[]                   — { subject, url }
  attachments[]             — { fileId, filename, contentType, size }
  approvedAt?, createdAt, updatedAt

ApprovalStep (a chain rung)
  approverId, approverName, approverEmail, order, status,
  remarks?, actionedAt?
```

Notes:

- Requester and approver name/email are denormalized onto the ticket so no lookups are needed to render history.
- `currentStepIndex` is kept in sync as the chain advances; `approverId` mirrors it so ownership checks are single-field lookups.

---

## 7. Non-Functional Requirements

- **Demo-friendly:** must run without a server, database, or authentication infrastructure — a realistic seed dataset (users across all roles, tickets in every status and chain state) is preloaded so the app is demonstrable out of the box.
- **Refresh-safe:** state persists across reloads (localStorage in the demo build; any durable store in a real implementation).
- **Role-based access control:** every read and mutation is gated on role and ownership (junior scoping, current-approver gating, admin-only management).
- **Responsive:** usable on desktop and mobile.
- **Accessible:** keyboard-operable controls, semantic markup, visible focus states.
- **Auditable:** all decisions carry identity + timestamp; nothing is silently changed.

---

## 8. Out of Scope for This PRD

- Exact visual design, component styling, and branding (each implementation may choose its own UI).
- Authentication provider, SSO, and production user management.
- Email/Slack notifications, though the "first approver is notified, next approver is notified on hand-off" behavior is implied by the workflow and should be implemented in production.
- Reporting, exports, and analytics beyond the KPI counters.
- Ticket editing/withdrawal by requesters after submission.
- Re-submission of rejected tickets as new tickets (supported naturally by a fresh submission, but no dedicated workflow).

---

## 9. Success Metrics (for a production build)

1. Time-to-first-approval and total time-in-chain per ticket.
2. % of tickets that clear their deadline.
3. Count of pending tickets aging past 7 days (should trend down).
4. % of decisions with remarks on rejection.
5. Audit completeness: 100% of decisions attributed to a user with a timestamp.
