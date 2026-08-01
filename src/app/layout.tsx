import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./root.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Jonathan Simpson & Co. · Automation",
  description:
    "Route work through an ordered chain of reviewers. Every sign-off visible, attributed, and auditable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
