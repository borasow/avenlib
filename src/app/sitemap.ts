import type { MetadataRoute } from "next";

import { ARTICLES } from "@/lib/blog";

const BASE_URL = "https://avenlib.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { url: "/",              priority: 1.0, changeFrequency: "weekly" },
    { url: "/diagnostic",   priority: 0.9, changeFrequency: "monthly" },
    { url: "/qui-sommes-nous", priority: 0.6, changeFrequency: "yearly" },
    { url: "/outils", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/calcul-indemnites-arret-maladie", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/prevoyance-independant", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/matelas-securite", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/revenu-net-independant", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/micro-ou-reel", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/tjm-freelance", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/calcul-impot-revenu", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/retraite-independant", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/capacite-emprunt-independant", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/seuil-tva-independant", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/freelance-vs-salarie", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/echeances-independant", priority: 0.8, changeFrequency: "monthly" },
    { url: "/outils/devis-facture-gratuit", priority: 0.8, changeFrequency: "monthly" },
    { url: "/connexion",    priority: 0.5, changeFrequency: "yearly" },
    { url: "/resultats",    priority: 0.8, changeFrequency: "monthly" },
    { url: "/retraite",     priority: 0.8, changeFrequency: "monthly" },
    { url: "/prevoyance",   priority: 0.8, changeFrequency: "monthly" },
    { url: "/sante",        priority: 0.8, changeFrequency: "monthly" },
    { url: "/fiscalite",    priority: 0.8, changeFrequency: "monthly" },
    { url: "/credit",       priority: 0.8, changeFrequency: "monthly" },
    { url: "/banque",       priority: 0.8, changeFrequency: "monthly" },
    { url: "/assurance-pro",priority: 0.8, changeFrequency: "monthly" },
    { url: "/epargne",      priority: 0.8, changeFrequency: "monthly" },
    { url: "/blog", priority: 0.8, changeFrequency: "weekly" },
    ...ARTICLES.map((a) => ({ url: `/blog/${a.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
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
