import React from 'react';

interface CategoryHeaderProps {
  title: string;
  baseDescription?: string;
}

export function CategoryHeader({ title, baseDescription }: CategoryHeaderProps) {
  return (
    <div className="w-full px-5 py-8">
      <h1 className="font-anton text-[40px] leading-[1.1] text-deep-charcoal uppercase mb-3 tracking-wide">
        {title}
      </h1>
      {baseDescription && (
        <p className="font-libre-franklin text-[18px] leading-relaxed text-on-surface-variant border-l-[4px] border-vibrant-yellow pl-4">
          <span className="font-bold text-deep-charcoal">Base: </span>
          {baseDescription}
        </p>
      )}
    </div>
  );
}
