/* Two edits to "Embodied Authorship":
 *
 * 1. Caption and alt text for the topology figure (f131).
 * 2. A footnote on "Now it's one prompt away." — the essay's own claim,
 *    qualified by what the image above it actually took to make. Splits the
 *    paragraph's single span into two so the mark has something to attach to;
 *    the text is byte-identical to what was there.
 *
 * Numbering is positional, so this lands as footnote 8.
 *
 *   npx sanity exec scripts/topology-figure-and-footnote.js --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})
const ID = 'thought-embodied-authorship'

const HEAD =
  'Despite the rules of topology, drinking from a mug is nothing like drinking through a straw. The experience is entirely different, and of course our experience of AI is different too. But the experience changed, not the authorship. What changed is how cheap the handoff has become. The deciding used to be hard to give away. You had to build a workshop first. '
const TAIL = 'Now it’s one prompt away.'

client
  .patch(ID)
  .set({
    'body[_key=="f131"].caption': 'Phases of a mug morphing into a straw.',
    'body[_key=="f131"].alt':
      'Six panels showing a coffee mug deformed step by step into a drinking straw: the mug squashes, its handle-hole widens into a torus, the torus opens into a short cylinder, the cylinder stretches, and the last panel is a thin straw. The single hole persists through every stage.',

    'body[_key=="p146"].body[_key=="b144"].children': [
      {_type: 'span', _key: 'b144s1', text: HEAD, marks: []},
      {_type: 'span', _key: 'b144s2', text: TAIL, marks: ['fn8']},
    ],
    'body[_key=="p146"].body[_key=="b144"].markDefs': [
      {
        _type: 'footnote',
        _key: 'fn8',
        text: 'In the case of the image above, several prompts away. I sketched in my notebook, modeled in Fusion, animated with AI, and then went to town on the captures in Photoshop.',
      },
    ],
  })
  .unset(['body[_key=="f131"].placeholderLabel'])
  .commit()
  .then(() => console.log('patched', ID))
  .catch((err) => {
    console.error('FAILED:', err.message)
    process.exit(1)
  })
