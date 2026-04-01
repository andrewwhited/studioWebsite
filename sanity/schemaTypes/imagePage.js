import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imagePage',
  title: 'Image Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Image',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Image Page'}),
  },
})
