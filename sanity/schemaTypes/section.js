import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Header Layout',
      description: 'How the section title and body lay out at the top of the section',
      type: 'string',
      options: {
        list: [
          {title: 'Title + Text (single column)', value: 'title-text'},
          {title: 'Title + 2-col Text (newspaper flow)', value: 'title-text-text'},
          {title: 'Title + Text + Aside (image or pull quote)', value: 'title-text-aside'},
        ],
        layout: 'radio',
      },
      initialValue: 'title-text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Prose for the section header',
      type: 'simpleProse',
    }),
    defineField({
      name: 'asideKind',
      title: 'Aside Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Pull Quote', value: 'pullQuote'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.layout !== 'title-text-aside',
    }),
    defineField({
      name: 'asideImage',
      title: 'Aside Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt text'},
        {name: 'caption', type: 'text', title: 'Caption', rows: 2},
      ],
      hidden: ({parent}) =>
        parent?.layout !== 'title-text-aside' || parent?.asideKind !== 'image',
    }),
    defineField({
      name: 'asidePullQuote',
      title: 'Aside Pull Quote',
      type: 'text',
      rows: 3,
      hidden: ({parent}) =>
        parent?.layout !== 'title-text-aside' || parent?.asideKind !== 'pullQuote',
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      description: 'Stack of supporting content beneath the section header',
      type: 'array',
      of: [
        {type: 'subsection'},
        {type: 'prose'},
        {type: 'figure'},
        {type: 'figureFlow'},
        {type: 'pullQuote'},
        {type: 'kpiCallout'},
        {type: 'emDashList'},
        {type: 'reflection'},
        {type: 'ndaNote'},
        {type: 'taxonomyTiles'},
        {type: 'integrationTiles'},
      ],
    }),
  ],
  preview: {
    select: {title: 'title', layout: 'layout'},
    prepare: ({title, layout}) => ({
      title: title || '(untitled section)',
      subtitle: layout,
    }),
  },
})
