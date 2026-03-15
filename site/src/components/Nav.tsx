'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Nav.module.css'

const navLinks = [
  { label: 'Studio',  href: '/studio'  },
  { label: 'Objects', href: '/objects' },
  { label: 'Art',     href: '/art'     },
  { label: 'Image',   href: '/image'   },
  { label: 'Store',   href: '/store'   },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  // Home: image in col-1 (dark) → wordmark goes light
  const isHome = pathname === '/'
  // Studio: image in cols 5-12 (dark) → links in col-3 go light
  const isStudio = pathname === '/studio'

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close overlay on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Close overlay when route changes
  useEffect(() => { setOpen(false) }, [pathname])

  const navClass = [
    styles.nav,
    isHome   && !open ? styles.navLight       : '',
    isStudio && !open ? styles.navLinksLight   : '',
    open              ? styles.navOpen         : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <header className={navClass}>
        <div className={styles.inner}>
          <Link href="/" className={styles.wordmark}>AW</Link>

          <div className={styles.navContent}>
            {/* Desktop */}
            <nav className={styles.links}>
              {navLinks.map(({ label, href }) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </nav>

            {/* Mobile */}
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-page overlay */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Site navigation"
      >
        <nav className={styles.overlayNav}>
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={styles.overlayLink}
              tabIndex={open ? 0 : -1}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
