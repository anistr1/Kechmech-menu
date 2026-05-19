"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface BackButtonProps {
  label?: string;
  /**
   * Explicit fallback href used when there is no in-app navigation history.
   * Defaults to the category page derived from the current pathname, or /menu.
   */
  fallbackHref?: string;
}

/**
 * BackButton — navigates back within the app.
 *
 * `window.history.length > 1` is unreliable because it includes entries from
 * other sites in the same tab session. We instead track whether the user came
 * from inside this app by checking `document.referrer` against the current
 * origin at click time — no extra state or context needed.
 */
export function BackButton({ label = 'RETOUR', fallbackHref }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handledRef = React.useRef(false);

  // Derive a sensible fallback: for /menu/cat/item → /menu/cat, else /menu
  const derivedFallback =
    fallbackHref ??
    (() => {
      const segments = pathname.split('/').filter(Boolean);
      // ['menu', 'categorySlug', 'itemSlug'] → go up one level
      if (segments.length >= 3) return `/${segments.slice(0, -1).join('/')}`;
      return '/menu';
    })();

  const handleBack = () => {
    // Double-fire guard: touchend fires before click on iOS
    if (handledRef.current) return;
    handledRef.current = true;
    setTimeout(() => { handledRef.current = false; }, 400);

    const referrer = typeof document !== 'undefined' ? document.referrer : '';
    const isInternalReferrer =
      referrer.length > 0 && referrer.startsWith(window.location.origin);

    if (isInternalReferrer) {
      router.back();
    } else {
      router.push(derivedFallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      onTouchEnd={(e) => {
        // iOS Safari 15.x workaround: click events can be swallowed
        // on elements inside pointer-events-none/auto containers with transitions
        e.preventDefault();
        handleBack();
      }}
      className="flex items-center gap-2 bg-white text-deep-charcoal border-2 border-deep-charcoal rounded-full px-5 py-2 hover:bg-deep-charcoal hover:text-white transition-colors active:scale-95 min-h-[44px]"
      aria-label="Retour à la page précédente"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5"></path>
        <path d="m12 19-7-7 7-7"></path>
      </svg>
      <span className="font-anton text-[18px] leading-none mt-1">{label}</span>
    </button>
  );
}
