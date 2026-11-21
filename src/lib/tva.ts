// Franchise en base de TVA (valable 2025-2026, vérifié sur justice.fr / economie.gouv.fr)
export type ActiviteTva = "services" | "vente";

export const SEUILS_TVA: Record<ActiviteTva, { label: string; base: number; majore: number }> = {
  services: { label: "Prestations de services (BIC, BNC, location meublée)", base: 37500, majore: 41250 },
  vente: { label: "Vente de marchandises, restauration, hébergement", base: 85000, majore: 93500 },
};

export type ResultatTva = {
  statut: "franchise" | "tva-janvier" | "tva-immediate" | "tva-deja";
  titre: string;
  detail: string;
  margeBase: number; // € restants avant le seuil de base (négatif si dépassé)
  margeMajore: number;
};

export function seuilTva(activite: ActiviteTva, caAnneePrecedente: number, caAnneeEnCours: number): ResultatTva {
  const s = SEUILS_TVA[activite];
  const margeBase = s.base - caAnneeEnCours;
  const margeMajore = s.majore - caAnneeEnCours;
  if (caAnneePrecedente > s.base) {
    return { statut: "tva-deja", titre: "Tu factures déjà la TVA cette année", detail: `Ton chiffre d'affaires de l'an dernier dépasse ${s.base.toLocaleString("fr-FR")} €. Tu es normalement redevable de la TVA depuis le 1er janvier.`, margeBase, margeMajore };
  }
  if (caAnneeEnCours > s.majore) {
    return { statut: "tva-immediate", titre: "Tu dois facturer la TVA dès le jour du dépassement", detail: `Tu as dépassé le seuil majoré de ${s.majore.toLocaleString("fr-FR")} €. La TVA s'applique dès la première opération qui l'a fait passer, pas à partir de janvier.`, margeBase, margeMajore };
  }
  if (caAnneeEnCours > s.base) {
    return { statut: "tva-janvier", titre: "Tu factures sans TVA jusqu'au 31 décembre", detail: `Tu es au-dessus de ${s.base.toLocaleString("fr-FR")} € mais sous ${s.majore.toLocaleString("fr-FR")} €. Tu restes sans TVA cette année, puis tu la factures dès le 1er janvier.`, margeBase, margeMajore };
  }
  return { statut: "franchise", titre: "Tu restes en franchise de TVA", detail: `Tu es sous le seuil de ${s.base.toLocaleString("fr-FR")} €. Tu ne factures pas de TVA.`, margeBase, margeMajore };
}

// Salarié : net avant impôt ≈ 78 % du brut (non-cadre), ≈ 75 % (cadre). Ordres de grandeur.
export const RATIO_NET_SALARIE = { noncadre: 0.78, cadre: 0.75 } as const;
