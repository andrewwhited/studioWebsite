import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'photoSet',
  title: 'Photo Set',
  type: 'document',
  fields: [
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Drives the All / People / Places filter on the Image page. Internal —
    // the value is never displayed, only filtered on, so it stays out of the
    // caption the way collection.type stays out of the Objects UI.
    // "All" is the unfiltered default, not a stored value.
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'People', value: 'people'},
          {title: 'Places', value: 'places'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'location',
      subtitle: 'year',
      media: 'coverImage',
    },
  },
})
