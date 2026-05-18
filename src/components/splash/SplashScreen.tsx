import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SplashScreenProps {
  restaurantName?: string;
  logoUrl?: string;
  splashImageUrl?: string;
  tagline?: string;
  ctaText?: string;
  firstCategorySlug?: string;
}

export function SplashScreen({
  restaurantName = 'KECHMECH',
  logoUrl,
  splashImageUrl,
  tagline = 'Bienvenue',
  ctaText = 'VOIR NOTRE MENU',
  firstCategorySlug = 'baguette-farcie'
}: SplashScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-surface px-6 py-8">
      {/* Logo */}
      <div className="mb-6 w-[220px] h-[220px] relative flex-shrink-0">
        <Image
          src={logoUrl || '/logo.png'}
          alt={restaurantName}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-[340px] aspect-[4/3] relative rounded-md border-heavy border-deep-charcoal overflow-hidden mb-8 shadow-sm">
        {splashImageUrl ? (
          <Image src={splashImageUrl} alt="Kechmech Menu" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-surface-variant flex items-center justify-center">
            <span className="font-anton text-deep-charcoal opacity-50 text-xl">Image Menu</span>
          </div>
        )}
      </div>

      {/* Tagline */}
      <h2 className="font-anton text-display-lg text-deep-charcoal mb-10 text-center uppercase">
        {tagline}
      </h2>

      {/* CTA Button */}
      <Link 
        href={`/menu/${firstCategorySlug}`}
        className="w-full max-w-[320px] bg-deep-charcoal text-vibrant-yellow font-anton text-title-md py-4 px-6 rounded-full flex items-center justify-center gap-3 hover:scale-95 active:scale-90 transition-transform shadow-[4px_4px_0px_#FFCE00]"
      >
        <span>{ctaText}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </Link>
    </div>
  );
}
