import type { Metadata } from "next";
import { BuyContent, type BuyData } from "@/components/site/BuyContent";
import { BlogStrip } from "@/components/site/BlogStrip";
import { BUY_DEFAULTS, type BuyStored } from "@/lib/content/buy";
import { getPageContent } from "@/lib/content/page-content.server";
import { getIcon } from "@/lib/icons";

export async function getBuyPage(path: string): Promise<BuyStored> {
  return getPageContent(path, BUY_DEFAULTS[path]);
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
    // Prefer an explicit product image; otherwise the first gallery photo.
    productImage: d.productImage ?? d.gallery?.find((g) => g.src)?.src,
    productAvailability: d.productAvailability,
    productCondition: d.productCondition,
  };
  return (
    <>
      <BuyContent data={data} />
      <BlogStrip linkingTo={path} heading="Buying Guides & Tips" tone="muted" />
    </>
  );
}
