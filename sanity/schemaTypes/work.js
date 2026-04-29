import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  groups: [
    {name: 'header', title: 'Header'},
    {name: 'body', title: 'Body'},
  ],
  fields: [
    // Header — always consistent
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'header',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Hero subtitle and listing description',
      type: 'text',
      rows: 3,
      group: 'header',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      description: 'e.g. "2023–2025"',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Square image for the hero (caption is hidden in hero context)',
      type: 'image',
      group: 'header',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),

    // Body — sections array
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'body',
      of: [{type: 'section'}],
    }),

    // Display
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'header',
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
      subtitle: 'summary',
      media: 'heroImage',
    },
  },
})
