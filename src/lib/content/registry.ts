/**
 * Page registry for the "edit every text" CMS layer.
 *
 * `PAGES` lists every editable route grouped for the admin. Per-template default
 * data lives in the maps below; public pages render `getPageContent(path,
 * default)` (DB override merged over default) and the admin edits the same shape.
 */

export type PageTemplate =
  | "content"
  | "hire"
  | "buy"
  | "home"
  | "simple"
  | "intro"
  | "legal";

export type PageEntry = {
  key: string; // slug-safe id used in /admin/pages/[key]
  path: string; // public route
  label: string;
  group: string;
  template: PageTemplate;
};

/** Simple "ContentPage" template: hero + bullet list + SEO meta. */
export type ContentPageData = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  crumb: string;
  title: string;
  intro: string;
  bullets: string[];
};

/**
 * "Intro" template: hero (eyebrow/crumb/title/intro) + SEO meta only. Used by
 * pages whose body is rendered from a database collection (Units, Industries) —
 * the cards stay in their own admin managers; only the top copy is edited here.
 */
export type IntroPageData = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  crumb: string;
  title: string;
  intro: string;
};

/**
 * "Legal" template: a long-form policy page (Terms & Conditions, etc.) — hero +
 * SEO meta, a small meta strip (effective date / ABN), and an ordered list of
 * heading + body sections. In each section body, a blank line starts a new
 * paragraph on the public page.
 */
export type LegalSection = {
  heading: string;
  body: string;
};

export type LegalPageData = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  crumb: string;
  title: string;
  intro: string;
  effectiveDate: string;
  abn: string;
  sections: LegalSection[];
};

/** Convert a route to its registry key: "/" -> "home", "/hire/cold-room" -> "hire-cold-room". */
export function pathToKey(path: string): string {
  return path.replace(/^\//, "").replace(/\//g, "-") || "home";
}

export const PAGES: PageEntry[] = [
  {
    key: "home",
    path: "/",
    label: "Home",
    group: "Main pages",
    template: "home",
  },
  {
    key: "about",
    path: "/about",
    label: "About",
    group: "Main pages",
    template: "simple",
  },
  {
    key: "contact",
    path: "/contact",
    label: "Contact",
    group: "Main pages",
    template: "simple",
  },

  {
    key: "available-units",
    path: "/available-units",
    label: "Available Units",
    group: "Collections",
    template: "intro",
  },
  {
    key: "industries",
    path: "/industries",
    label: "Industries",
    group: "Collections",
    template: "intro",
  },

  {
    key: "hire-cold-room",
    path: "/hire/cold-room",
    label: "Cold Room Hire",
    group: "Hire",
    template: "hire",
  },
  {
    key: "hire-freezer-room",
    path: "/hire/freezer-room",
    label: "Freezer Room Hire",
    group: "Hire",
    template: "hire",
  },
  {
    key: "hire-dual-temp",
    path: "/hire/dual-temp",
    label: "Dual Temp Hire",
    group: "Hire",
    template: "hire",
  },
  {
    key: "hire-long-term",
    path: "/hire/long-term",
    label: "Long-Term Hire",
    group: "Hire",
    template: "hire",
  },

  {
    key: "buy-new",
    path: "/buy/new",
    label: "Buy New",
    group: "Buy",
    template: "buy",
  },
  {
    key: "buy-ex-hire",
    path: "/buy/ex-hire",
    label: "Buy Ex-Hire",
    group: "Buy",
    template: "buy",
  },
  {
    key: "buy-custom",
    path: "/buy/custom",
    label: "Custom Builds",
    group: "Buy",
    template: "buy",
  },

  {
    key: "cold-room-hire-brisbane",
    path: "/cold-room-hire-brisbane",
    label: "Cold Room Hire Brisbane",
    group: "Locations",
    template: "content",
  },
  {
    key: "freezer-room-hire-brisbane",
    path: "/freezer-room-hire-brisbane",
    label: "Freezer Room Hire Brisbane",
    group: "Locations",
    template: "content",
  },
  {
    key: "cold-room-hire-gold-coast",
    path: "/cold-room-hire-gold-coast",
    label: "Cold Room Hire Gold Coast",
    group: "Locations",
    template: "content",
  },
  {
    key: "cold-room-hire-sunshine-coast",
    path: "/cold-room-hire-sunshine-coast",
    label: "Cold Room Hire Sunshine Coast",
    group: "Locations",
    template: "content",
  },
  {
    key: "service-areas",
    path: "/service-areas",
    label: "Service Areas",
    group: "Locations",
    template: "content",
  },

  {
    key: "cold-room-sales-queensland",
    path: "/cold-room-sales-queensland",
    label: "Cold Room Sales Queensland",
    group: "Sales",
    template: "content",
  },
  {
    key: "ex-hire-cold-rooms-for-sale",
    path: "/ex-hire-cold-rooms-for-sale",
    label: "Ex-Hire Cold Rooms for Sale",
    group: "Sales",
    template: "content",
  },

  {
    key: "cold-room-hire-for-butchers",
    path: "/cold-room-hire-for-butchers",
    label: "For Butchers",
    group: "Industry pages",
    template: "content",
  },
  {
    key: "cold-room-hire-for-restaurants",
    path: "/cold-room-hire-for-restaurants",
    label: "For Restaurants",
    group: "Industry pages",
    template: "content",
  },
  {
    key: "cold-room-hire-for-food-manufacturers",
    path: "/cold-room-hire-for-food-manufacturers",
    label: "For Food Manufacturers",
    group: "Industry pages",
    template: "content",
  },
  {
    key: "cold-room-hire-for-aged-care",
    path: "/cold-room-hire-for-aged-care",
    label: "For Aged Care",
    group: "Industry pages",
    template: "content",
  },

  {
    key: "emergency-cold-storage",
    path: "/emergency-cold-storage",
    label: "Emergency Cold Storage",
    group: "Solutions",
    template: "content",
  },
  {
    key: "cold-room-hire-during-renovations",
    path: "/cold-room-hire-during-renovations",
    label: "During Renovations",
    group: "Solutions",
    template: "content",
  },

  {
    key: "terms",
    path: "/terms",
    label: "Terms & Conditions",
    group: "Legal",
    template: "legal",
  },
];

export function pageByKey(key: string): PageEntry | undefined {
  return PAGES.find((p) => p.key === key);
}

const c = (
  metaTitle: string,
  crumb: string,
  title: string,
  intro: string,
  bullets: string[]
): ContentPageData => ({
  metaTitle,
  metaDescription: intro,
  eyebrow: "Koolacube",
  crumb,
  title,
  intro,
  bullets,
});

/** Defaults for every `content` template route, keyed by path. */
export const CONTENT_DEFAULTS: Record<string, ContentPageData> = {
  "/cold-room-hire-brisbane": c(
    "Cold Room Hire Brisbane | Koolacube",
    "Locations",
    "Cold Room Hire Brisbane",
    "Long-term commercial cold room hire across greater Brisbane. Monthly hire from $595 + GST, delivery and maintenance backed by ACRO Refrigeration.",
    [
      "Within 50km of Deception Bay depot",
      "Maintenance support included",
      "240V standard units available",
      "Suits CBD, north, west, south",
      "Delivery & setup quoted",
      "Monthly hire",
    ]
  ),
  "/freezer-room-hire-brisbane": c(
    "Freezer Room Hire Brisbane | Koolacube",
    "Locations",
    "Freezer Room Hire Brisbane",
    "Commercial freezer room hire in Brisbane down to -22°C. Ideal for butchers, food manufacturers and caterers needing extra frozen capacity.",
    [
      "Monthly hire",
      "Down to -22°C",
      "Tested before delivery",
      "Brisbane metro coverage",
      "Maintenance backed",
      "Long-term focus",
    ]
  ),
  "/cold-room-hire-gold-coast": c(
    "Cold Room Hire Gold Coast | Koolacube",
    "Locations",
    "Cold Room Hire Gold Coast",
    "Cold room hire across the Gold Coast for restaurants, kitchens, caterers and food businesses. Monthly hire with maintenance backed by ACRO Refrigeration.",
    [
      "Gold Coast wide",
      "Monthly hire",
      "Tested before delivery",
      "Delivery from Deception Bay",
      "Suitable for hospitality",
      "Hire or buy options",
    ]
  ),
  "/cold-room-hire-sunshine-coast": c(
    "Cold Room Hire Sunshine Coast | Koolacube",
    "Locations",
    "Cold Room Hire Sunshine Coast",
    "Sunshine Coast cold room hire for businesses needing reliable cold storage. Talk to us about coverage outside the 50km zone.",
    [
      "Sunshine Coast region",
      "Monthly hire",
      "Travel may apply outside 50km",
      "Cold, freezer, dual temp",
      "Backed by refrigeration techs",
      "Long-term hire",
    ]
  ),
  "/service-areas": c(
    "Service Areas | Koolacube",
    "Service Areas",
    "Service Areas",
    "Koolacube services SE Queensland from our Deception Bay depot. Maintenance and breakdown support included within 50km — outside 50km available by agreement.",
    [
      "Brisbane",
      "Gold Coast",
      "Sunshine Coast",
      "Moreton Bay",
      "Ipswich",
      "Logan",
      "Within 50km: support included",
      "Outside 50km: by agreement",
    ]
  ),
  "/cold-room-sales-queensland": c(
    "Cold Room Sales Queensland | Koolacube",
    "Sales",
    "Cold Room Sales Queensland",
    "Buy new or ex-hire cold rooms across Queensland. Commercial grade, supported by ACRO Refrigeration.",
    [
      "New & ex-hire stock",
      "Cold, freezer, dual temp",
      "Custom builds available",
      "Delivery state-wide",
      "Commercial spec",
      "Optional service plans",
    ]
  ),
  "/ex-hire-cold-rooms-for-sale": c(
    "Ex-Hire Cold Rooms for Sale | Koolacube",
    "Sales",
    "Ex-Hire Cold Rooms for Sale",
    "Refurbished ex-hire cold rooms available for sale. Tested before sale. Stock changes regularly.",
    [
      "Tested ex-hire units",
      "Refurbished as required",
      "Limited availability",
      "Cold & freezer units",
      "Cost-effective",
      "Inspection welcome",
    ]
  ),
  "/cold-room-hire-for-butchers": c(
    "Cold Room Hire for Butchers | Koolacube",
    "Industries",
    "Cold Room Hire for Butchers",
    "Cold rooms and freezers built for butchers needing reliable temperature, extra capacity or cover during renovation.",
    [
      "Sub-zero freezer rooms",
      "Cold + freezer dual temp",
      "Renovation cover",
      "Maintenance support",
      "Skid mount on site",
      "Backed by ACRO Refrigeration",
    ]
  ),
  "/cold-room-hire-for-restaurants": c(
    "Cold Room Hire for Restaurants | Koolacube",
    "Industries",
    "Cold Room Hire for Restaurants",
    "Restaurant cold room hire across SE QLD — for renovations, expansion, overflow stock and seasonal demand.",
    [
      "Cold or dual temp",
      "Tested before delivery",
      "Renovation cover",
      "Maintenance backed",
      "Long-term hire",
      "Suits hospitality",
    ]
  ),
  "/cold-room-hire-for-food-manufacturers": c(
    "Cold Room Hire for Food Manufacturers | Koolacube",
    "Industries",
    "Cold Room Hire for Food Manufacturers",
    "Extra cold and freezer capacity for food manufacturers — production overflow, NPD trials, or extended downtime cover.",
    [
      "Skid-mount installs",
      "Freezer to -22°C",
      "Production overflow",
      "Multiple units possible",
      "Service-backed",
      "Long-term hire",
    ]
  ),
  "/cold-room-hire-for-aged-care": c(
    "Cold Room Hire for Aged Care & Commercial Kitchens | Koolacube",
    "Industries",
    "Cold Room Hire for Aged Care & Commercial Kitchens",
    "Cold room and freezer hire for aged care kitchens, schools and large institutional kitchens. Reliable cold storage backed by qualified refrigeration technicians.",
    [
      "Institutional kitchens",
      "Aged care facilities",
      "Schools & clubs",
      "Maintenance included*",
      "Renovation cover",
      "Long-term hire",
    ]
  ),
  "/emergency-cold-storage": c(
    "Emergency Cold Storage | Koolacube",
    "Solutions",
    "Emergency Cold Storage",
    "When your existing cold room fails, Koolacube can supply replacement cold storage. Subject to availability — call 1300 561 030 anytime.",
    [
      "Subject to availability",
      "Call 1300 561 030 24/7",
      "Depot in Deception Bay",
      "Tested unit before delivery",
      "Maintenance support 50km",
      "Hire continues monthly",
    ]
  ),
  "/cold-room-hire-during-renovations": c(
    "Cold Room Hire During Renovations | Koolacube",
    "Solutions",
    "Cold Room Hire During Renovations",
    "Keep operating while you renovate. Hire a temporary cold room or freezer for the duration of your build.",
    [
      "Project-length hire",
      "Cold or freezer",
      "Skid mount on site",
      "Tested before delivery",
      "Monthly billing",
      "Reduces business interruption",
    ]
  ),
};

/** Defaults for every `intro` template route (hero + SEO), keyed by path. */
export const INTRO_DEFAULTS: Record<string, IntroPageData> = {
  "/available-units": {
    metaTitle:
      "Available Units — Cooler, Freezer & Dual Temp Rooms | Koolacube",
    metaDescription:
      "Portable cooler rooms, freezer rooms and dual temp rooms in 3m, 6m and 9m sizes. Full specifications, temperature ranges and ideal applications. Custom builds available.",
    eyebrow: "Our Fleet",
    crumb: "Available Units",
    title: "Available Units",
    intro:
      "Portable cooler rooms, freezer rooms and dual temp rooms — available in 3m, 6m and 9m sizes with custom builds on request. Explore the specifications and ideal applications for each below.",
  },
  "/industries": {
    metaTitle: "Industries We Serve | Koolacube",
    metaDescription:
      "Portable cooling solutions for hospitality, aged care, healthcare, education, construction and mining. Reliable temperature control, easy mobility and full compliance across Australia.",
    eyebrow: "Industries",
    crumb: "Industries",
    title: "Industries We Serve",
    intro:
      "Koolacube provides reliable, portable cooling solutions designed for the unique needs of multiple sectors—including hospitality, aged care, healthcare, education, construction and mining. Our cold rooms deliver consistent temperature control, easy mobility and full compliance, making them the preferred choice across Australia.",
  },
};

/** Defaults for every `legal` template route (policy page), keyed by path. */
export const LEGAL_DEFAULTS: Record<string, LegalPageData> = {
  "/terms": {
    metaTitle: "Terms & Conditions | Koolacube",
    metaDescription:
      "Terms & Conditions for the hire, sale, delivery and maintenance of portable cold rooms, freezer rooms and dual-temp units supplied by Koolacube across SE Queensland.",
    eyebrow: "Legal",
    crumb: "Terms & Conditions",
    title: "Terms & Conditions",
    intro:
      "These Terms & Conditions apply to all quotations, hire agreements, sales, deliveries, installations and maintenance of portable cold rooms, freezer rooms and dual-temperature units supplied by Koolacube, part of the HVACR Group and backed by ACRO Refrigeration. By accepting a quote or taking delivery of equipment you agree to these terms.",
    effectiveDate: "1 January 2026",
    abn: "",
    sections: [
      {
        heading: "1. Definitions",
        body: 'In these terms: "Koolacube", "we", "us" or "our" means the supplier of the Equipment, part of the HVACR Group. "Client", "you" or "your" means the person or business hiring or purchasing the Equipment, including any party requesting or benefiting from it. "Equipment" means any cold room, freezer room, dual-temperature unit, refrigeration system, part or accessory supplied by us, whether on hire or sale. "Hire Period" means the period the Equipment is on hire, beginning on delivery and ending on collection or off-hire as set out below. "Quote" means our written estimate of the Equipment, services and charges.',
      },
      {
        heading: "2. Quotes & Acceptance",
        body: "Quotes are valid for 30 days unless stated otherwise and may be revised if your requirements, the site, or our costs change. A binding agreement is formed when you sign or approve the Quote, issue a purchase order, instruct us to proceed, or pay any deposit. Our price covers only the Equipment and services expressly stated. Anything not listed is excluded and may be charged as an addition.\n\nAll delivery dates and timeframes are estimates only and depend on availability, access, weather and third parties.",
      },
      {
        heading: "3. Hire Terms & Minimum Period",
        body: "Koolacube specialises in long-term commercial hire. Hire is charged monthly in advance and a minimum hire period applies as stated in your Quote. We do not provide short-term party or event hire.\n\nHire continues, and charges continue to accrue, until the Equipment is off-hired in accordance with clause 14 and is available for collection. The Equipment remains our property at all times during hire.",
      },
      {
        heading: "4. Delivery, Installation & Site Access",
        body: "Delivery and collection are quoted from our Deception Bay depot. You must provide safe, level, load-bearing ground, clear vehicle and crane access, adequate clearance, and a compliant power supply at the agreed delivery point before delivery.\n\nUnless expressly included, electrical connection to your switchboard must be completed by a licensed electrician at your cost. Standby time, failed or repeat deliveries, and additional attendances caused by site conditions, access constraints or power not being ready are chargeable.",
      },
      {
        heading: "5. Power Supply & Operating Conditions",
        body: "The Equipment requires continuous, stable power of the specified type for the entire Hire Period. You are responsible for the cost of running power and for ensuring the supply is adequate and protected.\n\nPerformance depends on ambient conditions, door discipline, ventilation around the unit, load placed inside, and an uninterrupted power supply. We do not warrant temperature performance where power is interrupted, the unit is overloaded, doors are left open, or airflow is obstructed.",
      },
      {
        heading: "6. Care & Use of Hired Equipment",
        body: "During the Hire Period you must keep the Equipment in good clean condition, use it only for its intended purpose and within its rated temperature range, and not move, modify, repair or sub-hire it without our written consent.\n\nYou are responsible for loss of or damage to the Equipment from delivery until collection, except fair wear and tear. You should arrange your own insurance covering the full replacement value. Cleaning, repairs or replacement required due to misuse, contamination or damage are chargeable.",
      },
      {
        heading: "7. Maintenance & Breakdowns",
        body: "Routine maintenance and breakdown support are included for hire Equipment located within 50km of our Deception Bay depot. Outside 50km, attendance is available by agreement and travel may be charged.\n\nReport any fault promptly by calling us on 1300 561 030. We will attend within a reasonable time. Call-outs caused by power failure, incorrect operation, blocked airflow, overloading or no-fault-found are chargeable. We are not liable for stock spoilage — see clause 13.",
      },
      {
        heading: "8. Sales — New, Ex-Hire & Custom Builds",
        body: "Equipment may also be purchased new, as refurbished ex-hire stock, or as a custom build. Ex-hire units are sold in tested, used condition and may show signs of prior use; inspection is welcome before purchase.\n\nFor custom builds, deposits are required before manufacture begins and are non-refundable once materials are ordered or work is committed. Lead times for sales are estimates and may be affected by supplier and freight delays.",
      },
      {
        heading: "9. Pricing, GST & Additional Charges",
        body: "Unless stated otherwise, prices are in Australian dollars and exclusive of GST, which is added at the applicable rate. Charges may include delivery, collection, installation, electrical connection, maintenance outside the standard area, and additions agreed during the engagement.\n\nWaiting time, failed deliveries, after-hours work, and additional attendances caused by access, power or site readiness are chargeable.",
      },
      {
        heading: "10. Payment Terms",
        body: "Hire charges are invoiced monthly in advance. A deposit and/or first month's hire and delivery may be payable before delivery. For sales, full payment is required before delivery or collection unless we have agreed credit terms in writing.\n\nApproved account customers must pay within the agreed terms (default 30 days from invoice). You must not withhold or set off any amount unless we agree in writing.",
      },
      {
        heading: "11. Overdue Accounts & Suspension",
        body: "If an invoice is overdue we may charge interest on the outstanding amount and recover all reasonable costs of collection, including legal and agency fees, on a full indemnity basis.\n\nWhile any amount is overdue we may suspend service, decline further attendances, and recover the Equipment. Charges continue to accrue during any suspension and remobilisation following suspension is chargeable.",
      },
      {
        heading: "12. Title, Risk & PPSA",
        body: "Hired Equipment remains our property at all times. For sales, title in the Equipment does not pass until we have received full payment of all amounts owing, while risk passes to you on delivery.\n\nYou grant us a security interest under the Personal Property Securities Act 2009 (Cth) to secure all amounts owing, and agree to do anything reasonably required to perfect or enforce that interest. To the extent permitted by law you waive your right to receive certain PPSA notices.",
      },
      {
        heading: "13. Liability & Stock Spoilage",
        body: "To the extent permitted by law, and subject to the Australian Consumer Law, we are not liable for any indirect or consequential loss, loss of profit, loss of business, or for spoilage of stock or product stored in or affected by the Equipment.\n\nNothing in these terms excludes any rights or guarantees you have under the Australian Consumer Law that cannot lawfully be excluded. Where our liability can be limited, it is limited at our option to re-supplying the relevant Equipment or service, or paying the cost of doing so. We strongly recommend you insure your stock.",
      },
      {
        heading: "14. Off-Hire, Termination & Collection",
        body: "To end a hire you must notify us by phone or email and obtain an off-hire reference. Hire charges continue until we are notified and the Equipment is empty, clean, safely accessible and available for collection.\n\nWe may terminate the hire and recover the Equipment if you breach these terms, fail to pay, or become insolvent. You must provide safe access for collection; costs of recovering Equipment that is not accessible or not ready are chargeable.",
      },
      {
        heading: "15. Privacy",
        body: "We handle personal information in accordance with the Australian Privacy Principles. We collect your details to quote, supply, deliver, maintain and invoice for the Equipment, and to contact you about your account. We do not sell your personal information. For any privacy request, contact us using the details below.",
      },
      {
        heading: "16. Governing Law",
        body: "These terms are governed by the laws of Queensland, Australia, and you submit to the non-exclusive jurisdiction of the courts of that State. If any provision is found to be unenforceable, the remaining provisions continue in full force.",
      },
      {
        heading: "17. Contact Us",
        body: "If you have any questions about these Terms & Conditions, please contact Koolacube:\n\nPhone: 1300 561 030\n\nEmail: info@koolacube.com.au\n\nAddress: Unit 3, 9–11 Imboon Street, Deception Bay QLD 4508",
      },
    ],
  },
};
