# Andrew Whited — Website Information Architecture

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
**Purpose**
- Introduce Andrew Whited, the studio, the workshop, available services, and the broader context around the practice.

**Content**
- Title
- Hero image
- About me / practice
- About the workshop
- Shop location / address
- List of services
- Required reading / references / canon-style section
- Contact methods
- Social links

**Key actions**
- Learn about Andrew and the studio
- Explore services
- Get in touch
- Visit social links

**Structure note**
- Studio is a single page with sections, not a set of child pages.
- Services may later link outward to inquiry pages or actions, but they live within Studio conceptually.

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

