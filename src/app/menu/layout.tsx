import { getCategories, getSiteSettings } from '@/lib/sanity/data';
import { CategoryNav } from '@/components/navigation/CategoryNav';
import { NoticeBar } from '@/components/navigation/NoticeBar';
import { MenuNavWrapper } from '@/components/navigation/MenuNavWrapper';
import { ScrollToTop } from '@/components/navigation/ScrollToTop';

export const revalidate = 3600;

export default async function MenuLayout({ children }: { children: React.ReactNode }) {
  const [categories, siteSettings] = await Promise.all([
    getCategories(),
    getSiteSettings(),
  ]);

  return (
    <>
      <MenuNavWrapper>
        <NoticeBar
          marqueeText={siteSettings?.marqueeText}
          instagramUrl={siteSettings?.instagramUrl}
          facebookUrl={siteSettings?.facebookUrl}
          tiktokUrl={siteSettings?.tiktokUrl}
        />
        <CategoryNav categories={categories} />
      </MenuNavWrapper>
      <ScrollToTop />
      {children}
    </>
  );
}
