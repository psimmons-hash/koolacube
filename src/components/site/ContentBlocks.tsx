import type { ContentBlock } from "@/lib/post-blocks";
import {
  CONTRAST_COLOR_HEX,
  contrastStyles,
} from "@/components/admin/content-sections/constants";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  PhoneOff,
  Phone,
  User,
  Users,
  UserX,
  RefreshCw,
  Receipt,
  Clock,
  History,
  CalendarDays,
  Lightbulb,
  Zap,
  Wrench,
  Settings,
  ShieldCheck,
  Banknote,
  ArrowRight,
  Store,
  TrendingUp,
  Thermometer,
  Droplet,
  Building,
  Eye,
  Maximize2,
  Snowflake,
  Frown,
  ChevronDown,
} from "lucide-react";

const STEP_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "phone-off": PhoneOff,
  phone: Phone,
  user: User,
  users: Users,
  "user-x": UserX,
  "refresh-cw": RefreshCw,
  receipt: Receipt,
  clock: Clock,
  history: History,
  "calendar-days": CalendarDays,
  lightbulb: Lightbulb,
  zap: Zap,
  wrench: Wrench,
  settings: Settings,
  "check-circle-2": CheckCircle2,
  "x-circle": XCircle,
  "alert-triangle": AlertTriangle,
  "shield-check": ShieldCheck,
  banknote: Banknote,
  "arrow-right": ArrowRight,
  store: Store,
  "trending-up": TrendingUp,
  thermometer: Thermometer,
  droplet: Droplet,
  building: Building,
  eye: Eye,
  maximize: Maximize2,
  snowflake: Snowflake,
  frown: Frown,
};

const CONTRAST_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  warning: AlertTriangle,
  check: CheckCircle2,
  x: XCircle,
  info: Info,
};
Object.assign(CONTRAST_ICON_MAP, STEP_ICON_MAP);

function renderRichText(text: string) {
  if (!text) return null;
  type Seg = { type: "bullet" | "numbered" | "text"; lines: string[] };
  const segments: Seg[] = [];

  for (const raw of text.split("\n")) {
    const isBullet = /^•/.test(raw);
    const isNumbered = /^\d+\.\s/.test(raw);
    const type = isBullet ? "bullet" : isNumbered ? "numbered" : "text";
    const content = isBullet
      ? raw.replace(/^•\s*/, "")
      : isNumbered
      ? raw.replace(/^\d+\.\s/, "")
      : raw;
    const last = segments[segments.length - 1];
    if (last && last.type === type) last.lines.push(content);
    else segments.push({ type, lines: [content] });
  }

  return (
    <div className="space-y-1">
      {segments.map((seg, i) => {
        if (seg.type === "bullet") {
          return (
            <ul key={i} className="space-y-0.5">
              {seg.lines.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-1.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="flex-shrink-0 select-none leading-relaxed">•</span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (seg.type === "numbered") {
          return (
            <ol key={i} className="space-y-0.5">
              {seg.lines.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-1.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="flex-shrink-0 font-medium tabular-nums opacity-50">{j + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
          );
        }
        return seg.lines
          .filter((l) => l.trim())
          .map((line, j) => (
            <p key={`${i}-${j}`} className="text-sm leading-relaxed text-muted-foreground">
              {line}
            </p>
          ));
      })}
    </div>
  );
}

function InlineLinks({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\(\/(?!\/)[^)\s]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\((\/(?!\/)[^)\s]+)\)$/);
    return match ? <a key={index} href={match[2]} className="underline underline-offset-4 hover:text-primary">{match[1]}</a> : part;
  });
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      if (block.style === "h2")
        return <h2 className="text-2xl font-bold leading-tight text-foreground">{block.text}</h2>;
      if (block.style === "h3")
        return <h3 className="text-xl font-bold leading-tight text-foreground">{block.text}</h3>;
      if (block.style === "h4")
        return <h4 className="text-base font-semibold leading-snug text-foreground">{block.text}</h4>;
      return <p className="leading-relaxed text-foreground/80">{block.format === "markdown-links" ? <InlineLinks text={block.text} /> : block.text}</p>;

    case "image":
      return (
        <figure className="my-4">
          <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.src} alt={block.alt || ""} className="h-auto w-full object-cover" />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-xs italic text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "blockquote":
      return (
        <blockquote className="my-2 rounded-r-xl border-l-4 border-primary/50 bg-primary/5 py-4 pl-5">
          <p className="font-medium italic leading-relaxed text-foreground/80">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.cite && (
            <cite className="mt-2 block text-xs font-semibold uppercase not-italic tracking-wide text-muted-foreground">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );

    case "list": {
      const Tag = block.style === "bullet" ? "ul" : "ol";
      const listClass =
        block.style === "bullet"
          ? "list-disc marker:text-primary"
          : block.style === "number"
          ? "list-decimal marker:text-primary marker:font-bold"
          : "list-[lower-alpha] marker:text-primary";
      return (
        <Tag className={`${listClass} space-y-2 pl-6 leading-relaxed text-muted-foreground`}>
          {block.items.map((item, k) => (
            <li key={k} className="pl-1">
              {item}
            </li>
          ))}
        </Tag>
      );
    }

    case "faq":
      return (
        <div className="space-y-2">
          {block.items.map((item, k) => (
            <details
              key={k}
              className="group rounded-xl border border-border px-5 shadow-sm transition-all hover:border-primary/20 open:border-primary/30 open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-sm font-semibold text-foreground transition-colors hover:text-primary">
                {item.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.answer}</div>
            </details>
          ))}
        </div>
      );

    case "media-cards": {
      const hasSections = block.items.some((item) => item.sections?.length);

      if (hasSections) {
        const colClass = block.layout === "stack" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";
        return (
          <div className={`grid ${colClass} my-2 gap-4`}>
            {block.items.map((item, k) => (
              <div key={k} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {item.src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.src} alt={item.alt || ""} className="h-44 w-full object-cover" />
                )}
                <div className="space-y-4 p-5">
                  {(item.sections ?? []).map((section, si) => {
                    const sectionBadgeStyle = section.labelColor?.startsWith("#")
                      ? { backgroundColor: section.labelColor, color: "#fff" }
                      : contrastStyles(section.labelColor || "red").badge;
                    const dotColor = section.labelColor?.startsWith("#")
                      ? section.labelColor
                      : CONTRAST_COLOR_HEX[section.labelColor as keyof typeof CONTRAST_COLOR_HEX]?.c500 ??
                        "#ef4444";
                    return (
                      <div key={si} className="space-y-2">
                        {section.label && (
                          <span
                            className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                            style={sectionBadgeStyle}
                          >
                            {section.label}
                          </span>
                        )}
                        {section.contentType === "bullets" ? (
                          <ul className="space-y-2">
                            {(section.content ?? "")
                              .split("\n")
                              .filter(Boolean)
                              .map((line, li) => (
                                <li
                                  key={li}
                                  className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                                >
                                  <span
                                    className="flex-shrink-0 rounded-full"
                                    style={{
                                      backgroundColor: dotColor,
                                      width: "6px",
                                      height: "6px",
                                      marginTop: "7px",
                                    }}
                                  />
                                  {line}
                                </li>
                              ))}
                          </ul>
                        ) : (
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {section.content}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      }

      if (block.layout === "row") {
        return (
          <div className="my-2 space-y-3">
            {block.items.map((item, k) => (
              <div
                key={k}
                className="group flex items-center gap-4 rounded-xl border border-border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
              >
                {item.src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.alt || ""}
                    className="h-20 w-28 flex-shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 space-y-1">
                  <h4 className="text-sm font-semibold transition-colors group-hover:text-primary">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      }
      if (block.layout === "grid") {
        return (
          <div className="my-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((item, k) => (
              <div
                key={k}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
              >
                {item.src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.src} alt={item.alt || ""} className="h-44 w-full object-cover" />
                )}
                <div className="space-y-1.5 p-4">
                  <h4 className="text-sm font-semibold transition-colors group-hover:text-primary">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="my-2 space-y-6">
          {block.items.map((item, k) => (
            <div
              key={k}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md"
            >
              {item.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.src} alt={item.alt || ""} className="aspect-video w-full object-cover" />
              )}
              <div className="space-y-2 p-5">
                <h4 className="text-base font-semibold transition-colors group-hover:text-primary">
                  {item.title}
                </h4>
                <p className="leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    case "comparison":
      return (
        <div className="my-2 overflow-hidden rounded-xl border border-border shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60">
                <th className="w-1/3 px-4 py-3 text-left font-semibold text-muted-foreground">
                  {block.featureLabel || "Feature"}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">{block.leftLabel}</th>
                <th className="border-l border-border px-4 py-3 text-left font-semibold text-foreground">
                  {block.rightLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, k) => (
                <tr
                  key={k}
                  className="border-b border-border odd:bg-background even:bg-secondary/20 last:border-0 hover:bg-primary/5"
                >
                  <td className="px-4 py-3 font-medium text-foreground/80">{row.feature}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.left}</td>
                  <td className="border-l border-border px-4 py-3 text-muted-foreground">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "contrast-panels": {
      const n = block.panels.length;
      const colClass =
        n <= 2
          ? "grid-cols-1 sm:grid-cols-2"
          : n === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : n === 4
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      return (
        <div className={`grid ${colClass} my-2 gap-4`}>
          {block.panels.map((panel, k) => {
            const Icon = panel.icon ? CONTRAST_ICON_MAP[panel.icon] : undefined;
            const colors = contrastStyles(panel.iconColor || "red");
            const badgeColors = panel.badgeColor ? contrastStyles(panel.badgeColor) : colors;
            return (
              <div key={k} className="space-y-3.5 rounded-2xl border border-border bg-card p-5 shadow-sm">
                {panel.badge && (
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={badgeColors.badge}
                  >
                    {panel.badge}
                  </span>
                )}
                {Icon && (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ ...colors.tintBg, ...colors.text500 }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                )}
                <h4 className="font-bold leading-snug text-foreground">{panel.heading}</h4>
                {panel.description && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{panel.description}</p>
                )}
                <ul className="space-y-2.5">
                  {panel.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full opacity-80"
                        style={colors.dot}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      );
    }

    case "before-after":
      return (
        <div className="my-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {block.panels.map((panel, pi) => {
            const cls = contrastStyles(panel.color || "red");
            return (
              <div key={pi} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="px-5 py-3" style={cls.headerRender}>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/85">
                    {panel.label}
                  </span>
                </div>
                <div className="px-5 py-4">
                  {panel.steps.map((step, si) => {
                    const IconComp = STEP_ICON_MAP[step.icon];
                    return (
                      <div key={si}>
                        <div className="flex items-start gap-3.5 py-3">
                          {IconComp && (
                            <div
                              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                              style={{ ...cls.tintBg, ...cls.text400 }}
                            >
                              <IconComp className="h-[18px] w-[18px]" />
                            </div>
                          )}
                          <div className="min-w-0 space-y-0.5">
                            <p className="text-sm font-bold leading-snug text-foreground">{step.title}</p>
                            {renderRichText(step.description)}
                          </div>
                        </div>
                        {si < panel.steps.length - 1 && (
                          <div className="ml-4 flex justify-center">
                            <div className="h-4 w-px bg-border" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "timeline-rows": {
      const tlColors = contrastStyles(block.labelColor || "amber");
      return (
        <div className="my-2 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {block.items.map((item, k) => {
            const IconComp = item.icon ? STEP_ICON_MAP[item.icon] : undefined;
            const hasLeft = IconComp || item.label;
            return (
              <div key={k} className="flex gap-5 px-5 py-4 transition-colors hover:bg-secondary/30">
                {hasLeft && (
                  <div className="flex flex-shrink-0 items-center gap-2 pt-0.5">
                    {IconComp && (
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ ...tlColors.tintBg, ...tlColors.text500 }}
                      >
                        <IconComp className="h-4 w-4" />
                      </div>
                    )}
                    {item.label && (
                      <span
                        className="whitespace-nowrap text-sm font-bold leading-snug"
                        style={tlColors.text500}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                )}
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-bold leading-snug text-foreground">{item.description}</p>
                  {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    case "table":
      return (
        <div className="my-2 overflow-x-auto rounded-xl border border-border shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left align-top font-semibold text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-border odd:bg-background even:bg-secondary/20 last:border-0 hover:bg-primary/5"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-4 py-3 align-top ${
                        ci === 0 ? "font-medium text-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "process-flow":
      return (
        <div className="my-2 overflow-x-auto">
          <div className="flex min-w-max items-stretch">
            {block.steps.map((step, k) => (
              <div key={k} className="flex items-center">
                <div
                  className="flex min-w-[130px] max-w-[190px] flex-col gap-1.5 rounded-xl px-4 py-3.5"
                  style={{ backgroundColor: "#1e3a5f" }}
                >
                  <p className="text-sm font-bold leading-snug text-white">{step.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#93c5fd" }}>
                    {step.description}
                  </p>
                </div>
                {k < block.steps.length - 1 && (
                  <div className="flex flex-shrink-0 items-center px-2">
                    <ArrowRight className="h-4 w-4" style={{ color: "#60a5fa" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "columns": {
      const colClasses: Record<number, string> = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      };
      const colClass = colClasses[block.columns.length] ?? "grid-cols-1 sm:grid-cols-2";
      return (
        <div className={`grid ${colClass} my-2 gap-4`}>
          {block.columns.map((col, ci) => (
            <div key={ci} className="min-w-0 space-y-4">
              {col.blocks.map((b, bi) => (
                <Block key={bi} block={b} />
              ))}
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}

/** Renders an ordered list of content blocks for a post section. */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

