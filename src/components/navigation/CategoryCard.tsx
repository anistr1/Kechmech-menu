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
      className={`flex flex-col items-center gap-2 group w-[76px] flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'hover:scale-105'}`}
    >
      <div
        className={`w-[76px] h-[76px] rounded-[4px] border-[3px] overflow-hidden relative flex items-center justify-center transition-all duration-200
          ${isActive ? 'border-vibrant-yellow bg-vibrant-yellow' : 'border-deep-charcoal bg-white hover:bg-surface-variant'}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="76px"
            className={`object-cover transition-all duration-300 ${!isActive ? 'grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100' : ''}`}
          />
        ) : icon ? (
          <Icon
            name={icon}
            className={`w-9 h-9 transition-all duration-300 ${icon === 'Heart' ? 'text-red-500' : 'text-deep-charcoal'} ${!isActive ? 'opacity-75 group-hover:opacity-100' : ''}`}
          />
        ) : (
          <span className={`font-anton text-[36px] uppercase mt-2 leading-none text-deep-charcoal transition-all duration-300 ${!isActive ? 'opacity-75 group-hover:opacity-100' : ''}`}>
            {title.charAt(0)}
          </span>
        )}
      </div>
      <span
        className={`font-libre-franklin text-[13px] text-center w-full leading-tight uppercase tracking-wider transition-all duration-200
          ${isActive ? 'font-bold text-deep-charcoal' : 'font-semibold text-on-surface-variant'}`}
      >
        {title}
      </span>
    </Link>
  );
}
