import {defineField, defineType} from 'sanity'

// Quiet italic disclaimer line. Defaults to standard NDA wording but can be overridden.
export default defineType({
  name: 'ndaNote',
  title: 'NDA / Disclaimer Note',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Note',
      type: 'text',
      rows: 2,
      initialValue: 'Note: Due to NDAs, some assets have been redrawn or generalized.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {text: 'text'},
    prepare: ({text}) => ({
      title: text ? text.slice(0, 60) : '(NDA note)',
      subtitle: 'NDA Note',
    }),
  },
})
