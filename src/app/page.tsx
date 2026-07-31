"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/store";
import { LoginScreen } from "@/components/LoginScreen";

export default function HomePage() {
  const user = useSession();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  return <LoginScreen />;
}
