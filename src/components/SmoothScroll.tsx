'use client';

/**
 * SmoothScroll — fully disabled.
 *
 * Lenis was previously used for smooth desktop scrolling but it hijacks
 * touch events and breaks taps on buttons/links on iOS Safari (iPhone 7).
 * Even with conditional rendering, Lenis briefly mounts during hydration
 * before the useEffect can detect a touch device, leaving behind ghost
 * event listeners.
 *
 * Native scrolling is perfectly smooth on both desktop and mobile for a
 * restaurant menu. Re-enable Lenis in the future only if truly needed,
 * and gate it behind `next/dynamic` with `ssr: false` to avoid the
 * hydration mount/unmount issue.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
