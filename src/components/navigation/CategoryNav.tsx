import React from 'react';
import { CategoryCard } from './CategoryCard';

interface Category {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  icon?: string;
}

interface CategoryNavProps {
  categories: Category[];
  activeCategorySlug: string;
}

export function CategoryNav({ categories, activeCategorySlug }: CategoryNavProps) {
  const navCategories = [
    { _id: 'favorites', title: 'Favoris', slug: 'favoris', icon: 'Heart' },
    ...categories,
  ];

  return (
    <nav className="w-full bg-surface border-b-[3px] border-deep-charcoal sticky top-0 z-40 py-4 relative">
      <div className="flex overflow-x-auto px-5 pb-3 gap-5 items-start relative z-10">
        {navCategories.map((cat) => (
          <CategoryCard
            key={cat._id}
            title={cat.title}
            slug={cat.slug}
            imageUrl={cat.imageUrl}
            icon={cat.icon}
            isActive={cat.slug === activeCategorySlug}
          />
        ))}
      </div>
      
      {/* Visual cue: gradient fade on the right side to indicate more items to scroll */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface to-transparent z-20 pointer-events-none" />
    </nav>
  );
}
