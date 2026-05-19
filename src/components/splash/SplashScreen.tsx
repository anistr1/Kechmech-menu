'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SplashScreenProps {
  restaurantName?: string;
  logoUrl?: string;
  tagline?: string;
  ctaText?: string;
  firstCategorySlug?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
}

export function SplashScreen({
  restaurantName = 'KECHMECH',
  logoUrl,
  tagline = 'Bienvenue',
  ctaText = 'VOIR NOTRE MENU',
  firstCategorySlug = 'baguette-farcie',
  instagramUrl = 'https://www.instagram.com/kechmech.tn/',
  facebookUrl = 'https://www.facebook.com/kechmech.tn/',
  tiktokUrl = 'https://www.tiktok.com/@kechmech.tn'
}: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    setIsExiting(true);
    
    // Wait for the exit animation to play out before routing
    setTimeout(() => {
      router.push(`/menu/${firstCategorySlug}`);
    }, 450);
  };

  // Split tagline for staggered letter animation, grouping by words
  let charIndex = 0;
  const taglineWords = tagline.split(' ').map(word => {
    const letters = word.split('').map(char => ({
      char,
      index: charIndex++
    }));
    charIndex++; // account for space
    return letters;
  });

  // Marquee text array to repeat
  const marqueeItems = Array(12).fill(`${restaurantName} • FRESH & TASTY • `);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full bg-surface px-6 py-12 relative overflow-hidden">
      
      {/* Background Marquee */}
      <div 
        className={`absolute inset-0 z-0 flex flex-col justify-around opacity-40 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExiting ? 'scale-110 opacity-0 blur-sm' : ''}`}
        aria-hidden="true"
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="whitespace-nowrap flex overflow-hidden">
            <div 
              className="animate-marquee-bg flex" 
              style={{ 
                animationDirection: i % 2 === 1 ? 'reverse' : 'normal',
                animationDuration: i % 2 === 1 ? '85s' : '100s' // much slower
              }}
            >
              <span className="text-[100px] md:text-[140px] font-anton text-surface-variant uppercase whitespace-nowrap tracking-wider select-none leading-none">
                {marqueeItems.join('')}
              </span>
            </div>
          </div>
        ))}
      </div>



      {/* Decorative Wavy Top Border for Neo-Brutal framing */}
      <div className="absolute top-0 left-0 w-full h-[14px] z-20">
        <svg className="w-full h-full" aria-hidden="true">
          <defs>
            <pattern id="wavy-pattern" x="0" y="0" width="48" height="14" patternUnits="userSpaceOnUse">
              <path 
                d="M0,0 L48,0 L48,6 Q36,14 24,6 Q12,-2 0,6 Z" 
                fill="var(--color-vibrant-yellow)" 
              />
              <path 
                d="M0,6 Q12,-2 24,6 Q36,14 48,6" 
                fill="none" 
                stroke="var(--color-deep-charcoal)" 
                strokeWidth="3" 
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#wavy-pattern)" />
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[400px]">

        {/* Logo */}
        <div 
          className={`mb-10 w-[240px] h-[240px] relative flex-shrink-0 animate-scale-fade transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExiting ? '-translate-y-16 scale-90 opacity-0' : ''}`} 
          style={{ animationDelay: '100ms' }}
        >
          <div className="w-full h-full animate-pulse-subtle">
            <Image
              src={logoUrl || '/logo.png'}
              alt={restaurantName}
              fill
              sizes="240px"
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Tagline & Brush Line Wrapper */}
        <div className={`relative mb-10 w-full flex flex-col items-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExiting ? 'translate-y-8 opacity-0 scale-95 blur-[2px]' : ''}`}>
          {/* Tagline - Staggered Reveal */}
          <h2 className="relative z-10 font-handwritten text-[34px] sm:text-[42px] md:text-[50px] font-bold leading-[1.1] text-deep-charcoal text-center flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-1 md:gap-y-2">
            {taglineWords.map((word, wIdx) => (
              <span key={wIdx} className="flex flex-nowrap">
                {word.map((letter, lIdx) => (
                  <span
                    key={lIdx}
                    className="inline-block animate-slide-up-fade"
                    style={{ 
                      animationDelay: `${200 + (letter.index * 35)}ms`,
                      transformOrigin: 'bottom center',
                      transform: `rotate(${letter.index % 2 === 0 ? '-1deg' : '1deg'})`
                    }}
                  >
                    {letter.char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          
          {/* SVG Hand Brush Line */}
          <svg 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[110%] max-w-[280px] sm:max-w-[340px] md:max-w-[400px] h-[12px] sm:h-[14px] text-vibrant-yellow -z-10 animate-draw-line" 
            viewBox="0 0 200 20" 
            preserveAspectRatio="none" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path 
              d="M 5 15 Q 100 2 195 15" 
              stroke="currentColor" 
              strokeWidth="7" 
              strokeLinecap="round" 
              className="stroke-current" 
            />
          </svg>
        </div>

        {/* High-Craft Pill Button */}
        <Link
          href={`/menu/${firstCategorySlug}`}
          onClick={handleMenuClick}
          aria-label={`${ctaText} — parcourir le menu de ${restaurantName}`}
          className={`group relative w-full bg-deep-charcoal text-vibrant-yellow font-anton text-[22px] tracking-wider uppercase py-4 px-6 rounded-full flex items-center justify-between border-[3px] border-deep-charcoal transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] animate-slide-up-fade ${
            isExiting ? 'translate-y-16 opacity-0 scale-[0.85]' : 
            isLoading ? 'opacity-90 pointer-events-none' : 
            'hover:bg-vibrant-yellow hover:text-deep-charcoal hover:-translate-y-[2px] active:scale-[0.98] active:translate-y-0'
          }`}
          style={{ animationDelay: '400ms' }}
        >
          <span className="pl-2 transition-transform duration-300 group-hover:translate-x-1">{isLoading ? 'CHARGEMENT...' : ctaText}</span>
          <span className={`bg-vibrant-yellow text-deep-charcoal rounded-full p-2 transition-all duration-300 ${isLoading ? '' : 'group-hover:bg-deep-charcoal group-hover:text-vibrant-yellow group-hover:-rotate-45'}`}>
            {isLoading ? (
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            )}
          </span>
        </Link>

        {/* Social Media Bar */}
        <footer
          className={`w-full max-w-[340px] mt-12 flex flex-col items-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] animate-slide-up-fade ${isExiting ? 'translate-y-24 opacity-0 scale-90' : ''}`}
          style={{ animationDelay: '550ms' }}
        >
          <p className="font-libre-franklin text-sm font-bold uppercase tracking-widest text-deep-charcoal mb-2">
            Suivez Nous
          </p>
          <div className="flex items-center justify-center gap-8 py-3">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez Kechmech sur Instagram"
                className="text-deep-charcoal hover:text-vibrant-yellow transition-transform duration-200 hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            )}
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez Kechmech sur Facebook"
                className="text-deep-charcoal hover:text-vibrant-yellow transition-transform duration-200 hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
            {tiktokUrl && (
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez Kechmech sur TikTok"
                className="text-deep-charcoal hover:text-vibrant-yellow transition-transform duration-200 hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
