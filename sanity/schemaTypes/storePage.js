import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'storePage',
  title: 'Store Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Store',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Store Page'}),
  },
})
