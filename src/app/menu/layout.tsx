import { getCategories, getSiteSettings } from '@/lib/sanity/data';
import { CategoryNav } from '@/components/navigation/CategoryNav';
import { NoticeBar } from '@/components/navigation/NoticeBar';
import { MenuNavWrapper } from '@/components/navigation/MenuNavWrapper';

export const revalidate = 86400;

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
      {children}
    </>
  );
}
