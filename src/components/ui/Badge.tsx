import React from 'react';

interface BadgeProps {
  type: 'popular' | 'new';
}

export function Badge({ type }: BadgeProps) {
  const isPopular = type === 'popular';
  
  return (
    <span 
      className={`inline-block px-3 py-1 rounded-full font-libre-franklin font-bold text-xs uppercase tracking-wider border-2 border-deep-charcoal
        ${isPopular ? 'bg-tertiary text-white' : 'bg-vibrant-yellow text-deep-charcoal'}`}
    >
      {isPopular ? 'Populaire' : 'Nouveau'}
    </span>
  );
}
