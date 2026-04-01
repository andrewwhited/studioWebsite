import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set([
  'homePage',
  'studioPage',
  'objectsPage',
  'artPage',
  'imagePage',
  'storePage',
  'uxPage',
])

const singletonListItem = (S, typeName, title) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName))

export default defineConfig({
  name: 'default',
  title: 'Andrew Whited',

  projectId: 'uwr1du4g',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Main site group
            S.listItem()
              .title('Main Site')
              .child(
                S.list()
                  .title('Main Site')
                  .items([
                    singletonListItem(S, 'homePage', 'Home Page'),
                    singletonListItem(S, 'studioPage', 'Studio Page'),
                    singletonListItem(S, 'objectsPage', 'Objects Page'),
                    singletonListItem(S, 'artPage', 'Art Page'),
                    singletonListItem(S, 'imagePage', 'Image Page'),
                    singletonListItem(S, 'storePage', 'Store Page'),
                    S.divider(),
                    S.documentTypeListItem('artwork').title('Artworks'),
                    S.documentTypeListItem('collection').title('Collections'),
                    S.documentTypeListItem('photoSet').title('Photo Sets'),
                  ]),
              ),

            S.divider(),

            // UX site group
            S.listItem()
              .title('UX Site')
              .child(
                S.list()
                  .title('UX Site')
                  .items([
                    singletonListItem(S, 'uxPage', 'UX Page'),
                    S.divider(),
                    S.documentTypeListItem('work').title('Work'),
                    S.documentTypeListItem('thought').title('Thoughts'),
                  ]),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
})
