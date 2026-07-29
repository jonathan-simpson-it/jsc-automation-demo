'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Demo', href: '/demo' },
  { label: 'Connectors', href: '/#connectors' },
  { label: 'Pricing', href: '/#pricing' },
]

export default function HeaderNav() {
  const pathname = usePathname()
  if (pathname === '/demo') return null
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header className="sticky top-0 z-50 bg-jsc-bg/95 backdrop-blur-sm border-b border-jsc-line">
      <div className="container-site flex items-center justify-between h-14">
        <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
          <img src="/JSC-logo.png" alt="Jonathan Simpson &amp; Co." className="h-7 w-auto" />
          <span className="font-serif text-[0.95rem] text-jsc-ink hidden sm:inline leading-none pt-0.5">
            Jonathan Simpson &amp; Co.
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.78rem] uppercase tracking-[0.06em] text-jsc-muted no-underline hover:text-jsc-ink transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://jonathansimpson.co/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[0.72rem] min-h-[2.25rem] px-4"
          >
            Book Consultation
          </a>
        </nav>

        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-jsc-pill hover:bg-jsc-accent-soft transition-colors duration-200 cursor-pointer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden overflow-hidden border-t border-jsc-line"
          >
            <div className="container-site py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[0.82rem] text-jsc-muted no-underline hover:text-jsc-ink transition-colors duration-200 py-1"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://jonathansimpson.co/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-[0.72rem] min-h-[2.25rem] px-4 self-start mt-2"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
