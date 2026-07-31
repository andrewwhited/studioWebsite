import {defineField, defineType} from 'sanity'

// Wraps a run of essay prose so it can sit in the same flat array as figures,
// pull quotes, and headings.
export default defineType({
  name: 'essayProseBlock',
  title: 'Prose',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      description:
        'Runs in the reading column at roughly 65 characters. Supports sub-headings, ' +
        'block quotes, lists, links, and footnotes — select the words a footnote ' +
        'belongs to and attach it there; it renders in the margin beside the paragraph.',
      type: 'essayProse',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {body: 'body'},
    prepare: ({body}) => {
      const text = body?.[0]?.children?.map((c) => c.text).join('') ?? ''
      return {
        title: text ? text.slice(0, 80) : '(empty prose)',
        subtitle: 'Prose',
      }
    },
  },
})
