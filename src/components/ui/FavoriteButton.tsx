'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/components/FavoritesProvider';

interface FavoriteButtonProps {
  slug: string;
  categorySlug: string;
  className?: string;
  iconClassName?: string;
  variant?: 'brutal' | 'ghost';
}

export function FavoriteButton({ 
  slug, 
  categorySlug, 
  className = '', 
  iconClassName = 'w-7 h-7',
  variant = 'brutal'
}: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(slug);
  const handledRef = React.useRef(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Scroll-velocity gating: track where the finger started so we can
  // distinguish a deliberate tap from an accidental scroll-graze.
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const MOVE_THRESHOLD = 10; // px — anything beyond this is a scroll

  const handleToggle = () => {
    // Double-fire guard: touchend fires before click on iOS
    if (handledRef.current) return;
    handledRef.current = true;
    setTimeout(() => { handledRef.current = false; }, 400);

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (favorite) {
      removeFavorite(slug);
    } else {
      addFavorite({ slug, categorySlug });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Stop the click from reaching any parent Link
    e.preventDefault();
    e.stopPropagation();
    handleToggle();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If the finger moved more than the threshold, the user was scrolling — bail out.
    if (touchStartRef.current && e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      const dx = Math.abs(touch.clientX - touchStartRef.current.x);
      const dy = Math.abs(touch.clientY - touchStartRef.current.y);
      if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
        touchStartRef.current = null;
        return; // scroll detected — don't toggle
      }
    }
    touchStartRef.current = null;
    handleToggle();
  };

  const baseClasses = "rounded-full flex items-center justify-center transition-colors min-w-[44px] min-h-[44px]";
  
  const variantClasses = {
    brutal: "p-2 bg-white border-[2px] border-deep-charcoal hover:bg-surface-variant active:scale-[0.97] transition-all",
    ghost: "p-2 hover:bg-surface-hover active:scale-[0.97] transition-all"
  };

  const heartClasses = variant === 'brutal'
    ? favorite ? 'fill-favorite-active text-favorite-active' : 'text-deep-charcoal'
    : favorite ? 'fill-favorite-active text-favorite-active' : 'text-on-surface-variant hover:text-deep-charcoal';

  return (
    <button 
      type="button"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart 
        className={`transition-colors ${iconClassName} ${heartClasses} ${isAnimating ? 'animate-heart-pop' : ''}`} 
      />
    </button>
  );
}
