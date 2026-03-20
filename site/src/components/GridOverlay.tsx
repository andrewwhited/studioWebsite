'use client'

import { useState, useEffect } from 'react'
import styles from './GridOverlay.module.css'

export default function GridOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setVisible(v => !v)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!visible) return null

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.columns}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.col} />
        ))}
      </div>
    </div>
  )
}
