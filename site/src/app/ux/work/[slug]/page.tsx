import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWorkBySlug, getAllWork } from '@/lib/sanity-queries'
import {
  CaseStudyHero,
  CaseStudySection,
  type WorkData,
  type SectionData,
} from '@/components/ux/work/case-study-blocks'
import styles from '@/components/ux/work/case-study.module.css'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const work = await getWorkBySlug(slug)
  if (!work) return {}
  return { title: `${work.title} — Andrew Whited` }
}

export async function generateStaticParams() {
  const work = await getAllWork()
  return (work ?? []).map((w: { slug: { current: string } }) => ({
    slug: w.slug.current,
  }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work: WorkData | null = await getWorkBySlug(slug)
  if (!work) notFound()

  return (
    <main className={styles.page}>
      <CaseStudyHero work={work} />
      {work.sections?.map((section: SectionData, i: number) => (
        <CaseStudySection key={section._key ?? i} section={section} />
      ))}
    </main>
  )
}
