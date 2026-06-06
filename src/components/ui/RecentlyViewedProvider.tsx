'use client';

import { useEffect } from 'react';

interface RecentItem {
  slug: string;
  categorySlug: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export function RecentlyViewedProvider({ item }: { item: RecentItem }) {
  useEffect(() => {
    try {
      const RECENT_KEY = 'kechmech_recent_v1';
      const maxItems = 5;
      
      const stored = localStorage.getItem(RECENT_KEY);
      let items: RecentItem[] = stored ? JSON.parse(stored) : [];
      
      // Remove if it exists
      items = items.filter(i => i.slug !== item.slug);
      
      // Prepend current item
      items.unshift(item);
      
      // Keep only maxItems
      if (items.length > maxItems) {
        items = items.slice(0, maxItems);
      }
      
      localStorage.setItem(RECENT_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving to recently viewed:', error);
    }
  }, [item.slug, item.categorySlug, item.name, item.price, item.imageUrl]);

  return null;
}
