'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const activeRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);
  const pathname = usePathname();

  // Extract active slug from pathname: /menu/pizza → pizza, /menu/favoris → favoris
  const activeCategorySlug = pathname.split('/menu/')[1]?.split('/')[0] || '';

  const navCategories = [
    ...categories,
    { _id: 'favorites', title: 'Favoris', slug: 'favoris', icon: 'Heart' },
  ];

  // First render: instant scroll before paint (no visible jump)
  useLayoutEffect(() => {
    if (isFirstRender.current && activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategorySlug]);

  // Subsequent navigations: smooth scroll after paint
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategorySlug]);

  return (
    <nav className="w-full bg-surface border-b-[3px] border-deep-charcoal sticky top-0 z-40 py-4 relative">
      <div className="flex overflow-x-auto px-5 pt-1 pb-3 gap-5 items-start relative z-10">
        {navCategories.map((cat) => {
          const isActive = cat.slug === activeCategorySlug;
          return (
            <div key={cat._id} ref={isActive ? activeRef : undefined} className="flex-shrink-0">
              <CategoryCard
                title={cat.title}
                slug={cat.slug}
                imageUrl={cat.imageUrl}
                icon={cat.icon}
                isActive={isActive}
              />
            </div>
          );
        })}
      </div>

      {/* Visual cue: gradient fade on the right side to indicate more items to scroll */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface to-transparent z-20 pointer-events-none" />
    </nav>
  );
}
