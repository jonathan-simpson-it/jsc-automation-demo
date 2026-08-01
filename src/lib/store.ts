"use client";

import { useEffect, useReducer, useState } from "react";
import { roleChangeAllowed } from "./permissions";
import { seedDB } from "./seed";
import type { Attachment, DB, Role, Ticket, User } from "./types";

const DB_KEY = "stamp:db:v3";
const SESSION_KEY = "stamp:session:v1";

function load(): DB {
  if (typeof window === "undefined") return structuredClone(seedDB);
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DB;
      if (parsed && Array.isArray(parsed.users) && Array.isArray(parsed.tickets)) return parsed;
    }
  } catch {
    // fall through to seed
  }
  return structuredClone(seedDB);
}

let state: DB | null = null;
const listeners = new Set<() => void>();

function ensure(): DB {
  if (!state) state = load();
  return state;
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(state));
  } catch {
    // storage full. Drop silently, in-memory state still works
  }
  listeners.forEach((fn) => fn());
}

export function getDB(): DB {
  return ensure();
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function mutate(fn: (db: DB) => void): DB {
  state = structuredClone(ensure());
  fn(state);
  persist();
  return state;
}

export function resetDemo(): void {
  state = structuredClone(seedDB);
  persist();
}

export function useDB(): DB {
  const [, force] = useReducer((x: number) => x + 1, 0);
  useEffect(() => {
    const onStorage = () => {
      state = load();
      force();
    };
    window.addEventListener("storage", onStorage);
    const unsub = subscribe(force);
    return () => {
      window.removeEventListener("storage", onStorage);
      unsub();
    };
  }, []);
  return ensure();
}

export function setSession(userId: string | null): void {
  if (typeof window === "undefined") return;
  if (userId) localStorage.setItem(SESSION_KEY, userId);
  else localStorage.removeItem(SESSION_KEY);
}

export function getSessionUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

export function useSession(): User | null {
  const db = useDB();
  const uid = getSessionUserId();
  if (!uid) return null;
  return db.users.find((u) => u.id === uid && u.isActive) ?? null;
}

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export function createLocalUser(name: string, email: string): User {
  const user: User = {
    id: uid(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: "junior",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mutate((db) => db.users.push(user));
  return user;
}

export function setUserRole(actor: User, targetId: string, role: Role): string | null {
  const db = getDB();
  const target = db.users.find((u) => u.id === targetId);
  if (!target) return "User not found.";
  const error = roleChangeAllowed(actor, target, role);
  if (error) return error;
  mutate((d) => {
    const t = d.users.find((u) => u.id === targetId)!;
    t.role = role;
    t.updatedAt = new Date().toISOString();
  });
  return null;
}

export function toggleUserActive(actor: User, targetId: string): string | null {
  if (actor.id === targetId) return "You cannot deactivate yourself.";
  const db = getDB();
  const target = db.users.find((u) => u.id === targetId);
  if (!target) return "User not found.";
  mutate((d) => {
    const t = d.users.find((u) => u.id === targetId)!;
    t.isActive = !t.isActive;
    t.updatedAt = new Date().toISOString();
  });
  return null;
}

export function addTicketType(name: string): string | null {
  const clean = name.trim();
  if (!clean) return "Classification name is required.";
  if (clean.length > 40) return "Classification name must be 40 characters or fewer.";
  const db = getDB();
  if (db.types.some((t) => t.name.toLowerCase() === clean.toLowerCase()))
    return "A classification with that name already exists.";
  mutate((d) => d.types.push({ id: uid(), name: clean, createdAt: new Date().toISOString() }));
  return null;
}

export function removeTicketType(typeId: string): void {
  mutate((d) => {
    d.types = d.types.filter((t) => t.id !== typeId);
  });
}

export function createTicket(input: {
  requester: User;
  type: string;
  description: string;
  submissionDeadline?: string;
  isUrgent: boolean;
  approverIds: string[];
  links: { subject: string; url: string }[];
  attachments: Attachment[];
}): Ticket {
  const now = new Date().toISOString();
  const ticket: Ticket = {
    id: uid(),
    ticketId: "",
    requesterId: input.requester.id,
    requesterName: input.requester.name,
    requesterEmail: input.requester.email,
    type: input.type,
    description: input.description,
    submissionDeadline: input.submissionDeadline,
    isUrgent: input.isUrgent,
    status: "Pending",
    approvals: input.approverIds.map((approverId, idx) => {
      const u = getDB().users.find((x) => x.id === approverId)!;
      return {
        approverId: u.id,
        approverName: u.name,
        approverEmail: u.email,
        order: idx,
        status: "Pending" as const,
      };
    }),
    currentStepIndex: 0,
    links: input.links,
    attachments: input.attachments,
    createdAt: now,
    updatedAt: now,
  };
  mutate((db) => {
    ticket.ticketId = `STP-${String(db.seq).padStart(4, "0")}`;
    db.seq += 1;
    db.tickets.unshift(ticket);
  });
  return ticket;
}

export function actionTicket(ticketId: string, action: "approve" | "reject", remarks: string): void {
  const now = new Date().toISOString();
  mutate((db) => {
    const t = db.tickets.find((x) => x.id === ticketId);
    if (!t || t.status !== "Pending" || t.currentStepIndex < 0) return;
    const step = t.approvals[t.currentStepIndex];
    if (step.status !== "Pending") return;
    step.status = action === "approve" ? "Approved" : "Rejected";
    step.remarks = remarks.trim() || undefined;
    step.actionedAt = now;
    if (action === "reject") {
      t.status = "Rejected";
      t.currentStepIndex = -1;
    } else if (t.currentStepIndex >= t.approvals.length - 1) {
      t.status = "Approved";
      t.approvedAt = now;
      t.currentStepIndex = -1;
    } else {
      t.currentStepIndex += 1;
    }
    t.updatedAt = now;
  });
}

export function editRemarks(ticketId: string, stepOrder: number, remarks: string): void {
  mutate((db) => {
    const t = db.tickets.find((x) => x.id === ticketId);
    const step = t?.approvals.find((s) => s.order === stepOrder);
    if (!t || !step || step.status === "Pending") return;
    step.remarks = remarks.trim() || undefined;
    t.updatedAt = new Date().toISOString();
  });
}

export function reassignTicket(ticketId: string, newApproverId: string): string | null {
  const db = getDB();
  const t = db.tickets.find((x) => x.id === ticketId);
  if (!t || t.status !== "Pending" || t.currentStepIndex < 0)
    return "Ticket is not awaiting action.";
  const step = t.approvals[t.currentStepIndex];
  if (step.status !== "Pending") return "This rung has already been actioned.";
  if (t.approvals.some((a) => a.approverId === newApproverId))
    return "That person is already on the chain.";
  const u = db.users.find((x) => x.id === newApproverId);
  if (!u || !u.isActive || (u.role !== "senior" && u.role !== "admin"))
    return "Only active Seniors and Admins can approve.";
  mutate((d) => {
    const tt = d.tickets.find((x) => x.id === ticketId)!;
    const st = tt.approvals[tt.currentStepIndex];
    st.approverId = u.id;
    st.approverName = u.name;
    st.approverEmail = u.email;
    tt.updatedAt = new Date().toISOString();
  });
  return null;
}

export function requestInfo(ticketId: string, user: User, message: string): void {
  mutate((d) => {
    const t = d.tickets.find((x) => x.id === ticketId);
    if (!t) return;
    t.infoRequest = {
      byId: user.id,
      byName: user.name,
      message: message.trim(),
      at: new Date().toISOString(),
    };
    t.updatedAt = new Date().toISOString();
  });
}

/* ======= Out-of-office (display-level demo toggle) ======= */
const OOO_KEY = "stamp:ooo:v1";

export function setOoo(active: boolean): void {
  if (typeof window === "undefined") return;
  if (active) localStorage.setItem(OOO_KEY, "1");
  else localStorage.removeItem(OOO_KEY);
  window.dispatchEvent(new Event("stamp:ooo"));
}

export function getOoo(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(OOO_KEY) === "1";
}

export function useOoo(): boolean {
  const [active, setActive] = useState(getOoo());
  useEffect(() => {
    const sync = () => setActive(getOoo());
    window.addEventListener("stamp:ooo", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("stamp:ooo", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return active;
}

export function actionableIds(tickets: Ticket[], userId: string): string[] {
  return tickets.filter((t) => t.status === "Pending" && t.currentStepIndex >= 0 && t.approvals[t.currentStepIndex].approverId === userId && t.requesterId !== userId).map((t) => t.id);
}
