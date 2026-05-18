import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ItemCardProps {
  name: string;
  slug: string;
  categorySlug: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export function ItemCard({ name, slug, categorySlug, price, description, imageUrl }: ItemCardProps) {
  return (
    <Link 
      href={`/menu/${categorySlug}/${slug}`}
      className="flex w-full bg-white border-2 border-deep-charcoal rounded-md overflow-hidden active:scale-[0.97] transition-transform"
    >
      {/* Image Container (100x100) */}
      <div className="w-[100px] h-[100px] border-r-2 border-deep-charcoal relative flex-shrink-0 bg-surface-variant flex items-center justify-center">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <span className="font-anton text-deep-charcoal opacity-20 text-4xl">{name.charAt(0)}</span>
        )}
      </div>

      {/* Content Container */}
      <div className="flex-1 p-3 flex flex-col justify-center">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="font-anton text-headline-lg-mobile text-deep-charcoal leading-tight uppercase">
              {name}
            </h3>
            {description && (
              <p className="font-libre-franklin text-sm text-on-surface-variant mt-1 line-clamp-2 leading-snug">
                {description}
              </p>
            )}
          </div>
          
          <div className="flex-shrink-0 flex items-center h-full">
            <span className="font-libre-franklin font-bold text-[22px] text-price-green whitespace-nowrap">
              {price.toString().replace('.', ',')} DT
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
