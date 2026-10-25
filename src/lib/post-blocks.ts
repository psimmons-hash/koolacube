import { z } from "zod";

// ── Content block types ──────────────────────────────────────────────────────
// Ported from acrorefrigeration's blog content-block system.

export type LeafContentBlock =
  | { type: "paragraph"; text: string; format?: "markdown-links"; style?: "paragraph" | "h2" | "h3" | "h4" }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "blockquote"; text: string; cite?: string }
  | { type: "list"; style: "bullet" | "number" | "letter"; items: string[] }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | {
      type: "media-cards";
      layout: "row" | "grid" | "stack";
      items: {
        src?: string;
        alt?: string;
        title?: string;
        description?: string;
        sections?: {
          label?: string;
          labelColor?: string;
          contentType?: "paragraph" | "bullets";
          content?: string;
        }[];
      }[];
    }
  | {
      type: "comparison";
      featureLabel?: string;
      leftLabel: string;
      rightLabel: string;
      rows: { feature: string; left: string; right: string }[];
    }
  | {
      type: "contrast-panels";
      panels: {
        icon?: string;
        iconColor: "red" | "green" | "blue" | "amber";
        badge?: string;
        badgeColor?: "red" | "green" | "blue" | "amber";
        heading: string;
        description?: string;
        items: string[];
      }[];
    }
  | {
      type: "before-after";
      panels: {
        label: string;
        color: "red" | "green" | "blue" | "amber";
        steps: { icon: string; title: string; description: string }[];
      }[];
    }
  | {
      type: "timeline-rows";
      labelColor?: "amber" | "red" | "green" | "blue";
      items: { icon?: string; label?: string; description: string; subtitle?: string }[];
    }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "process-flow"; steps: { title: string; description: string }[] };

export type ContentBlock =
  | LeafContentBlock
  | { type: "columns"; columns: { blocks: LeafContentBlock[] }[] };

export type PostSection = {
  heading: string;
  blocks: ContentBlock[];
};

// ── Zod schemas (for the react-hook-form editor) ─────────────────────────────

const paragraphSchema = z.object({
  type: z.literal("paragraph"),
  format: z.literal("markdown-links").optional(),
  style: z.enum(["paragraph", "h2", "h3", "h4"]).optional(),
  text: z.string().min(1, "Cannot be empty"),
});
const imageSchema = z.object({
  type: z.literal("image"),
  src: z.string().min(1, "Image required"),
  alt: z.string().optional(),
  caption: z.string().optional(),
});
const blockquoteSchema = z.object({
  type: z.literal("blockquote"),
  text: z.string().min(1, "Cannot be empty"),
  cite: z.string().optional(),
});
const listSchema = z.object({
  type: z.literal("list"),
  style: z.enum(["bullet", "number", "letter"]),
  items: z.array(z.string().min(1, "Item cannot be empty")).min(1),
});
const faqSchema = z.object({
  type: z.literal("faq"),
  items: z
    .array(z.object({ question: z.string().min(1), answer: z.string().min(1) }))
    .min(1),
});
const mediaCardsSchema = z.object({
  type: z.literal("media-cards"),
  layout: z.enum(["row", "grid", "stack"]),
  items: z
    .array(
      z.object({
        src: z.string().nullish(),
        alt: z.string().nullish(),
        title: z.string().nullish(),
        description: z.string().nullish(),
        sections: z
          .array(
            z.object({
              label: z.string().nullish(),
              labelColor: z.string().nullish(),
              contentType: z.enum(["paragraph", "bullets"]).nullish(),
              content: z.string().nullish(),
            })
          )
          .nullish(),
      })
    )
    .min(1),
});
const comparisonSchema = z.object({
  type: z.literal("comparison"),
  featureLabel: z.string().optional(),
  leftLabel: z.string().min(1, "Left label required"),
  rightLabel: z.string().min(1, "Right label required"),
  rows: z
    .array(
      z.object({
        feature: z.string().min(1, "Feature required"),
        left: z.string().min(1, "Value required"),
        right: z.string().min(1, "Value required"),
      })
    )
    .min(1),
});
const contrastPanelsSchema = z.object({
  type: z.literal("contrast-panels"),
  panels: z
    .array(
      z.object({
        icon: z.string().optional(),
        iconColor: z.enum(["red", "green", "blue", "amber"]),
        badge: z.string().optional(),
        badgeColor: z.enum(["red", "green", "blue", "amber"]).optional(),
        heading: z.string().min(1, "Heading required"),
        description: z.string().optional(),
        items: z.array(z.string().min(1, "Item cannot be empty")).min(1),
      })
    )
    .min(2)
    .max(6),
});
const tableSchema = z.object({
  type: z.literal("table"),
  headers: z.array(z.string().min(1, "Header required")).min(1),
  rows: z.array(z.array(z.string())).min(1),
});
const timelineRowsSchema = z.object({
  type: z.literal("timeline-rows"),
  labelColor: z.enum(["amber", "red", "green", "blue"]).optional(),
  items: z
    .array(
      z.object({
        icon: z.string().optional(),
        label: z.string().optional(),
        description: z.string().min(1, "Description required"),
        subtitle: z.string().optional(),
      })
    )
    .min(1),
});
const processFlowSchema = z.object({
  type: z.literal("process-flow"),
  steps: z
    .array(
      z.object({
        title: z.string().min(1, "Title required"),
        description: z.string().min(1, "Description required"),
      })
    )
    .min(2),
});
const beforeAfterSchema = z.object({
  type: z.literal("before-after"),
  panels: z
    .array(
      z.object({
        label: z.string().min(1, "Panel label required"),
        color: z.enum(["red", "green", "blue", "amber"]),
        steps: z
          .array(
            z.object({
              icon: z.string().optional(),
              title: z.string().min(1, "Title required"),
              description: z.string().min(1, "Description required"),
            })
          )
          .min(1),
      })
    )
    .min(2)
    .max(2),
});

export const leafBlockSchema = z.discriminatedUnion("type", [
  paragraphSchema,
  imageSchema,
  blockquoteSchema,
  listSchema,
  faqSchema,
  mediaCardsSchema,
  comparisonSchema,
  contrastPanelsSchema,
  beforeAfterSchema,
  timelineRowsSchema,
  tableSchema,
  processFlowSchema,
]);

const columnsSchema = z.object({
  type: z.literal("columns"),
  columns: z
    .array(z.object({ blocks: z.array(leafBlockSchema).min(1, "Each column needs at least one block") }))
    .min(2, "At least 2 columns required")
    .max(4, "Maximum 4 columns"),
});

export const blockSchema = z.discriminatedUnion("type", [
  paragraphSchema,
  imageSchema,
  blockquoteSchema,
  listSchema,
  faqSchema,
  mediaCardsSchema,
  comparisonSchema,
  contrastPanelsSchema,
  beforeAfterSchema,
  timelineRowsSchema,
  tableSchema,
  processFlowSchema,
  columnsSchema,
]);

export const sectionSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  blocks: z.array(blockSchema).min(1, "At least one block is required"),
});

export type LeafBlockData = z.infer<typeof leafBlockSchema>;
export type BlockData = z.infer<typeof blockSchema>;
export type SectionData = z.infer<typeof sectionSchema>;

// ── Normalisers ──────────────────────────────────────────────────────────────

/** Normalise raw blocks: handle JSON-stringified blocks and plain strings. */
export function normalizeBlocks(raw: unknown): ContentBlock[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (typeof item === "string") {
        if (item.startsWith("{")) {
          try {
            const parsed = JSON.parse(item);
            if (parsed && typeof parsed.type === "string") return parsed as ContentBlock;
          } catch {
            /* fall through */
          }
        }
        return { type: "paragraph", text: item } as ContentBlock;
      }
      return item as ContentBlock;
    })
    .filter((b) => b && typeof b.type === "string");
}

/**
 * Normalise the stored jsonb body into PostSection[]. Backward-compatible with
 * the earlier `{ heading, paragraphs: string[] }` shape, which is upgraded to
 * paragraph blocks on read.
 */
export function normalizeBody(raw: unknown): PostSection[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s) => {
      const section = (s ?? {}) as Record<string, unknown>;
      const heading = typeof section.heading === "string" ? section.heading : "";
      if (Array.isArray(section.blocks)) {
        return { heading, blocks: normalizeBlocks(section.blocks) };
      }
      // legacy: { heading, paragraphs: string[] }
      const paragraphs = Array.isArray(section.paragraphs)
        ? section.paragraphs.filter((p): p is string => typeof p === "string")
        : [];
      return {
        heading,
        blocks: paragraphs.map((text) => ({ type: "paragraph", text }) as ContentBlock),
      };
    })
    .filter((s) => s.heading || s.blocks.length > 0);
}

