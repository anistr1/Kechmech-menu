import React from 'react';
import { ItemCard } from './ItemCard';

interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

interface ItemListProps {
  items: MenuItem[];
  categorySlug: string;
}

export function ItemList({ items, categorySlug }: ItemListProps) {
  return (
    <div className="flex flex-col gap-4 w-full px-4 mb-8">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          name={item.name}
          slug={item.slug}
          categorySlug={categorySlug}
          price={item.price}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
}
