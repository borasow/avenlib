export interface Partenaire {
  nom: string;
  description: string;
  url: string;
  tag?: string;
}

export const PARTENAIRES: Record<string, Partenaire[]> = {
  retraite: [
    {
      nom: "Caravel",
      description: "La solution retraite dédiée aux indépendants. PER simple à ouvrir, 100% en ligne, frais réduits.",
      url: "https://www.getcaravel.fr",
      tag: "Recommandé",
    },
    {
      nom: "Linxea",
      description: "PER et assurance vie sans frais d'entrée. Large choix de fonds, interface claire.",
      url: "https://www.linxea.com",
    },
    {
      nom: "Yomoni",
      description: "Gestion pilotée de ton PER, performante et accessible dès 1 000€.",
      url: "https://www.yomoni.fr",
    },
    {
      nom: "Ramify",
      description: "PER et assurance vie haut de gamme pour optimiser ton épargne retraite.",
      url: "https://www.ramify.fr",
    },
  ],
  prevoyance: [
    {
      nom: "Wemind",
      description: "Prévoyance conçue pour les freelances. Arrêt maladie, invalidité, décès. Devis en 2 minutes.",
      url: "https://www.wemind.io",
      tag: "Recommandé",
    },
    {
      nom: "Mutumutu",
      description: "Assurance prévoyance sur-mesure pour les travailleurs non-salariés. Souscription 100% en ligne.",
      url: "https://www.mutumutu.com",
    },
    {
      nom: "April",
      description: "Prévoyance et arrêt maladie pour indépendants, devis en ligne.",
      url: "https://www.april.fr",
    },
    {
      nom: "Swiss Life",
      description: "Solutions prévoyance complètes pour TNS et professions libérales.",
      url: "https://www.swisslife.fr",
    },
  ],
  sante: [
    {
      nom: "Alan",
      description: "Mutuelle santé moderne pour indépendants. Application mobile, remboursements rapides.",
      url: "https://alan.com/fr",
      tag: "Recommandé",
    },
    {
      nom: "Heyme",
      description: "Mutuelle dédiée aux jeunes indépendants. Offres modulables, bon rapport qualité-prix.",
      url: "https://www.heyme.com",
    },
    {
      nom: "Harmonie Mutuelle",
      description: "Mutuelle santé leader en France, offres dédiées aux indépendants et TNS.",
      url: "https://www.harmonie-mutuelle.fr",
    },
  ],
  fiscalite: [
    {
      nom: "Dougs",
      description: "Expert-comptable en ligne pour indépendants. Optimisation fiscale, bilan, accompagnement personnalisé.",
      url: "https://www.dougs.fr",
      tag: "Recommandé",
    },
    {
      nom: "Indy",
      description: "Comptabilité automatisée pour freelances. Connexion bancaire, déclarations simplifiées.",
      url: "https://www.indy.fr",
    },
    {
      nom: "Pennylane",
      description: "Comptabilité et gestion financière tout-en-un pour entrepreneurs.",
      url: "https://www.pennylane.com",
    },
    {
      nom: "Numbr",
      description: "Expert-comptable en ligne spécialisé freelances et indépendants.",
      url: "https://www.numbr.fr",
    },
  ],
  deces: [],
  banque_pro: [
    {
      nom: "Qonto",
      description: "Compte pro en ligne pensé pour les freelances et TPE.",
      url: "https://qonto.com/fr",
      tag: "Recommandé",
    },
    {
      nom: "Shine",
      description: "Compte bancaire professionnel avec outils de facturation intégrés.",
      url: "https://www.shine.fr",
    },
    {
      nom: "Blank",
      description: "Compte pro 100% mobile, sans frais cachés.",
      url: "https://www.blank.app",
    },
  ],
  assurance_pro: [
    {
      nom: "Hiscox",
      description: "Assurance RC Pro et cyber-risques pour les professions libérales.",
      url: "https://www.hiscox.fr",
      tag: "Recommandé",
    },
    {
      nom: "Simplis",
      description: "RC Pro pour consultants et freelances, souscription 100% en ligne.",
      url: "https://www.simplis.fr",
    },
  ],
  epargne: [
    {
      nom: "Nalo",
      description: "Gestion de patrimoine en ligne personnalisée pour indépendants.",
      url: "https://www.nalo.fr",
      tag: "Recommandé",
    },
  ],
  immobilier: [
    {
      nom: "Pretto",
      description: "Courtier crédit immo spécialisé dans les dossiers indépendants.",
      url: "https://www.pretto.fr",
      tag: "Recommandé",
    },
  ],
  credit: [
    {
      nom: "Pretto",
      description: "Courtier crédit immo spécialisé dans les dossiers indépendants.",
      url: "https://www.pretto.fr",
      tag: "Recommandé",
    },
    {
      nom: "Mansa",
      description: "Crédit adapté aux freelances, analyse tes revenus Urssaf.",
      url: "https://www.getmansa.com",
    },
    {
      nom: "Defacto",
      description: "Financement rapide de ta trésorerie freelance.",
      url: "https://defacto.fr",
    },
  ],
  formation: [],
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
  immobilier: {
    titre: "Crédit immobilier",
    description: "Les indépendants ont souvent du mal à obtenir un crédit immobilier : revenus variables, statut non salarié. Les banques classiques sont frileuses face aux dossiers atypiques.",
    conseil: "Des courtiers spécialisés dans les dossiers d'indépendants connaissent les banques qui acceptent ces profils. Ils optimisent ton dossier pour maximiser tes chances d'obtenir le meilleur taux.",
  },
  credit: {
    titre: "Crédit & financement",
    description: "Les banques traditionnelles peinent à évaluer les revenus variables des indépendants. Obtenir un crédit ou un financement professionnel est souvent plus complexe qu'en étant salarié.",
    conseil: "Des acteurs spécialisés dans les profils freelances peuvent analyser tes revenus réels (Urssaf, facturation) et te proposer des solutions adaptées à ton statut.",
  },
  formation: {
    titre: "Formation professionnelle",
    description: "En tant qu'indépendant, tu cotises à des fonds de formation mais peu savent comment les utiliser. Ces droits sont souvent inexploités faute d'information.",
    conseil: "Selon ton statut, tu peux mobiliser le CPF, le FIFPL ou l'AGEFICE pour financer des formations sans toucher à ta trésorerie. Un levier sous-utilisé qui mérite d'être activé.",
  },
};
