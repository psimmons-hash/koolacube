import Link from "next/link";
import { PageHero, CtaStrip } from "./PageHero";
import { PageGallery, type GalleryImage } from "./PageGallery";
import { ServiceJsonLd } from "./ServiceJsonLd";
import {
  Check,
  Snowflake,
  Wrench,
  Zap,
  Boxes,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export type HireData = {
  crumb: string;
  title: string;
  intro: string;
  optionsTitle: string;
  optionsIntro?: string;
  options: { title: string; desc: string }[];
  rangeTitle: string;
  rangeIntro: string;
  range: { title: string; desc: string }[];
  advantagesIntro: string;
  advantages: { icon: LucideIcon; title: string; desc: string }[];
  specsTitle: string;
  specs: string[];
  sizesTitle: string;
  sizes: { size: string; desc: string }[];
  sizesNote?: string;
  useCasesTitle: string;
  useCasesIntro?: string;
  useCases: { title: string; desc: string }[];
  /** Photo gallery — section is hidden while empty. */
  galleryTitle?: string;
  galleryIntro?: string;
  gallery?: GalleryImage[];
  /** Monthly "from" price (ex-GST) for Service Offer JSON-LD. */
  monthlyPriceFrom?: number;
};

/* Shared content reused across hire tabs unless a page overrides it. */
export const defaultAdvantages: HireData["advantages"] = [
  {
    icon: Zap,
    title: "Emergency Breakdown Backup",
    desc: "Fridge, freezer or walk-in failed? Stay calm. We deliver emergency cold rooms fast to protect your stock, sales and reputation.",
  },
  {
    icon: Boxes,
    title: "Extra Cold Space On Demand",
    desc: "Running out of chilled storage during peak seasons or expansion? Our modular cold rooms give you flexible extra space when you need it – no downtime, no hassle.",
  },
  {
    icon: Wrench,
    title: "Maintenance Support",
    desc: "Planned maintenance shouldn't disrupt your operations. We provide seamless temporary cold room cover so your business stays operational.",
  },
];

export const defaultUseCases: HireData["useCases"] = [
  {
    title: "Food Manufacturing",
    desc: "Dependable, food-grade cold storage to support production, processing and ongoing bulk stock requirements.",
  },
  {
    title: "Hospitality",
    desc: "Restaurants, cafés, caterers and food trucks rely on our units for backup storage or increased capacity during peak seasons.",
  },
  {
    title: "Aged Care",
    desc: "Safe, hygienic, temperature-controlled storage to support aged-care kitchens and service areas.",
  },
  {
    title: "Healthcare & Medical",
    desc: "Maintain strict temperature requirements for medical supplies, pharmaceuticals and vaccines.",
  },
  {
    title: "Construction & Industrial",
    desc: "Ideal for remote sites requiring secure cold storage for food supplies, hydration stations or specialised materials.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
      {children}
    </div>
  );
}

export function HireContent({ data }: { data: HireData }) {
  return (
    <>
      <ServiceJsonLd
        name={data.title}
        description={data.intro}
        monthlyPriceFrom={data.monthlyPriceFrom}
      />
      <PageHero eyebrow="Hire" crumb={data.crumb} title={data.title} intro={data.intro} />

      {/* Hire options */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>Hire Options</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            {data.optionsTitle}
          </h2>
          {data.optionsIntro && (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-lg">
              {data.optionsIntro}
            </p>
          )}
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

      {/* Range */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>Our Range</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{data.rangeTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-lg">
            {data.rangeIntro}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.range.map((r) => (
              <div
                key={r.title}
                className="rounded-lg border border-border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-cold-blue">
                  <Snowflake className="h-4 w-4 shrink-0" />
                  <span className="font-display text-base font-semibold text-foreground">
                    {r.title}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-navy py-16 md:py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>Why Koolacube</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Koolacube Advantages</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
            {data.advantagesIntro}
          </p>
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

      {/* Specifications + sizes */}
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

          <h3 className="mt-12 font-display text-2xl font-bold">{data.sizesTitle}</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {data.sizes.map((s) => (
              <div
                key={s.size}
                className="rounded-lg border-l-4 border-cold-blue bg-muted/30 p-6"
              >
                <div className="font-display text-2xl font-bold text-cold-blue">{s.size}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          {data.sizesNote && (
            <p className="mt-5 text-sm font-medium text-muted-foreground">{data.sizesNote}</p>
          )}
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>Industries</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{data.useCasesTitle}</h2>
          {data.useCasesIntro && (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-lg">
              {data.useCasesIntro}
            </p>
          )}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.useCases.map((u) => (
              <div
                key={u.title}
                className="rounded-lg border border-border bg-white p-6 shadow-sm"
              >
                <div className="font-display text-lg font-semibold text-cold-blue">{u.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
            >
              Get a Hire Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <PageGallery
        title={data.galleryTitle}
        intro={data.galleryIntro}
        images={data.gallery ?? []}
        tone="white"
      />

      <CtaStrip />
    </>
  );
}
