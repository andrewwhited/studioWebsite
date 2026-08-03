import {defineArrayMember, defineType} from 'sanity'

// Portable Text for essay body copy. Distinct from `simpleProse` (case studies)
// because essays need footnotes, sub-headings, and both list kinds.
//
// The `footnote` annotation is the reason this type exists: footnotes are
// authored inline on the word they belong to, and the renderer lifts them out
// into the margin column while leaving a numbered superscript behind.
export default defineType({
  name: 'essayProse',
  title: 'Essay prose',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        // No H2 — section headings are their own top-level block so they can
        // carry a number and hang in the left margin.
        {title: 'Sub-heading', value: 'h3'},
        {title: 'Block quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']}),
              },
            ],
          },
          {
            title: 'Footnote',
            name: 'footnote',
            type: 'object',
            fields: [
              {
                name: 'text',
                title: 'Note',
                type: 'text',
                rows: 3,
                validation: (Rule) => Rule.required(),
              },
              {
                name: 'url',
                title: 'Source URL',
                description: 'Optional — turns the note into a link.',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({allowRelative: false, scheme: ['http', 'https']}),
              },
            ],
          },
        ],
      },
    }),
  ],
})
