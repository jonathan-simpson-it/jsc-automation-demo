"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/store";
import { SubmitForm } from "@/components/SubmitForm";

export default function SubmitPage() {
  const user = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router]);

  if (!user) return null;

  return (
    <section className="section section--tight">
      <div className="container">
        <div className="page-head">
          <div>
            <p className="section-eyebrow">New request</p>
            <h1 className="serif-h1">Route work for sign-off</h1>
            <p className="blurb">
              Describe the deliverable, attach anything reviewers need, and set the order of
              reviewers who sign off.
            </p>
          </div>
        </div>
        <SubmitForm user={user} />
      </div>
    </section>
  );
}
