"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/dashboard") return null;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <p className="footer-brand-large">
              Stamp
              <br />
              <span style={{ color: "var(--color-accent)" }}>·</span>
            </p>
            <p className="text-muted">The approval pipeline for Jonathan Simpson &amp; Co.</p>
          </div>
          <div>
            <p className="footer-heading">About</p>
            <ul className="footer-links">
              <li>
                <a href="https://www.linkedin.com/company/jonathan-simpson-co">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-meta">
          <p>&copy; 2026 Jonathan Simpson &amp; Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
