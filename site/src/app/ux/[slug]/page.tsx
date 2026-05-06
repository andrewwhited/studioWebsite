import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWorkBySlug, getAllWork } from '@/lib/sanity-queries'
import {
  CaseStudyHero,
  CaseStudySection,
  type WorkData,
  type SectionData,
} from '@/components/ux/work/case-study-blocks'
import workStyles from '@/components/ux/work/case-study.module.css'
import { ThoughtArticle, thoughts } from '@/components/ux/thoughts/ThoughtArticle'

export async function generateStaticParams() {
  const work = await getAllWork()
  const workParams = (work ?? []).map((w: { slug: { current: string } }) => ({
    slug: w.slug.current,
  }))
  const thoughtParams = Object.keys(thoughts).map((slug) => ({ slug }))
  return [...workParams, ...thoughtParams]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const work = await getWorkBySlug(slug)
  if (work) return { title: `${work.title} — Andrew Whited` }
  const thought = thoughts[slug]
  if (thought) return { title: `${thought.title} — Andrew Whited` }
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
    return (
      <main className={workStyles.page}>
        <CaseStudyHero work={work} />
        {work.sections?.map((section: SectionData, i: number) => (
          <CaseStudySection key={section._key ?? i} section={section} />
        ))}
      </main>
    )
  }

  const thought = thoughts[slug]
  if (thought) {
    return <ThoughtArticle thought={thought} />
  }

  notFound()
}
