import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'objectsPage',
  title: 'Objects Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Objects',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Objects Page'}),
  },
})
