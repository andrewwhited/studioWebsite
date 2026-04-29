'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './Figure.module.css'

type FigureKind = 'screenshot' | 'diagram' | 'matrix' | 'flow' | 'hero' | 'multi'

type Props = {
  kind: FigureKind
  title: string
  caption?: string
  status?: 'tbd'
  frames?: number
  images?: string[]
  src?: string
  alt?: string
  width?: 'column' | 'wide' | 'full'
  hideCaption?: boolean
  fill?: boolean
}

const aspectByKind: Record<FigureKind, string> = {
  screenshot: '16 / 10',
  diagram: '4 / 3',
  matrix: '4 / 3',
  flow: '5 / 2',
  hero: '4 / 5',
  multi: '5 / 2',
}

export default function Figure({
  kind,
  title,
  caption,
  status,
  frames,
  images,
  src,
  alt,
  width = 'column',
  hideCaption,
  fill,
}: Props) {
  const widthClass =
    width === 'wide' ? styles.wide : width === 'full' ? styles.full : styles.column

  const allImages = images ?? (src ? [src] : [])
  const frameCount = images?.length ?? frames ?? 0

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(() => {
    setOpenIndex((idx) =>
      idx === null ? null : (idx - 1 + allImages.length) % allImages.length
    )
  }, [allImages.length])
  const next = useCallback(() => {
    setOpenIndex((idx) =>
      idx === null ? null : (idx + 1) % allImages.length
    )
  }, [allImages.length])

  useEffect(() => {
    if (openIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft' && allImages.length > 1) prev()
      else if (e.key === 'ArrowRight' && allImages.length > 1) next()
    }
    document.addEventListener('keydown', handler)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = prevOverflow
    }
  }, [openIndex, close, prev, next, allImages.length])

  const altText = alt ?? title

  return (
    <>
      <figure className={`${styles.figure} ${widthClass} ${fill ? styles.fill : ''}`}>
        {kind === 'multi' && frameCount > 0 ? (
          <div className={styles.multi} style={{ gridTemplateColumns: `repeat(${frameCount}, 1fr)` }}>
            {images
              ? images.map((imgSrc, i) => (
                  <button
                    key={i}
                    type="button"
                    className={styles.frameImage}
                    onClick={() => setOpenIndex(i)}
                    aria-label={`Open ${altText} (${i + 1} of ${images.length})`}
                  >
                    <img src={imgSrc} alt={`${altText} (${i + 1} of ${images.length})`} />
                  </button>
                ))
              : Array.from({ length: frameCount }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.frame}
                    style={fill ? undefined : { aspectRatio: '3 / 4' }}
                  >
                    <span className={styles.frameLabel}>Frame {i + 1}</span>
                  </div>
                ))}
          </div>
        ) : src ? (
          <button
            type="button"
            className={styles.imageWrap}
            onClick={() => setOpenIndex(0)}
            aria-label={`Open ${altText}`}
          >
            <img src={src} alt={altText} />
          </button>
        ) : (
          <div
            className={styles.placeholder}
            style={fill ? undefined : { aspectRatio: aspectByKind[kind] }}
          >
            <div className={styles.placeholderInner}>
              <span className={styles.kind}>{kind}</span>
            </div>
          </div>
        )}
        {!hideCaption && (
          <figcaption className={styles.caption}>
            <span className={styles.captionTitle}>
              {title}
              {status === 'tbd' && <span className={styles.tbd}> · TBD</span>}
            </span>
            {caption && <span className={styles.captionBody}>{caption}</span>}
          </figcaption>
        )}
      </figure>

      {openIndex !== null && allImages[openIndex] && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={altText}
          onClick={close}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            aria-label="Close"
          >
            ✕
          </button>
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                className={styles.lightboxPrev}
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Previous"
              >
                ←
              </button>
              <button
                type="button"
                className={styles.lightboxNext}
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next"
              >
                →
              </button>
            </>
          )}
          <img
            src={allImages[openIndex]}
            alt={altText}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
