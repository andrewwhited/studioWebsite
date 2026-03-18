# Critique Process — Andrew Whited Studio

This file contains standing instructions for conducting a design critique of the studio website and publishing a new version to `critique/index.html`. When Andrew asks for a critique, read this file first.

---

## What a Critique Is

A versioned, honest design audit produced from complete source analysis. The critique evaluates:

1. **Grid & Layout** — column discipline, gutter/gap adherence, key line consistency
2. **Typography** — scale adherence, weight convention, style count, clamp() endpoint correctness
3. **Spacing** — 4px base unit violations, token usage, arbitrary values
4. **Color & Interaction** — palette integrity, hover model consistency, hardcoded values
5. **Page Analysis** — per-page scoring of adherence, compositional strength, brief alignment
6. **Market & Inspiration** — competitive positioning, spectrum analysis, targeted study, design influence alignment
7. **Intention vs. Execution** — brief fidelity; where the design succeeds or falls short
8. **Recommendations** — prioritized action list (Critical / High / Medium / Low)
9. **Verdict** — overall letter grade and statement

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
2. All CSS modules in `site/src/app/**/*.module.css` and `site/src/components/**/*.module.css`
3. All page components in `site/src/app/**/*.tsx`
4. `briefs/ProjectPlanning/build_brief.md` — project standards and brief
5. `briefs/designSystem/typography.md` — type scale spec
6. `briefs/designSystem/grid.md` — grid spec
7. `briefs/designSystem/spacing.md` — spacing token spec
8. `session_notes.md` — current stage and known open items

---

## How to Add a New Critique Version

### Step 1 — Conduct the audit

Read all source files listed above. Cross-reference against the brief. Note violations, warnings, strengths, and opportunities for each category. Assign letter grades.

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
       brief:       { grade: 'X',  pct: NN },
       composition: { grade: 'X',  pct: NN },
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

Score delta arrows (↑ ↓ →) are computed automatically in JS by comparing the current version's scores against the previous version's scores. No manual HTML changes needed — just make sure each `score-grade` and `score-delta` element has the correct `data-score-key` attribute (already templated in v1).

TOC hrefs are automatically rewritten to the active version's namespace by `showVersion()` — no manual updates needed.

---

## Section Background Convention

Each section uses a CSS modifier class to control background. Use this pattern consistently across versions:

| Section | Class | Visual |
|---------|-------|--------|
| 01 Overview | `section--dark` | Dark hero |
| 02 Methodology | `section--white` | Clean, technical |
| 03–06 Grid/Typography/Spacing/Color | `section--tinted` | Warm cream peer group |
| 07 Page Analysis | `section--white` | White break |
| 08 Market & Inspiration | `section--dark` | Dark |
| 09–10 Intention/Recommendations | *(none)* | Default bg |
| 11 Verdict | *(verdict element, already dark)* | Dark |

Section element example:
```html
<section class="section section--dark" data-num="01" id="v2-overview">
```

---

## Section Structure Patterns

### Methodology (02) — 2×2 frameworks grid

The methodology section uses `.frameworks-grid` to lay out the four evaluation frameworks in a 2×2 grid:

```html
<div class="frameworks-grid">
  <div class="framework-block">
    <h3>Heuristic Evaluation</h3>
    <p class="body-text">...</p>
  </div>
  <div class="framework-block">
    <h3>Swiss Design Principles</h3>
    <p class="body-text">...</p>
  </div>
  <div class="framework-block">
    <h3>Elements of Typographic Style</h3>
    <p class="body-text">...</p>
  </div>
  <div class="framework-block">
    <h3>Intention Alignment</h3>
    <p class="body-text">...</p>
  </div>
</div>
```

### Market & Inspiration (08) — Four subsections

The market section has four distinct visual subsections in this order:

#### 1. Market Positioning Spectrums

Three axes displayed as visual spectrum tracks. Each spectrum shows intended position (open circle ○) and current execution (filled circle ●). Update the `style="left: NN%"` positions based on the new critique's assessment.

```html
<h3>Market Positioning</h3>
<p class="body-text">Three axes define the market space...</p>

<div class="spectrum-group">
  <div class="spectrum-item">
    <div class="spectrum-labels">
      <span class="spectrum-label-left">Vernacular Artisan</span>
      <span class="spectrum-label-right">Design Culture</span>
    </div>
    <div class="spectrum-track">
      <div class="spectrum-fill" style="width: NN%"></div>
      <div class="spectrum-marker spectrum-marker--intended" style="left: NN%" title="..."></div>
      <div class="spectrum-marker spectrum-marker--current" style="left: NN%" title="..."></div>
    </div>
    <p class="spectrum-note">One-line diagnosis of the gap.</p>
  </div>
  <!-- repeat for Commercial↔Editorial and Object-Focused↔Practice-Focused -->
</div>

<div class="spectrum-legend">
  <span class="legend-item"><span class="legend-marker legend-marker--intended">○</span> Intended position</span>
  <span class="legend-item"><span class="legend-marker legend-marker--current">●</span> Current execution</span>
</div>
```

The three axes are always:
- Vernacular Artisan ↔ Design Culture
- Commercial ↔ Editorial
- Object-Focused ↔ Practice-Focused

#### 2. Reference Studios table

Condensed 2-column table (Studio | Lesson). Use `.reference-link` class for all studio links.

```html
<h3>Reference Studios</h3>
<table class="market-table">
  <thead><tr><th>Studio</th><th>Lesson</th></tr></thead>
  <tbody>
    <tr>
      <td><a href="URL" target="_blank" rel="noopener" class="reference-link">Name</a></td>
      <td>One-sentence lesson for this site.</td>
    </tr>
  </tbody>
</table>
```

#### 3. Targeted Study grid

2×2 grid of specific study recommendations, each tied to a critique score weakness. Update titles and descriptions to reflect what the new critique found.

```html
<h3>Targeted Study</h3>
<p class="body-text">Specific references for specific weaknesses...</p>

<div class="study-grid">
  <div class="study-item">
    <div class="study-score">Composition B−</div>
    <div class="study-title">Reference title or book</div>
    <div class="study-desc">What to study and why it addresses the specific weakness.</div>
  </div>
  <!-- 3 more items -->
</div>
```

#### 4. Design Influence Alignment

3-column grid evaluating alignment with Crouwel, Hofmann, and Müller-Brockmann. Use `.alignment-strong` (green) or `.alignment-partial` (amber) badges.

```html
<h3>Design Influence Alignment</h3>
<p class="body-text">...</p>

<div class="influence-grid">
  <div class="influence-item">
    <div class="influence-name">Wim Crouwel</div>
    <div class="influence-principle">"Quote or principle."</div>
    <div class="influence-alignment alignment-strong">Strong alignment</div>
    <p class="body-text">Assessment...</p>
  </div>
  <!-- Armin Hofmann, Josef Müller-Brockmann -->
</div>
```

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

## Market References

When mentioning these studios/architects in the market section, link them:

| Name | URL |
|------|-----|
| Apparatus Studio | https://apparatusstudio.com |
| Jasper Morrison | https://jaspermorrison.com |
| Muller Van Severen | https://www.mullervanserveren.be |
| David Chipperfield | https://davidchipperfield.com |
| Caruso St John | https://carusostjohn.com |
| Formafantasma | https://formafantasma.com |
| Salon 94 | https://www.salon94.com |
| Carpenters Workshop Gallery | https://www.carpentersworkshopgallery.com |
| 6a architects | https://6a.co.uk |

---

## Tone

- Direct, honest, specific. Not diplomatic for its own sake.
- Cite the actual CSS property and file name when calling out a violation.
- Reference the brief explicitly when evaluating intention alignment.
- Reference Crouwel, Hofmann, Müller-Brockmann, and Bringhurst when evaluating compositional and typographic choices — these are the project's stated design references.
- Distinguish clearly between "fix now" (violations, warnings) and "design conversation" (opportunities).

---

## Design System Quick Reference

```
Type scale (minor third 1.2, base 14px):
--text-xs: 0.833rem (~11.7px)   --text-2xl: 1.728rem (~24px)
--text-sm: 1rem (14px)          --text-3xl: 2.074rem (~29px)
--text-lg: 1.2rem (~16.8px)     --text-4xl: 2.488rem (~35px)
--text-xl: 1.44rem (~20px)      --text-5xl: 2.985rem (~42px)
                                --text-display: clamp(2.985rem, 5vw, 4.5rem)

Spacing tokens (semantic only — no numeric aliases):
--sp-xs: 4px    --sp-xl: 24px       --sp-12: 96px
--sp-sm: 8px    --sp-xxl: 32px      --sp-16: 128px
--sp-md: 12px   --sp-xxxl: 40px     --sp-20: 160px
--sp-lg: 16px   --sp-section: 48px
                --sp-large-section: 64px

Grid: repeat(12, 1fr), gap: 24px, padding: 48px desktop / 24px tablet
Weights: light 300 (display), regular 400 (body), medium 500 (labels)
Colors: --color-bg #F6F6F2, --color-text #111110, --color-muted #72726E,
        --color-rule #DEDED8, --color-placeholder #3E3C38
        Derived: --color-bg-muted (50%), --color-bg-subtle (30%), --color-bg-faint (10%)
```
