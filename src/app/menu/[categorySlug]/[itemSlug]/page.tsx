import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { GET_ALL_ITEM_SLUGS_QUERY } from '@/lib/sanity/queries';
import { getMenuItemBySlug } from '@/lib/sanity/data';
import { BackButton } from '@/components/ui/BackButton';
import { PriceTag } from '@/components/ui/PriceTag';
import { Badge } from '@/components/ui/Badge';
import { SupplementSection } from '@/components/menu/SupplementSection';

import { FavoriteButton } from '@/components/ui/FavoriteButton';

export const revalidate = 3600;

/**
 * Pre-render all item detail pages at build time.
 */
export async function generateStaticParams() {
  const items = await client.fetch(GET_ALL_ITEM_SLUGS_QUERY);
  return items;
}

export async function generateMetadata({ params }: { params: Promise<{ itemSlug: string }> }): Promise<Metadata> {
  const { itemSlug } = await params;
  // Uses React.cache() — shared with the page component (1 fetch, not 2)
  const item = await getMenuItemBySlug(itemSlug);

  if (!item) {
    return { title: 'Article introuvable' };
  }

  return {
    title: item.name,
    description: item.description
      ? `${item.name} — ${item.description}`
      : `${item.name} chez Kechmech. ${item.price} DT.`,
    openGraph: item.imageUrl
      ? { images: [{ url: item.imageUrl, width: 800, height: 600, alt: item.name }] }
      : undefined,
  };
}

export default async function ItemDetailPage({ params }: { params: Promise<{ categorySlug: string, itemSlug: string }> }) {
  const { categorySlug, itemSlug } = await params;
  // Uses React.cache() — deduplicated with generateMetadata above
  const item = await getMenuItemBySlug(itemSlug);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Sticky Header with Back Button */}
      <div className="sticky top-0 z-40 w-full px-5 py-4 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <BackButton />
        </div>
        <div className="pointer-events-auto">
          <FavoriteButton slug={itemSlug} categorySlug={categorySlug} />
        </div>
      </div>

      {/* Hero Image (Square) */}
      <div className="w-full aspect-square relative border-b-[3px] border-deep-charcoal bg-vibrant-yellow -mt-[76px]">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-anton text-deep-charcoal opacity-20 text-8xl">
              {item.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="px-5 pt-6 pb-2 flex flex-col gap-3">
        <h1 className="font-anton text-[32px] leading-[36px] text-deep-charcoal uppercase tracking-wide">
          {item.name}
        </h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <PriceTag price={item.price} size="lg" />
          {(item.isPopular || item.isNew) && (
            <div className="flex gap-2">
              {item.isPopular && <Badge type="popular" />}
              {item.isNew && <Badge type="new" />}
            </div>
          )}
        </div>

        {item.description && (
          <p className="font-libre-franklin text-[18px] leading-relaxed text-on-surface-variant mt-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Supplements */}
      <div>
        {item.supplements && item.supplements.length > 0 && (
          <SupplementSection supplements={item.supplements} />
        )}
      </div>
    </main>
  );
}
