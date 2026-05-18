import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import {
  GET_CATEGORIES_QUERY,
  GET_CATEGORY_BY_SLUG_QUERY,
  GET_CHILD_CATEGORIES_QUERY,
  GET_MENU_ITEMS_BY_CATEGORY_QUERY,
} from '@/lib/sanity/queries';
import { CategoryNav } from '@/components/navigation/CategoryNav';
import { CategoryHeader } from '@/components/menu/CategoryHeader';
import { ItemList } from '@/components/menu/ItemList';
import { SupplementSection } from '@/components/menu/SupplementSection';
import { FamilialVisual } from '@/components/menu/FamilialVisual';
import { SubCategoryTabs } from '@/components/navigation/SubCategoryTabs';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await client.fetch(GET_CATEGORY_BY_SLUG_QUERY, { slug: categorySlug });

  if (!category) {
    return { title: 'Catégorie introuvable' };
  }

  return {
    title: category.title,
    description: category.baseDescription
      ? `${category.title} — ${category.baseDescription}`
      : `Découvrez nos ${category.title.toLowerCase()} chez Kechmech.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;

  const [categories, currentCategory, childCategories] = await Promise.all([
    client.fetch(GET_CATEGORIES_QUERY),
    client.fetch(GET_CATEGORY_BY_SLUG_QUERY, { slug: categorySlug }),
    client.fetch(GET_CHILD_CATEGORIES_QUERY, { slug: categorySlug }),
  ]);

  if (!currentCategory) {
    notFound();
  }

  // If this is a child category, redirect to the parent
  if (currentCategory.parentSlug) {
    const { redirect } = await import('next/navigation');
    redirect(`/menu/${currentCategory.parentSlug}`);
  }

  const hasSubCategories = childCategories && childCategories.length > 0;

  if (hasSubCategories) {
    // Fetch items for the parent category AND each child category in parallel
    const allSlugs = [categorySlug, ...childCategories.map((c: { slug: string }) => c.slug)];
    const itemResults = await Promise.all(
      allSlugs.map((slug: string) =>
        client.fetch(GET_MENU_ITEMS_BY_CATEGORY_QUERY, { slug })
      )
    );

    // Build a map: slug → items[]
    const itemsBySubCategory: Record<string, typeof itemResults[0]> = {};
    allSlugs.forEach((slug: string, i: number) => {
      itemsBySubCategory[slug] = itemResults[i];
    });

    return (
      <main className="min-h-screen bg-surface pb-12">
        <CategoryNav categories={categories} activeCategorySlug={categorySlug} />

        <CategoryHeader title={currentCategory.title} />

        <SubCategoryTabs
          parentCategory={{
            title: currentCategory.title,
            slug: currentCategory.slug,
            tabLabel: currentCategory.tabLabel,
            baseDescription: currentCategory.baseDescription,
            supplements: currentCategory.supplements,
          }}
          subCategories={childCategories}
          itemsBySubCategory={itemsBySubCategory}
        />
      </main>
    );
  }

  // No sub-categories — original behavior
  const items = await client.fetch(GET_MENU_ITEMS_BY_CATEGORY_QUERY, { slug: categorySlug });

  return (
    <main className="min-h-screen bg-surface pb-12">
      <CategoryNav categories={categories} activeCategorySlug={categorySlug} />

      <CategoryHeader
        title={currentCategory.title}
        baseDescription={currentCategory.baseDescription}
      />

      <ItemList items={items} categorySlug={categorySlug} />

      {currentCategory.supplements && currentCategory.supplements.length > 0 && (
        <SupplementSection supplements={currentCategory.supplements} />
      )}

      {categorySlug === 'pizza' && (
        <FamilialVisual />
      )}
    </main>
  );
}
