// Calcul des indemnités journalières (IJ) maladie des indépendants affiliés à la Sécurité sociale des indépendants (SSI).
// Sources : ameli.fr (travailleurs indépendants, indemnités journalières), service-public.fr.
// Valeurs 2026. À revérifier chaque 1er janvier.

export const PASS = 48060; // plafond annuel de la Sécurité sociale
export const IJ_MAX = 65.84; // PASS / 730, brut par jour
export const IJ_MIN_ENTREPRENEUR = 26.33;
export const IJ_MIN_MICRO = 6.27;
export const SEUIL_REVENU = 4582; // revenu annuel moyen minimal pour ouvrir droit (sources divergentes : 4 582 € / 4 806 €)
export const CARENCE_JOURS = 3;

export type Statut = "micro_bic_vente" | "micro_bic_service" | "micro_bnc" | "reel";

export const ABATTEMENTS: Record<Exclude<Statut, "reel">, number> = {
  micro_bic_vente: 0.71,
  micro_bic_service: 0.5,
  micro_bnc: 0.34,
};

export interface IjInput {
  statut: Statut;
  /** Chiffre d'affaires annuel moyen (micro) ou revenu net annuel moyen (réel), en euros. */
  montantAnnuel: number;
  /** Durée de l'arrêt en jours calendaires. */
  dureeJours: number;
  /** Charges mensuelles à couvrir, en euros. */
  chargesMensuelles: number;
  /** Revenu mensuel habituel, optionnel pour la comparaison. */
  revenuMensuelHabituel?: number;
}

export interface IjResult {
  droit: boolean;
  revenuRetenu: number;
  ijJour: number;
  joursIndemnises: number;
  totalIj: number;
  chargesPeriode: number;
  ecart: number; // négatif = manque à gagner
  plafonne: boolean;
}

export function calculerIj(i: IjInput): IjResult {
  const montant = Math.max(0, i.montantAnnuel || 0);
  const revenuRetenu = i.statut === "reel" ? montant : montant * (1 - ABATTEMENTS[i.statut]);
  const duree = Math.max(0, Math.floor(i.dureeJours || 0));
  const joursIndemnises = Math.max(0, duree - CARENCE_JOURS);
  const chargesPeriode = (Math.max(0, i.chargesMensuelles || 0) * 12 * duree) / 365;

  if (revenuRetenu < SEUIL_REVENU) {
    return { droit: false, revenuRetenu, ijJour: 0, joursIndemnises, totalIj: 0, chargesPeriode, ecart: -chargesPeriode, plafonne: false };
  }
  const brut = Math.min(revenuRetenu, PASS) / 730;
  const min = i.statut === "reel" ? IJ_MIN_ENTREPRENEUR : IJ_MIN_MICRO;
  const ijJour = Math.round(Math.min(IJ_MAX, Math.max(min, brut)) * 100) / 100;
  const totalIj = Math.round(ijJour * joursIndemnises * 100) / 100;
  return {
    droit: true,
    revenuRetenu,
    ijJour,
    joursIndemnises,
    totalIj,
    chargesPeriode,
    ecart: Math.round((totalIj - chargesPeriode) * 100) / 100,
    plafonne: revenuRetenu >= PASS,
  };
}
