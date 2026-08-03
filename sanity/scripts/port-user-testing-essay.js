// Phase 2 of the 2016 essay port: uploads the rendered PNGs and rebuilds
// `thought-user-testing` on the editorial template.
//
// The original laid image beside text in alternating split panels. That is a
// layout the essay template has no block for, and adding one would fight what
// the template is — a single reading measure with notes hanging in the right
// margin. So each split flattens to heading, prose, figure, and the piece
// reads down the column instead of across the panels.
//
// Run after render-user-testing-assets.mjs, pointing at its output:
//   npx sanity exec scripts/port-user-testing-essay.js --with-user-token -- <asset-dir>

import {readFileSync} from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const ASSETS = process.argv[process.argv.length - 1]
const DOC = 'thought-user-testing'

// Alt text approved 2026-08-02. Keyed by the rendered filename.
const ALT = {
  '1.png':
    'A loose pile of hand-drawn interface screens and wireframes, overlapping at angles, on a flat green ground.',
  '3.png': 'A hand-drawn question mark in white, outlined in green, alone on black.',
  '4.png':
    'A hand-drawn pennant flag lettered "USERS!" in white, flying on a black pole against green.',
  '5.png':
    'A hand-drawn swatch card labelled "Blue 1" and "Blue 2" with a green pointer resting on it, on black.',
  '6.png': 'A hand-drawn plank balanced on a small fulcrum, tipping slightly, on green.',
  '7.png':
    'A hexagon diagram: Conscious Level at the top, Intellectual and Emotional beneath it, Preconscious Level at the centre, Inductive and Intuitive below, Unconscious Level at the base. Arrows run between them.',
  '8.png':
    'Several hand-drawn paths looping and crossing, most ending in an X, one ending in a check mark, on green.',
  '9.png':
    'A hand-drawn signpost with green arrow signs pointing in different directions, on light grey.',
  '10.png':
    'The words "Absolute Beauty" set eleven times down the frame, each in a different typeface — blackletter at the top through to a bold sans at the bottom.',
  '11.png':
    'A hand-lettered equation in green on black: X equals a, b, c, d and so on over A, B, C, D and so on.',
  '12.png':
    'A dashed rectangle and a solid drawn rectangle overlapping, slightly out of register, on green.',
  '13.png': 'A single user icon drawn in green with a dashed outline around it, on black.',
  'call-screen-beta4-beta5.png':
    'Two iPhone call screens side by side. On the left, iOS 7 beta 4: mute, keypad and speaker as bare icons over a dark blurred background. On the right, beta 5: the same controls now ringed in circle outlines, with a brighter red End bar.',
}

let keySeq = 0
const key = () => `ut${(keySeq += 1).toString().padStart(3, '0')}`

/* ----- Block builders ----- */

const heading = (title) => ({_type: 'essayHeading', _key: key(), title})

// Plain strings in, Portable Text out. The 2016 copy carries no links,
// footnotes, or inline marks, so there is nothing to preserve beyond the
// paragraph breaks.
const prose = (...paragraphs) => ({
  _type: 'essayProseBlock',
  _key: key(),
  body: paragraphs.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  })),
})

const pullQuote = (text) => ({_type: 'pullQuote', _key: key(), text})

const epigraph = (text, attribution) => ({
  _type: 'epigraph',
  _key: key(),
  text,
  attribution,
})

const figure = (assets, file, {width = 'measure', caption} = {}) => ({
  _type: 'figure',
  _key: key(),
  image: {_type: 'image', asset: {_type: 'reference', _ref: assets[file]}},
  alt: ALT[file],
  width,
  fullWidth: width === 'bleed',
  ...(caption && {caption}),
})

/* ----- The piece ----- */

function buildBody(a) {
  const f = (file, opts) => figure(a, file, opts)

  return [
    heading('An example'),
    prose(
      'When iOS 7 went into beta, I closely followed the evolution of the design as it moved through releases. I endured the crashes and glitches because it felt like being in the passenger seat of the product team as they worked out their design details.',
      'The part I was most interested in was the call screen. Just a few icons, a plain red bar to end a call, some text. No fuss. Simple.',
      'Then something changed between beta 4 and beta 5. They redid the call screen. The icons now had circle outlines and the end call bar was changed.',
    ),
    f('call-screen-beta4-beta5.png', {caption: 'iOS call screen — beta 4 and beta 5'}),

    heading('Why?'),
    prose(
      'I irrationally disliked this change. The reason, I found out, was user testing — people didn’t know they could tap the icons. I found it hard to believe that someone wanting to mute a call wouldn’t think to tap the thing that says “mute.” This was not a satisfying answer.',
      'I remember thinking Apple had missed an opportunity to push their customers. Millions of people were going to use this interface. Even if it took an extra second the first time, they would have it by the second. It would be normal by the third.',
      'My take was overdramatic. I’ve since come to like the call screen and watched it evolve well. But my reaction raised questions I’ve kept thinking about: what role should user testing play, and what responsibility do we have to improve users’ visual literacy?',
    ),
    f('3.png'),

    pullQuote(
      'What role does user testing play in the design practice, and what is our responsibility to improve our users’ visual literacy?',
    ),

    heading('The user is always right…'),
    prose(
      'At IBM, user research was a pillar of how we worked. For decades the company had built products disconnected from the people using them — and the results were visible. The “user first” reset was serious and necessary.',
      'I was not the user of the products I designed. I relied on research to understand whether showing REST resources a certain way mapped to how engineers actually thought, how often someone needed to add an on-premise network connection, how many Salesforce objects they expected to sync. These are not questions a designer can answer from instinct.',
      'I didn’t learn how to design an API creation tool in design school. I learned how to listen to users. I don’t want to understate how much that’s worth.',
    ),
    f('4.png'),

    heading('…except when they aren’t'),
    prose(
      'But I don’t want to see a world where the designer becomes a middleman. It’s easy to take “user first” and extrapolate it into A/B testing every design decision.',
      'The role of the designer has evolved. In the craft era, the tool was the hand. Computers brought machined precision. Now that algorithms can generate infinite variations, the designer risks becoming only a curator — or worse, delegating choices to the user directly. What color blue does the user prefer? The designer becomes a facilitator serving up whatever the user says they want.',
      'But users are often wrong. I was wrong about iOS 7. Think about how loudly people complained every time Facebook changed its layout — and how little anyone would want to go back to 2007. Testing is one tool in the repertoire. It shouldn’t be all of them.',
    ),
    f('5.png'),

    f('6.png', {width: 'bleed'}),

    heading('Finding balance'),
    prose(
      'Where is the balance? I think it lies in understanding what kind of decision you’re making. In Allen Hurlburt’s “The Design Concept,” he diagrams the creative process as moving between analytical and intuitive thinking. I find the distinction useful.',
      'Analytical decisions have objective answers: does this solve the actual problem? Do people understand it? Does it work? Users are essential here. But good products aren’t built on analytical decisions alone. We cannot neglect the intuitive side of the creative process.',
    ),
    f('7.png'),

    heading('Teachers of what?'),
    prose(
      'There are decisions we should not delegate to our users. Through experience, practice, and deep familiarity with the materials, designers can go beyond what users expect — or can imagine.',
      'The fact that designers have expertise implies there will be times we decide things the user would not have chosen. That’s not a failure of the process. That’s the process working.',
      'When we expose users to design over time, we shape their expectations. Designers develop users’ visual literacy. We have a responsibility to progress it, not simply reflect it.',
    ),
    f('8.png'),

    epigraph(
      'Even if it is true that the average man seems most comfortable with the commonplace and familiar, it is equally true that catering to bad taste… merely perpetuates the mediocrity and denies the reader one of the most easily accessible means for aesthetic development and eventual enjoyment.',
      'Paul Rand',
    ),
    prose(
      'Rand believed in “aesthetic development” — designers as agents who expand what their audience is capable of appreciating. When we push past the familiar, we change visual literacy. Our aesthetics have always changed over time. The question is whether that change is drift or progression. Progression implies a destination.',
    ),
    f('9.png'),

    heading('Where are we going?'),
    prose(
      'Type design makes this visible. The way we draw letters has changed radically across time and culture. We can barely read blackletter; a medieval reader would struggle with Helvetica. It’s not only time — subcultures develop lettering in completely different directions simultaneously.',
      'This is why I don’t believe in absolute beauty — no golden standard a design can be held against independent of its context. Rand is right that there is aesthetic development. But I don’t think it moves toward a fixed point in the visual or concrete.',
      'The ideal design decision is highly dependent on its variables. We are not working with simple equations — we deal with complex landscapes of unique users. Time is a variable. Location. Age. Industry. Prior experience. These equations ask us to solve for the whole alphabet.',
    ),
    f('10.png'),

    f('11.png', {width: 'bleed'}),

    heading('Solving for variables'),
    prose(
      'The design research process is about filling in context so our designs have the best chance of resonating. Some context is fixed — how the human eye perceives light, the underlying mathematics of visual perception. These give us basic design principles. But they don’t paint a detailed enough picture of the environments we actually design for. User research fills the gaps.',
    ),
    f('12.png'),

    heading('Setting expectations'),
    prose(
      'So what do we teach, if there is no single archetype of visual literacy to develop toward? Not to love Helvetica or hate drop-shadowed Comic Sans. Not even to prefer generous whitespace. We need to step back from “what they like” and ask “why they like it.”',
      'We should teach users to appreciate design that is bespoke and contextual — because there are times Helvetica is not the right choice. By learning why it works in some scenarios, they become able to sense why it fails in others. The way we develop that capacity is to keep serving designs that genuinely respond to specific needs and contexts.',
      'In some ways, we need to teach users to be spoiled. And if we’re lucky, they’ll hold us accountable — and end up teaching us.',
    ),
    f('13.png'),
  ]
}

/* ----- Run ----- */

const files = Object.keys(ALT)

function upload(file) {
  return client.assets
    .upload('image', readFileSync(path.join(ASSETS, file)), {
      filename: `user-testing-${file}`,
    })
    .then((asset) => {
      console.log('uploaded', file, '→', asset._id)
      return [file, asset._id]
    })
}

// Sequential: thirteen parallel uploads against one project is a good way to
// get rate limited halfway through and leave orphaned assets behind.
files
  .reduce(
    (chain, file) => chain.then((acc) => upload(file).then((e) => [...acc, e])),
    Promise.resolve([]),
  )
  .then((entries) => {
    const assets = Object.fromEntries(entries)

    return client
      .patch(DOC)
      .set({
        subtitle:
          'What role does user testing play in the design practice, and what is our responsibility to progress our users’ visual literacy?',
        type: 'Essay',
        publishedAt: '2016-01-01',
        heroImage: {
          _type: 'image',
          asset: {_type: 'reference', _ref: assets['1.png']},
          alt: ALT['1.png'],
        },
        body: buildBody(assets),
        closing:
          'A version of this talk was presented at UX+DEV Summit, Miami (2017) and INTERACT, Mumbai (2017). Originally published January 2016.',
      })
      .commit()
  })
  .then((doc) => {
    console.log('\npatched', doc._id, '—', doc.body.length, 'blocks')
  })
  .catch((err) => {
    console.error('failed:', err.message)
    process.exit(1)
  })
