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

    // DEPRECATED 2026-07-26 — no longer rendered. Held a retired unity claim.
    // The page h1 is now bioName. Field kept until the value is cleared.
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading (deprecated)',
      type: 'string',
      readOnly: true,
    }),
    // DEPRECATED 2026-07-26 — merged into aboutText. Value retained until
    // the merged block is signed off visually, then unset.
    defineField({
      name: 'heroText',
      title: 'Hero Text (deprecated — merged into About Text)',
      type: 'text',
      readOnly: true,
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

    // DEPRECATED 2026-07-26 — merged into aboutText. Value retained until
    // the merged block is signed off visually, then unset.
    defineField({
      name: 'bioText',
      title: 'Bio Text (deprecated — merged into About Text)',
      type: 'text',
      readOnly: true,
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
    // DEPRECATED 2026-07-26 — cut as premature.
    defineField({
      name: 'locationVisitNote',
      title: 'Visit Note (deprecated)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'locationImage',
      title: 'Location Image',
      type: 'image',
      options: {hotspot: true},
    }),

    // Services — DEPRECATED 2026-07-26. Section cut; capability is named
    // inside the About block with no CTA. Fields kept until values are cleared.
    defineField({
      name: 'servicesTitle',
      title: 'Services Section Title (deprecated)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'services',
      title: 'Services (deprecated)',
      type: 'array',
      readOnly: true,
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
      title: 'Services Contact CTA (deprecated)',
      type: 'string',
      readOnly: true,
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
