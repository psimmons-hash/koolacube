/**
 * Serializable defaults for the home page (`/`). Client-safe (data + types).
 * Icons stored as name strings (resolved via getIcon at render). The FAQ list
 * itself stays DB-driven via getPublishedFaqs — only its heading lives here.
 */

export type HomeProduct = {
  icon: string;
  type: string;
  price: number;
  daily: string;
  img: string;
  blurb: string;
};
export type HomeUnit = {
  type: string;
  dims: string;
  power: string;
  price: string;
  img: string;
};

export type HomeStored = {
  metaTitle: string;
  metaDescription: string;

  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroIntro: string;
  heroPrimaryCta: string;
  heroBuyCta: string;
  heroTrust: string[];

  productsTag: string;
  productsHeading: string;
  products: HomeProduct[];
  productsFootnote: string;

  positioningTag: string;
  positioningHeadingPre: string;
  positioningHeadingHighlight: string;
  positioningIntro: string;
  positioningIndustries: string[];

  includedTag: string;
  includedHeading: string;
  included: string[];
  excluded: string[];

  hireVsBuyTag: string;
  hireVsBuyHeading: string;
  decisions: { need: string; best: string }[];
  hireVsBuyCta: string;

  availableTag: string;
  availableHeading: string;
  availableViewAll: string;
  availableUnits: HomeUnit[];

  trustTag: string;
  trustHeading: string;
  trustIntro: string;
  trustItems: { icon: string; label: string }[];

  serviceTag: string;
  serviceHeading: string;
  serviceWithinLabel: string;
  serviceWithinHeadline: string;
  serviceWithinSub: string;
  serviceOutsideLabel: string;
  serviceOutsideHeadline: string;
  serviceOutsideSub: string;
  serviceAreas: string[];

  faqTag: string;
  faqHeading: string;

  finalCtaHeadingPre: string;
  finalCtaHeadingHighlight: string;
  finalCtaIntro: string;
  finalCtaPrimary: string;
};

export const HOME_DEFAULT: HomeStored = {
  metaTitle: "Koolacube — Long-Term Commercial Cold Room Hire | SE QLD",
  metaDescription:
    "Relocatable cold rooms and freezer rooms for businesses across Brisbane, Gold Coast and SE QLD. Monthly hire from $595 + GST. Delivery, setup and maintenance backed by ACRO Refrigeration.",

  heroBadge: "Commercial Cold Storage · SE QLD",
  heroTitleLine1: "Long-Term Cold Room Hire",
  heroTitleHighlight: "Without the Capital Cost",
  heroIntro:
    "Koolacube supplies relocatable cold rooms and freezer rooms for businesses across Brisbane, Gold Coast, Sunshine Coast and SE Queensland. Monthly hire, sales, delivery, setup and maintenance support included within 50km of depot.",
  heroPrimaryCta: "Get Monthly Hire Pricing",
  heroBuyCta: "Buy a Cold Room",
  heroTrust: [
    "Backed by ACRO Refrigeration",
    "Maintenance Included*",
    "Long-Term Hire Specialists",
  ],

  productsTag: "Monthly Hire — Not Daily",
  productsHeading:
    "Commercial cold storage, priced for the way businesses actually use it.",
  products: [
    { icon: "Snowflake", type: "Cold Room", price: 595, daily: "19.56", img: "/unit-coldroom.jpg", blurb: "+2°C to +8°C — produce, dairy, beverages, packaged goods." },
    { icon: "Thermometer", type: "Freezer Room", price: 750, daily: "24.66", img: "/unit-freezer.jpg", blurb: "Down to -22°C — meat, seafood, frozen stock." },
    { icon: "Layers", type: "Dual Temp Room", price: 850, daily: "27.95", img: "/unit-dual.jpg", blurb: "Independent cold + freezer compartments in one unit." },
  ],
  productsFootnote:
    "Prices indicative — based on standard units on monthly hire. Delivery & setup quoted separately.",

  positioningTag: "Who We Hire To",
  positioningHeadingPre: "Koolacube is",
  positioningHeadingHighlight: "not a party-hire business",
  positioningIntro:
    "We supply cold rooms and freezer rooms for businesses that need reliable extra cold storage for weeks, months or ongoing use. No weddings. No BBQs. Just commercial refrigeration that keeps your stock at temperature.",
  positioningIndustries: [
    "Butchers",
    "Bakeries",
    "Food Manufacturers",
    "Cafes & Restaurants",
    "Aged Care Kitchens",
    "Schools",
    "Clubs & Pubs",
    "Caterers",
    "Supermarkets",
    "Businesses Renovating Cold Rooms",
    "Overflow Stock Storage",
  ],

  includedTag: "What's Included",
  includedHeading: "Clear scope. No surprises.",
  included: [
    "Monthly hire",
    "Delivery & setup (quoted separately if applicable)",
    "Maintenance & breakdown support within 50km of depot",
    "Tested unit before delivery",
    "Commercial refrigeration support from HVACR Group / ACRO Refrigeration",
    "Optional shelving, ramps, lighting",
  ],
  excluded: [
    "Stock loss",
    "Customer misuse",
    "Power supply issues",
    "Site access issues",
    "Travel outside 50km",
    "Damage by customer, contractors, weather, animals, vandalism or unauthorised relocation",
  ],

  hireVsBuyTag: "Decision Guide",
  hireVsBuyHeading: "Hire or Buy — which fits your business?",
  decisions: [
    { need: "Temporary overflow storage", best: "Hire" },
    { need: "Renovation or project work", best: "Hire" },
    { need: "Trial site or new venue", best: "Hire" },
    { need: "Permanent storage requirement", best: "Buy" },
    { need: "No capital outlay", best: "Hire" },
    { need: "Full ownership", best: "Buy" },
  ],
  hireVsBuyCta: "Ask Us Which Option Makes Sense",

  availableTag: "Yard Listings",
  availableHeading: "Units currently in our fleet",
  availableViewAll: "View all available units",
  availableUnits: [
    { type: "Cold Room — 3m x 2.4m", dims: "Internal 2.8 × 2.2 × 2.1 m", power: "240V / 15A", price: "$595 / mo + GST", img: "/unit-coldroom.jpg" },
    { type: "Freezer Room — 3m x 2.4m", dims: "Internal 2.8 × 2.2 × 2.1 m", power: "240V / 15A", price: "$750 / mo + GST", img: "/unit-freezer.jpg" },
    { type: "Dual Temp — 4m x 2.4m", dims: "Cold + Freezer compartments", power: "415V 3-phase", price: "$850 / mo + GST", img: "/unit-dual.jpg" },
  ],

  trustTag: "Backed By Refrigeration People",
  trustHeading: "You are not hiring a box from a party-hire operator.",
  trustIntro:
    "Backed by HVACR Group and ACRO Refrigeration, Koolacube is supported by qualified refrigeration technicians, commercial service systems and real breakdown capability. You are hiring commercial cold storage backed by refrigeration people.",
  trustItems: [
    { icon: "ShieldCheck", label: "Backed by ACRO Refrigeration" },
    { icon: "Wrench", label: "Commercial Refrigeration Technicians" },
    { icon: "MapPin", label: "SE Queensland Support" },
    { icon: "Truck", label: "Maintenance-Backed Hire" },
    { icon: "Snowflake", label: "Long-Term Hire Specialists" },
    { icon: "Check", label: "Sales Available" },
  ],

  serviceTag: "Where We Operate",
  serviceHeading: "Service Area",
  serviceWithinLabel: "Within 50km of Depot",
  serviceWithinHeadline: "Maintenance & breakdown support included.",
  serviceWithinSub:
    "Depot located at Unit 3, 9–11 Imboon Street, Deception Bay QLD 4508.",
  serviceOutsideLabel: "Outside 50km",
  serviceOutsideHeadline: "Available by agreement.",
  serviceOutsideSub:
    "Travel and third-party costs may apply. Talk to us about your site.",
  serviceAreas: ["Brisbane", "Gold Coast", "Sunshine Coast", "Moreton Bay", "Ipswich", "Logan"],

  faqTag: "FAQ",
  faqHeading: "Questions, answered.",

  finalCtaHeadingPre: "Need Cold Storage",
  finalCtaHeadingHighlight: "for Your Business?",
  finalCtaIntro:
    "Minimum hire terms apply. Koolacube specialises in long-term commercial hire — not short-term party or event hire.",
  finalCtaPrimary: "Get Monthly Hire Pricing",
};
