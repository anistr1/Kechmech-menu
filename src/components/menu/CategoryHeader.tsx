import React from 'react';

interface CategoryHeaderProps {
  title: string;
  itemCount?: number;
  baseDescription?: string;
  description?: string;
}

export function CategoryHeader({ title, itemCount, baseDescription, description }: CategoryHeaderProps) {
  return (
    <div className="w-full px-5 py-8">
      {itemCount !== undefined && itemCount > 0 && (
        <span className="font-libre-franklin text-[13px] font-bold text-deep-charcoal/60 uppercase tracking-widest block mb-1">
          {itemCount} plats
        </span>
      )}
      <h1 className="font-anton text-[40px] leading-[1.1] text-deep-charcoal uppercase mb-3 tracking-wide">
        {title}
      </h1>
      {description && (
        <p className="font-libre-franklin text-[18px] leading-relaxed text-on-surface-variant mb-4">
          {description}
        </p>
      )}
      {baseDescription && (
        <p className="font-libre-franklin text-[18px] leading-relaxed text-on-surface-variant border-l-[4px] border-vibrant-yellow pl-4">
          <span className="font-bold text-deep-charcoal">Base: </span>
          {baseDescription}
        </p>
      )}
    </div>
  );
}
