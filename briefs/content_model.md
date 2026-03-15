# Andrew Whited — Content Model

## Working Note
This content model is a working draft and may evolve as page designs become more concrete. It is intended to establish the initial content structure, ownership, and relationships for the site, not to permanently lock every field.

The goal is to give the build enough structure to stay coherent without overengineering too early.

---

## Model Overview

### Editorial Content Types
- StudioPage
- CollectionPage
- CorePage
- CommissionsPage
- WorkPage
- ImagePage
- PhotoSet

### Commerce Content Types
- Product
- ProductType

---

## Editorial Content Types

## StudioPage
**Type**
- Single page

**Purpose**
- Introduce Andrew Whited, the studio, the workshop, available services, references, and contact paths.

**Fields**
- title
- heroImage
- intro
- aboutPractice
- aboutWorkshop
- shopLocation
- servicesIntro
- servicesList
- referencesIntro
- referencesList
- contactMethods
- socialLinks

**Required**
- title
- heroImage
- aboutPractice

**Optional**
- intro
- shopLocation
- servicesIntro
- referencesIntro
- referencesList
- contactMethods
- socialLinks

**Structured Fields**
- servicesList
  - title
  - description
  - inquiryMethod or inquiryCTA

**Flexible Fields**
- referencesList
  - currently flexible / may evolve later
  - can begin as rich text or loose list entries
  - may later become more structured if needed

---

## CollectionPage
**Type**
- Repeatable

**Purpose**
- Editorial page under Objects for a named body of object work.

**Fields**
- title
- slug
- intro
- heroImage
- galleryImages
- conceptText
- references
- locationContext
- processImages
- objectPreviews
- relatedProducts
- storeCollectionHandle
- sortOrder

**Required**
- title
- slug
- intro
- heroImage

**Optional**
- galleryImages
- conceptText
- references
- locationContext
- processImages
- objectPreviews
- relatedProducts
- storeCollectionHandle
- sortOrder

**Field Notes**
- objectPreviews should remain simple and should not become a full standalone editorial object model.
- relatedProducts may reference Shopify products directly.
- storeCollectionHandle can map the page to a filtered Store view when useful.

**Relationships**
- lives under Objects
- may link to many Products
- may map to a Store collection view

---

## CorePage
**Type**
- Single page or special entry under Objects

**Purpose**
- Present foundational objects in a more direct, less editorially heavy format than a Collection.

**Fields**
- title
- slug
- intro
- objectPreviews
- relatedProducts
- sortOrder

**Required**
- title
- slug
- intro

**Optional**
- objectPreviews
- relatedProducts
- sortOrder

**Field Notes**
- objectPreviews remain lightweight.
- relatedProducts may point directly to Store listings.

**Relationships**
- lives under Objects
- may link to many Products

---

## CommissionsPage
**Type**
- Single page or special entry under Objects

**Purpose**
- Show commissioned work broadly and support future commission inquiries.

**Fields**
- title
- slug
- intro
- examples
- inquiryText
- inquiryMethod
- sortOrder

**Required**
- title
- slug
- intro

**Optional**
- examples
- inquiryText
- inquiryMethod
- sortOrder

**Field Notes**
- examples should remain simple and broad.
- this page is not intended to become a full catalog or a set of deep item pages.

**Relationships**
- lives under Objects
- relates conceptually to Studio / services
- does not require Store endpoints for every example

---

## WorkPage
**Type**
- Repeatable

**Purpose**
- Canonical page for an individual artwork under Art.

**Fields**
- title
- slug
- images
- description
- medium
- date
- dimensions
- price
- status
- inquiryMethod
- relatedProducts
- sortOrder

**Required**
- title
- slug
- images
- medium
- date

**Optional**
- description
- dimensions
- price
- status
- inquiryMethod
- relatedProducts
- sortOrder

**Field Notes**
- relatedProducts should only be used when editions, prints, publications, or digital products exist in Store.
- original one-of-one works do not require duplicate Store listings.

**Relationships**
- lives under Art
- may link to Products when related editions/products exist

---

## ImagePage
**Type**
- Single page

**Purpose**
- Landing page for image work.

**Fields**
- title
- intro
- featuredPhotoSets

**Required**
- title

**Optional**
- intro
- featuredPhotoSets

**Relationships**
- parent for PhotoSets conceptually
- functions as the landing page for Image

---

## PhotoSet
**Type**
- Repeatable

**Purpose**
- Group related images for the grid and lightbox experience.

**Fields**
- title
- slug
- images
- coverImage
- location
- date
- sortOrder

**Required**
- images
- coverImage

**Optional**
- title
- slug
- location
- date
- sortOrder

**Field Notes**
- PhotoSet is currently meant to support grid + lightbox behavior.
- This model may evolve later if image pages become more detailed.

**Relationships**
- lives under Image

---

## Commerce Content Types

## Product
**Type**
- Shopify-owned

**Purpose**
- Canonical purchasable item in the Store.

**Fields**
- title
- handle
- photos
- description
- price
- productType
- collection
- dimensions
- material
- attributes
- stockStatus
- notifyWhenOutOfStock
- variants
- addToCartEnabled

**Required**
- title
- handle
- photos
- description
- price
- productType

**Optional**
- collection
- dimensions
- material
- attributes
- stockStatus
- notifyWhenOutOfStock
- variants
- addToCartEnabled

**Field Notes**
- Product is the canonical detail page for purchasable objects.
- Store product pages should hold full detail, including photos, specs, dimensions, and transaction state.
- Product may need to support sold-out status while remaining visible.

**Relationships**
- lives under Store
- may belong to a Collection
- may be linked from CollectionPage, CorePage, or WorkPage

---

## ProductType
**Type**
- Controlled vocabulary / taxonomy

**Purpose**
- Support filtering and categorization in Store.

**Examples**
- chair
- light
- print
- digital file
- table
- sculpture

**Field Notes**
- This is primarily a filter / classification layer rather than a standalone page type.

---

## Preview / Example Block Guidance

### objectPreviews
Used in:
- CollectionPage
- CorePage

These should remain lightweight and may include:
- title
- image
- short description
- optional relatedProduct link

They should not become full editorial object pages.

### examples
Used in:
- CommissionsPage

These should remain broad and may include:
- title
- image
- short description

They are intended to show range and precedent, not create deep item detail pages.

---

## Ownership / Canonical Endpoint Rules

### Objects
- editorial discovery layer
- uses CollectionPage, CorePage, and CommissionsPage
- does not own deep individual object detail pages

### Store
- canonical detail and commerce layer for purchasable objects
- Product is the endpoint for object detail, evaluation, and purchase

### Art
- canonical presentation layer for artworks
- WorkPage is the endpoint for one-of-one artworks unless related products also exist

### Image
- visual gallery layer
- PhotoSet supports grouped image browsing through grid + lightbox

---

## Future Flexibility
This model may evolve as the site design develops.

Likely areas of future refinement:
- references becoming more structured
- more metadata for PhotoSets
- expanded service modeling
- clearer Shopify/editorial mapping fields
- richer taxonomy for collections, product types, or statuses

The model should stay useful and flexible rather than prematurely exhaustive.
