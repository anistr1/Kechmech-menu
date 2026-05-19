import type { Metadata, Viewport } from "next";
import { Anton, Libre_Franklin, Caveat } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/components/FavoritesProvider";

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
      {/* impeccable-live-start */}
<script src="http://localhost:8400/live.js"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
