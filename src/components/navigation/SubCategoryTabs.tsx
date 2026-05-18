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
    <div>
      {/* Tab Bar */}
      <div className="w-full bg-surface border-b-2 border-deep-charcoal">
        <div className="flex px-4 gap-0">
          {tabs.map((tab) => (
            <button
              key={tab._id}
              onClick={() => setActiveTab(tab.slug)}
              className={`
                flex-1 py-3 px-2 font-libre-franklin font-bold text-sm uppercase tracking-wide text-center
                border-b-3 transition-all duration-200 cursor-pointer
                ${
                  activeTab === tab.slug
                    ? 'border-vibrant-yellow text-deep-charcoal bg-supplement-bg'
                    : 'border-transparent text-on-surface-variant hover:text-deep-charcoal hover:bg-supplement-bg/50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Base Description for active tab */}
      {activeTabData?.baseDescription && (
        <div className="w-full px-4 pt-4 pb-2">
          <p className="font-libre-franklin text-body-lg text-on-surface-variant">
            <span className="font-bold">Base: </span>
            {activeTabData.baseDescription}
          </p>
        </div>
      )}

      {/* Items */}
      <div className="pt-4">
        <ItemList items={activeItems} categorySlug={activeTab} />
      </div>

      {/* Supplements for active tab */}
      {activeTabData?.supplements && activeTabData.supplements.length > 0 && (
        <SupplementSection supplements={activeTabData.supplements} />
      )}
    </div>
  );
}
