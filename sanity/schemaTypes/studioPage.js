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
      description: 'The page h1, rendered as a caption alongside the address.',
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
    // Bare entries — no annotation, no type tag. Venue is optional: a show
    // held in Andrew's own studio has no venue worth naming on his own site.
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
            {name: 'venue', type: 'string', title: 'Venue'},
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
