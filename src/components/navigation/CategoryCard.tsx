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
  const isFavoris = slug === 'favoris';

  return (
    <Link
      href={`/menu/${slug}`}
      prefetch={false}
      className="flex flex-col items-center gap-2 group w-[92px] flex-shrink-0"
    >
      <div
        className={`rounded-[4px] border-[3px] overflow-hidden relative flex items-center justify-center transition-all duration-300 ${
          isFavoris
            ? isActive 
              ? 'w-[76px] h-[76px] border-deep-charcoal bg-[#ef4444] shadow-[4px_4px_0_0_#1A1A1A] -translate-y-[2px] -translate-x-[2px]' 
              : 'w-[76px] h-[76px] border-deep-charcoal bg-[#ffccd5] shadow-[2px_2px_0_0_#1A1A1A] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[4px_4px_0_0_#1A1A1A]'
            : isActive 
              ? 'w-[76px] h-[76px] border-vibrant-yellow bg-vibrant-yellow shadow-[4px_4px_0_0_#1A1A1A] -translate-y-[2px] -translate-x-[2px]' 
              : 'w-[76px] h-[76px] border-[#cdcdcd] bg-white shadow-[2px_2px_0_0_#1A1A1A] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[4px_4px_0_0_#1A1A1A] hover:bg-surface-variant'
        }`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="76px"
            className={`object-cover transition-all duration-300 ${!isActive ? 'opacity-75 group-hover:opacity-100' : ''}`}
          />
        ) : icon ? (
          <Icon
            name={icon}
            className={`transition-all duration-300 ${
              isFavoris 
                ? isActive ? 'w-10 h-10 text-white fill-white animate-pulse-subtle' : 'w-9 h-9 text-[#ef4444] fill-[#ef4444] group-hover:scale-110'
                : isActive ? 'w-9 h-9 text-deep-charcoal' : 'w-9 h-9 text-deep-charcoal opacity-75 group-hover:opacity-100'
            }`}
          />
        ) : (
          <span className={`font-anton text-[36px] uppercase mt-2 leading-none text-deep-charcoal transition-all duration-300 ${!isActive ? 'opacity-75 group-hover:opacity-100' : ''}`}>
            {title.charAt(0)}
          </span>
        )}
      </div>
      <span
        className={`font-libre-franklin text-[14px] text-center w-full leading-tight uppercase tracking-wider transition-all duration-200 ${
          isFavoris
            ? isActive ? 'font-bold text-red-600 bg-red-100 rounded px-1' : 'font-bold text-red-500'
            : isActive ? 'font-bold text-deep-charcoal bg-vibrant-yellow/20 rounded px-1' : 'font-semibold text-on-surface-variant'
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
