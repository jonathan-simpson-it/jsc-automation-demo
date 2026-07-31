"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Ticket, User } from "@/lib/types";
import { useDB, useOoo } from "@/lib/store";
import { canActionTicket, canSeeAll } from "@/lib/permissions";
import { priorityFor, deadlineWindow } from "@/lib/dates";
import { EMPTY_FILTERS, FilterBar, filterMatch, type TicketFilters } from "./FilterBar";
import { StatStrip } from "./StatStrip";
import { QueueList } from "./QueueList";
import { DetailPanel } from "./DetailPanel";
import { RejectModal } from "./RejectModal";
import { actionTicket } from "@/lib/store";

type Quick = "All" | "Requires My Action" | "Waiting on Others" | "High Priority" | "Expiring Soon";

const QUICKS: Quick[] = ["All", "Requires My Action", "Waiting on Others", "High Priority", "Expiring Soon"];

export function Dashboard({ user }: { user: User }) {
  return (
    <Suspense fallback={null}>
      <DashboardContent user={user} />
    </Suspense>
  );
}

function DashboardContent({ user }: { user: User }) {
  const searchParams = useSearchParams();
  const db = useDB();
  const ooo = useOoo();
  const [filters, setFilters] = useState<TicketFilters>(EMPTY_FILTERS);
  const [quick, setQuick] = useState<Quick>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerHidden, setDrawerHidden] = useState(false);
  const [bulk, setBulk] = useState<Set<string>>(new Set());
  const [dense, setDense] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [bulkRejectOpen, setBulkRejectOpen] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);
  const showAll = canSeeAll(user);

  /* Views from sidebar links (?inbox=1 / ?view=mine / ?view=history) */
  useEffect(() => {
    const view = searchParams.get("view");
    const inbox = searchParams.get("inbox") === "1";
    setQuick(inbox ? "Requires My Action" : "All");
    setViewHistory(view === "history");
    setFilters((f) => ({ ...f, requester: view === "mine" ? user.id : "All" }));
  }, [searchParams, user.id]);

  /* Header global search syncs into the filter bar */
  useEffect(() => {
    const onSearch = (e: Event) => {
      const qv = (e as CustomEvent<string>).detail ?? "";
      setFilters((f) => ({ ...f, search: qv }));
    };
    window.addEventListener("stamp:search", onSearch);
    return () => window.removeEventListener("stamp:search", onSearch);
  }, []);

  /* Mobile: queue full width, detail becomes a drawer */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1100px)");
    const onChange = () => setIsDrawer(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Escape closes the mobile drawer */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawer && selectedId && !drawerHidden) setDrawerHidden(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawer, selectedId, drawerHidden]);

  const requesters = useMemo(
    () =>
      Array.from(
        new Map(db.tickets.map((t) => [t.requesterId, { id: t.requesterId, name: t.requesterName }])).values(),
      ),
    [db.tickets],
  );

  const scopeVisible = db.tickets.filter((t) => {
    if (viewHistory && t.status === "Pending") return false;
    return filterMatch(t, filters, showAll ? null : user.id);
  });

  const visible = scopeVisible.filter((t) => {
    const awaitingMe = canActionTicket(t, user) && t.requesterId !== user.id;
    switch (quick) {
      case "Requires My Action":
        return awaitingMe;
      case "Waiting on Others":
        return t.status === "Pending" && !awaitingMe;
      case "High Priority":
        return priorityFor(t.isUrgent, t.status === "Pending", t.submissionDeadline) !== "P3";
      case "Expiring Soon": {
        const w = deadlineWindow(t.submissionDeadline);
        return w === "Due Today" || w === "Overdue";
      }
      default:
        return true;
    }
  });

  useEffect(() => {
    if (!selectedId || !visible.some((t) => t.id === selectedId)) {
      setSelectedId(visible[0]?.id ?? null);
    }
  }, [visible, selectedId]);

  const selected = db.tickets.find((t) => t.id === selectedId) ?? null;
  const actionableSelected = bulk.size
    ? visible.filter((t) => bulk.has(t.id) && canActionTicket(t, user) && t.requesterId !== user.id)
    : [];
  const stats = [
    { label: "Total", count: visible.length },
    { label: "Pending", count: visible.filter((t) => t.status === "Pending").length, tone: "wax" as const },
    { label: "Approved", count: visible.filter((t) => t.status === "Approved").length, tone: "pine" as const },
    { label: "Rejected", count: visible.filter((t) => t.status === "Rejected").length, tone: "oxblood" as const },
  ];

  const selectTicket = (id: string) => {
    setSelectedId(id);
    setDrawerHidden(false);
    if (isDrawer) setBulk(new Set());
  };

  return (
    <section className="dash">
      <div className="container container--wide dash-body">
        {ooo && (
          <p className="info-banner info-banner--wax" role="status" style={{ marginBottom: "1rem" }}>
            Delegation active: your tickets are automatically assigned to your delegate.
          </p>
        )}

        <div className="page-head">
          <div>
            <p className="section-eyebrow">Work pipeline</p>
            <h1 className="serif-h1">{showAll ? "Approval queue" : "My requests"}</h1>
            <p className="blurb">
              {showAll
                ? "See who is asking, what is changing, and where it sits. Decide in one click."
                : "Track where each of your requests sits, and what reviewers said."}
            </p>
          </div>
        </div>

        <StatStrip stats={stats} />

        <div className="quick-row" role="group" aria-label="Quick filters">
          {QUICKS.map((q) => (
            <button
              key={q}
              type="button"
              className={`chip chip--soft quick-chip${quick === q ? " is-active" : ""}`}
              onClick={() => {
                setQuick(q);
                if (q === "Requires My Action") setFilters((f) => ({ ...f, status: "Pending" }));
                if (q === "All") setFilters((f) => ({ ...f, status: filters.status }));
              }}
            >
              {q}
            </button>
          ))}
          <span className="quick-spacer" />
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            aria-pressed={dense}
            onClick={() => setDense((d) => !d)}
          >
            {dense ? "Dense view" : "Comfort view"}
          </button>
        </div>

        <FilterBar
          filters={filters}
          onChange={setFilters}
          types={db.types.map((t) => t.name)}
          requesters={requesters}
          showRequester={showAll}
        />

        <div className="workspace">
          <QueueList
            tickets={visible}
            user={user}
            selectedId={selectedId}
            onSelect={selectTicket}
            bulk={bulk}
            onBulkToggle={(id) =>
              setBulk((s) => {
                const next = new Set(s);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
              })
            }
            dense={dense}
          />

          {isDrawer ? (
            <>
              <div
                className={`drawer-scrim${selected && !drawerHidden ? " is-open" : ""}`}
                onClick={() => setDrawerHidden(true)}
              />
              <div
                className={`drawer${selected && !drawerHidden ? " is-open" : ""}`}
                role="dialog"
                aria-modal="true"
              >
                {selected && (
                  <DetailPanel
                    ticket={selected}
                    user={user}
                    onBack={() => setDrawerHidden(true)}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="workspace-detail">
              {selected ? (
                <DetailPanel ticket={selected} user={user} />
              ) : (
                <div className="panel-card empty-state">
                  <p className="serif-h2">Select a ticket</p>
                  <p className="text-muted">Choose a request from the queue to review it.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {bulk.size > 0 && (
          <div className="bulk-bar" role="region" aria-label="Bulk actions">
            <span className="bulk-count">
              {bulk.size} selected · {actionableSelected.length} actionable
            </span>
            <button
              type="button"
              className="btn btn-approve btn-sm"
              disabled={actionableSelected.length === 0}
              onClick={() => {
                actionableSelected.forEach((t) => actionTicket(t.id, "approve", ""));
                setBulk(new Set());
              }}
            >
              Approve selected
            </button>
            <button
              type="button"
              className="btn btn-reject btn-sm"
              disabled={actionableSelected.length === 0}
              onClick={() => setBulkRejectOpen(true)}
            >
              Reject selected
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setBulk(new Set())}>
              Clear
            </button>
          </div>
        )}

        <RejectModal
          open={bulkRejectOpen}
          bulkCount={actionableSelected.length}
          onClose={() => setBulkRejectOpen(false)}
          onConfirm={(reason) => {
            actionableSelected.forEach((t) =>
              actionTicket(t.id, "reject", `${reason.category}: ${reason.explanation}`),
            );
            setBulkRejectOpen(false);
            setBulk(new Set());
          }}
        />
      </div>
    </section>
  );
}
