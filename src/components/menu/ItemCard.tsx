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
      className="group flex w-full bg-white border-[3px] border-deep-charcoal rounded-[4px] overflow-hidden hover:border-deep-charcoal active:scale-[0.98] transition-all duration-200"
    >
      {/* Image Container (110x110) */}
      <div className="w-[110px] h-[110px] border-r-[3px] border-deep-charcoal relative flex-shrink-0 bg-vibrant-yellow flex items-center justify-center transition-colors duration-200">
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
          
          <div className="flex-shrink-0 flex items-center h-full pt-0.5">
            <span className="font-libre-franklin font-bold text-[20px] tracking-tight text-price-green whitespace-nowrap bg-[#E8F3ED] px-2.5 py-1 rounded-[4px] border-[2px] border-[#B8D8C7]">
              {price.toString().replace('.', ',')} DT
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
