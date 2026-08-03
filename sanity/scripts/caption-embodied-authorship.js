/* Captions and alt text for "Embodied Authorship".
 *
 * Touches only alt/caption on the figures, plus clears placeholderLabel left
 * over from the import on figures that now carry real images. No body text,
 * no structure, no other fields.
 *
 * Captions are Andrew's wording. Alt text describes what each image shows for
 * a reader who can't see it — deliberately different from the caption rather
 * than a repeat of it.
 *
 *   npx sanity exec scripts/caption-embodied-authorship.js --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})
const ID = 'thought-embodied-authorship'

const single = {
  f5: {
    alt: "Two dozen LinkedIn posts overlapping in a collage, every one a version of the same sentence: AI won't replace you, but someone using AI will. Only the profession changes.",
    caption: 'Same sentence, different profession.',
  },
  f33: {
    alt: 'Three black-and-white photographs: a draftsman leaning over a drawing board with pencil and straightedge; a man drawing on the screen of an IBM DAC-1 with a light pen; computer-generated machine parts, several optimised into forms no hand would draw.',
    caption: 'Drafting by hand, early CAD, generative based design.',
  },
  f75: {
    alt: 'A Google Images results page for "pendulum painting tutorial", filled with rows of near-identical spiral canvases and DIY video thumbnails.',
    caption: 'Page one of the results.',
  },
  f99: {
    alt: "Rubens's Prometheus Bound: Prometheus chained on his back, an eagle with outstretched wings tearing at his liver.",
    caption: 'Peter Paul Rubens, Prometheus Bound, 1611–18. The eagle, by Frans Snyders.',
  },
  f119: {
    alt: 'A 19th-century engraving of the 1735 Zenger trial: Andrew Hamilton standing to address three robed judges before a packed courtroom.',
    caption: 'The trial of John Peter Zenger for seditious libel, 1735.',
  },
}

const flows = {
  '8aa772b876ff': [
    {
      alt: "Jackson Pollock's Number 1 (Lavender Mist): the canvas covered edge to edge in skeins of poured and flung paint.",
      caption: 'Jackson Pollock, Number 1 (Lavender Mist), 1950.',
    },
    {
      alt: "Morris Louis's Where: broad translucent bands of thinned colour poured down the canvas, fanning apart against bare ground.",
      caption: 'Morris Louis, Where, 1960.',
    },
  ],
  '0be9006d59d9': [
    {
      alt: 'Top-down detail of a Braun SK 61: the wordmark, three grey dials marked Klangfarbe, Balance and Lautstärke, a printed tuning scale, a row of square push buttons.',
      caption: 'Braun SK 61, designed under Dieter Rams.',
    },
    {
      alt: 'The underside of an Apple laptop, blank grey aluminium except for "Designed by Apple in California" in small type.',
      caption: 'The same claim, on the machine itself.',
    },
  ],
  ba6f6f27ae7c: [
    {
      alt: 'Donald Judd\'s 1963 pencil drawing of a stepped, saw-toothed form in perspective, signed "DJ 63" — a working drawing for fabrication.',
      caption: 'Donald Judd, Untitled, 1963. The drawing he sent to the shop.',
    },
    {
      alt: "Sol LeWitt's Wall Drawing #260 installed across a long gallery wall: white lines, arcs and grids over black, running the length of the room.",
      caption: 'Sol LeWitt, Wall Drawing #260, 1975. The wall, drawn by other hands.',
    },
  ],
}

const set = {}
const unset = []

for (const [key, v] of Object.entries(single)) {
  set[`body[_key=="${key}"].alt`] = v.alt
  set[`body[_key=="${key}"].caption`] = v.caption
  // Left over from the import; the figure has a real image now.
  unset.push(`body[_key=="${key}"].placeholderLabel`)
}

for (const [key, imgs] of Object.entries(flows)) {
  imgs.forEach((v, i) => {
    set[`body[_key=="${key}"].images[${i}].alt`] = v.alt
    set[`body[_key=="${key}"].images[${i}].caption`] = v.caption
  })
  // The group caption held both frames' text joined by a newline — a
  // workaround for the per-frame field that now exists.
  unset.push(`body[_key=="${key}"].caption`)
}

client
  .patch(ID)
  .set(set)
  .unset(unset)
  .commit()
  .then(() => {
    console.log(`patched ${ID}`)
    console.log(`  set:   ${Object.keys(set).length} fields`)
    console.log(`  unset: ${unset.length} fields`)
  })
  .catch((err) => {
    console.error('FAILED:', err.message)
    process.exit(1)
  })
