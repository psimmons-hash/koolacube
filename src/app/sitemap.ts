import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

// Priority reflects relative importance: home > core hire/buy > locations/industries > info.
const entries: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/hire/cold-room", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hire/freezer-room", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hire/dual-temp", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hire/long-term", priority: 0.9, changeFrequency: "weekly" },
  { path: "/buy/new", priority: 0.8, changeFrequency: "weekly" },
  { path: "/buy/ex-hire", priority: 0.8, changeFrequency: "weekly" },
  { path: "/buy/custom", priority: 0.7, changeFrequency: "monthly" },
  { path: "/available-units", priority: 0.8, changeFrequency: "weekly" },
  { path: "/industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/service-areas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/cold-room-hire-brisbane", priority: 0.8, changeFrequency: "monthly" },
  { path: "/freezer-room-hire-brisbane", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cold-room-hire-gold-coast", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cold-room-hire-sunshine-coast", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cold-room-sales-queensland", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cold-room-hire-for-butchers", priority: 0.6, changeFrequency: "monthly" },
  { path: "/cold-room-hire-for-restaurants", priority: 0.6, changeFrequency: "monthly" },
  { path: "/cold-room-hire-for-food-manufacturers", priority: 0.6, changeFrequency: "monthly" },
  { path: "/cold-room-hire-for-aged-care", priority: 0.6, changeFrequency: "monthly" },
  { path: "/emergency-cold-storage", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cold-room-hire-during-renovations", priority: 0.6, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return entries.map((e) => ({
    url: `${SITE.url}${e.path}`,
    lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
