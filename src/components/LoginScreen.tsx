"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createLocalUser, setSession, useDB } from "@/lib/store";
import { ROLE_LABEL, type Role } from "@/lib/types";
import { StampMark } from "./StampMark";

const ROLE_ORDER: Role[] = ["admin", "senior", "junior"];

export function LoginScreen() {
  const db = useDB();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const signIn = (userId: string) => {
    setSession(userId);
    router.replace("/dashboard");
  };

  const createAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (db.users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      setError("An account with that email already exists. Pick the matching persona instead.");
      return;
    }
    const user = createLocalUser(name, email);
    setError(null);
    signIn(user.id);
  };

  return (
    <div className="login-screen">
      <div className="login-brand">
        <StampMark size={44} />
        <span className="brand-wordmark brand-wordmark--lg">Stamp</span>
        <p className="section-eyebrow">Approval pipeline</p>
      </div>

      <section className="panel-card login-panel">
        <div className="section-intro">
          <h1 className="serif-h1 serif-h1--hero">Sign in</h1>
          <p className="login-desc">
            Pick a persona to explore the pipeline. New accounts start as a Junior. Sign-off powers
            come later.
          </p>
        </div>

        <div className="persona-groups">
          {ROLE_ORDER.map((role) => {
            const group = db.users.filter((u) => u.role === role && u.isActive);
            if (!group.length) return null;
            return (
              <div key={role} style={{ marginBottom: "1rem" }}>
                <p className="persona-group-label">{ROLE_LABEL[role]}</p>
                <ul className="persona-list" role="list">
                  {group.map((u) => (
                    <li key={u.id}>
                      <button type="button" className="persona-btn" onClick={() => signIn(u.id)}>
                        <span className="persona-body">
                          <span className="persona-name">{u.name}</span>
                          <br />
                          <span className="persona-email">{u.email}</span>
                        </span>
                        <span className="persona-role">
                          <span className="chip chip--soft">{ROLE_LABEL[role]}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="login-divider" role="separator">
          <span>or create a local account</span>
        </div>

        <form className="login-form" onSubmit={createAccount}>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <label className="field">
            <span className="field-label">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
          </label>
          <label className="field">
            <span className="field-label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@jsandco.com"
            />
          </label>
          <button type="submit" className="btn btn-solid">
            Create account &amp; sign in
          </button>
        </form>
      </section>
    </div>
  );
}
