# Website Content Model

Reference schema for site content structure. Sanity CMS and Shopify are the live implementations — this document captures the intended shape and purpose of each content type.

## General Rules

### Slugs
Slugs are only needed for detail-level entities with their own URLs (collections, products, art works). Top-level index pages use fixed routes.

Slug rule: derived from title, lowercase, hyphen-separated, stable once in use.

### Navigation behavior
Top-level pages use the global nav and do not need back buttons. Detail pages should include a clear way back. Image opens in a lightbox with a close button.

### Internal vs visible fields
`collection.type` is internal only — not surfaced in front-end UI.

---

# Page Models

## Home Page
Establish identity, introduce the practice, set visual tone.

```yaml
home_page:
  hero_image:
  title:
  text:
```

---

## Studio Page
Context, philosophy, taste, access.

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

---

## Objects Page
Top-level index of all collections. No visible distinction between main collections, core, and commissions on the index page.

```yaml
objects_page:
  title:
  tagline:
  collections: []
```

---

## Art Page
Index page for conceptual and system-driven works.

```yaml
art_page:
  title:
  text:
  works: []
```

---

## Image Page
Index page for photo sets. Detail interactions use a lightbox.

```yaml
image_page:
  title:
  text:
  photo_sets: []
```

---

## Store Page
Commerce layer. Supports browsing products across collections and product types. Products sourced from Shopify.

```yaml
store_page:
  title:
  text:
  filters:
    collections: []
    product_types: []
  products: []
```

---

# Reusable Content Objects

## Reading Item
Lightweight taste/reference object for Studio's required reading section.

```yaml
reading_item:
  title:
  creator:
  type: # book | film | essay | video | artist
  link:
  thumbnail:
  note:
```

---

## Photo Set
Minimal image-first grouping for the Image section. No title, no description, no camera metadata. Image order matters.

```yaml
photo_set:
  cover_image:
  images: []
  location:
  year:
```

---

## Service
Block used in the Studio services section.

```yaml
service:
  title:
  text:
  image:
```

---

## Collection Preview
Card/list surface on the Objects page before clicking into a full collection.

```yaml
collection_preview:
  title:
  image:
  year:
  short_text:
```

---

## Collection
Editorial collection page built around a trip or location. Combines context, imagery, object previews, formal object listings, and companion material.

`type` is internal only (main / core / commission) — used for organization, not display.

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
    blocks: [] # flexible mixed content
  objects:
    items: []
  companion:
    playlist:
    hit_list: []
  shop_collection_link:
```

---

## Collection Object
Formal object listing within a collection page. Links to the corresponding Store product.

```yaml
object:
  name:
  image:
  description:
  product_link:
```

---

## Hit List Item
Item in a collection's companion section.

```yaml
hit_list_item:
  name:
  note:
  link:
```

---

## Art Work
Individual art work with a light commerce layer. Status determines display: `private` shows no price or inquiry; `available` shows price (or "Price on request") with an inquiry button.

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
  status: # private | available
  price:
```

---

## Art Work Preview
Projected view of an artwork on the Art landing page.

```yaml
art_work_preview:
  title:
  image:
  year:
```

---

## Product
Sellable item in the Store. Sourced from Shopify (including materials and dimensions via metafields).

```yaml
product:
  title:
  slug:
  primary_image:
  images: []
  price:
  status: # available | sold_out
  text:
  collection:
  product_type:
  materials:
  dimensions:
  shipping_note:
  local_pickup_available:
```

---

## Product Preview
Store listing surface before clicking into the full product page.

```yaml
product_preview:
  title:
  image:
  price:
  status:
```

---

# Relationships

- **Studio** uses `service`, `reading_item`
- **Objects** uses `collection_preview`
- **Collection** uses `featured_photos`, editorial blocks, `object`, `hit_list_item`, shop collection link
- **Art** uses `art_work` / `art_work_preview`
- **Image** uses `photo_set`
- **Store** uses `product` / `product_preview`
