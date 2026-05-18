import React from 'react';

interface PriceTagProps {
  price: number;
  size?: 'md' | 'lg';
}

export function PriceTag({ price, size = 'md' }: PriceTagProps) {
  const formattedPrice = price.toString().replace('.', ',');
  
  return (
    <span 
      className={`font-libre-franklin font-bold text-price-green whitespace-nowrap
        ${size === 'lg' ? 'text-[28px]' : 'text-[22px]'}`}
    >
      {formattedPrice} DT
    </span>
  );
}
