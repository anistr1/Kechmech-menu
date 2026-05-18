import React from 'react';

interface CategoryHeaderProps {
  title: string;
  baseDescription?: string;
}

export function CategoryHeader({ title, baseDescription }: CategoryHeaderProps) {
  return (
    <div className="w-full px-4 py-6">
      <h1 className="font-anton text-headline-lg text-deep-charcoal uppercase mb-2">
        {title}
      </h1>
      {baseDescription && (
        <p className="font-libre-franklin text-body-lg text-on-surface-variant">
          <span className="font-bold">Base: </span>
          {baseDescription}
        </p>
      )}
    </div>
  );
}
