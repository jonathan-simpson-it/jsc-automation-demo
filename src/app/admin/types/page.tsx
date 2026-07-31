"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/store";
import { isAdmin } from "@/lib/permissions";
import { AdminTypes } from "@/components/AdminTypes";

export default function AdminTypesPage() {
  const user = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/");
    else if (!isAdmin(user)) router.replace("/dashboard");
  }, [user, router]);

  if (!user) return null;
  if (!isAdmin(user)) return null;

  return (
    <section className="section section--tight">
      <div className="container container--narrow">
        <div className="page-head">
          <div>
            <p className="section-eyebrow">Admin</p>
            <h1 className="serif-h1">Classifications</h1>
            <p className="blurb">Maintain the list of work types a request can be filed under.</p>
          </div>
        </div>
        <AdminTypes />
      </div>
    </section>
  );
}
