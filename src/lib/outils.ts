export interface Outil {
  slug: string;
  nav: string;
  titre: string;
  accroche: string;
  meta: string;
  theme: "Protection" | "Revenus" | "Retraite" | "Projets";
}

export const OUTILS: Outil[] = [
  { slug: "calcul-indemnites-arret-maladie", nav: "Arrêt maladie : combien je touche ?", titre: "Arrêt maladie : combien tu touches ?", accroche: "Tes indemnités journalières face à tes charges.", meta: "Estime tes indemnités journalières d'indépendant (SSI), le jour de carence et le manque à gagner face à tes charges. Gratuit.", theme: "Protection" },
  { slug: "prevoyance-independant", nav: "Prévoyance : combien me faut-il ?", titre: "Prévoyance : quelle garantie pour tenir ?", accroche: "Le montant à couvrir pour ne pas décrocher en cas d'arrêt.", meta: "Calcule le montant mensuel à assurer en prévoyance pour combler l'écart entre tes indemnités et tes besoins. Gratuit.", theme: "Protection" },
  { slug: "matelas-securite", nav: "Matelas de sécurité", titre: "Matelas de sécurité : combien de mois tu tiens ?", accroche: "Ton épargne de précaution en mois de charges.", meta: "Combien de mois peux-tu tenir sans revenu ? Calcule ton épargne de précaution d'indépendant et le temps pour l'atteindre.", theme: "Protection" },
  { slug: "revenu-net-independant", nav: "Combien je garde sur mon CA ?", titre: "Combien tu gardes vraiment sur ton chiffre d'affaires ?", accroche: "Cotisations, impôt, charges : ton revenu net réel.", meta: "Micro-entrepreneur ou au réel : calcule ton revenu net après cotisations, charges et impôt sur le revenu. Gratuit.", theme: "Revenus" },
  { slug: "micro-ou-reel", nav: "Micro ou réel ?", titre: "Micro-entreprise ou régime réel : lequel te laisse le plus ?", accroche: "Compare ton net dans les deux régimes.", meta: "Compare ton revenu net en micro-entreprise et au régime réel selon ton chiffre d'affaires et tes charges. Gratuit.", theme: "Revenus" },
  { slug: "tjm-freelance", nav: "Mon TJM", titre: "Calcule ton TJM de freelance", accroche: "À combien te facturer pour vivre de ton activité ?", meta: "Calcule le taux journalier minimum d'un freelance selon ton revenu voulu, tes charges, tes congés et ton temps non facturé.", theme: "Revenus" },
  { slug: "calcul-impot-revenu", nav: "Mon impôt sur le revenu", titre: "Estime ton impôt sur le revenu", accroche: "Barème 2026, parts et quotient familial.", meta: "Estime ton impôt sur le revenu avec le barème 2026 (revenus 2025), le quotient familial et son plafonnement.", theme: "Revenus" },
  { slug: "retraite-independant", nav: "Retraite : ma future pension", titre: "Retraite d'indépendant : combien tu toucheras ?", accroche: "Ta pension estimée, base et complémentaire.", meta: "Estime ta pension de retraite d'indépendant (SSI) : retraite de base, complémentaire RCI et taux de remplacement.", theme: "Retraite" },
  { slug: "capacite-emprunt-independant", nav: "Prêt : ma capacité d'emprunt", titre: "Capacité d'emprunt d'un indépendant", accroche: "Ce qu'une banque peut te prêter avec tes revenus.", meta: "Calcule ta capacité d'emprunt d'indépendant : mensualité maximale, capital empruntable et budget avec apport.", theme: "Projets" },
];
