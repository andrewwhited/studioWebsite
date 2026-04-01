import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artPage',
  title: 'Art Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Art',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Art Page'}),
  },
})
