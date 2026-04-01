import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'thought',
  title: 'Thought',
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
      name: 'context',
      title: 'Context',
      description: 'e.g. "Essay — 2024"',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short description for the listing page',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
    }),
    defineField({
      name: 'blocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'headingBlock',
          title: 'Heading',
          fields: [{name: 'text', type: 'string', title: 'Text'}],
          preview: {select: {title: 'text'}, prepare: ({title}) => ({title, subtitle: 'Heading'})},
        },
        {
          type: 'object',
          name: 'paragraphBlock',
          title: 'Paragraph',
          fields: [{name: 'text', type: 'text', title: 'Text'}],
          preview: {
            select: {title: 'text'},
            prepare: ({title}) => ({title: title?.slice(0, 80) + '…', subtitle: 'Paragraph'}),
          },
        },
        {
          type: 'object',
          name: 'pullquoteBlock',
          title: 'Pullquote',
          fields: [{name: 'text', type: 'text', title: 'Text'}],
          preview: {
            select: {title: 'text'},
            prepare: ({title}) => ({title, subtitle: 'Pullquote'}),
          },
        },
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image',
          fields: [
            {name: 'image', type: 'image', title: 'Image', options: {hotspot: true}},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
          preview: {
            select: {title: 'caption', media: 'image'},
            prepare: ({title, media}) => ({title: title || 'Image', subtitle: 'Image', media}),
          },
        },
        {
          type: 'object',
          name: 'fullbleedBlock',
          title: 'Full Bleed Image',
          fields: [
            {name: 'image', type: 'image', title: 'Image', options: {hotspot: true}},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
          preview: {
            select: {title: 'caption', media: 'image'},
            prepare: ({title, media}) => ({title: title || 'Full Bleed', subtitle: 'Full Bleed', media}),
          },
        },
        {
          type: 'object',
          name: 'splitBlock',
          title: 'Split Layout',
          fields: [
            {
              name: 'side',
              type: 'string',
              title: 'Image Side',
              options: {list: ['left', 'right']},
              initialValue: 'left',
            },
            {name: 'image', type: 'image', title: 'Image', options: {hotspot: true}},
            {
              name: 'images',
              type: 'array',
              title: 'Multiple Images',
              of: [{type: 'image', options: {hotspot: true}}],
            },
            {name: 'photoBg', type: 'string', title: 'Photo Background Color'},
            {name: 'caption', type: 'string', title: 'Caption'},
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'body', type: 'array', title: 'Body Paragraphs', of: [{type: 'text'}]},
          ],
          preview: {
            select: {title: 'heading', media: 'image'},
            prepare: ({title, media}) => ({title: title || 'Split Layout', subtitle: 'Split', media}),
          },
        },
      ],
    }),
    defineField({
      name: 'closing',
      title: 'Closing',
      type: 'text',
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
      media: 'heroImage',
    },
  },
})
