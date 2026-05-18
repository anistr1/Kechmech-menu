import { client } from '@/sanity/lib/client';
import { GET_CATEGORIES_QUERY, GET_SITE_SETTINGS_QUERY } from '@/lib/sanity/queries';
import { CategoryNav } from '@/components/navigation/CategoryNav';
import { NoticeBar } from '@/components/navigation/NoticeBar';
import { MenuNavWrapper } from '@/components/navigation/MenuNavWrapper';

export const revalidate = 60;

export default async function MenuLayout({ children }: { children: React.ReactNode }) {
  const [categories, siteSettings] = await Promise.all([
    client.fetch(GET_CATEGORIES_QUERY),
    client.fetch(GET_SITE_SETTINGS_QUERY),
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
