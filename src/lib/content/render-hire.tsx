import type { Metadata } from "next";
import { HireContent, type HireData } from "@/components/site/HireContent";
import { BlogStrip } from "@/components/site/BlogStrip";
import { HIRE_DEFAULTS, type HireStored } from "@/lib/content/hire";
import { getPageContent } from "@/lib/content/page-content.server";
import { getIcon } from "@/lib/icons";

/** Effective stored data for a hire-template route (DB override over default). */
export async function getHirePage(path: string): Promise<HireStored> {
  return getPageContent(path, HIRE_DEFAULTS[path]);
}

export async function hirePageMetadata(path: string): Promise<Metadata> {
  const d = await getHirePage(path);
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

export async function renderHirePage(path: string) {
  const d = await getHirePage(path);
  const data: HireData = {
    crumb: d.crumb,
    title: d.title,
    intro: d.intro,
    optionsTitle: d.optionsTitle,
    optionsIntro: d.optionsIntro,
    options: d.options,
    rangeTitle: d.rangeTitle,
    rangeIntro: d.rangeIntro,
    range: d.range,
    advantagesIntro: d.advantagesIntro,
    advantages: d.advantages.map((a) => ({
      icon: getIcon(a.icon),
      title: a.title,
      desc: a.desc,
    })),
    specsTitle: d.specsTitle,
    specs: d.specs,
    sizesTitle: d.sizesTitle,
    sizes: d.sizes,
    sizesNote: d.sizesNote,
    useCasesTitle: d.useCasesTitle,
    useCasesIntro: d.useCasesIntro,
    useCases: d.useCases,
    galleryTitle: d.galleryTitle,
    galleryIntro: d.galleryIntro,
    gallery: d.gallery,
    monthlyPriceFrom: d.monthlyPriceFrom,
  };
  return (
    <>
      <HireContent data={data} />
      <BlogStrip linkingTo={path} heading="Cold Room Hire Guides" tone="muted" />
    </>
  );
}
