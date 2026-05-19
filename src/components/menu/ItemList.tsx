import React from 'react';
import { ItemCard } from './ItemCard';

interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface ItemListProps {
  items: MenuItem[];
  categorySlug: string;
}

export function ItemList({ items, categorySlug }: ItemListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-full max-w-screen-xl mx-auto px-4 mb-8 pt-3">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          name={item.name}
          slug={item.slug}
          categorySlug={categorySlug}
          price={item.price}
          description={item.description}
          imageUrl={item.imageUrl}
          isNew={item.isNew}
          isPopular={item.isPopular}
        />
      ))}
    </div>
  );
}
