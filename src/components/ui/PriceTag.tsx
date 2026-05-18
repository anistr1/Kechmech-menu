import React from 'react';

interface PriceTagProps {
  price: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceTag({ price, size = 'md', className = '' }: PriceTagProps) {
  const formattedPrice = price.toString().replace('.', ',');
  
  const sizeClasses = {
    sm: 'text-[15px] px-1.5 py-0.5',
    md: 'text-[22px] px-2 py-0.5',
    lg: 'text-[28px] px-2.5 py-1'
  };

  return (
    <span 
      className={`inline-flex items-center justify-center font-libre-franklin font-bold tracking-tight text-price-green whitespace-nowrap bg-price-bg rounded-[4px] border-[2px] border-price-border leading-none ${sizeClasses[size]} ${className}`}
    >
      {formattedPrice} DT
    </span>
  );
}
