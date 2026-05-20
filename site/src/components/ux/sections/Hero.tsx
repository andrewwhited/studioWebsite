'use client'

import { useState, useEffect } from 'react'
import styles from './sections.module.css'

const FALLBACK_TEXT = 'Andrew Whited is a senior design leader bringing order and elegance to complexity'

// The h1 contains TWO spans:
//   1. A visually-hidden span with the full positioning sentence. This is
//      what crawlers, AI URL summarizers, ATS scrapers, and screen readers
//      read — it's present from initial paint (SSR) and never changes.
//   2. An aria-hidden typewriter span that animates character-by-character
//      via JS. This carries the visual identity for sighted users.
// The h1 itself remains a real semantic heading from SSR — Lighthouse,
// rich-results tools, and dumb scrapers all see `<h1>` with full text.

export default function Hero({ text }: { text?: string }) {
  const fullText = text || FALLBACK_TEXT
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(fullText.slice(0, i))
        if (i === fullText.length) clearInterval(interval)
      }, 30)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(start)
  }, [fullText])

  return (
    <section id="hero" className={styles.hero}>
      <h1 className={`${styles.h1} ${styles.heroTypewriter}`}>
        <span className={styles.srOnly}>{fullText}</span>
        <span aria-hidden="true">
          {displayed}
          <span className={styles.cursor} />
        </span>
      </h1>
    </section>
  )
}
