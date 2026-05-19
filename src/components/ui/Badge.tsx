import React from 'react';

interface BadgeProps {
  type: 'popular' | 'new';
  className?: string;
}

export function Badge({ type, className = '' }: BadgeProps) {
  const isPopular = type === 'popular';
  
  const baseClasses = "inline-flex items-center justify-center font-libre-franklin font-bold text-[14px] px-2.5 py-1 rounded-full leading-none border-[2px]";
  const typeClasses = isPopular 
    ? "bg-tertiary text-white border-tertiary" 
    : "bg-supplement-bg text-tertiary border-tertiary";

  return (
    <span className={`${baseClasses} ${typeClasses} ${className}`}>
      {isPopular ? 'Populaire' : 'Nouveau'}
    </span>
  );
}
