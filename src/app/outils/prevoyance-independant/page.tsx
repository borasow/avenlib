import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import PrevoyanceCalc from "@/components/calc/PrevoyanceCalc";

export const metadata = outilMetadata("prevoyance-independant");

export default function Page() {
  return (
    <OutilShell slug="prevoyance-independant" methode={<><p>Les indemnités de la Sécurité sociale (1/730 du revenu annuel moyen, plafonnées à 65,84 € par jour) sont converties en mois. L'écart avec tes besoins est le montant que peut couvrir une prévoyance. La franchise est le délai pendant lequel tu ne perçois rien de ce contrat.</p></>}>
      <PrevoyanceCalc />
    </OutilShell>
  );
}
