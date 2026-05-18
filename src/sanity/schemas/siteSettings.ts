import { defineType, defineField } from 'sanity'
import { imageValidation } from '../lib/imageValidation'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({ name: 'restaurantName', type: 'string', title: 'Nom du restaurant', validation: (rule) => rule.required() }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: { accept: 'image/jpeg,image/png' },
      validation: imageValidation,
    }),

    defineField({ name: 'splashTagline', type: 'string', title: 'Slogan (Splash)' }),
    defineField({ name: 'ctaText', type: 'string', title: 'Texte bouton CTA' }),
    defineField({ name: 'marqueeText', type: 'string', title: 'Texte promotionnel (Marquee)', description: 'Texte défilant affiché en haut du menu.' }),
    defineField({ name: 'instagramUrl', type: 'url', title: 'Lien Instagram' }),
    defineField({ name: 'facebookUrl', type: 'url', title: 'Lien Facebook' }),
    defineField({ name: 'tiktokUrl', type: 'url', title: 'Lien TikTok' }),
  ]
})
