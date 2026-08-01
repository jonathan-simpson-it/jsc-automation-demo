"use client";

import { useState } from "react";
import { addTicketType, removeTicketType, useDB } from "@/lib/store";

export function AdminTypes() {
  const db = useDB();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const usage = (typeName: string) => db.tickets.filter((t) => t.type === typeName).length;

  const add = () => {
    const err = addTicketType(name);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setName("");
  };

  return (
    <div className="admin-panel">
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <form
        className="add-type-form"
        onSubmit={(e) => {
          e.preventDefault();
          add();
        }}
      >
        <label className="field">
          <span className="field-label">New classification</span>
          <input value={name} maxLength={40} onChange={(e) => setName(e.target.value)} placeholder="e.g. Engagement Letter" />
        </label>
        <button type="submit" className="btn btn-solid">
          Add
        </button>
      </form>
      <p className="form-hint">
        Removing a classification never touches existing tickets. They keep their historical label.
        If it was the active pipeline filter, the filter falls back to “All”.
      </p>
      <ul className="type-list" role="list">
        {db.types.map((t) => (
          <li key={t.id} className="panel-card type-row">
            <span className="type-name">{t.name}</span>
            <span className="text-muted">
              {usage(t.name)} ticket{usage(t.name) === 1 ? "" : "s"}
            </span>
            {confirmId === t.id ? (
              <span className="type-confirm">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    removeTicketType(t.id);
                    setConfirmId(null);
                  }}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setConfirmId(null)}
                >
                  Cancel
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setConfirmId(t.id)}
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
