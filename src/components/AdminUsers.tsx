"use client";

import { useState } from "react";
import type { Role, User } from "@/lib/types";
import { ROLE_LABEL } from "@/lib/types";
import { setUserRole, toggleUserActive, useDB } from "@/lib/store";
import { roleChangeAllowed } from "@/lib/permissions";

const ROLES: Role[] = ["junior", "senior", "admin"];

function RoleSelect({
  actor,
  target,
  onError,
}: {
  actor: User;
  target: User;
  onError: (msg: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <select
      value={target.role}
      disabled={busy}
      aria-label={`Role of ${target.name}`}
      onChange={async (e) => {
        const next = e.target.value as Role;
        if (next === target.role) return;
        setBusy(true);
        const err = setUserRole(actor, target.id, next);
        setBusy(false);
        if (err) {
          e.target.value = target.role;
          onError(err);
        }
      }}
    >
      {ROLES.map((r) => (
        <option key={r} value={r}>
          {ROLE_LABEL[r]}
        </option>
      ))}
    </select>
  );
}

export function AdminUsers({ actor }: { actor: User }) {
  const [notice, setNotice] = useState<string | null>(null);
  const db = useDB();

  return (
    <div className="admin-panel">
      {notice && (
        <p className="form-error" role="alert">
          {notice}
        </p>
      )}
      <p className="form-hint">
        New accounts start as Junior. You can't change your own role, roles can't be moved to the
        same tier, and promoting someone to Admin is permanent.
      </p>
      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {db.users.map((u) => {
              const canChange =
                roleChangeAllowed(actor, u, u.role === "admin" ? "junior" : "admin") === null;
              return (
                <tr key={u.id} className={actor.id === u.id ? "row-self" : undefined}>
                  <td>
                    {u.name}
                    {actor.id === u.id && <span className="tag tag--soft" style={{ marginLeft: "0.5rem" }}>You</span>}
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <RoleSelect actor={actor} target={u} onError={setNotice} />
                  </td>
                  <td>
                    <span className={`tag ${u.isActive ? "tag--pine" : "tag--oxblood"}`}>
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      disabled={!canChange || actor.id === u.id}
                      onClick={() => {
                        const err = toggleUserActive(actor, u.id);
                        if (err) setNotice(err);
                      }}
                    >
                      {u.isActive ? "Deactivate" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
