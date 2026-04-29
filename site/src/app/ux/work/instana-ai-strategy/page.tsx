import type { Metadata } from 'next'
import Figure from '@/components/ux/work/Figure'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Instana AI Strategy — Andrew Whited',
}

export default function InstanaAIStrategyPage() {
  return (
    <main className={styles.page}>
      {/* ───────────────────────────── HERO ───────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <a href="/ux#work" className={styles.heroBack} aria-label="Back to work">←</a>
          <div className={styles.heroLockup}>
            <div className={styles.heroTitleGroup}>
              <h1 className={styles.heroTitle}>
                Instana<br />AI Strategy
              </h1>
              <p className={styles.heroSummary}>
                A unifying interaction model for AI in observability — built before agentic patterns had a name.
              </p>
            </div>
            <dl className={styles.heroMeta}>
              <div className={styles.heroMetaItem}>
                <dt>Client</dt>
                <dd>IBM</dd>
              </div>
              <div className={styles.heroMetaItem}>
                <dt>Role</dt>
                <dd>Senior Design Lead</dd>
              </div>
              <div className={styles.heroMetaItem}>
                <dt>Year</dt>
                <dd>2023–2025</dd>
              </div>
            </dl>
          </div>
          <div className={styles.heroFigure}>
            <Figure
              kind="hero"
              title="Hub-and-spoke interaction model"
              width="full"
              hideCaption
              fill
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────────── THESIS ───────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <h2 className={styles.sectionTitle}>Thesis</h2>
          <div className={styles.bodyTwoCol}>
            <p>
              At Instana, a new focus on AI was starting to surface across the product in disconnected
              pockets: incident summarization in one squad, predictive alerting in another, chatbot research
              in a third. The work was siloed and narrow in focus.
            </p>
            <p>
              I saw the trajectory of the market, the AI direction coming out of IBM, and the Instana need
              for a bigger strategy and a unifying interaction model. The framework I built defined which
              AI capabilities the product should reach for and how they should connect, with a hub-and-spoke
              interaction model at its center: the chatbot as hub, bidirectionally connected to the rest of
              the product.
            </p>
            <p>
              This was early. Agentic AI did not yet have a settled name in the industry, and the interaction
              patterns had not yet crystallized into conventions.
            </p>
            <p>
              I was already leading three concurrent design efforts at Instana. I started this initiative
              as a fourth, pulled in collaborators across PM, engineering, and architecture, and shared the
              framework as scaffolding for other teams exploring AI in their own corners. This set the stage
              for the AI work that shows up in the product today.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── §1 THE SMALL ASK ───────────────────────────── */}
      <section className={styles.section}>
        <div className={`${styles.grid} ${styles.gridThirds}`}>
          <h2 className={styles.sectionTitle}>The small ask</h2>
          <div className={styles.body}>
            <p>
              The assignment that landed on one of my teams was small. Design a Generate-Summary button on
              the incident page. The user clicks, the system writes a paragraph of natural language describing
              what was wrong with the incident, the user moves on. The capability already existed in the
              product in a guardrailed form, surfaced through a single button on a single page. My job was
              to make it more useful.
            </p>
            <p>
              The brief made sense. Incidents in the product are dense by design: grouped alerts, root-cause
              analysis, related events, automation policies, ongoing collaboration notes. Reading one quickly
              is hard. A summary button is a reasonable response to that, and shipping it as a self-contained,
              guardrailed feature was a reasonable way to handle a still-uncertain technology.
            </p>
            <p>On its own, it would have shipped fine.</p>
          </div>
          <div className={styles.figureCell}>
            <Figure
              kind="screenshot"
              src="/work/instana-ai-strategy/v1-summarize-button.png"
              alt="The existing Generate-Summary button on an incident page"
              title="The existing Generate-Summary button"
              caption="Notes and Activity panel on an incident page, with the “Preview” tag visible."
              width="full"
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────────── §2 THE REALIZATION ───────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <h2 className={styles.sectionTitle}>The realization</h2>
          <div className={styles.bodyTwoCol}>
            <p>
              Once I started looking past the button, the picture across the product was harder to ignore.
            </p>
            <p>
              Smart alerts had been doing pattern detection for years without ever being framed as AI.
              Predictive alerting was being sketched out on another team. Chatbot research was running on
              my own team alongside the summary button. Other AI possibilities were being explored elsewhere
              in the product. Each effort was reasonable in isolation, but there was no one whose job it was
              to see how the pieces fit together.
            </p>
            <p>
              The questions that needed asking were obvious once you stepped back. How do all these
              capabilities relate to each other? What is the user&rsquo;s mental model of AI in the product?
              Where does AI live, and where does it not? Without answers, the product was going to ship a
              half-dozen disconnected AI features, each making its own assumptions about how the user should
              encounter them.
            </p>
          </div>
          <blockquote className={styles.quoteUnder}>
            <p>It wasn&rsquo;t anyone&rsquo;s job, so I made it mine.</p>
          </blockquote>
        </div>
      </section>

      {/* ───────────────────────────── §3 THE FRAMEWORK ───────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.gridFramework}>
          <h2 className={styles.sectionTitle}>The framework</h2>
          <div className={styles.frameworkBody}>

            {/* Section intro */}
            <div className={styles.frameworkIntro}>
              <p>
                My response was a framework. A top-down articulation of what AI in the product should be,
                how its pieces should connect, and how users should encounter it.
              </p>
              <p>
                The framework had four parts that fit together: a capabilities taxonomy, an interaction model,
                a set of UI integration patterns, and a technical architecture beneath them. Each part answered
                a question that was not being asked anywhere else in the product.
              </p>
            </div>

            {/* Subsection: Capabilities taxonomy */}
            <div className={styles.subSection}>
              <header>
                <div className={styles.label}>Capabilities taxonomy</div>
              </header>
              <div className={styles.body}>
                <p>
                  The starting move was naming what AI actually was inside the product. Five capability
                  types, each playing a different role.
                </p>
                <p>
                  Naming the types gave every team a vocabulary to locate their work in. The summary button
                  sat in Generative. Smart alerts sat in Predictive. Both were AI in a meaningful sense, and
                  both belonged in the same picture.
                </p>
              </div>
              <div className={styles.tileGrid5}>
                <div className={styles.tile}>
                  <div className={styles.tileNumber}>01</div>
                  <div className={styles.tileTitle}>Generative</div>
                  <div className={styles.tileBody}>Interprets, summarizes, suggests. The chatbot lives here.</div>
                </div>
                <div className={styles.tile}>
                  <div className={styles.tileNumber}>02</div>
                  <div className={styles.tileTitle}>Predictive</div>
                  <div className={styles.tileBody}>Detects anomalies, surfaces what&rsquo;s coming. Smart alerts and predictive alerting.</div>
                </div>
                <div className={styles.tile}>
                  <div className={styles.tileNumber}>03</div>
                  <div className={styles.tileTitle}>RAG</div>
                  <div className={styles.tileBody}>Pulls in documentation, runbooks, and historical context to ground responses in source material.</div>
                </div>
                <div className={styles.tile}>
                  <div className={styles.tileNumber}>04</div>
                  <div className={styles.tileTitle}>Agentic</div>
                  <div className={styles.tileBody}>Performs actions and remediations on the user&rsquo;s behalf.</div>
                </div>
                <div className={styles.tile}>
                  <div className={styles.tileNumber}>05</div>
                  <div className={styles.tileTitle}>Assistive</div>
                  <div className={styles.tileBody}>Sharpens search, recommendations, and small enhancements throughout the product.</div>
                </div>
              </div>
            </div>

            {/* Subsection: Interaction model — hub-and-spoke */}
            <div className={styles.subSection}>
              <header>
                <div className={styles.label}>Interaction model — the chatbot as hub</div>
              </header>
              <div className={styles.body}>
                <p>
                  The capabilities had to connect, not just coexist. I put the chatbot at the center of the
                  interaction model and made the rest of the product the spokes around it.
                </p>
                <p>
                  The chatbot pointed outward to do work in the product. It navigated the user to relevant
                  views. It built things (dashboards, runbooks, summaries) on demand. It served as the entry
                  point for AI features embedded elsewhere in the UI.
                </p>
                <p>
                  The product pointed back to do work in the chatbot. A probable root cause analysis or an
                  insight on a page could launch a chat thread for deeper investigation. AI outputs landed in
                  the chat panel for follow-up.
                </p>
                <p>The chatbot acted as connective tissue between AI capabilities and the rest of the product.</p>
              </div>
              <div className={styles.fullBleedFigure}>
                <Figure
                  kind="hero"
                  title="Hub-and-spoke interaction model"
                  caption="Chatbot at center; bidirectional spokes — outward to navigate, build, and trigger embedded AI; inward from page elements that launch chat threads."
                  width="full"
                />
              </div>
            </div>

            {/* Subsection: UI integration models — 2x2 tile grid */}
            <div className={styles.subSection}>
              <header>
                <div className={styles.label}>UI integration models</div>
              </header>
              <div className={styles.body}>
                <p>
                  Knowing what AI is and how it connects was not enough. The framework also had to specify
                  where AI shows up in the interface and what kind of behavior lives at each surface. Four
                  patterns covered the territory.
                </p>
                <p>
                  Each pattern had a different design challenge. Knowing the framework allowed new features
                  to be built systematically and efficiently within it.
                </p>
              </div>
              <div className={styles.tileGrid2x2}>
                <div className={styles.tile}>
                  <div className={styles.tileNumber}>01</div>
                  <div className={styles.tileTitle}>Self-Contained Chat</div>
                  <div className={styles.tileBody}>The dedicated chat interface, available across the product. Open-ended Q&amp;A, debugging, and the bidirectional interactions all happen here.</div>
                </div>
                <div className={styles.tile}>
                  <div className={styles.tileNumber}>02</div>
                  <div className={styles.tileTitle}>Chat-Driven Navigation</div>
                  <div className={styles.tileBody}>AI woven into how the user moves through the product. The chat surfaces the relevant page; search gets generative reformulation; the product becomes navigable in plain language.</div>
                </div>
                <div className={styles.tile}>
                  <div className={styles.tileNumber}>03</div>
                  <div className={styles.tileTitle}>Artifact Creation</div>
                  <div className={styles.tileBody}>Generative AI embedded in authoring surfaces. Build a dashboard, draft a query, scaffold a runbook inside the tools the user is already working in.</div>
                </div>
                <div className={styles.tile}>
                  <div className={styles.tileNumber}>04</div>
                  <div className={styles.tileTitle}>Contextual Launch</div>
                  <div className={styles.tileBody}>AI features attached to specific objects in the product. The Summarize button on an incident; the same pattern on a Suggest button for a query, an Explain button for a metric.</div>
                </div>
              </div>
            </div>

            {/* Subsection: Technical architecture */}
            <div className={styles.subSection}>
              <header>
                <div className={styles.label}>Technical architecture</div>
              </header>
              <div className={styles.body}>
                <p>
                  I worked through the technical layer too. The framework had to be buildable, and that meant
                  understanding what the systems could actually do at the engineering level.
                </p>
                <p>
                  A user input goes to the LLM, which branches into either natural-language-to-API calls
                  (REST, GraphQL) for querying Instana data or natural-language-to-widget for generating UI
                  artifacts, then returns a response back through the chat. GraphQL handled unified queries.
                  REST handled specific endpoints. The LLM acted as orchestrator over both.
                </p>
                <p>
                  Understanding this gave me the language to translate technical possibilities up to product
                  leadership and design constraints down to engineers. The framework had to be buildable, not
                  aspirational.
                </p>
                <p>
                  Together, the four parts gave the product a system to build into. The summary button on the
                  incident page was one instance of one pattern (Contextual Launch) within one capability
                  (Generative). Once the system was named, every other AI feature in the product had a place
                  to land and a way to connect.
                </p>
              </div>
              <div className={styles.fullBleedFigure}>
                <Figure
                  kind="flow"
                  title="Technical flow"
                  caption="Input → LLM → branch (NL→API for REST/GraphQL · NL→Widget for UI artifacts) → Response."
                  width="full"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────── §4 THE CONCEPTS ───────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.gridFramework}>
          <h2 className={styles.sectionTitle}>The concepts</h2>

          {/* Section intro */}
          <div className={styles.frameworkBody}>
            <div className={styles.frameworkIntro}>
              <p>
                I designed use cases to test the framework and to evangelize it. Each one exercised a
                different part of the system, often more than one at a time.
              </p>
            </div>
          </div>

          {/* Subsection: Incident summarization */}
          <div className={styles.frameworkBody}>
            <div className={styles.subSection}>
              <header>
                <div className={styles.label}>Incident summarization — shipped Q1 2025</div>
              </header>
              <div className={styles.body}>
                <p>
                  The Summarize button itself shipped in Q1 2025. This was the original feature behind the
                  strategy, and it landed in the framework as a Contextual Launch: AI attached to a specific
                  object in the product, surfaced at the moment of need, generating output that lives in
                  context.
                </p>
                <p>
                  Treating the button as one instance of a pattern, instead of a one-off feature, meant
                  designing it to coexist gracefully with everything else AI was going to do across the
                  product.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.fullVisual}>
            <Figure
              kind="multi"
              images={[
                '/work/instana-ai-strategy/v6a-chat-home.png',
                '/work/instana-ai-strategy/v6b-chat-streaming.png',
                '/work/instana-ai-strategy/v6c-chat-summary.png',
              ]}
              alt="Shipped Summarize feature in context"
              title="Shipped Summarize feature in context"
              caption="Chat home with the Summarize affordance · streaming summary generation · final summary output in context."
              width="full"
            />
          </div>

          {/* Subsection: Audience-aware sharing */}
          <div className={styles.frameworkBody}>
            <div className={styles.subSection}>
              <header>
                <div className={styles.label}>Audience-aware sharing</div>
              </header>
              <div className={styles.body}>
                <p>
                  When something breaks in production, an incident gets shared many times to many different
                  people. Executives need to know impact and duration. On-call SREs need probable cause and
                  potential fixes. Downstream engineers need the full technical picture.
                </p>
                <p>
                  I designed a sharing flow where the user picks who the share is for, and the AI generates
                  a summary tailored to that audience:
                </p>
                <ul className={styles.list}>
                  <li><em>Executive overview.</em> Top-line impact: who&rsquo;s affected, how long, severity.</li>
                  <li><em>Triage report.</em> Probable cause and possible solutions for whoever&rsquo;s getting paged.</li>
                  <li><em>Detailed share.</em> Full technical detail for the engineer who will do the work.</li>
                </ul>
                <p>
                  The flow sat inside the existing share modal — a third option alongside invite a
                  collaborator and share a link, with the audience picker driving the template. This is
                  Artifact Creation, not a chat conversation. The user clicks share, picks the audience
                  type, and the system generates a bespoke summary on demand.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.fullVisual}>
            <Figure
              kind="multi"
              images={[
                '/work/instana-ai-strategy/v7a-share-modal.png',
                '/work/instana-ai-strategy/v7b-executive-summary.png',
                '/work/instana-ai-strategy/v7c-triage-report.png',
              ]}
              alt="Audience-aware share concept flow"
              title="Audience-aware share — three-screen concept flow"
              caption="Sharing modal with audience options · executive summary view · triage report view."
              width="full"
            />
          </div>

          {/* Subsection: Chat-to-dashboard */}
          <div className={styles.frameworkBody}>
            <div className={styles.subSection}>
              <header>
                <div className={styles.label}>Generating a dashboard from chat</div>
              </header>
              <div className={styles.body}>
                <p>
                  A user asks the chatbot something specific: &ldquo;Show me latency for our checkout service
                  over the last week.&rdquo; The chatbot&rsquo;s answer is the dashboard itself. It builds it
                  on the fly, then navigates the user to it. The user lands on a new persistent dashboard
                  view, ready to be saved, shared, or extended.
                </p>
                <p>
                  This single flow exercises three patterns at once. It starts in Self-Contained Chat (the
                  user asks). It produces an Artifact (the dashboard). It ends in Chat-Driven Navigation
                  (the user lands on the new view). The chatbot moves from answerer to builder to guide in
                  one user action.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.fullVisual}>
            <Figure
              kind="multi"
              images={[
                '/work/instana-ai-strategy/v8a-chat-ask.png',
                '/work/instana-ai-strategy/v8b-chat-generate.png',
                '/work/instana-ai-strategy/v8c-dashboard-landed.png',
              ]}
              alt="Chat-to-dashboard concept flow"
              title="Chat-to-dashboard concept flow"
              caption="Chat input · chatbot generating a dashboard inline · user landed on the new persistent dashboard view."
              width="full"
            />
          </div>

          {/* Subsection: Runbooks */}
          <div className={styles.frameworkBody}>
            <div className={styles.subSection}>
              <header>
                <div className={styles.label}>Runbooks with a chat refinement loop</div>
              </header>
              <div className={styles.body}>
                <p>
                  When an incident hits, the response often involves running remediation steps that may or
                  may not have been documented before. I designed a flow where the chatbot, anchored to the
                  incident at hand, generates a candidate runbook, pulling from documentation, prior incident
                  histories, and the engineer&rsquo;s intent in the moment.
                </p>
                <p>
                  The runbook lands in the product as an artifact. The user can run it as-is, or click into
                  it to open a chat thread for refinement: &ldquo;Make this safer,&rdquo; &ldquo;Skip step
                  three,&rdquo; &ldquo;Add a rollback at the end.&rdquo; The chat takes the artifact,
                  modifies it, and returns it to the product.
                </p>
                <p>
                  This is Artifact Creation feeding into the bidirectional product-to-chat loop from the
                  interaction model, and pointing toward Agentic AI, where the next step is the chatbot
                  offering to execute the runbook itself.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.fullVisual}>
            <Figure
              kind="multi"
              images={[
                '/work/instana-ai-strategy/v9a-runbook-trigger.png',
                '/work/instana-ai-strategy/v9b-runbook-generate.png',
                '/work/instana-ai-strategy/v9c-runbook-iterate.png',
              ]}
              alt="AI-generated runbook with chat-refinement flow"
              title="AI-generated runbook with chat-refinement flow"
              caption="Chatbot generating a candidate runbook · runbook in the product with a “Refine in chat” affordance · chat thread refining the runbook."
              width="full"
            />
          </div>

          {/* Closing wrap-up */}
          <div className={styles.frameworkBody}>
            <div className={styles.body}>
              <p>
                Each use case touched a different part of the framework. The Summarize button proved
                Contextual Launch could ship. Audience-aware sharing was Artifact Creation, tuned to the
                recipient. The dashboard flow chained three patterns into one user action. The runbook
                loop pointed at the Agentic edge. The framework was producing things that fit together
                as a system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── §5 THE PITCH ───────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.gridFramework}>
          <h2 className={styles.sectionTitle}>The pitch &amp; where it went</h2>

          {/* All synthesis + post-departure prose — 2-col flow */}
          <div className={styles.frameworkBody}>
            <div className={styles.bodyColumns}>
              <p>
                I took the use cases and paired them with the system&rsquo;s IA and taxonomy. The synthesis
                ran end-to-end: vision, capabilities taxonomy, four UI integration models, hub-and-spoke
                interaction model, technical flow, phased roadmap, risks and ethics. The roadmap itself
                moved through four phases (foundations, expanded AI features, automated actions, adaptive
                AI), the last two of which are the territory the industry now calls agentic.
              </p>
              <p>
                I captured the synthesis in a Mural and built pitch decks, flows, and other artifacts from
                it for different audiences. I started sharing the work out, working with the PMs and
                architects I had sold on the vision. The aim was to turn the synthesis into a funded work
                stream with portfolio-level sponsorship behind it.
              </p>
              <p>
                After presenting and documenting the work, I separated from the company. The framework
                didn&rsquo;t ship under my name, but the direction it was pointing in continued to shape
                the product.
              </p>
              <p>
                Since I left, Instana has shipped Intelligent Incident Investigation (preview), using
                agentic AI for faster root cause identification — in the same chatbot-as-investigation-tool
                direction the framework was pushing toward. They also released GenAI Observability for
                monitoring AI applications running on the platform.
              </p>
              <p>
                The strategic direction the framework was articulating is where the product went.
              </p>
            </div>
          </div>

          {/* Stat callout — Gartner Leader, compact block */}
          <div className={styles.frameworkBody}>
            <div className={styles.statCallout}>
              <div className={styles.statValue}>Leader</div>
              <div className={styles.statLabel}>
                Gartner Magic Quadrant for Observability Platforms — July 2025
              </div>
              <div className={styles.statSource}>IBM Instana Observability</div>
            </div>
          </div>

          {/* Reflection — single column at the bottom */}
          <div className={styles.frameworkBody}>
            <div className={styles.body}>
              <p>
                The work was rewarding for what it required: looking past the assignment in front of me to
                the system underneath, designing for a technology before its conventions had settled, and
                trying to bring others along to a vision that hadn&rsquo;t yet been blessed from above.
                That kind of work doesn&rsquo;t always fit within your tenure. Products at this scale are
                built through a ton of collaboration, and it&rsquo;s fun getting to shape the path of
                something that continues to live on.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.ndaNote}>
          Note: Due to NDAs, some assets have been redrawn or generalized.
        </p>
      </footer>
    </main>
  )
}
