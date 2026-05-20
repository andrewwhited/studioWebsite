import { getUxSiteSettings } from '@/lib/sanity-queries'

// Plain-text body served at /llms.txt — an LLM-friendly summary of the site.
// Content is Sanity-driven (uxSiteSettings.llmsTxt); this fallback ships the
// initial calibrated draft so the route works before the CMS is populated.

const FALLBACK = `# Andrew Whited

> Senior Design Leader · AI, Enterprise Platforms, Information Architecture
> Austin, TX · Looking for Staff / Principal / Senior Lead IC roles
> https://ux.andrewwhited.com · https://linkedin.com/in/andrewwhited

## About

Senior design leader with 11 years at IBM scaling design across Hybrid Cloud, Business Automation, and AIOps. Deep practice in AI product design, information architecture, multi-team design leadership, and design strategy at portfolio scale.

## Currently (as of May 2026)

- Independent practice in AI systems and product design
- Building a personal AI operating system (Notion + Claude Code, multi-agent orchestration)
- Designing agentic workflows; daily Claude Code user
- Multidiscipline studio work — furniture, objects, physical design
- Open to Staff / Principal / Senior Lead Product Design roles, IC track preferred

## Most recent IBM roles

- **Senior Design Lead (Staff), AIOps** · Jan 2023 – Apr 2025 · Set unified AI strategy across 12 product teams in Instana observability portfolio. Designed and shipped generative AI features. Authored two AI / UXR technical publications (2024, 2025).
- **Senior Design Lead (Staff), Business Automation** · Jan 2018 – Dec 2022 · Oversaw five design teams. Led portfolio-wide consolidation of 12+ offerings into a single unified platform.
- **Designer → Design Lead, Hybrid Cloud** · Jan 2014 – Dec 2017 · Visual systems for IBM's Design Thinking program. Directed a six-person team.

## Selected work

- [Instana AI Strategy](https://ux.andrewwhited.com/instana-ai-strategy) — A unifying interaction model for AI in observability. Built before agentic patterns had a name.
- [IBM Business Automation Platform](https://ux.andrewwhited.com/business-automation-platform) — An object model and authoring container that unified IBM's Business Automation portfolio.

## Publications

- Automatic Content Transfer to a Physically Present Person Based on NLP · IBM technical publication · 2024
- UXR System and Method using AI to Facilitate and Enhance Research Activities · IBM technical publication · 2025

## Recognition

- IBM Outstanding Technical Achievement Award · 2017
- UX+DEV Summit keynote (Miami) · 2017
- INTERACT keynote (Mumbai) · 2017

## Looking for

Staff / Principal / Senior Lead Product Designer roles, IC track preferred. AI-native products, frontier domains (AI, quantum, drones, space), or design-central companies. Fully remote preferred, hybrid considered. Total comp $220k+.

## Contact

[LinkedIn](https://linkedin.com/in/andrewwhited) · [Resume PDF](https://ux.andrewwhited.com/resume.pdf) · [Studio site](https://andrewwhited.com)
`

export async function GET() {
  const settings = await getUxSiteSettings().catch(() => null)
  const body = settings?.llmsTxt?.trim() || FALLBACK

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  })
}
