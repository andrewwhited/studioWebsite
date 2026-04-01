# Website Content Model

Working schema for site structure, page models, content objects, and navigation behavior.

This file is intended to:
- act as the current source of truth for site content structure
- guide Claude when generating placeholder or draft content
- help populate a CMS later
- distinguish between page-level models and reusable content objects

## General Rules

### Slugs
Slugs are only needed for individual detail-level entities that get their own URLs.

Use slugs for:
- collections
- products
- art works

Do not explicitly model slugs for:
- homepage
- studio page
- objects page
- image page
- store page
- top-level index pages with fixed routes

Slug rule:
- derived from title
- lowercase
- hyphen-separated
- should remain stable once in use

Example:
- `Roosevelt Studio Chair` -> `roosevelt-studio-chair`

### Navigation behavior
Top-level pages use the global nav and do not need back buttons.

Detail pages should include a clear way back:
- collection page -> back to all collections / Objects
- art work page -> back to Art
- product page -> back to Store

Image should open in a lightbox with a close button rather than using a back button.

### Internal vs visible fields
Some fields are internal and should not surface in the front-end UI by default.

Current internal-only field:
- `collection.type`

---

# Top-Level IA

Top-level navigation:
- Studio
- Objects
- Art
- Image
- Store

---

# Page Models

## Home Page

Purpose:
- establish identity
- introduce the practice briefly
- set visual tone

```yaml
home_page:
  nav:
  hero_image:
  title:
  text:
```

### Field notes
- `nav`: top-level site navigation
- `hero_image`: main image on the homepage
- `title`: should include Andrew's name, e.g. `Andrew Whited` or `Studio Andrew Whited`
- `text`: brief creative intro / practice statement / elevator pitch

---

## Studio Page

Purpose:
- context
- philosophy
- taste
- access

```yaml
studio_page:
  title:

  hero:
    heading:
    text:
    primary_image:
    secondary_image:

  bio:
    name:
    text:
    image:

  location:
    title:
    text:
    address:
    visit_note:
    image:

  services:
    title:
    items:
      - title:
        text:
        image:
    contact:

  required_reading:
    items: []

  whats_playing:
    embed:

  contact:
    title:
    email:
    instagram:
    tiktok:
```

### Section notes

#### `hero`
Top conceptual framing section of the Studio page.
- `heading`: short sentence-style heading
- `text`: supporting text introducing the practice
- `primary_image`: main image for the Studio entry
- `secondary_image`: optional supporting image

#### `bio`
About section focused on Andrew as a person.
- `name`
- `text`: paragraph or short bio
- `image`: portrait or contextual image

#### `location`
Physical grounding section.
- `title`: e.g. `Workshop`
- `text`: short supporting string
- `address`
- `visit_note`: e.g. `Visits by appointment`
- `image`: image of the shop / workshop

#### `services`
Section containing service blocks.
- `title`: section title
- `items`: array of service blocks
- `contact`: service CTA such as `Inquire`

#### `required_reading`
Array of reading items defined below.

#### `whats_playing`
Music embed / playlist section.
- `embed`: Spotify link or embed

#### `contact`
General contact section.
- `title`
- `email`
- `instagram`
- `tiktok`

---

## Objects Page

Purpose:
- top-level index of all collections
- no visible distinction between main collections, core, and commissions on the index page

```yaml
objects_page:
  title:
  tagline:
  collections: []
```

### Field notes
- `title`: likely `Objects`
- `tagline`: short visible supporting line under the title
- `collections`: array of `collection_preview` objects

---

## Art Page

Purpose:
- index page for conceptual / system-driven works

```yaml
art_page:
  title:
  text:
  works: []
```

### Field notes
- `title`
- `text`: short framing text for the Art section
- `works`: array of art works or art work previews depending on implementation

---

## Image Page

Purpose:
- index page for photo sets

```yaml
image_page:
  title:
  text:
  photo_sets: []
```

### Field notes
- `title`
- `text`: optional framing text if needed
- `photo_sets`: array of photo sets

Note: image detail interactions are expected to use a lightbox with a close button.

---

## Store Page

Purpose:
- commerce layer
- supports browsing products across collections and product types

```yaml
store_page:
  title:
  text:

  filters:
    collections: []
    product_types: []

  products: []
```

### Field notes
- `title`
- `text`: short store intro / framing text
- `filters.collections`: available collection filter values
- `filters.product_types`: available product type filter values
- `products`: array of product objects or product previews depending on implementation

---

# Reusable Content Objects

## Required Reading Item

Purpose:
- lightweight taste / reference object for Studio

```yaml
reading_item:
  title:
  creator:
  type:
  link:
  thumbnail:
  note:
```

### Field notes
- `title`
- `creator`: author / director / artist / creator
- `type`: keep within this set:
  - `book`
  - `film`
  - `essay`
  - `video`
  - `artist`
- `link`: external link
- `thumbnail`: optional
- `note`: optional

---

## Photo Set

Purpose:
- minimal image-first grouping for the Image section

```yaml
photo_set:
  cover_image:
  images: []
  location:
  year:
```

### Field notes
- `cover_image`: selected lead image for the set
- `images`: ordered sequence of images
- `location`: required
- `year`: required

Notes:
- no title field
- no description field
- no people metadata
- no camera field
- image order matters

---

## Service

Purpose:
- block used in the Studio services section

```yaml
service:
  title:
  text:
  image:
```

### Field notes
- `title`: name of the service
- `text`: concise explanation of the service
- `image`: image representing the service

---

## Collection Preview

Purpose:
- card / list object used on the Objects page before clicking into a full collection page

```yaml
collection_preview:
  title:
  image:
  year:
  short_text:
```

### Field notes
- `title`
- `image`: preview image / cover image
- `year`
- `short_text`: short framing text for preview contexts

---

## Collection Page / Collection Object

Purpose:
- editorial collection page built around a trip or location
- combines context, imagery, object previews, formal object listings, and companion material

This schema represents the full collection object and page structure together.

```yaml
collection:
  title:
  slug:

  type:

  hero:
    image:
    title:
    text:
    year:
    location:

  featured_photos:
    images: []

  editorial:
    blocks: []

  objects:
    items: []

  companion:
    playlist:
    hit_list: []

  shop_collection_link:
```

### Field notes

#### Top-level fields
- `title`
- `slug`
- `type`: internal only. Used for organization, not front-end display.

Allowed internal values for `type`:
- `main`
- `core`
- `commission`

#### `hero`
Top section of the collection page.
- `image`: hero image
- `title`: collection title
- `text`: short top-level text / intro
- `year`: required
- `location`: required

#### `featured_photos`
Early visual payoff near the top of the page.
- `images`: selected photos shown before the longer editorial section

#### `editorial`
Most flexible section of the collection page.
- `blocks`: flexible mixed-content area for
  - trip context
  - where Andrew went
  - what he saw
  - historical context
  - references
  - process
  - influence
  - supporting images

This is intentionally the loosest / most flexible section in the schema.

#### `objects`
Formal object list for the collection.
- `items`: array of collection objects defined below

These objects may have already appeared visually or been hinted at earlier in the page, but this section is the formal listing.

#### `companion`
Closing contextual / atmospheric section.
- `playlist`: playlist link
- `hit_list`: array of hit list items

#### `shop_collection_link`
Link to the Store filtered to this collection.
- intended as a collection-level commerce CTA

---

## Collection Object (within a collection page)

Purpose:
- formal object listing within a collection page

```yaml
object:
  name:
  image:
  description:
  product_link:
```

### Field notes
- `name`
- `image`
- `description`
- `product_link`: link to the corresponding product listing in the Store

---

## Hit List Item

Purpose:
- item in a collection page's companion section

```yaml
hit_list_item:
  name:
  note:
  link:
```

### Field notes
- `name`
- `note`: short note about why it matters
- `link`: external link

---

## Art Work

Purpose:
- individual art work entry with a light commerce layer

```yaml
art_work:
  title:
  slug:

  primary_image:
  images: []

  year:
  materials:
  dimensions:

  text:

  status:
  price:
```

### Field notes
- `title`
- `slug`
- `primary_image`
- `images`: supporting images
- `year`
- `materials`
- `dimensions`
- `text`: artwork description / framing text

#### `status`
Allowed values:
- `private` — in personal/private collection, not for sale. No price shown, no inquiry.
- `available` — for sale. Shows inquiry button. Price field visible.

Rules:
- `private`: no price, no inquiry
- `available`: if price is set, display it with an inquiry button. If price is empty, show "Price on request" with an inquiry button. Inquiry goes to studio email.

---

## Art Work Preview

Purpose:
- art listing surface before clicking into the full work

```yaml
art_work_preview:
  title:
  image:
  year:
```

### Field notes
- `title`
- `image`
- `year`

---

## Product

Purpose:
- sellable item in the Store

```yaml
product:
  title:
  slug:

  primary_image:
  images: []

  price:
  status:

  text:

  collection:
  product_type:

  materials:
  dimensions:

  shipping_note:
  local_pickup_available:
```

### Field notes
- `title`
- `slug`
- `primary_image`
- `images`: additional product images
- `price`
- `status`: allowed values:
  - `available`
  - `sold_out`
- `text`: product description
- `collection`: collection association for browsing and filtering
- `product_type`: secondary browse/filter dimension
- `materials`: required
- `dimensions`: required
- `shipping_note`: e.g. `Shipping calculated at checkout`
- `local_pickup_available`: boolean or pickup availability flag

Notes:
- no explicit linked object field
- if needed, a product can reference its collection context in the description with a link to the editorial collection view
- care notes can live inside `text` for now

---

## Product Preview

Purpose:
- store listing surface before clicking into the full product page

```yaml
product_preview:
  title:
  image:
  price:
  status:
```

### Field notes
- `title`
- `image`
- `price`
- `status`

---

# Summary of Relationships

## Studio page uses
- `service`
- `reading_item`

## Objects page uses
- `collection_preview`

## Collection page uses
- collection hero fields
- `featured_photos`
- flexible editorial blocks
- `object`
- `hit_list_item`
- collection-level shop link

## Art page uses
- `art_work` and/or `art_work_preview`

## Image page uses
- `photo_set`

## Store page uses
- `product` and/or `product_preview`

---

# Notes on Intent and Positioning

## Collections
Collections are editorial and place/time-driven. They are not just folders for objects.

A collection page should be built around:
- a trip or a location
- what Andrew saw
- contextual and historical influence
- process
- end results

The work should appear early in the page via featured photos so visitors do not have to scroll too far before seeing results.

## Studio
Studio is more than About. It is the context / taste / access layer.

## Image
The Image section is deliberately minimal and image-led.

## Store
Store is the commerce layer. It should stay cleaner and simpler than Collections.

## Art
Art has a commerce layer but should still feel like work first, product second.

---

# Optional Next Step

Once this schema is stable, create a second file such as:
- `content-inventory.md`

That file can track:
- real entries
- placeholder entries
- missing entries
- notes for copy development
- CMS population status
