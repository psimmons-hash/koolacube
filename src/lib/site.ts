/**
 * Central source of truth for site-wide SEO and business (NAP) details.
 * Reused by metadata, structured data (JSON-LD), the sitemap and the footer.
 */
export const SITE = {
  name: "Koolacube",
  url: "https://www.koolacube.com.au",
  description:
    "Long-term commercial cold room and freezer room hire and sales across Brisbane, Gold Coast and SE Queensland. Monthly hire, delivery, setup and maintenance support.",
  tagline: "Commercial Cold Room & Freezer Hire SE Queensland",
  logo: "https://www.koolacube.com.au/koolacube-logo.webp",
  ogImage: "/hero-coldroom.jpg",
  locale: "en_AU",
  parent: "HVACR Group / ACRO Refrigeration",
  telephone: "1300 561 030",
  telephoneE164: "+611300561030",
  email: "info@koolacube.com.au",
  priceRange: "$$",
  address: {
    streetAddress: "Unit 3, 9–11 Imboon Street",
    addressLocality: "Deception Bay",
    addressRegion: "QLD",
    postalCode: "4508",
    addressCountry: "AU",
  },
  geo: {
    latitude: -27.1968,
    longitude: 153.0258,
  },
  areaServed: [
    "Brisbane",
    "Gold Coast",
    "Sunshine Coast",
    "Moreton Bay",
    "Ipswich",
    "Logan",
  ],
} as const;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
