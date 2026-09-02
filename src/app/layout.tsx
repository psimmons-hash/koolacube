import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/site";
import NavigationProgress from "@/components/NavigationProgress";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "cold room hire",
    "freezer room hire",
    "commercial cold room",
    "portable cold room",
    "cold room hire Brisbane",
    "cold room hire Gold Coast",
    "cold room hire Sunshine Coast",
    "cold storage hire",
    "long-term cold room hire",
    "cold rooms for sale",
    "SE Queensland",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    // og:image is provided site-wide by the file-based app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    // twitter:image is provided by the file-based app/twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#2c97d1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <NavigationProgress />
        {children}
        <Script
          src="https://www.hvacrgroup.com.au/outreach-agent.js?v=20260902-footer-credential-pair-v2"
          id="hvacr-outreach-agent"
          strategy="lazyOnload"
        />
        <Analytics />
      </body>
    </html>
  );
}
