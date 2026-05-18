import { SplashScreen } from '@/components/splash/SplashScreen';
import { client } from '@/sanity/lib/client';
import { GET_SITE_SETTINGS_QUERY, GET_CATEGORIES_QUERY } from '@/lib/sanity/queries';

export const revalidate = 60;

export default async function MenuSplashPage() {
  const [settings, categories] = await Promise.all([
    client.fetch(GET_SITE_SETTINGS_QUERY),
    client.fetch(GET_CATEGORIES_QUERY)
  ]);
  
  const firstCategorySlug = categories?.[0]?.slug || 'pizza';
  
  return (
    <SplashScreen 
      restaurantName={settings?.restaurantName}
      logoUrl={settings?.logoUrl}
      tagline={settings?.splashTagline}
      ctaText={settings?.ctaText}
      firstCategorySlug={firstCategorySlug}
    />
  );
}
