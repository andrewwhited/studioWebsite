# Andrew Whited — Build Order

## Working Note
This build order is meant to keep the project moving in a clean sequence. It is not a rigid production schedule. Some steps may overlap, and the order can adjust as design decisions become clearer.

The goal is to avoid solving too many layers at once and to keep the visual system, content structure, and commerce integration from getting tangled.

---

## Phase 1 — Scaffold the Site

### Goal
Create the basic site structure and reusable shell.

### Focus
- page routes
- global layout
- persistent top navigation
- responsive shell
- basic page scaffolds
- shared components
- placeholder content where needed

### Build
- Home
- Studio
- Objects
- Art
- Image
- Store
- shared header / nav
- shared layout wrapper
- shared image and text components

### Notes
- At this stage, the goal is not final content or final styling.
- The goal is to establish the site’s bones and confirm the IA in the browser.

---

## Phase 2 — Establish the Design System

### Goal
Define the visual logic of the site.

### Focus
- grid system
- baseline rhythm
- type system
- spacing system
- image behavior
- navigation behavior
- page pacing
- layout decisions
- card/list/detail patterns

### Build / Define
- desktop layout logic
- mobile layout logic
- type hierarchy
- spacing intervals
- image ratios and treatments
- section spacing
- hover / interaction behavior
- lightbox behavior direction
- visual distinction between Studio, Objects, Art, Image, and Store

### Notes
- This is the stage where layouts and design decisions are explored and refined.
- The design system should feel coherent before the site is heavily populated with real content.

---

## Phase 3 — Prove the Templates

### Goal
Build a few real template examples that prove the system works.

### Focus
- real page composition
- content hierarchy
- pacing
- responsiveness
- internal consistency

### Build
- Home
- Studio page
- Objects landing page
- one sample Collection page
- Art landing page
- one sample Work page
- Image landing page with lightbox behavior

### Notes
- Use mock content if needed.
- The point is to verify that the site feels right, not to finish all content.
- This phase should clarify whether the templates are too heavy, too thin, or too similar.

---

## Phase 4 — Set Up the Content Structure

### Goal
Create a practical content organization system for the editorial side of the site.

### Recommendation
Start file-based rather than CMS-first.

### Suggested approach
- one folder per content item where useful
- one markdown file per item/page
- images stored with the related content when practical
- one small settings/config file for ordering, featured items, and mappings if needed

### Why
- easier to control while the design is still evolving
- less overhead than setting up a CMS too early
- easier for Claude to work with directly
- keeps editorial content separate from Shopify

### Content areas to organize
- Studio
- Collections
- Core
- Commissions
- Works
- Photo Sets
- Site settings / homepage selections

### Notes
- This structure can evolve later into or alongside a CMS if needed.
- Do not overengineer the editorial model too early.

---

## Phase 5 — Populate the Editorial Content

### Goal
Begin adding real content to the site once the templates and structure are stable enough.

### Focus
- Studio content
- collection content
- core content
- commissions examples
- work pages
- photo sets
- home selections

### Notes
- Content entry should happen after the templates are proven, not before.
- Expect some content-driven design adjustments at this stage.

---

## Phase 6 — Add Store Integration

### Goal
Connect the site’s product and transaction layer after the editorial side is working.

### Focus
- Store landing page
- product grid
- filters by type and collection
- product pages
- Shopify integration
- cart basics

### Notes
- Store should inherit the site’s visual system rather than defining it.
- Product pages are the canonical endpoint for purchasable objects.
- Do not duplicate deep item detail under Objects.

---

## Phase 7 — Add the UX Subdomain

### Goal
Build the UX portfolio as a separate but related site once the main site is stable.

### Focus
- separate UX site structure
- its own content and presentation logic
- visual relation to the main site without collapsing into sameness

### Notes
- UX should remain a separate subdomain, not a section of the main site.
- This work should come after the main site’s system is established.

---

## Phase 8 — Refine, Test, Refine, Test

### Goal
Stress-test the site and tighten the experience before launch.

### Focus
- responsive cleanup
- spacing and hierarchy refinement
- interaction refinement
- image optimization
- copy cleanup
- link testing
- content consistency
- browser/device testing
- store edge cases
- final polish

### Notes
- Expect this phase to loop multiple times.
- This is where the site becomes convincing rather than merely functional.

---

## Phase 9 — Publish

### Goal
Launch the site with a coherent first version.

### Focus
- deployment
- domain / DNS
- production checks
- analytics if desired
- final QA
- post-launch fixes

---

## Suggested Immediate Next Step
The strongest next move is:

1. scaffold the site
2. establish the design system
3. prove a few core templates
4. only then start loading real content

That keeps the project from becoming a content-management exercise before the site actually feels right.

---

## Suggested Content Organization
A practical first-pass structure could look like this:

```txt
/content
  /studio
    index.md

  /collections
    /collection-a
      index.md
      hero.jpg
      image-01.jpg
      image-02.jpg

    /core
      index.md
      object-01.jpg
      object-02.jpg

    /commissions
      index.md
      example-01.jpg
      example-02.jpg

  /works
    /work-a
      index.md
      cover.jpg
      detail-01.jpg
      detail-02.jpg

  /photo-sets
    /set-a
      index.md
      cover.jpg
      image-01.jpg
      image-02.jpg

  /site
    home.md
    settings.json
```

### Notes
- This keeps editorial content file-based and close to its images.
- Shopify can remain the owner of Store products.
- A CMS can be added later if file-based content becomes limiting.

---

## Core Principle
Build the experience first, then the content layer, then the commerce layer, then the secondary UX site, then polish and publish.

Do not let backend decisions or store integration prematurely determine the character of the site.
