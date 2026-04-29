import {defineField, defineType} from 'sanity'

// Multi-frame flow visual — 2–3 images shown side by side.
// Defaults to full-width breakout (the case for §4 concept flows on CS2).
export default defineType({
  name: 'figureFlow',
  title: 'Figure Flow (multi-image)',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      description: '2–3 images shown side by side as a flow',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
    defineField({
      name: 'alt',
      title: 'Group alt text',
      description: 'Used as fallback for any individual image without its own alt',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'fullWidth',
      title: 'Full width',
      description: 'When true, breaks out to span cols 1–13 (default for flow visuals)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {alt: 'alt', caption: 'caption', images: 'images'},
    prepare: ({alt, caption, images}) => ({
      title: alt || caption || '(figure flow)',
      subtitle: `Flow · ${images?.length || 0} frames`,
      media: images?.[0],
    }),
  },
})
