import ContenuEducatif from "@/components/ContenuEducatif";

export const metadata = {
  title: "Retraite des indépendants, Combien toucherez-vous ?",
  description: "Découvrez votre pension estimée en tant qu'indépendant. Micro-entrepreneur, EURL, SASU : simulez votre retraite et trouvez les meilleures solutions.",
};

export default function PageRetraite() {
  return (
    <ContenuEducatif
      meta={metadata}
      surtitre="Retraite & indépendants"
      titre="Retraite des indépendants : ce que personne ne vous dit"
      intro="En tant qu'indépendant, vous ne bénéficiez d'aucun filet automatique. Chaque année sans préparation, c'est une pension future qui s'effrite. Voici ce que les chiffres révèlent vraiment."
      points={[
        {
          chiffre: "1 100 €",
          titre: "La retraite moyenne d'un indépendant",
          texte: "Un travailleur non salarié perçoit en moyenne 1 100 € de pension de retraite par mois, contre 1 800 € pour un salarié. L'écart se creuse depuis des années.",
        },
        {
          chiffre: "40 %",
          titre: "Des indépendants n'ont aucun dispositif retraite complémentaire",
          texte: "Près de 4 indépendants sur 10 comptent uniquement sur le régime obligatoire, totalement insuffisant pour maintenir leur niveau de vie.",
        },
        {
          chiffre: "15 ans",
          titre: "Le délai minimal pour constituer un capital significatif",
          texte: "Un PER ouvert trop tard ne permet pas de compenser les années manquantes. Commencer à 45 ans au lieu de 30 divise presque par deux le capital disponible à la retraite.",
        },
      ]}
      solutions={[
        {
          titre: "On analyse votre situation retraite actuelle",
          texte: "Le bilan Avenlib calcule vos droits estimés selon votre régime (SSI, CIPAV, CARPIMKO…) et identifie précisément votre écart à combler.",
        },
        {
          titre: "On vous oriente vers les bons dispositifs",
          texte: "PER individuel, Madelin, versements volontaires, selon votre tranche d'imposition et votre horizon, certains dispositifs sont bien plus avantageux que d'autres.",
        },
        {
          titre: "On vous connecte à un expert indépendant",
          texte: "Pas de produit maison à vendre. Avenlib vous met en relation avec un conseiller en gestion de patrimoine spécialisé indépendants, rémunéré de façon transparente.",
        },
      ]}
    />
  );
}
