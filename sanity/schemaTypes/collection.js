import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
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
      name: 'collectionType',
      title: 'Type',
      description: 'Internal only — not displayed on front end',
      type: 'string',
      options: {
        list: [
          {title: 'Main', value: 'main'},
          {title: 'Core', value: 'core'},
          {title: 'Commission', value: 'commission'},
        ],
      },
    }),

    // Hero
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Featured Photos
    defineField({
      name: 'featuredPhotos',
      title: 'Featured Photos',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),

    // Editorial — flexible mixed content
    defineField({
      name: 'editorial',
      title: 'Editorial Blocks',
      type: 'blockContent',
    }),

    // Objects
    defineField({
      name: 'objects',
      title: 'Objects',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'collectionObject',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'image', type: 'image', title: 'Image', options: {hotspot: true}},
            {name: 'description', type: 'text', title: 'Description'},
            {name: 'productLink', type: 'string', title: 'Product Link'},
          ],
          preview: {
            select: {title: 'name', media: 'image'},
          },
        },
      ],
    }),

    // Companion
    defineField({
      name: 'playlist',
      title: 'Playlist Link',
      type: 'url',
    }),
    defineField({
      name: 'hitList',
      title: 'Hit List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'hitListItem',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'note', type: 'string', title: 'Note'},
            {name: 'link', type: 'url', title: 'Link'},
          ],
          preview: {
            select: {title: 'name'},
          },
        },
      ],
    }),

    // Shop link
    defineField({
      name: 'shopCollectionLink',
      title: 'Shop Collection Link',
      type: 'string',
    }),

    // Preview card text
    defineField({
      name: 'shortText',
      title: 'Short Text (for preview cards)',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'heroImage',
    },
  },
})
