import ContenuEducatif from "@/components/ContenuEducatif";

export const metadata = {
  title: "Crédit et financement pour indépendants | Avenlib",
  description: "Freelance ou TNS, obtenir un crédit n'est pas impossible. Découvrez les acteurs spécialisés qui comprennent votre statut.",
};

export default function PageCredit() {
  return (
    <ContenuEducatif
      meta={metadata}
      surtitre="Crédit & financement"
      titre="Crédit et financement pour indépendants"
      intro="Les banques traditionnelles sont conçues pour les salariés. Revenus variables, statut atypique, absence de bulletins de paie, autant de raisons qui compliquent vos dossiers. Il existe pourtant des solutions."
      points={[
        {
          chiffre: "40 %",
          titre: "Des indépendants refusés par leur banque principale",
          texte: "Près d'un indépendant sur deux s'est vu refuser ou compliquer un crédit immobilier ou professionnel par sa banque de dépôt, faute de revenus stables.",
        },
        {
          chiffre: "3 ans",
          titre: "D'historique souvent exigé par les banques classiques",
          texte: "La plupart des établissements bancaires demandent 3 ans de bilans pour étudier un dossier indépendant, excluant de fait les jeunes entrepreneurs.",
        },
        {
          chiffre: "2 min",
          titre: "Pour obtenir une simulation chez les acteurs spécialisés",
          texte: "Des plateformes comme Mansa analysent vos données Urssaf en temps réel et vous donnent une réponse de principe en quelques minutes.",
        },
      ]}
      solutions={[
        {
          titre: "Des acteurs qui comprennent vos revenus réels",
          texte: "Mansa, Defacto et Pretto analysent vos flux Urssaf, vos factures et votre historique réel, pas seulement vos déclarations fiscales.",
        },
        {
          titre: "Crédit immobilier : des courtiers spécialisés TNS",
          texte: "Pretto accompagne les indépendants dans la construction de leur dossier et les met en relation avec les banques ouvertes aux profils atypiques.",
        },
        {
          titre: "Trésorerie et besoins ponctuels couverts rapidement",
          texte: "Defacto finance votre trésorerie en 24h sans garantie personnelle. Idéal pour les creux d'activité ou les gros projets à avancer.",
        },
      ]}
      ctaLabel="Faire mon bilan gratuit"
    />
  );
}
