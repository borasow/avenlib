import ContenuEducatif from "@/components/ContenuEducatif";

export const metadata = {
  title: "Prévoyance indépendant | Que se passe-t-il en arrêt maladie ?",
  description: "En tant qu'indépendant, la Sécu vous verse 22€/jour en arrêt maladie. Découvrez comment vous protéger avec les meilleures solutions du marché.",
  openGraph: {
    title: "Prévoyance indépendant | Que se passe-t-il en arrêt maladie ?",
    description: "En tant qu'indépendant, la Sécu vous verse 22€/jour en arrêt maladie. Découvrez comment vous protéger.",
    url: "https://avenlib.fr/prevoyance",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PagePrevoyance() {
  return (
    <ContenuEducatif
      meta={metadata}
      surtitre="Prévoyance & protection"
      titre="Arrêt maladie : ce qu'il se passe vraiment pour un indépendant"
      intro="Un salarié malade est indemnisé dès le 4e jour. Un indépendant, lui, peut attendre 3 mois sans rien. Cette réalité, peu de gens la connaissent, jusqu'au jour où elle les touche."
      points={[
        {
          chiffre: "90 jours",
          titre: "Le délai de carence pour les indépendants au SSI",
          texte: "Contrairement aux salariés indemnisés dès le 4e jour d'arrêt, les travailleurs non-salariés doivent attendre 3 mois complets avant de percevoir une indemnité journalière.",
        },
        {
          chiffre: "22 €/j",
          titre: "L'indemnité journalière versée par le SSI",
          texte: "Après le délai de carence, le SSI verse en moyenne 22 € par jour, soit moins de 660 € par mois. Largement insuffisant pour couvrir ses charges et son loyer.",
        },
        {
          chiffre: "620 €",
          titre: "Le coût moyen d'une prévoyance sérieuse par an",
          texte: "Une garantie perte de revenus bien calibrée coûte en moyenne 620 € par an, soit moins de 2 € par jour pour protéger l'ensemble de ses revenus.",
        },
      ]}
      solutions={[
        {
          titre: "On évalue votre niveau de protection actuel",
          texte: "Le bilan analyse ce que vous avez déjà en place (mutuelle, prévoyance, RC Pro) et identifie les vrais trous dans votre couverture.",
        },
        {
          titre: "On calcule le bon niveau de couverture pour votre profil",
          texte: "Selon votre revenu, votre secteur et votre situation familiale, les besoins ne sont pas les mêmes. On personnalise les recommandations, pas les produits.",
        },
        {
          titre: "On vous connecte à un courtier spécialisé TNS",
          texte: "Les contrats prévoyance pour indépendants sont très hétérogènes. Avenlib vous oriente vers des courtiers qui comparent objectivement les offres du marché.",
        },
      ]}
    />
  );
}
