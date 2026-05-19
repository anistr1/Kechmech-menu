import { SplashScreen } from '@/components/splash/SplashScreen';
import { getSiteSettings, getCategories } from '@/lib/sanity/data';

export const revalidate = 86400;

export default async function MenuSplashPage() {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getCategories()
  ]);
  
  const firstCategorySlug = categories?.[0]?.slug || 'pizza';
  
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
