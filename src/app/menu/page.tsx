import { SplashScreen } from '@/components/splash/SplashScreen';
import { getSiteSettings, getCategories } from '@/lib/sanity/data';

export const revalidate = 3600;

export default async function MenuSplashPage() {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getCategories()
  ]);
  
  const validCategory = categories?.find(
    (c: { slug?: string }) => c.slug && c.slug.trim() !== '' && c.slug !== '#' && !c.slug.startsWith('#')
  );
  const firstCategorySlug = validCategory?.slug || 'pizza';
  
  return (
    <SplashScreen 
      restaurantName={settings?.restaurantName}
      logoUrl={settings?.logoUrl}
      tagline={settings?.splashTagline}
      ctaText={settings?.ctaText}
      firstCategorySlug={firstCategorySlug}
      instagramUrl={settings?.instagramUrl}
      facebookUrl={settings?.facebookUrl}
      tiktokUrl={settings?.tiktokUrl}
    />
  );
}
