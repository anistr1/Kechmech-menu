'use client';

import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';

function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  // Skip Lenis on touch/mobile devices — native scroll is smoother and
  // doesn't interfere with tap events on iOS Safari (iPhone 7 etc.)
  if (isTouch) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
