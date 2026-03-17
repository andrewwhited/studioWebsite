'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './image.module.css'

/* ─── Mock data ──────────────────────────────────────── */

type Photo = {
  id: string
  shade: string // placeholder color variation
}

type PhotoSet = {
  id: string
  title: string
  location?: string
  date: string
  photos: Photo[]
}

const photoSets: PhotoSet[] = [
  {
    id: 'workshop',
    title: 'Workshop',
    location: 'Portland, OR',
    date: '2024',
    photos: [
      { id: 'w1', shade: '#3E3C38' },
      { id: 'w2', shade: '#4A4844' },
      { id: 'w3', shade: '#363430' },
      { id: 'w4', shade: '#424038' },
    ],
  },
  {
    id: 'objects',
    title: 'Objects',
    date: '2023–2024',
    photos: [
      { id: 'o1', shade: '#5C5A56' },
      { id: 'o2', shade: '#484644' },
      { id: 'o3', shade: '#3E3C38' },
      { id: 'o4', shade: '#525050' },
    ],
  },
  {
    id: 'field',
    title: 'Field',
    location: 'Various',
    date: '2022–2024',
    photos: [
      { id: 'f1', shade: '#6E6C68' },
      { id: 'f2', shade: '#544E44' },
      { id: 'f3', shade: '#4E4A42' },
      { id: 'f4', shade: '#5A5650' },
      { id: 'f5', shade: '#3C3A36' },
    ],
  },
  {
    id: 'material',
    title: 'Material',
    date: '2023',
    photos: [
      { id: 'm1', shade: '#48464A' },
      { id: 'm2', shade: '#3A3836' },
      { id: 'm3', shade: '#424040' },
    ],
  },
]

// Flatten for the grid, keeping set reference for lightbox navigation
type FlatPhoto = Photo & { setId: string; indexInSet: number }

const allPhotos: FlatPhoto[] = photoSets.flatMap((set) =>
  set.photos.map((photo, i) => ({ ...photo, setId: set.id, indexInSet: i }))
)

/* ─── Lightbox state ─────────────────────────────────── */

type LightboxState = {
  setId: string
  indexInSet: number
} | null

/* ─── Component ──────────────────────────────────────── */

export default function ImagePage() {
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  const currentSet = lightbox
    ? photoSets.find((s) => s.id === lightbox.setId)!
    : null
  const currentPhoto = currentSet
    ? currentSet.photos[lightbox!.indexInSet]
    : null

  const close = useCallback(() => setLightbox(null), [])

  const prev = useCallback(() => {
    if (!lightbox || !currentSet) return
    setLightbox({
      setId: lightbox.setId,
      indexInSet:
        (lightbox.indexInSet - 1 + currentSet.photos.length) %
        currentSet.photos.length,
    })
  }, [lightbox, currentSet])

  const next = useCallback(() => {
    if (!lightbox || !currentSet) return
    setLightbox({
      setId: lightbox.setId,
      indexInSet: (lightbox.indexInSet + 1) % currentSet.photos.length,
    })
  }, [lightbox, currentSet])

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightbox, close, prev, next])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const isOpen = lightbox !== null

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerBody}>
          <h1 className={styles.title}>Image</h1>
        </div>
      </header>

      {/* Photo grid */}
      <ul className={styles.grid}>
        {allPhotos.map((photo) => (
          <li key={photo.id}>
            <button
              type="button"
              className={styles.cell}
              onClick={() =>
                setLightbox({ setId: photo.setId, indexInSet: photo.indexInSet })
              }
              aria-label={`Open photo from ${photoSets.find((s) => s.id === photo.setId)?.title}`}
            >
              <div
                className={styles.cellImage}
                style={{ backgroundColor: photo.shade }}
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      <div
        className={`${styles.lightbox} ${isOpen ? styles.lightboxOpen : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Photo lightbox"
      >
        {/* Header bar */}
        <div className={styles.lightboxBar}>
          {currentSet && (
            <span className={styles.lightboxMeta}>
              {currentSet.title}
              {currentSet.location ? ` — ${currentSet.location}` : ''}
              {' '}
              <span className={styles.lightboxCount}>
                {(lightbox?.indexInSet ?? 0) + 1} / {currentSet.photos.length}
              </span>
            </span>
          )}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={close}
            tabIndex={isOpen ? 0 : -1}
            aria-label="Close lightbox"
          >
            Close
          </button>
        </div>

        {/* Image area */}
        <div className={styles.lightboxStage}>
          {/* Prev */}
          {currentSet && currentSet.photos.length > 1 && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={prev}
              tabIndex={isOpen ? 0 : -1}
              aria-label="Previous photo"
            >
              ←
            </button>
          )}

          {/* Image */}
          <div className={styles.lightboxImageWrap}>
            {currentPhoto && (
              <div
                className={styles.lightboxImage}
                style={{ backgroundColor: currentPhoto.shade }}
              />
            )}
          </div>

          {/* Next */}
          {currentSet && currentSet.photos.length > 1 && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={next}
              tabIndex={isOpen ? 0 : -1}
              aria-label="Next photo"
            >
              →
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
