import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year / Date Range',
      type: 'string',
    }),
    defineField({
      name: 'context',
      title: 'Context Line',
      description: 'e.g. "IBM · Senior Design Lead · 2020–2025"',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short description for the listing page',
      type: 'text',
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'constraints',
      title: 'Constraints',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'approach',
      title: 'Approach',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'decisions',
      title: 'Decisions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'decision',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'body', type: 'text', title: 'Body'},
          ],
          preview: {
            select: {title: 'title'},
          },
        },
      ],
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'context',
    },
  },
})
