import type { Metadata, Viewport } from "next";
import { Anton, Libre_Franklin, Caveat } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { Analytics } from "@vercel/analytics/react";

// Self-host fonts via Next.js — eliminates render-blocking network request
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const caveat = Caveat({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kechmech — Menu Digital",
    template: "%s | Kechmech",
  },
  description:
    "Explorez la carte complète de votre restaurant préféré Kechmech. Choisissez parmi nos savoureuses baguettes farcies, nos pizzas fraîches, nos burgers et nos tacos.",
  openGraph: {
    title: "Kechmech — Menu Digital",
    description:
      "Votre restaurant préféré Kechmech : explorez notre menu digital.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${libreFranklin.variable} ${caveat.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
        <Analytics />
      </body>
    </html>
  );
}
