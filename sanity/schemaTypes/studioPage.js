import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'studioPage',
  title: 'Studio Page',
  type: 'document',
  fields: [
    // About
    // One continuous block, running ethos → practice → outputs → commercial.
    // Blank lines separate paragraphs; the page renders each as its own <p>
    // in a single measure.
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      rows: 14,
    }),
    defineField({
      name: 'bioName',
      title: 'Name',
      type: 'string',
      description: 'The page h1, above the About text.',
    }),

    // Photographs
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

    // Workshop — the address renders once, in the About caption.
    defineField({
      name: 'locationAddress',
      title: 'Location Address',
      type: 'string',
    }),
    defineField({
      name: 'locationImage',
      title: 'Location Image',
      type: 'image',
      options: {hotspot: true},
    }),

    // Exhibitions
    // Bare entries — title, location, year. No venue and no annotation: the
    // record is what showed and when, not who hosted it.
    defineField({
      name: 'exhibitions',
      title: 'Exhibitions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'exhibition',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'location', type: 'string', title: 'Location'},
            {name: 'year', type: 'string', title: 'Year'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'year'},
          },
        },
      ],
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
            {name: 'creator', type: 'string', title: 'Creator'},
            {name: 'title', type: 'string', title: 'Title'},
            {
              name: 'link',
              type: 'url',
              title: 'Link',
              validation: (Rule) => Rule.uri({allowRelative: true}),
            },
            {name: 'thumbnail', type: 'image', title: 'Thumbnail', options: {hotspot: true}},
          ],
          preview: {
            select: {title: 'title', subtitle: 'creator', media: 'thumbnail'},
          },
        },
      ],
    }),


    // Contact
    // The column headings are set in the layout, not authored — each is tied
    // to the specific link beneath it.
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
    defineField({
      name: 'uxSiteUrl',
      title: 'UX Site URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Studio Page'}),
  },
})
