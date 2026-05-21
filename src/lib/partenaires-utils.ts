import { PARTENAIRES, Partenaire } from "./partenaires";

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function clearbitLogo(url: string): string {
  try {
    const domain = new URL(url).hostname.replace(/^www\./, "");
    return `https://logo.clearbit.com/${domain}`;
  } catch {
    return "";
  }
}

export type PartenaireWithMeta = Partenaire & {
  domaine: string;
  slug: string;
  logoUrl: string;
};

export function findPartenaireBySlug(slug: string): PartenaireWithMeta | null {
  for (const [domaine, partners] of Object.entries(PARTENAIRES)) {
    for (const p of partners) {
      if (slugify(p.nom) === slug) {
        return { ...p, domaine, slug, logoUrl: clearbitLogo(p.url) };
      }
    }
  }
  return null;
}

export const DOMAINE_LABELS: Record<string, string> = {
  retraite:        "Retraite",
  prevoyance:      "Prévoyance arrêt maladie",
  sante:           "Mutuelle santé",
  fiscalite:       "Optimisation fiscale",
  deces:           "Prévoyance décès/invalidité",
  banque_pro:      "Banque professionnelle",
  assurance_pro:   "Assurance RC Pro",
  epargne:         "Épargne & investissement",
  credit:          "Crédit immobilier",
  portage_salarial: "Portage salarial",
};
