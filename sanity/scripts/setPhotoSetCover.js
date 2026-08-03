// Point a photoSet's coverImage at a specific frame already in its `images`
// array, by that frame's original filename.
//
// Written for the two Seattle sets, whose frames are mostly landscape 3:2. The
// grid tile is 6:7, so a landscape cover loses most of its width — that is the
// intended result here, with the hotspot deciding what survives.
//
// Run: npx sanity exec scripts/setPhotoSetCover.js --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

// [documentId, filename of the frame to use as cover]
const TARGETS = [
  ['U5jaPewV4O7tyQ9PafqBg1', '1.jpg'], // BJ
  ['U5jaPewV4O7tyQ9PafqKME', '1.jpg'], // bj2
]

Promise.all(
  TARGETS.map(([id, filename]) =>
    client
      .fetch(`*[_id == $id][0]{ images[]{ "ref": asset._ref, "name": asset->originalFilename } }`, {
        id,
      })
      .then((doc) => {
        if (!doc) throw new Error(`${id} not found`)

        const match = (doc.images ?? []).find((img) => img.name === filename)
        if (!match) {
          throw new Error(
            `${id}: no frame named ${filename}. Has: ${(doc.images ?? [])
              .map((i) => i.name)
              .join(', ')}`,
          )
        }

        // Replacing the whole coverImage object rather than patching the asset
        // ref, so any hotspot set against the previous cover is dropped instead
        // of being silently reapplied to a differently-framed image.
        return client
          .patch(id)
          .set({
            coverImage: {_type: 'image', asset: {_type: 'reference', _ref: match.ref}},
          })
          .commit()
          .then(() => console.log(`${id} → cover ${filename} (${match.ref})`))
      }),
  ),
)
  .then(() => console.log('\nDone. Set the hotspot on both in the Studio.'))
  .catch((err) => {
    console.error('Failed:', err.message)
    process.exit(1)
  })
