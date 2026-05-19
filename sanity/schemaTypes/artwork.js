import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
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
      name: 'previewImage',
      title: 'Preview Image',
      description: 'Shown as the tile on the /art landing page.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      description: 'First image shown on the artwork detail page.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'images',
      title: 'Additional Images',
      description: 'Supplementary documentation: details, install shots, alternate angles.',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'string',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Private Collection', value: 'private'},
          {title: 'Available', value: 'available'},
        ],
        layout: 'radio',
      },
      initialValue: 'private',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      description: 'Leave empty for "Price on request"',
      type: 'string',
      hidden: ({document}) => document?.status !== 'available',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'previewImage',
    },
  },
})
