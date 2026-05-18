import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '../ui/Icon';

interface CategoryCardProps {
  title: string;
  slug: string;
  imageUrl?: string;
  isActive: boolean;
  icon?: string;
}

export function CategoryCard({ title, slug, imageUrl, isActive, icon }: CategoryCardProps) {
  return (
    <Link 
      href={`/menu/${slug}`}
      className="flex flex-col items-center gap-2.5 group w-[76px] flex-shrink-0"
    >
      <div 
        className={`w-[76px] h-[76px] rounded-[4px] border-[3px] border-deep-charcoal overflow-hidden relative flex items-center justify-center transition-colors duration-200
          ${isActive ? 'bg-vibrant-yellow' : 'bg-white hover:bg-surface-variant'}`}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill sizes="76px" className="object-cover" />
        ) : icon ? (
          <Icon 
            name={icon} 
            className={`w-9 h-9 ${icon === 'Heart' ? 'text-red-500' : 'text-deep-charcoal'}`} 
          />
        ) : (
          <span className={`font-anton text-[36px] uppercase mt-2 leading-none text-deep-charcoal`}>
            {title.charAt(0)}
          </span>
        )}
      </div>
      <span 
        className={`font-libre-franklin text-[13px] text-center w-full leading-tight uppercase tracking-wider
          ${isActive ? 'font-bold text-deep-charcoal' : 'font-semibold text-on-surface-variant'}`}
      >
        {title}
      </span>
    </Link>
  );
}
