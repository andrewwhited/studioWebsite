import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'uxPage',
  title: 'UX Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'string',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Heading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'aboutThemes',
      title: 'About Themes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'theme',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'publications',
      title: 'Publications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'publication',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'type', type: 'string', title: 'Type'},
            {name: 'date', type: 'string', title: 'Date'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'type'},
          },
        },
      ],
    }),
    defineField({
      name: 'talks',
      title: 'Talks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'talk',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'venue', type: 'string', title: 'Venue'},
            {name: 'location', type: 'string', title: 'Location'},
            {name: 'date', type: 'string', title: 'Date'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'venue'},
          },
        },
      ],
    }),
    defineField({
      name: 'footerCopy',
      title: 'Footer Copy',
      type: 'string',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'studioUrl',
      title: 'Studio URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare: () => ({title: 'UX Page'}),
  },
})
