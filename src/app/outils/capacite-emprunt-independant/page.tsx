import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import EmpruntCalc from "@/components/calc/EmpruntCalc";

export const metadata = outilMetadata("capacite-emprunt-independant");

export default function Page() {
  return (
    <OutilShell slug="capacite-emprunt-independant" methode={<><p>Mensualité maximale = 35 % de ton revenu moyen moins tes crédits en cours. Le capital empruntable est calculé avec la formule classique des mensualités, plus 0,34 % d'assurance annuelle. La banque étudie en pratique la régularité et l'ancienneté de ton activité.</p></>}>
      <EmpruntCalc />
    </OutilShell>
  );
}
