import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Only allow slug-safe characters: lowercase letters, digits, hyphens
const SLUG_REGEX = /^[a-z0-9-]+$/;

interface FavoriteMenuItem {
  _id: string;
  name: string;
  slug: string;
  categorySlug: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isUnavailable?: boolean;
}

/**
 * POST /api/favorites
 * Accepts { slugs: string[] } and returns the matching menu items from Sanity.
 * This runs server-side, bypassing any CORS restrictions on the Sanity API.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slugs } = body;

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return NextResponse.json([]);
    }

    // Cap at 50, enforce string type, and validate slug format
    const safeSlugs = slugs
      .slice(0, 50)
      .filter((s: unknown): s is string => typeof s === 'string' && SLUG_REGEX.test(s));

    if (safeSlugs.length === 0) {
      return NextResponse.json([]);
    }

    const items: FavoriteMenuItem[] = await client.fetch(
      `*[_type == "menuItem" && slug.current in $slugs] {
        _id,
        name,
        "slug": slug.current,
        "categorySlug": category->slug.current,
        price,
        description,
        "imageUrl": image.asset->url,
        isNew,
        isPopular,
        isUnavailable
      }`,
      { slugs: safeSlugs }
    );

    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to fetch favorite items:', error);
    return NextResponse.json([], { status: 500 });
  }
}
