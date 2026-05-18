'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

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

const STORAGE_KEY = 'kechmech_favorites';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const isLoaded = useRef(false);

  // Load from localStorage on mount (localStorage persists across tabs & visits)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
      // Also migrate any existing sessionStorage data from before this fix
      const sessionStored = sessionStorage.getItem('kechmech_favorites');
      if (sessionStored) {
        const sessionFavs: FavoriteItem[] = JSON.parse(sessionStored);
        if (sessionFavs.length > 0) {
          setFavorites((prev) => {
            const merged = [...prev];
            for (const item of sessionFavs) {
              if (!merged.some((f) => f.slug === item.slug)) {
                merged.push(item);
              }
            }
            return merged;
          });
        }
        // Clean up old sessionStorage key
        sessionStorage.removeItem('kechmech_favorites');
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
    isLoaded.current = true;
  }, []);

  // Save to localStorage when favorites change — but only after initial load
  useEffect(() => {
    if (!isLoaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
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
