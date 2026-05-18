'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
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
    <Link 
      href={`/menu/${categorySlug}/${slug}`}
      className="group relative flex w-full bg-white border-[3px] border-deep-charcoal rounded-[4px] hover:border-deep-charcoal active:scale-[0.98] transition-all duration-200"
    >
      {/* Floating Badges */}
      {(isNew || isPopular) && (
        <div className="absolute -top-[12px] left-4 flex gap-1.5 z-10">
          {isNew && (
            <span className="bg-supplement-bg text-tertiary border-[1.5px] border-tertiary font-libre-franklin font-bold text-[12px] px-2 py-0.5 rounded-[4px] leading-none">
              Nouveau
            </span>
          )}
          {isPopular && (
            <span className="bg-tertiary text-white border-[1.5px] border-tertiary font-libre-franklin font-bold text-[12px] px-2 py-0.5 rounded-[4px] leading-none">
              Populaire
            </span>
          )}
        </div>
      )}

      {/* Image Container (110x110) */}
      <div className="w-[110px] min-h-[110px] rounded-l-[1px] border-r-[3px] border-deep-charcoal relative flex-shrink-0 bg-vibrant-yellow flex items-center justify-center transition-colors duration-200 overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill sizes="110px" className="object-cover" />
        ) : (
          <span className="font-anton text-deep-charcoal text-[48px] uppercase leading-none mt-2">{name.charAt(0)}</span>
        )}
      </div>

      {/* Content Container */}
      <div className="flex-1 p-4 flex flex-col justify-center">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h3 className="font-anton text-[22px] text-deep-charcoal leading-[1.1] uppercase tracking-wide group-hover:text-primary transition-colors">
              {name}
            </h3>
            {description && (
              <p className="font-libre-franklin text-[15px] text-on-surface-variant mt-1.5 line-clamp-2 leading-tight">
                {description}
              </p>
            )}
          </div>
          
          <div className="flex-shrink-0 flex flex-col items-end h-full gap-2 pt-0.5">
            <span className="font-libre-franklin font-bold text-[20px] tracking-tight text-price-green whitespace-nowrap bg-[#E8F3ED] px-2.5 py-1 rounded-[4px] border-[2px] border-[#B8D8C7]">
              {price.toString().replace('.', ',')} DT
            </span>
            <button 
              onClick={toggleFavorite}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart 
                className={`w-6 h-6 transition-colors ${
                  favorite 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-on-surface-variant hover:text-deep-charcoal'
                }`} 
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
