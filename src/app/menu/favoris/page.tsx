'use client';

import React, { useEffect, useState } from 'react';
import { CategoryNav } from '@/components/navigation/CategoryNav';
import { CategoryHeader } from '@/components/menu/CategoryHeader';
import { ItemCard } from '@/components/menu/ItemCard';
import { useFavorites } from '@/components/FavoritesProvider';
import { client } from '@/sanity/lib/client';
import { GET_CATEGORIES_QUERY } from '@/lib/sanity/queries';

export default function FavorisPage() {
  const { favorites } = useFavorites();
  const [categories, setCategories] = useState<any[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedCategories = await client.fetch(GET_CATEGORIES_QUERY);
        setCategories(fetchedCategories);

        if (favorites.length > 0) {
          // Fetch favorite items using Sanity groq query
          const slugs = favorites.map(f => f.slug);
          const items = await client.fetch(
            `*[_type == "menuItem" && slug.current in $slugs] {
              _id,
              name,
              "slug": slug.current,
              "categorySlug": category->slug.current,
              price,
              description,
              "imageUrl": image.asset->url,
              isNew,
              isPopular
            }`,
            { slugs }
          );
          
          // Reorder items according to the order in the favorites list (optional) or just use fetched
          setFavoriteItems(items);
        } else {
          setFavoriteItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch favorites data", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [favorites]);

  return (
    <main className="min-h-screen bg-surface pb-12">
      <CategoryNav categories={categories} activeCategorySlug="favoris" />

      <CategoryHeader
        title="Vos Favoris"
        baseDescription="Retrouvez ici tous les articles que vous avez aimés."
      />

      <div className="px-5 mt-6 flex flex-col gap-4">
        {isLoading ? (
          <p className="text-center text-on-surface-variant font-libre-franklin py-8">
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
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <span className="text-[48px]">💔</span>
            <p className="font-libre-franklin text-on-surface-variant max-w-[250px]">
              Vous n'avez pas encore de favoris. Parcourez le menu pour en ajouter !
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
