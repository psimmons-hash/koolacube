import { createClient } from "@/lib/supabase/server";
import { normalizeRelatedLinks, type RelatedLink } from "@/lib/post-links";
import { normalizeBody, type PostSection } from "@/lib/post-blocks";

export type { RelatedLink } from "@/lib/post-links";
export type { PostSection, ContentBlock } from "@/lib/post-blocks";
export { normalizeBody } from "@/lib/post-blocks";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string;
  read_time: string;
  date: string;
  body: PostSection[];
  related_links: RelatedLink[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
};



export const STATIC_TOURISM_POST: Post = {
  id: "static-tourism-cold-storage-20260919",
  slug: "cold-storage-for-tourism-resorts-attractions",
  title: "Cold Storage for Tourism Venues: Managing Seasonal Demand, Difficult Access and Refurbishments",
  excerpt: "How resorts, attractions, hotels and tourism operators can use relocatable cold rooms and freezer rooms to add commercial storage capacity without permanent construction.",
  category: "Tourism",
  cover_image: "/unit-coldroom.jpg",
  read_time: "6 min read",
  date: "19 September 2026",
  body: [
    {
      heading: "Tourism venues can have unusual cold-storage constraints",
      blocks: [
        { type: "paragraph", text: "Resorts, attractions, hotels and destination venues can experience sharp changes in demand around school holidays, events and peak visitor periods. At the same time, back-of-house space may be limited and delivery access can be more difficult than at a conventional warehouse or food-production site." },
        { type: "paragraph", text: "That combination makes cold-storage planning an operating issue, not just an equipment issue. The site needs enough refrigerated capacity for its real peak requirement, a practical way to receive and handle stock, and a plan for what happens when permanent refrigeration is being repaired, replaced or refurbished." }
      ]
    },
    {
      heading: "Where relocatable cold rooms can help",
      blocks: [
        { type: "list", style: "bullet", items: [
          "Seasonal overflow when permanent cold-room capacity is not enough.",
          "Long-term additional storage for growing venues that are not ready for permanent construction.",
          "Temporary capacity during cold-room refurbishment or replacement projects.",
          "Freezer storage for tourism venues with changing menu, event or stock requirements.",
          "Back-of-house storage where building works would be disruptive, slow or impractical.",
          "Operational contingency where loss of a permanent cold room would create an immediate stock problem."
        ] }
      ]
    },
    {
      heading: "Difficult access changes the storage strategy",
      blocks: [
        { type: "paragraph", text: "Some tourism sites have constrained loading areas, steep or restricted access, limited delivery windows or long internal movements from the delivery point to kitchens and bars. In those environments, simply increasing the size of deliveries is not always the best answer." },
        { type: "paragraph", text: "A practical storage plan can combine the right refrigerated capacity with delivery frequency, stock format and placement. Smaller stock formats may be easier to move through difficult sites, while a relocatable cold room positioned closer to the operating area can reduce repeated handling and pressure on existing storage." }
      ]
    },
    {
      heading: "Hire can solve a different problem from buying",
      blocks: [
        { type: "paragraph", text: "Long-term hire can suit venues that need extra capacity without committing capital to a permanent build, or where the requirement may change after a refurbishment, expansion or seasonal operating cycle. Buying can make more sense when the storage requirement is permanent and ownership is preferred." },
        { type: "paragraph", text: "Koolacube provides relocatable cold rooms and freezer rooms for long-term commercial hire and sale. Maintenance and breakdown support is provided within our service area, while delivery, site setup and requirements outside the service area are assessed separately." }
      ]
    },
    {
      heading: "Plan before the busy period",
      blocks: [
        { type: "list", style: "number", items: [
          "Estimate the maximum realistic refrigerated and frozen stock requirement during peak trade.",
          "Identify the site location available for a relocatable unit and confirm access for delivery and placement.",
          "Check power supply, drainage, loading access and safe staff access.",
          "Decide whether the need is temporary, long-term or effectively permanent.",
          "Allow enough lead time to organise delivery and setup before the venue reaches peak demand."
        ] },
        { type: "paragraph", text: "The goal is straightforward: add cold-storage capacity before lack of space becomes an operating problem. For tourism venues, that can be the difference between a controlled peak period and constant pressure on stock, deliveries and existing refrigeration." }
      ]
    }
  ],
  related_links: [
    { label: "Tourism, Resorts & Attractions", href: "/industries" },
    { label: "Cold Room Hire", href: "/hire/cold-room" },
    { label: "Freezer Room Hire", href: "/hire/freezer-room" },
    { label: "Contact Koolacube", href: "/contact" }
  ],
  is_published: true,
  created_at: "2026-09-19T00:00:00.000Z",
  updated_at: "2026-09-19T00:00:00.000Z"
};

function hydrate(row: Record<string, unknown>): Post {
  return {
    ...(row as Post),
    body: normalizeBody(row.body),
    related_links: normalizeRelatedLinks(row.related_links),
  };
}

/** Published posts for the public blog, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    if (error || !data) return [STATIC_TOURISM_POST];
    const posts = data.map(hydrate);
    return posts.some((post) => post.slug === STATIC_TOURISM_POST.slug)
      ? posts
      : [STATIC_TOURISM_POST, ...posts];
  } catch {
    return [STATIC_TOURISM_POST];
  }
}

/** The most recent published posts (for home / hub-page "from the blog" strips). */
export async function getRecentPosts(limit = 3): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [STATIC_TOURISM_POST].slice(0, limit);
    const posts = data.map(hydrate).filter((post) => post.slug !== STATIC_TOURISM_POST.slug);
    return [STATIC_TOURISM_POST, ...posts].slice(0, limit);
  } catch {
    return [STATIC_TOURISM_POST].slice(0, limit);
  }
}

/**
 * Published posts that link to a given internal path via related_links.
 * Lets a destination page (e.g. /industries) surface the articles about it.
 * Falls back to the most recent posts when nothing links to the path yet.
 */
export async function getPostsLinkingTo(href: string, limit = 3): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .contains("related_links", [{ href }])
      .order("created_at", { ascending: false })
      .limit(limit);
    const staticMatches = STATIC_TOURISM_POST.related_links.some((link) => link.href === href)
      ? [STATIC_TOURISM_POST]
      : [];
    if (error) return staticMatches.length ? staticMatches.slice(0, limit) : getRecentPosts(limit);
    const posts = (data ?? []).map(hydrate).filter((post) => post.slug !== STATIC_TOURISM_POST.slug);
    if (staticMatches.length === 0 && posts.length === 0) return getRecentPosts(limit);
    return [...staticMatches, ...posts].slice(0, limit);
  } catch {
    return STATIC_TOURISM_POST.related_links.some((link) => link.href === href)
      ? [STATIC_TOURISM_POST].slice(0, limit)
      : getRecentPosts(limit);
  }
}

/** A single published post by slug, or null if not found / unpublished. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (slug === STATIC_TOURISM_POST.slug) return STATIC_TOURISM_POST;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();
    if (error || !data) return null;
    return hydrate(data);
  } catch {
    return null;
  }
}

/** Slugs of all published posts — for related links / static params. */
export async function getPublishedSlugs(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("slug")
      .eq("is_published", true);
    if (error || !data) return [STATIC_TOURISM_POST.slug];
    const slugs = data.map((r) => r.slug as string);
    return slugs.includes(STATIC_TOURISM_POST.slug) ? slugs : [STATIC_TOURISM_POST.slug, ...slugs];
  } catch {
    return [STATIC_TOURISM_POST.slug];
  }
}

/** A single post by id (published or draft) for the admin editor. */
export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
  if (error || !data) return null;
  return hydrate(data);
}

/** Every post (published or draft) for the admin list, newest first. */
export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(hydrate);
}
