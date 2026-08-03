import {defineField, defineType} from 'sanity'

// Top-level essay section heading. Every section is numbered, and the number
// is derived from position in the body array at render time — there is no
// number field to keep in sync.
export default defineType({
  name: 'essayHeading',
  title: 'Section heading',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description:
        'Numbered automatically from its position in the body — 01, 02, and so on — ' +
        'and set hanging in the left margin beside the text. Reordering renumbers.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, subtitle: 'Section heading'}),
  },
})
