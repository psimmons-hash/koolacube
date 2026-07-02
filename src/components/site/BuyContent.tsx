import Link from "next/link";
import { PageHero, CtaStrip } from "./PageHero";
import { PageGallery, type GalleryImage } from "./PageGallery";
import { defaultAdvantages } from "./HireContent";
import { ProductJsonLd } from "./ProductJsonLd";
import { Check, ShieldCheck, ArrowRight, type LucideIcon } from "lucide-react";

export { defaultAdvantages };

export type BuySize = {
  size: string;
  suited: string;
  availability: string;
};

export type BuyData = {
  crumb: string;
  title: string;
  intro: string;
  optionsTitle: string;
  options: { title: string; desc: string }[];
  overviewTitle: string;
  overview: string[];
  advantagesIntro?: string;
  advantages: { icon: LucideIcon; title: string; desc: string }[];
  specsTitle: string;
  specs: string[];
  sizesTitle: string;
  sizesIntro?: string;
  sizes: BuySize[];
  sizesNote?: string;
  whyTitle: string;
  why: { title: string; desc: string }[];
  /** Photo gallery — section is hidden while empty. */
  galleryTitle?: string;
  galleryIntro?: string;
  gallery?: GalleryImage[];
  ctaLabel?: string;
  /** Product JSON-LD (Offer) hints — defaults: ogImage, InStock, NewCondition. */
  productImage?: string;
  productAvailability?: string;
  productCondition?: string;
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
      {children}
    </div>
  );
}

export function BuyContent({ data }: { data: BuyData }) {
  return (
    <>
      <ProductJsonLd
        name={data.title}
        description={data.intro}
        image={data.productImage}
        availability={data.productAvailability}
        itemCondition={data.productCondition}
      />
      <PageHero eyebrow="Buy" crumb={data.crumb} title={data.title} intro={data.intro} />

      {/* Sales options */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>Sales Options</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{data.optionsTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {data.options.map((o) => (
              <div
                key={o.title}
                className="flex gap-4 rounded-lg border border-border bg-muted/30 p-5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-cold-blue" />
                <div>
                  <div className="font-display text-lg font-semibold">{o.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Eyebrow>Overview</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{data.overviewTitle}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80 md:text-lg">
            {data.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-navy py-16 md:py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>Why Koolacube</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Koolacube Advantages</h2>
          {data.advantagesIntro && (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
              {data.advantagesIntro}
            </p>
          )}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {data.advantages.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-lg border border-white/10 bg-white/5 p-6 transition hover:border-cold-blue/60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange/15 text-orange">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-lg font-semibold">{title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>Specifications</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{data.specsTitle}</h2>
          <div className="mt-8 rounded-lg border border-border bg-muted/20 p-6 md:p-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {data.specs.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cold-blue" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sizes table */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Eyebrow>Sizes</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{data.sizesTitle}</h2>
          {data.sizesIntro && (
            <p className="mt-4 text-base text-foreground/75 md:text-lg">{data.sizesIntro}</p>
          )}
          <div className="mt-8 overflow-hidden rounded-lg border border-border bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">
                    Unit Size
                  </th>
                  <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">
                    Best Suited For
                  </th>
                  <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.sizes.map((s) => (
                  <tr key={s.size}>
                    <td className="px-6 py-4 font-display text-base font-semibold text-cold-blue">
                      {s.size}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{s.suited}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded bg-cold-blue/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-cold-blue">
                        {s.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.sizesNote && (
            <p className="mt-5 text-sm font-medium text-muted-foreground">{data.sizesNote}</p>
          )}
        </div>
      </section>

      {/* Why buy */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>Why Us</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{data.whyTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {data.why.map((w) => (
              <div
                key={w.title}
                className="flex gap-4 rounded-lg border border-border bg-muted/20 p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cold-blue/10 text-cold-blue">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">{w.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
            >
              {data.ctaLabel ?? "Get a Sales Quote"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <PageGallery
        title={data.galleryTitle}
        intro={data.galleryIntro}
        images={data.gallery ?? []}
        tone="muted"
      />

      <CtaStrip />
    </>
  );
}
