'use client';

import React, { useEffect, useState } from 'react';
import { CategoryHeader } from '@/components/menu/CategoryHeader';
import { ItemCard } from '@/components/menu/ItemCard';
import { useFavorites } from '@/components/FavoritesProvider';

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
}

export default function FavorisPage() {
  const { favorites } = useFavorites();
  const [favoriteItems, setFavoriteItems] = useState<FavoriteMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        if (favorites.length > 0) {
          const slugs = favorites.map((f) => f.slug);
          const res = await fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slugs }),
          });

          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
          }

          const items: FavoriteMenuItem[] = await res.json();
          // Filter out any items where categorySlug is null (broken Sanity references)
          setFavoriteItems(items.filter((item) => !!item.categorySlug));
        } else {
          setFavoriteItems([]);
        }
      } catch (error) {
        console.error('Failed to fetch favorites data', error);
        setFavoriteItems([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [favorites]);

  return (
    <main className="min-h-screen bg-surface pb-12">
      <CategoryHeader
        title="Vos Favoris"
        description="Retrouvez ici tous les articles que vous avez aimés."
      />

      <div className="px-5 mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col w-full bg-white border-[3px] border-surface-variant rounded-[4px] overflow-hidden"
            >
              <div className="w-full aspect-square bg-surface-variant animate-pulse" />
              <div className="p-2.5 flex flex-col gap-2">
                <div className="h-4 bg-surface-variant rounded animate-pulse w-3/4" />
                <div className="h-3 bg-surface-variant rounded animate-pulse w-full" />
                <div className="flex justify-between items-center pt-1">
                  <div className="h-6 w-16 bg-surface-variant rounded animate-pulse" />
                  <div className="h-8 w-8 bg-surface-variant rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))
        ) : favoriteItems.length > 0 ? (
          favoriteItems.map((item) => (
            <ItemCard
              key={item._id}
              name={item.name}
              slug={item.slug}
              categorySlug={item.categorySlug}
              price={item.price}
              description={item.description}
              imageUrl={item.imageUrl}
              isNew={item.isNew}
              isPopular={item.isPopular}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center col-span-full">
            <span className="text-[48px]">💔</span>
            <p className="font-libre-franklin text-on-surface-variant max-w-[250px]">
              Vous n&apos;avez pas encore de favoris. Parcourez le menu pour en ajouter !
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
