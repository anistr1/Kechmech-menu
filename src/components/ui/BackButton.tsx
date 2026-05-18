"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = 'RETOUR' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
          router.back();
        } else {
          router.push('/menu');
        }
      }}
      className="flex items-center gap-2 bg-white text-deep-charcoal border-2 border-deep-charcoal rounded-full px-5 py-2 hover:bg-deep-charcoal hover:text-white transition-colors active:scale-95 min-h-[44px]"
      aria-label="Retour à la page précédente"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5"></path>
        <path d="m12 19-7-7 7-7"></path>
      </svg>
      <span className="font-anton text-[18px] leading-none mt-1">{label}</span>
    </button>
  );
}
