/**
 * Serializable defaults for the `buy` template (3 routes). Mirrors `BuyData`
 * from components/site/BuyContent.tsx, with `advantages[].icon` as an icon NAME
 * string. Client-safe (data + types only).
 */

export type BuySizeStored = { size: string; suited: string; availability: string };

export type BuyStored = {
  metaTitle: string;
  metaDescription: string;
  crumb: string;
  title: string;
  intro: string;
  optionsTitle: string;
  options: { title: string; desc: string }[];
  overviewTitle: string;
  overview: string[];
  advantagesIntro?: string;
  advantages: { icon: string; title: string; desc: string }[];
  specsTitle: string;
  specs: string[];
  sizesTitle: string;
  sizesIntro?: string;
  sizes: BuySizeStored[];
  sizesNote?: string;
  whyTitle: string;
  why: { title: string; desc: string }[];
  /** Photo gallery — section is hidden on the public page while empty. */
  galleryTitle?: string;
  galleryIntro?: string;
  gallery?: { src: string; alt: string }[];
  ctaLabel?: string;
  productImage?: string;
  productAvailability?: string;
  productCondition?: string;
};

const defaultAdvantages: BuyStored["advantages"] = [
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

const sharedSpecs = [
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
];

export const BUY_DEFAULTS: Record<string, BuyStored> = {
  "/buy/new": {
    metaTitle: "Cold Room Sales — Buy New & Ex-Hire | Koolacube",
    metaDescription:
      "Buy new, ex-hire and custom-built portable cold rooms. Built for easy relocation, low running costs and long-lasting commercial performance. Delivery & on-site setup available.",
    crumb: "Buy / New",
    title: "Cold Room Sales Options",
    intro:
      "We offer a full range of portable cold rooms for purchase, designed for easy relocation, low running costs and long-lasting operation.",
    optionsTitle: "Ways to buy",
    options: [
      { title: "Brand-new cold rooms", desc: "Built to order with a choice of sizes and specifications." },
      { title: "Ex-hire cold rooms", desc: "Fully serviced, tested and ready for immediate use." },
      { title: "Custom-built units", desc: "Tailored shelving, door placement, lighting and fit-outs." },
      { title: "Delivery & on-site setup", desc: "Available Australia-wide." },
    ],
    overviewTitle: "High-Quality New & Ex-Hire Portable Cold Rooms for Sale",
    overview: [
      "Looking to invest in your own temperature-controlled storage solution? We supply new and professionally refurbished ex-hire cold rooms built for durability, efficiency and long-term performance. Whether you need a compact unit for a café or a large refrigerated room for industrial use, our cold rooms provide reliable cooling and industry-standard compliance.",
      "All units include insulated panels, food-grade interiors, heavy-duty refrigeration systems and digital temperature controllers.",
    ],
    advantages: defaultAdvantages,
    specsTitle: "Modular Cold Room Specifications",
    specs: sharedSpecs,
    sizesTitle: "Standard Cold Room Sizes",
    sizesIntro: "Below are common unit sizes we offer for sale:",
    sizes: [
      { size: "3m Unit", suited: "Cafés, retail, small kitchens", availability: "New & Ex-Hire" },
      { size: "6m Unit", suited: "Restaurants, florists, aged-care", availability: "New & Ex-Hire" },
      { size: "9m Unit", suited: "Large venues, industrial use", availability: "New & Custom-Built" },
    ],
    sizesNote: "Custom configurations and specialised builds available.",
    whyTitle: "Why Buy a Cold Room From Us?",
    why: [
      { title: "Durable Construction", desc: "Built with high-density insulated panels, commercial-grade hardware and reliable compressors for long-term performance." },
      { title: "Relocatable", desc: "Portable designs that can be moved, expanded or reconfigured as your business grows." },
      { title: "Engineered for Compliance", desc: "Manufactured to meet food safety standards, workplace regulations and temperature control requirements." },
      { title: "Finance & Lease-to-Own Options", desc: "Flexible finance options are available, making ownership cost-effective and accessible for businesses of all sizes." },
    ],
    productImage: "/unit-coldroom.jpg",
    productAvailability: "https://schema.org/InStock",
    productCondition: "https://schema.org/NewCondition",
  },

  "/buy/ex-hire": {
    metaTitle: "Second-Hand & Ex-Hire Cold Rooms for Sale SE QLD",
    metaDescription:
      "1.8m x 2.4m ex-hire cold rooms and freezer rooms for sale from $10,500. Very good condition, many like new. Inspected and tested by Koolacube.",
    crumb: "Buy / Ex-Hire",
    title: "Second-Hand and Ex-Hire Cold Rooms for Sale",
    intro:
      "Koolacube currently has 1.8m × 2.4m ex-hire cold rooms and freezer rooms for sale from $10,500. Units are in very good condition, with many presenting like new. Each unit is inspected and tested before sale. Stock is limited and changes as fleet units are released.",
    optionsTitle: "Current Second-Hand Cold Rooms for Sale",
    options: [
      {
        title: "1.8m × 2.4m Cold Rooms",
        desc: "Ex-hire chilled-storage units currently available.",
      },
      {
        title: "1.8m × 2.4m Freezer Rooms",
        desc: "Ex-hire frozen-storage units currently available.",
      },
      {
        title: "From $10,500",
        desc: "Entry pricing depends on the actual unit, specification and condition.",
      },
      {
        title: "Very Good Condition",
        desc: "Many units present like new; inspection is welcome before purchase.",
      },
    ],
    overviewTitle: "Commercial Ex-Hire Cold Rooms and Freezer Rooms Available Now",
    overview: [
      "These are genuine Koolacube fleet units, not unknown second-hand equipment sourced from a third party. They have operated in our commercial hire fleet and are inspected and tested before being offered for sale.",
      "Available stock currently includes 1.8m × 2.4m cool rooms and freezer rooms. Exact age, power requirements, temperature range, condition and configuration vary by unit, so buyers can inspect the actual unit before committing.",
    ],
    advantagesIntro:
      "Buy from a refrigeration-backed operator with known fleet history, inspection before sale and practical support to confirm the unit suits your site.",
    advantages: [
      {
        icon: "RefreshCw",
        title: "Known Fleet History",
        desc: "These are Koolacube fleet units with known commercial service history, not unknown equipment sourced from a third party.",
      },
      {
        icon: "ClipboardCheck",
        title: "Inspected and Tested",
        desc: "Each cold room or freezer room is checked before sale and the actual unit can be inspected before purchase.",
      },
      {
        icon: "Wrench",
        title: "Refrigeration-Backed Supplier",
        desc: "Koolacube is supported by qualified refrigeration technicians through ACRO Refrigeration and the HVACR Group.",
      },
    ],
    specsTitle: "Modular Cold Room Specifications",
    specs: sharedSpecs,
    sizesTitle: "Current Ex-Hire Sizes",
    sizesIntro:
      "Current stock includes 1.8m × 2.4m chilled and frozen units. Other sizes may become available as the hire fleet rotates.",
    sizes: [
      {
        size: "1.8m x 2.4m Cold Room",
        suited: "Cafés, restaurants, retail food and chilled overflow storage",
        availability: "Available Now",
      },
      {
        size: "1.8m x 2.4m Freezer Room",
        suited: "Commercial kitchens, butchers, seafood and frozen stock",
        availability: "Available Now",
      },
      {
        size: "Other Sizes / Dual Temp",
        suited: "Larger or mixed-temperature requirements",
        availability: "Ask About Fleet Releases",
      },
    ],
    sizesNote:
      "Ex-hire units start from $10,500. Stock, price and condition are confirmed against the actual unit available.",
    whyTitle: "Why Buy an Ex-Hire Unit From Koolacube?",
    why: [
      {
        title: "Very Good Condition",
        desc: "Available units are in very good condition, with many presenting like new.",
      },
      {
        title: "Lower Capital Cost",
        desc: "Own commercial cold storage from $10,500 instead of paying the full cost of a new build.",
      },
      {
        title: "Inspection Welcome",
        desc: "Inspect the actual unit, condition and configuration before committing to purchase.",
      },
      {
        title: "Relocatable Commercial Storage",
        desc: "Skid-mounted units can be moved or repositioned as your site and storage needs change.",
      },
    ],
    ctaLabel: "Check Current Ex-Hire Stock",
    productImage: "/unit-coldroom.jpg",
    productAvailability: "https://schema.org/LimitedAvailability",
    productCondition: "https://schema.org/RefurbishedCondition",
  },

  "/buy/custom": {
    metaTitle: "Custom Cold Room Builds | Koolacube",
    metaDescription:
      "Custom cold rooms, freezer rooms and dual temp units built for unusual sites, sizes or temperature requirements. Engineered and supported by HVACR Group / ACRO Refrigeration.",
    crumb: "Buy / Custom",
    title: "Custom Cold Room Builds",
    intro:
      "Custom cold rooms, freezer rooms and dual temp units built for unusual sites, sizes or temperature requirements. Engineered and supported by HVACR Group / ACRO Refrigeration.",
    optionsTitle: "What we can customise",
    options: [
      { title: "Size & layout", desc: "Any footprint, built to fit your space." },
      { title: "Temperature", desc: "Specialty chilled, frozen or multi-zone ranges." },
      { title: "Fit-out", desc: "Shelving, door placement, lighting and ramps." },
      { title: "Installation", desc: "Skid-mounted relocatable or fixed onsite." },
    ],
    overviewTitle: "Cold Rooms Engineered Around Your Site",
    overview: [
      "When a standard unit won't fit your space, stock or process, we design and build to suit. From specialty temperatures to multi-zone configurations and awkward sites, our refrigeration engineers spec a unit that performs — and keep supporting it after install.",
      "All builds use high-density insulated panels, food-grade interiors, heavy-duty refrigeration systems and digital temperature controllers.",
    ],
    advantages: defaultAdvantages,
    specsTitle: "Build Specifications",
    specs: [
      "Built to any footprint or layout",
      "Suitable for indoor or outdoor installation",
      "Single phase or 3-phase power options",
      "Specialty temperature ranges from -25°C to +15°C",
      "Multi-zone (chiller + freezer) configurations",
      "High-density insulated panels",
      "Internal lighting and secure locking",
      "Food-grade interiors and flooring",
      "Custom shelving and door placement",
      "Skid-mount relocatable or fixed install",
      "Beer python access, strip curtains and ramps available",
    ],
    sizesTitle: "Custom Build Sizes",
    sizesIntro: "Standard footprints make a starting point — we build beyond these to suit:",
    sizes: [
      { size: "3m Unit", suited: "Compact custom builds & tight sites", availability: "Custom-Built" },
      { size: "6m Unit", suited: "Mid-size custom builds & fit-outs", availability: "Custom-Built" },
      { size: "9m+ Unit", suited: "Large & specialty installations", availability: "Custom-Built" },
    ],
    sizesNote: "No standard size that fits? We build to any footprint — talk to us.",
    whyTitle: "Why Build Custom With Us?",
    why: [
      { title: "Designed by Refrigeration Engineers", desc: "Specced by qualified technicians from the HVACR Group, not off a generic catalogue." },
      { title: "Built to Spec", desc: "Size, temperature, fit-out and install configured exactly for your site." },
      { title: "Compliance-Ready", desc: "Manufactured to meet food safety standards, workplace regulations and temperature control requirements." },
      { title: "Long-Term Service Support", desc: "Optional service plans, spare parts and maintenance to protect your investment." },
    ],
    productImage: "/unit-dual.jpg",
    productAvailability: "https://schema.org/MadeToOrder",
    productCondition: "https://schema.org/NewCondition",
  },
};
