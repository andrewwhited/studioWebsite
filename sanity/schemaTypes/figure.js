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
      description: 'Set the hotspot if the crop matters — widths and ratios vary by placement.',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.placeholder === true,
      // Required unless this is a placeholder — lets an essay be laid out and
      // reviewed before its visuals exist.
      validation: (Rule) =>
        Rule.custom((value, context) =>
          context.parent?.placeholder || value?.asset ? true : 'Image is required'
        ),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      description:
        'What the image shows, for screen readers and search. Not displayed — ' +
        'use Caption for text the reader sees.',
      type: 'string',
      hidden: ({parent}) => parent?.placeholder === true,
      validation: (Rule) =>
        Rule.custom((value, context) =>
          context.parent?.placeholder || value ? true : 'Alt text is required'
        ),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder — artwork not made yet',
      description:
        'Renders a labelled empty frame at the chosen ratio instead of an image. ' +
        'Essay pages only.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'placeholderLabel',
      title: 'Placeholder label',
      description: 'What this visual will be, e.g. "Diagram — the two loops".',
      type: 'string',
      hidden: ({parent}) => !parent?.placeholder,
    }),
    defineField({
      name: 'placeholderRatio',
      title: 'Placeholder ratio',
      description: 'The shape the finished visual will be, so the layout reads true.',
      type: 'string',
      options: {
        list: [
          {title: '16:10 — screen', value: '16 / 10'},
          {title: '3:2 — landscape', value: '3 / 2'},
          {title: '4:3 — diagram', value: '4 / 3'},
          {title: '1:1 — square', value: '1 / 1'},
          {title: '6:7 — portrait', value: '6 / 7'},
          {title: '5:2 — banner', value: '5 / 2'},
        ],
      },
      initialValue: '4 / 3',
      hidden: ({parent}) => !parent?.placeholder,
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
      initialValue: 'measure',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'Small type under the frame, held to about 44 characters.',
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
    select: {title: 'alt', media: 'image', placeholder: 'placeholder', label: 'placeholderLabel'},
    prepare: ({title, media, placeholder, label}) => ({
      title: (placeholder ? label : title) || '(untitled figure)',
      subtitle: placeholder ? 'Figure — placeholder' : 'Figure',
      media: placeholder ? undefined : media,
    }),
  },
})
