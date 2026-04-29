import {defineField, defineType} from 'sanity'

// Wraps prose paragraphs as a block (so it can sit alongside figures, etc.
// in the blocks array). Use this to add additional paragraphs after the
// section/subsection header.
export default defineType({
  name: 'prose',
  title: 'Prose',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleProse',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {body: 'body'},
    prepare: ({body}) => {
      const text = body?.[0]?.children?.[0]?.text ?? ''
      return {
        title: text ? text.slice(0, 80) : '(empty prose)',
        subtitle: 'Prose',
      }
    },
  },
})
