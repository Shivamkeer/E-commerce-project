import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import StoreProvider from "@/components/providers/StoreProvider";
import Providers from "@/components/providers/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "NovaCart — Premium Online Shopping",
    template: "%s | NovaCart",
  },
  description:
    "Shop premium products at NovaCart. Discover trending mobiles, fashion, electronics and more with fast delivery and secure checkout.",
  keywords: ["ecommerce", "online shopping", "fashion", "electronics", "NovaCart"],
  openGraph: {
    title: "NovaCart — Premium Online Shopping",
    description: "Modern ecommerce experience with curated products and seamless checkout.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen antialiased`}>
        <StoreProvider>
          <Providers>
            <Navbar />
            <main className="mx-auto min-h-[calc(100vh-72px)] max-w-7xl px-4 pb-24 pt-6 sm:px-6 md:pb-8 lg:px-8">
              {children}
            </main>
            <Footer />
            <BottomNav />
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
