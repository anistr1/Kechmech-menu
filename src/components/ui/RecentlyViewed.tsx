'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RecentItem {
  slug: string;
  categorySlug: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export function RecentlyViewed() {
  const [items, setItems] = useState<RecentItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem('kechmech_recent_v1');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    }
  }, []);

  if (!isMounted || items.length < 2) {
    return null; // Don't show if 0 or 1 items
  }

  return (
    <div className="w-full mt-4 mb-8">
      <div className="px-5 mb-4 flex items-center justify-between border-b-[3px] border-deep-charcoal pb-2">
        <h2 className="font-anton text-[22px] uppercase tracking-wide text-deep-charcoal leading-none">
          Récemment consultés
        </h2>
      </div>
      
      <div className="w-full overflow-x-auto no-scrollbar pb-4 pl-5 relative z-10">
        <div className="flex gap-4 pr-5 w-max">
          {items.map((item) => (
            <Link 
              key={item.slug}
              href={`/menu/${item.categorySlug}/${item.slug}`}
              className="flex flex-col w-[120px] flex-shrink-0 group active:scale-[0.98] transition-all duration-200"
            >
              <div className="w-[120px] h-[120px] rounded-[4px] border-[3px] border-deep-charcoal bg-vibrant-yellow overflow-hidden relative mb-2 shadow-[2px_2px_0_0_#1A1A1A] group-hover:-translate-y-[2px] group-hover:-translate-x-[2px] group-hover:shadow-[4px_4px_0_0_#1A1A1A] transition-all">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-anton text-4xl text-deep-charcoal/30 uppercase">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-anton text-[14px] leading-tight text-deep-charcoal uppercase line-clamp-1 mb-0.5">
                {item.name}
              </h3>
              <span className="font-libre-franklin font-bold text-[13px] text-price-green bg-price-bg px-1 rounded border border-price-border self-start">
                {item.price.toFixed(2).replace('.', ',')} DT
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
