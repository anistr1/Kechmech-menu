import { defineType, defineField } from 'sanity'
import { AddCircleIcon } from '@sanity/icons'

export default defineType({
  name: 'supplement',
  title: 'Supplément',
  type: 'document',
  icon: AddCircleIcon,
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Nom', validation: (rule) => rule.required() }),
    defineField({ name: 'price', type: 'number', title: 'Prix (DT)', validation: (rule) => rule.required().min(0) }),
  ]
})
