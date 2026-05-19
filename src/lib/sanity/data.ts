/**
 * Cached Sanity data access layer.
 *
 * Uses React.cache() for per-request deduplication (so generateMetadata
 * and the page component share a single Sanity fetch) and wraps heavy
 * queries with unstable_cache for ISR-level persistent caching.
 *
 * Cache tags map to Sanity _type values so the /api/revalidate webhook
 * can surgically invalidate specific cache entries on content changes.
 * Time-based revalidation (86400s / 24h) is kept as a safety net.
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
// React.cache() wraps the persistent unstable_cache so that
// generateMetadata + page component share a single call per request.

export const getCategoryBySlug = cache(
  (slug: string) => _getCategoryBySlugCached(slug)
);

const _getCategoryBySlugCached = unstable_cache(
  async (slug: string) => client.fetch(GET_CATEGORY_BY_SLUG_QUERY, { slug }),
  ['category-by-slug'],
  { revalidate: 86400, tags: ['category', 'supplement', 'supplementGroup'] }
);

export const getMenuItemBySlug = cache(
  (slug: string) => _getMenuItemBySlugCached(slug)
);

const _getMenuItemBySlugCached = unstable_cache(
  async (slug: string) => client.fetch(GET_MENU_ITEM_BY_SLUG_QUERY, { slug }),
  ['menu-item-by-slug'],
  { revalidate: 86400, tags: ['menuItem', 'category', 'supplement', 'supplementGroup'] }
);

// ─── Persistent cache via unstable_cache ───────────────────────────────
// These persist across requests until revalidation via webhook or
// the 24h time-based fallback.

export const getCategories = unstable_cache(
  async () => client.fetch(GET_CATEGORIES_QUERY),
  ['categories'],
  { revalidate: 86400, tags: ['category'] }
);

export const getSiteSettings = unstable_cache(
  async () => client.fetch(GET_SITE_SETTINGS_QUERY),
  ['site-settings'],
  { revalidate: 86400, tags: ['siteSettings'] }
);

export const getChildCategories = unstable_cache(
  async (slug: string) => client.fetch(GET_CHILD_CATEGORIES_QUERY, { slug }),
  ['child-categories'],
  { revalidate: 86400, tags: ['category'] }
);

export const getMenuItemsByCategory = unstable_cache(
  async (slug: string) => client.fetch(GET_MENU_ITEMS_BY_CATEGORY_QUERY, { slug }),
  ['menu-items-by-category'],
  { revalidate: 86400, tags: ['menuItem', 'category'] }
);

/**
 * Fetches the full category page data in a single GROQ query:
 * category + child categories + items for each.
 * Replaces the old 3-7 waterfall requests.
 */
export const getFullCategoryPage = cache(
  (slug: string) => _getFullCategoryPageCached(slug)
);

const _getFullCategoryPageCached = unstable_cache(
  async (slug: string) => client.fetch(GET_FULL_CATEGORY_PAGE_QUERY, { slug }),
  ['full-category-page'],
  { revalidate: 86400, tags: ['category', 'menuItem', 'supplement', 'supplementGroup'] }
);
