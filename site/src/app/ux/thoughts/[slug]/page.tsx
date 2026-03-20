import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import styles from './thought.module.css'

type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'pullquote'; text: string }
  | { type: 'image'; src?: string; caption?: string }
  | { type: 'split'; side?: 'left' | 'right'; src?: string; srcs?: string[]; photoBg?: string; caption?: string; heading?: string; body: string[] }
  | { type: 'fullbleed'; src: string; caption?: string }

type ThoughtData = {
  title: string
  context: string
  intro: string
  heroImage?: string
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
  'user-testing-vs-user-teaching': {
    title: 'User Testing vs. User Teaching',
    context: 'Essay \u2014 2016',
    intro: 'What role does user testing play in the design practice, and what is our responsibility to progress our users\u2019 visual literacy?',
    heroImage: '/thoughts/user-testing-vs-user-teaching/1.svg',
    blocks: [
      {
        type: 'split',
        srcs: [
          '/thoughts/user-testing-vs-user-teaching/call-screen-beta4.jpg',
          '/thoughts/user-testing-vs-user-teaching/call-screen-beta5.jpg',
        ],
        photoBg: '#1C1C1E',
        caption: 'iOS call screen — beta 4 (left) vs. beta 5 (right)',
        heading: 'An example',
        body: [
          'When iOS 7 went into beta, I closely followed the evolution of the design as it moved through releases. I endured the crashes and glitches because it felt like being in the passenger seat of the product team as they worked out their design details.',
          'The part I was most interested in was the call screen. Just a few icons, a plain red bar to end a call, some text. No fuss. Simple.',
          'Then something changed between beta 4 and beta 5. They redid the call screen. The icons now had circle outlines and the end call bar was changed.',
        ],
      },
      {
        type: 'split',
        side: 'right',
        src: '/thoughts/user-testing-vs-user-teaching/3.svg',
        photoBg: '#000000',
        heading: 'Why?',
        body: [
          'I irrationally disliked this change. The reason, I found out, was user testing \u2014 people didn\u2019t know they could tap the icons. I found it hard to believe that someone wanting to mute a call wouldn\u2019t think to tap the thing that says \u201cmute.\u201d This was not a satisfying answer.',
          'I remember thinking Apple had missed an opportunity to push their customers. Millions of people were going to use this interface. Even if it took an extra second the first time, they would have it by the second. It would be normal by the third.',
          'My take was overdramatic. I\u2019ve since come to like the call screen and watched it evolve well. But my reaction raised questions I\u2019ve kept thinking about: what role should user testing play, and what responsibility do we have to improve users\u2019 visual literacy?',
        ],
      },
      { type: 'pullquote', text: 'What role does user testing play in the design practice, and what is our responsibility to improve our users\u2019 visual literacy?' },
      {
        type: 'split',
        src: '/thoughts/user-testing-vs-user-teaching/4.svg',
        photoBg: '#009444',
        heading: 'The user is always right\u2026',
        body: [
          'At IBM, user research was a pillar of how we worked. For decades the company had built products disconnected from the people using them \u2014 and the results were visible. The \u201cuser first\u201d reset was serious and necessary.',
          'I was not the user of the products I designed. I relied on research to understand whether showing REST resources a certain way mapped to how engineers actually thought, how often someone needed to add an on-premise network connection, how many Salesforce objects they expected to sync. These are not questions a designer can answer from instinct.',
          'I didn\u2019t learn how to design an API creation tool in design school. I learned how to listen to users. I don\u2019t want to understate how much that\u2019s worth.',
        ],
      },
      {
        type: 'split',
        side: 'right',
        src: '/thoughts/user-testing-vs-user-teaching/5.svg',
        photoBg: '#FFFFFF',
        heading: '\u2026except when they aren\u2019t',
        body: [
          'But I don\u2019t want to see a world where the designer becomes a middleman. It\u2019s easy to take \u201cuser first\u201d and extrapolate it into A/B testing every design decision.',
          'The role of the designer has evolved. In the craft era, the tool was the hand. Computers brought machined precision. Now that algorithms can generate infinite variations, the designer risks becoming only a curator \u2014 or worse, delegating choices to the user directly. What color blue does the user prefer? The designer becomes a facilitator serving up whatever the user says they want.',
          'But users are often wrong. I was wrong about iOS 7. Think about how loudly people complained every time Facebook changed its layout \u2014 and how little anyone would want to go back to 2007. Testing is one tool in the repertoire. It shouldn\u2019t be all of them.',
        ],
      },
      { type: 'fullbleed', src: '/thoughts/user-testing-vs-user-teaching/6.svg' },
      { type: 'pullquote', text: 'Finding Balance' },
      {
        type: 'split',
        src: '/thoughts/user-testing-vs-user-teaching/7.svg',
        photoBg: '#E6E7E8',
        body: [
          'Where is the balance? I think it lies in understanding what kind of decision you\u2019re making. In Allen Hurlburt\u2019s \u201cThe Design Concept,\u201d he diagrams the creative process as moving between analytical and intuitive thinking. I find the distinction useful.',
          'Analytical decisions have objective answers: does this solve the actual problem? Do people understand it? Does it work? Users are essential here. But good products aren\u2019t built on analytical decisions alone. We cannot neglect the intuitive side of the creative process.',
        ],
      },
      {
        type: 'split',
        side: 'right',
        src: '/thoughts/user-testing-vs-user-teaching/8.svg',
        photoBg: '#009444',
        heading: 'Teachers of what?',
        body: [
          'There are decisions we should not delegate to our users. Through experience, practice, and deep familiarity with the materials, designers can go beyond what users expect \u2014 or can imagine.',
          'The fact that designers have expertise implies there will be times we decide things the user would not have chosen. That\u2019s not a failure of the process. That\u2019s the process working.',
          'When we expose users to design over time, we shape their expectations. Designers develop users\u2019 visual literacy. We have a responsibility to progress it, not simply reflect it.',
        ],
      },
      { type: 'pullquote', text: '\u201cEven if it is true that the average man seems most comfortable with the commonplace and familiar, it is equally true that catering to bad taste\u2026 merely perpetuates the mediocrity and denies the reader one of the most easily accessible means for aesthetic development and eventual enjoyment.\u201d\n\u2014 Paul Rand' },
      {
        type: 'split',
        src: '/thoughts/user-testing-vs-user-teaching/9.svg',
        photoBg: '#E6E7E8',
        body: [
          'Rand believed in \u201caesthetic development\u201d \u2014 designers as agents who expand what their audience is capable of appreciating. When we push past the familiar, we change visual literacy. Our aesthetics have always changed over time. The question is whether that change is drift or progression. Progression implies a destination.',
        ],
      },
      {
        type: 'split',
        side: 'right',
        src: '/thoughts/user-testing-vs-user-teaching/10.svg',
        photoBg: '#009444',
        heading: 'Where are we going?',
        body: [
          'Type design makes this visible. The way we draw letters has changed radically across time and culture. We can barely read blackletter; a medieval reader would struggle with Helvetica. It\u2019s not only time \u2014 subcultures develop lettering in completely different directions simultaneously.',
          'This is why I don\u2019t believe in absolute beauty \u2014 no golden standard a design can be held against independent of its context. Rand is right that there is aesthetic development. But I don\u2019t think it moves toward a fixed point in the visual or concrete.',
          'The ideal design decision is highly dependent on its variables. We are not working with simple equations \u2014 we deal with complex landscapes of unique users. Time is a variable. Location. Age. Industry. Prior experience. These equations ask us to solve for the whole alphabet.',
        ],
      },
      { type: 'fullbleed', src: '/thoughts/user-testing-vs-user-teaching/11.svg' },
      {
        type: 'split',
        src: '/thoughts/user-testing-vs-user-teaching/12.svg',
        photoBg: '#009444',
        heading: 'Solving for variables',
        body: [
          'The design research process is about filling in context so our designs have the best chance of resonating. Some context is fixed \u2014 how the human eye perceives light, the underlying mathematics of visual perception. These give us basic design principles. But they don\u2019t paint a detailed enough picture of the environments we actually design for. User research fills the gaps.',
        ],
      },
      {
        type: 'split',
        side: 'right',
        src: '/thoughts/user-testing-vs-user-teaching/13.svg',
        photoBg: '#E6E7E8',
        heading: 'Setting expectations',
        body: [
          'So what do we teach, if there is no single archetype of visual literacy to develop toward? Not to love Helvetica or hate drop-shadowed Comic Sans. Not even to prefer generous whitespace. We need to step back from \u201cwhat they like\u201d and ask \u201cwhy they like it.\u201d',
          'We should teach users to appreciate design that is bespoke and contextual \u2014 because there are times Helvetica is not the right choice. By learning why it works in some scenarios, they become able to sense why it fails in others. The way we develop that capacity is to keep serving designs that genuinely respond to specific needs and contexts.',
          'In some ways, we need to teach users to be spoiled. And if we\u2019re lucky, they\u2019ll hold us accountable \u2014 and end up teaching us.',
        ],
      },
    ],
    closing: 'A version of this talk was presented at UX+DEV Summit, Miami (2017) and INTERACT, Mumbai (2017). Originally published January 2016.',
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

  const hasSplitLayout = thought.blocks.some(b => b.type === 'split' || b.type === 'fullbleed')

  return (
    <main className={styles.page}>

{thought.heroImage ? (
        <div className={styles.headerSplit}>
          <div className={styles.headerSplitText}>
            <div className={styles.context}>{thought.context}</div>
            <h1 className={styles.title}>{thought.title}</h1>
            <p className={styles.intro}>{thought.intro}</p>
          </div>
          <div className={styles.headerSplitPhoto}>
            <img src={thought.heroImage} alt="" className={styles.headerSplitImg} />
          </div>
        </div>
      ) : (
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.context}>{thought.context}</div>
            <h1 className={styles.title}>{thought.title}</h1>
            <p className={styles.intro}>{thought.intro}</p>
          </div>
        </div>
      )}

      <div className={styles.body}>
        {hasSplitLayout ? (
          thought.blocks.map((block, i) => {
            if (block.type === 'fullbleed') {
              return (
                <figure key={i} className={styles.fullbleedRow}>
                  <img src={block.src} alt={block.caption ?? ''} className={styles.fullbleedImg} />
                  {block.caption && <figcaption className={styles.fullbleedCaption}>{block.caption}</figcaption>}
                </figure>
              )
            }
            if (block.type === 'split') {
              return (
                <div key={i} className={`${styles.splitRow} ${block.side === 'right' ? styles.splitReverse : ''}`}>
                  <div className={styles.splitPhoto} style={block.photoBg ? { backgroundColor: block.photoBg } : undefined}>
                    {block.srcs ? (
                      <div className={styles.splitPhotoDouble}>
                        {block.srcs.map((s, j) => <img key={j} src={s} alt="" />)}
                      </div>
                    ) : (
                      <img src={block.src} alt={block.caption ?? ''} />
                    )}
                  </div>
                  <div className={styles.splitText}>
                    {block.heading && <h2 className={styles.splitHeading}>{block.heading}</h2>}
                    {block.body.map((p, j) => <p key={j} className={styles.splitBody}>{p}</p>)}
                    {block.caption && <p className={styles.splitCaption}>{block.caption}</p>}
                  </div>
                </div>
              )
            }
            if (block.type === 'pullquote') {
              return (
                <div key={i} className={styles.pullRow}>
                  <blockquote className={styles.pullRowQuote}>{block.text}</blockquote>
                </div>
              )
            }
            return null
          })
        ) : (
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
                    {block.src
                      ? <img src={block.src} alt={block.caption ?? ''} className={styles.imageReal} />
                      : <div className={styles.imagePlaceholder} />
                    }
                    {block.caption && (
                      <figcaption className={styles.imageCaption}>{block.caption}</figcaption>
                    )}
                  </figure>
                )
              }
              return <p key={i} className={styles.bodyText}>{block.text}</p>
            })}
          </div>
        )}
      </div>

      {thought.closing && (
        <div className={styles.closingSection}>
          <p className={styles.closing}>{thought.closing}</p>
        </div>
      )}

    </main>
  )
}
