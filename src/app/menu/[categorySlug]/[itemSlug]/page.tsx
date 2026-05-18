import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { GET_MENU_ITEM_BY_SLUG_QUERY } from '@/lib/sanity/queries';
import { BackButton } from '@/components/ui/BackButton';
import { PriceTag } from '@/components/ui/PriceTag';
import { Badge } from '@/components/ui/Badge';
import { SupplementSection } from '@/components/menu/SupplementSection';

import { FavoriteButton } from '@/components/ui/FavoriteButton';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ itemSlug: string }> }): Promise<Metadata> {
  const { itemSlug } = await params;
  const item = await client.fetch(GET_MENU_ITEM_BY_SLUG_QUERY, { slug: itemSlug });

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
  const item = await client.fetch(GET_MENU_ITEM_BY_SLUG_QUERY, { slug: itemSlug });

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Sticky Header with Back Button */}
      <div className="sticky top-0 z-40 w-full p-4 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <BackButton />
        </div>
        <div className="pointer-events-auto">
          <FavoriteButton slug={itemSlug} categorySlug={categorySlug} />
        </div>
      </div>

      {/* Hero Image (Square) */}
      <div className="w-full aspect-square relative border-b-2 border-deep-charcoal bg-surface-variant -mt-[76px]">
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
      <div className="px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h1 className="font-anton text-[28px] text-deep-charcoal uppercase leading-none mb-2">
              {item.name}
            </h1>
            <div className="flex gap-2">
              {item.isPopular && <Badge type="popular" />}
              {item.isNew && <Badge type="new" />}
            </div>
          </div>
          <div className="flex-shrink-0">
            <PriceTag price={item.price} size="lg" />
          </div>
        </div>

        {item.description && (
          <p className="font-libre-franklin text-[18px] leading-relaxed text-on-surface-variant mt-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Supplements */}
      <div className="mt-4">
        {item.supplements && item.supplements.length > 0 && (
          <SupplementSection supplements={item.supplements} />
        )}
      </div>
    </main>
  );
}
