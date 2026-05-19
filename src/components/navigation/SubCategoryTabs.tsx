'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface SubCategory {
  _id: string;
  title: string;
  slug: string;
  tabLabel?: string;
  baseDescription?: string;
  supplements?: { _id: string; name: string; price: number }[];
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
    compositionTitle?: string;
    compositionSize?: string;
    compositionSubtitle?: string;
    compositionCombos?: { count: number; price: number }[];
    compositionChoices?: string[];
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
  // Avoid useId() — it generates IDs with colons (e.g. `:r1:`) that older
  // iOS Safari (iPhone 7) can't handle in ARIA attributes
  const instanceId = useMemo(() => `sct-${Math.random().toString(36).slice(2, 8)}`, []);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
        },
      ]
      : []),
    ...subCategories.map((sc) => ({
      _id: sc._id,
      slug: sc.slug,
      label: sc.tabLabel || sc.title,
      baseDescription: sc.baseDescription,
      supplements: sc.supplements,
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
  const activeItems = itemsBySubCategory[activeTab] ?? [];

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
                onTouchEnd={(e) => {
                  // iOS Safari 15.x workaround: click events can be swallowed
                  e.preventDefault();
                  setActiveTab(tab.slug);
                }}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`
                  flex-1 py-4 px-2 font-anton text-[22px] uppercase tracking-wider text-center leading-none
                  transition-all duration-200 cursor-pointer border-r-[3px] border-deep-charcoal last:border-r-0
                  ${isActive
                    ? 'bg-vibrant-yellow text-deep-charcoal'
                    : 'text-on-surface-variant hover:bg-surface-variant'
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

        {/* Items */}
        <div className="pt-2">
          <ItemList items={activeItems} categorySlug={activeTab} />
        </div>

        {/* Familial Visual (Pizza only) */}
        {activeTab === 'pizza' && (
          <FamilialVisual
            title={parentCategory.compositionTitle}
            size={parentCategory.compositionSize}
            subtitle={parentCategory.compositionSubtitle}
            combos={parentCategory.compositionCombos}
            choices={parentCategory.compositionChoices}
          />
        )}

        {/* Supplements for active tab */}
        {activeTabData?.supplements && activeTabData.supplements.length > 0 && (
          <SupplementSection supplements={activeTabData.supplements} />
        )}
      </div>
    </div>
  );
}
