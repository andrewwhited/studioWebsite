import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import styles from './project.module.css'

type Decision = { title: string; body: string }

type ProjectData = {
  title: string
  company: string
  role: string
  year: string
  problem: string[]
  constraints: string[]
  approach: string[]
  decisions: Decision[]
  outcome: string[]
}

const projects: Record<string, ProjectData> = {
  'conversational-ai': {
    title: 'Conversational AI Interface',
    company: 'IBM',
    role: 'Lead Designer',
    year: '2023',
    problem: [
      'Enterprise AI assistants often fail not because of poor models, but because the interface creates wrong expectations about what the system can do, how it responds to ambiguity, and where human judgment is still required.',
      'The brief was to design something that could operate across multiple product contexts — each with different users, tasks, and trust requirements — while feeling like a coherent, authorial system rather than a collection of assembled components.',
    ],
    constraints: [
      'The design had to operate within existing IBM product shells without imposing an entirely new visual language.',
      'The component system needed to be implementable by teams that had not been part of the design process.',
      'Strict accessibility requirements governed interaction patterns, motion behavior, and color contrast throughout.',
    ],
    approach: [
      'The core design problem was not the chat interface itself — that pattern is well-established. The harder problem was designing the system\'s relationship to uncertainty: how it communicates what it knows vs. what it inferred, how it handles follow-up, and how users build an accurate mental model of its capabilities.',
      'I started by auditing the failure modes of existing enterprise AI interfaces, identifying patterns where trust was either over-extended — the system appeared more confident than warranted — or under-communicated — capable actions were invisible to users.',
      'The component system was designed to express three distinct states: confident output, provisional output requiring user confirmation, and explicit limitation disclosure. Each carries consistent visual and behavioral markers across contexts.',
    ],
    decisions: [
      {
        title: 'Graduated confidence signaling',
        body: 'Rather than binary certain/uncertain labels, the interface uses graduated confidence signals tied to source type and reasoning path. This preserves speed in high-confidence cases while surfacing nuance where it matters.',
      },
      {
        title: 'Persistent context panel',
        body: 'A collapsible side panel surfaces the working context of the current conversation — referenced documents, active filters, and session scope. This proved critical for reducing confusion in complex multi-step tasks.',
      },
      {
        title: 'Action confirmation thresholds',
        body: 'Actions above a defined impact threshold require explicit user confirmation before execution. The threshold criteria were defined collaboratively with product and engineering and encoded as interaction logic rather than design judgment at the component level.',
      },
    ],
    outcome: [
      'The system shipped across three IBM product lines and was adopted by two additional product teams during the rollout period.',
      'Post-launch research showed reduced task abandonment during complex multi-step workflows, attributed in part to the confidence-signaling system reducing user hesitation.',
      'The component library was later absorbed into IBM\'s broader design system as a reference implementation for AI interface patterns.',
    ],
  },
  'data-platform': {
    title: 'Enterprise Data Platform',
    company: 'IBM',
    role: 'Senior Designer',
    year: '2022',
    problem: [
      'The platform had accumulated significant usability debt over several major version cycles. Core tasks that users performed daily required navigation paths that crossed multiple conceptual layers of the information architecture, creating high cognitive load in high-stakes contexts.',
      'Users in regulated industries often work under time pressure with low tolerance for error. The existing design required too many orientation steps before action.',
    ],
    constraints: [
      'Preserving established user workflows was a hard constraint. Users had years of trained behavior in the existing system; any change that broke procedural muscle memory would cause adoption failure.',
      'The platform had enterprise integration dependencies that constrained how certain data models could be surfaced in the interface.',
      'A phased rollout was required — the redesign had to coexist with the legacy interface for one version cycle.',
    ],
    approach: [
      'I began with a task-flow audit across the platform\'s primary user roles, mapping the gap between users\' conceptual models of their work and the organizational logic the interface imposed.',
      'The core IA problem was that the platform had been organized around its internal data schema rather than user task patterns. Heavy-use workflows were buried several levels below top-level navigation designed for setup tasks performed infrequently.',
      'The redesign inverted this priority: primary navigation was rebuilt around task frequency and urgency, with the schema-level structure moved to an administrative surface — accessible but no longer dominant.',
    ],
    decisions: [
      {
        title: 'Task-frequency-first navigation',
        body: 'Primary navigation was rebuilt around the ten most common tasks identified in usage data, replacing the schema-mirroring hierarchy that had organized the original IA.',
      },
      {
        title: 'Inline action model',
        body: 'Key actions were pulled from modal dialogs into inline contextual patterns, reducing the number of steps required for the most frequent operations by an average of three interactions.',
      },
      {
        title: 'Progressive disclosure for complexity',
        body: 'Configuration and advanced options were restructured into a layered disclosure model, keeping the primary surface clean while preserving full capability access for power users.',
      },
    ],
    outcome: [
      'The redesigned IA reduced average task completion time for monitored workflows by 28% in usability testing.',
      'Post-launch support ticket volume for navigation-related issues dropped significantly in the first quarter following release.',
      'The phased coexistence approach allowed for a clean transition with no reported critical workflow failures during rollout.',
    ],
  },
  'design-system-governance': {
    title: 'Design System Governance',
    company: 'IBM',
    role: 'Design Systems Lead',
    year: '2021',
    problem: [
      'A design system that is technically comprehensive can still fail if the organization cannot maintain coherent quality over time as teams contribute, adapt, and extend it. The real problem was not the components — it was the governance.',
      'Without a clear contribution model, teams defaulted to local solutions that diverged from the shared system. Without clear ownership, conflict resolution was ad hoc. Without clear documentation, new teams rebuilt what already existed.',
    ],
    constraints: [
      'The governance model had to work without adding centralized gatekeepers who would create bottlenecks for product teams.',
      'Contribution criteria had to be objective enough to apply consistently across teams with different technical and design maturity levels.',
      'The documentation framework had to be maintainable by contributing teams rather than by a dedicated documentation resource.',
    ],
    approach: [
      'I treated governance as a design problem rather than a process problem. The question was not how to control contribution, but how to make high-quality contribution the path of least resistance.',
      'The contribution process was built around tiers — each with different quality thresholds, review requirements, and integration scope — so teams could contribute at the level appropriate to their bandwidth without all contributions requiring the same overhead.',
      'Documentation was restructured from a centralized authoring model to a distributed ownership model, where the team that contributes a component owns its documentation and is accountable for keeping it current.',
    ],
    decisions: [
      {
        title: 'Tiered contribution model',
        body: 'Three contribution tiers — local, shared, and canonical — each with defined quality thresholds and review requirements. This allowed teams to participate at different levels without either blocking or bypassing quality control.',
      },
      {
        title: 'Component stewardship ownership',
        body: 'Each canonical component was assigned a named steward team responsible for its quality, documentation, and long-term evolution. This distributed accountability rather than concentrating it in a single systems team.',
      },
      {
        title: 'Automated quality gates',
        body: 'Contribution PRs were gated against automated accessibility checks, token compliance verification, and documentation completeness — removing subjective review bottlenecks for criteria that could be evaluated programmatically.',
      },
    ],
    outcome: [
      'Contribution volume increased significantly in the two quarters following launch, with a higher ratio of contributions reaching canonical tier than under the previous model.',
      'Time-to-integration for compliant contributions dropped as automated quality gates eliminated review back-and-forth for the most common failure modes.',
      'The tiered model was later cited in an internal design systems review as a reference model for governance across IBM product organizations.',
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects[slug]
  if (!project) return {}
  return { title: `${project.title} — Andrew Whited` }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug]
  if (!project) notFound()

  return (
    <main className={styles.page}>

      <div className={styles.back}>
        <a href="/ux#work" className={styles.backLink}>← Work</a>
      </div>

      <div className={styles.header}>
        <h1 className={styles.projectTitle}>{project.title}</h1>
        <div className={styles.projectMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Company</span>
            <span className={styles.metaValue}>{project.company}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>{project.role}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Year</span>
            <span className={styles.metaValue}>{project.year}</span>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.layout}>
          <div className={styles.label}>Problem</div>
          <div className={styles.body}>
            {project.problem.map((p, i) => (
              <p key={i} className={styles.bodyText}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.layout}>
          <div className={styles.label}>Constraints</div>
          <div className={styles.body}>
            {project.constraints.map((p, i) => (
              <p key={i} className={styles.bodyText}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.layout}>
          <div className={styles.label}>Approach</div>
          <div className={styles.body}>
            {project.approach.map((p, i) => (
              <p key={i} className={styles.bodyText}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.layout}>
          <div className={styles.label}>Key Decisions</div>
          <div className={styles.body}>
            <ul className={styles.decisionList}>
              {project.decisions.map((d) => (
                <li key={d.title} className={styles.decision}>
                  <div className={styles.decisionTitle}>{d.title}</div>
                  <div className={styles.decisionBody}>{d.body}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.layout}>
          <div className={styles.label}>Outcome</div>
          <div className={styles.body}>
            {project.outcome.map((p, i) => (
              <p key={i} className={styles.bodyText}>{p}</p>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
