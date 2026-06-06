import React from 'react';
import Link from 'next/link';

interface NoticeBarProps {
  marqueeText?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
}

export function NoticeBar({
  marqueeText = '✨ BIENVENUE CHEZ KECHMECH — STREET FOOD 100% TUNISIEN ✨',
  instagramUrl = 'https://www.instagram.com/kechmech.tn/',
  facebookUrl = 'https://www.facebook.com/kechmech.tn/',
  tiktokUrl = 'https://www.tiktok.com/@kechmech.tn'
}: NoticeBarProps) {
  return (
    <div className="w-full bg-deep-charcoal text-vibrant-yellow px-5 py-0 flex items-center justify-between z-50 relative">
      {/* Home and Favoris Buttons */}
      <div className="flex items-center gap-1 sm:gap-4">
        <Link 
          href="/menu"
          prefetch={false}
          className="text-vibrant-yellow hover:text-white transition-colors min-h-[44px] px-2 flex items-center justify-center gap-2"
          aria-label="Retour à l'accueil"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="font-anton uppercase tracking-wider text-[16px] leading-none mt-1 hidden sm:block">Accueil</span>
        </Link>
        <Link 
          href="/menu/favoris"
          prefetch={false}
          className="text-favorite-active hover:text-red-400 transition-colors min-h-[44px] px-2 flex items-center justify-center gap-2"
          aria-label="Favoris"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="font-anton uppercase tracking-wider text-[16px] leading-none mt-1 hidden sm:block">Favoris</span>
        </Link>
      </div>

      {/* Marquee Text */}
      <div className="flex-1 overflow-hidden relative mx-4 flex items-center h-full">
        <div className="flex animate-marquee whitespace-nowrap w-max will-change-transform">
          <span className="pr-8 font-libre-franklin text-[13px] tracking-widest uppercase font-semibold">
            {marqueeText}
          </span>
          <span className="pr-8 font-libre-franklin text-[13px] tracking-widest uppercase font-semibold" aria-hidden="true">
            {marqueeText}
          </span>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex items-center gap-5">
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        )}
        {facebookUrl && (
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        )}
        {tiktokUrl && (
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
