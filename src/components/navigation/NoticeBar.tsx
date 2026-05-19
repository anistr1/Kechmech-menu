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
      {/* Home Button */}
      <Link 
        href="/menu"
        className="text-vibrant-yellow hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Retour à l'accueil"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </Link>

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
