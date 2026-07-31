import {defineField, defineType} from 'sanity'

// A standalone aside in the margin column — not tied to a footnote reference.
// Use for tangents, context, and "worth saying but not in the argument" notes.
// Renders beside the block that follows it; collapses inline on mobile.
export default defineType({
  name: 'marginNote',
  title: 'Margin note',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Optional short heading, e.g. "Aside" or "On terminology".',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Note',
      description:
        'Sits in the margin beside the block that follows, with no numbered reference. ' +
        'For a tangent that would break the argument if set inline. Collapses below ' +
        'the text on narrow screens.',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link',
      description: 'Optional — turns the note into a link.',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {label: 'label', text: 'text'},
    prepare: ({label, text}) => ({
      title: label || text?.slice(0, 60) || '(empty note)',
      subtitle: 'Margin note',
    }),
  },
})
