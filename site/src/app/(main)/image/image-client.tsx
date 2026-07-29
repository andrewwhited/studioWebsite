'use client'

import { useState, useEffect, useCallback } from 'react'
import SanityImage from '@/lib/sanity-image'
import styles from './image.module.css'

type Dimensions = { width: number; height: number }

type SetImage = {
  asset: { url: string; metadata?: { dimensions?: Dimensions } }
}

export type PhotoSet = {
  location: string
  year: string
  category?: Category
  coverImage?: {
    hotspot?: { x: number; y: number }
    asset?: { url: string }
  }
  images?: SetImage[]
}

type Category = 'people' | 'places'

// 'all' is the default view, not a stored value — no set carries it.
type Filter = 'all' | Category

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'people', label: 'People' },
  { value: 'places', label: 'Places' },
]

// Which set is open, and where in it. The grid shows one cover per set, so a
// lightbox always opens at the first frame — image order is editorial (see
// Structure/content_model.md) and the sequence is meant to be walked from 1.
type LightboxState = { setIndex: number; imageIndex: number } | null

type Props = {
  title?: string
  intro?: string
  sets: PhotoSet[]
}

// Sets carry no title by decision, so location and year are the only label.
const captionFor = (set: PhotoSet) => `${set.location} — ${set.year}`

export default function ImageClient({ title, intro, sets }: Props) {
  const [lightbox, setLightbox] = useState<LightboxState>(null)
  const [filter, setFilter] = useState<Filter>('all')

  // Only sets with a cover and at least one frame can be opened. Filtering
  // happens here rather than in the query — every set is already in the
  // payload, so switching filters costs nothing and needs no refetch.
  const visible = sets.filter(
    (s) =>
      s.coverImage?.asset?.url &&
      (s.images?.length ?? 0) > 0 &&
      (filter === 'all' || s.category === filter)
  )

  const currentSet = lightbox ? visible[lightbox.setIndex] : null
  const frames = currentSet?.images ?? []
  const currentFrame = lightbox ? frames[lightbox.imageIndex] : null

  const close = useCallback(() => setLightbox(null), [])

  // Lightbox position is an index into the filtered list, so changing the
  // filter would otherwise leave it pointing at a different set.
  const changeFilter = useCallback((next: Filter) => {
    setLightbox(null)
    setFilter(next)
  }, [])

  // Click anywhere in the black to dismiss. Guarded rather than bound to the
  // backdrop element itself, because the black is spread across the bar, the
  // stage padding, and the wrap around the frame — anything that isn't the
  // photograph or a control counts as outside.
  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('button, img')) return
      close()
    },
    [close]
  )

  const step = useCallback(
    (delta: number) => {
      setLightbox((prev) => {
        if (!prev) return prev
        const count = visible[prev.setIndex]?.images?.length ?? 0
        if (count === 0) return prev
        return {
          setIndex: prev.setIndex,
          imageIndex: (prev.imageIndex + delta + count) % count,
        }
      })
    },
    [visible]
  )

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightbox, close, step])

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

      {/* Left-aligned to the grid's own left edge, sitting directly above it */}
      <div className={styles.filters} role="group" aria-label="Filter photo sets">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`${styles.filter} ${filter === value ? styles.filterActive : ''}`}
            onClick={() => changeFilter(value)}
            aria-pressed={filter === value}
          >
            {label}
          </button>
        ))}
      </div>

      {/* One cover per set. Covers are normalised to 6:7 and cropped to the
          hotspot; the frames themselves are never cropped, only the tile. */}
      <ul className={styles.grid}>
        {visible.map((set, setIndex) => {
          const hotspot = set.coverImage?.hotspot
          return (
            <li key={set.coverImage!.asset!.url}>
              <button
                type="button"
                className={styles.cell}
                onClick={() => setLightbox({ setIndex, imageIndex: 0 })}
                aria-label={`Open photo set — ${captionFor(set)}, ${set.images!.length} images`}
              >
                <div className={styles.cellImage}>
                  <SanityImage
                    src={set.coverImage!.asset!.url}
                    alt={captionFor(set)}
                    fill
                    sizes="(max-width: 672px) 50vw, 33vw"
                    style={
                      hotspot
                        ? { objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%` }
                        : undefined
                    }
                  />
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Lightbox */}
      <div
        className={`${styles.lightbox} ${isOpen ? styles.lightboxOpen : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Photo lightbox"
        onClick={onBackdropClick}
      >
        <div className={styles.lightboxBar}>
          {currentSet && (
            <span className={styles.lightboxMeta}>
              {captionFor(currentSet)}
              {' '}
              <span className={styles.lightboxCount}>
                {(lightbox?.imageIndex ?? 0) + 1} / {frames.length}
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

        <div className={styles.lightboxStage}>
          {frames.length > 1 && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={() => step(-1)}
              tabIndex={isOpen ? 0 : -1}
              aria-label="Previous photo"
            >
              ←
            </button>
          )}

          <div className={styles.lightboxImageWrap}>
            {currentFrame?.asset?.url && (
              // Native dimensions, not a fixed ratio: the sets mix 6:7, 645,
              // and 35mm, and some frames are landscape. CSS contains it.
              <SanityImage
                key={currentFrame.asset.url}
                className={styles.lightboxImage}
                src={currentFrame.asset.url}
                alt={currentSet ? captionFor(currentSet) : ''}
                width={currentFrame.asset.metadata?.dimensions?.width ?? 2571}
                height={currentFrame.asset.metadata?.dimensions?.height ?? 3000}
                sizes="100vw"
                priority
              />
            )}
          </div>

          {frames.length > 1 && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={() => step(1)}
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
