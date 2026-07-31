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
      description: 'One caption for the whole flow, set under the frames.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'width',
      title: 'Width (essays)',
      description:
        'Essay pages only. Case studies use the Full width toggle below. ' +
        'Measure = sits in the text column · Wide = text column through the margin · ' +
        'Bleed = edge to edge.',
      type: 'string',
      options: {
        list: [
          {title: 'Measure', value: 'measure'},
          {title: 'Wide', value: 'wide'},
          {title: 'Bleed', value: 'bleed'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'wide',
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
