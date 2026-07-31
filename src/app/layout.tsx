import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ClientShell } from "@/components/ClientShell";
import { Header } from "@/components/Header";
import { SidebarNav } from "@/components/SidebarNav";
import { Footer } from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Stamp · Approval Pipeline",
  description:
    "Route work through an ordered chain of reviewers. Every sign-off visible, attributed, and auditable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body>
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
      </body>
    </html>
  );
}
