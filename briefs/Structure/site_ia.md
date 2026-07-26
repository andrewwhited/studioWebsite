# Andrew Whited — Website Information Architecture

> **MVP scope, 2026-07-26.** This document was written for a full commercial studio site and ran well past MVP. Where a section below conflicts with the decisions in this box, **the box wins.**
>
> - **Studio page collapses.** Hero and Bio merge into one About block (ethos → practice → outputs → commercial). The Services section is **cut** — capability is named inside About instead, with no CTA. *Visit by appointment* is **cut** as premature. Required reading and What's playing stay. Add an Exhibitions and press section, and photos of Andrew and of the workshop.
> - **Commissions are not a focus.** Keep them out of the IA at MVP rather than building the section described below.
> - **Objects is broader than "collections."** It holds collection work *and* standalone self-directed builds (the boat). Not everything under Objects points at a Store listing.
> - **No unity claim.** The site must not assert "a single, ongoing practice" or "one extended practice." The practices are genuinely separate and share one standard, not one medium. See the Voice Guide, Register — Site copy (studio).
> - **Content lives in Sanity only.** Not in JSX fallbacks (removed 2026-07-25), not in `src/data/*.ts` (scaffolding, to be replaced), not in Notion.
> - **The studio site is not public.** The apex 301-redirects to ux.andrewwhited.com. Phase 2 removes the redirect.
>
> The page structure is still in motion and may collapse further. Update this box first when it does.

## Main Navigation
- Studio
- Objects
- Art
- Image
- Store

## Home
**Purpose**
- Serve as the index/landing page for the site.
- Reachable by clicking the logo rather than through the main navigation.

**Content**
- Image
- Title
- Text

---

## Studio
*Revised 2026-07-26 to MVP scope.*

**Purpose**
- Introduce Andrew and the practice. Not a services page.

**Content**
- About block — one continuous text, running ethos → practice → outputs → commercial. Replaces the former Hero heading/text plus Bio split.
- Photo of Andrew
- Workshop — photos, and the address as a bare fact
- Exhibitions and press — bare entries (title, venue, year), no annotation
- Required reading
- What's playing
- Contact methods and social links

**Key actions**
- Learn about Andrew and the practice
- Get in touch

**Structure note**
- Studio is a single page with sections, not a set of child pages.
- **No Services section and no CTA.** Capability is named inside the About block as a plain statement of what he does with clients. Anyone who wants to hire him will email.
- **No visit note.** *Visit by appointment* was cut as posturing ahead of the practice.
- Sections may collapse further. The page is still being worked.

**Cut from the earlier IA**
- List of services, and the "explore services" action
- Hero heading as a separate field from the About text (currently still populated with a retired unity claim; needs its own decision, since it is the page `h1`)

---

## Objects
**Purpose**
- Act as the editorial discovery layer for object-based work.
- Help visitors understand collections, context, references, locations, and the broader world around the work.
- Guide visitors toward individual store listings for purchasable objects.

### Objects Landing Page
**Content**
- Title
- Intro text
- List of entries

### Entry Types Under Objects
- Collection pages
- Core page
- Commissions page

### Object Model Note
- There are no separate individual object pages under Objects.
- The detailed endpoint for purchasable objects is the Store listing page.
- Objects, Collections, and Core exist to help people discover and understand the work before reaching the Store.
- Commissions are different: they show examples broadly and do not need deep detail pages or store endpoints.

### Collection
**Description**
- A named body of object work presented as both a group of objects and an editorial entry point into the ideas, references, places, and context behind that body of work.

**Attributes**
- Title
- Intro / description
- Hero image
- Collection images
- Inspiration / concept text
- References
- Locations / place context
- List of objects
- Optional process images
- Optional links to related store items

**Actions**
- View collection
- Read about the collection’s ideas and context
- Browse objects within the collection
- Link to the store’s filtered view for that collection
- Link to individual product listings where relevant
- Possibly inquire about related work

**Relationships**
- Lives under Objects
- Contains objects
- Relates to Products in the Store
- May map to a Store collection view

### Core
**Description**
- An ongoing group of foundational object pieces presented more directly, without the heavier editorial structure of a collection.

**Attributes**
- Title
- Intro / short description
- List of objects
- Object photos
- Object descriptions
- Optional links to store listings

**Actions**
- Browse objects
- View photos and descriptions
- Link to store listings where available

**Relationships**
- Lives under Objects
- Contains objects
- Relates to Products in the Store

### Commissions
> **Deprioritized 2026-07-26. Not an MVP section.** Andrew's call: commissions are not something he is focusing on. He still takes client work (furniture, film photo shoots, CNC/CAD), but that is named in the Studio About block, not given a section here. The description below is retained only in case the section is revived later. Do not build it.

**Description**
- A broad presentation of commissioned object work used to show what has been done and position the studio for future commission inquiries.

**Attributes**
- Title
- Intro / short description
- List of objects / examples
- Object photos
- Object descriptions

**Actions**
- Browse examples
- View photos and descriptions
- Inquire about commission work

**Relationships**
- Lives under Objects
- Contains objects / examples
- Relates conceptually to services in Studio
- Does not require deep item pages or Store endpoints

---

## Art
**Purpose**
- Introduce the art practice and present individual works directly.
- Serve as the canonical presentation layer for artworks.

### Art Landing Page
**Content**
- Title
- Intro text about the practice
- List/grid of works

**Key actions**
- Read about the practice
- Browse works
- Click into an individual work

### Work
**Description**
- An individual artwork presented within the Art section.

**Attributes**
- Title
- Multiple photos
- Description
- Medium
- Date
- Optional dimensions
- Price
- Status

**Actions**
- View work
- Browse photos
- Read details
- Inquire about the work
- Return to Art landing page

**Relationships**
- Lives under Art
- May later belong to a series

**Commerce note**
- For one-of-one artworks, Art is the canonical endpoint rather than Store.
- Works can show price and status directly on the work page.
- Typical status language may include:
  - Available
  - Sold
  - On hold
  - Inquire
  - Edition available
- If prints, editions, publications, or digital products exist in relation to a work, those may live in Store and be linked from the work page.

---

## Image
**Purpose**
- Present photography and image-based work in a visual-first format.

### Image Landing Page
**Content**
- Title
- Optional short intro
- Grid of photos

**Key actions**
- Browse images
- Click an image to view it larger
- Navigate through images from the same photo set

### Photo Set
**Description**
- A grouped set of related images viewed through the lightbox experience.

**Attributes**
- Images
- Optional title
- Optional location
- Optional date

**Actions**
- Open lightbox
- Click through images in the photo set
- Return to gallery grid

**Relationships**
- Lives under Image

**Structure note**
- Image does not require individual full pages for each photo set at this stage.
- The primary experience is a grid plus lightbox.

---

## Store
**Purpose**
- Serve as the canonical detail and commerce layer for products and purchasable objects.

### Store Landing Page
**Content**
- Title
- Grid/list of items for sale
- Filter controls

**Filters**
- By type
  - chair
  - light
  - print
  - digital file
  - etc.
- By collection

**Key actions**
- Browse items
- Filter by type
- Filter by collection
- Click into an individual product page

### Product
**Description**
- An individual item for sale in the Store.

**Attributes**
- Title
- Photos
- Description
- Product type
- Collection
- Price
- Dimensions
- Other relevant attributes
- In stock / sold out status
- Optional notify / waitlist when out of stock

**Actions**
- View product
- Browse photos
- Read description and details
- Add to cart
- See stock status
- Possibly request notification if out of stock

**Relationships**
- Lives under Store
- May belong to a Collection
- May be linked from Objects pages

**Commerce note**
- Store is the canonical endpoint for individual purchasable objects.
- Store product pages hold the full specs, images, dimensions, inventory state, and transaction flow.
- This avoids duplicating deep item pages under Objects.

---

## Canonical Content Split

### Objects
- Editorial discovery layer
- Collections / Core / Commissions
- Object previews and context
- Endpoint for purchasable objects is Store

### Store
- Canonical detail + commerce layer for objects/products
- Product pages hold full specs, images, dimensions, cart, and inventory

### Art
- Canonical presentation layer for artworks
- Each work has its own full page
- Price, status, and inquiry live on the work page directly
- No duplicate store listings required for one-of-one works

### Image
- Visual gallery layer
- Photo sets experienced through grid + lightbox

### Studio
- Framing/context/about/services/references

