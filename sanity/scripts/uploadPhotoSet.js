// Upload a folder of images as a single photoSet document.
//
// The folder is the set: its files, sorted numerically by filename, become the
// `images` array in that order. The content model calls image order meaningful
// (Structure/content_model.md), so filename order is the editorial order and
// nothing here reorders it.
//
// Document IDs are left for Sanity to generate. Two reasons, both learned the
// hard way: an `_id` containing a period is treated as private and is
// unreadable without credentials, which silently hides the set from the site;
// and a readable `_id` derived from the folder name would put sitters' names in
// a publicly queryable dataset, which the no-titles decision exists to avoid.
//
// Note that asset `originalFilename` is also public — hence numeric filenames.
//
// Run: npx sanity exec scripts/uploadPhotoSet.js --with-user-token
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

// ─── The set being uploaded ────────────────────────────────────────────
const SET = {
  dir: '/Users/andrewwhited/Desktop/shoots/lovers2',
  location: 'Austin, TX',
  year: '2026',
  category: 'people', // 'people' | 'places' — drives the Image page filter
  cover: '1.jpg',
  publish: true, // false lands it as a draft to review before going live
}

const CATEGORIES = ['people', 'places']

const IMAGE_RE = /\.(jpe?g|png|tiff?)$/i

// Numeric-aware sort so 10.jpg follows 9.jpg rather than 1.jpg.
const byNumericName = (a, b) =>
  a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'})

const files = fs
  .readdirSync(SET.dir)
  .filter((name) => IMAGE_RE.test(name))
  .sort(byNumericName)

if (files.length === 0) throw new Error(`No images found in ${SET.dir}`)
if (!files.includes(SET.cover)) throw new Error(`Cover "${SET.cover}" not in ${SET.dir}`)
if (!CATEGORIES.includes(SET.category)) {
  throw new Error(`category must be one of ${CATEGORIES.join(' | ')}, got "${SET.category}"`)
}

console.log(`Uploading ${files.length} images from ${path.basename(SET.dir)}:`)

// Promise.all preserves input order in its results regardless of which upload
// finishes first, so the sorted order survives the concurrency.
Promise.all(
  files.map((name) =>
    client.assets
      .upload('image', fs.createReadStream(path.join(SET.dir, name)), {filename: name})
      .then((asset) => {
        console.log(`  ${name} → ${asset._id}`)
        return {name, assetId: asset._id}
      }),
  ),
)
  .then((uploaded) => {
    const coverRef = uploaded.find((u) => u.name === SET.cover).assetId

    // Guard on the cover's asset ID rather than on a document ID. Sanity
    // derives asset IDs from a content hash, so re-running this on the same
    // folder resolves to the same ref — which catches a duplicate upload even
    // if the folder was renamed in between.
    return client
      .fetch(`*[_type == "photoSet" && coverImage.asset._ref == $coverRef][0]{_id}`, {coverRef})
      .then((existing) => {
        if (existing) {
          throw new Error(
            `A photoSet already uses this cover: ${existing._id}. ` +
              `Delete it in the Studio first if you mean to replace it.`,
          )
        }

        const doc = {
          _type: 'photoSet',
          location: SET.location,
          year: SET.year,
          category: SET.category,
          coverImage: {_type: 'image', asset: {_type: 'reference', _ref: coverRef}},
          images: uploaded.map((u, i) => ({
            _type: 'image',
            _key: `img${i + 1}`,
            asset: {_type: 'reference', _ref: u.assetId},
          })),
        }

        // No _id: Sanity generates an opaque one. Prefixing with `drafts.`
        // is the documented way to land it unpublished.
        return client.create(SET.publish ? doc : {...doc, _id: `drafts.${client.newDocumentId()}`})
      })
  })
  .then((doc) => {
    console.log(`\nCreated ${SET.publish ? 'published' : 'draft'} ${doc._id}`)
    console.log(`${doc.images.length} images, cover ${SET.cover}. Set the hotspot in the Studio.`)
  })
  .catch((err) => {
    console.error('Failed:', err.message)
    process.exit(1)
  })
