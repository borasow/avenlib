import type { MetadataRoute } from "next";

const BASE_URL = "https://avenlib.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { url: "/",              priority: 1.0, changeFrequency: "weekly" },
    { url: "/diagnostic",   priority: 0.9, changeFrequency: "monthly" },
    { url: "/resultats",    priority: 0.8, changeFrequency: "monthly" },
    { url: "/retraite",     priority: 0.8, changeFrequency: "monthly" },
    { url: "/prevoyance",   priority: 0.8, changeFrequency: "monthly" },
    { url: "/sante",        priority: 0.8, changeFrequency: "monthly" },
    { url: "/fiscalite",    priority: 0.8, changeFrequency: "monthly" },
    { url: "/credit",       priority: 0.8, changeFrequency: "monthly" },
    { url: "/banque",       priority: 0.8, changeFrequency: "monthly" },
    { url: "/assurance-pro",priority: 0.8, changeFrequency: "monthly" },
    { url: "/epargne",      priority: 0.8, changeFrequency: "monthly" },
    { url: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" },
    { url: "/cgu",          priority: 0.3, changeFrequency: "yearly" },
    { url: "/contact",      priority: 0.5, changeFrequency: "yearly" },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
