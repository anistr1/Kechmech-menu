'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Loader2 } from 'lucide-react';
import { useFavorites } from '@/components/FavoritesProvider';

interface ItemCardProps {
  name: string;
  slug: string;
  categorySlug: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export function ItemCard({ name, slug, categorySlug, price, description, imageUrl, isNew, isPopular }: ItemCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(slug);
  const [isNavigating, setIsNavigating] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(slug);
    } else {
      addFavorite({ slug, categorySlug });
    }
  };

  const handleCardClick = () => {
    setIsNavigating(true);
    // Reset after 2 seconds in case navigation is cancelled or user returns via back-forward cache
    setTimeout(() => {
      setIsNavigating(false);
    }, 2000);
  };

  return (
    <Link 
      href={`/menu/${categorySlug}/${slug}`}
      onClick={handleCardClick}
      className={`group relative flex flex-col w-full bg-white border-[3px] border-deep-charcoal rounded-[4px] hover:border-deep-charcoal active:scale-[0.98] transition-all duration-200 ${isNavigating ? 'pointer-events-none' : ''}`}
    >
      {/* Loading Overlay */}
      {isNavigating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[2px] rounded-[1px]">
          <Loader2 className="w-8 h-8 text-deep-charcoal animate-spin" />
        </div>
      )}

      {/* Floating Badges */}
      {(isNew || isPopular) && (
        <div className="absolute -top-[12px] left-2 right-2 flex flex-wrap gap-1.5 z-10">
          {isNew && (
            <span className="bg-supplement-bg text-tertiary border-[2px] border-tertiary font-libre-franklin font-bold text-[13px] px-2.5 py-1 rounded-[4px] leading-none">
              Nouveau
            </span>
          )}
          {isPopular && (
            <span className="bg-tertiary text-white border-[2px] border-tertiary font-libre-franklin font-bold text-[13px] px-2.5 py-1 rounded-[4px] leading-none">
              Populaire
            </span>
          )}
        </div>
      )}

      {/* Image Container */}
      <div className="w-full aspect-square rounded-t-[1px] border-b-[3px] border-deep-charcoal relative flex-shrink-0 bg-vibrant-yellow flex items-center justify-center transition-colors duration-200 overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
        ) : (
          <span className="font-anton text-deep-charcoal text-[48px] uppercase leading-none mt-2">{name.charAt(0)}</span>
        )}
      </div>

      {/* Content Container */}
      <div className="flex-1 p-2.5 flex flex-col justify-between gap-2">
        <div>
          <h3 className="font-anton text-[16px] text-deep-charcoal leading-[1.1] uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
          {description && (
            <p className="font-libre-franklin text-[12px] text-on-surface-variant mt-1 line-clamp-2 leading-tight">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-1 pt-1 mt-auto relative z-30">
          <span className="font-libre-franklin font-bold text-[15px] tracking-tight text-price-green whitespace-nowrap bg-[#E8F3ED] px-1.5 py-0.5 rounded-[4px] border-[2px] border-[#B8D8C7]">
            {price.toString().replace('.', ',')} DT
          </span>
          <button 
            onClick={toggleFavorite}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 -mr-1"
            aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                favorite 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-on-surface-variant hover:text-deep-charcoal'
              }`} 
            />
          </button>
        </div>
      </div>
    </Link>
  );
}
