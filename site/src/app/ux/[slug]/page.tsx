import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWorkBySlug, getAllWork, getThoughtBySlug, getAllThoughts } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import {
  CaseStudyHero,
  CaseStudySection,
  type WorkData,
  type SectionData,
} from '@/components/ux/work/case-study-blocks'
import workStyles from '@/components/ux/work/case-study.module.css'
import { Essay, countWords, type ThoughtDoc } from '@/components/ux/thoughts/essay-blocks'
import { buildArticleSchema } from './article-schema'

const SITE_URL = 'https://ux.andrewwhited.com'

type Seo = {
  metaTitle?: string
  metaDescription?: string
  shareDescription?: string
}

export async function generateStaticParams() {
  const [work, sanityThoughts] = await Promise.all([
    getAllWork().catch(() => []),
    getAllThoughts().catch(() => []),
  ])
  const workParams = (work ?? [])
    .filter((w: { slug?: { current?: string } }) => w?.slug?.current)
    .map((w: { slug: { current: string } }) => ({ slug: w.slug.current }))
  const sanityThoughtParams = (sanityThoughts ?? [])
    .filter((t: { slug?: { current?: string } }) => t?.slug?.current)
    .map((t: { slug: { current: string } }) => ({ slug: t.slug.current }))
  return [...workParams, ...sanityThoughtParams]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const work = await getWorkBySlug(slug)
  if (work) {
    const seo: Seo = work.seo || {}
    const title = seo.metaTitle || work.title
    const description = seo.metaDescription || work.summary
    const shareDescription = seo.shareDescription || description
    return {
      title,
      description,
      openGraph: {
        title,
        description: shareDescription,
        url: `https://ux.andrewwhited.com/${slug}`,
        type: 'article',
        images: [{ url: `/${slug}/opengraph-image`, width: 2400, height: 1260, alt: work.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: shareDescription,
        images: [`/${slug}/opengraph-image`],
      },
    }
  }

  const sanityThought = await getThoughtBySlug(slug)
  if (sanityThought) {
    const seo: Seo = sanityThought.seo || {}
    const title = seo.metaTitle || sanityThought.title
    const description = seo.metaDescription || sanityThought.subtitle || sanityThought.summary
    const shareDescription = seo.shareDescription || description
    // An essay with a hero image gets the light card, which renders at 1x —
    // see the size note in opengraph-image.tsx. Declaring the wrong dimensions
    // is worse than declaring none, so they follow the branch the card takes.
    const cardSize = sanityThought.heroImage?.asset
      ? { width: 1200, height: 630 }
      : { width: 2400, height: 1260 }
    return {
      title,
      description,
      // Stated explicitly so cross-posts on Medium or Substack can point their
      // canonical here and this copy stays the one that ranks.
      alternates: { canonical: `${SITE_URL}/${slug}` },
      openGraph: {
        title,
        description: shareDescription,
        url: `${SITE_URL}/${slug}`,
        type: 'article',
        authors: [SITE_URL],
        ...(sanityThought.publishedAt && { publishedTime: sanityThought.publishedAt }),
        ...(sanityThought._updatedAt && { modifiedTime: sanityThought._updatedAt }),
        images: [{ url: `/${slug}/opengraph-image`, ...cardSize, alt: sanityThought.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: shareDescription,
        images: [`/${slug}/opengraph-image`],
      },
    }
  }

  return {}
}

export default async function UxSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const work: WorkData | null = await getWorkBySlug(slug)
  if (work) {
    const heroImageUrl = work.heroImage?.asset
      ? urlFor(work.heroImage).width(1200).quality(80).auto('format').url()
      : undefined
    const articleSchema = buildArticleSchema({
      slug,
      title: work.title,
      description: work.summary,
      imageUrl: heroImageUrl,
      year: work.year,
      type: 'CaseStudy',
    })
    return (
      <main className={workStyles.page}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <CaseStudyHero work={work} />
        {work.sections?.map((section: SectionData, i: number) => (
          <CaseStudySection key={section._key ?? i} section={section} />
        ))}
      </main>
    )
  }

  // Every essay renders on the editorial template. A thought with no `body`
  // is a stub that was never written — there is no second renderer to fall
  // through to any more, so it 404s rather than rendering an empty page.
  const thought: ThoughtDoc | null = await getThoughtBySlug(slug)
  if (thought?.body?.length) {
    const heroImageUrl = thought.heroImage?.asset
      ? urlFor(thought.heroImage).width(1200).quality(80).auto('format').url()
      : undefined
    const articleSchema = buildArticleSchema({
      slug,
      title: thought.title,
      description: thought.subtitle,
      imageUrl: heroImageUrl,
      year: thought.year,
      datePublished: thought.publishedAt,
      dateModified: thought._updatedAt,
      wordCount: countWords(thought.body),
      topics: thought.topics,
      type: 'Essay',
    })
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <Essay thought={thought} />
      </>
    )
  }

  notFound()
}
