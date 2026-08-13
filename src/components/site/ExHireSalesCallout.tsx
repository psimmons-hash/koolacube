import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

type Props = {
  actionHref?: string;
  actionLabel?: string;
  heading?: string;
  tone?: "white" | "muted";
};

const facts = [
  "1.8m × 2.4m units",
  "Cold rooms and freezer rooms",
  "Ex-hire from $10,500",
  "Very good condition — many like new",
];

export function ExHireSalesCallout({
  actionHref = "/buy/ex-hire",
  actionLabel = "View Ex-Hire Units for Sale",
  heading = "Second-Hand Cold Rooms and Freezer Rooms for Sale",
  tone = "muted",
}: Props) {
  return (
    <section
      id="current-ex-hire-stock"
      className={tone === "white" ? "bg-white py-12" : "bg-cold-blue/5 py-12"}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 rounded-xl border border-cold-blue/25 bg-white p-7 shadow-sm md:grid-cols-[1.35fr_1fr] md:p-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
              Current Ex-Hire Stock
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-lg">
              Koolacube currently has 1.8m × 2.4m ex-hire cold rooms and freezer rooms
              for sale from $10,500. Units are in very good condition, with many
              presenting like new. Each unit is inspected and tested before sale.
            </p>
            <Link
              href={actionHref}
              className="mt-6 inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
            >
              {actionLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="grid content-center gap-3 sm:grid-cols-2 md:grid-cols-1">
            {facts.map((fact) => (
              <li
                key={fact}
                className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm font-medium"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cold-blue" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
