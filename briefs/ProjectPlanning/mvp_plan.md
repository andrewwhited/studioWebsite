# Main Website — MVP Plan

*Written 2026-07-27. The working plan to get andrewwhited.com public.*

This is the sequence and the checklist. Scope decisions live in
`Structure/site_ia.md`; this document is about order of work, not about what
the pages contain.

---

## Sequencing principle

**Finish pages, don't hold them open.** Work through the settled pages first
so the unsettled ones get full attention when they are the only thing left.
The alternative — deciding Objects and Store scope up front — was considered
and rejected: the nav is the only thing those decisions cascade into, and
removing a nav item is a one-line change.

**Photography is the critical path.** Four pages block on a shoot, and the
film turnaround does not compress. Write the whole shot list before starting
the page work so each batch covers more than one page.

**Voice is checked as content is written**, not once at the end. A drift
caught after all the copy is entered means rewriting all of it. The final
pass is for consistency across pages, not for finding the register.

---

## Page work, in order

### 1. Studio
Layout is done as of 2026-07-27.
- [x] Workshop photograph (`locationImage`)
- [x] Reading list covers — all twelve
- [x] Reading list built out — twelve entries with creators, links, and notes
- [ ] Fit and finish. Type and flow specifically: the page works, it is not
      yet loved. A refinement pass, not a gap.
- [ ] Replace the About block photographs. Placeholders, and not blocking —
      see the Portraits task.

The reading list thumbnails no longer scatter. Covers track the cursor along
each row, which is why the hand-placed offsets and their twelve-entry ceiling
are gone.

### 2. Home
- [ ] Review copy against the Voice Guide
- [ ] New hero image, if the shoot produces a better one

### 3. Image
- [ ] Add photo sets
- [ ] Copy

### 4. Art
- [ ] Review copy
- [ ] Verify work data is current
- [ ] Add the latest painting once photographed

### 5. Objects
The least-defined page. Expect real design work, not just content entry.
- [ ] Decide the MVP scope — Objects holds collection work *and* standalone
      self-directed builds, and not everything points at a Store listing
- [ ] IA and layout
- [ ] Content, including photographing works that need it

### 6. Store
May not make the MVP cut. If it doesn't, it comes out of the nav.
- [ ] Decide: in MVP, or MVP+1
- [ ] Collections — needed or not
- [ ] Photograph products
- [ ] Real products into Shopify
- [ ] A "coming soon" pattern, if some products lag. This is a design
      pattern that has to exist, not a per-product note.

---

## Running throughout

- **Shot list** — every photograph the site needs, written once, shot in
  batches. Covers: workshop, home hero, latest painting, Objects works,
  Store products.
- **Voice check** per page as the copy is written.

---

## After the pages

- [ ] Mobile pass — every page. Watch the Studio hero's `100svh` row and
      its `46svh` prose offset in particular.
- [ ] Accessibility pass — contrast on `--color-muted` against cream, focus
      states, alt text on Sanity images, heading order.
- [ ] SEO parity with the UX site — JSON-LD, OG images, sitemap, llms.txt.
      The studio pages have had none of this.
- [ ] Technical cleanup — unused variables, clunky code, efficiency,
      performance, security. `/code-review` and `/security-review` are the
      built-in commands for this.
- [ ] Full critique pass — see `critique/crit_request.md`
- [ ] Consistency pass across pages
- [ ] Friend reviews. They see it once; spend that on a near-final build.
- [ ] Final polish

---

## Publish

- [ ] Remove the apex redirect. `andrewwhited.com` currently 301s to
      `ux.andrewwhited.com`; removing it *is* going live.
- [ ] Spotify env vars in Vercel: `SPOTIFY_CLIENT_ID`,
      `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`. Without them the
      studio page's artist column renders "Unavailable" in production while
      working locally.
- [ ] Check all links
- [ ] Cross-browser check

---

## Backlog — not blocking

- Cross-links between the two sites: an external link to the UX site in the
  studio nav, and the reverse in the UX nav.
