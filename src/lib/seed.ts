import type { ApprovalStep, Attachment, DB, Ticket, TicketType, User } from "./types";
import { daysFromNow, hoursAgo } from "./dates";

const svgAttachment = (label: string, tone: string): Attachment => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="240" height="160" fill="${tone}"/><text x="16" y="88" font-family="Georgia,serif" font-size="22" fill="#161714">${label}</text></svg>`;
  return {
    fileId: `att-${label.toLowerCase().replace(/\W+/g, "-")}`,
    filename: `${label.toLowerCase().replace(/\W+/g, "-")}.svg`,
    contentType: "image/svg+xml",
    size: svg.length,
    dataUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
  };
};

const users: User[] = [
  { id: "u-jonathan", name: "Jonathan Simpson", email: "jonathan@jsandco.com", role: "admin", isActive: true, createdAt: hoursAgo(24 * 400), updatedAt: hoursAgo(24 * 400) },
  { id: "u-amelia", name: "Amelia Hart", email: "amelia@jsandco.com", role: "admin", isActive: true, createdAt: hoursAgo(24 * 300), updatedAt: hoursAgo(24 * 300) },
  { id: "u-marcus", name: "Marcus Chen", email: "marcus@jsandco.com", role: "senior", isActive: true, createdAt: hoursAgo(24 * 260), updatedAt: hoursAgo(24 * 260) },
  { id: "u-priya", name: "Priya Natarajan", email: "priya@jsandco.com", role: "senior", isActive: true, createdAt: hoursAgo(24 * 210), updatedAt: hoursAgo(24 * 210) },
  { id: "u-sofia", name: "Sofia Reyes", email: "sofia@jsandco.com", role: "senior", isActive: true, createdAt: hoursAgo(24 * 180), updatedAt: hoursAgo(24 * 180) },
  { id: "u-daniel", name: "Daniel Osei", email: "daniel@jsandco.com", role: "junior", isActive: true, createdAt: hoursAgo(24 * 90), updatedAt: hoursAgo(24 * 90) },
  { id: "u-emma", name: "Emma Kowalski", email: "emma@jsandco.com", role: "junior", isActive: true, createdAt: hoursAgo(24 * 60), updatedAt: hoursAgo(24 * 60) },
  { id: "u-lucas", name: "Lucas Meyer", email: "lucas@jsandco.com", role: "junior", isActive: true, createdAt: hoursAgo(24 * 30), updatedAt: hoursAgo(24 * 30) },
];

const types: TicketType[] = [
  { id: "t-proposal", name: "Proposal", createdAt: hoursAgo(24 * 400) },
  { id: "t-deck", name: "Client Deck", createdAt: hoursAgo(24 * 400) },
  { id: "t-memo", name: "Memorandum", createdAt: hoursAgo(24 * 400) },
  { id: "t-report", name: "Report", createdAt: hoursAgo(24 * 400) },
  { id: "t-brief", name: "Internal Brief", createdAt: hoursAgo(24 * 400) },
  { id: "t-deliverable", name: "Deliverable", createdAt: hoursAgo(24 * 400) },
];

const byId = (id: string) => users.find((u) => u.id === id)!;

function step(approverId: string, status: ApprovalStep["status"], remarks?: string, actionedAt?: string): ApprovalStep {
  const u = byId(approverId);
  return { approverId: u.id, approverName: u.name, approverEmail: u.email, order: 0, status, remarks, actionedAt };
}

let order = 0;
const chain = (...steps: ApprovalStep[]): ApprovalStep[] =>
  steps.map((s) => ({ ...s, order: order++ }));

function ticket(partial: Partial<Ticket> & Pick<Ticket, "ticketId" | "type" | "description">): Ticket {
  return {
    id: partial.id ?? partial.ticketId.toLowerCase(),
    requesterId: partial.requesterId ?? "u-daniel",
    requesterName: partial.requesterName ?? byId(partial.requesterId ?? "u-daniel").name,
    requesterEmail: partial.requesterEmail ?? byId(partial.requesterId ?? "u-daniel").email,
    isUrgent: false,
    status: "Pending",
    currentStepIndex: -1,
    approvals: partial.approvals ?? [],
    links: [],
    attachments: [],
    createdAt: hoursAgo(24),
    updatedAt: hoursAgo(24),
    ...partial,
  };
}

const approvedAt = hoursAgo(24 * 2);

const tickets: Ticket[] = [
  ticket({
    ticketId: "STP-0001", type: "Proposal", requesterId: "u-daniel", isUrgent: true,
    submissionDeadline: daysFromNow(-1),
    description: "RFP response for Meridian Logistics, a 60-slide proposal deck. Client sign-off required before submission; tender closes Friday.",
    links: [{ subject: "RFP brief", url: "https://drive.jsandco.com/rfp-meridian" }],
    attachments: [svgAttachment("Proposal v4", "#e3e9e6")],
    createdAt: hoursAgo(24 * 5),
    approvals: chain(step("u-marcus", "Pending")),
    currentStepIndex: 0,
  }),
  ticket({
    ticketId: "STP-0002", type: "Client Deck", requesterId: "u-emma",
    submissionDeadline: daysFromNow(2),
    description: "Quarterly business review deck for Northwind Retail. Appendices trimmed per earlier feedback; needs one more senior pass before delivery.",
    links: [{ subject: "Deck draft", url: "https://drive.jsandco.com/northwind-qbr" }],
    createdAt: hoursAgo(24 * 3),
    approvals: chain(
      step("u-marcus", "Approved", "Structure is solid. Trim the appendices to three pages.", hoursAgo(24)),
      step("u-priya", "Pending"),
    ),
    currentStepIndex: 1,
  }),
  ticket({
    ticketId: "STP-0003", type: "Memorandum", requesterId: "u-lucas",
    description: "Internal memo on pricing policy changes for the partner offsite. Approved on both rungs, no further action.",
    createdAt: hoursAgo(24 * 4),
    approvals: chain(
      step("u-amelia", "Approved", "Clear and consistent with the rate card.", hoursAgo(24 * 3)),
      step("u-jonathan", "Approved", "Agreed. Circulate to partners.", hoursAgo(24 * 2)),
    ),
    status: "Approved", approvedAt,
  }),
  ticket({
    ticketId: "STP-0004", type: "Report", requesterId: "u-daniel",
    submissionDeadline: daysFromNow(6),
    description: "Market sizing report for the Avira diligence engagement. Rejected at first rung. Methodology needs rework before resubmission.",
    createdAt: hoursAgo(24 * 6),
    approvals: chain(
      step("u-marcus", "Rejected", "Methodology section doesn't match the engagement scope. Rework the assumptions before resubmission.", hoursAgo(24 * 4)),
    ),
    status: "Rejected",
  }),
  ticket({
    ticketId: "STP-0005", type: "Internal Brief", requesterId: "u-emma",
    description: "Brief for the internal AI-readiness workshop. Waiting on Sofia; four days without a decision.",
    createdAt: hoursAgo(24 * 4),
    approvals: chain(step("u-sofia", "Pending")),
    currentStepIndex: 0,
  }),
  ticket({
    ticketId: "STP-0006", type: "Client Deck", requesterId: "u-lucas",
    submissionDeadline: daysFromNow(0),
    description: "Pitch deck for the Halcyon renewal. Due today. Been sitting with Marcus for nine days.",
    createdAt: hoursAgo(24 * 9),
    approvals: chain(step("u-marcus", "Pending")),
    currentStepIndex: 0,
  }),
  ticket({
    ticketId: "STP-0007", type: "Proposal", requesterId: "u-priya",
    submissionDeadline: daysFromNow(10),
    description: "Proposal for the Atlas portfolio review. Submitted by Priya on her own behalf. Awaiting final partner sign-off.",
    createdAt: hoursAgo(24),
    approvals: chain(step("u-jonathan", "Pending")),
    currentStepIndex: 0,
  }),
  ticket({
    ticketId: "STP-0008", type: "Memorandum", requesterId: "u-emma",
    submissionDeadline: daysFromNow(5),
    description: "Memorandum on the Berlin expansion legal review. Cleared through all three rungs.",
    createdAt: hoursAgo(24 * 5),
    approvals: chain(
      step("u-priya", "Approved", "No issues.", hoursAgo(24 * 4)),
      step("u-marcus", "Approved", "Aligns with the legal opinion.", hoursAgo(24 * 3)),
      step("u-jonathan", "Approved", "Approved for delivery.", hoursAgo(24 * 2)),
    ),
    status: "Approved", approvedAt: hoursAgo(24 * 2),
  }),
  ticket({
    ticketId: "STP-0009", type: "Report", requesterId: "u-daniel",
    description: "Benchmarking report for the internal ops review. Freshly submitted, one day old.",
    attachments: [svgAttachment("Benchmark data", "#d6d8d1")],
    createdAt: hoursAgo(24),
    approvals: chain(step("u-amelia", "Pending")),
    currentStepIndex: 0,
  }),
  ticket({
    ticketId: "STP-0010", type: "Deliverable", requesterId: "u-emma",
    submissionDeadline: daysFromNow(3),
    description: "Client deliverable pack for Verity & Sons. Passed Sofia, rejected by Marcus over the pricing page.",
    links: [{ subject: "Deliverable pack", url: "https://drive.jsandco.com/verity-pack" }],
    createdAt: hoursAgo(24 * 5),
    approvals: chain(
      step("u-sofia", "Approved", "Good draft. Watch the footer spacing.", hoursAgo(24 * 4)),
      step("u-marcus", "Rejected", "Pricing page conflicts with the rate card. Fix and route again.", hoursAgo(24 * 2)),
    ),
    status: "Rejected",
  }),
  ticket({
    ticketId: "STP-0011", type: "Proposal", requesterId: "u-lucas",
    submissionDeadline: daysFromNow(20),
    description: "Proposal for the Cassini data engagement. Submitted today; early in the pipeline.",
    createdAt: hoursAgo(2),
    approvals: chain(step("u-priya", "Pending")),
    currentStepIndex: 0,
  }),
  ticket({
    ticketId: "STP-0012", type: "Internal Brief", requesterId: "u-daniel", isUrgent: true,
    description: "Urgent brief on the client workshop logistics for next week. Needs partner visibility today.",
    createdAt: hoursAgo(3),
    approvals: chain(step("u-jonathan", "Pending")),
    currentStepIndex: 0,
  }),
];

export const seedDB: DB = {
  users,
  types,
  tickets,
  seq: 13,
};
