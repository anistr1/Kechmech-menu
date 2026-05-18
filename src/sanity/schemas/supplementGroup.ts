import { defineType, defineField, defineArrayMember } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

export default defineType({
  name: 'supplementGroup',
  title: 'Groupe de Suppléments',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Nom du groupe', validation: (rule) => rule.required() }),
    defineField({
      name: 'supplements',
      type: 'array',
      title: 'Suppléments',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'supplement' }] })]
    })
  ]
})
