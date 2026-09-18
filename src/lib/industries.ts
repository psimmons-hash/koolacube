import { createClient } from "@/lib/supabase/server";

export type Industry = {
  id: string;
  slug: string;
  icon: string;
  name: string;
  tagline: string;
  intro: string;
  challenges: string[];
  helps: string[];
  display_order: number;
  is_published: boolean;
};

/** Current hardcoded industries — used as the fallback before any are saved. */
export const DEFAULT_INDUSTRIES: Industry[] = [
  {
    id: "hospitality",
    slug: "hospitality",
    icon: "ChefHat",
    name: "Hospitality & Catering",
    tagline: "Portable Cool Rooms & Freezer Rooms for Restaurants, Cafés & Catering",
    intro:
      "In hospitality, consistent temperature control is critical. Koolacube offers reliable, food-safe refrigerated storage for kitchens of all sizes—whether you're running a café, restaurant, catering business or food truck.",
    challenges: [
      "Ongoing storage capacity as the business grows",
      "Need for reliable cold storage during upgrades or breakdowns",
      "Compliance with food safety standards",
      "Consistent, high-volume catering demand",
    ],
    helps: [
      "Portable Cool Rooms & Freezer Rooms for ongoing, long-term use",
      "Fast delivery and maintenance-backed reliability",
      "Food-grade interiors meeting all HACCP and safety guidelines",
      "Scalable solutions: from 3m units for small kitchens to 9m units for bulk storage",
    ],
    display_order: 0,
    is_published: true,
  },
  {
    id: "aged-care",
    slug: "aged-care",
    icon: "HeartPulse",
    name: "Aged Care & Healthcare",
    tagline: "Compliant, Food-Safe & Medical-Grade Refrigeration Solutions",
    intro:
      "Aged-care kitchens and healthcare facilities require strict temperature stability and compliance. Koolacube delivers reliable, hygienic and regulation-ready cold room solutions for food, medication and specialised items.",
    challenges: [
      "Compliance with strict health & safety standards",
      "Need for reliable backup refrigeration",
      "Diverse temperature requirements for food and medical supplies",
      "Space limitations",
    ],
    helps: [
      "Cool Rooms, Freezer Rooms & Dual Temp Rooms suitable for food and medical storage",
      "Precise temperature control with digital thermostats",
      "Clean, food-grade interiors designed for hygiene and compliance",
      "Rapid deployment during refurbishments, emergencies or equipment failure",
    ],
    display_order: 1,
    is_published: true,
  },
  {
    id: "education",
    slug: "education",
    icon: "GraduationCap",
    name: "Education & Schools",
    tagline: "Portable Refrigeration for School Canteens & Catering",
    intro:
      "Schools need dependable cooling solutions for canteen operations, food technology labs and storage overflow. Koolacube provides safe, easy-to-use and reliable cold rooms for educational facilities on ongoing hire.",
    challenges: [
      "Additional storage for canteens and meal programs",
      "Canteen refrigeration breakdowns",
      "Growing storage requirements across the school year",
      "Limited kitchen space",
    ],
    helps: [
      "Portable cool rooms for canteen and catering support",
      "Freezer rooms for canteen and meal-prep support",
      "Safe, lockable units suitable for school environments",
      "Ongoing, long-term hire options to suit each facility",
    ],
    display_order: 2,
    is_published: true,
  },
  {
    id: "tourism",
    slug: "tourism-resorts-attractions",
    icon: "Hotel",
    name: "Tourism, Resorts & Attractions",
    tagline: "Relocatable Cold Storage for Resorts, Attractions & Tourism Venues",
    intro:
      "Tourism operators often face seasonal peaks, difficult site access and limited back-of-house storage. Koolacube provides relocatable cold rooms and freezer rooms for resorts, attractions, accommodation venues and tourism operations that need dependable extra capacity.",
    challenges: [
      "Seasonal and holiday-period demand spikes",
      "Limited or difficult-access back-of-house storage",
      "Need for extra capacity during refurbishments or major events",
      "Reliable cold storage where permanent construction is impractical",
    ],
    helps: [
      "Relocatable cold rooms and freezer rooms for long-term commercial use",
      "Extra onsite capacity without permanent building works",
      "Suitable for food, beverages and back-of-house stock",
      "Maintenance and breakdown support within our service area",
    ],
    display_order: 4,
    is_published: true,
  },
  {
    id: "construction",
    slug: "construction",
    icon: "HardHat",
    name: "Construction & Mining",
    tagline: "Heavy-Duty, Portable Cold Rooms for Remote & On-Site Operations",
    intro:
      "Construction and mining sites require rugged, reliable and easily transportable cold storage for food, hydration supplies, and temperature-sensitive materials. Koolacube provides industrial-grade cold rooms built for harsh environments.",
    challenges: [
      "Remote locations with limited infrastructure",
      "Extreme temperatures",
      "Need for durable, transportable solutions",
      "Storage for workforce food supplies and materials",
    ],
    helps: [
      "Robust Cool Rooms & Freezer Rooms built for tough site conditions",
      "Portable designs with forklift pockets and towable options",
      "Stable temperature performance in high-heat environments",
      "Ideal for camps, site kitchens, workforce hydration stations",
    ],
    display_order: 3,
    is_published: true,
  },
];

/** Published industries for the public site, ordered. Falls back to defaults. */
export async function getPublishedIndustries(): Promise<Industry[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return DEFAULT_INDUSTRIES;
    const industries = data as Industry[];
    const tourism = DEFAULT_INDUSTRIES.find((industry) => industry.slug === "tourism-resorts-attractions");
    if (!tourism || industries.some((industry) => industry.slug === tourism.slug)) return industries;
    return [...industries, tourism].sort((a, b) => a.display_order - b.display_order);
  } catch {
    return DEFAULT_INDUSTRIES;
  }
}
