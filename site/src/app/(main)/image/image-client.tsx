'use client'

import { useState, useEffect, useCallback } from 'react'
import { photoSets, type PhotoSet } from '@/data/image'
import styles from './image.module.css'

// Flatten all photos for the grid, keeping set reference for lightbox navigation
type FlatPhoto = { id: string; shade: string; setId: string; indexInSet: number }

const allPhotos: FlatPhoto[] = photoSets.flatMap((set) =>
  set.images.map((photo, i) => ({
    ...photo,
    setId: set.id,
    indexInSet: i,
  }))
)

type LightboxState = { setId: string; indexInSet: number } | null

type Props = {
  title: string
  intro: string
}

export default function ImageClient({ title, intro }: Props) {
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  const currentSet: PhotoSet | null = lightbox
    ? (photoSets.find((s) => s.id === lightbox.setId) ?? null)
    : null
  const currentPhoto = currentSet ? currentSet.images[lightbox!.indexInSet] : null

  const close = useCallback(() => setLightbox(null), [])

  const prev = useCallback(() => {
    if (!lightbox || !currentSet) return
    setLightbox({
      setId: lightbox.setId,
      indexInSet: (lightbox.indexInSet - 1 + currentSet.images.length) % currentSet.images.length,
    })
  }, [lightbox, currentSet])

  const next = useCallback(() => {
    if (!lightbox || !currentSet) return
    setLightbox({
      setId: lightbox.setId,
      indexInSet: (lightbox.indexInSet + 1) % currentSet.images.length,
    })
  }, [lightbox, currentSet])

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

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const isOpen = lightbox !== null

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerBody}>
          <div className={styles.headerRight}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.intro}>{intro}</p>
          </div>
        </div>
      </header>

      {/* Photo grid */}
      <ul className={styles.grid}>
        {allPhotos.map((photo) => (
          <li key={photo.id}>
            <button
              type="button"
              className={styles.cell}
              onClick={() => setLightbox({ setId: photo.setId, indexInSet: photo.indexInSet })}
              aria-label={`Open photo`}
            >
              <div className={styles.cellImage} style={{ backgroundColor: photo.shade }} />
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
        {/* Header bar — shows location + year, no title (per content model) */}
        <div className={styles.lightboxBar}>
          {currentSet && (
            <span className={styles.lightboxMeta}>
              {currentSet.location}
              {' — '}
              {currentSet.year}
              {' '}
              <span className={styles.lightboxCount}>
                {(lightbox?.indexInSet ?? 0) + 1} / {currentSet.images.length}
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
          {currentSet && currentSet.images.length > 1 && (
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

          <div className={styles.lightboxImageWrap}>
            {currentPhoto && (
              <div
                className={styles.lightboxImage}
                style={{ backgroundColor: currentPhoto.shade }}
              />
            )}
          </div>

          {currentSet && currentSet.images.length > 1 && (
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
