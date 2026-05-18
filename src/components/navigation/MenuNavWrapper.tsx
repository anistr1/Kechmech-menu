'use client';

import { usePathname } from 'next/navigation';

interface MenuNavWrapperProps {
  children: React.ReactNode;
}

/**
 * Client wrapper that shows the navigation only on category/browse pages.
 * Hides it on the splash screen (/menu) and item detail pages (/menu/x/y).
 */
export function MenuNavWrapper({ children }: MenuNavWrapperProps) {
  const pathname = usePathname();
  
  // Hide nav on the splash screen
  if (pathname === '/menu') return null;
  
  // Hide nav on item detail pages (pattern: /menu/categorySlug/itemSlug)
  const segments = pathname.split('/').filter(Boolean); // ['menu', 'categorySlug', 'itemSlug']
  if (segments.length > 2) return null;
  
  return <>{children}</>;
}
