'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Nav.module.css'
import LogoSolid from './icons/LogoSolid'

const navLinks = [
  { label: 'Studio',  href: '/studio'  },
  { label: 'Objects', href: '/objects' },
  { label: 'Art',     href: '/art'     },
  { label: 'Image',   href: '/image'   },
  { label: 'Store',   href: '/store'   },
]

// Both heroes are 100svh, so the nav sits over dark imagery only while its
// own 56px band is still inside the first viewport.
const NAV_H = 56

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const pathname = usePathname()
  // Home: image in col-1 (dark) → wordmark goes light
  const isHome = pathname === '/'
  // Studio: image in cols 5-12 (dark) → links in col-3 go light
  const isStudio = pathname === '/studio'
  const hasHero = isHome || isStudio

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

  // The light treatment is only correct while the nav is actually over the
  // hero image. Past it the page is cream, and light-on-cream is invisible —
  // which read as the nav disappearing on scroll. Driven by position rather
  // than by route, so it cannot be broken by swapping a photograph.
  useEffect(() => {
    if (!hasHero) {
      setOverHero(false)
      return
    }
    const onScroll = () => {
      setOverHero(window.scrollY <= window.innerHeight - NAV_H)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [hasHero, pathname])

  const light = overHero && !open

  const navClass = [
    styles.nav,
    isHome   && light ? styles.navLight       : '',
    isStudio && light ? styles.navLinksLight  : '',
    open              ? styles.navOpen        : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <header className={navClass}>
        <div className={styles.inner}>
          <Link href="/" className={styles.wordmark} aria-label="Andrew Whited">
            <LogoSolid className={styles.navLogo} />
          </Link>

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
