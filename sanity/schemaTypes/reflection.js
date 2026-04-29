import {defineField, defineType} from 'sanity'

// Bigger-type closing paragraph that reads as ending punctuation.
export default defineType({
  name: 'reflection',
  title: 'Reflection',
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
        title: text ? text.slice(0, 80) : '(empty reflection)',
        subtitle: 'Reflection',
      }
    },
  },
})
