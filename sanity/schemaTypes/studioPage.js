import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'studioPage',
  title: 'Studio Page',
  type: 'document',
  fields: [
    // Hero
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
    }),
    defineField({
      name: 'heroPrimaryImage',
      title: 'Hero Primary Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroSecondaryImage',
      title: 'Hero Secondary Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroTertiaryImage',
      title: 'Hero Tertiary Image',
      type: 'image',
      options: {hotspot: true},
    }),

    // Bio
    defineField({
      name: 'bioName',
      title: 'Bio Name',
      type: 'string',
    }),
    defineField({
      name: 'bioText',
      title: 'Bio Text',
      type: 'text',
    }),
    defineField({
      name: 'bioImage',
      title: 'Bio Image',
      type: 'image',
      options: {hotspot: true},
    }),

    // Location
    defineField({
      name: 'locationTitle',
      title: 'Location Title',
      type: 'string',
    }),
    defineField({
      name: 'locationText',
      title: 'Location Text',
      type: 'string',
    }),
    defineField({
      name: 'locationAddress',
      title: 'Location Address',
      type: 'string',
    }),
    defineField({
      name: 'locationVisitNote',
      title: 'Visit Note',
      type: 'string',
    }),
    defineField({
      name: 'locationImage',
      title: 'Location Image',
      type: 'image',
      options: {hotspot: true},
    }),

    // Services
    defineField({
      name: 'servicesTitle',
      title: 'Services Section Title',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'service',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'text', type: 'text', title: 'Text'},
            {name: 'image', type: 'image', title: 'Image', options: {hotspot: true}},
          ],
          preview: {
            select: {title: 'title', media: 'image'},
          },
        },
      ],
    }),
    defineField({
      name: 'servicesContact',
      title: 'Services Contact CTA',
      type: 'string',
    }),

    // Required Reading
    defineField({
      name: 'readingList',
      title: 'Required Reading',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'readingItem',
          fields: [
            {
              name: 'itemType',
              type: 'string',
              title: 'Type',
              options: {list: ['book', 'film', 'essay', 'video', 'artist']},
            },
            {name: 'creator', type: 'string', title: 'Creator'},
            {name: 'title', type: 'string', title: 'Title'},
            {
              name: 'link',
              type: 'url',
              title: 'Link',
              validation: (Rule) => Rule.uri({allowRelative: true}),
            },
            {name: 'thumbnail', type: 'image', title: 'Thumbnail', options: {hotspot: true}},
            {name: 'note', type: 'text', title: 'Note'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'creator', media: 'thumbnail'},
          },
        },
      ],
    }),

    // What's Playing
    defineField({
      name: 'whatsPlaying',
      title: "What's Playing Embed",
      type: 'url',
    }),

    // Contact
    defineField({
      name: 'contactTitle',
      title: 'Contact Title',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Studio Page'}),
  },
})
