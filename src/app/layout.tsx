import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FavoritesProvider } from "@/components/FavoritesProvider";

export const metadata: Metadata = {
  title: {
    default: "Kechmech — Menu Digital",
    template: "%s | Kechmech",
  },
  description:
    "Découvrez le menu de Kechmech : baguettes farcies, pizzas, tacos, burgers et plus encore. Street food 100% tunisien.",
  openGraph: {
    title: "Kechmech — Menu Digital",
    description:
      "Street food 100% tunisien. Parcourez notre menu digital.",
    siteName: "Kechmech",
    locale: "fr_TN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
