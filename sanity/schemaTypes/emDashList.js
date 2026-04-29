import {defineField, defineType} from 'sanity'

// Em-dash bullet list with italicized lead phrase + body.
// e.g. — Executive overview. Top-line impact: who's affected, how long...
export default defineType({
  name: 'emDashList',
  title: 'Em-dash List',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'item',
          fields: [
            {
              name: 'lead',
              type: 'string',
              title: 'Lead phrase (italicized)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'body',
              type: 'text',
              rows: 2,
              title: 'Body',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {lead: 'lead', body: 'body'},
            prepare: ({lead, body}) => ({
              title: lead || '(item)',
              subtitle: body,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {items: 'items'},
    prepare: ({items}) => ({
      title: `Em-dash list · ${items?.length || 0} items`,
      subtitle: items?.map((i) => i.lead).join(' · ') || '',
    }),
  },
})
