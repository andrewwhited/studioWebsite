# Critique Process — Andrew Whited UX Site

This file contains standing instructions for conducting a design critique of the UX subdomain site and publishing a new version to `critique/ux/index.html`. When Andrew asks for a UX site critique, read this file first.

---

## What a Critique Is

A versioned, honest design audit produced from complete source analysis. The critique evaluates:

1. **Grid & Layout** — column discipline, gutter/gap adherence, key line consistency
2. **Typography** — scale adherence, weight convention, style count, clamp() endpoint correctness
3. **Spacing** — 4px base unit violations, token usage, arbitrary values
4. **Color & Interaction** — palette integrity, hover model consistency, hardcoded values
5. **Information Architecture** — section completeness vs. IA spec, anchor IDs, nav alignment, section flow
6. **Content Effectiveness** — hiring signal quality; seniority, domain, credibility, selectivity
7. **Market & Inspiration** — competitive positioning in the UX/product portfolio space, spectrum analysis, targeted study, design influence alignment
8. **Intention vs. Execution** — UX site brief fidelity; where the design succeeds or falls short
9. **Recommendations** — prioritized action list (Critical / High / Medium / Low)
10. **Verdict** — overall letter grade and statement

Critiques are derived from source code. The site does not need to be rendered.

---

## Grading Scale

Use letter grades: A+, A, A−, B+, B, B−, C+, C, C−, D+, D, F

Each category gets its own grade. Overall is a holistic judgment, not a mathematical average.

**Approximate percentage to grade mapping:**
| Grade | Approximate % |
|-------|--------------|
| A     | 90+          |
| A−    | 85–89        |
| B+    | 80–84        |
| B     | 75–79        |
| B−    | 70–74        |
| C+    | 65–69        |
| C     | 60–64        |

---

## Files to Read Before Conducting a Critique

Always read these before starting:

1. `site/src/styles/globals.css` — the design system token source of truth
2. All CSS modules in `site/src/app/ux/**/*.module.css` and `site/src/components/ux/**/*.module.css`
3. All page components in `site/src/app/ux/**/*.tsx` and `site/src/components/ux/sections/*.tsx`
4. `site/src/app/ux/layout.tsx` — theme application, nav, metadata
5. `briefs/ProjectPlanning/ux_site_brief.md` — UX site purpose, goals, tone
6. `briefs/Structure/ux_site_ia.md` — section spec and IA model
7. `briefs/Structure/ux_homepage_outline.md` — section-by-section content direction
8. `briefs/designSystem/typography.md` — type scale spec
9. `briefs/designSystem/grid.md` — grid spec
10. `briefs/designSystem/spacing.md` — spacing token spec
11. `session_notes.md` — current stage and known open items

---

## How to Add a New Critique Version

### Step 1 — Conduct the audit

Read all source files listed above. Cross-reference against the UX brief. Note violations, warnings, strengths, and opportunities for each category. Assign letter grades.

### Step 2 — Add the version to `index.html`

1. **Add a new `<option>` to the version selector** in the sidebar, with `selected` on the latest:
   ```html
   <option value="2" selected>v2 · [Month Year]</option>
   ```

2. **Add a new version panel** immediately after the last closing `</div><!-- /version-panel vN -->`:
   ```html
   <div class="version-panel" data-version="2">
     <!-- Full report content for this version -->
   </div>
   ```
   The panel structure is identical to v1. Use v1 as a template — copy and update all content, scores, and the `data-version` attribute.

3. **Namespace all section IDs** in the new panel using `v2-` prefix:
   - `id="v2-overview"`, `id="v2-methodology"`, `id="v2-grid"`, etc.
   - v1 section IDs are already namespaced as `id="v1-overview"` etc.

4. **Add the new version to the `VERSIONS` JS array** at the bottom of `index.html`:
   ```js
   {
     id: 2,
     label: 'v2 · [Month Year]',
     date: '[Month Year]',
     branch: '[branch-name]',
     scores: {
       grid:        { grade: 'X',  pct: NN },
       typography:  { grade: 'X',  pct: NN },
       spacing:     { grade: 'X',  pct: NN },
       color:       { grade: 'X',  pct: NN },
       ia:          { grade: 'X',  pct: NN },
       content:     { grade: 'X',  pct: NN },
       market:      { grade: 'X',  pct: NN },
       overall:     { grade: 'X',  pct: NN }
     }
   }
   ```

5. **Update the `showVersion()` init call** at the bottom of the script to default to the new version:
   ```js
   showVersion(2); // was showVersion(1)
   ```

### Step 3 — Score progression indicators

Score delta arrows (↑ ↓ →) are computed automatically in JS by comparing the current version's scores against the previous version's scores. No manual HTML changes needed — just make sure each `score-grade` and `score-delta` element has the correct `data-score-key` attribute.

TOC hrefs are automatically rewritten to the active version's namespace by `showVersion()` — no manual updates needed.

---

## Section Background Convention

Each section uses a CSS modifier class to control background. Use this pattern consistently across versions:

| Section | Class | Visual |
|---------|-------|--------|
| 01 Overview | `section--dark` | Dark hero |
| 02 Methodology | `section--white` | Clean, technical |
| 03–06 Grid/Typography/Spacing/Color | `section--tinted` | Warm cream peer group |
| 07 IA | `section--white` | White break |
| 08 Content Effectiveness | `section--tinted` | Tinted |
| 09 Market & Inspiration | `section--dark` | Dark |
| 10–11 Intention/Recommendations | *(none)* | Default bg |
| 12 Verdict | *(verdict element, already dark)* | Dark |

Section element example:
```html
<section class="section section--dark" data-num="01" id="v2-overview">
```

---

## IA Evaluation Framework

When evaluating the Information Architecture section, check:

1. **Section completeness** — compare `page.tsx` render order against `ux_site_ia.md` section list
2. **Anchor IDs** — each section must have the correct `id` (hero, about, work, thoughts, credentials, links)
3. **Nav alignment** — UxNav anchor links must map to real section IDs
4. **Content hierarchy** — does each section lead with the right signal for a hiring reader?
5. **Page flow** — does the sequence Hero → About → Work → Thoughts → Credentials → Links tell a coherent professional story?

---

## Content Effectiveness Evaluation Framework

The UX site's primary goal is to help Andrew get hired for senior design roles. Evaluate content against this filter:

- **Hero**: Does it communicate seniority, domain, and type of work within 5 seconds?
- **About**: Does it show a perspective, not just a biography?
- **Work**: Are cases selective, senior in framing, and outcome-referenced?
- **Thoughts**: Do pieces demonstrate communication and expertise, not just activity?
- **Credentials**: Are proof points accurate and appropriately framed?
- **Proprietary material**: Is IBM-restricted content avoided? Are patent applications described as applications?

---

## Market Positioning Spectrums

Three axes define the UX site's market position:

- **Generic Portfolio ↔ Authored Practice** — does the site feel like a template or a designed artifact?
- **Junior Signal ↔ Senior Signal** — does content/hierarchy/tone read as senior?
- **Process-Heavy ↔ Outcome-Forward** — does the work communicate impact or just describe activities?

The intended position is: Authored Practice (~75%), Senior Signal (~80%), Outcome-Forward (~65%).

---

## Market References (UX Portfolio Tier)

References are drawn from the shared pool at `critique/reference_pool.md`. Do not use a fixed list — select 4–5 references most relevant to the lowest-scoring or most active categories this session. Match references to what needs work using the tag system in the pool file.

---

## Issue Classification

Use these four tags consistently:

| Tag | When to use |
|-----|-------------|
| **Violation** | A clear rule broken — explicit brief or system standard not met |
| **Warning** | A risk or potential problem; not a hard rule violation but worth addressing |
| **Strength** | Something done correctly and worth preserving |
| **Opportunity** | Something not wrong, but could be better; design potential not yet taken |

Issue HTML structure:
```html
<div class="issue tag-warning">
  <div class="issue-tag"><span>Warning</span></div>
  <div class="issue-body">
    <div class="issue-title">Title</div>
    <div class="issue-desc">Description. <span class="mono">file.css → .className</span></div>
    <span class="issue-code">file.css → .selector</span>
  </div>
</div>
```

---

## Tone

- Direct, honest, specific. Not diplomatic for its own sake.
- Cite the actual CSS property and file name when calling out a violation.
- Reference the UX brief explicitly when evaluating intention alignment.
- Reference Crouwel, Hofmann, Müller-Brockmann when evaluating formal/typographic choices.
- Evaluate content against the primary goal: **help Andrew get hired**.
- Distinguish clearly between "fix now" (violations, warnings) and "design conversation" (opportunities).
- The UX site is explicitly not a creative expression vehicle — judge it as a hiring tool first.

---

## Design System Quick Reference

```
Type scale (minor third 1.2, base 14px):
--text-xs: 0.833rem (~11.7px)   --text-2xl: 1.728rem (~24px)
--text-sm: 1rem (14px)          --text-3xl: 2.074rem (~29px)
--text-lg: 1.2rem (~16.8px)     --text-4xl: 2.488rem (~35px)
--text-xl: 1.44rem (~20px)      --text-5xl: 2.985rem (~42px)
                                --text-display: clamp(2.985rem, 5vw, 4.5rem)
                                --text-hero: clamp(3.5rem, 8vw, 7rem) ← UX hero token

Spacing tokens (semantic only — no numeric aliases):
--sp-xs: 4px    --sp-xl: 24px       --sp-12: 96px
--sp-sm: 8px    --sp-xxl: 32px      --sp-16: 128px
--sp-md: 12px   --sp-xxxl: 40px     --sp-20: 160px
--sp-lg: 16px   --sp-section: 48px
                --sp-large-section: 64px

Grid: repeat(12, 1fr), gap: 24px, padding: 48px desktop / 24px tablet
Weights: light 300 (display), regular 400 (body), medium 500 (labels)

UX Dark theme [data-theme="ux"]:
--color-bg: #111110  --color-text: #F0F0EC
--color-muted: #969690  --color-rule: #252520
```

---

## Relationship to Main Site Critique

The main site critique lives at `critique/index.html`. The UX site critique lives here at `critique/ux/index.html`. They share the same `style.css` (referenced as `../style.css`) and the same HTML conventions, grading scale, and issue taxonomy. They are evaluated independently — do not mix content between the two streams.
