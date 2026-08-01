"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/store";
import { isAdmin } from "@/lib/permissions";
import { AdminUsers } from "@/components/AdminUsers";

export default function AdminUsersPage() {
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
            <h1 className="serif-h1">Manage users</h1>
            <p className="blurb">Promote and demote roles, and deactivate accounts.</p>
          </div>
        </div>
        <AdminUsers actor={user} />
      </div>
    </section>
  );
}
