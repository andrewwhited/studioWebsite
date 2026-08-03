'use client'

import { useRef } from 'react'
import styles from './studio.module.css'

export type ReadingItem = {
  key: string
  title?: string
  creator?: string
  note?: string
  link?: string
  thumbUrl?: string
}

// The cover tracks the cursor along the row's x axis. That is the whole
// interaction: nothing at rest, the cover fading in under the pointer and
// travelling with it.
//
// An earlier version scattered the covers at fixed offsets and held them at
// 7% opacity. It read as neither decoration nor interaction — the positions
// answered to nothing, least of all the column grid the rest of the section
// sits on. Tying position to the cursor makes the placement self-evidently
// intentional, because the reader is the one placing it.
export default function ReadingList({ items }: { items: ReadingItem[] }) {
  const frame = useRef<number | null>(null)

  // Written straight to the DOM rather than through state: this fires on every
  // pointer move, and a re-render per event would be wasted work. rAF collapses
  // bursts of events into one write per painted frame.
  function handleMove(event: React.MouseEvent<HTMLLIElement>) {
    const row = event.currentTarget
    const { left, width } = row.getBoundingClientRect()
    const x = event.clientX - left

    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      // Clamped so the cover never hangs off either end of the row.
      const half = row.offsetHeight
      const clamped = Math.min(Math.max(x, half), width - half)
      row.style.setProperty('--thumb-x', `${clamped}px`)
    })
  }

  return (
    <ul className={`${styles.list} ${styles.readingList}`}>
      {items.map((item) => {
        const thumb = (
          <div
            className={
              item.thumbUrl
                ? styles.readingThumb
                : `${styles.readingThumb} ${styles.readingThumbEmpty}`
            }
            style={item.thumbUrl ? { backgroundImage: `url(${item.thumbUrl})` } : undefined}
            aria-hidden="true"
          />
        )

        const row = (
          <>
            {thumb}
            <span className={styles.entryTitle}>{item.title}</span>
            <span className={styles.entryMeta}>{item.creator}</span>
            {item.note && <span className={styles.entryNote}>{item.note}</span>}
          </>
        )

        return (
          <li key={item.key} className={styles.entry} onMouseMove={handleMove}>
            {item.link ? (
              <a
                href={item.link}
                className={styles.entryLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row}
              </a>
            ) : (
              // No link — render as a plain row so it isn't fake-interactive.
              row
            )}
          </li>
        )
      })}
    </ul>
  )
}
