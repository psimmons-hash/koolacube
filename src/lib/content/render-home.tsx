import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Check, X, Snowflake, ArrowRight } from "lucide-react";
import { FaqList } from "@/components/site/FaqList";
import { BlogStrip } from "@/components/site/BlogStrip";
import { ExHireSalesCallout } from "@/components/site/ExHireSalesCallout";
import { getPublishedFaqs } from "@/lib/faqs";
import { HOME_DEFAULT, type HomeStored } from "@/lib/content/home";
import { getPageContent } from "@/lib/content/page-content.server";
import { getSettings } from "@/lib/settings.server";
import { telHref } from "@/lib/settings";
import { getIcon } from "@/lib/icons";

export async function getHomePage(): Promise<HomeStored> {
  return getPageContent("/", HOME_DEFAULT);
}

export async function homeMetadata(): Promise<Metadata> {
  const d = await getHomePage();
  return {
    alternates: { canonical: "/" },
    title: d.metaTitle,
    description: d.metaDescription,
    openGraph: {
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
      title: d.metaTitle,
      description: d.metaDescription,
    },
  };
}

export async function renderHomePage() {
  const [d, settings, faqs] = await Promise.all([
    getHomePage(),
    getSettings(),
    getPublishedFaqs(),
  ]);
  const tel = telHref(settings.telephone);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        {/*
          Decorative hero backdrop (rendered at 35% opacity behind the gradient
          and text). Served as a pre-compressed static WebP with `unoptimized`
          so the LCP request skips the on-demand image optimizer entirely — the
          preload points straight at the static file, which is the fastest path
          to paint on slow connections.
        */}
        <Image
          src="/hero-coldroom.webp"
          alt="Skid-mounted commercial cold room at a warehouse loading dock"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/70 backdrop-blur">
              <Snowflake className="h-3.5 w-3.5 text-orange" /> {d.heroBadge}
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              {d.heroTitleLine1}
              <br />
              <span className="text-orange">{d.heroTitleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {d.heroIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
              >
                {d.heroPrimaryCta} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/buy/new"
                className="inline-flex items-center gap-2 rounded border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                {d.heroBuyCta}
              </Link>
              <a
                href={`tel:${tel}`}
                className="inline-flex items-center gap-2 rounded border border-white/25 bg-transparent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-orange" /> Call {settings.telephone}
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-wider text-white/55">
              {d.heroTrust.map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-orange" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CARDS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTag>{d.productsTag}</SectionTag>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-4xl">
            {d.productsHeading}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {d.products.map((p) => {
              const Icon = getIcon(p.icon);
              return (
                <div
                  key={p.type}
                  className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                    <Image
                      src={p.img}
                      alt={p.type}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-cold-blue">
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-semibold uppercase tracking-widest">{p.type}</span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-display text-5xl font-bold text-foreground">${p.price}</span>
                      <span className="text-sm font-medium text-muted-foreground">/month + GST</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Equiv. approx. ${p.daily}/day on monthly hire
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{p.blurb}</p>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded bg-navy px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-cold-blue"
                    >
                      Get a Quote <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">{d.productsFootnote}</p>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionTag dark>{d.positioningTag}</SectionTag>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                {d.positioningHeadingPre}{" "}
                <span className="text-orange">{d.positioningHeadingHighlight}</span>.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/75">{d.positioningIntro}</p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {d.positioningIndustries.map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-3 text-sm"
                  >
                    <Check className="h-4 w-4 shrink-0 text-orange" />
                    <span>{i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUDED / EXCLUDED */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTag>{d.includedTag}</SectionTag>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold md:text-4xl">
            {d.includedHeading}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-white p-8">
              <div className="flex items-center gap-2 text-cold-blue">
                <Check className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">Included</span>
              </div>
              <ul className="mt-6 space-y-3">
                {d.included.map((i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cold-blue" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-white p-8">
              <div className="flex items-center gap-2 text-orange">
                <X className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Excluded / Conditions
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {d.excluded.map((i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HIRE VS BUY */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTag>{d.hireVsBuyTag}</SectionTag>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{d.hireVsBuyHeading}</h2>
          <div className="mt-10 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">Need</th>
                  <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">Best Option</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {d.decisions.map((row) => (
                  <tr key={row.need}>
                    <td className="px-6 py-4">{row.need}</td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          "inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold uppercase tracking-wider " +
                          (row.best === "Hire"
                            ? "bg-cold-blue/10 text-cold-blue"
                            : "bg-orange/15 text-orange")
                        }
                      >
                        {row.best}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
            >
              {d.hireVsBuyCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ExHireSalesCallout />

      {/* AVAILABLE PREVIEW */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionTag>{d.availableTag}</SectionTag>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{d.availableHeading}</h2>
            </div>
            <Link
              href="/available-units"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cold-blue hover:text-navy"
            >
              {d.availableViewAll} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {d.availableUnits.map((u) => (
              <div key={u.type} className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                  <Image
                    src={u.img}
                    alt={u.type}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{u.type}</h3>
                  <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <dt>Internal</dt>
                      <dd className="text-foreground">{u.dims}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Power</dt>
                      <dd className="text-foreground">{u.power}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Hire</dt>
                      <dd className="font-semibold text-foreground">{u.price}</dd>
                    </div>
                  </dl>
                  <Link
                    href="/contact"
                    className="mt-5 block rounded border border-navy bg-white py-2.5 text-center text-sm font-semibold uppercase tracking-wide text-navy transition hover:bg-navy hover:text-white"
                  >
                    Request This Unit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FROM THE BLOG */}
      <BlogStrip
        heading="Cold Room Tips & Guides"
        intro="Practical advice on hiring, buying and running cold rooms and freezer rooms."
      />

      {/* TRUST */}
      <section className="bg-navy-deep text-white">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionTag dark>{d.trustTag}</SectionTag>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                {d.trustHeading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/75">{d.trustIntro}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {d.trustItems.map((t) => {
                const Icon = getIcon(t.icon);
                return (
                  <div key={t.label} className="flex items-center gap-3 rounded border border-white/10 bg-white/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-orange/15 text-orange">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">{t.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTag>{d.serviceTag}</SectionTag>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{d.serviceHeading}</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border-l-4 border-cold-blue bg-cold-blue/5 p-8">
              <div className="flex items-center gap-2 text-cold-blue">
                <Check className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-widest">
                  {d.serviceWithinLabel}
                </span>
              </div>
              <p className="mt-4 text-lg font-medium">{d.serviceWithinHeadline}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d.serviceWithinSub}</p>
            </div>
            <div className="rounded-lg border-l-4 border-orange bg-orange/5 p-8">
              <div className="flex items-center gap-2 text-orange">
                <Snowflake className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-widest">
                  {d.serviceOutsideLabel}
                </span>
              </div>
              <p className="mt-4 text-lg font-medium">{d.serviceOutsideHeadline}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d.serviceOutsideSub}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {d.serviceAreas.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faqs" className="scroll-mt-24 bg-muted/40 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SectionTag>{d.faqTag}</SectionTag>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{d.faqHeading}</h2>
          <FaqList items={faqs} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy-deep py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            {d.finalCtaHeadingPre}{" "}
            <span className="text-orange">{d.finalCtaHeadingHighlight}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/75">{d.finalCtaIntro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-orange px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
            >
              {d.finalCtaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${tel}`}
              className="inline-flex items-center gap-2 rounded border border-white/25 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-orange" /> Call {settings.telephone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionTag({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={
        "inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] " +
        (dark
          ? "border-white/15 bg-white/5 text-white/70"
          : "border-cold-blue/30 bg-cold-blue/5 text-cold-blue")
      }
    >
      <Snowflake className="h-3 w-3" />
      {children}
    </div>
  );
}
