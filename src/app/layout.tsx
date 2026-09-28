import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fscakegallery.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fffcf8",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FS Cake Gallery | Special Cake For Special Day | Custom Cakes in Hemmathagama & Thalgaspitiya",
    template: "%s | FS Cake Gallery",
  },
  description:
    "FS Cake Gallery - Special cake for special day. Order delicious homemade custom cakes for birthdays, weddings, anniversaries, Korean bento cakes & cupcakes. Freshly baked in Hemmathagama & Thalgaspitiya with delivery available.",
  applicationName: "FS Cake Gallery",
  authors: [{ name: "FS Cake Gallery", url: "https://instagram.com/fscake_gallery" }],
  creator: "FS Cake Gallery",
  publisher: "FS Cake Gallery",
  keywords: [
    "FS Cake Gallery",
    "fs cake gallery",
    "fscake_gallery",
    "fscake gallery",
    "FS Cakes",
    "FS Cake Gallery Hemmathagama",
    "FS Cake Gallery Thalgaspitiya",
    "custom cakes Hemmathagama",
    "birthday cakes Hemmathagama",
    "wedding cakes Hemmathagama",
    "anniversary cakes Hemmathagama",
    "bento cakes Sri Lanka",
    "cupcakes Hemmathagama",
    "cakes in Mawanella",
    "custom cakes Sri Lanka",
    "homemade cakes Hemmathagama",
    "special cake for special day",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "/",
    siteName: "FS Cake Gallery",
    title: "FS Cake Gallery | Special Cake For Special Day",
    description:
      "Homemade custom cakes for birthdays, weddings, anniversaries, bento cakes & cupcakes in Hemmathagama & Thalgaspitiya. Delivery available.",
    images: [
      {
        url: "/images/poster.jpg",
        width: 1200,
        height: 630,
        alt: "FS Cake Gallery - Special cake for special day",
      },
      {
        url: "/images/logo.jpg",
        width: 600,
        height: 600,
        alt: "FS Cake Gallery Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FS Cake Gallery | Special Cake For Special Day",
    description:
      "Homemade custom cakes for birthdays, weddings, anniversaries, bento cakes & cupcakes in Hemmathagama & Thalgaspitiya.",
    images: ["/images/poster.jpg"],
    creator: "@fscake_gallery",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.jpg",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  category: "Bakery & Cake Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[#fffcf8] text-[#4a1525] antialiased selection:bg-rose-200 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
