/* ─────────────────────────────────────────────────────
   Essay renderer — reads the `thought.body` block array.

   Two things here are not obvious:

   1. Prose is rendered a block-group at a time, not as one
      PortableText call. Each group becomes its own grid row
      so its footnotes can sit in the margin cell beside it.
      Rendering the whole array at once would nest the notes
      inside the text column with no way out.

   2. Footnotes are numbered in a pre-pass over the whole
      body, so numbering is continuous across sections
      regardless of how the blocks are grouped.
───────────────────────────────────────────────────── */

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity'
import styles from './essay.module.css'

/* ----- Types ----- */

type SanityImage = {
  asset?: { _ref?: string }
  alt?: string
  hotspot?: { x: number; y: number }
  /** Escape hatch for the layout specimen, which has no Sanity asset to point
   *  at. Never set on real content — Sanity images always arrive as `asset`. */
  url?: string
}

type FootnoteDef = { _type: 'footnote'; _key: string; text: string; url?: string }

type EssayHeading = { _type: 'essayHeading'; _key?: string; title: string }
type EssayProseBlock = { _type: 'essayProseBlock'; _key?: string; body: PortableTextBlock[] }
type EpigraphBlock = { _type: 'epigraph'; _key?: string; text: string; attribution?: string }
type PullQuoteBlock = { _type: 'pullQuote'; _key?: string; text: string }
type MarginNoteBlock = { _type: 'marginNote'; _key?: string; label?: string; text: string; url?: string }
type SectionBreakBlock = { _type: 'sectionBreak'; _key?: string }
type FigureBlock = {
  _type: 'figure'
  _key?: string
  image?: SanityImage
  alt?: string
  caption?: string
  width?: 'measure' | 'wide' | 'bleed'
  fullWidth?: boolean
  hideCaption?: boolean
  placeholder?: boolean
  placeholderLabel?: string
  placeholderRatio?: string
}
type FigureFlowBlock = {
  _type: 'figureFlow'
  _key?: string
  images?: SanityImage[]
  alt?: string
  caption?: string
  width?: 'measure' | 'wide' | 'bleed'
  fullWidth?: boolean
}
export type EssayBlock =
  | EssayHeading
  | EssayProseBlock
  | EpigraphBlock
  | PullQuoteBlock
  | MarginNoteBlock
  | SectionBreakBlock
  | FigureBlock
  | FigureFlowBlock

export type ThoughtDoc = {
  title: string
  slug: { current: string }
  subtitle?: string
  type?: string
  year?: string
  publishedAt?: string
  readingTime?: number
  topics?: string[]
  heroImage?: SanityImage & { alt?: string }
  body?: EssayBlock[]
  closing?: string
  crossPosts?: { _key?: string; platform: string; url: string }[]
}

/* ----- Footnote numbering ----- */

// Footnote markDefs in the order their marks first appear in the block's
// children. Sanity stores markDefs unordered, and may keep defs that are no
// longer referenced by any span, so both order and membership come from the
// children rather than from markDefs itself.
function blockFootnotes(block: PortableTextBlock): FootnoteDef[] {
  const defs = (block.markDefs ?? []).filter(
    (d): d is FootnoteDef => d._type === 'footnote',
  )
  if (!defs.length) return []

  const byKey = new Map(defs.map((d) => [d._key, d]))
  const ordered: FootnoteDef[] = []
  const seen = new Set<string>()

  for (const child of block.children ?? []) {
    for (const mark of child.marks ?? []) {
      const def = byKey.get(mark)
      if (def && !seen.has(mark)) {
        seen.add(mark)
        ordered.push(def)
      }
    }
  }
  return ordered
}

function numberFootnotes(body: EssayBlock[]): Map<string, number> {
  const numbers = new Map<string, number>()
  let n = 0
  for (const block of body) {
    if (block._type !== 'essayProseBlock') continue
    for (const ptBlock of block.body ?? []) {
      for (const def of blockFootnotes(ptBlock)) {
        n += 1
        numbers.set(def._key, n)
      }
    }
  }
  return numbers
}

/* ----- Prose grouping ----- */

// Consecutive list items must stay in one PortableText call or each item
// renders as its own <ul>. Everything else stands alone so it can own a row.
function groupProse(blocks: PortableTextBlock[]): PortableTextBlock[][] {
  const groups: PortableTextBlock[][] = []
  for (const block of blocks) {
    const prev = groups[groups.length - 1]
    const prevBlock = prev?.[prev.length - 1]
    const continuesList =
      block.listItem &&
      prevBlock?.listItem === block.listItem &&
      prevBlock?.level === block.level
    if (continuesList) prev.push(block)
    else groups.push([block])
  }
  return groups
}

/* ----- Reading time ----- */

function blockText(block: PortableTextBlock): string {
  return (block.children ?? []).map((c) => ('text' in c ? String(c.text) : '')).join('')
}

export function countWords(body: EssayBlock[] = []): number {
  let words = 0
  for (const block of body) {
    if (block._type !== 'essayProseBlock') continue
    for (const ptBlock of block.body ?? []) {
      words += blockText(ptBlock).split(/\s+/).filter(Boolean).length
    }
  }
  return words
}

export function estimateReadingTime(body: EssayBlock[] = []): number {
  return Math.max(1, Math.round(countWords(body) / 225))
}

/* ----- Dates ----- */

// Sanity `date` values are plain YYYY-MM-DD. new Date() would read them as UTC
// midnight and render the previous day in any western timezone, so the parts
// are split by hand.
function formatPublished(date?: string): string | undefined {
  if (!date) return undefined
  const [y, m, d] = date.split('-').map(Number)
  if (!y || !m || !d) return undefined
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/* ----- Image helper ----- */

function imageSrc(img: SanityImage, width = 2400): string {
  if (img.url) return img.url
  return urlFor(img).width(width).fit('max').auto('format').url()
}

/* ----- PortableText config ----- */

function makeComponents(numbers: Map<string, number>): PortableTextComponents {
  return {
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          rel="noopener"
          className={styles.proseLink}
          target={value?.href?.startsWith('http') ? '_blank' : undefined}
        >
          {children}
        </a>
      ),
      footnote: ({ children, value }) => (
        <>
          {children}
          <sup className={styles.footnoteRef}>{numbers.get(value?._key) ?? '•'}</sup>
        </>
      ),
      em: ({ children }) => <em>{children}</em>,
      strong: ({ children }) => <strong>{children}</strong>,
    },
  }
}

/* ----- Notes cell ----- */

function NoteList({
  footnotes,
  numbers,
}: {
  footnotes: FootnoteDef[]
  numbers: Map<string, number>
}) {
  return (
    <div className={styles.notes}>
      {footnotes.map((note) => (
        <p key={note._key} className={styles.note}>
          <span className={styles.noteNumber}>{numbers.get(note._key)}</span>
          {note.url ? (
            <a href={note.url} target="_blank" rel="noopener" className={styles.noteLink}>
              {note.text}
            </a>
          ) : (
            note.text
          )}
        </p>
      ))}
    </div>
  )
}

/* ----- Figures ----- */

function figureColumnClass(width?: string, fullWidth?: boolean): string {
  const resolved = width ?? (fullWidth ? 'bleed' : 'measure')
  if (resolved === 'bleed') return styles.figureBleed
  if (resolved === 'wide') return styles.figureWide
  return styles.figureMeasure
}

function isBleed(width?: string, fullWidth?: boolean): boolean {
  return (width ?? (fullWidth ? 'bleed' : 'measure')) === 'bleed'
}

function FigureComp({ data }: { data: FigureBlock }) {
  const bleed = isBleed(data.width, data.fullWidth)
  const caption = data.hideCaption ? undefined : data.caption

  return (
    <div className={`${styles.row} ${styles.figureRow} ${bleed ? styles.figureRowBleed : ''}`}>
      <figure className={`${styles.figure} ${figureColumnClass(data.width, data.fullWidth)}`}>
        {data.placeholder || !data.image?.asset ? (
          <div
            className={styles.placeholder}
            style={{ aspectRatio: data.placeholderRatio || '4 / 3' }}
          >
            <span className={styles.placeholderLabel}>
              {data.placeholderLabel || 'Visual to come'}
            </span>
          </div>
        ) : (
          <img src={imageSrc(data.image)} alt={data.alt || ''} />
        )}
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </div>
  )
}

function FigureFlowComp({ data }: { data: FigureFlowBlock }) {
  const images = (data.images ?? []).filter((img) => img?.asset)
  if (!images.length) return null
  const bleed = isBleed(data.width, data.fullWidth)

  return (
    <div className={`${styles.row} ${styles.figureRow} ${bleed ? styles.figureRowBleed : ''}`}>
      <figure className={`${styles.figure} ${figureColumnClass(data.width, data.fullWidth)}`}>
        <div className={styles.figureFlow}>
          {images.map((img, i) => (
            <img
              key={img.asset?._ref ?? i}
              src={imageSrc(img)}
              alt={
                data.alt
                  ? `${data.alt} (${i + 1} of ${images.length})`
                  : ''
              }
            />
          ))}
        </div>
        {data.caption && <figcaption className={styles.caption}>{data.caption}</figcaption>}
      </figure>
    </div>
  )
}

/* ----- Header ----- */

function Meta({ meta, className }: { meta: string[]; className?: string }) {
  if (!meta.length) return null
  return (
    <div className={`${styles.meta} ${className ?? ''}`}>
      {meta.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className={styles.metaSep}>· </span>}
          {item}
        </span>
      ))}
    </div>
  )
}

export function hasHeroBand(thought: ThoughtDoc): boolean {
  return Boolean(thought.heroImage?.asset || thought.heroImage?.url)
}

// Meta and subtitle sit on the measure at column 3; the title alone hangs out to
// column 1, into the band the section numbers occupy once the body starts.
// The band, when there is one, closes the header off.
function EssayHeader({ thought, meta }: { thought: ThoughtDoc; meta: string[] }) {
  const { heroImage: image, title, subtitle } = thought
  const band = hasHeroBand(thought)

  return (
    <header className={`${styles.row} ${styles.header} ${band ? styles.headerWithBand : ''}`}>
      <Meta meta={meta} className={styles.headerMeta} />
      <h1 className={`${styles.title} ${styles.headerTitle}`}>{title}</h1>
      {subtitle && (
        <p className={`${styles.subtitle} ${styles.headerSubtitle}`}>{subtitle}</p>
      )}
      {band && image && (
        <figure className={`${styles.heroFigure} ${styles.heroBand}`}>
          <img src={imageSrc(image)} alt={image.alt || ''} />
        </figure>
      )}
    </header>
  )
}

/* ----- Block dispatcher ----- */

function Block({
  block,
  numbers,
  components,
  sectionNumber,
}: {
  block: EssayBlock
  numbers: Map<string, number>
  components: PortableTextComponents
  sectionNumber?: number
}) {
  switch (block._type) {
    case 'essayHeading':
      return (
        <div className={`${styles.row} ${styles.headingRow}`}>
          {sectionNumber !== undefined && (
            <div className={styles.sectionNumber}>
              {String(sectionNumber).padStart(2, '0')}
            </div>
          )}
          <h2 className={styles.sectionTitle}>{block.title}</h2>
        </div>
      )

    case 'essayProseBlock':
      return (
        <>
          {groupProse(block.body ?? []).map((group, i) => {
            const footnotes = group.flatMap(blockFootnotes)
            return (
              <div key={i} className={`${styles.row} ${styles.proseRow}`}>
                <div className={styles.measure}>
                  <PortableText value={group} components={components} />
                </div>
                {footnotes.length > 0 && (
                  <div className={styles.margin}>
                    <NoteList footnotes={footnotes} numbers={numbers} />
                  </div>
                )}
              </div>
            )
          })}
        </>
      )

    case 'epigraph':
      return (
        <div className={`${styles.row} ${styles.epigraphRow}`}>
          <blockquote className={styles.epigraph}>
            <p>{block.text}</p>
            {block.attribution && (
              <cite className={styles.epigraphAttribution}>{block.attribution}</cite>
            )}
          </blockquote>
        </div>
      )

    case 'pullQuote':
      return (
        <div className={`${styles.row} ${styles.pullQuoteRow}`}>
          <blockquote className={styles.pullQuote}>
            <p>{block.text}</p>
          </blockquote>
        </div>
      )

    case 'marginNote':
      return (
        <div className={`${styles.row} ${styles.marginNoteRow}`}>
          <div className={styles.margin}>
            <div className={styles.notes}>
              <p className={styles.note}>
                {block.label && <span className={styles.noteLabel}>{block.label}</span>}
                {block.url ? (
                  <a href={block.url} target="_blank" rel="noopener" className={styles.noteLink}>
                    {block.text}
                  </a>
                ) : (
                  block.text
                )}
              </p>
            </div>
          </div>
        </div>
      )

    case 'sectionBreak':
      return (
        <div className={`${styles.row} ${styles.sectionBreakRow}`}>
          <div className={styles.sectionBreak} role="separator" aria-label="Section break">
            · · ·
          </div>
        </div>
      )

    case 'figure':
      return <FigureComp data={block} />

    case 'figureFlow':
      return <FigureFlowComp data={block} />

    default:
      return null
  }
}

/* ----- Page ----- */

export function Essay({ thought }: { thought: ThoughtDoc }) {
  const body = thought.body ?? []
  const numbers = numberFootnotes(body)
  const components = makeComponents(numbers)

  const published = formatPublished(thought.publishedAt)
  const readingTime = thought.readingTime ?? estimateReadingTime(body)
  const meta = [thought.type, published ?? thought.year, `${readingTime} min read`].filter(
    (item): item is string => Boolean(item),
  )

  // Assigned here rather than in Sanity so numbering can't drift out of sync
  // with the order of the blocks.
  let section = 0

  return (
    <main className={styles.page} data-surface="light">
      <EssayHeader thought={thought} meta={meta} />

      {/* The band is itself the division between hero and body — a rule under
          it would divide the same thing twice. */}
      {!hasHeroBand(thought) && <hr className={styles.headerRule} />}

      <div className={styles.body}>
        {body.map((block, i) => {
          const numbered = block._type === 'essayHeading'
          if (numbered) section += 1
          return (
            <Block
              key={block._key ?? i}
              block={block}
              numbers={numbers}
              components={components}
              sectionNumber={numbered ? section : undefined}
            />
          )
        })}
      </div>

      {/* Printer's asterism — the end-mark every essay closes on, whether or not
          there is a closing note or a cross-post under it. */}
      <div className={`${styles.row} ${styles.endMarkRow}`}>
        <div className={styles.endMark} role="separator" aria-label="End of essay">
          ⁂
        </div>
      </div>

      {/* Apparatus first (what the piece is and where else it lives), then the
          sign-off, then the site's stamp. The sign-off goes last of the human
          lines — anything after a farewell reads as a postscript. */}
      <footer className={`${styles.row} ${styles.footer}`}>
        <div className={styles.footerInner}>
          {thought.closing && <p className={styles.closing}>{thought.closing}</p>}

          {thought.crossPosts && thought.crossPosts.length > 0 && (
            <div className={styles.crossPosts}>
              <span className={styles.crossPostLabel}>Also at</span>
              {thought.crossPosts.map((post, i) => (
                <a
                  key={post._key ?? i}
                  href={post.url}
                  target="_blank"
                  rel="noopener"
                  className={styles.crossPostLink}
                >
                  {post.platform}
                </a>
              ))}
            </div>
          )}

          <p className={styles.signoff}>Thanks y&rsquo;all.</p>
          <p className={styles.colophon}>&copy; {new Date().getFullYear()} Andrew Whited</p>
        </div>
      </footer>

    </main>
  )
}
