import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { imageValidation } from '../lib/imageValidation'
import { TagIcon } from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  icon: TagIcon,
  fieldsets: [
    {
      name: 'composition',
      title: 'Configuration de la Composition (ex: Pizza Familiale)',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Nom', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'icon', type: 'string', title: 'Nom de l\'icône (ex: Pizza, Sandwich)' }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image catégorie',
      options: { accept: 'image/jpeg,image/png' },
      validation: imageValidation,
    }),
    defineField({ name: 'baseDescription', type: 'text', title: 'Base' }),
    orderRankField({ type: 'category', newItemPosition: 'after' }),
    defineField({
      name: 'parentCategory',
      type: 'reference',
      to: [{ type: 'category' }],
      title: 'Catégorie parente',
      description: 'Si définie, cette catégorie apparaîtra comme un onglet sous la catégorie parente.',
    }),
    defineField({ name: 'tabLabel', type: 'string', title: 'Libellé onglet', description: 'Texte affiché dans l\'onglet (par défaut: le titre)' }),
    defineField({
      name: 'supplementGroup',
      type: 'reference',
      to: [{ type: 'supplementGroup' }],
      title: 'Groupe de suppléments'
    }),
    defineField({ name: 'isSpecial', type: 'boolean', title: 'Catégorie spéciale (ex: Format Familial)' }),
    
    // Dynamic composition fields
    defineField({
      name: 'compositionTitle',
      type: 'string',
      title: 'Titre de la composition',
      description: 'Ex: Format Familial',
      fieldset: 'composition'
    }),
    defineField({
      name: 'compositionSize',
      type: 'string',
      title: 'Taille / Détails',
      description: 'Ex: (40 cm)',
      fieldset: 'composition'
    }),
    defineField({
      name: 'compositionSubtitle',
      type: 'string',
      title: 'Sous-titre',
      description: 'Ex: Composez votre pizza !',
      fieldset: 'composition'
    }),
    defineField({
      name: 'compositionCombos',
      type: 'array',
      title: 'Combinaisons de prix',
      fieldset: 'composition',
      of: [
        {
          type: 'object',
          name: 'combo',
          title: 'Combinaison',
          fields: [
            { name: 'count', type: 'number', title: 'Nombre de combinaisons (ex: 2 ou 4)' },
            { name: 'price', type: 'number', title: 'Prix (DT)' }
          ]
        }
      ]
    }),
    defineField({
      name: 'compositionChoices',
      type: 'array',
      title: 'Choix disponibles',
      fieldset: 'composition',
      of: [{ type: 'string' }]
    })
  ],
  orderings: [orderRankOrdering]
})
