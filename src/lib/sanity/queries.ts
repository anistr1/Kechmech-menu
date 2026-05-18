import { defineQuery } from 'next-sanity'

// Only fetch root-level categories (no parent) for the top navigation
export const GET_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && !defined(parentCategory)] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    icon,
    "imageUrl": image.asset->url,
    baseDescription,
    isSpecial
  }
`)

// Fetch a single category by slug, including its child sub-categories
export const GET_CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    icon,
    "imageUrl": image.asset->url,
    baseDescription,
    tabLabel,
    isSpecial,
    "parentSlug": parentCategory->slug.current,
    "supplements": supplementGroup->supplements[]->{
      _id,
      name,
      price
    },
    compositionTitle,
    compositionSize,
    compositionSubtitle,
    compositionCombos,
    compositionChoices
  }
`)

// Fetch child categories for a given parent category slug
export const GET_CHILD_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && parentCategory->slug.current == $slug] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    tabLabel,
    baseDescription,
    "supplements": supplementGroup->supplements[]->{
      _id,
      name,
      price
    }
  }
`)

export const GET_MENU_ITEMS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "menuItem" && category->slug.current == $slug] | order(orderRank) {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    "imageUrl": image.asset->url,
    isPopular,
    isNew
  }
`)

export const GET_SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    restaurantName,
    "logoUrl": logo.asset->url,
    splashTagline,
    ctaText,
    marqueeText,
    instagramUrl,
    facebookUrl,
    tiktokUrl
  }
`)

export const GET_MENU_ITEM_BY_SLUG_QUERY = defineQuery(`
  *[_type == "menuItem" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    "imageUrl": image.asset->url,
    isPopular,
    isNew,
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      "parentSlug": parentCategory->slug.current
    },
    "supplements": category->supplementGroup->supplements[]->{
      _id,
      name,
      price
    }
  }
`)
