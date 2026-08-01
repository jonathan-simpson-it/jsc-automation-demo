import type { Metadata } from "next";
import "./app.css";
import { ClientShell } from "@/components/ClientShell";
import { Header } from "@/components/Header";
import { SidebarNav } from "@/components/SidebarNav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Stamp · Approval Pipeline",
  description:
    "Route work through an ordered chain of reviewers. Every sign-off visible, attributed, and auditable.",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientShell>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <div className="app-shell">
        <SidebarNav />
        <main id="main" className="main-area">
          {children}
        </main>
      </div>
      <Footer />
    </ClientShell>
  );
}
