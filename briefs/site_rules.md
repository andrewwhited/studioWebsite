# Andrew Whited — Site Rules

## Structural Rules

- Home is the index/landing page and is reached by clicking the logo.
- Home does not appear as a labeled item in the main navigation.
- The main navigation order is fixed:
  - Studio
  - Objects
  - Art
  - Image
  - Store

## Navigation Rules

- The top navigation is always present across the site.
- The top navigation should float over background or hero imagery when present.
- Navigation should remain consistently accessible without breaking the visual tone of the page.
- The nav should feel integrated into the design, not like a separate utility bar pasted on top.

## Responsiveness

- The site must be fully responsive.
- Responsiveness is a core requirement, not an afterthought.
- The layout system, navigation, typography, image handling, and spacing must work across desktop and mobile.
- The site should retain its visual logic and hierarchy at smaller sizes rather than collapsing into something generic.

## Studio Rules

- Studio is a single page with sections, not a set of child pages.
- Studio includes:
  - About me / practice
  - About the workshop
  - Shop location / address
  - Services
  - References / required reading / canon-style section
  - Contact methods / social links
- Services live within Studio conceptually and should not become a top-level nav item.

## Objects Rules

- Objects is the editorial discovery layer for object-based work.
- Objects should help users understand collections, context, references, locations, and the world around the work.
- Objects is not the canonical detail layer for individual purchasable items.

### Objects Landing Page
- The Objects landing page includes:
  - Title
  - Intro text
  - List of entries

### Entry Types Under Objects
- Collection pages
- Core page
- Commissions page

### Object Detail Rule
- There are no individual object pages under Objects.
- Individual purchasable objects should not have separate editorial detail pages that duplicate Store listings.
- Objects pages may show previews, short descriptions, and context, then link to Store.

### Collections
- Collections are editorial and guidebook-like.
- They can include inspiration, references, place, context, process, and grouped object previews.
- Collections may link to:
  - a filtered Store view for that collection
  - individual Store listings where relevant

### Core
- Core is more direct and less editorially heavy than a Collection.
- Core presents foundational objects with photos, descriptions, and links to Store where available.

### Commissions
- Commissions is broad and example-based.
- It exists to show commissioned work and support future commission inquiries.
- Commissions does not require deep item pages or Store endpoints.

## Store Rules

- Store is the canonical detail and commerce layer for purchasable objects/products.
- Store pages should hold the deep detail needed to evaluate and buy an item.

### Store Landing Page
- Store should allow browsing of all items for sale.
- Sold-out items may still appear.
- Store supports filtering by:
  - type
  - collection

### Product Pages
- Product pages are the canonical endpoint for purchasable objects.
- Product pages should contain the full detail set, including:
  - title
  - photos
  - description
  - product attributes
  - dimensions
  - stock state
  - add to cart
  - optional out-of-stock notify flow

### Duplication Rule
- Do not create a second detailed editorial object page if the Store product page already serves that role.
- Store owns the deep product detail for buyable objects.

## Art Rules

- Art is the canonical presentation layer for artworks.
- Art should list works directly from the Art landing page.
- Art does not need to route through Store by default.

### Art Landing Page
- Includes:
  - intro text about the practice
  - list/grid of works

### Work Pages
- Each work can have its own page under Art.
- Work pages may include:
  - title
  - multiple photos
  - description
  - medium
  - date
  - optional dimensions
  - price
  - status
  - inquiry CTA

### Art Commerce Rule
- One-of-one artworks should live fully under Art.
- Original artworks should not require duplicate Store listings.
- If a work also has related editions, prints, publications, or digital products, those may live in Store and be linked from the work page.

## Image Rules

- Image is a visual-first section.
- Image should use a grid of photos as the main entry experience.
- The primary detail experience is a lightbox, not a full separate page system.

### Photo Set Rule
- Images can be grouped by photo set.
- Clicking an image should allow the user to move through other images from that same photo set.

### Duplication Rule
- Do not overbuild Image into a project-page system unless there is a clear need later.
- For now, grid + lightbox is the intended model.

## General Design / Build Rules

- The site should feel like one authored system with different modes.
- Do not let sections drift into disconnected mini-sites.
- Do not let Store styling feel bolted on or generic.
- Do not let Objects duplicate Store.
- Do not let Art duplicate Store unless there is a strong product reason.
- Keep interactions restrained.
- Keep the system image-led, typographic, and spatial.
