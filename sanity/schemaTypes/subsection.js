import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subsection',
  title: 'Subsection',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Subsection Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleProse',
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      description: 'Content beneath the subsection (no nested subsections)',
      type: 'array',
      of: [
        {type: 'prose'},
        {type: 'figure'},
        {type: 'figureFlow'},
        {type: 'pullQuote'},
        {type: 'kpiCallout'},
        {type: 'emDashList'},
        {type: 'taxonomyTiles'},
        {type: 'integrationTiles'},
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: title || '(untitled subsection)',
      subtitle: 'Subsection',
    }),
  },
})
