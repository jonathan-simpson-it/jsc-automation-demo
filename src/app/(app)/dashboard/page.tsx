"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/store";
import { Dashboard } from "@/components/Dashboard";

export default function DashboardPage() {
  const user = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router]);

  if (!user) return null;
  return <Dashboard user={user} />;
}
