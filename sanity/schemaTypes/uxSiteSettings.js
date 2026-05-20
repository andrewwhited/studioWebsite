import {defineField, defineType} from 'sanity'

// Singleton holding site-wide SEO / metadata / structured-data content for
// the UX subdomain. Edited in the studio so wording can be refreshed without
// a deploy. Code reads these fields with hardcoded fallbacks.

export default defineType({
  name: 'uxSiteSettings',
  title: 'UX Site Settings',
  type: 'document',
  groups: [
    {name: 'meta', title: 'Default metadata', default: true},
    {name: 'og', title: 'Share image'},
    {name: 'person', title: 'Person (JSON-LD)'},
    {name: 'llms', title: 'llms.txt'},
  ],
  fields: [
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default <title>',
      description:
        'Used on the homepage and as a fallback on pages without their own SEO title.',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default <meta description>',
      description:
        'Used on the homepage and as a fallback. Aim for 140–160 characters.',
      type: 'text',
      rows: 3,
      group: 'meta',
    }),
    defineField({
      name: 'defaultShareTitle',
      title: 'Default Open Graph / Twitter title',
      description: 'Optional shorter variant for link previews. Falls back to <title>.',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'defaultShareDescription',
      title: 'Default Open Graph / Twitter description',
      description: 'Optional shorter variant for link previews. Falls back to <meta description>.',
      type: 'text',
      rows: 2,
      group: 'meta',
    }),

    defineField({
      name: 'ogPrimary',
      title: 'Homepage OG image headline',
      description:
        'The text rendered on the 1200×630 share card for the homepage. ' +
        'Kept separate from the hero typewriter so it can be refined independently.',
      type: 'text',
      rows: 3,
      group: 'og',
    }),
    defineField({
      name: 'ogSecondary',
      title: 'Homepage OG image subtitle',
      description: 'Smaller text below the headline on the share card.',
      type: 'string',
      group: 'og',
    }),

    defineField({
      name: 'personDescription',
      title: 'Person description',
      description:
        'Long-form description used in JSON-LD. This is what AI tools quote when they summarize the site. ' +
        'Refresh every 6–8 weeks so the "currently" signal stays warm.',
      type: 'text',
      rows: 5,
      group: 'person',
    }),
    defineField({
      name: 'personJobTitle',
      title: 'Job title',
      type: 'string',
      group: 'person',
    }),
    defineField({
      name: 'personAddress',
      title: 'Address',
      type: 'object',
      group: 'person',
      fields: [
        {name: 'locality', type: 'string', title: 'City'},
        {name: 'region', type: 'string', title: 'State/Region'},
        {name: 'country', type: 'string', title: 'Country code (e.g. US)'},
      ],
    }),
    defineField({
      name: 'personKnowsAbout',
      title: 'Topics (knowsAbout)',
      description: 'Short topic strings. Each becomes an entry in the schema.org Person.',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'person',
    }),
    defineField({
      name: 'personAwards',
      title: 'Awards',
      type: 'array',
      of: [{type: 'string'}],
      group: 'person',
    }),
    defineField({
      name: 'personOccupations',
      title: 'Recent occupations',
      description:
        'Used to populate schema.org hasOccupation. Most recent first. ' +
        'Refresh as roles change.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'occupation',
          fields: [
            {name: 'title', type: 'string', title: 'Role title'},
            {name: 'organization', type: 'string', title: 'Organization'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'organization'},
          },
        },
      ],
      group: 'person',
    }),
    defineField({
      name: 'personAlumniOf',
      title: 'Alumni of',
      type: 'string',
      group: 'person',
    }),
    defineField({
      name: 'personSameAs',
      title: 'Canonical profile URLs (sameAs)',
      description: 'LinkedIn, studio site, etc. The /resume.pdf URL is added automatically.',
      type: 'array',
      of: [{type: 'url'}],
      group: 'person',
    }),

    defineField({
      name: 'llmsTxt',
      title: '/llms.txt body',
      description:
        'Plain markdown served at https://ux.andrewwhited.com/llms.txt. ' +
        'LLM-friendly summary of the site. No transform — what you type is what is served.',
      type: 'text',
      rows: 30,
      group: 'llms',
    }),
  ],
  preview: {
    prepare: () => ({title: 'UX Site Settings'}),
  },
})
