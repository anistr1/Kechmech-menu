import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 py-16 text-center">
      {/* Big bold 404 */}
      <span className="font-anton text-[120px] leading-none text-vibrant-yellow [text-shadow:4px_4px_0_#1A1A1A] select-none mb-2">
        404
      </span>

      <h1 className="font-anton text-[28px] uppercase tracking-wide text-deep-charcoal mb-3">
        Page introuvable
      </h1>

      <p className="font-libre-franklin text-[16px] text-on-surface-variant max-w-[280px] mb-8 leading-relaxed">
        Cette page n&apos;existe pas ou a été déplacée. Retournez au menu pour continuer.
      </p>

      <Link
        href="/menu"
        className="bg-deep-charcoal text-vibrant-yellow font-anton text-[18px] uppercase tracking-wider px-8 py-3 rounded-full border-[3px] border-deep-charcoal hover:bg-vibrant-yellow hover:text-deep-charcoal transition-colors"
      >
        Retour au menu
      </Link>
    </main>
  );
}
