"use client";

import type { Ticket, User } from "@/lib/types";
import { QueueCard } from "./QueueCard";

export function QueueList({
  tickets,
  user,
  selectedId,
  onSelect,
  bulk,
  onBulkToggle,
  dense,
}: {
  tickets: Ticket[];
  user: User;
  selectedId: string | null;
  onSelect: (id: string) => void;
  bulk: Set<string>;
  onBulkToggle: (id: string) => void;
  dense: boolean;
}) {
  return (
    <div className="queue">
      <div className="queue-head">
        <p className="queue-count">
          {tickets.length} ticket{tickets.length === 1 ? "" : "s"}
        </p>
      </div>
      {tickets.length === 0 ? (
        <div className="queue-empty">
          <p className="serif-h2">Queue is empty</p>
          <p className="text-muted">Nothing matches the active filters.</p>
        </div>
      ) : (
        <ul className="queue-list" role="list" aria-label="Ticket queue">
          {tickets.map((t) => (
            <QueueCard
              key={t.id}
              ticket={t}
              selected={selectedId === t.id}
              bulkSelected={bulk.has(t.id)}
              onSelect={() => onSelect(t.id)}
              onBulkToggle={() => onBulkToggle(t.id)}
              dense={dense}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
