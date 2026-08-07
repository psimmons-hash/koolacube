import { SITE } from "@/lib/site";

/**
 * Editable, site-wide settings (NAP details + shared copy). Defaults mirror the
 * static `SITE` constant so the site renders identically before anything is
 * saved. This module is client-safe — the server reader lives in
 * `settings.server.ts`.
 */
export type FooterLink = { label: string; href: string };
export type FooterColumn = { heading: string; links: FooterLink[] };

export type EffectiveSettings = {
  telephone: string;
  telephoneE164: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  tagline: string;
  description: string;
  /** Footer logo image (public path or uploaded URL). */
  footerLogoUrl: string;
  /** Footer wordmark shown next to the logo. */
  footerBrandName: string;
  footerBlurb: string;
  /** Small "Backed by …" badge under the footer blurb. */
  footerBackedBy: string;
  /** Editable link columns shown in the footer (the Contact column is built from the NAP details above). */
  footerColumns: FooterColumn[];
  /** Right-hand note in the footer's bottom bar, next to the copyright. */
  footerBottomNote: string;
  ctaTitle: string;
  ctaSubtitle: string;
};

export const SETTINGS_DEFAULTS: EffectiveSettings = {
  telephone: SITE.telephone,
  telephoneE164: SITE.telephoneE164,
  email: SITE.email,
  address: { ...SITE.address },
  tagline: SITE.tagline,
  description: SITE.description,
  footerLogoUrl: "/koolacube-logo.webp",
  footerBrandName: "KOOLACUBE",
  footerBlurb: "Reliable commercial cold storage for SE Queensland businesses.",
  footerBackedBy: "Backed by HVACR Group / ACRO Refrigeration",
  footerColumns: [
    {
      heading: "Hire",
      links: [
        { label: "Cold Room Hire", href: "/hire/cold-room" },
        { label: "Freezer Room Hire", href: "/hire/freezer-room" },
        { label: "Dual Temp Room Hire", href: "/hire/dual-temp" },
        { label: "Long-Term Hire", href: "/hire/long-term" },
        { label: "Available Units", href: "/available-units" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Buy New", href: "/buy/new" },
        { label: "Ex-Hire Sales", href: "/buy/ex-hire" },
        { label: "Industries", href: "/industries" },
        { label: "Service Areas", href: "/service-areas" },
        { label: "Blog", href: "/blog" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
  ],
  footerBottomNote: "Commercial cold room hire & sales · SE Queensland",
  ctaTitle: "Talk to Koolacube about your site.",
  ctaSubtitle: "Monthly hire from $440 + GST · Backed by ACRO Refrigeration.",
};

/** Phone digits for tel: links, e.g. "1300 561 030" -> "1300561030". */
export function telHref(telephone: string): string {
  return telephone.replace(/[^\d+]/g, "");
}
