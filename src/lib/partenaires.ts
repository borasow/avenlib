export interface Partenaire {
  nom: string;
  description: string;
  url: string;
  tag?: string;
  logo?: string;
  tarif?: string;
}

export const PARTENAIRES: Record<string, Partenaire[]> = {
  retraite: [
    {
      nom: "Caravel",
      description: "La solution retraite dédiée aux indépendants. PER simple à ouvrir, 100% en ligne, frais réduits.",
      url: "https://www.getcaravel.fr",
      tag: "Recommandé",
      logo: "/logos/caravel.png",
      tarif: "Dès 50€/mois · Frais 1,38%/an",
    },
    {
      nom: "Linxea",
      description: "PER et assurance vie sans frais d'entrée. Large choix de fonds, interface claire.",
      url: "https://www.linxea.com",
      logo: "/logos/Linxea.png",
      tarif: "Frais 0,5%/an · Sans frais d'entrée",
    },
    {
      nom: "Yomoni",
      description: "Gestion pilotée de ton PER, performante et accessible dès 1 000€.",
      url: "https://www.yomoni.fr",
      logo: "/logos/yomini.png",
      tarif: "Frais 0,6 à 1,6%/an",
    },
    {
      nom: "Ramify",
      description: "PER et assurance vie haut de gamme pour optimiser ton épargne retraite.",
      url: "https://www.ramify.fr",
      logo: "/logos/Ramify.png",
      tarif: "Frais 1,3 à 1,6%/an",
    },
  ],
  prevoyance: [
    {
      nom: "Wemind",
      description: "Prévoyance conçue pour les freelances. Arrêt maladie, invalidité, décès. Devis en 2 minutes.",
      url: "https://www.wemind.io",
      tag: "Recommandé",
      logo: "/logos/wemind.png",
      tarif: "Entre 50 et 100€/mois",
    },
    {
      nom: "April",
      description: "Prévoyance et arrêt maladie pour indépendants, devis en ligne.",
      url: "https://www.april.fr",
      logo: "/logos/april.png",
      tarif: "Dès 30€/mois",
    },
    {
      nom: "Swiss Life",
      description: "Solutions prévoyance complètes pour TNS et professions libérales.",
      url: "https://www.swisslife.fr",
      logo: "/logos/swisslife.png",
      tarif: "Entre 40 et 100€/mois",
    },
  ],
  sante: [
    {
      nom: "Alan",
      description: "Mutuelle santé moderne pour indépendants. Application mobile, remboursements rapides.",
      url: "https://alan.com/",
      tag: "Recommandé",
      logo: "/logos/alan.png",
      tarif: "Dès 49€/mois",
    },
    {
      nom: "Heyme",
      description: "Mutuelle dédiée aux jeunes indépendants. Offres modulables, bon rapport qualité-prix.",
      url: "https://www.heyme.com",
      logo: "/logos/Heyme.png",
      tarif: "Dès 37€/mois",
    },
    {
      nom: "Harmonie Mutuelle",
      description: "Mutuelle santé leader en France, offres dédiées aux indépendants et TNS.",
      url: "https://www.harmonie-mutuelle.fr",
      logo: "/logos/harmoniemutuelle.png",
      tarif: "Devis personnalisé",
    },
  ],
  fiscalite: [
    {
      nom: "Dougs",
      description: "Expert-comptable en ligne pour indépendants. Optimisation fiscale, bilan, accompagnement personnalisé.",
      url: "https://www.dougs.fr",
      tag: "Recommandé",
      logo: "/logos/dougs.png",
      tarif: "Dès 29€/mois",
    },
    {
      nom: "Indy",
      description: "Comptabilité automatisée pour freelances. Connexion bancaire, déclarations simplifiées.",
      url: "https://www.indy.fr",
      logo: "/logos/Indy.png",
      tarif: "Gratuit · Dès 12€/mois",
    },
    {
      nom: "Pennylane",
      description: "Comptabilité et gestion financière tout-en-un pour entrepreneurs.",
      url: "https://www.pennylane.com",
      logo: "/logos/pennylane.png",
      tarif: "Dès 14€/mois HT",
    },
  ],
  deces: [
    {
      nom: "Abeille Assurances",
      description: "Prévoyance TNS, capital décès et rente invalidité adaptés aux auto-entrepreneurs.",
      url: "https://www.abeille-assurances.fr",
      tag: "Recommandé",
      logo: "/logos/Abeilleassurance.png",
      tarif: "Entre 50 et 100€/mois",
    },
    {
      nom: "Malakoff Humanis",
      description: "Capital décès jusqu'à 1M€, rente invalidité, solution sur mesure pour TNS.",
      url: "https://www.malakoffhumanis.com",
      logo: "/logos/malakoffhumanis.png",
      tarif: "Dès 40€/mois",
    },
  ],
  banque_pro: [
    {
      nom: "Qonto",
      description: "Compte pro en ligne pensé pour les freelances et TPE.",
      url: "https://qonto.com/fr",
      tag: "Recommandé",
      logo: "/logos/qonto.png",
      tarif: "Dès 9€/mois HT",
    },
    {
      nom: "Shine",
      description: "Compte bancaire professionnel avec outils de facturation intégrés.",
      url: "https://www.shine.fr",
      logo: "/logos/Shine.png",
      tarif: "Gratuit ou dès 9€/mois",
    },
    {
      nom: "Blank",
      description: "Compte pro 100% mobile, sans frais cachés.",
      url: "https://www.blank.app",
      logo: "/logos/Blank.png",
      tarif: "Dès 9€/mois",
    },
  ],
  assurance_pro: [
    {
      nom: "Hiscox",
      description: "Assurance RC Pro et cyber-risques pour les professions libérales.",
      url: "https://www.hiscox.fr",
      tag: "Recommandé",
      logo: "/logos/Hiscox.png",
      tarif: "Devis personnalisé",
    },
    {
      nom: "Simplis",
      description: "RC Pro pour consultants et freelances, souscription 100% en ligne.",
      url: "https://www.simplis.fr",
      logo: "/logos/simplis.png",
      tarif: "Dès 9,99€/mois",
    },
  ],
  epargne: [
    {
      nom: "Nalo",
      description: "Gestion de patrimoine en ligne personnalisée pour indépendants.",
      url: "https://www.nalo.fr",
      tag: "Recommandé",
      logo: "/logos/Nalo.png",
      tarif: "Frais max 1,6%/an · Dès 50€/mois",
    },
    {
      nom: "Ramify",
      description: "PER et assurance vie haut de gamme pour optimiser ton épargne retraite.",
      url: "https://www.ramify.fr",
      logo: "/logos/Ramify.png",
      tarif: "Frais 1,3 à 1,6%/an",
    },
  ],
  portage_salarial: [
    {
      nom: "Jumpwork",
      description: "Portage salarial 100% en ligne pour freelances et consultants. Simulation de salaire instantanée, accompagnement dédié, zéro frais cachés.",
      url: "https://www.jumpwork.fr",
      tag: "Recommandé",
      logo: "/logos/jumpwork.png",
      tarif: "Frais de gestion 5 à 8% du CA HT",
    },
    {
      nom: "Webportage",
      description: "Société de portage salarial spécialisée dans les métiers du numérique et du conseil. Mutuelle, prévoyance et retraite complémentaire inclus.",
      url: "https://www.webportage.com",
      logo: "/logos/webportage.png",
      tarif: "Frais de gestion 5 à 7% du CA HT",
    },
    {
      nom: "Portageo",
      description: "Portage salarial flexible pour tous les indépendants. Accompagnement administratif, accès à la formation et au chômage en fin de mission.",
      url: "https://www.portageo.fr",
      logo: "/logos/portageo.png",
      tarif: "Frais de gestion 4 à 9% du CA HT",
    },
  ],
  credit: [
    {
      nom: "Pretto",
      description: "Courtier crédit immo spécialisé dans les dossiers indépendants.",
      url: "https://www.pretto.fr",
      tag: "Recommandé",
      logo: "/logos/Pretto.png",
      tarif: "Gratuit · Commission à la signature",
    },
    {
      nom: "Defacto",
      description: "Financement rapide de ta trésorerie freelance.",
      url: "https://defacto.fr",
      logo: "/logos/defacto.svg",
      tarif: "Sans abonnement · Taux 0,05%/jour",
    },
  ],
};

export const DOMAINE_META: Record<string, { titre: string; description: string; conseil: string }> = {
  retraite: {
    titre: "Ta retraite",
    description: "En tant qu'indépendant, tu cotises au régime général mais à taux réduit. Sans épargne complémentaire, la chute de revenus à la retraite peut être brutale.",
    conseil: "Le PER (Plan d'Épargne Retraite) est l'outil le plus efficace pour les indépendants : tu déduis les versements de ton revenu imposable, et tu te constitues un capital pour demain.",
  },
  prevoyance: {
    titre: "Ta prévoyance arrêt maladie",
    description: "En cas d'arrêt maladie, la Sécurité sociale verse environ 22€/jour après un délai de carence de 3 jours. C'est loin d'être suffisant pour maintenir ton niveau de vie.",
    conseil: "Une assurance prévoyance complémentaire te permet de percevoir des indemnités journalières proches de tes revenus habituels dès le premier jour d'arrêt.",
  },
  sante: {
    titre: "Ta mutuelle santé",
    description: "La Sécurité sociale rembourse en moyenne 70% des soins, mais souvent moins sur les lunettes, dentaire et dépassements d'honoraires. Sans mutuelle, la facture peut vite monter.",
    conseil: "Une bonne mutuelle santé pour indépendant doit couvrir les soins courants, l'optique, le dentaire et l'hospitalisation. Adapte le niveau de garanties à ton profil de santé.",
  },
  fiscalite: {
    titre: "Ton optimisation fiscale",
    description: "Selon ton statut, des dizaines de milliers d'euros peuvent légalement échapper à l'impôt. Peu d'indépendants exploitent pleinement ces leviers faute d'accompagnement.",
    conseil: "PER, frais réels, optimisation de la rémunération, choix du régime fiscal : chaque levier peut représenter plusieurs milliers d'euros d'économies par an. Un expert-comptable spécialisé est vite rentabilisé.",
  },
  deces: {
    titre: "Ta prévoyance décès / invalidité",
    description: "Si tu décèdes ou deviens invalide, tes proches et/ou ton activité n'ont aucun filet de sécurité sans contrat spécifique. Les régimes obligatoires des indépendants sont très insuffisants.",
    conseil: "Un contrat prévoyance décès/invalidité garantit un capital ou une rente à tes proches en cas de coup dur. Si tu as des enfants ou un emprunt immobilier, c'est indispensable.",
  },
  banque_pro: {
    titre: "Banque professionnelle",
    description: "Un compte bancaire dédié à ton activité est obligatoire pour les sociétés et fortement conseillé pour les autres statuts. Les banques traditionnelles sont souvent inadaptées aux indépendants.",
    conseil: "Les néobanques pro (Qonto, Shine, Blank) offrent des fonctionnalités pensées pour les freelances : facturation intégrée, catégorisation automatique, export comptable.",
  },
  assurance_pro: {
    titre: "Assurance RC Pro",
    description: "En cas d'erreur ou d'omission dans ta mission, tu peux être tenu responsable des préjudices causés à ton client. Sans RC Pro, c'est ton patrimoine personnel qui est en jeu.",
    conseil: "La RC Pro est indispensable pour tout indépendant qui conseille ou réalise des prestations. Elle couvre les erreurs, les oublis et les dommages immatériels causés à tes clients.",
  },
  epargne: {
    titre: "Épargne & investissement",
    description: "Sans épargne constituée, un imprévu professionnel (perte de client, creux d'activité) peut déstabiliser rapidement ta trésorerie personnelle.",
    conseil: "Construire une épargne de précaution (3 à 6 mois de charges) est la première étape. Ensuite, l'assurance vie et le PEA permettent de faire fructifier tes excédents avec une fiscalité avantageuse.",
  },
  portage_salarial: {
    titre: "Portage salarial",
    description: "Le portage salarial te permet de travailler en freelance tout en bénéficiant du statut de salarié : accès au chômage, mutuelle d'entreprise, retraite complémentaire, prévoyance. Une alternative souvent ignorée des indépendants qui démarrent.",
    conseil: "Si tu es en début d'activité ou en micro-entrepreneur, le portage salarial peut te donner accès à des protections que tu n'as pas aujourd'hui — sans renoncer à ta liberté de choisir tes missions.",
  },
  credit: {
    titre: "Crédit & financement",
    description: "Les banques traditionnelles peinent à évaluer les revenus variables des indépendants. Obtenir un crédit ou un financement professionnel est souvent plus complexe qu'en étant salarié.",
    conseil: "Des acteurs spécialisés dans les profils freelances peuvent analyser tes revenus réels (Urssaf, facturation) et te proposer des solutions adaptées à ton statut.",
  },
};

export function getPartenaires(
  domaine: string,
  answers: { existant?: string[]; banque_pro?: string; rc_pro?: string }
): Partenaire[] {
  const all = PARTENAIRES[domaine] ?? [];
  const existant = answers.existant ?? [];

  switch (domaine) {
    case "banque_pro":
      if (
        existant.includes("Compte bancaire pro dédié") ||
        answers.banque_pro === "Oui, compte pro dédié"
      ) {
        return all.map((p) => ({ ...p, tag: p.tag === "Recommandé" ? undefined : p.tag }));
      }
      return all;

    case "assurance_pro":
      if (
        existant.includes("RC Pro / Assurance professionnelle") ||
        answers.rc_pro === "Oui, je suis couvert"
      ) {
        return all.map((p) => ({ ...p, tag: undefined }));
      }
      return all;

    case "retraite":
      if (existant.includes("PER / épargne retraite")) {
        return all.map((p) =>
          p.nom === "Caravel" ? { ...p, tag: undefined, description: p.description + " (tu as déjà un PER — compare les frais)" } : p
        );
      }
      return all;

    case "sante":
      if (existant.includes("Mutuelle santé")) {
        return all.map((p) => ({ ...p, tag: undefined }));
      }
      return all;

    default:
      return all;
  }
}
