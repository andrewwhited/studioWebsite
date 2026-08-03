import {defineField, defineType} from 'sanity'

// A quotation standing at the head of the essay or a section. Distinct from
// `pullQuote`: an epigraph is someone else's words used as a frame, a pull
// quote is the essay's own words amplified.
export default defineType({
  name: 'epigraph',
  title: 'Epigraph',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quotation',
      description:
        "Someone else's words, used to frame the piece or a section. Set ruled and " +
        'indented. Use a Pull Quote instead to amplify your own words.',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      description: 'e.g. "Paul Rand, Thoughts on Design"',
      type: 'string',
    }),
  ],
  preview: {
    select: {text: 'text', attribution: 'attribution'},
    prepare: ({text, attribution}) => ({
      title: text ? `“${text.slice(0, 60)}${text.length > 60 ? '…' : ''}”` : '(empty)',
      subtitle: attribution ? `Epigraph — ${attribution}` : 'Epigraph',
    }),
  },
})
