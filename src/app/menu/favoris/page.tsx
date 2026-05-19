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
          <p className="text-center text-on-surface-variant font-libre-franklin py-8 col-span-full">
            Chargement...
          </p>
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
