import {defineArrayMember, defineField, defineType} from 'sanity'

// Essays and talks. The `body` array drives the editorial essay template.
//
// Three groups, in the order a piece is actually made: what it is, the piece
// itself, then how it is described to machines.
//
// A thought renders on the essay template as soon as `body` has content;
// without it the route falls through to the legacy hardcoded renderer, which
// is what keeps the un-ported 2016 essay working.
export default defineType({
  name: 'thought',
  title: 'Thought',
  type: 'document',
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'body', title: 'Essay'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    /* ---- Overview ---- */

    defineField({
      name: 'title',
      title: 'Title',
      description: 'Set large at the top of the piece, outdented into the left margin.',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description:
        'One or two sentences under the title. Shown on the piece and used as its ' +
        'description on the Thoughts listing, in search results, and in link ' +
        'previews — so write it to stand on its own. Override for search only ' +
        'under SEO.',
      type: 'text',
      rows: 3,
      group: 'overview',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Shares a namespace with case studies — must be unique across both.',
      type: 'slug',
      group: 'overview',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      description: 'Shown on the listing and in the meta line at the top of the piece.',
      type: 'string',
      group: 'overview',
      options: {
        list: ['Essay', 'Talk', 'Note', 'Visual essay'],
      },
      initialValue: 'Essay',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      description:
        'Three to five subjects the piece is actually about — "Agentic Systems", ' +
        '"Information Architecture". Not visible on the page: they tell search ' +
        'engines and AI tools what this is, and reinforce the same terms listed ' +
        'under Person → Knows about in Site Settings. Leave empty rather than ' +
        'guessing; vague tags are worse than none.',
      type: 'array',
      of: [{type: 'string'}],
      group: 'overview',
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published',
      description:
        'The only date field — the year shown on the listing is derived from it.',
      type: 'date',
      group: 'overview',
      options: {dateFormat: 'YYYY-MM-DD'},
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time (minutes)',
      description: 'Leave empty to calculate from the body copy.',
      type: 'number',
      group: 'overview',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description:
        'Optional — pieces read fine without one. Renders as a full-width band ' +
        'between the subtitle and the body, where it doubles as the divider.',
      type: 'image',
      group: 'overview',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({
      name: 'crossPosts',
      title: 'Also published at',
      description:
        'Optional. Links to cross-posted copies, listed at the foot of the piece — ' +
        'leave empty until a copy actually exists somewhere. Set the canonical URL ' +
        'on those copies to point back here; there is nothing to set on this end.',
      type: 'array',
      group: 'overview',
      of: [
        {
          type: 'object',
          name: 'crossPost',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
            },
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        },
      ],
    }),
    /* ---- Essay ---- */

    defineField({
      name: 'body',
      title: 'Body',
      description:
        'The piece itself. Section headings number themselves from their position ' +
        'here, and footnotes number continuously across every prose block, so ' +
        'blocks can be split and reordered freely.',
      type: 'array',
      group: 'body',
      of: [
        defineArrayMember({type: 'essayHeading'}),
        defineArrayMember({type: 'essayProseBlock'}),
        defineArrayMember({type: 'epigraph'}),
        defineArrayMember({type: 'pullQuote'}),
        defineArrayMember({type: 'marginNote'}),
        defineArrayMember({type: 'sectionBreak'}),
        defineArrayMember({type: 'figure'}),
        defineArrayMember({type: 'figureFlow'}),
      ],
    }),
    defineField({
      name: 'closing',
      title: 'Closing note',
      description:
        'Optional. Publication history, acknowledgements, where it first appeared. ' +
        'Set in small type at the foot of the piece, and omitted entirely when empty.',
      type: 'text',
      rows: 3,
      group: 'body',
    }),

    /* ---- SEO ---- */

    defineField({
      name: 'seo',
      title: 'SEO & sharing',
      description:
        'All optional. Each field falls back to Title, Listing summary, or the ' +
        'auto-generated share image.',
      type: 'seo',
      group: 'seo',
    }),

    /* ---- Legacy ----
       Carried by the one pre-port document and superseded: `year` by
       Published, `context` by Type + Published, `summary` by Subtitle. Retained
       so the values aren't dropped on its next publish, and so its listing card
       keeps its text until the piece is ported. */

    defineField({name: 'year', title: 'Year (legacy)', type: 'string', hidden: true}),
    defineField({name: 'summary', title: 'Summary (legacy)', type: 'text', hidden: true}),
    defineField({name: 'context', title: 'Context (legacy)', type: 'string', hidden: true}),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      year: 'year',
      publishedAt: 'publishedAt',
      media: 'heroImage',
    },
    prepare: ({title, type, year, publishedAt, media}) => ({
      title,
      subtitle: [type, publishedAt?.slice(0, 4) || year].filter(Boolean).join(' — '),
      media,
    }),
  },
})
