"use client";

import { useEffect, useState } from "react";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: "100vh" }} aria-hidden="true" />;
  return <>{children}</>;
}
