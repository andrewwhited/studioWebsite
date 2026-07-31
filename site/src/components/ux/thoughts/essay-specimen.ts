/* ─────────────────────────────────────────────────────
   Layout specimen for the essay template.

   Deliberately written *about* the template rather than in
   Andrew's voice — this is furniture for judging measure,
   rhythm, and the margin column, not a draft of anything.
   It exercises every block type the schema offers.

   Served only at /essay-preview, and only outside production.
   Append ?plain for the no-image opening — the state an essay
   gets when heroImage is empty. Delete once a real essay
   exists in Sanity.
───────────────────────────────────────────────────── */

import type { PortableTextMarkDefinition } from '@portabletext/types'
import type { EssayBlock, ThoughtDoc } from './essay-blocks'

type Span = { _type: 'span'; _key: string; text: string; marks?: string[] }

let key = 0
const k = () => `k${(key += 1)}`

function p(text: string): { _type: 'block'; _key: string; style: 'normal'; children: Span[]; markDefs: [] } {
  return {
    _type: 'block',
    _key: k(),
    style: 'normal',
    children: [{ _type: 'span', _key: k(), text }],
    markDefs: [],
  }
}

// A paragraph split into runs so a footnote or link can be attached mid-sentence.
function marked(
  runs: { text: string; mark?: string }[],
  markDefs: PortableTextMarkDefinition[],
  style: 'normal' | 'h3' | 'blockquote' = 'normal',
) {
  return {
    _type: 'block' as const,
    _key: k(),
    style,
    children: runs.map((r) => ({
      _type: 'span' as const,
      _key: k(),
      text: r.text,
      ...(r.mark ? { marks: [r.mark] } : {}),
    })),
    markDefs,
  }
}

function listItem(text: string) {
  return {
    _type: 'block' as const,
    _key: k(),
    style: 'normal' as const,
    listItem: 'bullet' as const,
    level: 1,
    children: [{ _type: 'span' as const, _key: k(), text }],
    markDefs: [],
  }
}

const body: EssayBlock[] = [
  {
    _type: 'epigraph',
    _key: k(),
    text: 'The measure of a page is not how much it holds but how far the eye travels before it needs to come back.',
    attribution: 'Specimen text — not a real quotation',
  },

  {
    _type: 'essayHeading',
    _key: k(),
    title: 'The reading column',
  },
  {
    _type: 'essayProseBlock',
    _key: k(),
    body: [
      p(
        'This column occupies grid columns three through eight and is capped at thirty-four ems, which lands at roughly sixty-five characters. That cap is what stops the measure from sprawling on a wide display, where six columns of a twelve-column grid would otherwise run past a thousand pixels and make the line impossible to track.',
      ),
      marked(
        [
          { text: 'Body copy is set one step above the interface scale — sixteen-point-eight over twenty-eight — because a long argument is read continuously rather than scanned.' },
          { text: ' Both values are existing tokens', mark: 'fn1' },
          { text: ' and both sit on the four-pixel baseline.' },
        ],
        [
          {
            _type: 'footnote',
            _key: 'fn1',
            text: '--text-lg and --lh-xl. No new type styles were added for this template; every size, leading, and space is drawn from the existing scale.',
          },
        ],
      ),
      p(
        'Paragraph spacing is twenty-four pixels — one four-pixel step under the leading, which keeps paragraphs grouped without the block closing up.',
      ),
    ],
  },

  {
    _type: 'marginNote',
    _key: k(),
    label: 'On the margin',
    text: 'A standalone note like this one sits in the outer column with no numbered reference. Use it for tangents that would break the argument if they were set inline.',
  },

  {
    _type: 'essayHeading',
    _key: k(),
    title: 'Notes, numbers, and apparatus',
  },
  {
    _type: 'essayProseBlock',
    _key: k(),
    body: [
      marked(
        [
          { text: 'Footnotes are authored inline on the word they belong to. The renderer numbers them in a pass over the whole body, so numbering runs continuously across sections' },
          { text: ' no matter how the blocks are grouped', mark: 'fn2' },
          { text: ', and lifts the note itself into the margin cell beside its paragraph.' },
        ],
        [
          {
            _type: 'footnote',
            _key: 'fn2',
            text: 'Each paragraph is its own grid row so the note can share that row. Rendering the body as a single call would trap the notes inside the text column.',
          },
        ],
      ),
      marked(
        [
          { text: 'A note can carry a source URL, which turns the whole note into a link' },
          { text: ' — like this one.', mark: 'fn3' },
        ],
        [
          {
            _type: 'footnote',
            _key: 'fn3',
            text: 'Bringhurst, The Elements of Typographic Style.',
            url: 'https://example.com',
          },
        ],
      ),
      marked(
        [
          { text: 'Inline marks available in the body: ' },
          { text: 'bold', mark: 'strong' },
          { text: ', ' },
          { text: 'italic for titles', mark: 'em' },
          { text: ', and ' },
          { text: 'links', mark: 'lnk1' },
          { text: '.' },
        ],
        [{ _type: 'link', _key: 'lnk1', href: 'https://example.com' }],
      ),
      { ...marked([{ text: 'Sub-heading inside a section' }], [], 'h3') },
      p('Sub-headings take the label treatment rather than a type size of their own, and carry no number.'),
      listItem('Bullets hang an em dash into the left of the measure.'),
      listItem('They stay grouped so a list renders as one list, not several.'),
      listItem('Numbered lists use tabular figures in the same hanging position.'),
      {
        ...marked(
          [
            {
              text: 'A block quote inside prose is a source quoted at length — still part of the argument, ruled and indented rather than amplified.',
            },
          ],
          [],
          'blockquote',
        ),
      },
    ],
  },

  {
    _type: 'pullQuote',
    _key: k(),
    text: 'A pull quote reaches across the measure and the margin, so it reads as a break in the flow rather than another paragraph.',
  },

  {
    _type: 'essayHeading',
    _key: k(),
    title: 'Figures at three widths',
  },
  {
    _type: 'essayProseBlock',
    _key: k(),
    body: [
      p(
        'Figures sit at one of three widths. Measure keeps the visual inside the reading column. Wide runs from the measure through the margin. Bleed goes edge to edge, past the page gutter.',
      ),
    ],
  },
  {
    _type: 'figure',
    _key: k(),
    placeholder: true,
    placeholderLabel: 'Measure width · 4:3',
    placeholderRatio: '4 / 3',
    width: 'measure',
    caption: 'A caption sits under the frame in small type, capped at forty-four characters so it never competes with the body.',
  },
  {
    _type: 'figure',
    _key: k(),
    placeholder: true,
    placeholderLabel: 'Wide · 16:10',
    placeholderRatio: '16 / 10',
    width: 'wide',
    caption: 'Wide figures run from the measure through the margin column.',
  },
  {
    _type: 'figure',
    _key: k(),
    placeholder: true,
    placeholderLabel: 'Bleed · 5:2',
    placeholderRatio: '5 / 2',
    width: 'bleed',
    caption: 'A bleed figure reaches the viewport edge; its caption keeps the gutter.',
  },

]

// heroLayout is a parameter so the four placements can be compared from the
// preview route without a real image — HeroFigure falls back to a frame.
// Stand-in for a real hero. Drop a file at site/public/essay-placeholder.png;
// without it the band renders grey and the layout still reads.
const PLACEHOLDER_HERO = '/essay-placeholder.png'

export function essaySpecimen(withBand = true): ThoughtDoc {
  return {
    ...specimenBase,
    heroImage: withBand ? { url: PLACEHOLDER_HERO, alt: '' } : undefined,
  }
}

const specimenBase: ThoughtDoc = {
  title: 'A specimen for the essay template',
  slug: { current: 'essay-preview' },
  type: 'Essay',
  subtitle: 'Placeholder copy for judging measure, vertical rhythm, and the margin column. Every block type the schema offers appears below at least once.',
  publishedAt: '2026-07-30',
  body,
  closing:
    'This page is a layout specimen, not a piece of writing. It is served outside production only and will be removed once a real essay exists in Sanity.',
  crossPosts: [
    { _key: k(), platform: 'Medium', url: 'https://example.com' },
    { _key: k(), platform: 'Substack', url: 'https://example.com' },
  ],
}
