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
    <nav className="w-full bg-surface border-b-[3px] border-deep-charcoal sticky top-0 z-40 py-4">
      <div className="flex overflow-x-auto hide-scrollbar px-5 gap-5 items-start">
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
