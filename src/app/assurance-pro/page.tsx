import ContenuEducatif from "@/components/ContenuEducatif";

export const metadata = {
  title: "Assurance pro : ce qu'il vous faut en tant qu'indépendant | Avenlib",
  description: "RC Pro, protection juridique, assurance décennale — les assurances indispensables selon votre activité et votre statut.",
};

export default function PageAssurancePro() {
  return (
    <ContenuEducatif
      meta={metadata}
      surtitre="Assurance professionnelle"
      titre="Assurance pro : ce qu'il vous faut"
      intro="En cas d'erreur dans une mission, de dommage chez un client ou de litige juridique, c'est votre patrimoine personnel qui est en jeu sans assurance professionnelle. Ce n'est pas une option."
      points={[
        {
          chiffre: "1/3",
          titre: "Des indépendants sans RC Pro en France",
          texte: "Un tiers des travailleurs indépendants exercent sans responsabilité civile professionnelle, s'exposant à des indemnisations qui peuvent atteindre plusieurs centaines de milliers d'euros.",
        },
        {
          chiffre: "15 000 €",
          titre: "Le montant moyen d'un sinistre RC Pro pour un consultant",
          texte: "Une erreur dans un livrable, un conseil mal suivi, un retard de mission — les conséquences financières peuvent être considérables, même pour des prestations courantes.",
        },
        {
          chiffre: "25 €",
          titre: "Le coût mensuel moyen d'une RC Pro pour un freelance",
          texte: "Pour environ 25€ par mois, une RC Pro couvre l'essentiel des risques liés à votre activité. C'est l'une des assurances les plus rentables pour un indépendant.",
        },
      ]}
      solutions={[
        {
          titre: "RC Pro adaptée à votre secteur",
          texte: "Les garanties varient selon votre activité : conseil, développement, design, BTP, professions libérales. Hiscox, Coover et Simplis proposent des contrats spécialisés par métier.",
        },
        {
          titre: "Protection juridique pour les litiges clients",
          texte: "En cas de conflit avec un client sur une facturation ou un livrable, la protection juridique finance vos frais d'avocat et de procédure. Souvent incluse ou disponible en option.",
        },
        {
          titre: "Souscription en moins de 10 minutes",
          texte: "Les assurtech spécialisées indépendants permettent de souscrire en ligne, d'obtenir son attestation immédiatement et de modifier ses garanties sans engagement.",
        },
      ]}
      ctaLabel="Faire mon diagnostic gratuit"
    />
  );
}
