'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

const readLinks = [
  { label: 'Demo', href: '/demo' },
  { label: 'Connectors', href: '/#connectors' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Blog', href: '/blog' },
]

export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/demo') return null

  return (
    <footer className="border-t border-jsc-line">
      <div className="container-site section--tight">
        <div className="footer-inner">
          <div className="min-w-0">
            <p className="font-serif text-[clamp(1.3rem,3.5vw,2rem)] text-jsc-ink leading-tight">
              {siteConfig.brandName}
            </p>
            <p className="text-[0.78rem] text-jsc-muted mt-1.5 leading-relaxed max-w-sm">
              {siteConfig.positioningStatement}
            </p>
          </div>

          <div>
            <p className="footer-heading">Connect</p>
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
            <p className="footer-heading">Explore</p>
            <ul className="footer-links">
              {readLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-heading">Start</p>
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
            &copy; {new Date().getFullYear()} {siteConfig.brandName}. All
            rights reserved. This is a demonstration application. Reference
            pricing and pipeline simulations are for illustrative purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
