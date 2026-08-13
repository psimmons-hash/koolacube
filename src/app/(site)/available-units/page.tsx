import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, CtaStrip } from "@/components/site/PageHero";
import { BlogStrip } from "@/components/site/BlogStrip";
import { ExHireSalesCallout } from "@/components/site/ExHireSalesCallout";
import { getPublishedUnits, type Unit } from "@/lib/units";
import { getIntroPage, introPageMetadata } from "@/lib/content/render-intro";
import { getIcon } from "@/lib/icons";
import { Check, ArrowRight } from "lucide-react";

export function generateMetadata(): Promise<Metadata> {
  return introPageMetadata("/available-units");
}

export default async function Page() {
  const [units, content] = await Promise.all([
    getPublishedUnits(),
    getIntroPage("/available-units"),
  ]);
  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        crumb={content.crumb}
        title={content.title}
        intro={content.intro}
      />

      {/* Quick jump */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-5">
          <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Jump to:
          </span>
          {units.map((u) => {
            const Icon = getIcon(u.icon);
            return (
              <a
                key={u.slug}
                href={`#${u.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-cold-blue hover:text-cold-blue"
              >
                <Icon className="h-3.5 w-3.5" />
                {u.name.split(" — ")[0]}
              </a>
            );
          })}
        </div>
      </section>

      <ExHireSalesCallout tone="white" />

      {units.map((unit, idx) => (
        <UnitSection key={unit.slug} unit={unit} alt={idx % 2 === 1} />
      ))}

      <BlogStrip
        linkingTo="/available-units"
        heading="Related Reading"
        tone="muted"
      />

      <CtaStrip />
    </>
  );
}

function UnitSection({ unit, alt }: { unit: Unit; alt: boolean }) {
  const Icon = getIcon(unit.icon);
  return (
    <section
      id={unit.slug}
      className={"scroll-mt-24 py-16 md:py-20 " + (alt ? "bg-muted/40" : "bg-white")}
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cold-blue/10 text-cold-blue">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl">
              {unit.name}
            </h2>
          </div>
          <p className="mt-4 text-base font-semibold text-cold-blue md:text-lg">
            {unit.tagline}
          </p>
          <p className="mt-3 text-base leading-relaxed text-foreground/75">{unit.intro}</p>
        </div>

        {/* Image + spec table */}
        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-navy shadow-sm">
              <Image
                src={unit.img}
                alt={unit.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
              <div className="bg-navy px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white">
                Standard Dimensions & Specifications
              </div>
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-border">
                  {unit.specs.map((s) => (
                    <tr key={s.feature}>
                      <th
                        scope="row"
                        className="w-2/5 bg-muted/30 px-6 py-3.5 align-top font-semibold text-foreground"
                      >
                        {s.feature}
                      </th>
                      <td className="px-6 py-3.5 align-top text-muted-foreground">
                        {Array.isArray(s.value) ? (
                          <span className="flex flex-col gap-1">
                            {s.value.map((line) => (
                              <span key={line}>{line}</span>
                            ))}
                          </span>
                        ) : (
                          s.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ideal applications */}
        <div className="mt-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
            Ideal Applications
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unit.applications.map((a) => (
              <li
                key={a}
                className="flex items-start gap-3 rounded border border-border bg-white p-4 text-sm shadow-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cold-blue" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
          >
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
