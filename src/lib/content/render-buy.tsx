import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogStrip } from "@/components/site/BlogStrip";
import { BuyContent, type BuyData } from "@/components/site/BuyContent";
import { ExHireSalesCallout } from "@/components/site/ExHireSalesCallout";
import { BUY_DEFAULTS, type BuyStored } from "@/lib/content/buy";
import { getPageContent } from "@/lib/content/page-content.server";
import { getIcon } from "@/lib/icons";

export async function getBuyPage(path: string): Promise<BuyStored> {
  const content = await getPageContent(path, BUY_DEFAULTS[path]);

  if (path !== "/buy/ex-hire") return content;

  // Keep the current offer authoritative in source so a stale CMS override
  // cannot suppress the ranking update. Gallery and technical specifications
  // remain editable through the CMS.
  const current = BUY_DEFAULTS[path];
  return {
    ...content,
    metaTitle: current.metaTitle,
    metaDescription: current.metaDescription,
    crumb: current.crumb,
    title: current.title,
    intro: current.intro,
    optionsTitle: current.optionsTitle,
    options: current.options,
    overviewTitle: current.overviewTitle,
    overview: current.overview,
    advantagesIntro: current.advantagesIntro,
    advantages: current.advantages,
    sizesTitle: current.sizesTitle,
    sizesIntro: current.sizesIntro,
    sizes: current.sizes,
    sizesNote: current.sizesNote,
    whyTitle: current.whyTitle,
    why: current.why,
    ctaLabel: current.ctaLabel,
    productAvailability: current.productAvailability,
    productCondition: current.productCondition,
  };
}

export async function buyPageMetadata(path: string): Promise<Metadata> {
  const d = await getBuyPage(path);
  return {
    alternates: { canonical: path },
    title: d.metaTitle,
    description: d.metaDescription,
    openGraph: {
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
      title: d.metaTitle,
      description: d.metaDescription,
    },
  };
}

export async function renderBuyPage(path: string) {
  const d = await getBuyPage(path);
  const data: BuyData = {
    crumb: d.crumb,
    title: d.title,
    intro: d.intro,
    optionsTitle: d.optionsTitle,
    options: d.options,
    overviewTitle: d.overviewTitle,
    overview: d.overview,
    advantagesIntro: d.advantagesIntro,
    advantages: d.advantages.map((a) => ({
      icon: getIcon(a.icon),
      title: a.title,
      desc: a.desc,
    })),
    specsTitle: d.specsTitle,
    specs: d.specs,
    sizesTitle: d.sizesTitle,
    sizesIntro: d.sizesIntro,
    sizes: d.sizes,
    sizesNote: d.sizesNote,
    whyTitle: d.whyTitle,
    why: d.why,
    galleryTitle: d.galleryTitle,
    galleryIntro: d.galleryIntro,
    gallery: d.gallery,
    ctaLabel: d.ctaLabel,
    productImage: d.productImage ?? d.gallery?.find((g) => g.src)?.src,
    productAvailability: d.productAvailability,
    productCondition: d.productCondition,
  };

  return (
    <>
      <BuyContent
        data={data}
        afterHero={
          path === "/buy/ex-hire" ? (
            <ExHireSalesCallout
              actionHref="/contact"
              actionLabel="Check Current Stock"
              heading="Current 1.8m × 2.4m Ex-Hire Stock"
            />
          ) : undefined
        }
        beforeCta={path === "/buy/ex-hire" ? <ExHireRelatedLinks /> : undefined}
      />
      <BlogStrip linkingTo={path} heading="Buying Guides & Tips" tone="muted" />
    </>
  );
}

const related = [
  { label: "View Available Units", href: "/available-units" },
  { label: "Compare New Cold Rooms", href: "/buy/new" },
  { label: "Custom Cold Room Builds", href: "/buy/custom" },
  { label: "Long-Term Cold Room Hire", href: "/hire/long-term" },
];

function ExHireRelatedLinks() {
  return (
    <section className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
          Other Options
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Compare Ex-Hire, New, Custom and Hire Options
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-5 py-4 text-sm font-semibold transition hover:border-cold-blue hover:text-cold-blue"
            >
              {item.label}
              <ArrowRight className="h-4 w-4 shrink-0 text-cold-blue transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
