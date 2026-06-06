import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { GET_ALL_CATEGORY_SLUGS_QUERY } from '@/lib/sanity/queries';
import { getFullCategoryPage } from '@/lib/sanity/data';
import { CategoryHeader } from '@/components/menu/CategoryHeader';
import { ItemList } from '@/components/menu/ItemList';
import { SupplementSection } from '@/components/menu/SupplementSection';
import { SubCategoryTabs } from '@/components/navigation/SubCategoryTabs';
import { RecentlyViewed } from '@/components/ui/RecentlyViewed';

export const revalidate = 3600;

/**
 * Pre-render all category pages at build time.
 * Menu has a small, known set of slugs — no reason for dynamic rendering.
 */
export async function generateStaticParams() {
  const categories = await client.fetch(GET_ALL_CATEGORY_SLUGS_QUERY);
  return categories;
}

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params;
  // Uses React.cache() — shared with the page component below (1 fetch, not 2)
  const category = await getFullCategoryPage(categorySlug);

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

  // Single consolidated GROQ query — fetches category + children + all items
  const data = await getFullCategoryPage(categorySlug);

  if (!data) {
    notFound();
  }

  // If this is a child category, redirect to the parent
  if (data.parentSlug) {
    const { redirect } = await import('next/navigation');
    redirect(`/menu/${data.parentSlug}`);
  }

  const hasSubCategories = data.childCategories && data.childCategories.length > 0;

  if (hasSubCategories) {
    // Build a map: slug → items[] from the consolidated response
    const itemsBySubCategory: Record<string, typeof data.items> = {};
    let totalItems = 0;

    // Parent's own items (if any)
    if (data.items && data.items.length > 0) {
      itemsBySubCategory[data.slug] = data.items;
      totalItems += data.items.length;
    }

    // Each child's items
    for (const child of data.childCategories) {
      itemsBySubCategory[child.slug] = child.items || [];
      totalItems += (child.items || []).length;
    }

    return (
      <main className="min-h-screen bg-surface pb-12">
        <CategoryHeader title={data.title} itemCount={totalItems} />

        <SubCategoryTabs
          parentCategory={{
            title: data.title,
            slug: data.slug,
            tabLabel: data.tabLabel,
            baseDescription: data.baseDescription,
            supplements: data.supplements,
          }}
          subCategories={data.childCategories}
          itemsBySubCategory={itemsBySubCategory}
        />

        <RecentlyViewed />
      </main>
    );
  }

  // No sub-categories — original behavior
  const totalItems = data.items ? data.items.length : 0;

  return (
    <main className="min-h-screen bg-surface pb-12">
      <CategoryHeader
        title={data.title}
        itemCount={totalItems}
        baseDescription={data.baseDescription}
      />

      <ItemList items={data.items || []} categorySlug={categorySlug} />

      {data.supplements && data.supplements.length > 0 && (
        <SupplementSection supplements={data.supplements} />
      )}

      <RecentlyViewed />
    </main>
  );
}
