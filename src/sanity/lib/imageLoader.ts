export default function sanityLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // Handle local images (e.g., /logo.png)
  if (!src.startsWith('http')) {
    return src; 
  }

  // Handle Sanity images
  if (src.includes('cdn.sanity.io')) {
    const url = new URL(src);
    url.searchParams.set('auto', 'format'); // Automatically convert to WebP/AVIF
    url.searchParams.set('fit', 'max');
    url.searchParams.set('w', width.toString()); // Request exact width needed by Next.js
    url.searchParams.set('q', (quality || 75).toString()); // Apply compression
    return url.href;
  }

  // Fallback for any other external images
  return src;
}
