import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import styles from './thought.module.css'

type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'pullquote'; text: string }
  | { type: 'image'; caption?: string }

type ThoughtData = {
  title: string
  context: string
  intro: string
  blocks: Block[]
  closing: string
}

const thoughts: Record<string, ThoughtData> = {
  'on-designing-for-complexity': {
    title: 'On Designing for Complexity',
    context: 'Essay — 2024',
    intro: 'Most design guidance optimizes for simplicity. But in enterprise and AI products, the goal is often not to simplify — it\u2019s to clarify. To make genuine complexity navigable rather than pretending it does not exist.',
    blocks: [
      { type: 'heading', text: 'The simplification trap' },
      { type: 'paragraph', text: 'Design culture has a long-running fetish for simplicity. Remove the friction. Reduce the steps. Make it feel like magic. This is good advice in many contexts and terrible advice in others.' },
      { type: 'paragraph', text: 'The problem is that simplicity as a directive often leads to design that hides complexity rather than making it manageable. When we hide complexity, we shift the cognitive burden from the interface to the user\u2019s mental model. Users are left to discover the hidden parts through failure \u2014 through tasks that don\u2019t work the way they expected, through consequences they didn\u2019t see coming.' },
      { type: 'heading', text: 'Clarify, don\u2019t simplify' },
      { type: 'paragraph', text: 'In complex systems \u2014 enterprise software, AI products, data tools \u2014 the job is usually not to reduce the complexity but to make it legible. To give users an accurate map of the territory so they can navigate it with confidence.' },
      { type: 'pullquote', text: 'The goal is not to reduce the complexity. It is to make it legible.' },
      { type: 'paragraph', text: 'This means exposing structure rather than hiding it. It means designing interfaces that tell users what they\u2019re working with, what the system can and cannot do, and where the consequences of actions are. It means trusting users to handle honest information about their context.' },
      { type: 'heading', text: 'Legibility as a design value' },
      { type: 'paragraph', text: 'Legibility is not the same as simplicity. A legible interface can be dense, capable, and multifaceted \u2014 as long as its structure is clear and its behavior is consistent. Users don\u2019t need fewer things; they need to understand the things they have.' },
      { type: 'image', caption: 'Diagram: information architecture of a complex AI workflow interface' },
      { type: 'paragraph', text: 'Designing for legibility requires a different starting point. Instead of asking \u201chow do we reduce this?\u201d the question becomes \u201chow do we help users build an accurate mental model of this?\u201d That reframe changes what you design for, what you measure, and what success looks like.' },
      { type: 'heading', text: 'Implications for AI products' },
      { type: 'paragraph', text: 'AI products are an extreme case of this. AI systems operate probabilistically and opaquely in ways that no prior software interface has had to account for. Designing them for simplicity \u2014 hiding the model, smoothing over uncertainty, presenting outputs as facts \u2014 creates a trust problem that can be worse than the complexity it replaces.' },
      { type: 'paragraph', text: 'The better bet is legibility: interfaces that communicate what the system knows and how it knows it, that signal confidence levels accurately, that help users build a mental model close enough to the actual model to use it safely. This is harder to design. It is much more valuable.' },
    ],
    closing: 'This essay is an edited version of a piece originally written for internal circulation at IBM in early 2024.',
  },
  'ai-and-the-designers-role': {
    title: 'AI and the Designer\u2019s Role',
    context: 'Talk \u2014 AIGA, 2023',
    intro: 'How AI tools are reshaping the relationship between design thinking and production work, and what that means for designers working at the boundary of both.',
    blocks: [
      { type: 'heading', text: 'What changed' },
      { type: 'paragraph', text: 'Generative AI tools have compressed the distance between idea and artifact. Sketches that used to require hours of production work can be approximated in minutes. This has implications that are simultaneously obvious and underappreciated.' },
      { type: 'paragraph', text: 'The obvious implication: production-level work is getting cheaper. The underappreciated implication: this changes the value proposition of different kinds of design work, and not equally.' },
      { type: 'heading', text: 'What stays hard' },
      { type: 'paragraph', text: 'What AI tools are genuinely bad at, for now, is the part of design that requires judgment about what the problem actually is. Generating a solution is not the same as understanding what problem the solution needs to solve, for whom, under what constraints.' },
      { type: 'pullquote', text: 'Senior design work has always been mostly about judgment. AI tools don\u2019t change the value of that. They change the context in which it operates.' },
      { type: 'paragraph', text: 'Senior design work has always been mostly about judgment \u2014 knowing when to diverge and when to converge, when a solution is good enough and when it needs more work, when the brief is right and when the brief itself is the problem. AI tools don\u2019t change the value of that. They change the context in which it operates.' },
      { type: 'heading', text: 'The reframe' },
      { type: 'paragraph', text: 'For designers working at the intersection of design thinking and production, the AI moment is probably a net positive. It removes friction from the translation step \u2014 from thought to artifact \u2014 and that is where a lot of time used to go.' },
      { type: 'paragraph', text: 'The risk is that design culture responds by doubling down on production values \u2014 treating the ability to generate more artifacts faster as the goal. The more interesting response is to use the freed-up time to go deeper on the harder parts: problem framing, systems thinking, organizational design, the work that was always the most valuable and the hardest to prioritize.' },
      { type: 'heading', text: 'What I tell younger designers' },
      { type: 'paragraph', text: 'Get good at the parts that require judgment. Develop strong opinions about problems, not just solutions. Get comfortable with ambiguity \u2014 being the person who can hold complexity, frame it clearly, and propose a path forward is a durable skill. It doesn\u2019t compress easily.' },
    ],
    closing: 'Adapted from a talk given at AIGA Austin in November 2023.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const thought = thoughts[params.slug]
  if (!thought) return {}
  return { title: `${thought.title} — Andrew Whited` }
}

export default function ThoughtPage({ params }: { params: { slug: string } }) {
  const thought = thoughts[params.slug]
  if (!thought) notFound()

  return (
    <main className={styles.page}>

      <div className={styles.back}>
        <a href="/ux#thoughts" className={styles.backLink}>← Thoughts</a>
      </div>

      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.context}>{thought.context}</div>
          <h1 className={styles.title}>{thought.title}</h1>
          <p className={styles.intro}>{thought.intro}</p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyContent}>
          {thought.blocks.map((block, i) => {
            if (block.type === 'heading') {
              return <h2 key={i} className={styles.sectionHeading}>{block.text}</h2>
            }
            if (block.type === 'pullquote') {
              return <blockquote key={i} className={styles.pullQuote}>{block.text}</blockquote>
            }
            if (block.type === 'image') {
              return (
                <figure key={i} className={styles.imageBlock}>
                  <div className={styles.imagePlaceholder} />
                  {block.caption && (
                    <figcaption className={styles.imageCaption}>{block.caption}</figcaption>
                  )}
                </figure>
              )
            }
            return <p key={i} className={styles.bodyText}>{block.text}</p>
          })}
        </div>
      </div>

      {thought.closing && (
        <div className={styles.closingSection}>
          <p className={styles.closing}>{thought.closing}</p>
        </div>
      )}

    </main>
  )
}
