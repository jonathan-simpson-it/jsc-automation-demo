'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'

export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/demo') return null

  return (
    <footer className="border-t border-jsc-line">
      <div className="container-site section--tight">
        <div className="footer-inner">
          <div className="min-w-0">
            <p className="footer-brand-wordmark font-serif text-jsc-ink">
              Jonathan<br />Simpson &amp;<br />Co.
            </p>
            <p className="text-[0.78rem] text-jsc-muted mt-1.5 leading-relaxed max-w-sm">
              {siteConfig.positioningStatement}
            </p>
          </div>

          <div>
            <p className="footer-heading">{siteConfig.footer.columnHeadings.connect}</p>
            <ul className="footer-links">
              {siteConfig.socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-heading">{siteConfig.footer.columnHeadings.explore}</p>
            <ul className="footer-links">
              {siteConfig.footer.exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-heading">{siteConfig.footer.columnHeadings.start}</p>
            <a
              href={siteConfig.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-[0.72rem] min-h-[2.25rem] px-4 inline-flex items-center justify-center"
            >
              {siteConfig.primaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-jsc-line">
        <div className="container-site py-4">
          <p className="text-[0.72rem] text-jsc-muted">
            &copy; {new Date().getFullYear()} {siteConfig.brandName}. {siteConfig.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
