import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { imageValidation } from '../lib/imageValidation'
import { TagIcon } from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  icon: TagIcon,
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
  ],
  orderings: [orderRankOrdering]
})
