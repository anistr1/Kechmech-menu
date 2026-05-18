'use client';

import React, { useState, useEffect } from 'react';

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

  const activeTabData = tabs.find((t) => t.slug === activeTab);
  const activeItems = itemsBySubCategory[activeTab] ?? [];

  if (tabs.length === 0) return null;

  return (
    <div className="w-full mt-2">
      {/* Folder-style Tab Bar */}
      <div className="w-full px-5 mb-6">
        <div className="flex gap-2 relative">
          {/* The bottom continuous line */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-deep-charcoal z-0" />
          
          {tabs.map((tab) => {
            const isActive = activeTab === tab.slug;
            return (
              <button
                key={tab._id}
                onClick={() => setActiveTab(tab.slug)}
                className={`
                  flex-1 pt-3 px-3 font-anton text-[22px] uppercase tracking-wider text-center leading-none
                  transition-all duration-200 cursor-pointer rounded-t-[4px] border-[3px] border-b-0 relative z-10
                  ${
                    isActive
                      ? 'border-deep-charcoal bg-vibrant-yellow text-deep-charcoal pb-[15px]'
                      : 'border-transparent bg-transparent text-on-surface-variant hover:text-deep-charcoal hover:bg-surface-variant pb-3 mb-[3px]'
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

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
        <FamilialVisual />
      )}

      {/* Supplements for active tab */}
      {activeTabData?.supplements && activeTabData.supplements.length > 0 && (
        <SupplementSection supplements={activeTabData.supplements} />
      )}
    </div>
  );
}
