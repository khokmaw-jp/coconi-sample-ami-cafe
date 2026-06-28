import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "./siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.shopName} | 自然光と本を楽しむ小さなカフェ`,
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteConfig.shopName} | 自然光と本を楽しむ小さなカフェ`,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.brandName,
    type: "website",
    images: [
      {
        url: "/images/hero/hero-main.png",
        width: 1200,
        height: 630,
        alt: "自然光が入るAmi Cafeの店内"
      }
    ]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
