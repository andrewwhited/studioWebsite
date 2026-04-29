import {defineArrayMember, defineType} from 'sanity'

// Reusable Portable Text array for case study prose: paragraphs only,
// with bold/italic/link marks. No inline images (figures are separate blocks).
export default defineType({
  name: 'simpleProse',
  title: 'Prose',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
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
        ],
      },
    }),
  ],
})
