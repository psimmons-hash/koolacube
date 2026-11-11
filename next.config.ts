import type { NextConfig } from "next";

// Permanent (308) redirects from the legacy WordPress URLs to their closest
// equivalent on the new site. Sources are written without a trailing slash;
// Next.js normalises the trailing slash, so `/about-us/` and `/about-us` both
// match. Keeping these preserves SEO link equity from the old site.
const legacyRedirects = [
  { source: "/cold-room-hire-rental", destination: "/hire/cold-room" },
  { source: "/cold-room-sales", destination: "/buy/new" },
  { source: "/about-us", destination: "/about" },
  { source: "/faqs", destination: "/#faqs" },
  { source: "/industries-we-serve", destination: "/industries" },
  {
    source: "/cooler-room-mobile-refrigerated-storage",
    destination: "/hire/cold-room",
  },
  {
    source: "/freezer-room-low-temperature-cold-storage",
    destination: "/hire/freezer-room",
  },
  {
    source: "/dual-temp-room-cooler-freezer-in-one-unit",
    destination: "/hire/dual-temp",
  },
  { source: "/contact-us", destination: "/contact" },
];

const nextConfig: NextConfig = {
  async headers() { return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(self), geolocation=(self)" },
          { key: "Content-Security-Policy", value: "object-src 'none'; base-uri 'self'; frame-ancestors 'self'" },
        ],
      },
  ]; },
  // Transform barrel imports (e.g. lucide-react) into per-icon imports so only
  // the icons actually used ship to the browser — cuts unused JavaScript.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    // Serve modern formats; Next negotiates AVIF → WebP → original per browser.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Allow admin-uploaded images served from the Supabase Storage bucket.
    remotePatterns: [
      { protocol: "https", hostname: "cjebtnwjpbthtysdrese.supabase.co" },
    ],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;

