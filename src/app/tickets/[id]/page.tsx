"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDB, useSession } from "@/lib/store";
import { canSeeAll } from "@/lib/permissions";
import { DetailPanel } from "@/components/DetailPanel";

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>();
  const user = useSession();
  const db = useDB();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router]);

  const ticket = db.tickets.find((t) => t.id === params.id);
  const denied = ticket && !canSeeAll(user) && ticket.requesterId !== user?.id;

  if (!user) return null;

  if (!ticket || denied) {
    return (
      <section className="section">
        <div className="container">
          <div className="panel-card empty-state">
            <p className="serif-h2">Ticket not found</p>
            <p className="text-muted">
              It doesn't exist, or you don't have clearance to view it.{" "}
              <Link href="/dashboard">Back to the pipeline</Link>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--tight">
      <div className="container container--narrow">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/dashboard">Pipeline</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{ticket.ticketId}</span>
        </nav>
        <DetailPanel ticket={ticket} user={user} />
      </div>
    </section>
  );
}
