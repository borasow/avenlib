// Calculs des outils Avenlib. Valeurs 2026, à revérifier chaque 1er janvier.
// Sources : economie.gouv.fr (taux micro), service-public.gouv.fr (barème IR), Assurance retraite / Urssaf (retraite, RCI).

export const PASS_2026 = 48060;

export type RegimeMicro = "vente" | "service" | "bnc" | "cipav";

export const MICRO: Record<RegimeMicro, { label: string; cotis: number; cfp: number; abatt: number; vl: number }> = {
  vente: { label: "Vente de marchandises (BIC)", cotis: 0.123, cfp: 0.001, abatt: 0.71, vl: 0.01 },
  service: { label: "Prestations de services commerciales ou artisanales (BIC)", cotis: 0.212, cfp: 0.003, abatt: 0.5, vl: 0.017 },
  bnc: { label: "Professions libérales non réglementées (BNC)", cotis: 0.256, cfp: 0.001, abatt: 0.34, vl: 0.022 },
  cipav: { label: "Professions libérales réglementées, Cipav (BNC)", cotis: 0.232, cfp: 0.002, abatt: 0.34, vl: 0.022 },
};

// ---------- Impôt sur le revenu (barème 2026, revenus 2025) ----------
const TRANCHES: [number, number][] = [
  [11600, 0],
  [29579, 0.11],
  [84577, 0.3],
  [181917, 0.41],
  [Infinity, 0.45],
];
const PLAFOND_DEMI_PART = 1807;

export function bareme(quotient: number): number {
  let impot = 0;
  let bas = 0;
  for (const [haut, taux] of TRANCHES) {
    if (quotient > bas) impot += (Math.min(quotient, haut) - bas) * taux;
    bas = haut;
  }
  return impot;
}

/** Impôt brut avec plafonnement du quotient familial. Hors décote, réductions et crédits. */
export function impotRevenu(revenuImposable: number, parts: number, couple: boolean): number {
  const r = Math.max(0, revenuImposable);
  const base = couple ? 2 : 1;
  const p = Math.max(base, parts);
  const avecParts = bareme(r / p) * p;
  const sansParts = bareme(r / base) * base;
  const demiParts = (p - base) * 2;
  const impot = Math.max(avecParts, sansParts - demiParts * PLAFOND_DEMI_PART);
  return Math.round(impot);
}

// ---------- Net réel ----------
export interface NetInput {
  regime: RegimeMicro;
  ca: number;
  charges: number; // charges réellement payées sur l'année
  parts: number;
  couple: boolean;
  autresRevenus: number; // autres revenus imposables du foyer
  versementLiberatoire: boolean;
}
export interface NetResult {
  cotisations: number;
  impot: number;
  netAvantImpot: number;
  netApresImpot: number;
  netMensuel: number;
  partCA: number; // part du CA conservée
}

export function netMicro(i: NetInput): NetResult {
  const m = MICRO[i.regime];
  const ca = Math.max(0, i.ca);
  const cotisations = Math.round(ca * (m.cotis + m.cfp));
  let impot: number;
  if (i.versementLiberatoire) {
    impot = Math.round(ca * m.vl);
  } else {
    const imposable = Math.max(0, ca - Math.max(ca * m.abatt, 305));
    impot = impotRevenu(imposable + i.autresRevenus, i.parts, i.couple) - impotRevenu(i.autresRevenus, i.parts, i.couple);
  }
  const netAvantImpot = ca - cotisations - Math.max(0, i.charges);
  const netApresImpot = netAvantImpot - impot;
  return { cotisations, impot, netAvantImpot, netApresImpot, netMensuel: netApresImpot / 12, partCA: ca ? netApresImpot / ca : 0 };
}

/** Estimation au réel : cotisations sociales ≈ 30 % du bénéfice avant cotisations (varie selon le revenu). */
export const TAUX_COTIS_REEL = 0.3;
export function netReel(i: Pick<NetInput, "ca" | "charges" | "parts" | "couple" | "autresRevenus">): NetResult {
  const benefice = Math.max(0, i.ca - Math.max(0, i.charges));
  const cotisations = Math.round(benefice * TAUX_COTIS_REEL);
  const imposable = benefice - cotisations;
  const impot = impotRevenu(imposable + i.autresRevenus, i.parts, i.couple) - impotRevenu(i.autresRevenus, i.parts, i.couple);
  const netAvantImpot = benefice - cotisations;
  const netApresImpot = netAvantImpot - impot;
  return { cotisations, impot, netAvantImpot, netApresImpot, netMensuel: netApresImpot / 12, partCA: i.ca ? netApresImpot / i.ca : 0 };
}

// ---------- TJM ----------
export interface TjmInput {
  netMensuelVoulu: number; // après cotisations, avant impôt
  chargesMensuelles: number;
  regime: RegimeMicro;
  congesJours: number;
  maladieJours: number;
  pctNonFacture: number; // % du temps passé en prospection, admin, formation
}
export function calculerTjm(i: TjmInput) {
  const joursOuvres = 365 - 104 - 8;
  const joursTravailles = Math.max(1, joursOuvres - i.congesJours - i.maladieJours);
  const joursFactures = Math.max(1, joursTravailles * (1 - Math.min(95, Math.max(0, i.pctNonFacture)) / 100));
  const m = MICRO[i.regime];
  const caNecessaire = (i.netMensuelVoulu * 12 + i.chargesMensuelles * 12) / (1 - m.cotis - m.cfp);
  return {
    joursTravailles,
    joursFactures: Math.round(joursFactures * 10) / 10,
    caNecessaire: Math.round(caNecessaire),
    tjm: Math.ceil(caNecessaire / joursFactures),
    cotisations: Math.round(caNecessaire * (m.cotis + m.cfp)),
  };
}

// ---------- Matelas de sécurité ----------
export function matelas(epargne: number, chargesMensuelles: number, epargneMensuelle: number, moisCible = 6) {
  const c = Math.max(1, chargesMensuelles);
  const moisTenus = Math.max(0, epargne) / c;
  const cible = moisCible * c;
  const manque = Math.max(0, cible - Math.max(0, epargne));
  const moisPourAtteindre = manque === 0 ? 0 : epargneMensuelle > 0 ? Math.ceil(manque / epargneMensuelle) : null;
  return { moisTenus: Math.round(moisTenus * 10) / 10, cible, manque, moisPourAtteindre };
}

// ---------- Retraite SSI (artisans, commerçants, libéraux non réglementés) ----------
export const RETRAITE = { taux: 0.5, trimestresTauxPlein: 172, valeurPointRCI: 1.347, achatPointRCI: 21.726, cotisRCI1: 0.07, cotisRCI2: 0.08 };

export function retraiteSsi(revenuAnnuel: number, trimestresValides: number, anneesRestantes: number) {
  const revenu = Math.max(0, revenuAnnuel);
  const trimestres = Math.min(RETRAITE.trimestresTauxPlein, Math.max(0, trimestresValides) + 4 * Math.max(0, anneesRestantes));
  const ram = Math.min(revenu, PASS_2026);
  const base = ram * RETRAITE.taux * (trimestres / RETRAITE.trimestresTauxPlein);
  const cotisRci = Math.min(revenu, PASS_2026) * RETRAITE.cotisRCI1 + Math.max(0, Math.min(revenu, 4 * PASS_2026) - PASS_2026) * RETRAITE.cotisRCI2;
  const annees = trimestres / 4;
  const points = (cotisRci / RETRAITE.achatPointRCI) * annees;
  const complementaire = points * RETRAITE.valeurPointRCI;
  const total = base + complementaire;
  return {
    trimestres,
    base: Math.round(base),
    complementaire: Math.round(complementaire),
    totalAnnuel: Math.round(total),
    totalMensuel: Math.round(total / 12),
    tauxRemplacement: revenu ? total / revenu : 0,
    tauxPlein: trimestres >= RETRAITE.trimestresTauxPlein,
  };
}

// ---------- Capacité d'emprunt ----------
export interface EmpruntInput {
  revenuMensuel: number; // net moyen sur 3 ans
  creditsEnCours: number; // mensualités
  tauxAnnuel: number; // %
  assuranceAnnuelle: number; // % du capital
  dureeAns: number;
  apport: number;
  tauxEndettement?: number;
}
export function capaciteEmprunt(i: EmpruntInput) {
  const te = i.tauxEndettement ?? 0.35;
  const mensualiteMax = Math.max(0, i.revenuMensuel * te - Math.max(0, i.creditsEnCours));
  const n = Math.max(1, Math.round(i.dureeAns * 12));
  const t = i.tauxAnnuel / 100 / 12;
  const a = i.assuranceAnnuelle / 100 / 12;
  const facteur = (t === 0 ? 1 / n : t / (1 - Math.pow(1 + t, -n))) + a;
  const capital = mensualiteMax / facteur;
  return {
    mensualiteMax: Math.round(mensualiteMax),
    capital: Math.round(capital),
    budget: Math.round(capital + Math.max(0, i.apport)),
    coutCredit: Math.round(mensualiteMax * n - capital),
  };
}

// ---------- Prévoyance ----------
export function prevoyance(ijJour: number, droit: boolean, besoinMensuel: number, franchiseJours: number) {
  const ijMensuelle = droit ? ijJour * 30 : 0;
  const manqueMensuel = Math.max(0, besoinMensuel - ijMensuelle);
  const coutFranchise = (besoinMensuel / 30) * franchiseJours;
  return { ijMensuelle: Math.round(ijMensuelle), manqueMensuel: Math.round(manqueMensuel), coutFranchise: Math.round(coutFranchise) };
}
