import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Limits each IP to a fixed number of requests per time window.
 * This runs at the edge on Vercel, before any serverless function
 * or Sanity query is executed — blocking abuse early.
 *
 * Note: In-memory state is per-instance and resets on cold starts.
 * This is fine for a restaurant menu — it stops casual abuse and
 * scripted attacks without needing Redis or external services.
 */

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_API = 30; // 30 requests/min to /api/*
const MAX_REQUESTS_PAGES = 60; // 60 requests/min to dynamic pages

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}

function isRateLimited(key: string, maxRequests: number): boolean {
  cleanup();

  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > maxRequests;
}

function getClientIp(request: NextRequest): string {
  // Vercel sets x-forwarded-for; fallback to x-real-ip or a default
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);

  // --- Rate-limit API routes (tighter limit) ---
  if (pathname.startsWith('/api/')) {
    const key = `api:${ip}`;
    if (isRateLimited(key, MAX_REQUESTS_API)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }

  // Menu pages are statically generated (generateStaticParams) and served from cache.
  // We no longer rate-limit them because doing so blocks Next.js prefetch requests
  // which are essential for instant navigation.

  return NextResponse.next();
}

// Only run middleware on routes that hit Sanity or serverless functions
export const config = {
  matcher: [
    '/api/:path*',
    '/menu/:path*',
  ],
};
