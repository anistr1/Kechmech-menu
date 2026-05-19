import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { frFRLocale } from '@sanity/locale-fr-fr'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Kechmech Digital Menu',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'create-new',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',

  plugins: [structureTool({ structure }), visionTool(), media(), frFRLocale()],

  schema: {
    types: schemaTypes,
  },
})
