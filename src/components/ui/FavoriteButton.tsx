'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/components/FavoritesProvider';

interface FavoriteButtonProps {
  slug: string;
  categorySlug: string;
  className?: string;
  iconClassName?: string;
}

export function FavoriteButton({ slug, categorySlug, className = '', iconClassName = 'w-7 h-7' }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(slug);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(slug);
    } else {
      addFavorite({ slug, categorySlug });
    }
  };

  return (
    <button 
      onClick={toggleFavorite}
      className={`p-2 rounded-full bg-white border-[2px] border-deep-charcoal shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:bg-surface-variant transition-colors active:translate-y-[1px] active:translate-x-[1px] active:shadow-[1px_1px_0px_rgba(26,26,26,1)] flex items-center justify-center ${className}`}
      aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart 
        className={`transition-colors ${iconClassName} ${
          favorite 
            ? 'fill-red-500 text-red-500 drop-shadow-sm' 
            : 'text-deep-charcoal'
        }`} 
      />
    </button>
  );
}
