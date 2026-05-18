'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/components/FavoritesProvider';

interface FavoriteButtonProps {
  slug: string;
  categorySlug: string;
  className?: string;
  iconClassName?: string;
  variant?: 'brutal' | 'ghost';
}

export function FavoriteButton({ 
  slug, 
  categorySlug, 
  className = '', 
  iconClassName = 'w-7 h-7',
  variant = 'brutal'
}: FavoriteButtonProps) {
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

  const baseClasses = "rounded-full flex items-center justify-center transition-colors min-w-[44px] min-h-[44px]";
  
  const variantClasses = {
    brutal: "p-2 bg-white border-[2px] border-deep-charcoal hover:bg-surface-variant active:scale-[0.97] transition-all",
    ghost: "p-2 hover:bg-surface-hover active:scale-[0.97] transition-all"
  };

  const heartClasses = variant === 'brutal'
    ? favorite ? 'fill-favorite-active text-favorite-active' : 'text-deep-charcoal'
    : favorite ? 'fill-favorite-active text-favorite-active' : 'text-on-surface-variant hover:text-deep-charcoal';

  return (
    <button 
      onClick={toggleFavorite}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart 
        className={`transition-colors ${iconClassName} ${heartClasses}`} 
      />
    </button>
  );
}
