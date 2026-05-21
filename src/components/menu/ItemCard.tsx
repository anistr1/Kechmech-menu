'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { Badge } from '@/components/ui/Badge';
import { PriceTag } from '@/components/ui/PriceTag';

interface ItemCardProps {
  name: string;
  slug: string;
  categorySlug: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isUnavailable?: boolean;
}

/**
 * "Stretched link" card pattern:
 * The card wrapper is a plain `<article>` (not a <Link>).
 * An invisible <Link> overlay covers the card for navigation.
 * The FavoriteButton sits ABOVE the overlay via z-index, so its
 * click events never bubble into the Link.
 *
 * This is the industry-standard way to have independent interactive
 * elements inside a clickable card, and works on all iOS Safari versions.
 */
export function ItemCard({ name, slug, categorySlug, price, description, imageUrl, isNew, isPopular, isUnavailable }: ItemCardProps) {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCardClick = () => {
    setIsNavigating(true);
    setTimeout(() => { setIsNavigating(false); }, 2000);
  };

  return (
    <article className={`group relative flex flex-col w-full bg-white border-[3px] border-deep-charcoal rounded-[4px] transition-all duration-200 ${isNavigating ? 'pointer-events-none' : ''} ${!isUnavailable ? 'active:scale-[0.98]' : 'opacity-80'}`}>
      {/* Invisible link overlay — makes the entire card clickable, unless unavailable */}
      {!isUnavailable && (
        <Link
          href={`/menu/${categorySlug}/${slug}`}
          prefetch={false}
          onClick={handleCardClick}
          className="absolute inset-0 z-[1] rounded-[1px]"
          aria-label={`Voir ${name}`}
        />
      )}

      {/* Loading Overlay */}
      {isNavigating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 rounded-[1px]">
          <Loader2 className="w-8 h-8 text-deep-charcoal animate-spin" />
        </div>
      )}

      {/* Floating Badges */}
      {(isNew || isPopular) && (
        <div className="absolute -top-[12px] left-2 right-2 flex flex-wrap gap-1.5 z-10">
          {isNew && <Badge type="new" />}
          {isPopular && <Badge type="popular" />}
        </div>
      )}

      {/* Image Container */}
      <div className={`w-full aspect-square rounded-t-[1px] border-b-[3px] border-deep-charcoal relative flex-shrink-0 bg-vibrant-yellow flex items-center justify-center transition-colors duration-200 overflow-hidden ${isUnavailable ? 'grayscale opacity-70' : ''}`}>
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
        ) : (
          <span className="font-anton text-deep-charcoal text-[48px] uppercase leading-none mt-2">{name.charAt(0)}</span>
        )}
        
        {isUnavailable && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/20 backdrop-blur-[1px]">
             <div className="bg-white text-deep-charcoal border-[2px] border-deep-charcoal font-anton uppercase px-3 py-1.5 md:px-4 md:py-2 text-[13px] md:text-[15px] -rotate-[10deg] shadow-[3px_3px_0px_rgba(33,37,41,1)] whitespace-nowrap">
               Non dispo
             </div>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex-1 p-2.5 flex flex-col justify-between gap-2">
        <div>
          <h3 className="font-anton text-[16px] text-deep-charcoal leading-[1.1] uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
          {description && (
            <p className="font-libre-franklin text-[16px] text-on-surface-variant mt-1 line-clamp-2 leading-tight">
              {description}
            </p>
          )}
        </div>

        {/* Price + Favorite — ABOVE the link overlay (z-[5] > z-[1]) */}
        <div className="flex items-center justify-between gap-1 pt-1 mt-auto relative z-[5]">
          <PriceTag price={price} size="sm" />
          {!isUnavailable && (
            <FavoriteButton
              slug={slug}
              categorySlug={categorySlug}
              variant="ghost"
              className="-mr-1 flex-shrink-0"
              iconClassName="w-5 h-5"
            />
          )}
        </div>
      </div>
    </article>
  );
}
