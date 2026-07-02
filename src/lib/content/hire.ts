/**
 * Serializable defaults for the `hire` template (4 routes). Mirrors `HireData`
 * from components/site/HireContent.tsx, except `advantages[].icon` is an icon
 * NAME string (Lucide components can't be stored in JSON) — resolved via
 * getIcon() at render. Client-safe (data + types only, no server imports).
 */

export type HireStored = {
  metaTitle: string;
  metaDescription: string;
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
  advantages: { icon: string; title: string; desc: string }[];
  specsTitle: string;
  specs: string[];
  sizesTitle: string;
  sizes: { size: string; desc: string }[];
  sizesNote?: string;
  useCasesTitle: string;
  useCasesIntro?: string;
  useCases: { title: string; desc: string }[];
  /** Photo gallery — section is hidden on the public page while empty. */
  galleryTitle?: string;
  galleryIntro?: string;
  gallery?: { src: string; alt: string }[];
  monthlyPriceFrom?: number;
};

const defaultAdvantages: HireStored["advantages"] = [
  {
    icon: "Zap",
    title: "Emergency Breakdown Backup",
    desc: "Fridge, freezer or walk-in failed? Stay calm. We deliver emergency cold rooms fast to protect your stock, sales and reputation.",
  },
  {
    icon: "Boxes",
    title: "Extra Cold Space On Demand",
    desc: "Running out of chilled storage during peak seasons or expansion? Our modular cold rooms give you flexible extra space when you need it – no downtime, no hassle.",
  },
  {
    icon: "Wrench",
    title: "Maintenance Support",
    desc: "Planned maintenance shouldn't disrupt your operations. We provide seamless temporary cold room cover so your business stays operational.",
  },
];

const defaultUseCases: HireStored["useCases"] = [
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

export const HIRE_DEFAULTS: Record<string, HireStored> = {
  "/hire/cold-room": {
    metaTitle: "Cold Room Hire | Koolacube",
    metaDescription:
      "Mobile and modular cold room hire Australia-wide. Chillers (0°C to +5°C) and freezer rooms (-20°C) for long-term and seasonal commercial use. Fast on-site delivery & setup.",
    crumb: "Hire / Cold Room",
    title: "Cold Room Hire Options",
    intro:
      "We provide mobile cold rooms and modular cold room hire Australia-wide for commercial and industrial use. Available as chillers (0°C to +5°C) and freezer rooms (-20°C).",
    optionsTitle: "Flexible hire to suit any project",
    options: [
      { title: "Long-term hire", desc: "Perfect for hospitality, healthcare, aged-care and industrial applications." },
      { title: "Monthly commercial hire", desc: "Simple monthly billing for ongoing cold storage as your business grows." },
      { title: "Seasonal hire", desc: "Increase your storage capacity during peak demand." },
      { title: "On-site delivery & setup", desc: "Quick installation anywhere you need it." },
    ],
    rangeTitle: "Our Cold Room Hire Range",
    rangeIntro:
      "Looking for long-term refrigerated storage? Our mobile cold rooms are designed to deliver consistent temperature control, high performance and complete peace of mind—no matter the industry or location. From small cafés to large-scale commercial operations, we provide fast delivery, easy setup and 24/7 support.",
    range: [
      { title: "Mobile Cold Rooms", desc: "Ideal for catering, hospitality & retail." },
      { title: "Modular Walk-In Cold Rooms", desc: "Large-scale storage, built onsite." },
      { title: "Emergency Cold Storage Hire", desc: "Urgent breakdown backup." },
      { title: "Freezer Room Hire", desc: "Perfect for frozen food storage." },
      { title: "Long Term Hire", desc: "Cost-effective commercial storage." },
    ],
    advantagesIntro:
      "We offer a full range of portable cold rooms to suit different storage needs. All units come equipped with digital temperature control, internal lighting, food-grade shelving (optional), lockable doors and robust insulation to maintain optimal temperature.",
    advantages: defaultAdvantages,
    specsTitle: "Modular Cold Room Specifications",
    specs: [
      "Suitable for indoor or outdoor use",
      "Can be installed on uneven ground (fields, gravel, car parks)",
      "Single phase power: 13amp or 16amp",
      "Temperature range: -20°C to +15°C",
      "Internal lighting included",
      "Secure locking system (no padlocks required)",
      "Shelving supplied",
      "Beer python access available",
      "Plastic strip curtains included",
      "Ramps available on request",
      "Pallet-width doors available",
    ],
    sizesTitle: "Standard Cold Room Sizes",
    sizes: [
      { size: "3m Unit", desc: "Small kitchens, backup storage, cafes." },
      { size: "6m Unit", desc: "Catering, restaurants, aged-care, florists." },
      { size: "9m Unit", desc: "Food manufacturing, construction, bulk food storage." },
    ],
    sizesNote: "Custom configurations available on request.",
    useCasesTitle: "Use Cases",
    useCasesIntro: "Our portable cold rooms are trusted across a wide range of industries:",
    useCases: defaultUseCases,
    monthlyPriceFrom: 440,
  },

  "/hire/freezer-room": {
    metaTitle: "Freezer Room Hire | Koolacube",
    metaDescription:
      "Mobile and modular freezer room hire down to -25°C for meat, seafood, frozen goods and long-term preservation. Long-term and seasonal commercial hire with fast on-site delivery.",
    crumb: "Hire / Freezer Room",
    title: "Freezer Room Hire Options",
    intro:
      "We provide mobile and modular freezer room hire Australia-wide for deep-frozen storage down to -25°C. Reliable low-temperature units for meat, seafood, frozen goods and long-term preservation across commercial and industrial use.",
    optionsTitle: "Frozen storage on your terms",
    options: [
      { title: "Long-term hire", desc: "Ongoing frozen capacity for hospitality, food manufacturing and industrial use." },
      { title: "Monthly commercial hire", desc: "Simple monthly billing for ongoing frozen storage and emergency cover." },
      { title: "Seasonal hire", desc: "Add freezer capacity through peak production and demand." },
      { title: "On-site delivery & setup", desc: "Fast installation wherever you need frozen storage." },
    ],
    rangeTitle: "Our Freezer Room Hire Range",
    rangeIntro:
      "Whether you need a single mobile freezer or large-scale frozen capacity onsite, our freezer rooms deliver stable sub-zero temperatures, high efficiency and complete peace of mind. We provide fast delivery, easy setup and 24/7 support.",
    range: [
      { title: "Mobile Freezer Rooms", desc: "Portable deep-freeze for catering and hospitality." },
      { title: "Modular Walk-In Freezer Rooms", desc: "Large-scale frozen storage, built onsite." },
      { title: "Emergency Freezer Hire", desc: "Urgent backup when a freezer fails." },
      { title: "Bulk Frozen Storage", desc: "High-volume frozen goods and stock overflow." },
      { title: "Long Term Freezer Hire", desc: "Cost-effective ongoing frozen storage." },
    ],
    advantagesIntro:
      "Every freezer room comes equipped with digital temperature control, internal LED lighting, heated door frames with emergency release, food-grade shelving (optional) and extra-thick insulation to hold stable sub-zero temperatures.",
    advantages: defaultAdvantages,
    specsTitle: "Modular Freezer Room Specifications",
    specs: [
      "Suitable for indoor or outdoor use",
      "Can be installed on uneven ground (fields, gravel, car parks)",
      "Single phase 15amp or 3-phase 32amp depending on unit size",
      "Temperature range: -18°C to -25°C",
      "Extra-thick insulated panels for deep-freeze efficiency",
      "Heated door frame with internal emergency release",
      "Anti-slip, reinforced freezer flooring",
      "Internal LED lighting included",
      "Secure locking system (no padlocks required)",
      "Shelving supplied",
      "Forklift pockets for safe relocation",
    ],
    sizesTitle: "Standard Freezer Room Sizes",
    sizes: [
      { size: "3m Unit", desc: "Small kitchens, backup freezing, cafes." },
      { size: "6m Unit", desc: "Restaurants, butchers, caterers, wholesalers." },
      { size: "9m Unit", desc: "Food manufacturing, bulk frozen stock, wholesalers." },
    ],
    sizesNote: "Custom configurations available on request.",
    useCasesTitle: "Use Cases",
    useCasesIntro: "Our portable freezer rooms are trusted across a wide range of industries:",
    useCases: defaultUseCases,
    monthlyPriceFrom: 750,
  },

  "/hire/dual-temp": {
    metaTitle: "Dual Temp Room Hire | Koolacube",
    metaDescription:
      "Hire one portable unit with two independent zones — a chiller (+2°C to +10°C) and a freezer (-18°C to -25°C). Separate doors, thermostats and refrigeration for chilled and frozen storage at once.",
    crumb: "Hire / Dual Temp",
    title: "Dual Temp Room Hire Options",
    intro:
      "Hire one portable unit with two independent temperature zones — a chiller (+2°C to +10°C) and a freezer (-18°C to -25°C) — each with its own door, thermostat and refrigeration system. Ideal when you need chilled and frozen storage on site at the same time.",
    optionsTitle: "Chilled and frozen, one footprint",
    options: [
      { title: "Long-term hire", desc: "Ongoing flexible storage for hospitality, retail and healthcare kitchens." },
      { title: "Monthly commercial hire", desc: "Simple monthly billing for ongoing chilled + frozen storage on site." },
      { title: "Seasonal hire", desc: "Add both chilled and frozen capacity through peak demand." },
      { title: "On-site delivery & setup", desc: "Quick installation of a single dual-zone unit anywhere you need it." },
    ],
    rangeTitle: "Our Dual Temp Hire Range",
    rangeIntro:
      "When you need both chilled and frozen storage but only have room for one unit, our dual temp rooms deliver two fully independent zones in a single portable footprint. Fast delivery, easy setup and 24/7 support included.",
    range: [
      { title: "Mobile Dual Temp Rooms", desc: "Chiller + freezer in one portable unit." },
      { title: "Modular Dual Temp Rooms", desc: "Larger split-zone storage built onsite." },
      { title: "Emergency Dual Temp Hire", desc: "Cover chilled and frozen stock fast." },
      { title: "Retail Dual Storage", desc: "Beverages chilled, stock frozen — one footprint." },
      { title: "Long Term Dual Temp Hire", desc: "Flexible ongoing chilled + frozen capacity." },
    ],
    advantagesIntro:
      "Each dual temp room features two independent zones with their own digital thermostats and refrigeration systems, separate access doors, internal LED lighting, optional food-grade shelving and a central insulated divider to hold both temperatures reliably.",
    advantages: defaultAdvantages,
    specsTitle: "Dual Temp Room Specifications",
    specs: [
      "Suitable for indoor or outdoor use",
      "Can be installed on uneven ground (fields, gravel, car parks)",
      "Dual-circuit power supply",
      "Chiller zone: +2°C to +10°C",
      "Freezer zone: -18°C to -25°C",
      "Independent digital thermostats per zone",
      "Multi-zone insulated panels with central divider",
      "Separate access doors for each compartment",
      "Food-grade, non-slip flooring",
      "Internal LED lighting in both zones",
      "Optional custom-configured shelving in each zone",
    ],
    sizesTitle: "Standard Dual Temp Sizes",
    sizes: [
      { size: "4m Unit", desc: "Compact chilled + frozen for cafes and small kitchens." },
      { size: "6m Unit", desc: "Catering, restaurants, aged-care and retail." },
      { size: "9m Unit", desc: "Supermarkets, food manufacturing, industrial and remote camps." },
    ],
    sizesNote: "Custom layouts and zone splits available on request.",
    useCasesTitle: "Use Cases",
    useCasesIntro: "Our dual temp rooms are trusted across a wide range of industries:",
    useCases: defaultUseCases,
    monthlyPriceFrom: 850,
  },

  "/hire/long-term": {
    metaTitle: "Long-Term Cold Room Hire | Koolacube",
    metaDescription:
      "Long-term commercial cold room and freezer hire — weeks, months or ongoing. Monthly billing, maintenance-backed units and the option to convert to purchase. Not short-term party or event hire.",
    crumb: "Hire / Long-Term",
    title: "Long-Term Cold Room Hire Options",
    intro:
      "Koolacube specialises in long-term commercial cold room and freezer hire — weeks, months or ongoing. Monthly billing, maintenance-backed units and the flexibility to scale or convert to purchase. We're not a short-term party or event hire business.",
    optionsTitle: "Built for ongoing commercial storage",
    options: [
      { title: "Monthly hire", desc: "Simple monthly billing with a minimum term confirmed in your quote." },
      { title: "Multi-unit & multi-site", desc: "Cold, freezer or dual temp units across one or more locations." },
      { title: "Renovation & project cover", desc: "Temporary capacity while you rebuild, relocate or expand." },
      { title: "Hire-to-buy", desc: "Apply your hire toward purchase if it suits your business." },
    ],
    rangeTitle: "What You Can Hire Long-Term",
    rangeIntro:
      "Every unit in our fleet is available on long-term hire — backed by qualified refrigeration technicians, commercial service systems and real breakdown capability. Monthly billing, maintenance included within 50km, and fast support.",
    range: [
      { title: "Cold Rooms", desc: "Ongoing chilled storage from +2°C." },
      { title: "Freezer Rooms", desc: "Ongoing frozen storage down to -25°C." },
      { title: "Dual Temp Rooms", desc: "Chilled + frozen in one unit." },
      { title: "Modular Walk-In Rooms", desc: "Large-scale storage built onsite." },
      { title: "Replacement Units", desc: "Cover ageing or failed built-in cold rooms." },
    ],
    advantagesIntro:
      "Long-term hire gives you commercial cold storage without the capital cost — backed by maintenance, breakdown support and the option to convert to purchase.",
    advantages: [
      {
        icon: "Wrench",
        title: "Maintenance Included",
        desc: "Planned maintenance and breakdown support included within 50km of depot, so your operation keeps running.",
      },
      {
        icon: "Wallet",
        title: "No Capital Outlay",
        desc: "Get reliable commercial cold storage without buying — preserve your capital and pay monthly.",
      },
      {
        icon: "RefreshCw",
        title: "Scale or Convert",
        desc: "Add units as you grow, downsize when you don't, or apply your hire toward purchase.",
      },
    ],
    specsTitle: "Hire Inclusions & Specifications",
    specs: [
      "Monthly billing with minimum hire terms",
      "Maintenance & breakdown support within 50km of depot",
      "Tested unit before delivery",
      "Temperature range: -20°C to +15°C (model dependent)",
      "Single phase or 3-phase power options",
      "Digital temperature control & internal lighting",
      "Lockable doors and robust insulation",
      "Optional food-grade shelving",
      "Delivery, setup and relocation quoted separately",
      "Suitable for indoor or outdoor installation",
      "Convert-to-purchase available",
    ],
    sizesTitle: "Standard Sizes",
    sizes: [
      { size: "3m Unit", desc: "Backup storage, cafes and small kitchens." },
      { size: "6m Unit", desc: "Catering, restaurants, aged-care and florists." },
      { size: "9m Unit", desc: "Food manufacturing, bulk storage and large sites." },
    ],
    sizesNote: "Custom configurations available on request.",
    useCasesTitle: "Use Cases",
    useCasesIntro: "Long-term hire suits businesses that need reliable cold storage month after month:",
    useCases: [
      { title: "Hospitality", desc: "Restaurants, cafés and venues needing reliable extra cold storage all year round." },
      { title: "Aged Care", desc: "Ongoing, hygienic temperature-controlled storage for aged-care kitchens and service areas." },
      { title: "Healthcare & Medical", desc: "Stable long-term storage for medical supplies, pharmaceuticals and vaccines." },
      { title: "Food Manufacturing", desc: "Permanent overflow and production capacity for processors and wholesalers." },
      { title: "Construction & Industrial", desc: "Secure cold storage for long-running remote sites, camps and projects." },
      { title: "Retail & Supermarkets", desc: "Extra chilled and frozen capacity to support trading through the year." },
    ],
    monthlyPriceFrom: 440,
  },
};
