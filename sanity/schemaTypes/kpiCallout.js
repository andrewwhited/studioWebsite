import {defineField, defineType} from 'sanity'

// KPI/stat block — value + caption + source. Used for things like the
// Gartner "Leader" callout in CS2.
export default defineType({
  name: 'kpiCallout',
  title: 'KPI Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      description: 'The headline word/number (e.g. "Leader", "85%")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Caption explaining the value',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'source',
      title: 'Source',
      description: 'Small uppercase source line below the label',
      type: 'string',
    }),
  ],
  preview: {
    select: {value: 'value', label: 'label'},
    prepare: ({value, label}) => ({
      title: value || '(no value)',
      subtitle: label || 'KPI Callout',
    }),
  },
})
