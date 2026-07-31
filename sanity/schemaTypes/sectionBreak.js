import {defineType} from 'sanity'

// A pause between movements inside a section — the "· · ·" break.
//
// Not a heading: it carries no text, and it must stay out of the section
// numbering. Not a paragraph either. It marks a turn in the argument where a
// numbered heading would over-announce it.
export default defineType({
  name: 'sectionBreak',
  title: 'Section break (· · ·)',
  type: 'object',
  fields: [
    {
      name: 'note',
      title: 'Editorial note',
      description:
        'Optional, never rendered. Somewhere to record why the break is here, ' +
        'since the block has nothing else to show in the editor.',
      type: 'string',
    },
  ],
  preview: {
    select: {note: 'note'},
    prepare: ({note}) => ({title: '· · ·', subtitle: note || 'Section break'}),
  },
})
