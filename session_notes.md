# Session Notes — Andrew Whited Studio Website

This file is a running log of session handoffs. Read it at the start of a new chat to catch up. Most recent session is at the top.

---

## Session 8 — March 31, 2026
**Branch:** `design-pass-2`

### What Happened

Shopify Storefront API integration — headless commerce layer for the store.

#### Shopify setup
- Created Headless sales channel in Shopify admin (not via dev dashboard/partners portal — that path was a dead end for this use case)
- Store domain: `studio-97975.myshopify.com`
- Public Storefront API token + private token stored in `.env.local` (gitignored)
- Custom metafields created in Shopify: `custom.materials` (single-line text), `custom.dimensions` (single-line text)
- Local pickup enabled in Shopify checkout settings (not a per-product field)
- Shipping note hardcoded — same for all products

#### New files
- `src/lib/shopify.ts` — Storefront API GraphQL client. Product queries (list, detail, handles), collection query, cart mutations (create, add, update, remove, get), price formatter
- `src/lib/cart-context.tsx` — React context provider. Cart state in memory, cart ID persisted to localStorage. Exposes addItem/updateItem/removeItem/openCart/closeCart
- `src/components/CartDrawer.tsx` + `.module.css` — Slide-out drawer from right. Backdrop, line items with quantity controls, subtotal, checkout link. Escape to close, body scroll lock
- `src/components/CartButton.tsx` + `.module.css` — Floating bottom-right button. Only renders when cart has items. Dark bg, light text, bag icon + count
- `src/app/(main)/store/store-client.tsx` — Client component for store listing. Receives server-fetched products as props. Handles filter state
- `src/app/(main)/store/[slug]/add-to-cart-button.tsx` — Client component wrapping useCart().addItem
- `src/data/store-constants.ts` — Split out to avoid pulling shopify.ts into client bundle (was causing webpack errors)

#### Modified files
- `src/data/store.ts` — Rewired from static array to async Shopify fetchers. `Product` type is unchanged (site schema = source of truth). `mapProduct()` and `mapProductDetail()` normalize Shopify response. `parseMetafield()` handles both raw strings and JSON-wrapped list values. Removed `shipping_note` and `local_pickup_available` from type
- `src/app/(main)/store/page.tsx` — Now a server component that fetches products, passes to store-client. ISR with 60s revalidate
- `src/app/(main)/store/[slug]/page.tsx` — Fetches product by handle from Shopify. Collection name links to `/objects/[slug]`. Shipping note and local pickup hardcoded. Error fallback to notFound()
- `src/app/(main)/layout.tsx` — Wrapped children with CartProvider, added CartDrawer and CartButton
- `next.config.ts` — Added `cdn.shopify.com` to remote image patterns
- `Nav.tsx` / `Nav.module.css` — Restored to original (cart button removed from nav)
- `store.module.css` — Restored original layout. Added `object-fit: cover` for real product images
- `product.module.css` — Added `object-fit: cover` for real images, image placeholder class. Restyled add-to-cart from corner-mark to solid primary button (dark bg, light text, opacity hover)
- `art/[slug]/work.module.css` — Restyled inquire button from corner-mark to ghost/outline (border, border-color hover)
- `ux/thoughts/[slug]/page.tsx` — Fixed pre-existing Next.js 15 async params type error
- `ux/work/[slug]/page.tsx` — Same async params fix

#### Architecture decisions
- **Filters are dynamic** — collection and type lists derived from Shopify products at render time. No hardcoded filter values to maintain
- **Collections are editorial/opt-in** — not every product needs one. Products without a collection just skip the collection line on the detail page and don't appear under any collection filter
- **Cart UI** — floating button + slide-out drawer, not in the nav. Button only appears when cart has items. Felt less intrusive than a persistent nav element on non-store pages
- **Checkout** — redirects to Shopify hosted checkout. No custom checkout (would require Shopify Plus at $2k/mo)
- **Corner-mark CTA retired** — replaced with solid button (store) and ghost button (art inquire). Decision: corner marks weren't earning their complexity

#### Shopify admin notes
- Online Store channel can't be deleted — redirect recommended (add `window.location.href` to theme.liquid) so checkout logo link doesn't strand users on the Shopify-hosted store
- Payments, shipping rates, and tax settings must be configured before checkout will complete
- Product type field drives the Type filter (set to Vessel, Tool, Object, Supply, Chair, Light, etc.)
- Collections in Shopify must match the slug pattern in `objects.ts` for cross-linking to work

---

### What's Outstanding

#### Shopify admin
- **Payments** — no payment provider configured yet. Checkout won't complete without it
- **Shipping rates** — zones and rates not set up
- **Taxes** — Texas sales tax needs confirming
- **Online Store redirect** — theme.liquid JS redirect not yet added
- **Store policies** — refund, shipping, terms not written

#### Store features not yet built
- **URL param filtering** — `/store?collection=Marfa` to pre-filter from collection pages. Not implemented yet
- **Collection page → store link** — "See in store" on `/objects/[slug]` pages
- **Cart error states** — addItem catches errors to console but no user-facing feedback

#### Stage 6 (Commerce Layer) status
- Core integration complete. Products, cart, checkout all functional
- Remaining: payment setup, shipping config, real product content, cross-linking between editorial and store pages

---

## Session 7 — March 2026
**Branch:** `design-pass-2`

### What Happened

Built the "User Testing vs. User Teaching" thought piece from scratch on the UX site.

#### Source material
- Retrieved original essay from `github.com/andrewwhited/portfolio_old` (`teachingTesting.php`) and RTF draft from local assets
- All 13 original SVGs pulled from old repo into `site/public/thoughts/user-testing-vs-user-teaching/`
- Beta 4/5 iOS call screen photos (4.jpg, 5.jpg from desktop) added as `call-screen-beta4.jpg` / `call-screen-beta5.jpg`
- `andrew.jpg` added to `site/public/` and wired into the About photo block

#### Thought detail page restructure (`app/ux/thoughts/[slug]/`)
- Extended `Block` type with `split` (two-column image+text) and `fullbleed` (full-width image) block types
- `split` supports: `side` (left/right image), `photoBg` (background color to fill letterbox), `srcs[]` (two side-by-side images), `heading`, `body[]`
- Added `heroImage` field to `ThoughtData` — when present, header renders as a split (title left, image right)
- Renderer: `hasSplitLayout` flag switches between new full-width layout and legacy narrow-column layout (other essays unaffected)
- Removed back nav bar — nav handles return

#### Layout and CSS (`thought.module.css`)
- `.splitRow` — 100vh height, 1fr/1fr grid, `#DEDED8` borders
- `.splitPhoto` — `object-fit: contain` with per-SVG `photoBg` background color
- `.splitPhotoDouble` — two images side-by-side with padding (96px), used for call screen comparison
- `.splitText` — light palette (`#F6F6F2` bg, `#111110` text) overriding dark UX theme; vertically centered
- `.fullbleedRow` — full-width images
- `.pullRow` / `.pullRowQuote` — full-width centered quote, `--text-2xl` light weight
- `.headerSplit` — 60vh split header; text left (dark), image right

#### Content
- Essay updated to past tense for IBM, argument and section structure faithful to original
- Alternating image sides: left on sections 1, 3, 5, 7, 9, 11 — right on 2, 4, 6, 8, 10
- Closing: "A version of this talk was presented at UX+DEV Summit, Miami (2017) and INTERACT, Mumbai (2017)."

#### Other fixes
- `UxNav.tsx` — all anchor hrefs prefixed with `/ux` so nav works from thought detail pages
- `Thoughts.tsx` — "User Testing vs. User Teaching" added as first entry in the list

---

### What's Outstanding

#### UX subdomain
- **Thoughts content** — only "User Testing vs. User Teaching" has real content. Other two essays are placeholder.
- **Work case study pages** — slugs exist, content is all placeholder.
- **Resume PDF** — `/resume.pdf` linked, doesn't exist yet.
- **Thought detail page redesign** — layout may be revisited once work section shapes up.

#### Main site (Stage 3 ongoing)
- Real photography still the biggest open item
- Collection pages need a design push
- Studio contact section right half still empty

---

## Session 6 — March 2026
**Branch:** `design-pass-2`

### What Happened

UX site grid conversion — complete.

Converted all UX sections from the custom `container` + `var(--label-col) 1fr` grid to the same 12-col system the main site uses.

**Pattern applied:**
```css
.section { border-top: 1px solid var(--color-rule); padding-top: var(--sp-12); }
.layout { display: grid; grid-template-columns: repeat(12, 1fr); gap: 0 var(--col-gap); padding: 0 var(--gutter) var(--sp-12); align-items: start; }
/* label: 1/3 | content: 3/10 | credentials: 1/5, 5/9, 9/13 | timeline entries: span 3 */
```

**Files changed:** `sections.module.css`, `Hero.tsx`, `About.tsx`, `Background.tsx`, `Work.tsx`, `Thoughts.tsx`, `Credentials.tsx`, `app/ux/work/[slug]/project.module.css` + `page.tsx`, `app/ux/thoughts/[slug]/thought.module.css` + `page.tsx`

**Dead CSS removed from `sections.module.css`:** `.container`, `.credGroup`/`.credList`/`.credItem`/`.credItemTitle`/`.credItemMeta`, `.linkList`/`.linkItem`/`.linkLabel`/`.linkHref`/`.sectionNote`, `.aboutGrid`, `.timeline`, `.threeCol`

**Responsive:** Grid column assignments stay active through 768px (responsive tokens reduce gutter/gap). At ≤480px, `.layout` collapses to single column; all explicit grid-column assignments reset to `auto`.

---

## Session 5 — March 2026
**Branch:** `design-pass-2`

### What Happened

UX subdomain — first full pass. Dark theme, leading token fix, child pages built.

#### Dark theme
- Added `[data-theme="ux"]` block to `globals.css` — palette inversion: main-site text (`#111110`) becomes UX bg; main-site bg (`#F0F0EC`) becomes UX text. Same warm undertone, flipped value.
- `--color-muted: #969690`, `--color-rule: #252520`, `--color-nav-bg: rgba(17,17,16,0.92)`
- `app/ux/layout.tsx` — wrapped in `<div data-theme="ux">` with `background-color: var(--color-bg)` via inline style

#### Leading token fix
- `sections.module.css` — all `--leading-snug` and `--leading-base` replaced with `--lh-lg: 24px`
- Hero name keeps `--leading-tight` (ratio appropriate for fluid clamp text)
- Completes the Stage 2 leading token work that was deferred for the UX subdomain

#### Href fixes
- `Work.tsx` — corrected project hrefs from `/work/...` to `/ux/work/...`
- `Thoughts.tsx` — corrected thought hrefs from `/thoughts/...` to `/ux/thoughts/...`
- `Thoughts.tsx` — removed `dangerouslySetInnerHTML`, now plain strings with proper unicode characters

#### Project detail pages (`/ux/work/[slug]`)
- Created `app/ux/work/[slug]/page.tsx` and `project.module.css`
- 3 projects wired: conversational-ai, data-platform, design-system-governance
- Layout: back link → header (title + meta) → sections (Problem / Constraints / Approach / Key Decisions / Outcome)
- Same label-col grid and token system as homepage sections; inherits dark theme from layout wrapper

#### Thought detail pages (`/ux/thoughts/[slug]`)
- Created `app/ux/thoughts/[slug]/page.tsx` and `thought.module.css`
- 2 thoughts wired: on-designing-for-complexity, ai-and-the-designers-role
- Layout: back link → header (context / title / intro) → essay body with section headings → closing note

---

### What's Outstanding

#### UX subdomain
- **Real content** — all copy is mock. Projects and thoughts need real content before the UX site can go live.
- **Password protection** — brief mentions this as an option for restricted IBM material. Not yet implemented.
- **Resume PDF** — `/resume.pdf` linked in Links section, doesn't exist yet.
- **Routing architecture** — currently at `/ux/*` on the same Next.js app. Brief calls for a subdomain. This is a deployment/DNS concern, not a code issue.

#### Main site (Stage 3 ongoing)
- Real photography still the biggest open item
- Collection pages need a design push
- Studio contact section right half still empty

---

## Session 4 — March 2026
**Branch:** `main`

### What Happened

Low-hanging-fruit pass from v2 critique, tracking token consolidation, and product detail page build.

#### Low-hanging fruit (v2 critique recs)
- `studio.module.css` — `heroHeading` clamp: `15px`/`20px` → `var(--text-sm)`/`var(--text-xl)` (desktop + mobile breakpoint)
- `work.module.css` — title clamp ceiling: `28px` → `var(--text-3xl)`
- `work.module.css` — `backLink` line-height: `1` → `var(--lh-xl)`
- `studio.module.css` — reading row `padding-top: 2px` × 3 → `var(--sp-xs)`
- `image.module.css` — mobile grid `gap: 1px` → `var(--sp-xs)`

#### Tracking token consolidation
- Added `--tracking-tight: -0.02em` and `--tracking-tighter: -0.03em` to `globals.css`
- Zeroed out all `-0.01em` values (image title, art stage label, store title + filter label, objects title, studio stage title) — not doing visible work at text-xl and below
- All `-0.02em` section headings → `var(--tracking-tight)`: studio bio/workshop/reading/contact, objects entryTitle, work title
- All display-scale values → `var(--tracking-tighter)`: home title (text-5xl), nav overlay (text-4xl→display), collection heroTitle (text-display), ux heroName
- Collection intro: `-0.015em` → `var(--tracking-tight)`
- Result: 5 arbitrary values → 2 named tokens + default

#### Product detail page (`/store/[slug]`)
- Created `site/src/app/(main)/store/[slug]/page.tsx` and `product.module.css`
- Layout: images cols 1–7 (bleed left), gap col 8, details sticky cols 9–12 — same structural logic as work page
- Right panel order: title → price → "From the [Collection]." → description → meta table (Type, Materials, Dimensions) → Add to cart CTA → fulfillment notes
- Fulfillment notes: two lines — shipping note + "Local pickup available in Austin, TX."
- Corner-mark CTA extended to Add to Cart button — establishes it as a system signature
- Title uses same clamp as work page: `clamp(var(--text-xl), 2vw, var(--text-3xl))`
- Wired store listing cards as `<Link>` to `/store/[slug]`

---

### What's Outstanding

#### Stage 3 — Template Maturity (current stage)

**Structural gaps:**
- **Real photography** — the biggest open item. Every layout is built around images that don't exist.
- **Collection pages** — highest editorial potential. Need real content and a design push.
- **Studio page** — contact section right half (cols 7–12) is empty. Services section needs rethinking.
- **UX subdomain** — stub state.

**Open design conversations (deferred by choice):**
- **Corner-mark CTA** — now extended to Add to Cart on product page. Established as system signature. Decision made.
- **Uppercase label frequency** — Andrew not fully sold. Wants to revisit.
- **Objects entry hover backgrounds** — needs real images to evaluate.
- **Compositional ambition** — no section makes a bold visual argument yet. Future pass.
- **Image aspect ratio policy** — Mamiya RZ67 (6:7) primary. Mixed ratios incoming. Needs design/math discussion.
- **Italic as semantic system** — confirmed for inline book/film/essay title references only.
- **Type style count** — still at ~11. Acknowledged as too many but deferred. Merge candidates: Section Title A/B (same size/weight, different tracking).

---

### Build Stage Reference

Per `briefs/ProjectPlanning/build_order.md`:

| Stage | Description | Status |
|-------|-------------|--------|
| 1 | Structural Foundation | Complete |
| 2 | Visual System Refinement | Complete |
| 3 | Template Maturity | **Current** |
| 4 | Editorial Structure (file-based content) | Upcoming |
| 5 | Content Population | Upcoming |
| 6 | Commerce Layer | Upcoming |
| 7 | UX Portfolio Subdomain | Upcoming |
| 8 | Refinement + Testing | Upcoming |
| 9 | Launch | Upcoming |

---

### Design System Quick Reference

```
Type scale (minor third 1.2, base 14px):
--text-xs: 0.833rem (~11.7px)   --text-2xl: 1.728rem (~24px)
--text-sm: 1rem (14px)          --text-3xl: 2.074rem (~29px)
--text-lg: 1.2rem (~16.8px)     --text-4xl: 2.488rem (~35px)
--text-xl: 1.44rem (~20px)      --text-5xl: 2.985rem (~42px)
                                --text-display: clamp(2.985rem, 5vw, 4.5rem)

Tracking: --tracking-tight: -0.02em (section headings), --tracking-tighter: -0.03em (display scale)
          --tracking-wide: 0.06em, --tracking-wider: 0.1em (labels)

Line heights (4px grid): --lh-xs: 16px → --lh-5xl: 48px

Spacing (semantic only):
--sp-xs: 4px    --sp-xl: 24px       --sp-12: 96px
--sp-sm: 8px    --sp-xxl: 32px      --sp-16: 128px
--sp-md: 12px   --sp-xxxl: 40px     --sp-20: 160px
--sp-lg: 16px   --sp-section: 48px
                --sp-large-section: 64px

Grid: repeat(12, 1fr), gap: 24px, padding: 48px desktop / 24px tablet
Weights: light 300 (display), regular 400 (body), medium 500 (labels)
Colors: --color-bg #F6F6F2, --color-text #111110, --color-muted #72726E,
        --color-rule #DEDED8, --color-placeholder #3E3C38
```

---

### About Andrew (working style)

- Works in focused sessions; prefers clean handoff state so he can leave and return
- Approves plans before execution — wants to see the plan and say go before anything happens
- Once approved, prefers one uninterrupted pass to completion without stopping to check in
- Has strong design instincts — often knows what's wrong already, doesn't need it over-explained
- Distinguishes clearly between "fix it now" and "this is a bigger design conversation" — respects that line
- Interested in Swiss International Style (Crouwel, Hofmann, Müller-Brockmann) as a genuine reference
- Values editorial over corporate; restraint over decoration; mathematical/systematic consistency
- Skeptical of UI conventions that feel imported or template-y
- Thinks of the site as a designed object, not just a functional container
- Prefers brief, direct responses — can read diffs, doesn't need them narrated back
- Liked the critique format; wants it to be an ongoing versioned artifact of the project

---

## Session 3 — March 2026
**Branch:** `design-pass-1`

### What Happened

Completed the critique site (`critique/`) as a versioned design review artifact. The site is now ready to receive v2 when Andrew next asks for a critique.

#### critique/index.html
- Full redesign into a presentation-grade report with section-level visual differentiation
- Section background rhythm: dark (Overview) → white (Methodology) → tinted×4 (Grid/Type/Spacing/Color) → white (Pages) → dark (Market) → default (Intention/Recs) → dark (Verdict)
- Ghost section numbers moved to `.section[data-num]::before` (fixes clipping bug from .section-header)
- Methodology restructured into 2×2 `.frameworks-grid` layout
- Market section (08) fully redesigned:
  - 3 spectrum visualizations (Vernacular Artisan↔Design Culture, Commercial↔Editorial, Object-Focused↔Practice-Focused) with circle=intended / dot=current positions
  - Condensed 2-column reference table with external links
  - 2×2 targeted study grid tied to specific critique score weaknesses
  - 3-column design influence alignment grid (Crouwel / Hofmann / MBJ) with strength badges
- Versioning infrastructure: JS `VERSIONS` array, `showVersion()`, `getDelta()`, score delta arrows from v2 onward
- All v1 section IDs namespaced as `v1-overview`, `v1-grid`, etc.
- `showVersion()` automatically rewrites TOC hrefs to the active version's namespace on switch

#### critique/style.css
- Full redesign to match new structure
- `.section--dark`, `.section--white`, `.section--tinted` background variants with full child overrides
- New components: `.spectrum-group`, `.spectrum-track`, `.spectrum-marker`, `.study-grid`, `.influence-grid`, `.frameworks-grid`, `.section-cols`
- Ghost number CSS on `.section[data-num]::before` — `overflow: hidden` on `.section` prevents clipping

#### critique/crit_request.md
- Updated with full market section HTML structure (spectrum/study/influence pattern)
- Added section background class convention table
- Added methodology frameworks-grid structure
- Added ID namespacing instructions for v2
- Updated `showVersion()` init instruction

---

### What's Outstanding

#### Stage 3 — Template Maturity (current stage)

**Structural gaps:**
- **Real photography** — the biggest open item. Every layout is built around images that don't exist. The atmospheric brief cannot be evaluated without them. Andrew wants to stop deferring this.
- **Product detail page** (`/store/[slug]`) — doesn't exist. Store grid links nowhere. Critical before store functions.
- **Collection pages** — highest editorial potential. Hero, about, objects grid, references, companion section. Need real content and a design push. Andrew specifically wants to develop these.
- **Studio page** — contact section right half (cols 7–12) is empty. Services section layout needs rethinking (too card/template-y). More editorial design potential here generally.
- **UX subdomain** — stub state. Separate but noted as high priority.

**Open design conversations (deferred by choice):**
- **Corner-mark CTA** (`inquireBtn` in `work.module.css`) — 8-gradient growing corners on hover. Either make it a system-level signature or simplify to standard opacity-hover. Andrew undecided.
- **Uppercase label frequency** — Andrew not fully sold on how much uppercase is used. Wants to revisit.
- **Objects entry hover backgrounds** — fading collection image with edge mask on row hover. Site's most distinctive interaction but Andrew unsure if fade effect is on-brand. Needs real images to evaluate.
- **Compositional ambition** — scored B− in audit. No section currently makes a bold visual argument. Dedicated composition pass planned.
- **Image aspect ratio policy** — Andrew shoots primarily on Mamiya RZ67 (6:7), also 35mm. Mixed ratios incoming. Needs design/math discussion before deciding.
- **Italic as semantic system** — confirmed as inline emphasis only (book/film/essay title references).
- **Critique site versioning** — now complete. `critique/crit_request.md` is the standing instruction file. To trigger a v2 critique, open a new chat and say "read `critique/crit_request.md` and conduct a new critique."

---

### Build Stage Reference

Per `briefs/ProjectPlanning/build_order.md`:

| Stage | Description | Status |
|-------|-------------|--------|
| 1 | Structural Foundation | Complete |
| 2 | Visual System Refinement | Complete |
| 3 | Template Maturity | **Current** |
| 4 | Editorial Structure (file-based content) | Upcoming |
| 5 | Content Population | Upcoming |
| 6 | Commerce Layer | Upcoming |
| 7 | UX Portfolio Subdomain | Upcoming |
| 8 | Refinement + Testing | Upcoming |
| 9 | Launch | Upcoming |

---

### Design System Quick Reference

```
Type scale (minor third 1.2, base 14px):
--text-xs: 0.833rem (~11.7px)   --text-2xl: 1.728rem (~24px)
--text-sm: 1rem (14px)          --text-3xl: 2.074rem (~29px)
--text-lg: 1.2rem (~16.8px)     --text-4xl: 2.488rem (~35px)
--text-xl: 1.44rem (~20px)      --text-5xl: 2.985rem (~42px)
                                --text-display: clamp(2.985rem, 5vw, 4.5rem)

Line heights (4px grid): --lh-xs: 16px → --lh-5xl: 48px

Spacing (semantic only — numeric aliases removed):
--sp-xs: 4px    --sp-xl: 24px       --sp-12: 96px
--sp-sm: 8px    --sp-xxl: 32px      --sp-16: 128px
--sp-md: 12px   --sp-xxxl: 40px     --sp-20: 160px
--sp-lg: 16px   --sp-section: 48px
                --sp-large-section: 64px

Grid: repeat(12, 1fr), gap: var(--col-gap) 24px, padding: var(--gutter) 48px
Weights: light 300 (display), regular 400 (body), medium 500 (labels)
Colors: --color-bg #F6F6F2, --color-text #111110, --color-muted #72726E,
        --color-rule #DEDED8, --color-placeholder #3E3C38
```

---

### About Andrew (working style)

- Works in focused sessions; prefers clean handoff state so he can leave and return
- Approves plans before execution — wants to see the plan and say go before anything happens
- Once approved, prefers one uninterrupted pass to completion without stopping to check in
- Has strong design instincts — often knows what's wrong already, doesn't need it over-explained
- Distinguishes clearly between "fix it now" and "this is a bigger design conversation" — respects that line
- Interested in Swiss International Style (Crouwel, Hofmann, Müller-Brockmann) as a genuine reference
- Values editorial over corporate; restraint over decoration; mathematical/systematic consistency
- Skeptical of UI conventions that feel imported or template-y
- Thinks of the site as a designed object, not just a functional container
- Prefers brief, direct responses — can read diffs, doesn't need them narrated back
- Liked the critique format; wants it to be an ongoing versioned artifact of the project

---

## Session 2 — March 2026
**Branch:** `design-pass-1`

### What Happened

Ran a full design audit (`critique/index.html`) then executed an approved cleanup pass across all CSS modules. Stage 2 (Visual System Refinement) is now complete.

#### globals.css
- Added derived color tokens: `--color-bg-muted` (0.5), `--color-bg-subtle` (0.3), `--color-bg-faint` (0.1)
- Removed entire numeric alias block (`--sp-1` through `--sp-8`) — all files now use semantic names

#### home.module.css
- Title: committed to `var(--text-5xl)` — no longer a cautious clamp
- Descriptor: `--text-xs` → `--text-sm`, `max-width: 160px` → `200px`

#### Nav.module.css
- Nav links: weight `regular` → `medium` (matches label convention)
- Overlay links: clamp anchored to scale `clamp(var(--text-4xl), 8vw, var(--text-display))`
- Overlay separator: hardcoded rgba → `var(--color-bg-faint)`

#### studio.module.css
- Workshop statement: `--text-lg` → `--text-xl` (now at section title level)
- Service titles: weight `medium` → `regular`
- Services grid: gap `2px` → `var(--sp-xl)` (24px); removed background-color rule trick
- Reading link padding: `10px` → `var(--sp-md)` (4px-grid compliant)
- Reading title: removed `font-style: italic`, removed `min-height: 38px`
- Listening heading: converted to standard label style (xs/medium/tracking-wider/uppercase/muted)
- All `3px` optical hacks → `var(--sp-xs)`

#### art.module.css
- Work card gap: `3px` → `var(--sp-xs)`
- Work detail: removed non-system `letter-spacing: 0.01em`

#### objects.module.css
- Left panel: `padding-top: 38vh` → `var(--sp-20)` (160px fixed)
- Entry title clamp anchored to scale; tracking consolidated to `-0.02em`

#### image.module.css
- Header: `min-height: 40vh` → `var(--sp-20)` (160px fixed)
- Image grid gap: `2px` → `4px`
- All lightbox rgba values → color tokens

#### store.module.css
- Product info gap: `3px` → `var(--sp-xs)`
- Filter label weight: `light` → `medium`
- Product grid padding-top: fragile `calc()` removed → `var(--sp-12)`

#### collection.module.css
- Hero title: `clamp(32px, 5vw, 64px)` → `var(--text-display)`
- Intro: `clamp(18px, 2vw, 26px)` → `clamp(var(--text-2xl), 2vw, var(--text-3xl))`
- All rgba → color tokens; all `3px` → `var(--sp-xs)`

#### work.module.css
- Second image placeholder: `#b0a89a` → `var(--color-placeholder)`
- Meta label: `2px` → `var(--sp-xs)`

#### UxNav.module.css + sections.module.css
- All numeric aliases replaced; spacing violations fixed

---

### What's Outstanding

#### Stage 3 — Template Maturity (current stage)

**Structural gaps:**
- **Real photography** — the biggest open item. Every layout is built around images that don't exist. The atmospheric brief cannot be evaluated without them. Andrew wants to stop deferring this.
- **Product detail page** (`/store/[slug]`) — doesn't exist. Store grid links nowhere. Critical before store functions.
- **Collection pages** — highest editorial potential. Hero, about, objects grid, references, companion section. Need real content and a design push. Andrew specifically wants to develop these.
- **Studio page** — contact section right half (cols 7–12) is empty. Services section layout needs rethinking (too card/template-y). More editorial design potential here generally.
- **UX subdomain** — stub state. Separate but noted as high priority.

**Open design conversations (deferred by choice):**
- **Corner-mark CTA** (`inquireBtn` in `work.module.css`) — 8-gradient growing corners on hover. Either make it a system-level signature or simplify to standard opacity-hover. Andrew undecided — wants to see if grid/type can carry opinionated design before deciding the role of small gestures.
- **Uppercase label frequency** — Andrew is not fully sold on how much uppercase is used. Classically Swiss? Functional for SOLD OUT or captions, less sure as a general pattern. Wants to revisit.
- **Objects entry hover backgrounds** — fading collection image with edge mask on row hover. Site's most distinctive interaction but Andrew is unsure if the fade effect is on-brand. Needs real images to evaluate.
- **Compositional ambition** — scored B− in audit. No section currently makes a bold visual argument. Dedicated composition pass planned: stronger scale contrast, bolder grid use, type as composition. Future phase.
- **Image aspect ratio policy** — Andrew shoots primarily on Mamiya RZ67 (6:7), also 35mm. Mixed ratios incoming. Open question: how to handle given the 1.2 type scale, 12-col grid, and mathematical consistency choices. Needs a design/math discussion before deciding.
- **Italic as semantic system choice** — removed as standalone styles. Outstanding decision: establish italic for inline book/film/essay title references throughout the site (Andrew is open to this — standard typographic convention).
- **Critique site versioning** — Andrew wants `critique/` to become an ongoing versioned design review archive. Vision: version dropdown at top, latest default. Also wants a `.md` brief explaining the critique process and how to add new reviews — a standing instruction file so he can trigger a review by pointing to it.

---

### Build Stage Reference

Per `briefs/ProjectPlanning/build_order.md`:

| Stage | Description | Status |
|-------|-------------|--------|
| 1 | Structural Foundation | Complete |
| 2 | Visual System Refinement | **Complete** |
| 3 | Template Maturity | **Current** |
| 4 | Editorial Structure (file-based content) | Upcoming |
| 5 | Content Population | Upcoming |
| 6 | Commerce Layer | Upcoming |
| 7 | UX Portfolio Subdomain | Upcoming |
| 8 | Refinement + Testing | Upcoming |
| 9 | Launch | Upcoming |

---

### Design System Quick Reference

```
Type scale (minor third 1.2, base 14px):
--text-xs: 0.833rem (~11.7px)   --text-2xl: 1.728rem (~24px)
--text-sm: 1rem (14px)          --text-3xl: 2.074rem (~29px)
--text-lg: 1.2rem (~16.8px)     --text-4xl: 2.488rem (~35px)
--text-xl: 1.44rem (~20px)      --text-5xl: 2.985rem (~42px)
                                --text-display: clamp(2.985rem, 5vw, 4.5rem)

Line heights (4px grid): --lh-xs: 16px → --lh-5xl: 48px

Spacing (semantic only — numeric aliases removed):
--sp-xs: 4px    --sp-xl: 24px       --sp-12: 96px
--sp-sm: 8px    --sp-xxl: 32px      --sp-16: 128px
--sp-md: 12px   --sp-xxxl: 40px     --sp-20: 160px
--sp-lg: 16px   --sp-section: 48px
                --sp-large-section: 64px

Grid: repeat(12, 1fr), gap: var(--col-gap) 24px, padding: var(--gutter) 48px
Weights: light 300 (display), regular 400 (body), medium 500 (labels)
Colors: --color-bg #F6F6F2, --color-text #111110, --color-muted #72726E,
        --color-rule #DEDED8, --color-placeholder #3E3C38
```

---

### About Andrew (working style)

- Works in focused sessions; prefers clean handoff state so he can leave and return
- Approves plans before execution — wants to see the plan and say go before anything happens
- Once approved, prefers one uninterrupted pass to completion without stopping to check in
- Has strong design instincts — often knows what's wrong already, doesn't need it over-explained
- Distinguishes clearly between "fix it now" and "this is a bigger design conversation" — respects that line
- Interested in Swiss International Style (Crouwel, Hofmann, Müller-Brockmann) as a genuine reference
- Values editorial over corporate; restraint over decoration; mathematical/systematic consistency
- Skeptical of UI conventions that feel imported or template-y
- Thinks of the site as a designed object, not just a functional container
- Prefers brief, direct responses — can read diffs, doesn't need them narrated back
- Liked the critique format; wants it to be an ongoing versioned artifact of the project

---

## Session 1 — Earlier
Initial build and structural pass. Core site structure, layouts, navigation, and base templates established. 12-column grid aligned to design system briefs. Type scale updated to 14px base minor third. Line height tokens converted from ratio to fixed 4px-grid values (`--lh-*`). Column gap updated from 16px to 24px. Spacing semantic tokens named and introduced. See `briefs/ProjectPlanning/build_order.md` for stage context.
