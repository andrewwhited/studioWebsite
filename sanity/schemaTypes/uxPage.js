import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'uxPage',
  title: 'UX Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'UX Page',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'string',
    }),
    defineField({
      name: 'aboutIntro',
      title: 'About Intro',
      type: 'text',
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
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'body', type: 'text', title: 'Body'},
          ],
          preview: {
            select: {title: 'label'},
          },
        },
      ],
    }),
    defineField({
      name: 'timeline',
      title: 'Background Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'timelineEntry',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'role', type: 'string', title: 'Role'},
            {name: 'detail', type: 'string', title: 'Detail'},
          ],
          preview: {
            select: {title: 'name', subtitle: 'role'},
          },
        },
      ],
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo',
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
            {name: 'meta', type: 'string', title: 'Meta'},
          ],
          preview: {
            select: {title: 'title'},
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
            {
              name: 'venues',
              type: 'array',
              title: 'Venues',
              of: [
                {
                  type: 'object',
                  name: 'venue',
                  fields: [
                    {name: 'name', type: 'string', title: 'Name'},
                    {name: 'city', type: 'string', title: 'City'},
                    {name: 'year', type: 'string', title: 'Year'},
                  ],
                  preview: {
                    select: {title: 'name', subtitle: 'year'},
                  },
                },
              ],
            },
          ],
          preview: {
            select: {title: 'title'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'UX Page'}),
  },
})
