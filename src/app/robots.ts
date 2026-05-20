import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/compte", "/admin"],
    },
    sitemap: "https://avenlib.fr/sitemap.xml",
  };
}
