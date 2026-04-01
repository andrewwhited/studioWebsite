import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWorkBySlug, getAllWork } from '@/lib/sanity-queries'
import styles from './project.module.css'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getWorkBySlug(slug)
  if (!project) return {}
  return { title: `${project.title} — Andrew Whited` }
}

export async function generateStaticParams() {
  const work = await getAllWork()
  return (work ?? []).map((w: { slug: { current: string } }) => ({
    slug: w.slug.current,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getWorkBySlug(slug)
  if (!project) notFound()

  return (
    <main className={styles.page}>

      <div className={styles.back}>
        <a href="/ux#work" className={styles.backLink}>← Work</a>
      </div>

      <div className={styles.header}>
        <h1 className={styles.projectTitle}>{project.title}</h1>
        <div className={styles.projectMeta}>
          {project.company && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Company</span>
              <span className={styles.metaValue}>{project.company}</span>
            </div>
          )}
          {project.role && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Role</span>
              <span className={styles.metaValue}>{project.role}</span>
            </div>
          )}
          {project.year && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Year</span>
              <span className={styles.metaValue}>{project.year}</span>
            </div>
          )}
        </div>
      </div>

      {project.problem?.length > 0 && (
        <section className={styles.section}>
          <div className={styles.layout}>
            <div className={styles.label}>Problem</div>
            <div className={styles.body}>
              {project.problem.map((p: string, i: number) => (
                <p key={i} className={styles.bodyText}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.constraints?.length > 0 && (
        <section className={styles.section}>
          <div className={styles.layout}>
            <div className={styles.label}>Constraints</div>
            <div className={styles.body}>
              {project.constraints.map((p: string, i: number) => (
                <p key={i} className={styles.bodyText}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.approach?.length > 0 && (
        <section className={styles.section}>
          <div className={styles.layout}>
            <div className={styles.label}>Approach</div>
            <div className={styles.body}>
              {project.approach.map((p: string, i: number) => (
                <p key={i} className={styles.bodyText}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.decisions?.length > 0 && (
        <section className={styles.section}>
          <div className={styles.layout}>
            <div className={styles.label}>Key Decisions</div>
            <div className={styles.body}>
              <ul className={styles.decisionList}>
                {project.decisions.map((d: { title: string; body: string }, i: number) => (
                  <li key={i} className={styles.decision}>
                    <div className={styles.decisionTitle}>{d.title}</div>
                    <div className={styles.decisionBody}>{d.body}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {project.outcome?.length > 0 && (
        <section className={styles.section}>
          <div className={styles.layout}>
            <div className={styles.label}>Outcome</div>
            <div className={styles.body}>
              {project.outcome.map((p: string, i: number) => (
                <p key={i} className={styles.bodyText}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}
