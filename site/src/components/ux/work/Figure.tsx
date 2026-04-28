import styles from './Figure.module.css'

type FigureKind = 'screenshot' | 'diagram' | 'matrix' | 'flow' | 'hero' | 'multi'

type Props = {
  kind: FigureKind
  title: string
  caption?: string
  status?: 'tbd'
  frames?: number
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
  width = 'column',
  hideCaption,
  fill,
}: Props) {
  const widthClass =
    width === 'wide' ? styles.wide : width === 'full' ? styles.full : styles.column

  return (
    <figure className={`${styles.figure} ${widthClass} ${fill ? styles.fill : ''}`}>
      {kind === 'multi' && frames ? (
        <div className={styles.multi} style={{ gridTemplateColumns: `repeat(${frames}, 1fr)` }}>
          {Array.from({ length: frames }).map((_, i) => (
            <div
              key={i}
              className={styles.frame}
              style={fill ? undefined : { aspectRatio: '3 / 4' }}
            >
              <span className={styles.frameLabel}>Frame {i + 1}</span>
            </div>
          ))}
        </div>
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
  )
}
