import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Kechmech | Bientôt Disponible',
  description: 'Le nouveau fast-casual Tunisien ouvre bientôt ses portes.',
};

export default function Home() {
  const marqueeItems = Array(6).fill('KECHMECH • PROCHAINEMENT • ');

  return (
    <main className="flex flex-col items-center justify-center min-h-[100dvh] w-full bg-surface px-6 py-12 relative overflow-hidden">
      
      {/* Background Marquee (Inspired by Splash) */}
      <div 
        className="absolute inset-0 z-0 flex flex-col justify-around opacity-40 pointer-events-none"
        aria-hidden="true"
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="whitespace-nowrap flex overflow-hidden">
            <div 
              className="animate-marquee-bg flex will-change-transform" 
              style={{ 
                animationDirection: i % 2 === 1 ? 'reverse' : 'normal',
                animationDuration: i % 2 === 1 ? '85s' : '100s'
              }}
            >
              <span className="text-[100px] md:text-[140px] font-anton text-surface-variant uppercase whitespace-nowrap tracking-wider select-none leading-none">
                {marqueeItems.join('')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="z-10 flex flex-col items-center text-center max-w-[400px] w-full">
        
        {/* Logo */}
        <div className="mb-10 w-[240px] h-[240px] relative flex-shrink-0 animate-scale-fade" style={{ animationDelay: '200ms' }}>
          <div className="w-full h-full animate-pulse-subtle">
            <Image
              src="/logo.png"
              alt="Kechmech Logo"
              fill
              sizes="240px"
              priority
              className="object-contain"
              unoptimized
            />
          </div>
          <h1 className="sr-only">Kechmech</h1>
        </div>
        
        {/* Tagline & Brush Line Wrapper (Inspired by Splash) */}
        <div className="relative mb-12 w-full flex flex-col items-center animate-slide-up-fade" style={{ animationDelay: '300ms' }}>
          <h2 className="relative z-10 font-handwritten text-[34px] sm:text-[42px] md:text-[50px] font-bold leading-[1.1] text-deep-charcoal text-center flex flex-wrap justify-center">
            Préparez-vous
          </h2>
          
          {/* SVG Hand Brush Line */}
          <svg 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[110%] max-w-[280px] h-[12px] sm:h-[14px] text-vibrant-yellow -z-10 animate-draw-line" 
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

        {/* Subtitle / Details */}
        <p className="font-libre-franklin text-xl font-bold text-deep-charcoal animate-slide-up-fade" style={{ animationDelay: '400ms' }}>
          Le compte à rebours a commencé.
        </p>
        <p className="font-libre-franklin text-base text-on-surface-variant mt-2 animate-slide-up-fade" style={{ animationDelay: '460ms' }}>
          Les baguettes se préparent, le makloub mijote. L'ouverture approche.
        </p>
      </div>

      {/* Social Media Bar (Inspired by Splash) */}
      <footer
        className="w-full max-w-[340px] mt-16 z-10 flex flex-col items-center animate-slide-up-fade"
        style={{ animationDelay: '500ms' }}
      >
        <p className="font-libre-franklin text-sm font-bold uppercase tracking-widest text-deep-charcoal mb-2">
          Suivez Nous
        </p>
        <div className="flex items-center justify-center gap-8 py-3">
          <a
            href="https://www.instagram.com/kechmech.tn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez Kechmech sur Instagram"
            className="text-deep-charcoal hover:text-vibrant-yellow transition-transform duration-200 hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/kechmech.tn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez Kechmech sur Facebook"
            className="text-deep-charcoal hover:text-vibrant-yellow transition-transform duration-200 hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@kechmech.tn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez Kechmech sur TikTok"
            className="text-deep-charcoal hover:text-vibrant-yellow transition-transform duration-200 hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
