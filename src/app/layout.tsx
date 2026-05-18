import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kechmech Digital Menu",
  description: "Menu digital de Kechmech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="antialiased">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
