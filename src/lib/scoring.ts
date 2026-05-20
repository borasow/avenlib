export type RiskLevel = "urgent" | "optimiser" | "ok";

export interface ScoreDomaine {
  niveau: RiskLevel;
  titre: string;
  score: number;
  message: string;
  pensionEstimee?: number;
}

export interface DiagnosticAnswers {
  statut: string;
  secteur: string;
  anciennete: string;
  revenus: string;
  regime_fiscal?: string;
  situation_familiale: string;
  age: string;
  existant: string[];
  prevoyance_niveau: string;
  objectifs: string[];
  ressenti?: string;
  logement?: string;
  banque_pro: string;
  rc_pro: string;
  portage_salarial?: string;
}

const REVENUS_SUP_45K = ["45 000 – 75 000 €", "75 000 – 120 000 €", "Plus de 120 000 €"];

export function calculerScores(answers: DiagnosticAnswers): Record<string, ScoreDomaine> {
  const scores: Record<string, ScoreDomaine> = {
    retraite:      calculerRetraite(answers),
    prevoyance:    calculerPrevoyance(answers),
    sante:         calculerSante(answers),
    fiscalite:     calculerFiscalite(answers),
    deces:         calculerDeces(answers),
    banque_pro:    calculerBanquePro(answers),
    assurance_pro: calculerAssurancePro(answers),
    epargne:       calculerEpargne(answers),
  };

  if ((answers.objectifs as string[] | undefined)?.includes("Obtenir un crédit immobilier")) {
    scores.credit = calculerCredit(answers);
  }

  const portageRep = answers.portage_salarial ?? "";
  const isSalariéPorté = answers.statut === "Salarié porté (portage salarial)";
  const showPortage =
    isSalariéPorté ||
    (
      portageRep !== "Non, je préfère rester indépendant" &&
      (
        portageRep !== "" ||
        answers.anciennete === "Moins d'1 an" ||
        answers.statut === "Micro-entrepreneur / Auto-entrepreneur"
      )
    );
  if (showPortage) {
    scores.portage_salarial = calculerPortage(answers);
  }

  return scores;
}

/* ── Retraite ── */

function calculerRetraite(a: DiagnosticAnswers): ScoreDomaine {
  const pension = estimerRetraite(a);
  const hasPER = a.existant.includes("PER / épargne retraite");

  let niveau: RiskLevel;
  let score: number;

  if (pension >= 1200 && hasPER) {
    niveau = "ok"; score = 85;
  } else if (pension >= 1200 && !hasPER) {
    niveau = "optimiser"; score = 62;
  } else if (pension >= 800 && hasPER) {
    niveau = "optimiser"; score = 55;
  } else if (pension >= 800 && !hasPER) {
    niveau = "optimiser"; score = 42;
  } else if (pension < 800 && hasPER) {
    niveau = "urgent"; score = 32;
  } else {
    niveau = "urgent"; score = 15;
  }

  if (a.existant.includes("Assurance vie"))        score = Math.min(100, score + 8);
  if (a.existant.includes("Immobilier locatif"))   score = Math.min(100, score + 8);
  if (a.age === "Plus de 50 ans")                  score = Math.max(0, score - 10);

  let message: string;
  if (niveau === "ok") {
    message = `Ta pension estimée (~${pension} €/mois) combinée à ton épargne retraite te place dans une bonne trajectoire.`;
  } else if (pension < 800 && !hasPER) {
    message = `Ta pension estimée sera d'environ ${pension} €/mois, sans épargne retraite complémentaire. C'est urgent d'agir.`;
  } else if (pension < 800) {
    message = `Ta pension estimée (~${pension} €/mois) est insuffisante. Ton PER va dans le bon sens, renforce les versements.`;
  } else {
    message = `Ta pension estimée sera d'environ ${pension} €/mois. ${hasPER ? "Continue d'alimenter ton PER régulièrement." : "Ouvrir un PER te permettrait d'améliorer significativement cette projection."}`;
  }

  return {
    niveau,
    titre: "Retraite",
    score: Math.min(100, Math.max(0, score)),
    message,
    pensionEstimee: pension,
  };
}

function estimerRetraite(a: DiagnosticAnswers): number {
  const tranche = (revenus: string): "inf25" | "25_45" | "45_75" | "sup75" => {
    if (revenus === "Moins de 25 000 €") return "inf25";
    if (revenus === "25 000 – 45 000 €") return "25_45";
    if (revenus === "45 000 – 75 000 €") return "45_75";
    return "sup75";
  };

  const t = tranche(a.revenus);
  const isMicro = a.statut === "Micro-entrepreneur / Auto-entrepreneur";
  const isSASU  = a.statut === "SASU / SAS";
  const isTNS   = a.statut === "EURL / EI au réel" || a.statut === "SARL / EURL (gérant majoritaire)";

  if (isMicro) return ({ inf25: 400, "25_45": 620, "45_75": 850, sup75: 1100 })[t];
  if (isSASU)  return ({ inf25: 650, "25_45": 950, "45_75": 1300, sup75: 1800 })[t];
  if (isTNS)   return ({ inf25: 500, "25_45": 780, "45_75": 1050, sup75: 1400 })[t];
  return           ({ inf25: 450, "25_45": 700, "45_75": 950, sup75: 1250 })[t];
}

/* ── Prévoyance ── */

function calculerPrevoyance(a: DiagnosticAnswers): ScoreDomaine {
  let score = 30;
  if (a.prevoyance_niveau === "Je suis bien couvert") score = 90;
  else if (a.prevoyance_niveau === "Je touche la sécu seulement (~22€/jour)") score = 25;
  else if (a.prevoyance_niveau === "Je ne touche rien") score = 5;
  else if (a.prevoyance_niveau === "Je ne sais pas") score = 20;
  if (a.existant.includes("Prévoyance arrêt maladie")) score = Math.max(score, 70);

  const message =
    score < 40
      ? "En cas d'arrêt maladie, tu percevras ~22€/jour de la Sécu. C'est bien en dessous de ton niveau de vie."
      : score < 70
      ? "Ta couverture arrêt maladie est partielle. Un complément de prévoyance s'impose."
      : "Ta prévoyance arrêt maladie est bien en place.";

  return { niveau: score >= 70 ? "ok" : score >= 40 ? "optimiser" : "urgent", titre: "Prévoyance arrêt maladie", score, message };
}

/* ── Santé ── */

function calculerSante(a: DiagnosticAnswers): ScoreDomaine {
  const score = a.existant.includes("Mutuelle santé") ? 85 : 15;
  const message =
    score >= 70
      ? "Tu as une mutuelle santé, vérifie qu'elle couvre bien les soins courants et l'optique/dentaire."
      : "Sans mutuelle complémentaire, tes frais de santé peuvent rapidement devenir lourds.";

  return { niveau: score >= 70 ? "ok" : score >= 40 ? "optimiser" : "urgent", titre: "Mutuelle santé", score, message };
}

/* ── Fiscalité ── */

function calculerFiscalite(a: DiagnosticAnswers): ScoreDomaine {
  let score = 50;
  const revenusEleves  = REVENUS_SUP_45K.includes(a.revenus);
  const revenusModeres = ["45 000 – 75 000 €"].includes(a.revenus);

  if (revenusEleves && a.statut === "Micro-entrepreneur / Auto-entrepreneur") score = 10;
  else if (revenusEleves) score = 35;
  else if (revenusModeres) score = 55;
  else score = 70;

  if (a.existant.includes("PER / épargne retraite")) score += 15;

  // Ajustement selon régime fiscal
  const regime = a.regime_fiscal ?? "";
  if (regime === "Micro-BIC (vente de marchandises)" || regime === "Micro-BNC (prestations de services)") {
    score -= 10;
  } else if (regime === "Régime réel simplifié" || regime === "Régime réel normal") {
    score += 15;
  } else if (regime === "Je ne sais pas") {
    score -= 15;
  }

  let message: string;
  if (score < 30) {
    message = "Tu ne connais pas ton régime fiscal ou tu es en micro avec des revenus élevés. Un accompagnement comptable est urgent pour éviter de surpayer tes impôts.";
  } else if (score < 50) {
    message = "Avec tes revenus et ton statut, tu laisses probablement beaucoup d'argent sur la table. Un audit fiscal s'impose.";
  } else if (score < 70) {
    if (regime === "Micro-BIC (vente de marchandises)" || regime === "Micro-BNC (prestations de services)") {
      message = "Le régime micro limite tes charges déductibles. Selon tes dépenses réelles, le régime réel pourrait être bien plus avantageux.";
    } else {
      message = "Il existe des leviers fiscaux que tu n'exploites pas encore (PER, optimisation de charges...).";
    }
  } else {
    message = "Tu es au régime réel avec une bonne maîtrise de tes leviers fiscaux. Continue à optimiser avec un expert-comptable.";
  }

  return { niveau: score >= 70 ? "ok" : score >= 40 ? "optimiser" : "urgent", titre: "Optimisation fiscale", score: Math.min(100, Math.max(0, score)), message };
}

/* ── Décès/Invalidité ── */

function calculerDeces(a: DiagnosticAnswers): ScoreDomaine {
  let score = 50;
  const AVEC_ENFANTS = [
    "Célibataire, avec enfant(s)",
    "Marié(e) / Pacsé(e), avec enfant(s)",
    "Famille monoparentale",
    "En concubinage, avec enfant(s)",
  ];
  const aCharge =
    AVEC_ENFANTS.includes(a.situation_familiale) ||
    (a.logement ?? "") === "Propriétaire avec emprunt en cours";

  if (!aCharge) score = 65;
  if (a.existant.includes("Assurance vie")) score += 20;
  if (aCharge && !a.existant.includes("Assurance vie")) score = 15;

  const message =
    score < 40
      ? "Tu as des personnes à charge sans filet de sécurité décès/invalidité. C'est le risque le plus urgent à couvrir."
      : score < 70
      ? "Ta couverture décès/invalidité mérite d'être renforcée, notamment si tu as des personnes à charge."
      : "Ta couverture décès/invalidité est correcte.";

  return { niveau: score >= 70 ? "ok" : score >= 40 ? "optimiser" : "urgent", titre: "Prévoyance décès/invalidité", score: Math.min(100, Math.max(0, score)), message };
}

/* ── Banque pro ── */

function calculerBanquePro(a: DiagnosticAnswers): ScoreDomaine {
  const rep = a.banque_pro ?? "";
  let score: number;
  let niveau: RiskLevel;
  let message: string;

  if (rep === "Oui, compte pro dédié" || a.existant.includes("Compte bancaire pro dédié")) {
    score = 85; niveau = "ok";
    message = "Tu as un compte pro dédié. C'est la base d'une gestion saine de ton activité.";
  } else if (rep === "Je suis en train d'en chercher un") {
    score = 50; niveau = "optimiser";
    message = "Tu es en recherche. Qonto, Shine et Blank proposent des comptes pensés pour les indépendants, avec facturation et export comptable intégrés.";
  } else {
    score = 20; niveau = "urgent";
    message = "Mélanger compte perso et pro complique ta comptabilité et peut te causer des problèmes fiscaux. Ouvre un compte pro dédié rapidement.";
  }

  return { niveau, titre: "Banque professionnelle", score, message };
}

/* ── Assurance pro (RC Pro) ── */

function calculerAssurancePro(a: DiagnosticAnswers): ScoreDomaine {
  const rep = a.rc_pro ?? "";
  let score: number;
  let niveau: RiskLevel;
  let message: string;

  if (rep === "Oui, je suis couvert" || a.existant.includes("RC Pro / Assurance professionnelle")) {
    score = 85; niveau = "ok";
    message = "Tu es couvert en RC Pro. Vérifie que tes garanties sont à jour et adaptées à ton activité actuelle.";
  } else if (rep === "Je ne sais pas si j'en ai besoin") {
    score = 40; niveau = "optimiser";
    message = "La RC Pro est indispensable dès que tu réalises des prestations pour des clients. En cas d'erreur ou de dommage, c'est ton patrimoine personnel qui est exposé.";
  } else {
    score = 15; niveau = "urgent";
    message = "Tu exerces sans RC Pro. En cas de litige ou d'erreur professionnelle, tu es personnellement responsable. C'est le risque le plus facile et le moins cher à couvrir.";
  }

  return { niveau, titre: "Assurance RC Pro", score, message };
}

/* ── Épargne & investissement ── */

function calculerEpargne(a: DiagnosticAnswers): ScoreDomaine {
  const revenusEleves        = REVENUS_SUP_45K.includes(a.revenus);
  const hasEpargneInvest     = a.existant.includes("Épargne investissement (hors PER)");
  const hasAssuranceVie      = a.existant.includes("Assurance vie");
  const hasEpargneBancaire   = a.existant.includes("Épargne bancaire");

  let score: number;
  let niveau: RiskLevel;
  let message: string;

  if (hasEpargneInvest || hasAssuranceVie) {
    score = 80; niveau = "ok";
    message = "Tu as une épargne investie. Continue à l'alimenter régulièrement pour faire fructifier ton capital sur le long terme.";
  } else if (revenusEleves && !hasEpargneBancaire) {
    score = 20; niveau = "urgent";
    message = "Avec tes revenus, ne pas avoir d'épargne investie est une opportunité manquée. Chaque mois sans investissement, c'est du rendement perdu.";
  } else if (revenusEleves && hasEpargneBancaire) {
    score = 40; niveau = "optimiser";
    message = "Tu as une épargne bancaire mais avec tes revenus, tu pourrais faire bien mieux. Diversifie avec assurance vie ou PEA pour optimiser fiscalité et rendement.";
  } else if (hasEpargneBancaire) {
    score = 55; niveau = "optimiser";
    message = "Tu as une épargne bancaire. Pour la faire fructifier, envisage de diversifier une partie sur une assurance vie ou un PEA.";
  } else {
    score = 35; niveau = "urgent";
    message = "Constitue d'abord une épargne de précaution (3 à 6 mois de charges), puis envisage de placer tes excédents pour les faire fructifier.";
  }

  return { niveau, titre: "Épargne & investissement", score, message };
}

/* ── Portage salarial (conditionnel bonus) ── */

function calculerPortage(a: DiagnosticAnswers): ScoreDomaine {
  const rep = a.portage_salarial ?? "";
  const isSalariéPorté = a.statut === "Salarié porté (portage salarial)";
  const isMicro = a.statut === "Micro-entrepreneur / Auto-entrepreneur";
  const isDebutant = a.anciennete === "Moins d'1 an";
  const revemusFaibles = a.revenus === "Moins de 25 000 €";

  if (isSalariéPorté) {
    return {
      niveau: "ok", titre: "Portage salarial", score: 90,
      message: "Tu es déjà en portage salarial. Tu bénéficies des avantages du statut salarié tout en restant libre dans tes missions. Vérifie que ta société de portage est adaptée à ton volume d'activité.",
    };
  }

  if (rep === "Oui, je connais et ça m'intéresse") {
    return {
      niveau: "optimiser", titre: "Portage salarial", score: 55,
      message: "Le portage salarial t'intéresse — découvre les sociétés qui peuvent t'accompagner selon ton secteur et ton niveau de revenus.",
    };
  }

  if (rep === "J'en ai entendu parler mais je ne sais pas si c'est pour moi") {
    return {
      niveau: "optimiser", titre: "Portage salarial", score: 40,
      message: "Le portage salarial combine liberté du freelance et sécurité du salarié (chômage, retraite, mutuelle). Ça vaut le coup d'explorer selon ton profil.",
    };
  }

  if (rep === "Non, je ne connais pas") {
    return {
      niveau: "urgent", titre: "Portage salarial", score: 20,
      message: "Tu ne connais pas encore le portage salarial. C'est une alternative au statut indépendant classique : tu restes libre mais avec les protections d'un salarié (chômage, mutuelle, retraite).",
    };
  }

  // Pas de réponse à la question bonus : scoring basé sur le profil
  if (isDebutant && isMicro) {
    return {
      niveau: "urgent", titre: "Portage salarial", score: 25,
      message: "Tu démarres en micro-entrepreneur. Le portage salarial pourrait être une meilleure option : liberté des missions, protection chômage, mutuelle et retraite inclus dès le 1er jour.",
    };
  }
  if (isDebutant) {
    return {
      niveau: "optimiser", titre: "Portage salarial", score: 38,
      message: "Tu viens de te lancer. Le portage salarial est une alternative à explorer : tu restes indépendant dans tes missions mais avec les protections d'un salarié.",
    };
  }
  if (isMicro && revemusFaibles) {
    return {
      niveau: "optimiser", titre: "Portage salarial", score: 42,
      message: "En micro-entrepreneur avec des revenus modestes, le portage salarial peut t'offrir une couverture sociale bien supérieure (chômage, retraite, mutuelle) pour un coût comparable.",
    };
  }
  // micro en général
  return {
    niveau: "optimiser", titre: "Portage salarial", score: 50,
    message: "En tant que micro-entrepreneur, le portage salarial mérite d'être comparé à ton statut actuel. Il peut offrir une meilleure protection sociale selon ton chiffre d'affaires.",
  };
}

/* ── Crédit immobilier (conditionnel) ── */

function calculerCredit(a: DiagnosticAnswers): ScoreDomaine {
  const revenusEleves  = REVENUS_SUP_45K.includes(a.revenus);
  const hasEpargne     = a.existant.includes("Épargne bancaire") || a.existant.includes("Épargne investissement (hors PER)");
  const anciennete3ans = ["3 à 7 ans", "Plus de 7 ans"].includes(a.anciennete);

  let score: number;
  let niveau: RiskLevel;
  let message: string;

  if (revenusEleves && hasEpargne && anciennete3ans) {
    score = 70; niveau = "optimiser";
    message = "Ton profil est favorable pour un crédit immobilier. Un courtier spécialisé indépendants peut optimiser ton dossier et t'orienter vers les bonnes banques.";
  } else if (revenusEleves) {
    score = 45; niveau = "optimiser";
    message = "Tes revenus sont bons, mais un apport et une ancienneté de 3 ans renforcent significativement ton dossier de crédit immobilier.";
  } else {
    score = 28; niveau = "urgent";
    message = "Avec ton profil actuel, obtenir un crédit immobilier nécessitera un accompagnement spécialisé. Pretto et Mansa connaissent les banques ouvertes aux indépendants.";
  }

  return { niveau, titre: "Crédit immobilier", score, message };
}
