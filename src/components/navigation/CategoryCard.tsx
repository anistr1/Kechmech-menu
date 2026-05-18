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
      className="flex flex-col items-center gap-2 group w-20 flex-shrink-0"
    >
      <div 
        className={`w-16 h-16 rounded-md border-2 border-deep-charcoal overflow-hidden relative flex items-center justify-center transition-colors
          ${isActive ? 'bg-vibrant-yellow' : 'bg-white'}`}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : icon ? (
          <Icon name={icon} className={`w-8 h-8 ${isActive ? 'text-deep-charcoal' : 'text-on-surface-variant'}`} />
        ) : (
          <span className="font-anton text-deep-charcoal text-xl opacity-50">{title.charAt(0)}</span>
        )}
      </div>
      <span 
        className={`font-libre-franklin text-xs text-center w-full leading-tight
          ${isActive ? 'font-bold text-deep-charcoal' : 'font-semibold text-on-surface-variant'}`}
      >
        {title}
      </span>
    </Link>
  );
}
