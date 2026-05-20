import {defineType} from 'sanity'

// Per-page SEO override object. Embedded on work + thought schemas.
// Every field is optional — empty means "fall back to defaults from
// uxSiteSettings or page content."

export default defineType({
  name: 'seo',
  title: 'SEO & sharing',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Page <title> override',
      description: 'Falls back to the page title if empty.',
      type: 'string',
    },
    {
      name: 'metaDescription',
      title: 'Page <meta description>',
      description:
        'Used in search results and AI summaries. 140–160 characters. ' +
        'Falls back to the page summary if empty.',
      type: 'text',
      rows: 3,
    },
    {
      name: 'shareDescription',
      title: 'Open Graph / Twitter description',
      description: 'Optional shorter variant for link previews. Falls back to <meta description>.',
      type: 'text',
      rows: 2,
    },
    {
      name: 'ogImageOverride',
      title: 'Custom share image',
      description:
        'Optional manual upload. If empty, an image is auto-generated using the page title and hero. ' +
        '1200×630 recommended.',
      type: 'image',
    },
  ],
})
