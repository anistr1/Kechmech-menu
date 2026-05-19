import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { imageValidation } from '../lib/imageValidation'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'menuItem',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Nom', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }], title: 'Catégorie', validation: (rule) => rule.required() }),
    defineField({ name: 'price', type: 'number', title: 'Prix (DT)', validation: (rule) => rule.required().min(0) }),
    defineField({ name: 'description', type: 'text', title: 'Ingrédients' }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Photo',
      options: { accept: 'image/jpeg,image/png,image/webp' },
      validation: imageValidation,
    }),
    defineField({ name: 'isPopular', type: 'boolean', title: 'Populaire' }),
    defineField({ name: 'isNew', type: 'boolean', title: 'Nouveau' }),
    orderRankField({ type: 'menuItem', newItemPosition: 'after' }),
  ]
})
