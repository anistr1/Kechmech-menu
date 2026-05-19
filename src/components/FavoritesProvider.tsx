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

/** Runtime guard: ensures localStorage data matches the expected shape before trusting it */
function isValidFavorites(data: unknown): data is FavoriteItem[] {
  if (!Array.isArray(data)) return false;
  return data.every((item) => {
    if (typeof item !== 'object' || item === null) return false;
    const rec = item as Record<string, unknown>;
    return (
      typeof rec.slug === 'string' &&
      rec.slug.length > 0 &&
      typeof rec.categorySlug === 'string'
    );
  });
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const isLoaded = useRef(false);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount (localStorage persists across tabs & visits)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (isValidFavorites(parsed)) {
          setFavorites(parsed);
        } else {
          // Corrupted or tampered data — wipe it
          localStorage.removeItem(STORAGE_KEY);
          console.warn('Favorites data was invalid and has been reset.');
        }
      }
      // Also migrate any existing sessionStorage data from before this fix
      const sessionStored = sessionStorage.getItem('kechmech_favorites');
      if (sessionStored) {
        const parsed: unknown = JSON.parse(sessionStored);
        const sessionFavs = isValidFavorites(parsed) ? parsed : [];
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

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastMessage(null), 2000);
  };

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.slug === item.slug)) return prev;
      return [...prev, item];
    });
    showToast('Ajouté aux favoris ♥');
  };

  const removeFavorite = (slug: string) => {
    setFavorites((prev) => prev.filter((f) => f.slug !== slug));
    showToast('Retiré des favoris');
  };

  const isFavorite = (slug: string) => {
    return favorites.some((f) => f.slug === slug);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-deep-charcoal text-vibrant-yellow border-[3px] border-vibrant-yellow font-libre-franklin font-bold px-6 py-3 rounded-full z-[100] animate-slide-up-fade text-[14px] uppercase tracking-wide">
          {toastMessage}
        </div>
      )}
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
