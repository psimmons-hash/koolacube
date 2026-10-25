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



const APPROVED_CTR_POST: Post = {
  "id": "editorial-ex-hire-inspection-20261025",
  "slug": "inspecting-ex-hire-cold-room-before-buying",
  "title": "What to check when inspecting an ex hire cold room",
  "excerpt": "Inspecting a second-hand or ex-hire cold room? Check the actual unit, service history, site requirements and delivery scope before agreeing to buy.",
  "category": "Buying Guides",
  "cover_image": "",
  "read_time": "3 min read",
  "date": "25 October 2026",
  "body": [
    {
      "heading": "",
      "blocks": [
        {
          "type": "paragraph",
          "text": "An ex-hire cold room can be worth considering when your business needs its own chilled or frozen storage. Before deciding, inspect the actual unit and establish how it will fit your stock, site and operating requirements.",
          "format": "markdown-links"
        },
        {
          "type": "paragraph",
          "text": "Two rooms with similar external dimensions can differ in equipment, condition and configuration. Base the purchase on the unit being offered, with its specification and inclusions recorded in writing.",
          "format": "markdown-links"
        }
      ]
    },
    {
      "heading": "Confirm the storage requirement first",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Describe the products to be stored, the required storage conditions, the amount of stock and how often deliveries arrive. Explain whether staff will move cartons, trolleys or pallets through the doorway.",
          "format": "markdown-links"
        },
        {
          "type": "paragraph",
          "text": "Check usable internal space as well as external dimensions. Allow for the storage layout, equipment clearances and access needed in normal use. A room that physically fits the site may still be awkward for the way your team handles stock.",
          "format": "markdown-links"
        }
      ]
    },
    {
      "heading": "Inspect the room and ask for its history",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Look at accessible panels, the floor, door, seals and fittings. Ask the supplier to identify repairs, wear and any items that will be addressed before delivery. Photographs of the actual unit help keep the agreed condition clear.",
          "format": "markdown-links"
        },
        {
          "type": "paragraph",
          "text": "Request the equipment identification and available service history. Ask what inspection and operating checks have been completed, what they covered and whether any work remains outstanding.",
          "format": "markdown-links"
        },
        {
          "type": "paragraph",
          "text": "An operating demonstration is useful information, but it should be understood in context. Ask how the proposed unit is expected to meet your intended storage duty rather than relying only on a displayed temperature during an inspection.",
          "format": "markdown-links"
        }
      ]
    },
    {
      "heading": "Check the destination before arranging transport",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Provide the site address, photographs and the proposed position. Discuss access width and height, delivery vehicle access, the unloading method and any obstructions or restricted working hours.",
          "format": "markdown-links"
        },
        {
          "type": "paragraph",
          "text": "Have the supplier confirm the actual unit's power requirements and the preparation needed at your premises. Include ventilation, servicing access and the suitability of the proposed base in the discussion. Arrange any necessary site work before the delivery date is committed.",
          "format": "markdown-links"
        }
      ]
    },
    {
      "heading": "Compare the full purchase scope",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ask the quotation to identify the specific unit, included equipment and accessories, transport, unloading, setup and any separately priced work. Confirm how GST is treated and what needs to be ready at the site.",
          "format": "markdown-links"
        },
        {
          "type": "paragraph",
          "text": "Read the written warranty or sale terms and ask how faults are reported after delivery. Establish what support is available, who provides it and what is excluded. Compare those terms with the condition and price of the actual unit.",
          "format": "markdown-links"
        }
      ]
    },
    {
      "heading": "Choose the option that fits the business",
      "blocks": [
        {
          "type": "paragraph",
          "text": "If available ex-hire stock does not suit the required duty or site, compare it with a [new cold room](/buy/new) or [commercial cold room hire](/hire/cold-room). The available options may have different specifications and delivery requirements.",
          "format": "markdown-links"
        },
        {
          "type": "paragraph",
          "text": "Koolacube offers [second-hand and ex-hire cold rooms and freezer rooms](/buy/ex-hire) from its commercial fleet. Units are inspected and tested before sale. Call 1300 561 030 to discuss current stock, arrange an inspection and confirm suitability for your premises.",
          "format": "markdown-links"
        }
      ]
    }
  ],
  "related_links": [
    {
      "label": "new cold room",
      "href": "/buy/new"
    },
    {
      "label": "commercial cold room hire",
      "href": "/hire/cold-room"
    },
    {
      "label": "second-hand and ex-hire cold rooms and freezer rooms",
      "href": "/buy/ex-hire"
    }
  ],
  "is_published": true,
  "created_at": "2026-10-25T00:00:00.000Z",
  "updated_at": "2026-10-25T00:00:00.000Z"
};

export const STATIC_TOURISM_POST: Post = {
  id: "static-tourism-cold-storage-20260919",
  slug: "cold-storage-for-tourism-resorts-attractions",
  title: "Cold Storage for Tourism Venues: Managing Seasonal Demand, Difficult Access and Refurbishments",
  excerpt: "How resorts, attractions, hotels and tourism operators can use relocatable cold rooms and freezer rooms to add commercial storage capacity without permanent construction.",
  category: "Tourism",
  cover_image: "/koolacube-tourism-cold-storage-second.jpg",
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

const STATIC_POSTS: Post[] = [APPROVED_CTR_POST, STATIC_TOURISM_POST];

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
    if (error || !data) return STATIC_POSTS;
    const posts = data.map(hydrate);
    return [...STATIC_POSTS, ...posts.filter((post) => !STATIC_POSTS.some((item) => item.slug === post.slug))];
  } catch {
    return STATIC_POSTS;
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
    if (error || !data) return STATIC_POSTS.slice(0, limit);
    const posts = data.map(hydrate).filter((post) => !STATIC_POSTS.some((item) => item.slug === post.slug));
    return [...STATIC_POSTS, ...posts].slice(0, limit);
  } catch {
    return STATIC_POSTS.slice(0, limit);
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
    const staticMatches = STATIC_POSTS.filter((post) => post.related_links.some((link) => link.href === href));
    if (error) return staticMatches.length ? staticMatches.slice(0, limit) : getRecentPosts(limit);
    const posts = (data ?? []).map(hydrate).filter((post) => !STATIC_POSTS.some((item) => item.slug === post.slug));
    if (staticMatches.length === 0 && posts.length === 0) return getRecentPosts(limit);
    return [...staticMatches, ...posts].slice(0, limit);
  } catch {
    const staticMatches = STATIC_POSTS.filter((post) => post.related_links.some((link) => link.href === href));
    return staticMatches.length ? staticMatches.slice(0, limit) : getRecentPosts(limit);
  }
}

/** A single published post by slug, or null if not found / unpublished. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const staticPost = STATIC_POSTS.find((post) => post.slug === slug);
  if (staticPost) return staticPost;
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
    if (error || !data) return STATIC_POSTS.map((post) => post.slug);
    const slugs = data.map((r) => r.slug as string);
    return [...new Set([...STATIC_POSTS.map((post) => post.slug), ...slugs])];
  } catch {
    return STATIC_POSTS.map((post) => post.slug);
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

