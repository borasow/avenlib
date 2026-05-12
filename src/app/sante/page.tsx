import ContenuEducatif from "@/components/ContenuEducatif";

export const metadata = {
  title: "Mutuelle santé indépendant, Pourquoi la Sécu ne suffit pas",
  description: "La Sécurité sociale rembourse en moyenne 70% des soins. Trouvez la mutuelle adaptée à votre statut d'indépendant.",
};

export default function PageSante() {
  return (
    <ContenuEducatif
      meta={metadata}
      surtitre="Santé & complémentaire"
      titre="Mutuelle santé : pourquoi la Sécu ne suffit pas"
      intro="Sans employeur pour vous imposer une mutuelle collective, vous devez choisir seul, et souvent mal. Pourtant, les écarts de remboursement peuvent représenter des milliers d'euros par an."
      points={[
        {
          chiffre: "50 %",
          titre: "Seulement la moitié des frais couverts par la Sécu",
          texte: "En moyenne, l'Assurance Maladie rembourse moins de 50 % des dépenses de santé réelles des Français. Le reste est à la charge du patient, ou de sa complémentaire.",
        },
        {
          chiffre: "4,8 M",
          titre: "D'indépendants sans mutuelle adaptée à leur situation",
          texte: "Des millions de travailleurs non-salariés souscrivent une mutuelle basique ou généraliste, sans tenir compte de leurs besoins réels en optique, dentaire ou hospitalisation.",
        },
        {
          chiffre: "2 400 €",
          titre: "Le coût moyen d'un reste-à-charge annuel non couvert",
          texte: "Prothèses dentaires, lunettes, dépassements d'honoraires, un indépendant mal couvert peut se retrouver avec plus de 2 000 € de frais non remboursés par an.",
        },
      ]}
      solutions={[
        {
          titre: "On analyse vos besoins réels de santé",
          texte: "Selon votre âge, situation familiale et historique médical, les priorités ne sont pas les mêmes. On cartographie vos vrais besoins avant toute recommandation.",
        },
        {
          titre: "On compare les offres du marché TNS",
          texte: "Les contrats santé pour indépendants varient énormément en couverture et en prix. Avenlib vous oriente vers les offres adaptées à votre profil, pas les plus chères.",
        },
        {
          titre: "On vous connecte à un courtier santé indépendant",
          texte: "Un courtier spécialisé TNS peut négocier des tarifs et des garanties que vous n'obtiendrez jamais en souscrivant directement. Avenlib vous met en relation gratuitement.",
        },
      ]}
    />
  );
}
