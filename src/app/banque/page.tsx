import ContenuEducatif from "@/components/ContenuEducatif";

export const metadata = {
  title: "Quelle banque pro choisir pour un indépendant ? | Avenlib",
  description: "Compte pro, facturation, virements, intégration comptable — comparez les meilleures banques pro pour freelances et TNS.",
};

export default function PageBanque() {
  return (
    <ContenuEducatif
      meta={metadata}
      surtitre="Banque professionnelle"
      titre="Quelle banque pro choisir ?"
      intro="Avoir un compte professionnel dédié est obligatoire pour les sociétés et fortement conseillé pour tous les indépendants. Mais toutes les banques ne se valent pas quand on est freelance."
      points={[
        {
          chiffre: "12 €",
          titre: "Le coût mensuel moyen d'un compte pro en banque traditionnelle",
          texte: "Les banques classiques facturent entre 10 et 30€ par mois pour un compte pro, avec des services souvent inadaptés aux besoins réels des indépendants.",
        },
        {
          chiffre: "68 %",
          titre: "Des freelances insatisfaits de leur banque pro actuelle",
          texte: "Interface vieillissante, support lent, pas d'intégration comptable, pas de facturation intégrée — les banques traditionnelles peinent à s'adapter aux nouveaux modes de travail.",
        },
        {
          chiffre: "0 €",
          titre: "Les néobanques pro offrent souvent la première année gratuitement",
          texte: "Qonto, Shine et Blank proposent des offres compétitives avec facturation intégrée, catégorisation automatique et export comptable dès les premiers euros.",
        },
      ]}
      solutions={[
        {
          titre: "Facturation et comptabilité intégrées nativement",
          texte: "Les meilleures banques pro permettent de créer des devis et factures directement depuis l'app, et d'exporter les données vers votre logiciel comptable en un clic.",
        },
        {
          titre: "Accès mobile et gestion en temps réel",
          texte: "Notifications instantanées, virements immédiats, cartes virtuelles — les néobanques pro sont conçues pour gérer votre activité depuis votre téléphone.",
        },
        {
          titre: "Des offres adaptées à chaque statut",
          texte: "Qonto convient aux structures plus grandes, Shine est idéal pour les freelances en solo, Blank pour ceux qui démarrent. Avenlib vous oriente selon votre situation.",
        },
      ]}
      ctaLabel="Faire mon diagnostic gratuit"
    />
  );
}
