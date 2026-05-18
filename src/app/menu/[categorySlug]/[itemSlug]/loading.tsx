import React from 'react';
import { BackButton } from '@/components/ui/BackButton';

export default function LoadingItem() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 w-full p-4 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <BackButton />
        </div>
        <div className="w-11 h-11 rounded-full bg-surface-variant animate-pulse border-2 border-deep-charcoal" />
      </div>

      {/* Hero Image Skeleton */}
      <div className="w-full aspect-square relative border-b-2 border-deep-charcoal bg-surface-variant animate-pulse -mt-[76px]">
      </div>

      {/* Content Section Skeleton */}
      <div className="px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4 space-y-3">
            {/* Title Skeleton */}
            <div className="h-8 bg-surface-variant rounded-md animate-pulse w-3/4 border-2 border-surface-variant" />
            {/* Badge Skeleton */}
            <div className="h-6 bg-surface-variant rounded-md animate-pulse w-1/4 border-2 border-surface-variant" />
          </div>
          {/* Price Tag Skeleton */}
          <div className="flex-shrink-0">
            <div className="h-10 w-24 bg-surface-variant rounded-md animate-pulse border-2 border-deep-charcoal" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="mt-4 space-y-3">
          <div className="h-4 bg-surface-variant rounded-md animate-pulse w-full" />
          <div className="h-4 bg-surface-variant rounded-md animate-pulse w-5/6" />
          <div className="h-4 bg-surface-variant rounded-md animate-pulse w-4/6" />
        </div>
      </div>
    </main>
  );
}
