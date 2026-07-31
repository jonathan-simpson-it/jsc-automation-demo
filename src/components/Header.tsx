"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { resetDemo, setOoo, setSession, useDB, useOoo, useSession } from "@/lib/store";
import { canActionTicket } from "@/lib/permissions";

export function Header() {
  const user = useSession();
  const db = useDB();
  const router = useRouter();
  const ooo = useOoo();
  const [confirmReset, setConfirmReset] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    const onSearch = (e: Event) => {
      setSearch((e as CustomEvent<string>).detail ?? "");
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("stamp:search", onSearch);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("stamp:search", onSearch);
    };
  }, []);

  if (!user) return null;

  const awaitingMe = db.tickets.filter((t) => canActionTicket(t, user) && t.requesterId !== user.id).length;

  const logout = () => {
    setSession(null);
    router.replace("/");
  };

  const onSearchChange = (q: string) => {
    setSearch(q);
    window.dispatchEvent(new CustomEvent("stamp:search", { detail: q }));
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/dashboard" className="brand" aria-label="Stamp, pipeline home">
          <img src="/jsc-logo.png" alt="" className="brand-mark-img" width={36} height={36} />
          <span className="brand-wordmark">Stamp</span>
        </Link>

        <div className="header-search">
          <span className="header-search-hint" aria-hidden="true">
            ⌘K
          </span>
          <input
            ref={searchRef}
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tickets…"
            aria-label="Search tickets"
          />
        </div>

        <div className="header-actions">
          <label className="ooo-toggle">
            <input
              type="checkbox"
              checked={ooo}
              onChange={(e) => setOoo(e.target.checked)}
              aria-label="Out of office delegation"
            />
            <span className="ooo-slider" aria-hidden="true" />
            <span className="ooo-label">OOO</span>
          </label>

          <button
            type="button"
            className="bell"
            aria-label={`Notifications, ${awaitingMe} awaiting action`}
            onClick={() => router.push("/dashboard?inbox=1")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
            {awaitingMe > 0 && <span className="bell-badge">{awaitingMe}</span>}
          </button>

          <span className="chip chip--soft">{user.role}</span>
          <span className="header-user-name">{user.name}</span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={logout}>
            Sign out
          </button>
          {confirmReset ? (
            <span className="reset-confirm">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  resetDemo();
                  setConfirmReset(false);
                }}
              >
                Restore now
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </span>
          ) : (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(true)}>
              Restore sample data
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
