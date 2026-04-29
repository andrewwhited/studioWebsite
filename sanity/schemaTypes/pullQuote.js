import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pullQuote',
  title: 'Pull Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote',
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
