import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pullQuote',
  title: 'Pull Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote',
      description:
        'A line from the piece itself, set large across the text and margin columns so ' +
        'it reads as a break in the flow. Use an Epigraph to quote someone else.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {text: 'text'},
    prepare: ({text}) => ({
      title: text ? `“${text.slice(0, 60)}${text.length > 60 ? '…' : ''}”` : '(empty quote)',
      subtitle: 'Pull Quote',
    }),
  },
})
