export type Role = "junior" | "senior" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TicketType {
  id: string;
  name: string;
  createdAt: string;
}

export type StepStatus = "Pending" | "Approved" | "Rejected";
export type TicketStatus = "Pending" | "Approved" | "Rejected";

export interface ApprovalStep {
  approverId: string;
  approverName: string;
  approverEmail: string;
  order: number;
  status: StepStatus;
  remarks?: string;
  actionedAt?: string;
}

export interface DeliverableLink {
  subject: string;
  url: string;
}

export interface Attachment {
  fileId: string;
  filename: string;
  contentType: string;
  size: number;
  dataUrl?: string;
}

export interface InfoRequest {
  byId: string;
  byName: string;
  message: string;
  at: string;
}

export interface Ticket {
  id: string;
  ticketId: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  type: string;
  description: string;
  submissionDeadline?: string;
  isUrgent: boolean;
  status: TicketStatus;
  approvals: ApprovalStep[];
  currentStepIndex: number;
  links: DeliverableLink[];
  attachments: Attachment[];
  infoRequest?: InfoRequest;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DB {
  users: User[];
  types: TicketType[];
  tickets: Ticket[];
  seq: number;
}

export const ROLE_LABEL: Record<Role, string> = {
  junior: "Junior",
  senior: "Senior",
  admin: "Admin",
};
