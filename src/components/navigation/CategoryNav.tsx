import React from 'react';
import { CategoryCard } from './CategoryCard';

interface Category {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;

}

interface CategoryNavProps {
  categories: Category[];
  activeCategorySlug: string;
}

export function CategoryNav({ categories, activeCategorySlug }: CategoryNavProps) {
  return (
    <nav className="w-full bg-surface border-b-2 border-deep-charcoal sticky top-0 z-40 py-3 shadow-sm">
      <div className="flex overflow-x-auto hide-scrollbar px-4 gap-4 items-start">
        {categories.map((cat) => (
          <CategoryCard
            key={cat._id}
            title={cat.title}
            slug={cat.slug}
            imageUrl={cat.imageUrl}

            isActive={cat.slug === activeCategorySlug}
          />
        ))}
      </div>
    </nav>
  );
}
