import {defineField, defineType} from 'sanity'

// CS2-specific bespoke block: 4-tile UI integration models in a 2×2 grid.
// Short horizontal rule above each tile, no vertical separators.
export default defineType({
  name: 'integrationTiles',
  title: 'Integration Tiles (2×2)',
  type: 'object',
  fields: [
    defineField({
      name: 'tiles',
      title: 'Tiles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tile',
          fields: [
            {name: 'number', type: 'string', title: 'Number (e.g. "01")'},
            {name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required()},
            {name: 'body', type: 'text', rows: 3, title: 'Body', validation: (Rule) => Rule.required()},
          ],
          preview: {
            select: {title: 'title', subtitle: 'body'},
          },
        },
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],
  preview: {
    select: {tiles: 'tiles'},
    prepare: ({tiles}) => ({
      title: 'Integration Tiles',
      subtitle: tiles?.map((t) => t.title).join(' · ') || '',
    }),
  },
})
