import ContenuEducatif from "@/components/ContenuEducatif";

export const metadata = {
  title: "Épargne et investissement pour freelances | Avenlib",
  description: "Sans épargne de précaution ni investissement structuré, un indépendant est à la merci du moindre imprévu. Découvrez comment construire votre patrimoine.",
};

export default function PageEpargne() {
  return (
    <ContenuEducatif
      meta={metadata}
      surtitre="Épargne & investissement"
      titre="Épargne et investissement pour freelances"
      intro="Un salarié dispose d'un filet de sécurité : chômage, arrêt maladie, prime de fin d'année. Un indépendant n'a rien de tout cela. L'épargne n'est pas un luxe, c'est une nécessité structurelle."
      points={[
        {
          chiffre: "3 mois",
          titre: "De charges à couvrir sans épargne de précaution",
          texte: "Perte d'un client majeur, creux d'activité, imprévu fiscal, sans 3 à 6 mois de charges disponibles immédiatement, la situation peut rapidement devenir critique.",
        },
        {
          chiffre: "72 %",
          titre: "Des freelances n'ont pas de stratégie d'investissement définie",
          texte: "La plupart des indépendants laissent leur épargne dormir sur un livret A, perdant en pouvoir d'achat face à l'inflation et ratant des opportunités fiscales significatives.",
        },
        {
          chiffre: "30 %",
          titre: "D'économie fiscale possible via l'assurance vie et le PER",
          texte: "Combinés intelligemment, l'assurance vie et le PER permettent de réduire sensiblement votre imposition tout en constituant un capital pour l'avenir.",
        },
      ]}
      solutions={[
        {
          titre: "Construire d'abord une épargne de précaution",
          texte: "Avant tout investissement, Avenlib recommande de constituer un matelas de sécurité de 3 à 6 mois de charges. C'est la base sur laquelle tout le reste se construit.",
        },
        {
          titre: "Diversifier avec assurance vie, PEA et SCPI",
          texte: "Nalo, Yomoni et Ramify proposent des solutions en gestion pilotée adaptées aux profils de risque des indépendants, sans nécessiter de connaissances financières approfondies.",
        },
        {
          titre: "Optimiser la fiscalité de votre épargne",
          texte: "Selon votre TMI et votre horizon de placement, certains véhicules sont bien plus avantageux que d'autres. Un conseiller en gestion de patrimoine peut vous orienter gratuitement.",
        },
      ]}
      ctaLabel="Faire mon bilan gratuit"
    />
  );
}
