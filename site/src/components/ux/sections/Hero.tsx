'use client'

import { useState, useEffect } from 'react'
import styles from './sections.module.css'

const FALLBACK_TEXT = 'Andrew Whited is a senior design leader bringing order and elegance to complexity'

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
      <p className={styles.heroTypewriter}>
        {displayed}<span className={styles.cursor} />
      </p>
    </section>
  )
}
