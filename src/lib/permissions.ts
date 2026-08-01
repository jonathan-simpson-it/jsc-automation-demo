import type { ApprovalStep, Role, Ticket, User } from "./types";

export function canApprove(user?: User | null): boolean {
  return user ? user.role === "senior" || user.role === "admin" : false;
}

export function canSeeAll(user?: User | null): boolean {
  return canApprove(user);
}

export function isAdmin(user?: User | null): boolean {
  return user?.role === "admin";
}

export function eligibleApprovers(users: User[]): User[] {
  return users.filter((u) => u.isActive && (u.role === "senior" || u.role === "admin"));
}

export function currentStep(ticket: Ticket): ApprovalStep | undefined {
  if (ticket.currentStepIndex < 0) return undefined;
  return ticket.approvals[ticket.currentStepIndex];
}

export function canActionTicket(ticket: Ticket, user?: User | null): boolean {
  if (!user || ticket.status !== "Pending") return false;
  const step = currentStep(ticket);
  if (!step) return false;
  return step.status === "Pending" && step.approverId === user.id;
}

export function canEditRemarks(ticket: Ticket, user?: User | null): boolean {
  if (!user) return false;
  return ticket.approvals.some(
    (s) => s.approverId === user.id && s.status !== "Pending" && !!s.actionedAt,
  );
}

export function myStepForEdit(ticket: Ticket, user?: User | null): ApprovalStep | undefined {
  if (!user) return undefined;
  return ticket.approvals.find(
    (s) => s.approverId === user.id && s.status !== "Pending" && !!s.actionedAt,
  );
}

export const ROLE_RANK: Record<Role, number> = { junior: 0, senior: 1, admin: 2 };

export function roleChangeAllowed(actor: User, target: User, next: Role): string | null {
  if (actor.id === target.id) return "You cannot change your own role.";
  if (actor.role !== "admin") return "Only admins can change roles.";
  if (ROLE_RANK[next] > ROLE_RANK[actor.role]) return "You cannot grant a role above your own.";
  if (ROLE_RANK[target.role] === ROLE_RANK[next])
    return "A user's role cannot be changed to the same tier.";
  if (target.role === "admin" && next !== "admin")
    return "Promoting to admin is permanent. Admins cannot be demoted.";
  return null;
}
