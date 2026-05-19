'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to console in dev; swap for a monitoring service (Sentry, etc.) in prod
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="font-anton text-[120px] leading-none text-tertiary [text-shadow:4px_4px_0_#1A1A1A] select-none mb-2">
        Oops
      </span>

      <h1 className="font-anton text-[28px] uppercase tracking-wide text-deep-charcoal mb-3">
        Une erreur est survenue
      </h1>

      <p className="font-libre-franklin text-[16px] text-on-surface-variant max-w-[280px] mb-8 leading-relaxed">
        Quelque chose s&apos;est mal passé. Réessayez ou retournez au menu.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="bg-deep-charcoal text-vibrant-yellow font-anton text-[18px] uppercase tracking-wider px-8 py-3 rounded-full border-[3px] border-deep-charcoal hover:bg-vibrant-yellow hover:text-deep-charcoal transition-colors"
        >
          Réessayer
        </button>
        <Link
          href="/menu"
          className="bg-white text-deep-charcoal font-anton text-[18px] uppercase tracking-wider px-8 py-3 rounded-full border-[3px] border-deep-charcoal hover:bg-surface-variant transition-colors"
        >
          Retour au menu
        </Link>
      </div>
    </main>
  );
}
