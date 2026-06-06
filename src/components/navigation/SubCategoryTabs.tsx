'use client';

import React, { useState, useEffect, useRef, useCallback, useId } from 'react';

interface SubCategory {
  _id: string;
  title: string;
  slug: string;
  tabLabel?: string;
  baseDescription?: string;
  supplements?: { _id: string; name: string; price: number }[];
  compositionTitle?: string;
  compositionSize?: string;
  compositionSubtitle?: string;
  compositionCombos?: { count: number; price: number }[];
  compositionChoices?: string[];
}

interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface SubCategoryTabsProps {
  /** The parent category info */
  parentCategory: {
    title: string;
    slug: string;
    tabLabel?: string;
    baseDescription?: string;
    supplements?: { _id: string; name: string; price: number }[];
  };
  /** The child sub-categories */
  subCategories: SubCategory[];
  /** Pre-fetched items keyed by sub-category slug */
  itemsBySubCategory: Record<string, MenuItem[]>;
}

import { ItemList } from '../menu/ItemList';
import { SupplementSection } from '../menu/SupplementSection';
import { FamilialVisual } from '../menu/FamilialVisual';

export function SubCategoryTabs({
  parentCategory,
  subCategories,
  itemsBySubCategory,
}: SubCategoryTabsProps) {
  // useId() is stable across server/client, preventing hydration mismatches.
  // We strip colons because older iOS Safari (iPhone 7) can't handle them in ARIA attributes.
  const rawId = useId();
  const instanceId = `sct-${rawId.replace(/:/g, '')}`;

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scroll-detection: same guard used in FavoriteButton.
  // One slot per tab so concurrent touches on different tabs don't interfere.
  const touchStartRef = useRef<({ x: number; y: number } | null)[]>([]);
  const MOVE_THRESHOLD = 10; // px — anything beyond this is a scroll

  // Build tab list: parent first (if it has its own items), then children
  const parentHasItems = (itemsBySubCategory[parentCategory.slug] ?? []).length > 0;

  const tabs = [
    ...(parentHasItems
      ? [
        {
          _id: 'parent',
          slug: parentCategory.slug,
          label: parentCategory.tabLabel || parentCategory.title,
          baseDescription: parentCategory.baseDescription,
          supplements: parentCategory.supplements,
          compositionTitle: undefined as string | undefined,
          compositionSize: undefined as string | undefined,
          compositionSubtitle: undefined as string | undefined,
          compositionCombos: undefined as { count: number; price: number }[] | undefined,
          compositionChoices: undefined as string[] | undefined,
        },
      ]
      : []),
    ...subCategories.map((sc) => ({
      _id: sc._id,
      slug: sc.slug,
      label: sc.tabLabel || sc.title,
      baseDescription: sc.baseDescription,
      supplements: sc.supplements,
      compositionTitle: sc.compositionTitle,
      compositionSize: sc.compositionSize,
      compositionSubtitle: sc.compositionSubtitle,
      compositionCombos: sc.compositionCombos,
      compositionChoices: sc.compositionChoices,
    })),
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]?.slug ?? '');

  useEffect(() => {
    if (tabs.length > 0 && !tabs.find((t) => t.slug === activeTab)) {
      setActiveTab(tabs[0].slug);
    }
  }, [tabs, activeTab]);

  // WAI-ARIA: arrow key navigation between tabs
  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, tabIndex: number) => {
      let nextIndex: number | null = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (tabIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (tabIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        setActiveTab(tabs[nextIndex].slug);
        tabRefs.current[nextIndex]?.focus();
      }
    },
    [tabs],
  );

  // Stable ID helpers for ARIA relationships
  const tabId = (slug: string) => `${instanceId}-tab-${slug}`;
  const panelId = (slug: string) => `${instanceId}-panel-${slug}`;

  const activeTabData = tabs.find((t) => t.slug === activeTab);
  // A tab is a "composition" tab if it has compositionChoices from Sanity
  const isCompositionTab = !!(activeTabData?.compositionChoices && activeTabData.compositionChoices.length > 0);
  const activeItems = isCompositionTab ? [] : (itemsBySubCategory[activeTab] ?? []);

  if (tabs.length === 0) return null;

  return (
    <div className="w-full mt-2">
      {/* Folder-style Tab Bar */}
      <div className="w-full px-5 mb-6">
        <div
          className="flex relative border-[3px] border-deep-charcoal bg-white rounded-[4px] overflow-hidden"
          role="tablist"
          aria-label={`Sous-catégories de ${parentCategory.title}`}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.slug;
            return (
              <button
                key={tab._id}
                ref={(el) => { tabRefs.current[index] = el; }}
                id={tabId(tab.slug)}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId(tab.slug)}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.slug)}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  touchStartRef.current[index] = { x: touch.clientX, y: touch.clientY };
                }}
                onTouchEnd={(e) => {
                  // iOS Safari 15.x workaround: click events can be swallowed.
                  // But only fire if the finger didn't scroll — same guard as FavoriteButton.
                  const start = touchStartRef.current[index];
                  if (start && e.changedTouches.length > 0) {
                    const touch = e.changedTouches[0];
                    const dx = Math.abs(touch.clientX - start.x);
                    const dy = Math.abs(touch.clientY - start.y);
                    touchStartRef.current[index] = null;
                    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) return; // scroll — bail out
                  } else {
                    touchStartRef.current[index] = null;
                  }
                  e.preventDefault();
                  setActiveTab(tab.slug);
                }}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`
                  flex-1 py-4 px-2 font-anton text-[22px] uppercase tracking-wider text-center leading-none
                  transition-all duration-200 cursor-pointer border-r-[3px] border-deep-charcoal last:border-r-0
                  ${isActive
                    ? 'bg-vibrant-yellow text-deep-charcoal border-b-[4px] border-b-deep-charcoal'
                    : 'text-on-surface-variant hover:bg-surface-variant border-b-[4px] border-b-transparent'
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panel */}
      <div
        id={panelId(activeTab)}
        role="tabpanel"
        aria-labelledby={tabId(activeTab)}
        tabIndex={0}
      >
        {/* Base Description for active tab */}
        {activeTabData?.baseDescription && (
          <div className="w-full px-5 pt-2 pb-4">
            <p className="font-libre-franklin text-[18px] leading-relaxed text-on-surface-variant border-l-[4px] border-vibrant-yellow pl-4">
              <span className="font-bold text-deep-charcoal">Base: </span>
              {activeTabData.baseDescription}
            </p>
          </div>
        )}

        {/* Composition tab — shows FamilialVisual + supplements instead of items */}
        {isCompositionTab ? (
          <div className="pt-2">
            <FamilialVisual
              title={activeTabData?.compositionTitle}
              size={activeTabData?.compositionSize}
              subtitle={activeTabData?.compositionSubtitle}
              combos={activeTabData?.compositionCombos}
              choices={activeTabData?.compositionChoices}
            />

            {activeTabData?.supplements && activeTabData.supplements.length > 0 && (
              <SupplementSection supplements={activeTabData.supplements} />
            )}
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="pt-2">
              <ItemList items={activeItems} categorySlug={activeTab} />
            </div>

            {/* Supplements for active tab */}
            {activeTabData?.supplements && activeTabData.supplements.length > 0 && (
              <SupplementSection supplements={activeTabData.supplements} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
