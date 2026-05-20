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
import { ThoughtArticle, thoughts } from '@/components/ux/thoughts/ThoughtArticle'
import { buildArticleSchema } from './article-schema'

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
  const localThoughtParams = Object.keys(thoughts).map((slug) => ({ slug }))

  // De-dupe — Sanity thought slugs and local hardcoded slugs may overlap.
  const seen = new Set<string>()
  return [...workParams, ...sanityThoughtParams, ...localThoughtParams].filter(
    ({ slug }) => {
      if (seen.has(slug)) return false
      seen.add(slug)
      return true
    },
  )
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
    const description = seo.metaDescription || sanityThought.summary || sanityThought.intro
    const shareDescription = seo.shareDescription || description
    return {
      title,
      description,
      openGraph: {
        title,
        description: shareDescription,
        url: `https://ux.andrewwhited.com/${slug}`,
        type: 'article',
        images: [{ url: `/${slug}/opengraph-image`, width: 2400, height: 1260, alt: sanityThought.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: shareDescription,
        images: [`/${slug}/opengraph-image`],
      },
    }
  }

  const localThought = thoughts[slug]
  if (localThought) {
    return {
      title: localThought.title,
      description: localThought.intro,
      openGraph: {
        title: localThought.title,
        description: localThought.intro,
        url: `https://ux.andrewwhited.com/${slug}`,
        type: 'article',
        images: [{ url: `/${slug}/opengraph-image`, width: 2400, height: 1260, alt: localThought.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: localThought.title,
        description: localThought.intro,
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

  const localThought = thoughts[slug]
  if (localThought) {
    const articleSchema = buildArticleSchema({
      slug,
      title: localThought.title,
      description: localThought.intro,
      imageUrl: localThought.heroImage
        ? `https://ux.andrewwhited.com${localThought.heroImage}`
        : undefined,
      year: localThought.context,
      type: 'Essay',
    })
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <ThoughtArticle thought={localThought} />
      </>
    )
  }

  notFound()
}
