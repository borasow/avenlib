import ContenuEducatif from "@/components/ContenuEducatif";

export const metadata = {
  title: "Optimisation fiscale freelance, Économisez jusqu'à 3 200€/an",
  description: "PER, statut juridique, charges déductibles : découvrez tous les leviers pour réduire vos impôts légalement en tant qu'indépendant.",
};

export default function PageFiscalite() {
  return (
    <ContenuEducatif
      meta={metadata}
      surtitre="Fiscalité & optimisation"
      titre="Optimisation fiscale : les leviers que vous n'utilisez pas"
      intro="L'optimisation fiscale, ce n'est pas de l'évasion, c'est utiliser les dispositifs que la loi met à votre disposition. La plupart des indépendants en ignorent la moitié."
      points={[
        {
          chiffre: "3 200 €",
          titre: "L'économie d'impôt annuelle moyenne manquée",
          texte: "Selon les experts-comptables spécialisés, un indépendant qui n'optimise pas sa fiscalité laisse en moyenne 3 200 € d'impôts payés en trop chaque année.",
        },
        {
          chiffre: "68 %",
          titre: "Des auto-entrepreneurs ignorent le versement libératoire",
          texte: "Le prélèvement forfaitaire libératoire peut diviser par deux l'imposition pour les micro-entrepreneurs dont le revenu est faible, mais 7 sur 10 ne l'activent jamais.",
        },
        {
          chiffre: "10 %",
          titre: "Seulement des indépendants utilisent un PER comme outil fiscal",
          texte: "Le Plan d'Épargne Retraite permet de déduire jusqu'à 32 908 € de revenus imposables par an. Moins d'un indépendant sur dix en profite pleinement.",
        },
      ]}
      solutions={[
        {
          titre: "On identifie votre régime fiscal optimal",
          texte: "Micro ou réel ? IS ou IR ? Selon votre chiffre d'affaires, votre secteur et vos charges, le bon régime peut changer radicalement votre imposition nette.",
        },
        {
          titre: "On cartographie les dispositifs auxquels vous avez droit",
          texte: "PER, Madelin, frais réels, déduction des charges sociales, amortissements, le bilan Avenlib liste les leviers adaptés à votre situation spécifique.",
        },
        {
          titre: "On vous met en relation avec un expert-comptable ou CGP",
          texte: "Certaines optimisations nécessitent un accompagnement professionnel. Avenlib vous connecte à des spécialistes TNS pour une mise en œuvre concrète.",
        },
      ]}
    />
  );
}
