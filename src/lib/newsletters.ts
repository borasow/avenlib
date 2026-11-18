export interface NewsletterBloc {
  titre: string;
  texte: string;
  lien?: { label: string; url: string };
}

export interface NewsletterIssue {
  id: string;
  sujet: string;
  preheader: string;
  titre: string;
  intro: string;
  blocs: NewsletterBloc[];
  cta: { texte: string; label: string; url: string };
}

/** Numéros de la newsletter. Rien n'est envoyé sans déclenchement manuel de la route d'envoi. */
export const ISSUES: NewsletterIssue[] = [
  {
    id: "2026-12",
    sujet: "Avenlib : 3 jours sans indemnité si vous tombez malade",
    preheader: "Le point du mois sur la protection des indépendants.",
    titre: "Le point du mois",
    intro:
      "Bonjour, voici votre rendez-vous mensuel avec Avenlib : un sujet, un chiffre officiel et une action simple pour mieux protéger votre activité.",
    blocs: [
      {
        titre: "Le sujet : l'arrêt maladie",
        texte:
          "Pour un indépendant au régime général de la Sécurité sociale, les indemnités journalières ne commencent qu'après 3 jours de carence, elles sont plafonnées (65,84 € brut par jour au maximum en 2026) et demandent 12 mois d'affiliation continue. Pendant ce temps, vos charges continuent.",
        lien: { label: "Lire le guide prévoyance", url: "https://avenlib.fr/blog/prevoyance-independant" },
      },
      {
        titre: "L'action du mois",
        texte:
          "Consultez votre relevé de carrière sur info-retraite.fr (gratuit). Vous y voyez vos trimestres et une estimation de votre pension, pour savoir où vous en êtes.",
        lien: { label: "Ouvrir info-retraite.fr", url: "https://www.info-retraite.fr" },
      },
    ],
    cta: {
      texte: "Vous n'avez pas encore fait votre bilan, ou il date ? Il prend 3 minutes et il est gratuit.",
      label: "Faire mon bilan",
      url: "https://avenlib.fr/diagnostic",
    },
  },
];

export function getIssue(id: string): NewsletterIssue | undefined {
  return ISSUES.find((i) => i.id === id);
}
