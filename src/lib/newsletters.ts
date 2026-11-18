export interface NewsletterBloc {
  titre: string;
  paragraphes: string[];
  liste?: string[];
  etapes?: string[];
  image?: { src: string; alt: string };
  lien?: { label: string; url: string };
}

export interface NewsletterIssue {
  id: string;
  sujet: string;
  preheader: string;
  cover: { src: string; alt: string };
  titre: string;
  intro: string;
  chiffre: { valeur: string; label: string };
  blocs: NewsletterBloc[];
  blog: { titre: string; texte: string; image: string; url: string };
  cta: { texte: string; label: string; url: string };
}

const ASSETS = "https://avenlib.fr/newsletter";

/** Numéros de la newsletter. Rien n'est envoyé sans déclenchement manuel de la route d'envoi. */
export const ISSUES: NewsletterIssue[] = [
  {
    id: "2026-12",
    sujet: "Avenlib : 3 jours sans indemnité si vous tombez malade",
    preheader: "Arrêt maladie, retraite : le point du mois pour les indépendants.",
    cover: { src: `${ASSETS}/cover-2026-12.png`, alt: "Avenlib, le point du mois, décembre 2026" },
    titre: "Si vous tombez malade demain, que se passe-t-il vraiment ?",
    intro:
      "Salarié, un arrêt maladie est souvent amorti par l'employeur. Indépendant, c'est une autre histoire : les règles sont différentes, et peu de gens les connaissent avant d'en avoir besoin. Voici l'essentiel, en deux minutes.",
    chiffre: { valeur: "3 jours", label: "de carence avant le début de toute indemnité" },
    blocs: [
      {
        titre: "Ce que prévoit la Sécurité sociale",
        paragraphes: [
          "Un indépendant au régime général peut percevoir des indemnités journalières, mais sous conditions. Il faut d'abord justifier de 12 mois d'affiliation continue. Les indemnités ne commencent ensuite qu'au 4e jour d'arrêt : les 3 premiers jours ne sont pas indemnisés.",
          "Le montant est calculé sur la moyenne de vos revenus des trois dernières années, et il est plafonné : 65,84 € brut par jour au maximum en 2026. Pour un micro-entrepreneur, c'est le chiffre d'affaires après abattement qui sert de base, pas le chiffre d'affaires brut. Si vos revenus déclarés sont très faibles, l'indemnité peut être faible, voire nulle.",
        ],
        image: {
          src: `${ASSETS}/arret-maladie-frise.png`,
          alt: "Frise : 3 jours de carence sans indemnité, puis indemnité plafonnée à partir du 4e jour",
        },
      },
      {
        titre: "Le vrai sujet : l'écart avec votre niveau de vie",
        paragraphes: [
          "Le problème n'est pas seulement le délai de carence. C'est l'écart entre ce que vous gagnez en activité normale et ce que vous touchez en arrêt, pendant que le loyer, le crédit, les assurances et vos charges professionnelles continuent.",
          "C'est le rôle de la prévoyance : combler cet écart. Avant de comparer des contrats, retenez trois critères :",
        ],
        liste: [
          "La franchise : le nombre de jours d'arrêt avant que le contrat commence à payer. Plus elle est longue, moins la cotisation est élevée.",
          "Le niveau d'indemnisation : visez un montant qui couvre vos charges fixes.",
          "La définition de l'invalidité : selon qu'elle est liée à votre métier ou à toute activité, la protection n'est pas du tout la même.",
        ],
        lien: { label: "Lire le guide prévoyance complet", url: "https://avenlib.fr/blog/prevoyance-independant" },
      },
      {
        titre: "L'action du mois : 10 minutes pour votre retraite",
        paragraphes: [
          "Sujet voisin, même logique : sans employeur, personne ne surveille vos droits à votre place. Un réflexe simple, gratuit, qui change la façon de regarder la question :",
        ],
        etapes: [
          "Connectez-vous sur info-retraite.fr avec FranceConnect.",
          "Ouvrez votre relevé de carrière et vérifiez qu'aucune année n'est manquante ou mal reportée.",
          "Notez l'estimation de votre pension et comparez-la à votre niveau de vie actuel : l'écart vous dit si un complément (PER, assurance-vie) vaut le coup.",
        ],
        lien: { label: "Ouvrir info-retraite.fr", url: "https://www.info-retraite.fr" },
      },
    ],
    blog: {
      titre: "Nouveau sur le blog : choisir sa mutuelle quand on est auto-entrepreneur",
      texte:
        "Optique, dentaire, hospitalisation : les garanties à regarder, les délais de carence à vérifier et les erreurs à éviter avant de signer.",
      image: `https://avenlib.fr/blog/mutuelle.png`,
      url: "https://avenlib.fr/blog/mutuelle-auto-entrepreneur",
    },
    cta: {
      texte:
        "Vous ne savez pas où vous en êtes sur la retraite, la prévoyance, la mutuelle ou la fiscalité ? Le bilan Avenlib fait le point en 13 questions, en 3 minutes, gratuitement.",
      label: "Faire mon bilan",
      url: "https://avenlib.fr/diagnostic",
    },
  },
];

export function getIssue(id: string): NewsletterIssue | undefined {
  return ISSUES.find((i) => i.id === id);
}
