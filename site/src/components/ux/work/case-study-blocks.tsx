/* ─────────────────────────────────────────────────────
   Case study block components — render the polymorphic
   block tree from Sanity. Mirrors the hardcoded CS2
   prototype's structure.
───────────────────────────────────────────────────── */

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity'
import Figure from './Figure'
import styles from './case-study.module.css'

/* ----- Types matching the Sanity schema ----- */

type SanityImage = {
  asset?: { _ref?: string }
  alt?: string
  caption?: string
  hotspot?: { x: number; y: number }
}

type ProseBody = PortableTextBlock[]

export type WorkData = {
  title: string
  slug: { current: string }
  summary?: string
  client?: string
  role?: string
  year?: string
  heroImage?: SanityImage
  sections?: SectionData[]
}

export type SectionData = {
  _type: 'section'
  _key?: string
  title: string
  layout: 'title-text' | 'title-text-text' | 'title-text-aside'
  body?: ProseBody
  asideKind?: 'image' | 'pullQuote'
  asideImage?: SanityImage
  asidePullQuote?: string
  blocks?: BlockData[]
}

type SubsectionData = {
  _type: 'subsection'
  _key?: string
  title: string
  body?: ProseBody
  blocks?: BlockData[]
}

type ProseBlock = { _type: 'prose'; _key?: string; body: ProseBody }
type FigureBlock = {
  _type: 'figure'
  _key?: string
  image: SanityImage
  alt: string
  caption?: string
  fullWidth?: boolean
  hideCaption?: boolean
}
type FigureFlowBlock = {
  _type: 'figureFlow'
  _key?: string
  images: SanityImage[]
  alt?: string
  caption?: string
  fullWidth?: boolean
}
type PullQuoteBlock = { _type: 'pullQuote'; _key?: string; text: string }
type KpiCalloutBlock = {
  _type: 'kpiCallout'
  _key?: string
  value: string
  label?: string
  source?: string
}
type EmDashListBlock = {
  _type: 'emDashList'
  _key?: string
  items: { lead: string; body: string; _key?: string }[]
}
type ReflectionBlock = { _type: 'reflection'; _key?: string; body: ProseBody }
type NdaNoteBlock = { _type: 'ndaNote'; _key?: string; text: string }
type TaxonomyTilesBlock = {
  _type: 'taxonomyTiles'
  _key?: string
  tiles: { number?: string; title: string; body: string; _key?: string }[]
}
type IntegrationTilesBlock = {
  _type: 'integrationTiles'
  _key?: string
  tiles: { number?: string; title: string; body: string; _key?: string }[]
}

type BlockData =
  | SubsectionData
  | ProseBlock
  | FigureBlock
  | FigureFlowBlock
  | PullQuoteBlock
  | KpiCalloutBlock
  | EmDashListBlock
  | ReflectionBlock
  | NdaNoteBlock
  | TaxonomyTilesBlock
  | IntegrationTilesBlock

/* ----- PortableText renderer config ----- */

const ptComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} rel="noopener" className={styles.proseLink}>
        {children}
      </a>
    ),
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
  },
}

/* ----- Sanity image → URL helper ----- */

function imageSrc(img: SanityImage, width = 2400): string {
  return urlFor(img).width(width).fit('max').url()
}

/* ----- Hero ----- */

export function CaseStudyHero({ work }: { work: WorkData }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid}>
        <a href="/ux#work" className={styles.heroBack} aria-label="Back to work">
          ←
        </a>
        <div className={styles.heroLockup}>
          <div className={styles.heroTitleGroup}>
            <h1 className={styles.heroTitle}>{work.title}</h1>
            {work.summary && <p className={styles.heroSummary}>{work.summary}</p>}
          </div>
          {(work.client || work.role || work.year) && (
            <dl className={styles.heroMeta}>
              {work.client && (
                <div className={styles.heroMetaItem}>
                  <dt>Client</dt>
                  <dd>{work.client}</dd>
                </div>
              )}
              {work.role && (
                <div className={styles.heroMetaItem}>
                  <dt>Role</dt>
                  <dd>{work.role}</dd>
                </div>
              )}
              {work.year && (
                <div className={styles.heroMetaItem}>
                  <dt>Year</dt>
                  <dd>{work.year}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
        {work.heroImage?.asset && (
          <div className={styles.heroFigure}>
            <Figure
              kind="hero"
              src={imageSrc(work.heroImage)}
              alt={work.heroImage.alt || work.title}
              title={work.heroImage.alt || work.title}
              width="full"
              hideCaption
            />
          </div>
        )}
      </div>
    </section>
  )
}

/* ----- Section ----- */

export function CaseStudySection({ section }: { section: SectionData }) {
  return (
    <section className={styles.section}>
      <div className={styles.gridFramework}>
        <h2 className={styles.sectionTitle}>{section.title}</h2>

        {/* Header body — varies by layout */}
        {section.layout === 'title-text' && section.body && (
          <div className={styles.frameworkBody}>
            <div className={styles.frameworkIntro}>
              <PortableText value={section.body} components={ptComponents} />
            </div>
          </div>
        )}

        {section.layout === 'title-text-text' && section.body && (
          <div className={styles.frameworkBody}>
            <div className={styles.bodyColumns}>
              <PortableText value={section.body} components={ptComponents} />
            </div>
          </div>
        )}

        {section.layout === 'title-text-aside' && (
          <SectionAside section={section} />
        )}

        {/* Blocks below */}
        {section.blocks?.map((block, i) => (
          <Block key={block._key ?? i} block={block} />
        ))}
      </div>
    </section>
  )
}

function SectionAside({ section }: { section: SectionData }) {
  return (
    <>
      {section.body && (
        <div className={styles.asideBody}>
          <PortableText value={section.body} components={ptComponents} />
        </div>
      )}
      {section.asideKind === 'image' && section.asideImage?.asset && (
        <div className={styles.asideContent}>
          <Figure
            kind="screenshot"
            src={imageSrc(section.asideImage)}
            alt={section.asideImage.alt || ''}
            title={section.asideImage.alt || ''}
            caption={section.asideImage.caption}
            width="full"
            hideCaption={!section.asideImage.caption}
          />
        </div>
      )}
      {section.asideKind === 'pullQuote' && section.asidePullQuote && (
        <blockquote className={styles.asideContent}>
          <p>{section.asidePullQuote}</p>
        </blockquote>
      )}
    </>
  )
}

/* ----- Block dispatcher ----- */

function Block({ block }: { block: BlockData }) {
  switch (block._type) {
    case 'subsection':
      return <Subsection sub={block} />
    case 'prose':
      return <ProseBlockComp body={block.body} />
    case 'figure':
      return <FigureBlockComp data={block} />
    case 'figureFlow':
      return <FigureFlowBlockComp data={block} />
    case 'pullQuote':
      return <PullQuoteBlockComp text={block.text} />
    case 'kpiCallout':
      return <KpiCalloutComp data={block} />
    case 'emDashList':
      return <EmDashListComp items={block.items} />
    case 'reflection':
      return <ReflectionComp body={block.body} />
    case 'ndaNote':
      return <NdaNoteComp text={block.text} />
    case 'taxonomyTiles':
      return <TaxonomyTilesComp tiles={block.tiles} />
    case 'integrationTiles':
      return <IntegrationTilesComp tiles={block.tiles} />
    default:
      return null
  }
}

/* ----- Subsection -----
   Splits blocks into in-band (rendered inside the subsection wrapper at
   cols 5–13) and full-width (rendered as siblings at gridFramework level
   so they can break out to cols 1–13). Note: full-width blocks always
   appear AFTER in-band blocks in source order. */

function isFullWidthBlock(block: BlockData): boolean {
  if (block._type === 'figure' && block.fullWidth) return true
  if (block._type === 'figureFlow' && block.fullWidth !== false) return true
  return false
}

function Subsection({ sub }: { sub: SubsectionData }) {
  const inBand: BlockData[] = []
  const fullWidth: BlockData[] = []
  for (const block of sub.blocks ?? []) {
    if (isFullWidthBlock(block)) fullWidth.push(block)
    else inBand.push(block)
  }

  return (
    <>
      <div className={styles.frameworkBody}>
        <div className={styles.subSection}>
          <header>
            <div className={styles.label}>{sub.title}</div>
          </header>
          {sub.body && (
            <div className={styles.body}>
              <PortableText value={sub.body} components={ptComponents} />
            </div>
          )}
          {inBand.map((block, i) => (
            <Block key={block._key ?? `ib-${i}`} block={block} />
          ))}
        </div>
      </div>
      {fullWidth.map((block, i) => (
        <Block key={block._key ?? `fw-${i}`} block={block} />
      ))}
    </>
  )
}

/* ----- Block leaves ----- */

function ProseBlockComp({ body }: { body: ProseBody }) {
  return (
    <div className={styles.frameworkBody}>
      <div className={styles.body}>
        <PortableText value={body} components={ptComponents} />
      </div>
    </div>
  )
}

function FigureBlockComp({ data }: { data: FigureBlock }) {
  if (!data.image?.asset) return null
  const wrapperClass = data.fullWidth ? styles.fullVisual : styles.fullBleedFigure
  return (
    <div className={wrapperClass}>
      <Figure
        kind="screenshot"
        src={imageSrc(data.image)}
        alt={data.alt}
        title={data.alt}
        caption={data.caption}
        width="full"
        hideCaption={data.hideCaption || !data.caption}
      />
    </div>
  )
}

function FigureFlowBlockComp({ data }: { data: FigureFlowBlock }) {
  if (!data.images?.length) return null
  const wrapperClass = data.fullWidth !== false ? styles.fullVisual : styles.fullBleedFigure
  const imageSrcs = data.images.map((img) => imageSrc(img))
  return (
    <div className={wrapperClass}>
      <Figure
        kind="multi"
        images={imageSrcs}
        alt={data.alt || ''}
        title={data.alt || ''}
        caption={data.caption}
        width="full"
        hideCaption={!data.caption}
      />
    </div>
  )
}

function PullQuoteBlockComp({ text }: { text: string }) {
  return (
    <blockquote className={styles.quoteUnder}>
      <p>{text}</p>
    </blockquote>
  )
}

function KpiCalloutComp({ data }: { data: KpiCalloutBlock }) {
  return (
    <div className={styles.frameworkBody}>
      <div className={styles.statCallout}>
        <div className={styles.statValue}>{data.value}</div>
        {data.label && <div className={styles.statLabel}>{data.label}</div>}
        {data.source && <div className={styles.statSource}>{data.source}</div>}
      </div>
    </div>
  )
}

function EmDashListComp({ items }: { items: EmDashListBlock['items'] }) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={item._key ?? i}>
          <em>{item.lead}</em> {item.body}
        </li>
      ))}
    </ul>
  )
}

function ReflectionComp({ body }: { body: ProseBody }) {
  return (
    <div className={styles.frameworkBody}>
      <div className={styles.reflection}>
        <PortableText value={body} components={ptComponents} />
      </div>
    </div>
  )
}

function NdaNoteComp({ text }: { text: string }) {
  return (
    <div className={styles.frameworkBody}>
      <p className={styles.ndaNote}>{text}</p>
    </div>
  )
}

function TaxonomyTilesComp({ tiles }: { tiles: TaxonomyTilesBlock['tiles'] }) {
  return (
    <div className={styles.tileGrid5}>
      {tiles.map((tile, i) => (
        <div key={tile._key ?? i} className={styles.tile}>
          {tile.number && <div className={styles.tileNumber}>{tile.number}</div>}
          <div className={styles.tileTitle}>{tile.title}</div>
          <div className={styles.tileBody}>{tile.body}</div>
        </div>
      ))}
    </div>
  )
}

function IntegrationTilesComp({ tiles }: { tiles: IntegrationTilesBlock['tiles'] }) {
  return (
    <div className={styles.tileGrid2x2}>
      {tiles.map((tile, i) => (
        <div key={tile._key ?? i} className={styles.tile}>
          {tile.number && <div className={styles.tileNumber}>{tile.number}</div>}
          <div className={styles.tileTitle}>{tile.title}</div>
          <div className={styles.tileBody}>{tile.body}</div>
        </div>
      ))}
    </div>
  )
}
