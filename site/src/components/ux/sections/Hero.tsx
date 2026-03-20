'use client'

import { useState, useEffect } from 'react'
import styles from './sections.module.css'

const FULL_TEXT = 'Andrew Whited is a senior design leader bringing order and elegance to complexity'

export default function Hero() {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(FULL_TEXT.slice(0, i))
        if (i === FULL_TEXT.length) clearInterval(interval)
      }, 30)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(start)
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      <p className={styles.heroTypewriter}>
        {displayed}<span className={styles.cursor} />
      </p>
    </section>
  )
}
