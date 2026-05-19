import React from 'react';

/**
 * Category page loading skeleton.
 * Shows immediately when navigating between categories,
 * eliminating the blank-screen flash during server render.
 */
export default function LoadingCategory() {
  return (
    <main className="min-h-screen bg-surface pb-12">
      {/* Category Header Skeleton */}
      <div className="w-full px-5 pt-8 pb-4">
        <div className="h-9 bg-surface-variant rounded-md animate-pulse w-2/5 border-2 border-surface-variant" />
      </div>

      {/* Item Grid Skeleton — matches ItemList's 2-column mobile grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-full px-4 mb-8 pt-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col w-full bg-white border-[3px] border-surface-variant rounded-[4px] overflow-hidden"
          >
            {/* Image placeholder */}
            <div className="w-full aspect-square bg-surface-variant animate-pulse" />
            {/* Content placeholder */}
            <div className="p-2.5 flex flex-col gap-2">
              <div className="h-4 bg-surface-variant rounded animate-pulse w-3/4" />
              <div className="h-3 bg-surface-variant rounded animate-pulse w-full" />
              <div className="flex justify-between items-center pt-1">
                <div className="h-6 w-16 bg-surface-variant rounded animate-pulse" />
                <div className="h-8 w-8 bg-surface-variant rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
