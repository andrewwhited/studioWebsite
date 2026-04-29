import {defineField, defineType} from 'sanity'

// Single image with caption + alt text. Use figureFlow for 2–3 frame multi-image flows.
export default defineType({
  name: 'figure',
  title: 'Figure',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      description:
        'When true, figure breaks out of the right band to span the full content width (cols 1–13). Use sparingly for climactic visuals.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hideCaption',
      title: 'Hide caption',
      description: 'Hide caption visually (alt text still applies for SEO/a11y)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'alt', media: 'image'},
    prepare: ({title, media}) => ({
      title: title || '(untitled figure)',
      subtitle: 'Figure',
      media,
    }),
  },
})
