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
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full bg-surface px-6 py-12 relative overflow-hidden">
      
      {/* Decorative top border for Neo-Brutal framing */}
      <div className="absolute top-0 left-0 w-full h-3 bg-vibrant-yellow border-b-[3px] border-deep-charcoal" />

      {/* Logo */}
      <div className="mb-10 w-[240px] h-[240px] relative flex-shrink-0 z-10">
        <Image
          src={logoUrl || '/logo.png'}
          alt={restaurantName}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Hero Image / Typographic Fallback */}
      <div className="w-full max-w-[360px] aspect-[4/3] relative rounded-[4px] border-[3px] border-deep-charcoal overflow-hidden mb-12 bg-vibrant-yellow flex-shrink-0">
        {splashImageUrl ? (
          <Image src={splashImageUrl} alt="Kechmech Menu" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center border-t-[3px] border-deep-charcoal -mt-[3px]">
            {/* The -mt-[3px] trick hides the extra border if there's no image, keeping it clean */}
            <span className="font-anton text-deep-charcoal text-[42px] leading-none uppercase mb-2">Street Food</span>
            <span className="font-libre-franklin text-deep-charcoal font-bold tracking-[0.15em] text-sm uppercase">100% Tunisien</span>
          </div>
        )}
      </div>

      {/* Tagline */}
      <h2 className="font-anton text-[40px] leading-[1.1] tracking-wide text-deep-charcoal mb-10 text-center uppercase">
        {tagline}
      </h2>

      {/* High-Craft Pill Button */}
      <Link 
        href={`/menu/${firstCategorySlug}`}
        className="group relative w-full max-w-[340px] bg-deep-charcoal text-vibrant-yellow font-anton text-[22px] tracking-wider uppercase py-4 px-6 rounded-full flex items-center justify-between border-[3px] border-deep-charcoal hover:bg-surface hover:text-deep-charcoal active:scale-[0.98] transition-all duration-200"
      >
        <span className="pl-2">{ctaText}</span>
        <span className="bg-vibrant-yellow text-deep-charcoal rounded-full p-2 group-hover:bg-deep-charcoal group-hover:text-vibrant-yellow transition-colors duration-200">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </span>
      </Link>
    </div>
  );
}
