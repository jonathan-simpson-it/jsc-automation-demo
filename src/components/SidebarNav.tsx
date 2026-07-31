"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDB, useSession, useOoo } from "@/lib/store";
import { canActionTicket, isAdmin } from "@/lib/permissions";
import { Avatar } from "./Avatar";

export function SidebarNav() {
  const user = useSession();
  const db = useDB();
  const pathname = usePathname();
  const ooo = useOoo();

  if (!user) return null;

  const awaitingMe = db.tickets.filter((t) => canActionTicket(t, user) && t.requesterId !== user.id);
  const myRequests = db.tickets.filter((t) => t.requesterId === user.id);
  const history = db.tickets.filter((t) => t.status !== "Pending");
  const canSeeAll = isAdmin(user) || user.role === "senior";

  const item = (href: string, label: string, count: number, active: boolean) => (
    <Link
      href={href}
      className={`nav-link${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      <span className="nav-link-label">{label}</span>
      {count > 0 && <span className="nav-link-count">{count}</span>}
    </Link>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="section-eyebrow">Queue</p>
        {item("/dashboard?inbox=1", "Inbox", awaitingMe.length, pathname === "/dashboard" && typeof window !== "undefined" && window.location.search.includes("inbox=1"))}
        {item("/dashboard?view=mine", "My Requests", myRequests.length, pathname === "/dashboard" && typeof window !== "undefined" && window.location.search.includes("view=mine"))}
        {item("/dashboard?view=history", "History / Archive", history.length, pathname === "/dashboard" && typeof window !== "undefined" && window.location.search.includes("view=history"))}
      </div>
      {canSeeAll && (
        <div className="sidebar-section">
          <p className="section-eyebrow">Admin</p>
          {item("/admin/users", "Users", 0, pathname.startsWith("/admin/users"))}
          {item("/admin/types", "Classifications", 0, pathname.startsWith("/admin/types"))}
        </div>
      )}
      <div className="sidebar-foot">
        {ooo && (
          <p className="sidebar-note" role="status">
            Delegation active: tickets are routed to your delegate.
          </p>
        )}
        <div className="sidebar-user">
          <Avatar name={user.name} size={30} />
          <div>
            <p className="sidebar-user-name">{user.name}</p>
            <p className="sidebar-user-meta">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
