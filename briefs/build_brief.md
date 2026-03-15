# Andrew Whited — Build Brief

## Purpose
This document is the execution wrapper for the site brief package. It does not replace the other documents. It explains how to use them, how to prioritize them, and what to build first.

The goal is to help the site get built coherently without the implementation drifting away from the intended structure, tone, and visual logic.

---

## Source Documents
Use the following documents together:

- `site_ia.md`
- `design_principles.md`
- `site_rules.md`
- `brand_voice.md`
- `content_model.md`

These documents should be treated as a coordinated brief package.

---

## Priority Order
If any guidance appears to conflict, use this priority order:

1. `site_rules.md`
2. `design_principles.md`
3. `content_model.md`
4. `brand_voice.md`
5. `site_ia.md`

### Interpretation
- `site_rules.md` contains hard constraints and canonical structure decisions.
- `design_principles.md` defines the visual and interaction direction.
- `content_model.md` defines the initial content/data structure.
- `brand_voice.md` defines the tone of written copy.
- `site_ia.md` provides overall site structure and page relationships.

If a proposed implementation weakens the coherence of the site, defaults to generic e-commerce behavior, or creates duplicate page systems, it should be rejected even if it is technically easy.

---

## Build Goal
Build a custom portfolio/studio site that presents Studio, Objects, Art, Image, and Store as one coherent system.

The site should feel:
- editorial
- minimal but not empty
- rational and grid-based
- image-led
- typographically disciplined
- responsive
- commercially functional without becoming storefront-first

The final result should not feel like a stitched-together set of unrelated page types or a generic template with custom styling applied.

---

## Build Strategy
Build in phases. Do not try to solve the entire site, content system, and Shopify integration all at once.

The implementation should establish the visual system and editorial experience first, then layer commerce on top.

---

## Phase Order

### Phase 1 — Site shell and system
Build the shared framework and design system first.

Focus on:
- global layout
- persistent floating top navigation
- responsive behavior
- typography system
- spacing and grid system
- image handling system
- reusable layout components
- homepage

This phase should establish the overall visual logic of the site.

### Phase 2 — Editorial experience
Build the main non-commerce sections using mock content.

Focus on:
- Studio page
- Objects landing page
- one sample Collection page
- Art landing page
- one sample Work page
- Image landing page
- lightbox behavior for Image / Photo Sets

This phase should prove the identity of the site before commerce is introduced.

### Phase 3 — Store and commerce
Once the editorial system feels correct, add Store.

Focus on:
- Store landing page
- product grid
- filtering by type
- filtering by collection
- product detail page
- Shopify integration
- cart basics

Store should inherit the visual system already established rather than driving it.

### Phase 4 — Content wiring and polish
After the core templates and commerce layer exist, refine and connect real content.

Focus on:
- real content entry
- expanded collections
- additional works
- additional photo sets
- responsive refinements
- subtle motion
- form and inquiry handling
- SEO / meta basics
- polish and cleanup

---

## Immediate First Task
Build the first-pass front-end shell of the site using mock content.

Prioritize:
- responsiveness
- persistent floating navigation
- typography
- spacing/grid system
- visual coherence
- image treatment
- distinct but unified section behavior

Start with:
- Home
- Studio page
- Objects landing page
- one Collection page
- Art landing page
- one Work page
- Image landing page with lightbox behavior

Do not integrate Shopify yet.

---

## Mock Data Guidance
Use mock content first where needed.

Mock:
- collection entries
- object previews
- works
- photo sets
- store products

The purpose of early mock content is to prove templates, pacing, hierarchy, and system behavior before wiring real data.

---

## Defer for Now
Do not try to fully solve these in the first pass:

- final CMS architecture
- shipping logic
- inventory edge cases
- out-of-stock notification flows
- full store backend complexity
- final copy for every page
- exhaustive SEO implementation
- advanced animation systems

These can come after the site’s visual and structural system is working.

---

## Hard Implementation Constraints

- The top navigation is always present.
- The top navigation floats over background or hero imagery when present.
- The site must be fully responsive.
- Home is reached through the logo, not a labeled nav item.
- Navigation order is fixed:
  - Studio
  - Objects
  - Art
  - Image
  - Store

### Objects
- Objects is the editorial discovery layer.
- There are no separate individual object detail pages under Objects.
- Purchasable object detail pages live in Store.

### Art
- Art is the canonical presentation layer for one-of-one artworks.
- One-of-one artworks do not need duplicate Store listings unless they also exist as editions or products.

### Image
- Image uses grid + lightbox behavior.
- Do not overbuild it into a full project-page system unless needed later.

### Studio
- Studio is one page with sections, not a multi-page subsection.

---

## Success Criteria
The build is successful when:

- the site feels like one authored system
- the layout is responsive and holds its logic across screen sizes
- navigation is persistent and integrated
- typography and spacing carry the design
- imagery provides warmth and atmosphere
- Objects and Store do not feel duplicative
- Art feels like a presentation layer, not a product catalog
- Store feels coherent with the rest of the site without taking over the whole experience

---

## Implementation Attitude
Prefer:
- order over flourish
- systems over one-off moments
- typography over decoration
- spacing over embellishment
- image quality and pacing over interface noise
- editorial coherence over technical convenience

When in doubt, preserve the clarity and authored feeling of the system rather than adding more complexity.
