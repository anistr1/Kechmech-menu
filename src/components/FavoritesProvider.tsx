'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoriteItem {
  slug: string;
  categorySlug: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('kechmech_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
  }, []);

  // Save to sessionStorage when favorites change
  useEffect(() => {
    try {
      sessionStorage.setItem('kechmech_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  }, [favorites]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.slug === item.slug)) return prev;
      return [...prev, item];
    });
  };

  const removeFavorite = (slug: string) => {
    setFavorites((prev) => prev.filter((f) => f.slug !== slug));
  };

  const isFavorite = (slug: string) => {
    return favorites.some((f) => f.slug === slug);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
