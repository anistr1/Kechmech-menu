/**
 * Cached Sanity data access layer.
 *
 * Uses React.cache() for per-request deduplication (so generateMetadata
 * and the page component share a single Sanity fetch) and wraps heavy
 * queries with unstable_cache for ISR-level persistent caching.
 */
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { client } from '@/sanity/lib/client';
import {
  GET_CATEGORIES_QUERY,
  GET_CATEGORY_BY_SLUG_QUERY,
  GET_CHILD_CATEGORIES_QUERY,
  GET_MENU_ITEMS_BY_CATEGORY_QUERY,
  GET_MENU_ITEM_BY_SLUG_QUERY,
  GET_SITE_SETTINGS_QUERY,
  GET_FULL_CATEGORY_PAGE_QUERY,
} from './queries';

// ─── Per-request deduplication via React.cache() ───────────────────────
// These ensure that if generateMetadata + page component both call the
// same function with the same slug, only ONE Sanity request fires.

export const getCategoryBySlug = cache(async (slug: string) =>
  client.fetch(GET_CATEGORY_BY_SLUG_QUERY, { slug })
);

export const getMenuItemBySlug = cache(async (slug: string) =>
  client.fetch(GET_MENU_ITEM_BY_SLUG_QUERY, { slug })
);

// ─── Persistent cache via unstable_cache ───────────────────────────────
// These persist across requests until the revalidation period expires.

export const getCategories = unstable_cache(
  async () => client.fetch(GET_CATEGORIES_QUERY),
  ['categories'],
  { revalidate: 3600 }
);

export const getSiteSettings = unstable_cache(
  async () => client.fetch(GET_SITE_SETTINGS_QUERY),
  ['site-settings'],
  { revalidate: 3600 }
);

export const getChildCategories = unstable_cache(
  async (slug: string) => client.fetch(GET_CHILD_CATEGORIES_QUERY, { slug }),
  ['child-categories'],
  { revalidate: 3600 }
);

export const getMenuItemsByCategory = unstable_cache(
  async (slug: string) => client.fetch(GET_MENU_ITEMS_BY_CATEGORY_QUERY, { slug }),
  ['menu-items-by-category'],
  { revalidate: 3600 }
);

/**
 * Fetches the full category page data in a single GROQ query:
 * category + child categories + items for each.
 * Replaces the old 3-7 waterfall requests.
 */
export const getFullCategoryPage = cache(async (slug: string) =>
  client.fetch(GET_FULL_CATEGORY_PAGE_QUERY, { slug })
);
